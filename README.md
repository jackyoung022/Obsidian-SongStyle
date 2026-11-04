# 宋韵·清和

> 一套以宋式审美为线索的 Obsidian 主题：暖纸、墨色、绛红、胭脂与灰绿，强调留白、细线和安静的信息层级。

**版本：1.1.1** · 适配 Obsidian 1.6+ · 已测试 Obsidian 1.14.4（macOS）

![宋韵·清和浅色模式](screenshots/obsidian-light.png)

## 深浅双色

主题以暖宣纸色为底，正文使用低饱和墨色，标题和交互状态使用绛红。深色模式保留同一套结构，以墨底和浅胭脂色建立层次。

| 浅色模式 | 深色模式 |
| --- | --- |
| ![浅色模式](screenshots/obsidian-light.png) | ![深色模式](screenshots/obsidian-dark.png) |

## 特点

- **宋式纸面**：浅色模式使用 128px 均匀细颗粒，参考中国色网站的哑光纸面节奏，但不采用网站灰色，而是保留主题的暖纸色。
- **层次化配色**：正文、次文字、标签、标题和代码各有独立色阶，不依赖大面积高饱和色。
- **宋版标题**：标题使用宋体，H1 以朱砂短线收束，H2 以灰绿细竖线建立秩序。
- **阅读优化**：正文行高、段距和行宽均为长文阅读调整，最大行宽可在 Style Settings 中调整。
- **完整 Markdown 样式**：覆盖引用、表格、任务列表、标签、脚注、Callout、代码块、嵌入内容和图片。
- **深色模式**：独立墨色纸面与胭脂强调，不做简单反色。
- **自定义图标**：22 枚宋式线描图标，覆盖左侧 Ribbon、侧栏标签和文件工具栏。
- **轻量实现**：纸面颗粒由内联 CSS/SVG 生成，不依赖外部图片、字体或网络资源。

## 色板

| 角色 | 色值 | 用法 |
| --- | --- | --- |
| 绛红 | `#8C2F2D` | 主强调、H1、当前文件 |
| 胭脂 | `#B76F6A` | 悬停、列表标记、次强调 |
| 暖灰 | `#8E8075` | 次级文字、图标、分隔 |
| 灰绿 | `#B7C5B7` | 引用、标签、H2 竖线 |
| 宣纸 | `#EDE6D9` | 侧栏与纸面层 |
| 浅纸 | `#F8F3E9` | 正文阅读区域 |

## 界面截图

### 浅色模式

![浅色模式完整界面](screenshots/obsidian-light.png)

### 深色模式

![深色模式完整界面](screenshots/obsidian-dark.png)

## 宋韵图标

图标组以宋版册页、竹简、窗棂和器物轮廓为灵感，统一为 `24×24` 画布、`1.7px` 线宽和单色描边。图标继承 `currentColor`，默认呈墨色，悬停与选中时转为朱砂色。

### 六个核心方向

![图标设计方向](screenshots/icon-directions.png)

1. **竹简**：三列简牍与横向编绳，秩序感最强。
2. **卷轴**：两端卷起、中间留白，舒展安静。
3. **册页**：左右页与轻微不对称书脊，作为默认方向。
4. **窗棂**：方格与细线，呼应多栏工作区。
5. **方印**：带缺口的方印与简化“文”字。
6. **山笺**：纸笺、远山与一轮小日，诗意最强。

### 完整图标组

![默认图标组](screenshots/icon-set.png)

覆盖入口：收藏/数据库、文件、搜索、关系图、白板、日记、模板、命令面板、工作区、表格、Git、阅读器、绘图、新建笔记、新建文件夹、设置、文件目录、收藏、书签、排序、定位当前文件和展开/折叠全部。

### 图标在界面中的效果

![图标界面预览](screenshots/icon-ui.png)

图标展示页源文件：[`宋韵·清和/icon-preview.html`](宋韵·清和/icon-preview.html)

[查看图标展示页完整长图](screenshots/icon-preview-full.png)

## 安装

### 方式一：手动安装

1. 将 `宋韵·清和/` 复制到你的 vault：

   ```text
   <你的 Vault>/.obsidian/themes/宋韵·清和/
   ```

2. 将 `snippets/宋韵图标.css` 复制到：

   ```text
   <你的 Vault>/.obsidian/snippets/宋韵图标.css
   ```

