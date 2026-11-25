#!/usr/bin/env python3
"""Render each v2 attack frame at in-game scale with its move's hurtbox (green) and hitbox (red),
so sprite reach can be checked against the simulation. Usage: python3 tools/hitbox-check.py OUT.png"""
import json, sys, os
from PIL import Image, ImageDraw
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
frames = json.load(open(f'{ROOT}/public/assets/fighters/bob/frames.json'))
moves = json.load(open(f'{ROOT}/src/data/fighters.json'))['bob']['moves']
MAP = json.load(open(f'{ROOT}/src/data/attack-frames.json'))['bob']
STAND = 532 * 0.52; Z = 2.0  # draw at 2x world scale
tiles = []
for mid, fr in MAP.items():
    name = fr['active']
    if name not in frames or not moves[mid].get('hitbox'): continue
    m = frames[name]; s = STAND / m['standH'] * Z
    im = Image.open(f"{ROOT}/public/assets/fighters/bob/{m['file']}")
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    W, H = 640, 640; fx, fy = 200, 600
    t = Image.new('RGBA', (W, H), (40, 44, 52, 255)); d = ImageDraw.Draw(t)
    d.line([(0, fy), (W, fy)], fill=(120, 120, 120), width=2)
    t.alpha_composite(im, (round(fx - m['pivotX'] * s), round(fy - m['baselineY'] * s)))
    crouch = moves[mid]['pose'] == 'crouch'
    hw, hh = (112, 148) if crouch else (104, 225)
    d.rectangle([fx - hw / 2 * Z, fy - hh * Z, fx + hw / 2 * Z, fy], outline=(60, 220, 90), width=3)
    hb = moves[mid]['hitbox']
    d.rectangle([fx + hb['ox'] * Z, fy + hb['oy'] * Z, fx + (hb['ox'] + hb['w']) * Z, fy + (hb['oy'] + hb['h']) * Z], outline=(240, 60, 60), width=4)
    d.text((8, 8), f"{mid} {moves[mid]['name']} -> {name}", fill=(255, 255, 255))
    tiles.append(t)
cols = 4; rows = (len(tiles) + cols - 1) // cols
sheet = Image.new('RGB', (cols * 640, rows * 640))
for i, t in enumerate(tiles): sheet.paste(t, ((i % cols) * 640, (i // cols) * 640))
sheet.save(sys.argv[1]); print(len(tiles), 'tiles ->', sys.argv[1])
