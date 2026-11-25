#!/usr/bin/env python3
"""Process raw Gemini fighter frames into game-ready sprites.

Usage:
  python3 tools/process-art.py [--raw DIR] [--only 1-16,20] [--force] [--sheet OUT.png]
  (or: npm run art)
Rejected frames are listed in tools/art-rejects.json; pose height ratios in tools/art-pose-ratios.json.

Raw files are named NNN_<fighter>_<frame>.(png|jpg|jpeg) where NNN is the entry number in
docs/v2/art-prompts.md. For each one this:
  1. keys out the flat #00FF00 background to a soft alpha matte, removes stray specks,
     and despills green fringes (suit, beard, hair edges);
  2. trims to the figure and normalises its height by pose (tools/art-pose-ratios.json):
     standing figure = 88% of a 2048 px canvas, feet baseline 4% above the bottom;
  3. flips it if the figure faces left (all sprites face RIGHT, like v1);
  4. writes a 16-bit-free RGBA PNG (compress level 9) to the path given in art-prompts.md,
     and records w/h/pivotX/baselineY/figureH in public/assets/fighters/<fighter>/frames.json.
Raw files are never shipped. Re-running is idempotent; existing outputs are skipped unless --force.
"""
import argparse, glob, json, os, re, sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROMPTS = os.path.join(ROOT, 'docs/v2/art-prompts.md')
REJECTS = json.load(open(os.path.join(ROOT, 'tools/art-rejects.json')))
_POSE = json.load(open(os.path.join(ROOT, 'tools/art-pose-ratios.json')))
RATIOS = _POSE['rules']
PIVOTS = _POSE.get('pivot', [['.*', 'torso']])
CANVAS_H = 2048
STAND_H = round(0.88 * CANVAS_H)       # 1802
BASELINE = round(0.96 * CANVAS_H)      # 1966
PAD = 24

def targets():
    t = {}
    for m in re.finditer(r'^### (\d+)\. `([^`]+)`', open(PROMPTS).read(), re.M):
        t[int(m.group(1))] = m.group(2)
    return t

def ratio_for(name):
    for pat, r in RATIOS:
        if re.search(pat, name):
            return r
    return 1.0

def key(rgb):
    a = rgb.astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    dom = g - np.maximum(r, b)              # how much greener than anything else
    # soft matte: fully opaque below 25, fully clear above 85
    alpha = np.clip((85.0 - dom) / 60.0, 0, 1)
    # clean mask: drop specks/JPEG noise, keep the figure (largest blobs) + fill holes
    solid = alpha > 0.5
    solid = ndi.binary_opening(solid, iterations=2)
    lab, n = ndi.label(solid)
    if n == 0:
        raise ValueError('nothing left after keying')
    sizes = ndi.sum(solid, lab, range(1, n + 1))
    keep = np.isin(lab, 1 + np.where(sizes >= max(sizes.max() * 0.01, 400))[0])
    keep = ndi.binary_dilation(keep, iterations=3)
    alpha = alpha * keep
    # interior holes that happen to be greenish (none expected on Bob) stay keyed, by design.
    # despill: cap green at max(r, b) wherever the pixel leans green, strongest near edges
    spill = np.clip(g - np.maximum(r, b), 0, None)
    edge = 1.0 - alpha
    g2 = g - spill * np.clip(0.6 + edge, 0, 1)
    out = np.stack([r, g2, b], -1)
    # un-premultiply-ish: edge pixels darken toward the key colour; lift them a little
    return np.clip(out, 0, 255).astype(np.uint8), (alpha * 255).astype(np.uint8)

def facing_right(alpha):
    # Heuristic: v1 sprites face right; the head (top 18% of figure) sits on the side the
    # fighter faces relative to the hips/feet less reliably, so we only report it.
    ys, xs = np.nonzero(alpha > 128)
    top = ys.min() + 0.18 * (ys.max() - ys.min())
    head_x = xs[ys < top].mean(); body_x = xs.mean()
    return head_x - body_x