3. 打开 Obsidian，进入「设置 → 外观」。
4. 在主题列表中选择「宋韵·清和」。
5. 在「CSS 代码片段」中启用「宋韵图标」。

### 方式二：命令行

```bash
git clone https://github.com/jackyoung022/Obsidian-SongStyle.git

VAULT="/path/to/your/vault"
cp -R Obsidian-SongStyle/宋韵·清和 "$VAULT/.obsidian/themes/"
mkdir -p "$VAULT/.obsidian/snippets"
cp Obsidian-SongStyle/snippets/宋韵图标.css "$VAULT/.obsidian/snippets/"
```

### 方式三：发布包

下载仓库中的 [`dist/Obsidian-SongStyle-v1.1.1.zip`](dist/Obsidian-SongStyle-v1.1.1.zip)。发布包使用 ASCII 文件名以兼容跨平台解压：

- 将 `Songyun-Qinghe/` 复制到 `.obsidian/themes/`。
- 将 `songyun-icons.css` 复制到 `.obsidian/snippets/`。

Obsidian 中显示的主题名仍为「宋韵·清和」。

## 设置

### Style Settings（可选）

安装 [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) 后，在主题设置里可以调整：

- **正文栏宽度**：默认 `780px`，范围 `640–1040px`。

### 恢复原生图标

进入「设置 → 外观 → CSS 代码片段」，关闭「宋韵图标」即可。主题颜色、排版和背景不会受到影响。

### 恢复其他主题

在「设置 → 外观 → 主题」中切换回原主题即可。

## 自定义

主题的主要变量集中在 `宋韵·清和/theme.css` 顶部的 `body` 规则中：

```css
--song-rouge: #8C2F2D;
--song-rouge-light: #B76F6A;
--song-warm-gray: #8E8075;
--song-celadon: #B7C5B7;
--song-paper: #EDE6D9;
--song-paper-front: #F8F3E9;
--song-reading-width: 780px;
```

纸面颗粒由 `--song-paper-grain-fine` 控制，当前为 `128px` 平铺。若想更明显，可以增加该变量 SVG 中的 `opacity` 值；若想更轻，则降低该值。

## 文件结构

```text
Obsidian-SongStyle/
├── README.md
├── 宋韵·清和/
│   ├── manifest.json
│   ├── theme.css
│   ├── icon-preview.html
│   ├── icons/
│   │   ├── *.svg
│   │   └── variants/
│   │       └── file-*.svg
│   └── README.md
├── snippets/
│   └── 宋韵图标.css
├── screenshots/
│   ├── obsidian-light.png
│   ├── obsidian-dark.png
│   ├── icon-hero.png
│   ├── icon-directions.png
│   ├── icon-set.png
│   ├── icon-preview-full.png
│   └── icon-ui.png
├── examples/
│   └── 宋韵主题预览.md
└── dist/
    └── Obsidian-SongStyle-v1.1.1.zip
```

## 兼容性

- 最低 Obsidian 版本：`1.6.0`
- 实测版本：`1.14.4`（macOS）
- 图标替换依赖现代 CSS `:has()` 选择器
- 不依赖额外插件；Style Settings 仅用于可选的行宽设置
- 主题 CSS 不引用远程字体或图片

## 设计说明

- 背景颗粒的**视觉节奏**参考了 [中国色](https://zhongguose.com/) 的均匀细颗粒处理；未复制该站点的纹理图片或颜色。
- 色板与主题方向来自个人宋式审美项目。
- 图标按 “宋版册页” 方向生成并统一线宽、留白和小尺寸识别度。
- 预览截图使用仓库内的示例笔记，不包含个人笔记内容。

## 更新记录

### 1.1.1

- 补齐侧栏标签与文件工具栏图标。
- 恢复侧栏标签及按钮的固定尺寸和间距。
- 图标总数扩展至 22 枚并更新预览页。

### 1.1.0

- 完成宋韵图标组与 Obsidian 工具栏接入。
- 修复隐藏原生图标后 Ribbon 按钮行距过密的问题。
- 增加图标方向、完整图标组和界面预览。
- 补齐发布文档、示例笔记与截图。

### 1.0.0

- 初始宋式主题：色彩、纸面、标题、表格、引用、代码块和深色模式。

## License

本仓库未附带开源许可证。使用、修改或再分发前请先联系作者。
