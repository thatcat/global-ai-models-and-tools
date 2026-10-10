[English](CONTRIBUTING.md) | [简体中文](CONTRIBUTING.zh-CN.md)

# Contributing to global-ai-models-and-tools

Thank you for helping make global AI knowledge easier to discover. Contributions are welcome in any language.

## What to contribute

- AI models not yet listed in this repository.
- AI tools not yet listed in this repository.
- Corrections to names, links, categories, descriptions, or source attribution.
- Better official sources for existing entries.

## Two ways to contribute

1. Open an Issue and choose the `Suggest an AI model or tool` template when you want to recommend an item without editing files yourself.
2. Open a pull request when you can add or improve the entry directly.

## Adding an entry with a pull request

1. Edit `resources/data/catalog.json`.
2. Choose one primary category: `text`, `image`, `audio`, `video`, `code`, `office`, `design`, `agent`, `multimodal`, or `infra`.
3. Add the item under either `models` or `tools`.
4. Include a clear English name, a short English highlight, an official URL when available, and at least one source directory.
5. Add a Chinese name and Chinese description when you can. Chinese is encouraged, not required for a useful first contribution.
6. Run `node resources/scripts/build-catalog.mjs` to regenerate the item page and indexes.

## Entry quality

- Prefer official websites and primary sources.
- Use the product or model's established English name as the file name.
- Keep the short highlight factual and specific: explain the distinguishing capability, not marketing language.
- Avoid duplicate entries. If an item fits several categories, choose the most useful primary category and mention the overlap in its description.

## Community language

Issues and pull requests are welcome in any language. Please be respectful and assume good intent across languages, countries, and technical communities.
