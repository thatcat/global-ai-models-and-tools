import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");
const catalogPath = path.join(repoRoot, "resources", "data", "catalog.json");
const highlightsPath = path.join(repoRoot, "resources", "data", "highlights.json");

const data = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const reviewedHighlights = JSON.parse(fs.readFileSync(highlightsPath, "utf8"));
const categoryKeys = [
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

const categoryDescriptions = {
  text: {
    en: "Text-related AI models and tools, including LLMs, translation, summarization, writing, search, and conversational systems.",
    zh: "与文本相关的 AI 模型和工具，包括大语言模型、翻译、摘要、写作、搜索与对话系统。"
  },
  image: {
    en: "Image generation and image editing models and tools, covering illustration, visual design, enhancement, and practical graphics workflows.",
    zh: "与图像生成和图像编辑相关的 AI 模型与工具，覆盖插画、视觉设计、增强处理与实用制图流程。"
  },
  audio: {
    en: "Audio and music AI models and tools for speech, voice, composition, dubbing, separation, and audio-native creation.",
    zh: "与音频和音乐相关的 AI 模型与工具，覆盖语音、配音、作曲、分离处理与音频原生创作。"
  },
  video: {
    en: "Video generation and motion creation models and tools for cinematic clips, talking avatars, editing, and creator workflows.",
    zh: "与视频生成和动态内容创作相关的 AI 模型与工具，覆盖影视片段、数字人、编辑和创作者工作流。"
  },
  code: {
    en: "Coding-focused AI models and developer tools for completion, refactoring, reasoning, testing, and engineering productivity.",
    zh: "与编程相关的 AI 模型和开发工具，覆盖补全、重构、推理、测试与工程效率提升。"
  },
  office: {
    en: "Office productivity tools for documents, presentations, writing, and structured knowledge work.",
    zh: "与办公生产力相关的工具，覆盖文档、演示、写作与结构化知识工作。"
  },
  design: {
    en: "Design-oriented AI tools for interfaces, branding, graphics, prototyping, and commercial creative production.",
    zh: "与设计相关的 AI 工具，覆盖界面、品牌、图形、原型与商业创意制作。"
  },
  agent: {
    en: "End-user agents, agent builders, workflow automation, and developer frameworks for autonomous work.",
    zh: "面向终端用户的智能体、智能体构建平台、工作流自动化工具与开发框架。"
  },
  infra: {
    en: "Inference APIs, cloud AI platforms, local runtimes, training frameworks, search APIs, and application infrastructure.",
    zh: "推理 API、云端 AI 平台、本地运行时、训练框架、搜索 API 与应用基础设施。"
  }
};

const highlightOverrides = {
  "GPT-6 Astra": ["Talk to the frontier", "与前沿智能对话"],
  "GPT-6.1 Sol": ["Astra power, everyday cost", "Astra 能力，日常成本"],
  "GPT-6 Luna": ["Fast-lane GPT-6", "高速通道 GPT-6"],
  "Seedance 2.5": ["One prompt, a 30-second story", "一句话，生成 30 秒故事"],
  "Jev 1.13": ["Typed decisions for agent actions", "为智能体行动提供结构化决策"],
  "Claude Fable 5.1": ["Coding · research · long-horizon work", "编程 · 研究 · 长程任务"],
  "Gemini 3.8 Flash": ["Flash-speed multimodal workhorse", "闪电般的多模态主力"],
  "Gemini 3.1 Pro": ["Reasoning across the Google stack", "贯穿 Google 生态的推理力"],
  "Gemma 4": ["Open intelligence, small footprint", "小体积，开放智能"],
  "Imagen 4": ["Photorealism with a plan", "有规划的真实视觉"],
  "Qwen-Image-3.0": ["Real text inside real layouts", "真实排版里的真实文字"],
  "Veo 3.1": ["Cinema in a prompt", "一句提示词，拍出电影感"],
  "Codex": ["One instruction, one PR", "一条指令交付 PR"],
  "WorkBuddy": ["Your whole workbench, AI-powered", "整张办公桌都交给 AI"],
  "Jev 1.13": ["Choose, score, decide", "选择、评分、做决定"],
  "Muse": ["Your personal AI operator", "你的个人 AI 执行者"],
  "Manus": ["Brief in, work delivered", "一句需求，交付成果"],
  "GLM-5.3": ["Open reasoning with an agentic edge", "带智能体锋芒的开放推理"],
  "Kimi K2.7": ["Long context, long horizon", "长上下文，长程任务"],
  "Kimi K2.7 Code": ["Code that keeps going", "能持续推进的编程智能体"],
  "Claude": ["Thinking partner for hard knowledge work", "高难度知识工作的思考伙伴"],
  "Gemini": ["Google's multimodal everyday brain", "Google 的日常多模态大脑"],
  "Mistral Le Chat": ["European AI, ready to chat", "来自欧洲的对话式 AI"],
  "Z.ai": ["GLM access with an agentic edge", "带智能体能力的 GLM 入口"],
  "Claude Code": ["Ship code from the terminal", "在终端把代码交付出去"],
  "Gemini CLI": ["An open terminal into Gemini", "通往 Gemini 的开放终端"],
  Claude: ["Long-context reasoning specialist", "长文本推理专家"],
  Gemini: ["Google's multimodal frontier", "Google 多模态前沿模型"],
  DeepSeek: ["Open reasoning with serious depth", "开放推理，深度拉满"],
  Qwen: ["Bilingual open-model powerhouse", "中英双语开源强者"],
  ChatGPT: ["The everyday AI starting point", "人人都能用的 AI 起点"],
  Kimi: ["Long-context research companion", "超长文本研究助手"],
  Midjourney: ["Aesthetic image-making icon", "高审美图像创作代表"],
  Suno: ["Turn a sentence into a song", "一句话变成一首歌"],
  Sora: ["Cinematic text-to-video frontier", "电影感文生视频前沿"],
  Cursor: ["The code editor that knows your repo", "真正理解代码库的编辑器"],
  "GitHub Copilot": ["AI pair programmer everywhere", "无处不在的 AI 结对程序员"],
  Dify: ["Build AI apps without the maze", "不绕路构建 AI 应用"],
  Ollama: ["Run open models on your machine", "在自己的电脑运行开源模型"],
  PyTorch: ["The engine room of modern AI", "现代 AI 的核心引擎"]
};

function sentence(value) {
  return value.replace(/\|/g, "\\|");
}

function bucketTitle(bucket) {
  return bucket === "models" ? "Models" : "Tools";
}

function bucketTitleZh(bucket) {
  return bucket === "models" ? "模型" : "工具";
}

function getHighlight(item, lang = "en", categoryKey = "", bucket = "") {
  const reviewed = reviewedHighlights[`${categoryKey}/${bucket}/${item.name}`];
  const override = reviewed || highlightOverrides[item.name];
  const base = override ? override[lang === "zh" ? 1 : 0] : (
    lang === "zh" ? compactFeature(item.summary_zh, 42) : compactFeature(item.summary_en, 92)
  );
  return base;
}

for (const [categoryKey, category] of Object.entries(data.categories)) {
  for (const bucket of ["models", "tools"]) {
    for (const item of category[bucket]) {
      item.highlight_en = getHighlight(item, "en", categoryKey, bucket);
      item.highlight_zh = getHighlight(item, "zh", categoryKey, bucket);
    }
  }
}

function compactFeature(value, limit = 96) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= limit) return normalized;

  const sliced = normalized.slice(0, limit - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  const cleanSlice = lastSpace > 48 ? sliced.slice(0, lastSpace) : sliced;
  return `${cleanSlice.replace(/[,.，。;；:：-]+$/g, "")}...`;
}

