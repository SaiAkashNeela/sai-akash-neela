# saiakashneela.com

Portfolio of **Sai Akash Neela**, Senior AI Engineer at Levocell. Served at https://saiakashneela.com and https://saiakash.dev.

It is a fully static site with no framework and no build step:

```
public/
  index.html            the whole site (all content is in the HTML for SEO)
  styles.css            the only stylesheet (light + dark themes)
  app.js                the only script (theme, email menu, articles, GitHub heatmap)
  robots.txt, sitemap.xml, llms.txt, llms-full.txt
  manifest.webmanifest, favicon.*, icon-*.png, og-image.png
  resume/               Sai-Akash-Neela-Resume.pdf + .docx
  _headers              cache and security headers (Cloudflare)
workers/worker.js       separate Worker that serves GitHub contribution data
```

## Run locally

```bash
npm run dev
```

## Deploy (Cloudflare Workers static assets)

```bash
npm run deploy
```

When you change content in `index.html`, keep `llms.txt`, `llms-full.txt`, the JSON-LD block in `<head>` and the `lastmod` dates in `sitemap.xml` in sync.
