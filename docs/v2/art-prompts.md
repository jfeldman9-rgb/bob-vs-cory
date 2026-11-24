# Bob vs Cory v2 - ART LIST (Gemini image prompts)

One entry per image. Every prompt stands alone; you can paste it with no other context. Generate the **two model sheets
(entries 115 and 116) first** and attach them, plus the v1 sprite `game/public/assets/fighters/<who>-idle.png`, as
reference images on every sprite prompt for that character. Stage `-far`, `-mid` and `fore` entries are **edits of
the stage's master** (`-preview`) entry. Attach the master image when you run them.

Total entries: **197** (114 fighter sprite frames, 2 model sheets, 28 stage images, 26 cutscene stills, 13 UI images, 14 VFX/props).

## Style lock (shared)

Painted comic-book fighting-game art matching the v1 sprites: bold clean black ink outlines, rich painterly
cel-shading with soft gradients and crisp speculars, detailed fabric (wool herringbone, crushed velvet, gold bullion
embroidery, feathers), realistic adult anatomy about 8 heads tall with mild heroic exaggeration, warm key light from the
upper left and a cool rim light from behind. Saturated but grounded colour. Never any text, logos, watermarks or
borders (except the logo entry). Cartoon tone for all finishing moves: no blood, no gore, no injuries. Eggplants are
comedic props. Sprites never carry glows, particles or energy, since VFX are separate additive layers.

## Character appearance sheets

**SUITED AGENT** (fighter id `bob`): A broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots. Signature stance: low wide martial-arts stance, open-hand claw guard.
Moves like a precise machine. Never any green on him (green is reserved for chroma key and in-engine code VFX).

**DISCO SHOWMAN** (fighter id `cory`): A lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers. Sunglasses (oversized rhinestone-studded cat-eye) appear only
where a prompt says so (taunt, victory, vogue parry, Showstopper, Runway Aubergine), matching v1 where fight frames
are bare-faced. Signature stance: upright fists-up guard, hips cocked, theatrical. Playful, flirty, never vulgar.

## Sprite processing rules (apply to every fighter frame)

- Generate at 2K in the stated aspect ratio. Key out #00FF00 (tolerance + green despill on hair and feather edges).
- Scale the **whole image** so its height is exactly 1024 px (so 88% standing height = ~901 px in every frame). Never
  rescale per-pose. Trim only empty columns left and right. Record `pivotX` (body centre-of-mass x) and `baselineY` (~983).
- Reject and re-roll any frame where: the costume details drift (tie colour, pocket square, feather colour, boot gems),
  hands have the wrong number of fingers, the character faces left, any part is cropped, or a cast shadow is painted.
- Store the raw 2K generation in `art-src/` (not shipped). Ship only the processed PNG.

---


## Fighter sprites - SUITED AGENT (bob)