function fileNameForItem(item, lang = "en") {
  return lang === "zh" ? item.name + ".zh-CN.md" : item.name + ".md";
}

function fileLinkForItem(item, lang = "en") {
  return "./" + encodeURIComponent(fileNameForItem(item, lang));
}

function cleanupGeneratedItemFiles(dirPath) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    if (entry.name === "README.md") continue;
    if (!entry.name.endsWith(".md")) continue;
    fs.unlinkSync(path.join(dirPath, entry.name));
  }
}

function relatedFileLink(categoryKey, bucket, item, lang = "en") {
  return "../../" + categoryKey + "/" + bucket + "/" + encodeURIComponent(fileNameForItem(item, lang));
}

function findCatalogItem(categoryKey, bucket, name) {
  return data.categories[categoryKey]?.[bucket]?.find((item) => item.name === name);
}

function renderItemFile(categoryKey, bucket, item, lang = "en") {
  const category = data.categories[categoryKey];
  const oppositeLang = lang === "en" ? "zh" : "en";
  const oppositeLabel = lang === "en" ? "打开中文条目" : "Open English entry";
  const lines = [
    "[English](" + fileLinkForItem(item, "en") + ") | [中文](" + fileLinkForItem(item, "zh") + ")",
    "",
    lang === "en" ? "# " + item.name + " - " + getHighlight(item, "en", categoryKey, bucket) : "# " + item.name_zh + " - " + getHighlight(item, "zh", categoryKey, bucket),
    "",
    lang === "en" ? getHighlight(item, "en", categoryKey, bucket) : getHighlight(item, "zh", categoryKey, bucket),
    "",
    lang === "en" ? "- Category: " + category.title_en : "- 分类： " + category.title_zh,
    lang === "en" ? "- Type: " + bucketTitle(bucket) : "- 类型： " + bucketTitleZh(bucket),
    ""
  ];

  if (item.scope_en) {
    lines.splice(-1, 0, lang === "en" ? "- Scope: " + item.scope_en : "- 范围： " + item.scope_zh);
  }
  if (item.group_en) {
    lines.splice(-1, 0, lang === "en" ? "- Group: " + item.group_en : "- 分组： " + item.group_zh);
  }
  if (item.aliases_en) {
    lines.splice(-1, 0, lang === "en" ? "- Also known as: " + item.aliases_en.join(", ") : "- 也称为： " + item.aliases_zh.join("、"));
  }
  if (item.access_en) {
    lines.splice(-1, 0, lang === "en" ? "- Access: " + item.access_en : "- 获取方式： " + item.access_zh);
  }

  if (item.url) {
    lines.push(lang === "en" ? "- Official link: " + item.url : "- 官方链接： " + item.url, "");
  }
  if (item.notice_en) {
    lines.push(lang === "en" ? "- Use note: " + item.notice_en : "- 使用提醒： " + item.notice_zh, "");
  }
  if (item.related) {
    const relatedItems = item.related
      .map((link) => ({ link, item: findCatalogItem(link.category, link.bucket, link.name) }))
      .filter(({ item: relatedItem }) => relatedItem);
    if (relatedItems.length) {
      const relatedText = relatedItems.map(({ link, item: relatedItem }) => {
        const label = lang === "en" ? relatedItem.name : relatedItem.name_zh;
        return "[" + label + "](" + relatedFileLink(link.category, link.bucket, relatedItem, lang) + ")";
      }).join(", ");
      lines.push(lang === "en" ? "- Related entries: " + relatedText : "- 相关条目： " + relatedText, "");
    }
  }

  lines.push("---", "");
  lines.push(lang === "en" ? item.summary_en : item.summary_zh, "");
  lines.push(lang === "en" ? "中文：[" + oppositeLabel + "](" + fileLinkForItem(item, oppositeLang) + ")" : "English: [" + oppositeLabel + "](" + fileLinkForItem(item, oppositeLang) + ")", "");
  lines.push("Catalog entry reviewed on " + data.meta.updatedAt + ".", "");
  return lines.join("\n");
}

