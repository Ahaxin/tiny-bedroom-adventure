# Publish Tiny Bedroom Adventure on GitHub Pages

Repository: https://github.com/Ahaxin/tiny-bedroom-adventure

The `main` branch already contains `index.html`, a complete standalone game. The site needs no backend, API key, custom domain, npm install or CI build.

## Enable deployment

1. Open https://github.com/Ahaxin/tiny-bedroom-adventure/settings/pages
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Select **Branch: `main`**, **Folder: `/ (root)`**, then **Save**.
4. After GitHub reports the site as published, visit **https://ahaxin.github.io/tiny-bedroom-adventure/**.

### Repository is private

GitHub Free offers Pages only for **public** repositories. GitHub Pro / Team / Enterprise can publish Pages from private repositories (though the Pages site itself is normally public). If the Pages settings say the private repository is ineligible, go to **Settings → General → Danger Zone → Change repository visibility → Public**, then repeat the steps above. **Do not change visibility until you are happy for code and docs to be public.** Original bedroom photographs, portraits and secrets must not be committed.

### Future updates

Edit `src/` and `dev.html`, run `npm test && npm run build`, then commit `index.html` and source. Github Pages will publish from `main` automatically once configured. The Pages URL above is the expected public project URL, not proof the deployment is already active.