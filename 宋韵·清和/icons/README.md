# 宋韵图标组

一套 24×24 单色线描图标，用于替换 Obsidian 的高频界面入口。图标继承按钮的 `currentColor`，因此默认是墨色，悬停与选中时自然转为朱砂色。

## 文件

- `*.svg`：原有功能图标与新增的一组双态书卷。
- `folder-scroll-closed.svg` / `folder-scroll-open.svg`：文件夹收起/展开，两态均保留左右双卷。
- `../folder-scroll-preview.html`：双卷开合预览，支持深浅色、实际尺寸与点击展开。
- `variants/file-*.svg`：文件/笔记入口的 6 个设计方向。
- `../icon-preview.html`：可直接在浏览器中查看的完整预览页。

## 当前映射

| 图标 | 替换入口 |
| --- | --- |
| `collection.svg` | 新建数据库、集合类入口 |
| `folder.svg` | 文件浏览器标签 |
| `folder-scroll-closed.svg` | 文件夹收起：左右双卷靠拢 |
| `folder-scroll-open.svg` | 文件夹展开：双卷舒开，露出纸面 |
| `search.svg` | 快速切换、文件搜索 |
| `star.svg` | 收藏标签 |
| `bookmark.svg` | 书签标签 |
| `graph.svg` | 关系图谱 |
| `canvas.svg` | 白板 |
| `daily.svg` | 日记 |
| `templates.svg` | 模板、Templater |
| `command.svg` | 命令面板 |
| `workspace.svg` | 工作区布局 |
| `table.svg` | Advanced Tables |
| `git.svg` | Git |
| `reader.svg` | Qiaomu Reader |
| `draw.svg` | Excalidraw |
| `compose.svg` | 新建笔记 |
| `folder-plus.svg` | 新建文件夹 |
| `sort.svg` | 文件排序 |
| `reveal.svg` | 定位当前文件 |
| `collapse.svg` | 展开/折叠全部文件夹 |
| `settings.svg` | 设置 |

v1.2.1 已将替换规则内置到主题。安装 Style Settings 后，开启「使用 Obsidian 原生图标」即可恢复原生外观。

独立片段 `snippets/宋韵图标.css` 仍可用于旧版主题或单独使用图标；仅在使用独立片段时，停用片段即可恢复原生图标。

## 设计约束

- 原有图标使用 24×24 画布与 1.7px 主线宽；双态书卷使用 100×100 画布与 7px 线宽，缩至 24px 时约为 1.68px。
- 圆角端点与连接
- 至少保留 35% 留白
- 不使用渐变、阴影和多色填充
- 不依赖外部字体或网络资源