function renderCategoryReadme(categoryKey, lang) {
  const category = data.categories[categoryKey];
  const description = categoryDescriptions[categoryKey];
  const categoryNumber = categoryKeys.indexOf(categoryKey) + 1;
  const modelCount = category.models.length;
  const toolCount = category.tools.length;
  const lines = ["[English](README.md) | [简体中文](README.zh-CN.md)", ""];

  if (lang === "en") {
    lines.push(`# ${categoryNumber}. ${category.title_en}`);
    lines.push("", description.en, "");
    if (modelCount) lines.push(`- Models: [${modelCount} entries](models/README.md)`);
    if (toolCount) lines.push(`- Tools: [${toolCount} entries](tools/README.md)`);
    lines.push("", "Each model or tool is stored as its own Markdown file under the corresponding folder.");
  } else {
    lines.push(`# ${categoryNumber}. ${category.title_zh}`);
    lines.push("", description.zh, "");
    if (modelCount) lines.push(`- 模型： [${modelCount} 个条目](models/README.md)`);
    if (toolCount) lines.push(`- 工具： [${toolCount} 个条目](tools/README.md)`);
    lines.push("", "每个模型或工具都以独立 Markdown 文件的形式存放在对应目录下。");
  }

  lines.push("");
  return lines.join("\n");
}

function rootFileLink(categoryKey, bucket, item, lang = "en") {
  return "./" + categoryKey + "/" + bucket + "/" + encodeURIComponent(fileNameForItem(item, lang));
}

