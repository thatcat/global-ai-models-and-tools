[English](CONTRIBUTING.md) | [简体中文](CONTRIBUTING.zh-CN.md)

# 为 global-ai-models-and-tools 做贡献

感谢你帮助更多人发现全球 AI 知识。欢迎使用任何语言参与贡献。

## 可以贡献什么

- 仓库尚未收录的 AI 模型。
- 仓库尚未收录的 AI 工具。
- 对名称、链接、分类、描述或来源标注的修正。
- 为已有条目补充更可靠的官方网站或一手来源。

## 两种贡献方式

1. 不想自己修改文件时，可以在 Issue 页面选择 `Suggest an AI model or tool` 模板，推荐模型或工具。
2. 可以直接修改内容时，欢迎提交 Pull Request。

## 通过 Pull Request 新增条目

1. 编辑 `resources/data/catalog.json`。
2. 选择一个主要分类：`text`、`image`、`audio`、`video`、`code`、`office`、`design`、`agent`、`multimodal` 或 `infra`。
3. 将条目添加到 `models` 或 `tools` 中。
4. 至少包含清晰的英文名称、一句简短英文特点、官方网站（如有）和一个来源目录。
5. 有条件时补充中文名称和中文说明。中文内容非常欢迎，但不是有效首个贡献的硬性门槛。
6. 运行 `node resources/scripts/build-catalog.mjs`，重新生成条目页和索引页。

## 条目质量标准

- 优先使用官方网站和一手来源。
- 文件名使用产品或模型已经确立的英文名称。
- 短特点要事实清晰、具体，说明最突出的能力，避免营销口号。
- 避免重复收录。一个条目如果适合多个分类，选择最有帮助的主要分类，并在描述中说明交叉能力。

## 社区语言

Issue 和 Pull Request 支持中文和英文。请尊重不同语言、国家和技术社区的参与者，并保持善意交流。
