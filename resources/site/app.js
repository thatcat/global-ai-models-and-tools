const catalogData = window.GLOBAL_AI_CATALOG;
const categoryOrder = [
  "text",
  "agent",
  "code",
  "infra",
  "image",
  "video",
  "audio",
  "office",
  "design"
];

const translations = {
  en: {
    eyebrow: "Global AI Models and Tools",
    title: "global-ai-models-and-tools",
    stats: {
      categories: "Categories",
      models: "Models",
      tools: "Tools"
    },
    categoryCount: "entries",
    emptyTitle: "This section is intentionally open.",
    emptyBody:
      "This area is open for future community contributions as the catalog expands.",
    buckets: {
      models: "Models",
      tools: "Tools"
    }
  },
  zh: {
    eyebrow: "全球 AI 模型与工具目录",
    title: "global-ai-models-and-tools",
    stats: {
      categories: "分类数",
      models: "模型数",
      tools: "工具数"
    },
    categoryCount: "条目",
    emptyTitle: "这个分区先留白。",
    emptyBody:
      "这个方向开放给社区继续补充，目录会随着贡献逐步扩展。",
    buckets: {
      models: "模型",
      tools: "工具"
    }
  }
};

const langButtons = [...document.querySelectorAll(".lang-button")];
let currentLang = "en";

function getTotal(bucket) {
  return categoryOrder.reduce((count, key) => count + catalogData.categories[key][bucket].length, 0);
}

function setLanguage(lang) {
  currentLang = lang;

  for (const button of langButtons) {
    button.classList.toggle("is-active", button.dataset.lang === lang);
  }

  const t = translations[lang];
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.getElementById("eyebrow").textContent = t.eyebrow;
  document.getElementById("title").textContent = t.title;
  document.getElementById("tagline").textContent =
    lang === "zh" ? catalogData.meta.tagline_zh : catalogData.meta.tagline_en;
  document.getElementById("scope-note").textContent =
    lang === "zh" ? catalogData.meta.scopeNote_zh : catalogData.meta.scopeNote_en;
  renderStats();
  renderCatalog();
}

function renderStats() {
  const t = translations[currentLang];
  const statsRoot = document.getElementById("stats");
  const items = [
    { value: categoryOrder.length, label: t.stats.categories },
    { value: getTotal("models"), label: t.stats.models },
    { value: getTotal("tools"), label: t.stats.tools }
  ];

  statsRoot.innerHTML = `
    <div class="stat-grid">
      ${items
        .map(
          (item) => `
            <div class="stat-card">
              <span class="stat-card__value">${item.value}</span>
              <span class="stat-card__label">${item.label}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function compactFeature(value, limit = 96) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= limit) return normalized;

  const sliced = normalized.slice(0, limit - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  const cleanSlice = lastSpace > 48 ? sliced.slice(0, lastSpace) : sliced;
  return `${cleanSlice.replace(/[,.，。;；:：-]+$/g, "")}...`;
}

function renderItem(item, categoryKey, bucketKey) {
  const summary = currentLang === "zh" ? item.summary_zh : item.summary_en;
  const highlight = currentLang === "zh" ? item.highlight_zh : item.highlight_en;
  const feature = highlight || compactFeature(summary, currentLang === "zh" ? 42 : 92);
  const itemFile = currentLang === "zh" ? `${encodeURIComponent(item.name)}.zh-CN.md` : `${encodeURIComponent(item.name)}.md`;
  const itemPath = `../../${categoryKey}/${bucketKey}/${itemFile}`;
  const title = `<a href="${itemPath}">${item.name}</a>`;

  return `
    <article class="item-card">
      <div class="item-card__title-row">
        <div>
          <h4 class="item-card__title">${title}<span class="item-card__feature"> - ${feature}</span></h4>
          <p class="item-card__name-zh">${item.name_zh}</p>
        </div>
      </div>
    </article>
  `;
}

function renderGroup(category, bucketKey, categoryKey) {
  const t = translations[currentLang];
  const items = category[bucketKey];

  if (!items.length) {
    return `
      <section class="category__group">
        <div class="group__header">
          <h3 class="group__title">${t.buckets[bucketKey]}</h3>
          <span class="group__count">0</span>
        </div>
        <p class="group__empty"><strong>${t.emptyTitle}</strong><br />${t.emptyBody}</p>
      </section>
    `;
  }

  return `
    <section class="category__group">
      <div class="group__header">
        <h3 class="group__title">${t.buckets[bucketKey]}</h3>
        <span class="group__count">${items.length}</span>
      </div>
      <div class="group__items">
        ${items.map((item) => renderItem(item, categoryKey, bucketKey)).join("")}
      </div>
    </section>
  `;
}

function renderCatalog() {
  const t = translations[currentLang];
  const root = document.getElementById("catalog");

  root.innerHTML = categoryOrder
    .map((key) => {
      const category = catalogData.categories[key];
      const totalEntries = category.models.length + category.tools.length;
      const categoryNumber = categoryOrder.indexOf(key) + 1;
      const title = currentLang === "zh" ? category.title_zh : category.title_en;

      return `
        <section class="category">
          <div class="category__header">
            <div class="category__titles">
              <h2 class="category__title">${categoryNumber}. ${title}</h2>
            </div>
            <span class="category__count">${totalEntries} ${t.categoryCount}</span>
          </div>
          <div class="category__content">
            ${renderGroup(category, "models", key)}
            ${renderGroup(category, "tools", key)}
          </div>
        </section>
      `;
    })
    .join("");
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage(currentLang);
