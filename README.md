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