### 1. `public/assets/fighters/bob/idle_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a low, wide martial-arts fighting stance, knees bent, weight centered, left open hand forward in a claw guard at chest height, right hand guarding his chin, calm and immovable.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 2. `public/assets/fighters/bob/idle_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: the same low martial-arts stance mid-inhale: shoulders slightly raised, chest expanded, both guarding hands a little higher.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 3. `public/assets/fighters/bob/idle_03.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: the same low martial-arts stance exhaling: shoulders settled lower, weight shifted slightly onto the back leg, front hand flexing its fingers.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 4. `public/assets/fighters/bob/walk_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: an advancing walk, contact pose: guard held up, rear foot planted, front foot reaching forward heel-first, body upright and rigid like a machine.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 5. `public/assets/fighters/bob/walk_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: an advancing walk, passing pose: legs together under the hips, guard held perfectly still, jacket hem settled.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 6. `public/assets/fighters/bob/walk_03.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: an advancing walk, second contact pose: the other foot now forward, stride mirrored, jacket hem swinging.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 7. `public/assets/fighters/bob/walk_04.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: an advancing walk, second passing pose: slight forward lean, guard tight.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 8. `public/assets/fighters/bob/walk_back.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a cautious retreating step backward, weight on the back foot, front hand extended palm-out in a stop-guard.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 9. `public/assets/fighters/bob/dash.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: an explosive forward dash: body leaning low and forward at 30 degrees, rear leg fully extended behind, tie and jacket tails streaming backward.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 10. `public/assets/fighters/bob/jump_takeoff.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a crouched launch for a jump: both knees deeply bent, arms swinging upward, about to leap.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 11. `public/assets/fighters/bob/jump_apex.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: mid-air at the peak of a jump: knees tucked high to the chest, arms in a compact guard, jacket flaring.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 12. `public/assets/fighters/bob/jump_fall.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: descending from a jump: legs extending down to land, arms spread for balance.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 13. `public/assets/fighters/bob/crouch.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a deep crouch on the balls of both feet, one knee near the floor, low guard with both hands, eyes forward.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 14. `public/assets/fighters/bob/crouch_block.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a deep crouch with both forearms crossed in front of his face and chest, bracing for impact.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 15. `public/assets/fighters/bob/block.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a standing block: forearms raised vertically in front of his face, elbows tight, chin tucked, braced.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 16. `public/assets/fighters/bob/fp_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a front-punch startup: lead fist chambered at the hip, shoulders beginning to turn, rear hand guarding the chin.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 17. `public/assets/fighters/bob/fp_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a lightning-fast lead-hand jab fully extended to the right at head height, rear hand guarding the chin.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 18. `public/assets/fighters/bob/bp_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a power-punch wind-up: rear fist drawn far back past the hip, torso twisted away, weight loading onto the back leg.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 19. `public/assets/fighters/bob/bp_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a full-power rear straight punch extended to the right at face height, torso rotated, rear heel lifted.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 20. `public/assets/fighters/bob/fk_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a front-kick chamber: lead knee raised to waist height, foot flexed, arms in guard.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 21. `public/assets/fighters/bob/fk_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a front snap kick fully extended to the right at stomach height, sole of the boot forward, standing leg straight.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 22. `public/assets/fighters/bob/bk_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a roundhouse chamber: rear knee lifted and turning over, hips rotating, arms counterbalancing.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 23. `public/assets/fighters/bob/bk_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a high roundhouse kick extended to the right at head height, balanced on one leg, torso leaning back, perfectly controlled.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 24. `public/assets/fighters/bob/crouch_poke.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a crouching low jab: still crouched, lead fist punching straight forward at shin height.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 25. `public/assets/fighters/bob/sweep.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a low spinning leg sweep: crouched on one hand and one knee, the other leg sweeping straight out to the right along the floor.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 26. `public/assets/fighters/bob/uppercut.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a rising uppercut: knees driving up, rear fist rising vertically above his head, body stretched upward.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 27. `public/assets/fighters/bob/jump_punch.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: an airborne diagonal downward punch toward the lower right, legs tucked, fist leading.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 28. `public/assets/fighters/bob/jump_kick.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: an airborne flying side kick, lead leg extended diagonally down to the right, other leg tucked.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 29. `public/assets/fighters/bob/throw_grab.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: lunging forward with both hands extended at chest height, gripping an unseen opponent's lapels.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 30. `public/assets/fighters/bob/throw_toss.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a pivoting hip throw: torso twisted, both hands pulling across his body and down to the left, rear foot pivoted.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 31. `public/assets/fighters/bob/hit_high.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: being struck in the face: head snapped back, sunglasses knocked slightly askew, one foot lifting, arms flung outward, grimacing.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 32. `public/assets/fighters/bob/hit_body.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: being struck in the stomach: doubled over forward, one arm clutching his midsection, mouth open in a grunt.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 33. `public/assets/fighters/bob/hit_crouch.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: being hit while crouching: rocked back on his heels, one hand on the floor for balance, wincing.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 34. `public/assets/fighters/bob/launch.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: launched airborne backward: body arched nearly horizontal, arms and legs flailing, tie flying up.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 35. `public/assets/fighters/bob/knockdown.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: lying flat on his back on the ground, head toward the left, boots toward the right, one knee bent, arms spread, dazed.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 36. `public/assets/fighters/bob/wakeup.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: rising from the ground: one knee down, one hand on the raised knee, pushing up to stand while tugging his jacket straight.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 37. `public/assets/fighters/bob/dizzy.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: dazed and wobbling on unsteady legs, knees buckling, arms hanging loose, head tilted, cartoon-dazed expression, sunglasses crooked.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 38. `public/assets/fighters/bob/taunt.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a glasses-adjust taunt: standing tall and still, one index finger pushing the sunglasses up the bridge of his nose, other hand behind his back, smug smirk.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 39. `public/assets/fighters/bob/victory_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a victory pose: standing perfectly upright, both hands straightening his tie, chin raised, cold satisfied smirk.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 40. `public/assets/fighters/bob/victory_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a victory pose: arms crossed, standing at ease, head turned slightly toward the viewer, one eyebrow raised above the sunglasses.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 41. `public/assets/fighters/bob/defeat.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: defeated: kneeling on one knee, head bowed, one hand on the floor, suit rumpled, tie loosened, sunglasses held in his other hand.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 42. `public/assets/fighters/bob/fatality_victim.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a harmless cartoon defeat: sitting slumped on the floor with legs splayed, cartoon spiral-dazed eyes, sunglasses hanging crooked, tie askew, suit dusted all over with purple glitter and paper confetti, a small cartoon bump on his head. Comedic, not violent, no injuries.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 43. `public/assets/fighters/bob/sp_palm_flurry_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: the 'Blurred Palm Flurry' special: lunging forward in a low horse stance, both open palms thrusting forward to the right at chest height, extra ghosted hands painted as soft skin-toned motion smears (not glowing).

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 44. `public/assets/fighters/bob/sp_palm_flurry_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: the finishing strike of a palm flurry: a single open-palm strike fully extended to the right, other hand pulled back to the hip, jacket flaring.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 45. `public/assets/fighters/bob/sp_teleport_out.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a teleport vanish pose: standing upright with arms at his sides, chin raised, body tilting backward as if pulled away, perfectly calm.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 46. `public/assets/fighters/bob/sp_teleport_in.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a teleport arrival pose: landing in a crouch with one hand touching the floor, other arm extended back, looking up menacingly.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 47. `public/assets/fighters/bob/sp_eggplant_toss_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a throw wind-up: sideways stance, rear hand drawn back behind his head gripping a glossy dark-purple eggplant like a baseball, front hand pointing at the target.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 48. `public/assets/fighters/bob/sp_eggplant_toss_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a throw release: throwing arm fully extended forward to the right with fingers open (hand now empty), strong follow-through.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 49. `public/assets/fighters/bob/sp_clone_grapple.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a command pose: pointing forward with two fingers, other hand pressing his earpiece, stern expression.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 50. `public/assets/fighters/bob/sp_bullet_lean.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: an extreme slow-motion back-bend dodge: knees bent forward, torso arched backward almost parallel to the floor, arms flowing out to the sides, tie hanging down.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 51. `public/assets/fighters/bob/sp_aerial_dive.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: an airborne diving kick: body stretched diagonally downward to the lower right, heel of the leading boot first, arms swept back.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 52. `public/assets/fighters/bob/fb_system_purge_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a menacing wind-up: one hand slowly lowering the sunglasses down his nose to glare over them, other hand clenched into a fist at his side.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 53. `public/assets/fighters/bob/fb_system_purge_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a mid-combo hammer-fist driving forward and downward to the right, body fully committed, jacket whipping.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 54. `public/assets/fighters/bob/fb_system_purge_03.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: a towering rising uppercut: right fist thrust high above his head, back foot leaving the ground.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 55. `public/assets/fighters/bob/fatality_parm_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: standing perfectly still, adjusting his shirt cuffs with a cold smile, preparing.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 56. `public/assets/fighters/bob/fatality_parm_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: right arm raised straight up with the index finger pointing at the sky as if summoning something enormous from orbit, left hand in his trouser pocket.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 57. `public/assets/fighters/bob/fatality_parm_03.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Pose: turned three-quarters away, walking off calmly while straightening his tie, not looking back.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```


## Fighter sprites - DISCO SHOWMAN (cory)

### 58. `public/assets/fighters/cory/idle_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: an upright theatrical boxer's guard, both ring-covered fists raised beside his grinning face, hips cocked to one side, weight on the back foot, feather epaulettes fluffed up.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 59. `public/assets/fighters/cory/idle_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: the same boxer's guard, bouncing on the balls of his feet with shoulders mid-shimmy, coat tails swaying.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 60. `public/assets/fighters/cory/idle_03.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: the same boxer's guard with one wrist flicked outward playfully and a wink.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 61. `public/assets/fighters/cory/walk_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a sashaying catwalk strut forward, contact pose: front foot crossing in front of the back foot, fists up at chest height, hips swinging.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 62. `public/assets/fighters/cory/walk_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a catwalk strut, passing pose: legs passing under the hips, one shoulder dropped, coat tails swinging.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 63. `public/assets/fighters/cory/walk_03.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a catwalk strut, second contact pose: the other foot crossing forward, hips swinging the opposite way.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 64. `public/assets/fighters/cory/walk_04.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a catwalk strut, second passing pose: chin up, smug grin, feathers bouncing.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 65. `public/assets/fighters/cory/walk_back.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a playful backward glide on one heel, fists up, eyebrows raised teasingly.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 66. `public/assets/fighters/cory/dash.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a runway sprint dash: leaning far forward, one leg extended back, coat tails and feathers streaming, arms swept back like wings.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 67. `public/assets/fighters/cory/jump_takeoff.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: springing upward from a crouch, both arms flung up in a jazz-hands flourish.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 68. `public/assets/fighters/cory/jump_apex.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: mid-air at the peak of a jump in a pirouette tuck: knees together, arms wrapped close, coat tails fanning out.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 69. `public/assets/fighters/cory/jump_fall.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: descending from a jump with toes pointed like a dancer and arms elegantly spread.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 70. `public/assets/fighters/cory/crouch.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a low dancer's crouch with one knee down, fists up guarding, sly grin.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 71. `public/assets/fighters/cory/crouch_block.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: crouched behind both forearms crossed in front of his face, peeking over them with a grin.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 72. `public/assets/fighters/cory/block.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a standing block: forearms crossed in an X in front of his face, chin tucked, one eye peeking out.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 73. `public/assets/fighters/cory/fp_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a lead-hand slap wind-up: open hand pulled back beside his ear, rings catching the light.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 74. `public/assets/fighters/cory/fp_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a lightning backhand slap fully extended to the right at head height, wrist flicked, head tossed back proudly.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 75. `public/assets/fighters/cory/bp_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a rear-hand haymaker wind-up: body twisted away, tailcoat flaring, fist cocked by his ear.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 76. `public/assets/fighters/cory/bp_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a full-power rear punch extended to the right at face height, ring-covered fist leading, triumphant grin.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 77. `public/assets/fighters/cory/fk_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a dancer's high-kick chamber: knee lifted to the chest, toe pointed, arms out for balance.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 78. `public/assets/fighters/cory/fk_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a showgirl high kick: leading leg swung straight up and forward to the right almost vertical, boot sole forward, arms flung out.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 79. `public/assets/fighters/cory/bk_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a spin-kick chamber: back partly turned, coat tails and feathers swirling around him.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 80. `public/assets/fighters/cory/bk_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a spinning back-heel kick extended to the right at head height, coat tails whipping around in a circle.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 81. `public/assets/fighters/cory/crouch_poke.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a crouching quick flick-punch at shin height, other hand on his hip.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 82. `public/assets/fighters/cory/sweep.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a spinning floor sweep: crouched low on one hand, one leg extended along the floor to the right, coat tails fanned in a circle.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 83. `public/assets/fighters/cory/uppercut.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a rising uppercut with a full-body flourish: fist high above his head, back arched, other arm flung outward.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 84. `public/assets/fighters/cory/jump_punch.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: an airborne diagonal downward punch toward the lower right, legs tucked together, grinning.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 85. `public/assets/fighters/cory/jump_kick.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: an airborne ballet split-kick, leading leg extended diagonally down to the right, other leg extended back.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 86. `public/assets/fighters/cory/throw_grab.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: reaching forward with one hand to grab an unseen opponent by the tie, other hand on his hip, mischievous smirk.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 87. `public/assets/fighters/cory/throw_toss.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a ballroom-spin throw: pivoting on one foot, both arms swung across to the left, coat tails flaring.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 88. `public/assets/fighters/cory/hit_high.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: being slapped in the face: head snapped back, hair flying, mouth open in an offended gasp.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 89. `public/assets/fighters/cory/hit_body.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: being hit in the stomach: doubled over, one hand on his abs, eyes squeezed shut.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 90. `public/assets/fighters/cory/hit_crouch.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: being hit while crouching: rocked back, one hand on the floor, wincing dramatically.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 91. `public/assets/fighters/cory/launch.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: launched airborne backward: body arched, arms and legs flailing, loose feathers drifting off his shoulders.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 92. `public/assets/fighters/cory/knockdown.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: lying on his back on the ground, head toward the left, one arm draped across his forehead like a fainting movie star.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 93. `public/assets/fighters/cory/wakeup.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: rising from one knee, brushing off his shoulder with a flick of the fingers.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 94. `public/assets/fighters/cory/dizzy.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: dazed and wobbling, one hand on his forehead, knees knocking, cartoon-dazed expression.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 95. `public/assets/fighters/cory/taunt.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers. He is wearing oversized rhinestone-studded cat-eye sunglasses.

Pose: a spotlight taunt: a sharp vogue pose, one hand framing his face, the other on his hip, chin up, blowing a kiss.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 96. `public/assets/fighters/cory/victory_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers. He is wearing oversized rhinestone-studded cat-eye sunglasses.

Pose: a victory pose: arms flung wide in a showstopping finale, head thrown back laughing.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 97. `public/assets/fighters/cory/victory_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers. He is wearing oversized rhinestone-studded cat-eye sunglasses.

Pose: a victory pose: blowing a kiss toward the viewer, one hand on his hip, one heel popped.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 98. `public/assets/fighters/cory/defeat.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: defeated: sitting on the floor with legs folded to one side, pouting dramatically, hand on his chest, feather epaulettes drooping.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 99. `public/assets/fighters/cory/fatality_victim.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a harmless cartoon defeat: sitting slumped on the floor, cartoon spiral-dazed eyes, hair standing up frazzled, feathers ruffled and sticking out, dusted with purple sparkle dust, a small cartoon bump on his head. Comedic, not violent, no injuries.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 100. `public/assets/fighters/cory/sp_glitter_bomb_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: an underhand bowling wind-up: cupped hand drawn back low behind him, other arm extended forward, mischievous grin.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 101. `public/assets/fighters/cory/sp_glitter_bomb_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a release flourish: arm swung forward and up to the right, fingers spread open in a 'ta-da' gesture (hand empty).

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 102. `public/assets/fighters/cory/sp_runway_dash_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a spinning runway dash: leaning forward mid-pirouette, arms extended, coat tails fanned in a full circle.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 103. `public/assets/fighters/cory/sp_runway_dash_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: the end of a runway dash: a hip-cocked stop with one elbow thrust forward at shoulder height as a strike.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 104. `public/assets/fighters/cory/sp_disco_drop.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: pointing straight up at the ceiling with one finger like a disco dancer, other hand on his hip, looking up with delight.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 105. `public/assets/fighters/cory/sp_vogue_parry.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers. He is wearing oversized rhinestone-studded cat-eye sunglasses.

Pose: a sharp angular vogue pose: both hands framing his face, one knee lifted, frozen as if caught in a camera flash.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 106. `public/assets/fighters/cory/sp_boa_whip_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: holding a long, fluffy magenta feather boa in his rear hand and swinging it back over his shoulder.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 107. `public/assets/fighters/cory/sp_boa_whip_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: lashing a long fluffy magenta feather boa fully forward to the right like a whip, its end reaching far beyond his arm.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 108. `public/assets/fighters/cory/sp_air_twirl.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: an airborne rising corkscrew spin-kick: body vertical, one leg extended out to the right, arms raised, coat tails spiralling.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 109. `public/assets/fighters/cory/fb_showstopper_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers. He is wearing oversized rhinestone-studded cat-eye sunglasses.

