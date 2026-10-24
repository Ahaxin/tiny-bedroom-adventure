# Tiny Bedroom Adventure · 缩小的我：卧室奇遇

A cozy bilingual (简体中文 / Nederlands) miniature-bedroom puzzle adventure for desktop and mobile browsers, inspired by a real bedroom. Five playable prototype stages from Pillow Mountain to the world behind the computer screen.

## Play

- GitHub Pages: `https://ahaxin.github.io/tiny-bedroom-adventure/` (available **after** Pages is enabled and published in repository Settings).
- Or download/open `index.html` locally in a modern browser.
- Desktop controls: **WASD / arrows** to move, **Space** to jump, **E** to interact, **H** for hints.
- Mobile controls: left joystick plus jump/interact buttons. Rotate to landscape for the best view.
- Language: Chinese / Dutch switchable in game. Progress is saved in the current browser.

## Status

v0.1 is a working prototype, not the finished production game. It includes simplified 3D scenes with a Canvas fallback, five-stage progression, reversible puzzles, cat companion, basic procedural music, checkpoints and save data. Photo upload is **preview-only**: AI cartoon avatar generation is **not yet configured**. Device-specific testing and art polish are future milestones. See [STATUS.md](STATUS.md) and [PLAN.md](PLAN.md).

## Develop

Source code lives in `src/` and development entry is `dev.html`; `index.html` is a built standalone file so GitHub Pages does not require a build tool.

```bash
python3 -m http.server 8000
# Open http://localhost:8000/dev.html
npm test
npm run build
```

Commit the regenerated `index.html` after changing the source. This project has no npm runtime dependencies.

## Publish on GitHub Pages

See [DEPLOYMENT.md](DEPLOYMENT.md). The repository was created **private**; GitHub Free requires a public repository for Pages, while eligible paid GitHub plans allow Pages from private repositories. Making the repository public publishes all committed source and documentation, so inspect those before changing visibility. No personal bedroom photo or portrait is committed.

## V0.2：照片参考的卡通卧室与角色动画

- `V0.2_VISUAL_REMASTER.md`：视觉重制任务书与验收标准。
- `src/levels.js`：按真实卧室参考还原左侧窗帘/桌椅与右侧床、粉毯、落地灯，重做蓝眼重点色长毛猫并加入尾巴动画。
- `src/avatar.js`：程序化双段手脚、交替步态、跳跃姿态、落地缓冲和待机呼吸。
- `src/renderer.js`：改进镜头并对竖屏使用更宽的视角。
- 保持所有关卡机制不变。`npm test` 现在包含美术对象和步态数据的回归检查。

**限制：** 这是几何卡通重制的第一轮，不是手工绘制/蒙皮动画的最终美术，也没有公开用户原始卧室照片。

## V0.3 — Storybook Animation

The first room now uses procedural wood, fabric, plaster and fur materials with soft toon lighting. The explorer has an articulated gait with weight shift, a fluttering scarf and blinking eyes; the colourpoint cat breathes, blinks, twitches its ears and swishes its tail. Curtains and sunlight also animate. See [V0.3 animation art direction](V0.3_ANIMATION_ART_DIRECTION.md).

Run `npm test` and `npm run build` to regenerate the self-contained `index.html` used by GitHub Pages. No personal photos are bundled.