function renderRootReadme(lang) {
  const languageLinks = "[English](https://github.com/thatcat/global-ai-models-and-tools/blob/main/README.md) | [简体中文](https://github.com/thatcat/global-ai-models-and-tools/blob/main/README.zh-CN.md)";
  const lines = [
    languageLinks,
    "",
    "# global-ai-models-and-tools",
    "",
    lang === "en" ? "A community-maintained index of global AI models and tools. Technology has no borders." : "一个由社区共同维护的全球 AI 模型与工具索引。技术无国界。",
    "",
    lang === "en" ? "Browse the full index below. Click any name to open its standalone Markdown entry." : "下面是完整索引。点击任意名称即可打开对应的独立 Markdown 条目。",
    "",
    lang === "en" ? "## Catalog Index" : "## 目录索引",
    ""
  ];

  for (const categoryKey of categoryKeys) {
    const category = data.categories[categoryKey];
    const categoryNumber = categoryKeys.indexOf(categoryKey) + 1;
    lines.push("### " + categoryNumber + ". " + (lang === "en" ? category.title_en : category.title_zh), "");
    for (const bucket of ["models", "tools"]) {
      const items = category[bucket];
      if (!items.length) continue;
      lines.push("#### " + (lang === "en" ? bucketTitle(bucket) : bucketTitleZh(bucket)), "");
      lines.push(lang === "en" ? "| Name and highlight |" : "| 名称与特点 |", "| --- |");
      for (const item of items) {
        const name = lang === "en" ? item.name : item.name_zh;
        lines.push("| [" + name + "](" + rootFileLink(categoryKey, bucket, item, lang) + ") - " + sentence(getHighlight(item, lang, categoryKey, bucket)) + " |");
      }
      lines.push("");
    }
  }

  const total = categoryKeys.reduce((count, key) => count + data.categories[key].models.length + data.categories[key].tools.length, 0);
  lines.push(
    lang === "en" ? "## Contributing" : "## 参与贡献",
    "",
    lang === "en" ? "Know a mainstream model or tool that is missing? Issues and pull requests are welcome in any language. See [CONTRIBUTING.md](CONTRIBUTING.md)." : "如果你知道尚未收录的主流模型或工具，欢迎使用任何语言提交 Issue 和 Pull Request。请参阅 [CONTRIBUTING.zh-CN.md](CONTRIBUTING.zh-CN.md)。",
    "",
    lang === "en" ? "Catalog entries: " + total + "." : "当前收录条目：" + total + " 个。",
    ""
  );
  return lines.join("\n");
}

function renderReadme(categoryKey, bucket, lang = "en") {
  const category = data.categories[categoryKey];
  const items = category[bucket];
  const categoryNumber = categoryKeys.indexOf(categoryKey) + 1;
  const lines = [
    "[English](README.md) | [简体中文](README.zh-CN.md)",
    "",
    lang === "en" ? "# " + categoryNumber + ". " + category.title_en + " " + bucketTitle(bucket) : "# " + categoryNumber + ". " + category.title_zh + bucketTitleZh(bucket),
    "",
    lang === "en" ? "Default language: English. Each item includes a short feature highlight." : "当前页面语言：简体中文。每个条目都包含简短的特点说明。",
    ""
  ];
  if (items.length === 0) {
    lines.push(lang === "en" ? "No standalone entries are curated in this category yet." : "这个分类暂时还没有收录独立条目。", "", lang === "en" ? "This section is open for future community contributions." : "这个分区开放给社区继续补充。", "");
    return lines.join("\n");
  }

  lines.push(lang === "en" ? "| Name and highlight |" : "| 名称与特点 |", "| --- |");
  for (const item of items) {
      const name = lang === "en" ? item.name : item.name_zh;
      lines.push("| [" + name + "](" + fileLinkForItem(item, lang) + ") - " + sentence(getHighlight(item, lang, categoryKey, bucket)) + " |");
  }
  lines.push("");
  lines.push("Catalog entry reviewed on " + data.meta.updatedAt + ".", "");
  return lines.join("\n");
}

fs.writeFileSync(path.join(repoRoot, "README.md"), renderRootReadme("en"));
fs.writeFileSync(path.join(repoRoot, "README.zh-CN.md"), renderRootReadme("zh"));

for (const categoryKey of categoryKeys) {
  const categoryDir = path.join(repoRoot, categoryKey);
  fs.writeFileSync(path.join(categoryDir, "README.md"), renderCategoryReadme(categoryKey, "en"));
  fs.writeFileSync(path.join(categoryDir, "README.zh-CN.md"), renderCategoryReadme(categoryKey, "zh"));

  for (const bucket of ["models", "tools"]) {
    const dirPath = path.join(repoRoot, categoryKey, bucket);
    const items = data.categories[categoryKey][bucket];
    if (!items.length) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      continue;
    }
    fs.mkdirSync(dirPath, { recursive: true });
    cleanupGeneratedItemFiles(dirPath);

    fs.writeFileSync(path.join(dirPath, "README.md"), renderReadme(categoryKey, bucket, "en"));
    fs.writeFileSync(path.join(dirPath, "README.zh-CN.md"), renderReadme(categoryKey, bucket, "zh"));

    for (const item of items) {
      const itemPath = path.join(dirPath, fileNameForItem(item, "en"));
      const itemZhPath = path.join(dirPath, fileNameForItem(item, "zh"));
      fs.writeFileSync(itemPath, renderItemFile(categoryKey, bucket, item, "en"));
      fs.writeFileSync(itemZhPath, renderItemFile(categoryKey, bucket, item, "zh"));
    }
  }
}

const siteCatalogPath = path.join(repoRoot, "resources", "site", "catalog.js");
const siteCatalog = `window.GLOBAL_AI_CATALOG = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(siteCatalogPath, siteCatalog);

console.log("Generated category bilingual READMEs, indexes, per-item markdown files, and resources/site/catalog.js");