Pose: lowering his sunglasses with one finger and winking, other hand raised as if holding an invisible camera flash.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 110. `public/assets/fighters/cory/fb_showstopper_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 4:3 at 2K, e.g. 2048x1536; key, then scale to 1024 tall; width trimmed, max 1365)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a spinning kick mid-spin, leg extended to the right at chest height, coat tails flaring in a full circle.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 4:3 landscape, 2K resolution.
```

### 111. `public/assets/fighters/cory/fb_showstopper_03.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers. He is wearing oversized rhinestone-studded cat-eye sunglasses.

Pose: both arms raised high overhead about to slam them down as if bringing down something huge, mouth open in a joyful shout.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 112. `public/assets/fighters/cory/fatality_aubergine_01.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers. He is wearing oversized rhinestone-studded cat-eye sunglasses.

Pose: paparazzi pose one: hand on hip, chin over his shoulder, smouldering look at the viewer.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 113. `public/assets/fighters/cory/fatality_aubergine_02.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers. He is wearing oversized rhinestone-studded cat-eye sunglasses.

Pose: paparazzi pose two: both arms raised in a V, head thrown back in delight.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```

### 114. `public/assets/fighters/cory/fatality_aubergine_03.png`

- **Resolution:** 1024 px tall PNG-32 (generate 3:4 at 2K, e.g. 1536x2048; key, then scale to 1024 tall; width trimmed, max 768)
- **Background:** Flat #00FF00 green (keyed to alpha). Full body, side view facing right, feet baseline 4% above bottom, standing height = 88% of frame.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers.

Pose: a final elegant deep bow, one arm sweeping across his body and the other extended behind him, grinning.

Single full-body character, classic 2D fighting-game side-on three-quarter view, body and face turned toward the RIGHT edge of the image. Background: perfectly flat, solid pure chroma green #00FF00 filling the whole image - no gradient, no floor, no cast shadow, no vignette, no glow, no particles, no motion lines. Scale lock: standing upright the figure would be 88% of the image height; keep that exact scale even when crouching, jumping or lying down (leave empty background instead of enlarging). The lowest point of the boots sits 4% above the bottom edge; keep at least 3% margin on every side, nothing cropped. Do not paint any green on the character and do not paint energy effects, glows, sparks or projectiles - those are added in-engine.

Aspect ratio 3:4 portrait, 2K resolution.
```


## Model sheets (generate these first; attach as reference to every sprite prompt)

### 115. `public/assets/ui/gallery/model-sheet-bob.jpg`

- **Resolution:** 2560x1440 JPG q90 (generate 16:9 at 2K, downscale)
- **Background:** Plain light-grey #D9D9D9 studio backdrop (shipped as a gallery image, not keyed).

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border.

Character model turnaround sheet of one character: a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots.

Show the same character four times standing in a neutral A-pose side by side at identical scale on one shared floor line: front view, three-quarter view facing right, side profile facing right, back view. Add two close-up head studies (front and profile) in the upper right. Consistent lighting, plain light-grey backdrop, no labels.

Aspect ratio 16:9, 2K resolution.
```

### 116. `public/assets/ui/gallery/model-sheet-cory.jpg`

- **Resolution:** 2560x1440 JPG q90 (generate 16:9 at 2K, downscale)
- **Background:** Plain light-grey #D9D9D9 studio backdrop (shipped as a gallery image, not keyed).

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border.

Character model turnaround sheet of one character: a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers. Show the rhinestone-studded cat-eye sunglasses once as a separate prop drawing in the corner.

Show the same character four times standing in a neutral A-pose side by side at identical scale on one shared floor line: front view, three-quarter view facing right, side profile facing right, back view. Add two close-up head studies (front and profile) in the upper right. Consistent lighting, plain light-grey backdrop, no labels.

Aspect ratio 16:9, 2K resolution.
```


## Stage - matrix-subway

### 117. `public/assets/stages/matrix-subway/night-preview.jpg`

- **Resolution:** Master composite: generate 21:9 at 4K (about 6336x2688). Ship a 1680x720 JPG q90 crop as the stage-select preview; keep the 4K master in art-src/ for the layer edits below.
- **Background:** Opaque full scene.

```text
Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Scene: a rain-soaked underground subway platform in a cyberpunk city: green-tinged white tiled walls, riveted steel pillars, flickering fluorescent tube lights, dripping pipes, a dark tunnel mouth with a distant approaching train headlight, puddles reflecting the lights, faint cascading green digital glyph light on the wet walls. Lighting and time: cold green-teal fluorescent light, heavy rain falling through ceiling grates, moody and dark.

Composition for a side-scrolling 2D fighting game: a very wide panoramic background, eye level at 45% of the image height, a flat walkable floor plane filling the bottom 15% of the image, completely unobstructed in the middle 80% of the width, no characters or people in the play area, symmetrical-ish balance so the camera can pan left and right.

Painted, highly detailed environment concept art matching a premium 2D fighting game. Aspect ratio 21:9, 4K resolution.
```

### 118. `public/assets/stages/matrix-subway/night-far.jpg`

- **Resolution:** 3840x1440 JPG q90 (edit of the 4K master, cropped to 2.67:1 = 6336x2376, then downscaled; never upscaled)
- **Background:** Opaque far plate (sky + distant architecture).

