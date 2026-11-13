# rhode futures fund – React template

React + Vite + TypeScript recreation of the rhode futures fund page: top banner, sticky header with the animated
**SHOP mega menu**, search and cart drawers, content sections and footer.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

## Deploy on GitHub Pages

1. Push to `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow `.github/workflows/deploy.yml` builds and publishes on every push to `main`
   (or run it manually from the **Actions** tab).

Site URL: `https://<user>.github.io/<repo>/`

Images are hot-linked from rhodeskin.com's CDN; replace them with your own assets before real use.