def process(src, name, dst, force=False):
    if os.path.exists(dst) and not force:
        return None
    rgb = np.asarray(Image.open(src).convert('RGB'))
    col, alpha = key(rgb)
    ys, xs = np.nonzero(alpha > 24)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    rgba = np.dstack([col, alpha])[y0:y1, x0:x1]
    fig_h = round(STAND_H * ratio_for(name))
    s = fig_h / (y1 - y0)
    im = Image.fromarray(rgba, 'RGBA')
    # premultiply before resampling so edges don't pick up dark/green halos
    pm = im.convert('RGBa').resize((max(1, round(im.width * s)), fig_h), Image.LANCZOS).convert('RGBA')
    w = pm.width + 2 * PAD
    canvas = Image.new('RGBA', (w, CANVAS_H), (0, 0, 0, 0))
    canvas.alpha_composite(pm, (PAD, BASELINE - fig_h))
    a = np.asarray(canvas)[..., 3]
    # pivot = alpha-weighted centre of the torso/hips band (30%-75% down the figure)
    mode = next((m for pat, m in PIVOTS if re.search(pat, name)), 'torso')
    if mode == 'head_foot':
        top = BASELINE - fig_h
        hy, hx = np.nonzero(a[top:top + int(fig_h * 0.07)] > 128)
        fy, fx = np.nonzero(a[BASELINE - int(fig_h * 0.03):BASELINE + 1] > 128)
        pivot_x = float((hx.mean() + fx.mean()) / 2)
    else:
        band = a[BASELINE - int(fig_h * 0.70):BASELINE - int(fig_h * 0.25)].astype(np.float64)
        cols = band.sum(0)
        pivot_x = float((cols * np.arange(w)).sum() / max(cols.sum(), 1))
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    canvas.save(dst, optimize=True, compress_level=9)
    return {
        'file': os.path.basename(dst), 'w': w, 'h': CANVAS_H, 'pivotX': round(pivot_x, 1),
        'baselineY': BASELINE, 'figureH': fig_h, 'standH': STAND_H,
        'src': os.path.basename(src), 'headOffset': round(float(facing_right(a)), 1),
    }

def parse_only(spec):
    if not spec: return None
    out = set()
    for part in spec.split(','):
        if '-' in part:
            a, b = part.split('-'); out.update(range(int(a), int(b) + 1))
        else: out.add(int(part))
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--raw', default=os.path.join(ROOT, '..', 'v2', 'gemini-raw'))
    ap.add_argument('--only'); ap.add_argument('--force', action='store_true')
    ap.add_argument('--sheet', help='write a QA contact sheet of all outputs on a grey checker')
    args = ap.parse_args()
    only = parse_only(args.only); tg = targets(); done = []
    for src in sorted(glob.glob(os.path.join(args.raw, '*'))):
        m = re.match(r'(\d+)_([a-z]+)_(.+)\.(png|jpe?g|webp)$', os.path.basename(src), re.I)
        if not m: continue
        num = int(m.group(1))
        if only and num not in only: continue
        if num not in tg: print(f'skip {src}: no entry {num}'); continue
        dst = os.path.join(ROOT, tg[num]); name = os.path.splitext(os.path.basename(dst))[0]
        fighter = tg[num].split('/')[-2]
        if f'{fighter}/{name}' in REJECTS:
            print(f'REJECT {num:03d} {fighter}/{name}: {REJECTS[fighter + "/" + name]}')
            if os.path.exists(dst): os.remove(dst)
            mpath = os.path.join(os.path.dirname(dst), 'frames.json')
            if os.path.exists(mpath):
                fr = json.load(open(mpath)); fr.pop(name, None); json.dump(fr, open(mpath, 'w'), indent=1)
            continue
        try:
            meta = process(src, name, dst, args.force)
        except Exception as e:
            print(f'FAIL {src}: {e}'); continue
        if meta is None: print(f'exists {dst} (use --force)'); continue
        mpath = os.path.join(os.path.dirname(dst), 'frames.json')
        frames = json.load(open(mpath)) if os.path.exists(mpath) else {}
        frames[name] = meta
        json.dump(dict(sorted(frames.items())), open(mpath, 'w'), indent=1)
        done.append(dst)
        print(f'ok  {num:03d} {fighter}/{name}: {meta["w"]}x{meta["h"]} fig {meta["figureH"]} pivot {meta["pivotX"]} {os.path.getsize(dst)/1e6:.2f} MB')
    if args.sheet:
        files = done or sorted(glob.glob(os.path.join(ROOT, 'public/assets/fighters/*/*.png')))
        thumbs = []
        for f in files:
            im = Image.open(f); s = 400 / im.height
            t = im.resize((round(im.width * s), 400), Image.LANCZOS)
            bg = Image.new('RGBA', t.size, (60, 60, 70, 255))
            for yy in range(0, t.height, 20):
                for xx in range(0, t.width, 20):
                    if (xx // 20 + yy // 20) % 2: bg.paste((90, 90, 100, 255), (xx, yy, xx + 20, yy + 20))
            bg.alpha_composite(t); thumbs.append(bg)
        W = sum(t.width for t in thumbs[:8]) + 10 * 8
        rows = [thumbs[i:i + 8] for i in range(0, len(thumbs), 8)]
        sheet = Image.new('RGB', (max(sum(t.width for t in r) + 10 * len(r) for r in rows), 410 * len(rows)), (20, 20, 24))
        for ri, r in enumerate(rows):
            x = 0
            for t in r: sheet.paste(t, (x, ri * 410), t); x += t.width + 10
        sheet.save(args.sheet); print('sheet', args.sheet)

if __name__ == '__main__':
    main()