```text
Edit the attached master image (entry #117). If no image is attached, first paint this scene: a rain-soaked underground subway platform in a cyberpunk city: green-tinged white tiled walls, riveted steel pillars, flickering fluorescent tube lights, dripping pipes, a dark tunnel mouth with a distant approaching train headlight, puddles reflecting the lights, faint cascading green digital glyph light on the wet walls; cold green-teal fluorescent light, heavy rain falling through ceiling grates, moody and dark.

Remove every mid-ground and foreground element (steel support pillars, platform benches, a ticket turnstile, hanging fluorescent fixtures and the edge of the train tunnel; the wet tiled platform floor edge with yellow safety line, puddles and a few scattered newspapers) and repaint what would be behind them so only the sky and the most distant architecture/landscape remain, as one seamless far background plate. Keep the exact same lighting (cold green-teal fluorescent light, heavy rain falling through ceiling grates, moody and dark), palette, perspective and horizon at 45% height. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 119. `public/assets/stages/matrix-subway/night-mid.webp`

- **Resolution:** 3840x960 WebP q92 with lossless alpha (key, crop to 2.67:1, downscale to 3840 wide, keep the bottom 2/3)
- **Background:** Flat pure chroma magenta #FF00FF (keyed to alpha).

```text
Edit the attached master image (entry #117). If no image is attached, first paint this scene: a rain-soaked underground subway platform in a cyberpunk city: green-tinged white tiled walls, riveted steel pillars, flickering fluorescent tube lights, dripping pipes, a dark tunnel mouth with a distant approaching train headlight, puddles reflecting the lights, faint cascading green digital glyph light on the wet walls; cold green-teal fluorescent light, heavy rain falling through ceiling grates, moody and dark.

Keep ONLY the mid-ground set pieces - steel support pillars, platform benches, a ticket turnstile, hanging fluorescent fixtures and the edge of the train tunnel - exactly as painted, same lighting (cold green-teal fluorescent light, heavy rain falling through ceiling grates, moody and dark). Replace everything else (sky, distant city or landscape, floor and foreground) with perfectly flat solid pure chroma magenta #FF00FF, no gradient and no shadows on the key colour. Do not use magenta or hot-pink anywhere in the kept elements. Crisp clean edges. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 120. `public/assets/stages/matrix-subway/dawn-preview.jpg`

- **Resolution:** Master composite: generate 21:9 at 4K (about 6336x2688). Ship a 1680x720 JPG q90 crop as the stage-select preview; keep the 4K master in art-src/ for the layer edits below.
- **Background:** Opaque full scene.

```text
Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Scene: a rain-soaked underground subway platform in a cyberpunk city: green-tinged white tiled walls, riveted steel pillars, flickering fluorescent tube lights, dripping pipes, a dark tunnel mouth with a distant approaching train headlight, puddles reflecting the lights, faint cascading green digital glyph light on the wet walls. Lighting and time: the rain has stopped; warm golden sunrise light pours down through the street grates in dusty god-rays, steam rising from the puddles, the green tint softened.

Composition for a side-scrolling 2D fighting game: a very wide panoramic background, eye level at 45% of the image height, a flat walkable floor plane filling the bottom 15% of the image, completely unobstructed in the middle 80% of the width, no characters or people in the play area, symmetrical-ish balance so the camera can pan left and right.

Painted, highly detailed environment concept art matching a premium 2D fighting game. Aspect ratio 21:9, 4K resolution.
```

### 121. `public/assets/stages/matrix-subway/dawn-far.jpg`

- **Resolution:** 3840x1440 JPG q90 (edit of the 4K master, cropped to 2.67:1 = 6336x2376, then downscaled; never upscaled)
- **Background:** Opaque far plate (sky + distant architecture).

```text
Edit the attached master image (entry #120). If no image is attached, first paint this scene: a rain-soaked underground subway platform in a cyberpunk city: green-tinged white tiled walls, riveted steel pillars, flickering fluorescent tube lights, dripping pipes, a dark tunnel mouth with a distant approaching train headlight, puddles reflecting the lights, faint cascading green digital glyph light on the wet walls; the rain has stopped; warm golden sunrise light pours down through the street grates in dusty god-rays, steam rising from the puddles, the green tint softened.

Remove every mid-ground and foreground element (steel support pillars, platform benches, a ticket turnstile, hanging fluorescent fixtures and the edge of the train tunnel; the wet tiled platform floor edge with yellow safety line, puddles and a few scattered newspapers) and repaint what would be behind them so only the sky and the most distant architecture/landscape remain, as one seamless far background plate. Keep the exact same lighting (the rain has stopped; warm golden sunrise light pours down through the street grates in dusty god-rays, steam rising from the puddles, the green tint softened), palette, perspective and horizon at 45% height. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 122. `public/assets/stages/matrix-subway/dawn-mid.webp`

- **Resolution:** 3840x960 WebP q92 with lossless alpha (key, crop to 2.67:1, downscale to 3840 wide, keep the bottom 2/3)
- **Background:** Flat pure chroma magenta #FF00FF (keyed to alpha).

```text
Edit the attached master image (entry #120). If no image is attached, first paint this scene: a rain-soaked underground subway platform in a cyberpunk city: green-tinged white tiled walls, riveted steel pillars, flickering fluorescent tube lights, dripping pipes, a dark tunnel mouth with a distant approaching train headlight, puddles reflecting the lights, faint cascading green digital glyph light on the wet walls; the rain has stopped; warm golden sunrise light pours down through the street grates in dusty god-rays, steam rising from the puddles, the green tint softened.

Keep ONLY the mid-ground set pieces - steel support pillars, platform benches, a ticket turnstile, hanging fluorescent fixtures and the edge of the train tunnel - exactly as painted, same lighting (the rain has stopped; warm golden sunrise light pours down through the street grates in dusty god-rays, steam rising from the puddles, the green tint softened). Replace everything else (sky, distant city or landscape, floor and foreground) with perfectly flat solid pure chroma magenta #FF00FF, no gradient and no shadows on the key colour. Do not use magenta or hot-pink anywhere in the kept elements. Crisp clean edges. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 123. `public/assets/stages/matrix-subway/fore.webp`

- **Resolution:** 3840x480 WebP q92 with lossless alpha (key, crop to 2.67:1, downscale to 3840 wide, keep the bottom 1/3; shared by both variants, tinted per variant in-engine)
- **Background:** Flat pure chroma magenta #FF00FF (keyed to alpha).

```text
Edit the attached master image (entry #117). If no image is attached, first paint this scene: a rain-soaked underground subway platform in a cyberpunk city: green-tinged white tiled walls, riveted steel pillars, flickering fluorescent tube lights, dripping pipes, a dark tunnel mouth with a distant approaching train headlight, puddles reflecting the lights, faint cascading green digital glyph light on the wet walls.

Keep ONLY the nearest floor band and foreground details - the wet tiled platform floor edge with yellow safety line, puddles and a few scattered newspapers - in the bottom quarter of the image, lit by neutral soft white light so it can be colour-tinted later. Replace everything above and behind with perfectly flat solid pure chroma magenta #FF00FF. Do not use magenta or hot-pink in the kept elements. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```


## Stage - disco-penthouse

### 124. `public/assets/stages/disco-penthouse/night-preview.jpg`

- **Resolution:** Master composite: generate 21:9 at 4K (about 6336x2688). Ship a 1680x720 JPG q90 crop as the stage-select preview; keep the 4K master in art-src/ for the layer edits below.
- **Background:** Opaque full scene.

```text
Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Scene: a luxury penthouse rooftop disco high above a neon skyline: steel lighting truss overhead with three mirror disco balls, a light-up dance floor of pink, cyan, violet and gold glass tiles, gold stanchions with velvet ropes, plush purple lounge sofas, a glowing bar with bottles, glass balustrade, futuristic skyscrapers behind. Lighting and time: neon magenta, cyan and violet spotlights sweeping the air, starry night sky, sparkling city lights.

Composition for a side-scrolling 2D fighting game: a very wide panoramic background, eye level at 45% of the image height, a flat walkable floor plane filling the bottom 15% of the image, completely unobstructed in the middle 80% of the width, no characters or people in the play area, symmetrical-ish balance so the camera can pan left and right.

Painted, highly detailed environment concept art matching a premium 2D fighting game. Aspect ratio 21:9, 4K resolution.
```

### 125. `public/assets/stages/disco-penthouse/night-far.jpg`

- **Resolution:** 3840x1440 JPG q90 (edit of the 4K master, cropped to 2.67:1 = 6336x2376, then downscaled; never upscaled)
- **Background:** Opaque far plate (sky + distant architecture).

```text
Edit the attached master image (entry #124). If no image is attached, first paint this scene: a luxury penthouse rooftop disco high above a neon skyline: steel lighting truss overhead with three mirror disco balls, a light-up dance floor of pink, cyan, violet and gold glass tiles, gold stanchions with velvet ropes, plush purple lounge sofas, a glowing bar with bottles, glass balustrade, futuristic skyscrapers behind; neon magenta, cyan and violet spotlights sweeping the air, starry night sky, sparkling city lights.

Remove every mid-ground and foreground element (the lighting truss with disco balls and spotlights, the bar counter, purple sofas and potted palms; the light-up glass tile dance floor and the row of gold stanchions with velvet ropes) and repaint what would be behind them so only the sky and the most distant architecture/landscape remain, as one seamless far background plate. Keep the exact same lighting (neon magenta, cyan and violet spotlights sweeping the air, starry night sky, sparkling city lights), palette, perspective and horizon at 45% height. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 126. `public/assets/stages/disco-penthouse/night-mid.webp`

- **Resolution:** 3840x960 WebP q92 with lossless alpha (key, crop to 2.67:1, downscale to 3840 wide, keep the bottom 2/3)
- **Background:** Flat pure chroma green #00FF00 (keyed to alpha).

```text
Edit the attached master image (entry #124). If no image is attached, first paint this scene: a luxury penthouse rooftop disco high above a neon skyline: steel lighting truss overhead with three mirror disco balls, a light-up dance floor of pink, cyan, violet and gold glass tiles, gold stanchions with velvet ropes, plush purple lounge sofas, a glowing bar with bottles, glass balustrade, futuristic skyscrapers behind; neon magenta, cyan and violet spotlights sweeping the air, starry night sky, sparkling city lights.

Keep ONLY the mid-ground set pieces - the lighting truss with disco balls and spotlights, the bar counter, purple sofas and potted palms - exactly as painted, same lighting (neon magenta, cyan and violet spotlights sweeping the air, starry night sky, sparkling city lights). Replace everything else (sky, distant city or landscape, floor and foreground) with perfectly flat solid pure chroma green #00FF00, no gradient and no shadows on the key colour. Do not use green anywhere in the kept elements. Crisp clean edges. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 127. `public/assets/stages/disco-penthouse/sunset-preview.jpg`

- **Resolution:** Master composite: generate 21:9 at 4K (about 6336x2688). Ship a 1680x720 JPG q90 crop as the stage-select preview; keep the 4K master in art-src/ for the layer edits below.
- **Background:** Opaque full scene.

```text
Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Scene: a luxury penthouse rooftop disco high above a neon skyline: steel lighting truss overhead with three mirror disco balls, a light-up dance floor of pink, cyan, violet and gold glass tiles, gold stanchions with velvet ropes, plush purple lounge sofas, a glowing bar with bottles, glass balustrade, futuristic skyscrapers behind. Lighting and time: golden-hour sunset sky in orange, peach and magenta, the disco balls catching the sun, city lights just starting to glow, long warm shadows.

Composition for a side-scrolling 2D fighting game: a very wide panoramic background, eye level at 45% of the image height, a flat walkable floor plane filling the bottom 15% of the image, completely unobstructed in the middle 80% of the width, no characters or people in the play area, symmetrical-ish balance so the camera can pan left and right.

Painted, highly detailed environment concept art matching a premium 2D fighting game. Aspect ratio 21:9, 4K resolution.
```

### 128. `public/assets/stages/disco-penthouse/sunset-far.jpg`

- **Resolution:** 3840x1440 JPG q90 (edit of the 4K master, cropped to 2.67:1 = 6336x2376, then downscaled; never upscaled)
- **Background:** Opaque far plate (sky + distant architecture).

```text
Edit the attached master image (entry #127). If no image is attached, first paint this scene: a luxury penthouse rooftop disco high above a neon skyline: steel lighting truss overhead with three mirror disco balls, a light-up dance floor of pink, cyan, violet and gold glass tiles, gold stanchions with velvet ropes, plush purple lounge sofas, a glowing bar with bottles, glass balustrade, futuristic skyscrapers behind; golden-hour sunset sky in orange, peach and magenta, the disco balls catching the sun, city lights just starting to glow, long warm shadows.

Remove every mid-ground and foreground element (the lighting truss with disco balls and spotlights, the bar counter, purple sofas and potted palms; the light-up glass tile dance floor and the row of gold stanchions with velvet ropes) and repaint what would be behind them so only the sky and the most distant architecture/landscape remain, as one seamless far background plate. Keep the exact same lighting (golden-hour sunset sky in orange, peach and magenta, the disco balls catching the sun, city lights just starting to glow, long warm shadows), palette, perspective and horizon at 45% height. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 129. `public/assets/stages/disco-penthouse/sunset-mid.webp`

- **Resolution:** 3840x960 WebP q92 with lossless alpha (key, crop to 2.67:1, downscale to 3840 wide, keep the bottom 2/3)
- **Background:** Flat pure chroma green #00FF00 (keyed to alpha).

```text
Edit the attached master image (entry #127). If no image is attached, first paint this scene: a luxury penthouse rooftop disco high above a neon skyline: steel lighting truss overhead with three mirror disco balls, a light-up dance floor of pink, cyan, violet and gold glass tiles, gold stanchions with velvet ropes, plush purple lounge sofas, a glowing bar with bottles, glass balustrade, futuristic skyscrapers behind; golden-hour sunset sky in orange, peach and magenta, the disco balls catching the sun, city lights just starting to glow, long warm shadows.

Keep ONLY the mid-ground set pieces - the lighting truss with disco balls and spotlights, the bar counter, purple sofas and potted palms - exactly as painted, same lighting (golden-hour sunset sky in orange, peach and magenta, the disco balls catching the sun, city lights just starting to glow, long warm shadows). Replace everything else (sky, distant city or landscape, floor and foreground) with perfectly flat solid pure chroma green #00FF00, no gradient and no shadows on the key colour. Do not use green anywhere in the kept elements. Crisp clean edges. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 130. `public/assets/stages/disco-penthouse/fore.webp`

- **Resolution:** 3840x480 WebP q92 with lossless alpha (key, crop to 2.67:1, downscale to 3840 wide, keep the bottom 1/3; shared by both variants, tinted per variant in-engine)
- **Background:** Flat pure chroma green #00FF00 (keyed to alpha).

```text
Edit the attached master image (entry #124). If no image is attached, first paint this scene: a luxury penthouse rooftop disco high above a neon skyline: steel lighting truss overhead with three mirror disco balls, a light-up dance floor of pink, cyan, violet and gold glass tiles, gold stanchions with velvet ropes, plush purple lounge sofas, a glowing bar with bottles, glass balustrade, futuristic skyscrapers behind.

Keep ONLY the nearest floor band and foreground details - the light-up glass tile dance floor and the row of gold stanchions with velvet ropes - in the bottom quarter of the image, lit by neutral soft white light so it can be colour-tinted later. Replace everything above and behind with perfectly flat solid pure chroma green #00FF00. Do not use green in the kept elements. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```


## Stage - eggplant-colosseum

### 131. `public/assets/stages/eggplant-colosseum/storm-preview.jpg`

- **Resolution:** Master composite: generate 21:9 at 4K (about 6336x2688). Ship a 1680x720 JPG q90 crop as the stage-select preview; keep the 4K master in art-src/ for the layer edits below.
- **Background:** Opaque full scene.

```text
Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Scene: an ancient stone colosseum temple devoted to a giant golden eggplant: towering weathered sandstone arches, colossal gilded eggplant statues on pedestals, bronze braziers with roaring flames, long purple banners embroidered with a gold eggplant emblem, a cheering crowd shown only as distant silhouettes in the stands. Lighting and time: stormy twilight with violet lightning in heavy clouds, flickering torchlight, glowing embers drifting.

Composition for a side-scrolling 2D fighting game: a very wide panoramic background, eye level at 45% of the image height, a flat walkable floor plane filling the bottom 15% of the image, completely unobstructed in the middle 80% of the width, no characters or people in the play area, symmetrical-ish balance so the camera can pan left and right.

Painted, highly detailed environment concept art matching a premium 2D fighting game. Aspect ratio 21:9, 4K resolution.
```

### 132. `public/assets/stages/eggplant-colosseum/storm-far.jpg`

- **Resolution:** 3840x1440 JPG q90 (edit of the 4K master, cropped to 2.67:1 = 6336x2376, then downscaled; never upscaled)
- **Background:** Opaque far plate (sky + distant architecture).

```text
Edit the attached master image (entry #131). If no image is attached, first paint this scene: an ancient stone colosseum temple devoted to a giant golden eggplant: towering weathered sandstone arches, colossal gilded eggplant statues on pedestals, bronze braziers with roaring flames, long purple banners embroidered with a gold eggplant emblem, a cheering crowd shown only as distant silhouettes in the stands; stormy twilight with violet lightning in heavy clouds, flickering torchlight, glowing embers drifting.

Remove every mid-ground and foreground element (the inner ring of arches, the golden eggplant statues, the braziers and the purple banners; the sandy arena floor with cracked flagstones, scattered rose petals and a low carved stone border) and repaint what would be behind them so only the sky and the most distant architecture/landscape remain, as one seamless far background plate. Keep the exact same lighting (stormy twilight with violet lightning in heavy clouds, flickering torchlight, glowing embers drifting), palette, perspective and horizon at 45% height. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 133. `public/assets/stages/eggplant-colosseum/storm-mid.webp`

- **Resolution:** 3840x960 WebP q92 with lossless alpha (key, crop to 2.67:1, downscale to 3840 wide, keep the bottom 2/3)
- **Background:** Flat pure chroma green #00FF00 (keyed to alpha).

```text
Edit the attached master image (entry #131). If no image is attached, first paint this scene: an ancient stone colosseum temple devoted to a giant golden eggplant: towering weathered sandstone arches, colossal gilded eggplant statues on pedestals, bronze braziers with roaring flames, long purple banners embroidered with a gold eggplant emblem, a cheering crowd shown only as distant silhouettes in the stands; stormy twilight with violet lightning in heavy clouds, flickering torchlight, glowing embers drifting.

Keep ONLY the mid-ground set pieces - the inner ring of arches, the golden eggplant statues, the braziers and the purple banners - exactly as painted, same lighting (stormy twilight with violet lightning in heavy clouds, flickering torchlight, glowing embers drifting). Replace everything else (sky, distant city or landscape, floor and foreground) with perfectly flat solid pure chroma green #00FF00, no gradient and no shadows on the key colour. Do not use green anywhere in the kept elements. Crisp clean edges. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 134. `public/assets/stages/eggplant-colosseum/noon-preview.jpg`

- **Resolution:** Master composite: generate 21:9 at 4K (about 6336x2688). Ship a 1680x720 JPG q90 crop as the stage-select preview; keep the 4K master in art-src/ for the layer edits below.
- **Background:** Opaque full scene.

```text
Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Scene: an ancient stone colosseum temple devoted to a giant golden eggplant: towering weathered sandstone arches, colossal gilded eggplant statues on pedestals, bronze braziers with roaring flames, long purple banners embroidered with a gold eggplant emblem, a cheering crowd shown only as distant silhouettes in the stands. Lighting and time: blazing high-noon desert sun in a cloudless blue sky, bright bleached stone, crisp short shadows, heat shimmer, banners fluttering.

Composition for a side-scrolling 2D fighting game: a very wide panoramic background, eye level at 45% of the image height, a flat walkable floor plane filling the bottom 15% of the image, completely unobstructed in the middle 80% of the width, no characters or people in the play area, symmetrical-ish balance so the camera can pan left and right.

Painted, highly detailed environment concept art matching a premium 2D fighting game. Aspect ratio 21:9, 4K resolution.
```

### 135. `public/assets/stages/eggplant-colosseum/noon-far.jpg`

- **Resolution:** 3840x1440 JPG q90 (edit of the 4K master, cropped to 2.67:1 = 6336x2376, then downscaled; never upscaled)
- **Background:** Opaque far plate (sky + distant architecture).

```text
Edit the attached master image (entry #134). If no image is attached, first paint this scene: an ancient stone colosseum temple devoted to a giant golden eggplant: towering weathered sandstone arches, colossal gilded eggplant statues on pedestals, bronze braziers with roaring flames, long purple banners embroidered with a gold eggplant emblem, a cheering crowd shown only as distant silhouettes in the stands; blazing high-noon desert sun in a cloudless blue sky, bright bleached stone, crisp short shadows, heat shimmer, banners fluttering.

Remove every mid-ground and foreground element (the inner ring of arches, the golden eggplant statues, the braziers and the purple banners; the sandy arena floor with cracked flagstones, scattered rose petals and a low carved stone border) and repaint what would be behind them so only the sky and the most distant architecture/landscape remain, as one seamless far background plate. Keep the exact same lighting (blazing high-noon desert sun in a cloudless blue sky, bright bleached stone, crisp short shadows, heat shimmer, banners fluttering), palette, perspective and horizon at 45% height. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 136. `public/assets/stages/eggplant-colosseum/noon-mid.webp`

- **Resolution:** 3840x960 WebP q92 with lossless alpha (key, crop to 2.67:1, downscale to 3840 wide, keep the bottom 2/3)
- **Background:** Flat pure chroma green #00FF00 (keyed to alpha).

```text
Edit the attached master image (entry #134). If no image is attached, first paint this scene: an ancient stone colosseum temple devoted to a giant golden eggplant: towering weathered sandstone arches, colossal gilded eggplant statues on pedestals, bronze braziers with roaring flames, long purple banners embroidered with a gold eggplant emblem, a cheering crowd shown only as distant silhouettes in the stands; blazing high-noon desert sun in a cloudless blue sky, bright bleached stone, crisp short shadows, heat shimmer, banners fluttering.

Keep ONLY the mid-ground set pieces - the inner ring of arches, the golden eggplant statues, the braziers and the purple banners - exactly as painted, same lighting (blazing high-noon desert sun in a cloudless blue sky, bright bleached stone, crisp short shadows, heat shimmer, banners fluttering). Replace everything else (sky, distant city or landscape, floor and foreground) with perfectly flat solid pure chroma green #00FF00, no gradient and no shadows on the key colour. Do not use green anywhere in the kept elements. Crisp clean edges. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 137. `public/assets/stages/eggplant-colosseum/fore.webp`

- **Resolution:** 3840x480 WebP q92 with lossless alpha (key, crop to 2.67:1, downscale to 3840 wide, keep the bottom 1/3; shared by both variants, tinted per variant in-engine)
- **Background:** Flat pure chroma green #00FF00 (keyed to alpha).

```text
Edit the attached master image (entry #131). If no image is attached, first paint this scene: an ancient stone colosseum temple devoted to a giant golden eggplant: towering weathered sandstone arches, colossal gilded eggplant statues on pedestals, bronze braziers with roaring flames, long purple banners embroidered with a gold eggplant emblem, a cheering crowd shown only as distant silhouettes in the stands.

Keep ONLY the nearest floor band and foreground details - the sandy arena floor with cracked flagstones, scattered rose petals and a low carved stone border - in the bottom quarter of the image, lit by neutral soft white light so it can be colour-tinted later. Replace everything above and behind with perfectly flat solid pure chroma green #00FF00. Do not use green in the kept elements. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```


## Stage - scottsdale-lounge

### 138. `public/assets/stages/scottsdale-lounge/midnight-preview.jpg`

- **Resolution:** Master composite: generate 21:9 at 4K (about 6336x2688). Ship a 1680x720 JPG q90 crop as the stage-select preview; keep the 4K master in art-src/ for the layer edits below.
- **Background:** Opaque full scene.

```text
Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Scene: an upscale VIP courtyard lounge in the Arizona desert: smooth adobe and modern stucco walls, tall palm trees, saguaro cacti, strings of warm bistro lights, round fire pits with dancing flames, white cabana daybeds with gauzy curtains, a glowing turquoise infinity pool, abstract neon wall sculptures in cyan and pink (no readable words), a rugged camel-hump-shaped mountain silhouette on the horizon. Lighting and time: deep indigo midnight sky full of stars, warm firelight and cool neon glow, the pool casting rippling light on the walls.

Composition for a side-scrolling 2D fighting game: a very wide panoramic background, eye level at 45% of the image height, a flat walkable floor plane filling the bottom 15% of the image, completely unobstructed in the middle 80% of the width, no characters or people in the play area, symmetrical-ish balance so the camera can pan left and right.

Painted, highly detailed environment concept art matching a premium 2D fighting game. Aspect ratio 21:9, 4K resolution.
```

### 139. `public/assets/stages/scottsdale-lounge/midnight-far.jpg`

- **Resolution:** 3840x1440 JPG q90 (edit of the 4K master, cropped to 2.67:1 = 6336x2376, then downscaled; never upscaled)
- **Background:** Opaque far plate (sky + distant architecture).

```text
Edit the attached master image (entry #138). If no image is attached, first paint this scene: an upscale VIP courtyard lounge in the Arizona desert: smooth adobe and modern stucco walls, tall palm trees, saguaro cacti, strings of warm bistro lights, round fire pits with dancing flames, white cabana daybeds with gauzy curtains, a glowing turquoise infinity pool, abstract neon wall sculptures in cyan and pink (no readable words), a rugged camel-hump-shaped mountain silhouette on the horizon; deep indigo midnight sky full of stars, warm firelight and cool neon glow, the pool casting rippling light on the walls.

Remove every mid-ground and foreground element (the palm trees, saguaro cacti, cabana daybeds, fire pits, bistro-light strings and the neon wall sculptures; the smooth flagstone patio floor with low succulent planters and a lantern at each end) and repaint what would be behind them so only the sky and the most distant architecture/landscape remain, as one seamless far background plate. Keep the exact same lighting (deep indigo midnight sky full of stars, warm firelight and cool neon glow, the pool casting rippling light on the walls), palette, perspective and horizon at 45% height. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 140. `public/assets/stages/scottsdale-lounge/midnight-mid.webp`

- **Resolution:** 3840x960 WebP q92 with lossless alpha (key, crop to 2.67:1, downscale to 3840 wide, keep the bottom 2/3)
- **Background:** Flat pure chroma blue #0000FF (keyed to alpha).

```text
Edit the attached master image (entry #138). If no image is attached, first paint this scene: an upscale VIP courtyard lounge in the Arizona desert: smooth adobe and modern stucco walls, tall palm trees, saguaro cacti, strings of warm bistro lights, round fire pits with dancing flames, white cabana daybeds with gauzy curtains, a glowing turquoise infinity pool, abstract neon wall sculptures in cyan and pink (no readable words), a rugged camel-hump-shaped mountain silhouette on the horizon; deep indigo midnight sky full of stars, warm firelight and cool neon glow, the pool casting rippling light on the walls.

Keep ONLY the mid-ground set pieces - the palm trees, saguaro cacti, cabana daybeds, fire pits, bistro-light strings and the neon wall sculptures - exactly as painted, same lighting (deep indigo midnight sky full of stars, warm firelight and cool neon glow, the pool casting rippling light on the walls). Replace everything else (sky, distant city or landscape, floor and foreground) with perfectly flat solid pure chroma blue #0000FF, no gradient and no shadows on the key colour. Do not use saturated pure blue anywhere in the kept elements. Crisp clean edges. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 141. `public/assets/stages/scottsdale-lounge/sunset-preview.jpg`

- **Resolution:** Master composite: generate 21:9 at 4K (about 6336x2688). Ship a 1680x720 JPG q90 crop as the stage-select preview; keep the 4K master in art-src/ for the layer edits below.
- **Background:** Opaque full scene.

```text
Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Scene: an upscale VIP courtyard lounge in the Arizona desert: smooth adobe and modern stucco walls, tall palm trees, saguaro cacti, strings of warm bistro lights, round fire pits with dancing flames, white cabana daybeds with gauzy curtains, a glowing turquoise infinity pool, abstract neon wall sculptures in cyan and pink (no readable words), a rugged camel-hump-shaped mountain silhouette on the horizon. Lighting and time: a blazing desert sunset sky in orange, coral and lavender, the mountain glowing red, string lights just switched on, long warm shadows.

Composition for a side-scrolling 2D fighting game: a very wide panoramic background, eye level at 45% of the image height, a flat walkable floor plane filling the bottom 15% of the image, completely unobstructed in the middle 80% of the width, no characters or people in the play area, symmetrical-ish balance so the camera can pan left and right.

Painted, highly detailed environment concept art matching a premium 2D fighting game. Aspect ratio 21:9, 4K resolution.
```

### 142. `public/assets/stages/scottsdale-lounge/sunset-far.jpg`

- **Resolution:** 3840x1440 JPG q90 (edit of the 4K master, cropped to 2.67:1 = 6336x2376, then downscaled; never upscaled)
- **Background:** Opaque far plate (sky + distant architecture).

```text
Edit the attached master image (entry #141). If no image is attached, first paint this scene: an upscale VIP courtyard lounge in the Arizona desert: smooth adobe and modern stucco walls, tall palm trees, saguaro cacti, strings of warm bistro lights, round fire pits with dancing flames, white cabana daybeds with gauzy curtains, a glowing turquoise infinity pool, abstract neon wall sculptures in cyan and pink (no readable words), a rugged camel-hump-shaped mountain silhouette on the horizon; a blazing desert sunset sky in orange, coral and lavender, the mountain glowing red, string lights just switched on, long warm shadows.

Remove every mid-ground and foreground element (the palm trees, saguaro cacti, cabana daybeds, fire pits, bistro-light strings and the neon wall sculptures; the smooth flagstone patio floor with low succulent planters and a lantern at each end) and repaint what would be behind them so only the sky and the most distant architecture/landscape remain, as one seamless far background plate. Keep the exact same lighting (a blazing desert sunset sky in orange, coral and lavender, the mountain glowing red, string lights just switched on, long warm shadows), palette, perspective and horizon at 45% height. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 143. `public/assets/stages/scottsdale-lounge/sunset-mid.webp`

- **Resolution:** 3840x960 WebP q92 with lossless alpha (key, crop to 2.67:1, downscale to 3840 wide, keep the bottom 2/3)
- **Background:** Flat pure chroma blue #0000FF (keyed to alpha).

```text
Edit the attached master image (entry #141). If no image is attached, first paint this scene: an upscale VIP courtyard lounge in the Arizona desert: smooth adobe and modern stucco walls, tall palm trees, saguaro cacti, strings of warm bistro lights, round fire pits with dancing flames, white cabana daybeds with gauzy curtains, a glowing turquoise infinity pool, abstract neon wall sculptures in cyan and pink (no readable words), a rugged camel-hump-shaped mountain silhouette on the horizon; a blazing desert sunset sky in orange, coral and lavender, the mountain glowing red, string lights just switched on, long warm shadows.

Keep ONLY the mid-ground set pieces - the palm trees, saguaro cacti, cabana daybeds, fire pits, bistro-light strings and the neon wall sculptures - exactly as painted, same lighting (a blazing desert sunset sky in orange, coral and lavender, the mountain glowing red, string lights just switched on, long warm shadows). Replace everything else (sky, distant city or landscape, floor and foreground) with perfectly flat solid pure chroma blue #0000FF, no gradient and no shadows on the key colour. Do not use saturated pure blue anywhere in the kept elements. Crisp clean edges. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```

### 144. `public/assets/stages/scottsdale-lounge/fore.webp`

- **Resolution:** 3840x480 WebP q92 with lossless alpha (key, crop to 2.67:1, downscale to 3840 wide, keep the bottom 1/3; shared by both variants, tinted per variant in-engine)
- **Background:** Flat pure chroma blue #0000FF (keyed to alpha).

```text
Edit the attached master image (entry #138). If no image is attached, first paint this scene: an upscale VIP courtyard lounge in the Arizona desert: smooth adobe and modern stucco walls, tall palm trees, saguaro cacti, strings of warm bistro lights, round fire pits with dancing flames, white cabana daybeds with gauzy curtains, a glowing turquoise infinity pool, abstract neon wall sculptures in cyan and pink (no readable words), a rugged camel-hump-shaped mountain silhouette on the horizon.

Keep ONLY the nearest floor band and foreground details - the smooth flagstone patio floor with low succulent planters and a lantern at each end - in the bottom quarter of the image, lit by neutral soft white light so it can be colour-tinted later. Replace everything above and behind with perfectly flat solid pure chroma blue #0000FF. Do not use saturated pure blue in the kept elements. Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Aspect ratio 21:9, 4K resolution.
```


## Cutscene stills (story, arcade, Fatal Blow and Fatality cut-ins)

### 145. `public/assets/story/intro-01-city.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

A sprawling night city skyline split by colour: on the left a monolithic server tower glowing cold green, on the right a penthouse rooftop blazing with pink and violet disco lights; rain clouds above. Wide establishing shot, no people.

Aspect ratio 16:9, 2K resolution.
```

### 146. `public/assets/story/intro-02-agent.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

Inside a dark server room lined with racks of blinking lights, the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, stands alone pressing his earpiece, receiving orders, lit by cold monitor glow. Medium shot.

Aspect ratio 16:9, 2K resolution.
```

### 147. `public/assets/story/intro-03-showman.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

On a neon rooftop dance floor, the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, opens a gold envelope sealed with a purple wax eggplant emblem, delighted, glitter in the air. Medium shot.

Aspect ratio 16:9, 2K resolution.
```

### 148. `public/assets/story/intro-04-gate.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

Two rivals face each other in front of the towering stone gate of an ancient colosseum at twilight: on the left the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots; on the right the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, grinning and leaning in playfully while the agent stays stone-faced. Wide shot, torches burning.

Aspect ratio 16:9, 2K resolution.
```

### 149. `public/assets/story/intro-05-trophy.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

A gleaming solid-gold eggplant trophy on a carved stone pedestal in the centre of an empty colosseum arena, a beam of light hitting it, violet lightning in the storm clouds above. No people.

Aspect ratio 16:9, 2K resolution.
```

### 150. `public/assets/story/arcade-bob-rival.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

At the entrance of a desert VIP lounge at midnight with palm trees and string lights, the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, walks toward the camera, adjusting his cufflinks; in the background a flamboyant silhouette with feather epaulettes waits under a pink spotlight.

Aspect ratio 16:9, 2K resolution.
```

### 151. `public/assets/story/arcade-bob-end-01.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

In a colosseum arena under a beam of light, the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, holds a solid-gold eggplant trophy aloft with one hand, expression perfectly neutral, confetti falling.

Aspect ratio 16:9, 2K resolution.
```

### 152. `public/assets/story/arcade-bob-end-02.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

In a dark server room, the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, sits at a terminal typing a report; on his dark lapel a single tiny pink sequin glints. Close-medium shot, cold blue-green light.

Aspect ratio 16:9, 2K resolution.
```

### 153. `public/assets/story/arcade-bob-end-03.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

Alone at the bar of a desert VIP lounge at midnight, the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, sits upright with a glass of sparkling water while one boot is subtly tapping to the music; neon and firelight glow.

Aspect ratio 16:9, 2K resolution.
```

### 154. `public/assets/story/arcade-bob-end-04.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

Close-up of the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, tucking a single pink sequin into his white pocket square, the faintest genuine smile under the beard. Warm lounge light.

Aspect ratio 16:9, 2K resolution.
```

### 155. `public/assets/story/arcade-cory-rival.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

In a rain-soaked green-lit subway station, the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, struts down the platform toward the camera with his sunglasses on; at the far end a stern suited silhouette waits under a flickering light.

Aspect ratio 16:9, 2K resolution.
```

### 156. `public/assets/story/arcade-cory-end-01.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

On a colosseum stage under spotlights, the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, hoists a solid-gold eggplant trophy overhead, laughing, purple and gold confetti raining down, crowd silhouettes cheering.

Aspect ratio 16:9, 2K resolution.
```

### 157. `public/assets/story/arcade-cory-end-02.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

The ancient stone colosseum transformed into a dazzling nightclub: giant mirror disco balls hanging from the arches, lasers, a glowing dance floor over the sand, silhouettes dancing. Wide shot, no close-up people.

Aspect ratio 16:9, 2K resolution.
```

### 158. `public/assets/story/arcade-cory-end-03.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

Backstage dressing room with bulb mirrors: the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, happily fastens a sparkly sequined tie on the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, who stands stiffly with a mildly unimpressed expression. Friendly comedic tone.

Aspect ratio 16:9, 2K resolution.
```

### 159. `public/assets/story/arcade-cory-end-04.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

On a desert lounge dance floor at night under string lights, the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, dances joyfully while the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, attempts one stiff, careful disco step. Warm, funny, friendly.

Aspect ratio 16:9, 2K resolution.
```

### 160. `public/assets/story/credits.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

A cosy VIP booth in a desert lounge at midnight: the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, and the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, sit side by side raising glasses of sparkling lemonade in a toast, a gold eggplant trophy on the table between them, palm trees and stars outside.

Aspect ratio 16:9, 2K resolution.
```

### 161. `public/assets/cine/fb-system-purge-01.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

Extreme close-up of the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, lowering his black sunglasses with one finger to glare over them; cascading green digital glyphs reflected in the lenses; slow-motion intensity, dark background.

Aspect ratio 16:9, 2K resolution.
```

### 162. `public/assets/cine/fb-system-purge-02.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

Three identical copies of the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, strike in unison in slow motion, the centre one launching a glowing green wireframe eggplant uppercut, shockwave rings, motion streaks. Any opponent appears only as an anonymous dark silhouette.

Aspect ratio 16:9, 2K resolution.
```

### 163. `public/assets/cine/fb-showstopper-01.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, wearing oversized rhinestone-studded cat-eye sunglasses, winks while firing a vintage camera flash; a blinding white flash burst freezes the scene. Any opponent appears only as an anonymous dark silhouette.

Aspect ratio 16:9, 2K resolution.
```

### 164. `public/assets/cine/fb-showstopper-02.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, mid-spin above the floor as a giant mirror disco ball slams down beside him in an explosion of pink glitter and light beams. Any opponent appears only as an anonymous dark silhouette.

Aspect ratio 16:9, 2K resolution.
```

### 165. `public/assets/cine/fatality-parm-01.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

A sky raining cascading green digital code; dozens of glowing green wireframe eggplants hover frozen in mid-air in rows like a firing squad, all aimed at a lone dark silhouette; the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, stands below, one finger pointing up.

Aspect ratio 16:9, 2K resolution.
```

### 166. `public/assets/cine/fatality-parm-02.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

A colossal glowing purple-and-green wireframe eggplant descending from orbit through the clouds toward a tiny arena far below, comic-book scale, dramatic perspective. No people visible.

Aspect ratio 16:9, 2K resolution.
```

### 167. `public/assets/cine/fatality-parm-03.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

Aftermath: a huge cartoon crater with harmless purple sparks and puffs of steam, a cartoonishly flattened dazed silhouette with swirling stars above it in the centre; the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, walks away in the foreground straightening his tie. Comedic, no gore, no blood.

Aspect ratio 16:9, 2K resolution.
```

### 168. `public/assets/cine/fatality-aubergine-01.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

The arena transformed into a neon fashion runway lined with flashing paparazzi cameras; the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, wearing rhinestone-studded cat-eye sunglasses, strikes a pose at the end of the runway.

Aspect ratio 16:9, 2K resolution.
```

### 169. `public/assets/cine/fatality-aubergine-02.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

A colossal mirror-tiled disco-ball eggplant descending from the rafters of a neon runway, spinning, scattering beams of pink, violet and gold light. No people visible.

Aspect ratio 16:9, 2K resolution.
```

### 170. `public/assets/cine/fatality-aubergine-03.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K, downscale)
- **Background:** Opaque full illustration.

```text
Cinematic 16:9 story illustration for a fighting game, painted comic-book style: bold ink outlines, painterly cel-shading, dramatic lighting and depth of field, rich colour. No text, no letters, no speech bubbles, no logo, no watermark, no border.

A dark silhouette launched skyward into a huge burst of purple eggplant-shaped confetti and glitter, while the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, takes a deep theatrical bow on the runway in the foreground. Comedic, no gore.

Aspect ratio 16:9, 2K resolution.
```


## UI art (title, select, versus, cards, tower)

### 171. `public/assets/ui/title-key-art.jpg`

- **Resolution:** 3840x2160 JPG q90 (generate 16:9 at 4K)
- **Background:** Opaque.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Fighting-game title key art: on the left the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, in a low martial-arts stance lit by cold green light; on the right the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, in a theatrical fists-up guard lit by hot pink and violet light; they face each other across the centre. Between them, empty dark space in the middle third for a logo and menu. Background: a split night skyline, green server tower on the left and neon disco rooftop on the right, a gold eggplant moon above. Both full body, feet near the bottom.
```

### 172. `public/assets/ui/title-key-art-portrait.jpg`

- **Resolution:** 1440x2560 JPG q90 (generate 9:16 at 2K)
- **Background:** Opaque.

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Vertical phone title key art: the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, in the upper-left half and the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, in the upper-right half, both shown from the knees up and overlapping slightly at the centre, faces fully visible in the top 55% of the image; green light on the agent, pink-violet light on the showman. The bottom 40% is a dark atmospheric gradient of split green and pink haze for the menu to sit on.
```

### 173. `public/assets/ui/logo.png`

- **Resolution:** 2048x1024 PNG-32 (generate 2:1 at 2K, key to alpha)
- **Background:** Flat #0000FF blue (keyed to alpha).

```text
Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No other text, no watermark, no border, no foreground characters.

A bold fighting-game title logo reading exactly "BOB VS CORY" in heavy chiselled metallic letters: "BOB" in brushed steel with emerald-green edge glow, "VS" in polished gold, "CORY" in hot-pink and violet sequined chrome; a small gold eggplant emblem behind "VS". Perfectly flat solid pure blue #0000FF background, no other text, no gradient in the background.
```

### 174. `public/assets/ui/select/bob-full.png`

- **Resolution:** 1600x2400 PNG-32 (generate 2:3 at 2K, key to alpha)
- **Background:** Flat #00FF00 green (keyed to alpha).

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Heroic character-select full-body render of the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, standing in a confident three-quarter pose facing right, one hand adjusting his tie, the other in a fist, slight low camera angle. Perfectly flat solid pure green #00FF00 background, no shadows, no glow, no green on the character.
```

### 175. `public/assets/ui/select/cory-full.png`

- **Resolution:** 1600x2400 PNG-32 (generate 2:3 at 2K, key to alpha)
- **Background:** Flat #00FF00 green (keyed to alpha).

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Heroic character-select full-body render of the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, wearing oversized rhinestone-studded cat-eye sunglasses, in a confident three-quarter vogue pose facing left, one hand on his hip, the other flicking his feather epaulette, slight low camera angle. Perfectly flat solid pure green #00FF00 background, no shadows, no glow, no green on the character.
```

### 176. `public/assets/ui/select/bob-bust.png`

- **Resolution:** 1024x1024 PNG-32 (generate 1:1 at 2K, key to alpha)
- **Background:** Flat #00FF00 green (keyed to alpha).

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Head-and-shoulders portrait of the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, three-quarter view facing right, steely expression, centred with headroom. Perfectly flat solid pure green #00FF00 background, no green on the character.
```

### 177. `public/assets/ui/select/cory-bust.png`

- **Resolution:** 1024x1024 PNG-32 (generate 1:1 at 2K, key to alpha)
- **Background:** Flat #00FF00 green (keyed to alpha).

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Head-and-shoulders portrait of the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, three-quarter view facing left, beaming grin, sunglasses pushed up into his hair, feathers framing the shoulders, centred with headroom. Perfectly flat solid pure green #00FF00 background, no green on the character.
```

### 178. `public/assets/ui/versus/bob-half.png`

- **Resolution:** 1920x2160 PNG-32 (generate 9:10 / closest 4:5 at 2K, key to alpha)
- **Background:** Flat #00FF00 green (keyed to alpha).

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Versus-screen splash: the SUITED AGENT - a broad-shouldered athletic man in his late 30s with short neatly cut dark-brown hair, a full well-trimmed dark-brown beard, tanned olive skin and a confident faint smirk, wearing narrow rectangular black sunglasses, a tailored charcoal-black two-piece suit with a subtle herringbone weave, a crisp white dress shirt, a slim black tie, a white folded pocket square, a coiled clear earpiece wire behind his right ear, a black leather belt with a silver buckle, and polished black lace-up leather combat boots, from the thighs up, lunging toward the right edge of the image with one open palm thrust forward, intense glare, jacket flaring, dramatic foreshortening. Perfectly flat solid pure green #00FF00 background, no green on the character.
```

### 179. `public/assets/ui/versus/cory-half.png`

- **Resolution:** 1920x2160 PNG-32 (generate 9:10 / closest 4:5 at 2K, key to alpha)
- **Background:** Flat #00FF00 green (keyed to alpha).

```text
Painted comic-book fighting-game art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp specular highlights, detailed fabric textures, realistic adult anatomy about 8 heads tall, warm key light from the upper left and a cool rim light from behind, high detail, sharp focus. No text, no letters, no logo, no watermark, no border, no extra people.

Versus-screen splash: the DISCO SHOWMAN - a lean, toned athletic man in his early 30s, clean-shaven, with short swept-back light-brown hair, fair skin and a huge bright toothy grin, wearing a plum velvet tailcoat with ornate gold baroque embroidery on the lapels, cuffs and long tails, worn open over a bare toned chest and abs, enormous magenta-and-violet feather epaulettes on both shoulders, a gold jeweled belt with a purple gem buckle, matching plum velvet trousers with gold embroidery down the sides, glossy knee-high black boots with gold filigree and a purple gem at each knee, and gold rings on his fingers, from the thighs up, lunging toward the LEFT edge of the image pointing straight at the viewer with a wink, feathers and coat tails flaring, dramatic foreshortening. Perfectly flat solid pure green #00FF00 background, no green on the character.
```

### 180. `public/assets/ui/versus/versus-bg.jpg`

- **Resolution:** 2560x1440 JPG q90 (generate 16:9 at 2K)
- **Background:** Opaque.

```text
Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Versus-screen background: a diagonal split down the middle, left half a dark field of cascading green digital code, right half a sparkling field of pink and violet disco light and glitter; a jagged golden lightning seam along the split with a gold eggplant emblem at the centre. No people.
```

### 181. `public/assets/ui/cards/fatality-card.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K)
- **Background:** Opaque.

```text
Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Dramatic fatality title-card background: deep blood-free purple and neon-magenta smoke swirling around a glowing gold eggplant emblem at centre, purple sparks and confetti drifting, dark vignette. No people.
```

### 182. `public/assets/ui/cards/victory-card.jpg`

- **Resolution:** 1920x1080 JPG q92 (generate 16:9 at 2K)
- **Background:** Opaque.

```text
Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

Victory title-card background: a golden spotlight beam over an empty polished stage, gold and silver confetti falling, soft bokeh of green and pink lights at the edges. No people.
```

### 183. `public/assets/ui/tower/arcade-tower.jpg`

- **Resolution:** 1440x2560 JPG q90 (generate 9:16 at 2K)
- **Background:** Opaque.

```text
Painted comic-book fighting-game environment art: bold clean black ink outlines, rich painterly cel-shading with soft gradients, crisp highlights, atmospheric depth, high detail, sharp focus. No text, no readable signs, no logo, no watermark, no border, no foreground characters.

A towering ladder-like spire for an arcade tower mode: stacked circular stone platforms rising into a stormy violet sky, each platform glowing a different colour (green, pink, gold, cyan), a solid-gold eggplant trophy shining at the very top. No people.
```


## VFX and props

### 184. `public/assets/vfx/wire-eggplant.png`

- **Resolution:** 1024x1024 PNG (black = transparent under additive blend)
- **Background:** Pure black #000000 (additive blend).

```text
Game visual-effect / prop sprite, painted comic-book style, high detail. No text, no watermark, no border.

A glowing neon-green wireframe eggplant made of luminous polygon lines and tiny digital glyphs, floating, slightly tilted, soft bloom. Pure black background, nothing else.
```

### 185. `public/assets/vfx/wire-eggplant-giant.png`

- **Resolution:** 2048x2048 PNG (additive)
- **Background:** Pure black #000000 (additive blend).

```text
Game visual-effect / prop sprite, painted comic-book style, high detail. No text, no watermark, no border.

A colossal glowing eggplant made of dense neon-green and violet wireframe lattice with streaming digital glyphs, seen from slightly below, enormous bloom and light rays. Pure black background, nothing else.
```

### 186. `public/assets/vfx/glitter-bomb.png`

- **Resolution:** 1024x1024 PNG (additive)
- **Background:** Pure black #000000 (additive blend).

```text
Game visual-effect / prop sprite, painted comic-book style, high detail. No text, no watermark, no border.

A small spherical sparkling projectile made of hot-pink and gold glitter and sequins, with a comet trail of sparkles to the left, soft magenta glow. Pure black background, nothing else.
```

### 187. `public/assets/vfx/glitter-burst.png`

- **Resolution:** 2048x2048 PNG (additive)
- **Background:** Pure black #000000 (additive blend).

```text
Game visual-effect / prop sprite, painted comic-book style, high detail. No text, no watermark, no border.

A radial explosion of pink, violet and gold glitter, star-shaped sparkles and light streaks bursting from the centre. Pure black background, nothing else.
```

### 188. `public/assets/vfx/code-rain-tile.png`

- **Resolution:** 2048x2048 PNG (additive, seamless vertical tile)
- **Background:** Pure black #000000 (additive blend).

```text
Game visual-effect / prop sprite, painted comic-book style, high detail. No text, no watermark, no border.

Seamlessly tileable vertical columns of falling bright-green digital glyphs (abstract invented symbols, not real letters), varying brightness and length, fading trails. Pure black background.
```

### 189. `public/assets/vfx/hit-spark.png`

- **Resolution:** 1024x1024 PNG (additive)
- **Background:** Pure black #000000 (additive blend).

```text
Game visual-effect / prop sprite, painted comic-book style, high detail. No text, no watermark, no border.

A comic-book impact spark: a jagged white-hot star burst with gold and orange streaks radiating outward, sharp spikes. Pure black background, nothing else.
```

### 190. `public/assets/vfx/block-spark.png`

- **Resolution:** 1024x1024 PNG (additive)
- **Background:** Pure black #000000 (additive blend).

```text
Game visual-effect / prop sprite, painted comic-book style, high detail. No text, no watermark, no border.

A defensive block impact flash: a crisp cyan-blue hexagonal shield ripple with white sparks flicking outward. Pure black background, nothing else.
```

### 191. `public/assets/vfx/shockwave-ring.png`

- **Resolution:** 2048x2048 PNG (additive)
- **Background:** Pure black #000000 (additive blend).

```text
Game visual-effect / prop sprite, painted comic-book style, high detail. No text, no watermark, no border.

A thin expanding circular shockwave ring of white and pale-violet energy with faint distortion streaks, viewed head-on. Pure black background, nothing else.
```

### 192. `public/assets/vfx/confetti-burst.png`

- **Resolution:** 2048x2048 PNG (additive)
- **Background:** Pure black #000000 (additive blend).

```text
Game visual-effect / prop sprite, painted comic-book style, high detail. No text, no watermark, no border.

A celebratory burst of purple, magenta and gold confetti pieces, many shaped like tiny eggplants, flying outward from the centre. Pure black background, nothing else.
```

### 193. `public/assets/vfx/steam-puff.png`

- **Resolution:** 1024x1024 PNG (additive)
- **Background:** Pure black #000000 (additive blend).

```text
Game visual-effect / prop sprite, painted comic-book style, high detail. No text, no watermark, no border.

A soft cartoon puff of white-lavender steam clouds with curly comic-style edges and faint purple sparks. Pure black background, nothing else.
```

### 194. `public/assets/vfx/spotlight-cone.png`

- **Resolution:** 1024x2048 PNG (additive)
- **Background:** Pure black #000000 (additive blend).

```text
Game visual-effect / prop sprite, painted comic-book style, high detail. No text, no watermark, no border.

A single vertical theatre spotlight cone of warm white light widening from the top to the bottom, with floating dust motes and a soft pool of light at the base. Pure black background.
```

### 195. `public/assets/props/disco-ball.png`

- **Resolution:** 1024x1024 PNG-32 (key to alpha)
- **Background:** Flat #00FF00 green (keyed to alpha).

```text
Game visual-effect / prop sprite, painted comic-book style, high detail. No text, no watermark, no border.

A large mirror-tiled disco ball hanging from a short chain, hundreds of tiny square mirrors reflecting pink, violet, gold and white light. Painted comic-book style with clean ink outline. Perfectly flat solid pure green #00FF00 background; no green in the reflections.
```

### 196. `public/assets/props/disco-eggplant.png`

- **Resolution:** 2048x2048 PNG-32 (key to alpha)
- **Background:** Flat #00FF00 green (keyed to alpha).

```text
Game visual-effect / prop sprite, painted comic-book style, high detail. No text, no watermark, no border.

A colossal eggplant entirely covered in tiny square mirror tiles like a disco ball, with a gold-chrome stem and cap, reflecting pink, violet and gold light. Painted comic-book style with clean ink outline. Perfectly flat solid pure green #00FF00 background; no green in the reflections.
```

### 197. `public/assets/props/feather.png`

- **Resolution:** 1024x1024 PNG-32 (key to alpha)
- **Background:** Flat #00FF00 green (keyed to alpha).

```text
Game visual-effect / prop sprite, painted comic-book style, high detail. No text, no watermark, no border.

Six loose fluffy magenta and violet ostrich feathers arranged in a 3x2 grid with generous spacing, each a separate particle sprite, painted comic-book style. Perfectly flat solid pure green #00FF00 background.
```
