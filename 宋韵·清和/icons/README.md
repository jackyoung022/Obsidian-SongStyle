# 宋韵图标组

一套 24×24 单色线描图标，用于替换 Obsidian 的高频界面入口。图标继承按钮的 `currentColor`，因此默认是墨色，悬停与选中时自然转为朱砂色。

## 文件

- `*-*.svg`：最终图标，16 枚。
- `variants/file-*.svg`：文件/笔记入口的 6 个设计方向。
- `../icon-preview.html`：可直接在浏览器中查看的完整预览页。

## 当前映射

| 图标 | 替换入口 |
| --- | --- |
| `collection.svg` | 新建数据库、集合类入口 |
| `search.svg` | 快速切换、文件搜索 |
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
| `settings.svg` | 设置 |

替换规则在 `.obsidian/snippets/宋韵图标.css`。停用这个 CSS 片段即可恢复 Obsidian 原生图标。

## 设计约束

- 24×24 画布
- 1.7px 主线宽
- 圆角端点与连接
- 至少保留 35% 留白
- 不使用渐变、阴影和多色填充
- 不依赖外部字体或网络资源
