# OS-Helix project page

Static project page for `https://os-copilot.github.io/OS-Helix/`. Open `index.html` locally or serve this directory with a static web server. The page is ready to place at the root of a GitHub Pages repository.

## Publishing

Publish the root of the `webpage` branch in `OS-Copilot/OS-Helix` with GitHub Pages (Settings → Pages → Deploy from a branch → `webpage` → `/ (root)`). All asset URLs are relative, so the site works at the project URL above. The `.nojekyll` file makes Pages serve these static files directly.

## Release links to add

Edit the three `resource-links` entries near the top of `index.html`:

- arXiv paper URL
- GitHub code URL
- Hugging Face model/data URL(s)

Replace each `span.resource.pending` with an `<a class="resource" href="...">` element when its destination is available. The page intentionally has no author profile links.

The animated logo is drawn in `script.js`; `styles.css` defines the blue/green palette. Figure assets in `assets/` were rendered from the corresponding PDFs in the paper source.
