# Resources

This folder keeps the bilingual catalog data, the static browser view, and the small generator used to rebuild the category pages.

- `data/catalog.json`: the curated source of truth.
- `scripts/build-catalog.mjs`: regenerates folder READMEs and the browser-side data file.
- `site/`: a simple static interface with English as the default language and Chinese as a toggle.

Rebuild after editing the dataset:

```bash
node resources/scripts/build-catalog.mjs
```
