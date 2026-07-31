# Beast Core 企业级中后台设计规范（完整合并版）

> **本文件为完整合并版，收录全部十二章内容，作为唯一权威源维护。** 日常向 AI 提需求生成设计方案时，建议改用拆分后的两份文档以减少无关上下文：
> - 《[Beast-Core-设计规范-核心通用版.md](./Beast-Core-设计规范-核心通用版.md)》——色彩/字体/尺寸/组件/z-index/主题/动效 + AI 产图 Prompt 模板，**任意页面都建议默认附带**。
> - 《[Beast-Core-设计规范-OMS业务专属版.md](./Beast-Core-设计规范-OMS业务专属版.md)》——OMS 业务组件、布局适配、管理列表页布局规范，**仅生成 OMS 商品管理类业务页面时才需要额外附带**。
>
> 两份拆分文档内容与本文件保持同步，后续如需修订规范，请先改本文件，再重新拆分同步到上述两个文件。
>
> 本文档基于 Beast Core 组件库（v5.191.0，React + TypeScript + css-in-js + CSS Variables）在 **OMS 后台**的实际运行时 Design Token 与业务组件样式提炼而成，适用于指导 UI 设计、界面还原，以及让 AI 依据本规范生成界面设计稿 / 高保真原型图。
>
> 数据来源：
> - **OMS 后台运行时 CSS**（从 OMS 后台 F12 来源中提取的 `1.css`~`4.css`）—— 本文档所有色值、圆角、字号、组件规格均以 OMS 实际生效值为**唯一标准**。
> - **OMS 限流页面运行时 CSS**（`限流-1.css`~`限流-4.css`）—— 其中 `限流-4.css` 包含 Beast Core 组件完整的 `--bc-*` Design Token 定义（含默认主题 `:root` 与 OMS 主题覆盖块），是第五章「组件交互细节」的主要依据来源。
> - **Beast Core 官方文档站** `https://beast.htj.pdd.net/core/docs` —— 仅作为组件结构、尺寸体系、z-index 分层等非主题色信息的辅助参考（需 SSO 登录）。
>
> 📌 本文档已抛弃 Beast Core 默认主题（`#19e` 深蓝 / 圆角 3px），全文统一采用 **OMS 运行时主题**（`#0071f3` 亮蓝 / 圆角 6px）。
>
> 📌 **阅读约定（精简重构核心原则）**：色彩、尺寸、图标体系等基础值在第二~四章**定义一次**作为权威源，后续组件章仅描述组件特有规格并引用基础值，不再重复抄录色值。状态色三件套以 **§2.9 为唯一权威源**，Toast/NoticeBar/状态提示块统一引用。
>
> 📝 **勘误记录（2026-07-31）**：本轮以三份真实线上页面运行时快照（停滞品生命周期、全托管开款价格管理、同款黑白名单管理）与两份依据本规范由 AI 生成的高保真页面（`index.html`、`oms-task-management-list.html`）做交叉核验，修正了若干与真实运行时 CSS 不符的数值/描述，并补充了此前遗漏的组件（详见各章节内标注"已更正""此前版本误写"字样处，以及新增的 §9.13~§9.15）。主要更正点：§12.1 主画布背景色由 `#f0f2f5` 更正为 `#fff`；Table 行 hover 色由 `#e6f6ff` 更正为 `#e6f9ff`；Tag success 三件套由 `#00bb12` 系更正回 `#00b359` 系（Beast Core 原生 Tag 未与 §2.9 统一）；Modal 按钮间距由 `8px` 更正为 `13px`；Card 选中三角标尺寸方向更正；Tab 分隔线颜色、高亮线默认高度、状态 Tab 字重字号等均已更正；新增快筛预设条、快捷统计卡片、表格图文辅助元素等章节。

---

## 一、设计总则

### 1.1 产品定位
- **Beast Core** 是开箱即用的企业级 React 组件库，面向**中后台（B 端）产品**研发，OMS 后台为其典型应用场景。
- 风格关键词：**克制、高效、信息密度高、灰阶为主、主题色点睛**。
- 视觉基调：白底 + 浅灰分割 + 深灰文字 + 单一品牌蓝主题色 + 状态色（成功/警告/危险）。

### 1.2 设计原则（产图时必须遵守）
1. **单一主题色驱动**：所有可交互元素的主色统一使用主题蓝 `#0071f3`，禁止滥用多色调。
2. **灰阶层次清晰**：文字通过不同透明度的黑色（0.8 / 0.6 / 0.4 / 0.32 / 0.24）建立信息层级，而非用彩色区分。
3. **尺寸三档制**：所有可交互控件统一提供 `small / medium / large` 三种尺寸，默认 `medium`（详见 §4.1）。
4. **圆角克制**：全局基础圆角 `6px`，Toast 等少数场景使用 `3px`，SKU 画布等特殊场景使用 `12px`（详见 §4.2）。
5. **间距规律**：以 `4px` 为基础栅格，常用间距 4 / 8 / 12 / 16 / 20 / 24。
6. **状态完整**：每个控件需覆盖 default / hover / active / disabled 四态，部分含 focus / error 态。

---

## 二、色彩体系（Color）

> 本章为色彩**唯一权威源**，后续章节引用此处定义，不再重复列出色值。

### 2.1 主题色（Brand / Theme Color）
主题色为蓝色系，共 10 级渐变色板（1 最浅 → 10 最深），6 级为基准色。

| Token | 色值 | 用途 |
|------|------|------|
| `themeColor` | `#0071f3` | **主品牌色**（= themeColor6），按钮主色、选中态、链接主色 |
| `themeColor1` | `#e6f6ff` | 最浅蓝，悬停浅底色、选中行底色 |
| `themeColor2` | `#a3daff` | 浅蓝 |
| `themeColor3` | `#7ac6ff` | |
| `themeColor4` | `#52aeff` | Slider 轨道填充色 |
| `themeColor5` | `#2994ff` | |
| `themeColor6` | `#0071f3` | 基准主题色 |
| `themeColor7` | `#0058cc` | 主题色 hover 态 |
| `themeColor8` | `#0042a6` | 主题色 active / pressed 态 |
| `themeColor9` | `#002f80` | |
| `themeColor10` | `#001e59` | 最深蓝 |

> **产图要点**：主色用 `#0071f3`，hover 用 `#0058cc`，active 用 `#0042a6`，浅底/选中背景用 `#e6f6ff`。

### 2.2 功能状态色（Semantic Colors）

| 语义 | Token | 默认色 | hover | active |
|------|------|------|------|------|
| 危险/错误 Danger | `dangerColor-color` | `#f71010` | `#d10209` | `#ab000b` |
| 成功 Success | `successColor` | `#00bb12` | — | — |
| 警告 Warning | `warnColor` | `#fb7701` | — | — |
| 信息 Info | （使用主题色） | `#0071f3` | — | — |

> Tag 标签对应：info 信息 / warn 提醒 / danger 警告(失败红) / success 成功 / fail 失败。
>
> **说明**：success / warn 未提供 hover / active 值，是因为二者主要用于状态展示（Tag、状态提示块、图标），并非可交互按钮，不存在悬停/按下态；danger 因同时用于 `danger` 按钮等可交互场景，故补充了完整状态。

### 2.3 文字色（Text Color —— 黑色透明度梯度）

| 层级 | Token | 色值 | 用途 |
|------|------|------|------|
| 主要文字 | `primaryTextColor` | `rgba(0,0,0,.8)` | 标题、正文主体 |
| 次要文字 | `secondaryTextColor` | `rgba(0,0,0,.6)` | 辅助说明、加载中文案 |
| 三级文字 | `thirdlyTextColor` | `rgba(0,0,0,.4)` | 图标色、弱化信息 |
| 提示文字 | `hintTextColor` | `rgba(0,0,0,.32)` | placeholder、禁用文字 |
| 禁用文字 | `disabledTextColor` | `rgba(0,0,0,.24)` | 不可用态文字 |

> **产图要点**：标题用 0.8 黑，正文用 0.8/0.6，辅助说明用 0.4，placeholder 用 0.32。**不要用纯黑 #000**，最深也只用 0.8 透明度黑（实际约 #333）。

### 2.4 背景与边框色

| Token | 色值 | 用途 |
|------|------|------|
| `bgColor` | `#fff` | 页面/卡片/输入框默认背景 |
| `disabledBgColor` | `#f5f5f5` | 禁用态背景 |
| `activeDisabledBgColor` | `#c2c2c2` | 激活禁用态背景 |
| `borderColor` | `#dbdbdb` | 默认边框色 |
| `hoverBorderColor` | `#0058cc` | hover 边框色（使用主题蓝） |
| `divideColor` | `#ebebeb` | 分割线色 |
| `trackColor` | `#f0f0f0` | 进度条/滑块轨道底色 |
| `boxShadowColor` | `#eef7ff` | 主题色阴影色（浅蓝） |

### 2.5 链接色（Link）

链接色与主题色统一（不再使用独立的深蓝 `#26a`）：默认 `#0071f3`，hover `#0058cc`，active `#0042a6`，disabled `#c2c2c2`。

### 2.6 图标色

默认 `rgba(0,0,0,.4)`（即 `thirdlyTextColor`），hover `rgba(0,0,0,.8)`（即 `primaryTextColor`）。

### 2.7 状态提示图标体系（Status Icon System）

Beast Core 信息提示类组件（NoticeBar / Toast / 状态提示块 / Popover）统一使用**实心填充圆形图标**（`circle_filled` 形态），而非线框型图标。所有图标基于 `viewBox="0 0 1024 1024"`，通过 `fill="currentColor"` 继承所在语义色。

| 语义 | 图标名称（data-testid） | 视觉描述 | 颜色（fill） |
|------|------|------|------|
| 信息 Info | `beast-core-icon-info-circle_filled` | 实心圆 + 白色 `i` 字形 | `#0071f3` |
| 警告 Warn | `beast-core-icon-warning-circle_filled` | 实心圆 + 白色感叹号 | `#fb7701` |
| 错误 Error | `beast-core-icon-close-circle_filled` | 实心圆 + 白色 `×` 叉号 | `#f71010` |
| 成功 Success | `beast-core-icon-check-circle_filled` | 实心圆 + 白色对勾 | `#00bb12` |

> **产图要点**：信息提示组件图标一律使用**实心填充圆**形态（外圈实心填色 + 内部白色符号），禁止使用线框型图标。图标通过 `currentColor` 继承语义色，无需单独设色。图标资源索引见**附录 D**，完整 SVG `path` 源码见独立文件《Beast-Core-设计规范-SVG图标附录.md》§D（需要直接输出 HTML/SVG 时注入）。

### 2.8 线型箭头图标（Line Arrow Icon）

Beast Core 的方向性箭头（上/下/左/右）统一使用**线型 V 形图标**，由两条线段组成（非实心三角形块）。涵盖 Select 下拉箭头、Collapse 折叠箭头、Pagination 翻页箭头等场景。`viewBox="0 0 1024 1024"`，`fill="currentColor"`。

| 图标名称（data-testid） | 视觉描述 | 颜色（fill） | 应用场景 |
|------|------|------|------|
| `beast-core-icon-down` | 线型 V 形下箭头（两条粗线段） | `rgba(0,0,0,.4)` | Select 下拉箭头、Collapse 折叠箭头 |
| `beast-core-icon-left` | 线型 V 形左箭头（两条粗线段） | `rgba(0,0,0,.6)` | Pagination 上一页箭头 |
| `beast-core-icon-right` | 线型 V 形右箭头（两条粗线段） | `rgba(0,0,0,.6)` | Pagination 下一页箭头 |

> **产图要点**：所有方向性箭头（下拉/折叠/翻页）统一使用**线型 V 形**（两条线段，非实心三角块），下拉/折叠箭头展开时旋转 180°。禁止使用实心三角形 `▼◀▶` 或 CSS border 三角。图标资源索引见**附录 E**，完整 SVG `path` 源码见独立文件《Beast-Core-设计规范-SVG图标附录.md》§E（需要直接输出 HTML/SVG 时注入）。

### 2.9 状态色配套浅底方案（Status Color Scheme —— 状态三件套唯一权威源）

OMS 为 Toast / NoticeBar / 确认渲染等信息提示场景配套了完整的**语义色浅底方案**（图标色 + 浅底 + 边框三件套），可直接用于信息提示块。Toast/NoticeBar/状态提示块统一引用本表配色。

| 语义 | 图标/强调色 | 浅底背景 | 边框色 | 应用场景 |
|------|------|------|------|------|
| 成功 Success | `#00bb12` | `#e3fae1` | `#9bed98` | Toast 成功、NoticeBar 成功、已确认态 |
| 警告 Warn | `#fb7701` | `#fff6e6` | `#ffdaa3` | Toast 警告、NoticeBar 警告、待确认态 |
| 错误 Error | `#f71010` | `#ffeae6` | `#ffbdb3` | Toast 错误、NoticeBar 错误 |
| 信息 Info | `#0071f3` | `#e6f6ff` | `#a3daff` | NoticeBar 信息 |

> **产图要点**：信息提示块采用"浅底 + 同色边框 + 深色图标"三件套，圆角 3px（NoticeBar）/ 6px（确认渲染块），统一感强。Toast 带轻阴影 `0px 2px 8px 0px rgba(...)`。

---

## 三、字体排版（Typography）

### 3.1 字号体系
| Token | 值 | 用途 |
|------|------|------|
| `fontSize-small` | `12px` | 小尺寸控件文字、辅助信息 |
| `fontSize-medium`（非控件正文） | `12px` | 常规正文、说明文字 |
| `fontSize-medium`（控件，如 Button） | `14px` | 控件内文字（具体见 §4.1，控件字号以 §4.1 为准，不与正文 token 混用） |
| `fontSize-large` | `16px` | 大尺寸控件、页面标题级 |

> 实际常用字号：**12px / 14px / 16px** 三档。文档正文默认 12px，按钮 medium 用 14px，Tab 线性一级用 16px，Modal 标题用 16px。

### 3.2 行高
- 通用行高 `1.5`。
- 表单 item 行高 `1.5`，表单内容行高 `24px`。
- Modal 正文行高 `20px`，Modal 标题/Tab 线性标签字号 16px。

### 3.3 字重
- 常规文字：`400`（normal）。
- 按钮（primary / danger）：`500`（medium）。
- 列表项选中态：`600`（semibold）。

---

## 四、尺寸与间距（Size & Spacing）

> 本章为尺寸/圆角/间距**唯一权威源**，后续组件章引用此处定义。

### 4.1 控件高度三档（核心规则）

| 尺寸 | 高度 | 字号 | 适用 |
|------|------|------|------|
| `small` | **24px** | 12px | 紧凑表格内、空间受限 |
| `medium`（默认） | **28px** | 14px（按钮）/ 12px（基础） | 常规表单、列表 |
| `large` | **40px** | 16px | 强调操作、首屏主表单 |

> Button / Input / Select / Pagination 等均遵循此 24/28/40 高度体系。

### 4.2 圆角（Border Radius）

| 场景 | 圆角 |
|------|------|
| 全局基础 `borderRadius` | **6px** |
| Modal 弹窗 | `6px` |
| Badge 徽标数字 | `6px`（普通）/ `8px`（large） |
| Card 卡片 | `0px`（直角） |
| Card 头部 | `2px 2px 0 0` |
| Carousel 圆点 | `2px` |
| BackTop | `50%`（圆形） |
| Tab 胶囊型 | `0`（直角） |
| Toast 消息 | `3px`（保持小圆角） |
| SKU 图片画布 | `12px` |

> **产图要点**：OMS 全局圆角为 6px（按钮、输入框、标签、提示块等）；Toast 用 3px；卡片用直角 0px。整体偏方正，控件圆角适中。

### 4.3 间距栅格
基础单位 `4px`，常用值：
- 控件内 padding：Button `0 12px`(s/m) / `0 16px`(l)；图标与文字间距 `4px`(s/m) / `8px`(l)。
- 按钮组间距：Button gray ghost 按钮组内各按钮间 `margin: 10px`。
- 卡片内边距：`12px`（Card body / header 横向）。
- Modal body padding：`24px 24px 20px`；Modal header padding `8px 12px`。
- 列表项 padding：medium `5px 8px`，large `8px 12px`，small `3px 4px`。
- 组件间间距（Space）：默认 `8px`，可配置。
- 表单 label 宽度：默认固定表单（Modal / Drawer 内等窄幅场景）用 `144px`；**列表页筛选表单的 label 宽度为响应式，随视口宽度自适应，并非固定值**，常见分辨率下的参考值见 §12.1《OMS 业务专属版》（如 1920px 视口下为 `104px`），产图时应按目标视口宽度取值，不要直接套用 `144px`。

### 4.4 阴影
- 弹层（Popover/Tooltip/Dropdown）使用主题色浅阴影 `boxShadowColor: #eef7ff`。
- 弹窗/浮层靠 `z-index` 分层而非重阴影（见第六章）。

---

## 五、组件设计规范（Component Specs）

> 以下每个组件给出「类型 / 尺寸 / 颜色 / 状态」四要素，供产图时直接套用。色彩/尺寸统一引用第二、四章，本章仅描述组件特有规格。

### 5.1 Button 按钮
**类型（type）8 种：**

| 类型 | 默认背景 | 默认文字 | 默认边框 | hover | active |
|------|------|------|------|------|------|
| `primary` 一级 | `#0071f3` | `#fff` | `#0071f3` | `#0058cc` | `#0042a6` |
| `secondary` 二级 | `#fff` | `#0071f3` | `#0071f3` | 边框`#0058cc` | 边框`#0042a6` |
| `gray` 三级 | `#fff` | `rgba(0,0,0,.8)` | `#adadad` | 边框`#0058cc` | 边框`#0042a6` |
| `danger` 危险 | `#f71010` | `#fff` | `#f71010` | `#d10209` | `#ab000b` |
| `secondaryDanger` | `#fff` | `#f71010` | `#f71010` | 边框`#d10209` | — |
| `grayDanger` | `#fff` | `rgba(0,0,0,.8)` | `#adadad` | 边框`#d10209` | — |
| `textPrimary` 文字链 | 透明 | `#0071f3` | 无 | `#0058cc` | `#0042a6` |
| `text` 文字链 | 透明 | `rgba(0,0,0,.8)` | 底边 1px `rgba(0,0,0,.4)` | 底边`#0058cc` | 底边`#0042a6` |
| `textTip` 纯文本 | 透明 | `rgba(0,0,0,.8)` | 无 | — | 无点击 |

- **尺寸**：遵循 §4.1 三档（small 24px/12px / medium 28px/14px / large 40px/16px），默认 medium。
- **disabled 态**：背景 `#f5f5f5`，边框 `#dbdbdb`，文字 `rgba(0,0,0,.32)`。
- **说明**：`gray` 类型默认边框刻意使用比全局默认边框色更深的 `#adadad`（而非 §2.4 的 `#dbdbdb`），因其背景同为白色，需要更强的边框辨识度，属有意为之，非笔误。
- 字重 500。
- **交互细节**：
  - 内边距：横向 `0 12px`(s/m) / `0 16px`(l)；图标与文字间距 `4px`(s/m) / `8px`(l)。
  - 状态过渡：default → hover → active → disabled，背景/边框/文字色以 `easeInOutCirc` 平滑过渡。
  - `primary` / `danger` 为实心填充型，hover/active 改变填充色与边框色（同色）。
  - `secondary` / `gray` / `secondaryDanger` 为描边型，hover/active 仅改变边框色与文字色，背景保持白底。
  - `textPrimary` / `text` 为文字链型，无背景无边框（`text` 带底边下划线），hover 改文字色 + 底边色。
  - `textTip` 为纯文本占位，不可点击、无 hover 态。
  - 支持 `loading` 态：按钮内显示旋转图标，期间禁用点击。
  - 支持 `iconOnly` 纯图标按钮（正方形，宽 = 高）。

### 5.2 Input 输入框
- **尺寸**：遵循 §4.1 三档（small 24px / medium 28px / large 40px），默认 medium。
- 背景 `#fff`，边框 `#dbdbdb`，hover 边框 `#0058cc`（主题蓝）。
- placeholder 色 `rgba(0,0,0,.32)`，输入文字 `rgba(0,0,0,.8)`。
- 前缀/后缀 addon 背景用 `#f5f5f5`。
- `displayType="simple"` 简约型：背景透明、无边框（下划线式）。
- `isError` 错误态：边框变 `#f71010`。
- **交互细节**：
  - 内边距：`8px`(s/m) / `12px`(l)；横向 padding 由 `--bc-Input-padding` 控制。
  - **focus 态**：边框变 `themeColor (#0071f3)` + 外发光 `box-shadow: 0 0 0 2px #eef7ff`（`boxShadowColor` 浅蓝光晕）。
  - hover 边框 `#0058cc`，focus 边框 `#0071f3`，两者有层次区分。
  - 前缀/后缀（addon）背景 `#f5f5f5`，与输入框主体共边框。
  - 支持清除图标（IconClear）：有值时显示，色 `rgba(0,0,0,.4)`，hover `rgba(0,0,0,.8)`。
  - 支持 suffix 后缀文字/图标，色 `rgba(0,0,0,.4)`。
  - 禁用态：背景 `#f5f5f5`，文字 `rgba(0,0,0,.8)`（注意：禁用时文字色不变，仅背景变灰 + cursor not-allowed）。
  - 密码框：右侧显示/隐藏切换图标。
  - TextArea 多行：继承 Input 配色，支持自适应高度。

### 5.3 Form 表单
- label 宽度 `144px`，label 与内容同行，行高 1.5。
- 表单项内容行高 `24px`。
- 支持校验（required 必填、validateOnChange）、错误抖动（errorShaking）。
- 推荐使用 SchemaForm（`@msfe/beast-schema-form`）声明式配置。
- **交互细节**：
  - label 与内容同行布局，label 右对齐，内容左对齐。
  - 必填项 label 前显示红色 `*` 号（`dangerColor`）。
  - 校验失败：对应控件边框变 `#f71010`，下方显示红色错误文案（11px）；支持 `errorShaking` 错误抖动动效。
  - `validateOnChange`：值变化时实时校验；`validateOnBlur`：失焦时校验。
  - 表单项间距默认 `16px`（4px 栅格的 4 倍）。

### 5.4 Select 下拉选择器
- 输入框高度：遵循 §4.1 三档（large 40px / medium 28px / small 24px）。
- 选项行高：large 34px / medium 28px / small 28px。
- 下拉面板最小高度 168px，z-index 101。
- **交互细节**：
  - **非原生控件**：渲染为自定义容器 + 下拉面板，**不使用原生 `<select>`**。
  - 输入框右侧下拉箭头图标为**线型 V 形**（见 §2.8），色 `arrowIconColor: rgba(0,0,0,.4)`，展开时箭头旋转 180°。
  - **展开态**：输入框边框变 `themeColor` + 外发光 `box-shadow: 0 0 0 2px #eef7ff`。
  - **下拉面板**：白底，边框 `1px solid #e8e8e8`，阴影 `0 2px 8px rgba(0,0,0,.15)`，圆角 `6px`，z-index `101`。
  - 选项 hover 背景 `themeColor1 (#e6f6ff)` 浅蓝底；选中项文字加粗（`activeFontWeight: bold`）+ 主题蓝色。
  - 选项 padding `5px`，行高 1.5。
  - 支持可搜索（输入过滤）、多选（选中项以 Tag 形式回填输入框）、可清空（清除图标）。
  - 无数据时显示 `#f7f7f7` 底色占位 + 刷新链接（主题蓝色）。
  - 点击面板外部自动关闭。

### 5.5 Checkbox / Radio
- 复选框选中内框色用 `themeColor`，未选中边框 `borderColor`。
- 支持 button 按钮组形态（buttonTagMode / buttonGhostTagMode 透明背景）。
- Radio 支持 tab 胶囊形态。
- **交互细节**：
  - **非原生控件**：原生 `<input>` 被隐藏（`width:0; height:0; opacity:0`），用自定义视觉层渲染勾选/选中态，**不使用浏览器默认外观**。
  - **Checkbox**：`14×14` 方形盒，圆角 `2px`；未选中白底 + `#dbdbdb` 边框；hover 边框变 `#0058cc`；选中蓝底 `#0071f3` + 白色对勾；禁用灰底 `#f5f5f5`。
  - **Radio**：`14×14` 圆形圈；未选中白底 + `#dbdbdb` 边框；hover 边框变 `#0058cc`；选中边框变 `#0071f3` + 内部 `8×8` 蓝色实心圆点；禁用边框 `#dbdbdb`。
  - 文字与图形间距 `4px`（`circleTextGap`）。
  - `buttonTagMode` 按钮组态：选中项蓝底白字，未选中白底蓝字蓝框；高 `28px`（medium），`padding: 0 12px`，圆角 `6px`。
  - `buttonGhostTagMode` 幽灵态：透明背景，未选中灰边框（`#dbdbdb`）+ 主文字色，选中项蓝边框蓝字；结构对齐 Beast Core 标准 Button gray ghost（`BTN_gray` + `BTN_ghost`，高 `28px`，`padding: 0 12px`）。
  - 按钮组间距：组内各按钮间 `margin: 10px`（Beast Core ghost 按钮标准间距）。
  - 半选中态（indeterminate，仅 Checkbox）：蓝底 + 横线图标。

### 5.6 Switch 开关
- 关闭态背景 `borderColor (#dbdbdb)`，圆点 `#fff`。
- 开启态背景 `themeColor (#0071f3)`。
- **交互细节**：
  - 尺寸：small `32×16`(圆点 12px) / medium `48×24`(圆点 18px)，默认 medium。
  - 关闭态：灰底 `#dbdbdb`，圆点居左；hover 背景变 `rgba(0,0,0,.32)`。
  - 开启态：蓝底 `#0071f3`，圆点居右；hover 背景 `#0058cc`。
  - 圆点滑动过渡以 `easeInOutCirc` 缓动。
  - 禁用态：关闭时灰底 `#dbdbdb` + 半透明白圆点；开启时浅蓝底 `themeColor4` + 半透明白圆点。
  - 支持 `loading` 态：圆点处显示旋转图标。

### 5.7 Tag 标签
- 类型：`info`(蓝) / `warn`(橙) / `danger`(红) / `success`(绿) / `fail`(红)。
- padding `4px`，圆角 `6px`，字号随尺寸 12/12/16px。
- **交互细节**：
  - 各类型为「文字色 + 浅底 + 同色边框」三件套：info 蓝`#0071f3`/`#e6f6ff`/`#52aeff`，warn 橙`#ff7300`/`#fff5e6`/`#ffc37a`，danger 红`#f71010`/`#fff2f0`/`#ffaca6`，success 绿 **`#00b359`/`#e8fbe5`/`#00b359`**（对应 `--bc-Tag-success-color/-backgroundColor/-borderColor`，经 OMS 三个实际业务页面运行时 CSS 校验，OMS 主题**并未**覆盖该组件级 Token，Beast Core `Tag` 组件的 success 三件套目前仍是此"旧值"，不要再套用 §2.9 的 `#00bb12`/`#e3fae1`/`#9bed98`），fail 灰`rgba(0,0,0,.4)`/`#ebebeb`/`rgba(0,0,0,.12)`。
  - **注 1**：info / warn / danger / fail 因历史原因均使用 Tag 专属配色（与 §2.9 数值不同属正常，非笔误），产图时以本条为准。
  - **注 2**：`#00bb12`/`#e3fae1`/`#9bed98` 这套配色实际生效于 `bgb-pc` 业务组件库的标签（CSS 变量 `--pc-tag-success-color` 等，见 §7.6），与 Beast Core 原生 `Tag` 组件是两个独立组件，不可混用；此前版本"已与 §2.9 统一"的表述已核实为误判，特此更正。
  - 支持 `dot` 圆点形态：标签内含 `6×6` 同色圆点。
  - 支持可关闭（`closable`）：右侧显示关闭 `×` 图标，hover 高亮。
  - `gray` 灰标签：文字 `rgba(0,0,0,.6)` + 底色 `rgba(0,0,0,.04)`，无边框，用于中性分类。

### 5.8 Badge 徽标数
- 圆形红底（`#ff1818`），白字。
- 普通态圆角 6px，min 12×12；large 圆角 8px，min 16px，padding `2px 4.1px`。
- 超过 99 显示 `99+`，超过 999 显示 `999+`。
- 圆点模式 dot 8×8。

### 5.9 Card 卡片
- 默认**直角**（borderRadius 0px，见 §4.2），边框 `1px solid #dbdbdb`。
- header 高 40px，padding `12px 40px 12px 12px`，字号 14px。
- body padding 12px，cover 无内边距。
- 选中态边框变 `themeColor`，右上角带勾选三角标（`beastCardCheckedTriangle` 容器 + `beast-core-icon-check` SVG 图标）。
- footer 最小高 40px，padding 12px。
- **交互细节**：
  - 选中态：边框变 `#0071f3`，右上角显示蓝色勾选三角标。结构为**真实 DOM 元素**而非伪元素：一个直角三角形容器，通过 `border-width: 14px 15px`（`small` 尺寸为 `10px 10px`）+ `border-color: themeColor themeColor transparent transparent`（即**上边、右边**为主题色，**下边、左边**透明，绝对定位 `top:0; right:0`）实现；内叠一个白色勾选 SVG 图标（`beast-core-icon-check`，`fill=#fff`，`font-size:14px`，绝对定位 `top:-12px; right:-14px`，small 尺寸 `font-size:16px` 并 `scale(0.625)`），勾符号被蓝色三角完整包裹。（对应 Token：`--bc-Card-beastCardCheckedTriangleBorderWidth: 14px 15px`、`--bc-Card-beastCardCheckedTriangleSmallBorderWidth: 10px 10px`，经真实运行时 CSS 校验，此前版本描述的 `24px` 尺寸与"border-top/border-left"着色方向均有误，已更正。）
  - 勾选图标使用 `beast-core-icon-check` 线型对勾（`viewBox 0 0 1024 1024`），白色填充。图标资源索引见**附录 F**，完整 SVG `path` 源码见独立文件《Beast-Core-设计规范-SVG图标附录.md》§F（需要直接输出 HTML/SVG 时注入）。
  - hover 态：无特殊背景变化（卡片非可点击元素，选中靠显式操作）。
  - cover 封面图无内边距，撑满卡片宽度。

### 5.10 Table 表格
- 用于行列数据展示，支持选择/排序/筛选/对比/自定义表头。
- 支持顶对齐 / 居中 / 底对齐。
- 固定表头/列设计 Token 值为 z-index 100（`--bc-zIndex-tableFixed`），但当前 OMS 运行时实际生效值更低（见下方交互细节说明）。
- **表头规格（OMS）**：背景 `#f5f5f5`，文字色 `rgba(0,0,0,.8)`，字重 `500`，行高 `18px`。
- **交互细节**：
  - **行 hover 背景为 `#e6f9ff`**（`--bc-Table-trHoverBgColor`，专属组件 Token，**不等于** `themeColor1 (#e6f6ff)`，经三个真实 OMS 页面运行时 CSS 交叉核验一致，二者仅差 1 个色值单位，极易混淆，产图/还原时务必使用 `#e6f9ff`）；选中行同样使用该浅蓝底。
  - 单元格 padding `9px 12px`，斑马纹可选（偶数行 `#fafafa`）。
  - 可排序列表头显示排序图标，点击切换 升序↔降序↔取消。
  - 支持选择列（Checkbox 全选/单选）、筛选（表头下拉）、固定列/表头。**注**：Design Token `--bc-zIndex-tableFixed` 定义为 `100`，但真实运行时 CSS 里固定表头（sticky header）实际 `z-index: 3`、左右冻结列（sticky column）实际 `z-index: 2`，并未直接引用该 Token；产图时按真实值（表头 3 / 冻结列 2）还原层级关系，`100` 仅作为设计系统预留的 Token 值记录于附录 A/§6。
  - 空数据占位：居中图标 + 标题（`16px #000`）+ 描述（`12px #999`）。

### 5.11 Modal 弹窗
- 最小宽 320px，圆角 6px。
- header padding `8px 12px`，标题字号 16px；body padding `24px 24px 20px`，正文 12px / 行高 20px。
- 关闭图标 16px，z-index 1000（遮罩同 1000）。
- 提供 `Modal.Alert()` 等语法糖。
- **交互细节**：
  - 遮罩 `rgba(0,0,0,.4)`，点击遮罩默认不关闭（可配置 `maskClosable`）。
  - header 右侧关闭图标 `16px`（`icon-color: rgba(0,0,0,.4)`），hover 变 `rgba(0,0,0,.8)`，位于 `right:12px; top:12px`。
  - 出现/消失带淡入淡出动效（`easeInOutCirc`）。
  - footer 操作按钮右对齐，按钮间距 `13px`（`--bc-Modal-operationGutter` / `--bc-Button-buttonGap`，经真实运行时 CSS 校验，并非通用 Space 组件的默认 `8px`，Modal 内按钮组间距为 Button 组件专属 Token，此前版本误写为 `8px`，已更正）。
  - `Modal.Alert()` / `Modal.Confirm()` 为语法糖，复用 Modal 容器，按钮为「取消 / 确定」。
  - ESC 键关闭（可配置）。

### 5.12 Toast 消息
- z-index 1010，全局轻提示。
- **交互细节**：
  - 定位：距顶 `56px`，水平居中（`left:50%; transform:translateX(-50%)`）。
  - 字号 `14px`，padding `10px 16px`，圆角 `3px`（OMS 覆盖，保持小圆角），最大宽 `766px`。
  - 四态三件套统一引用 §2.9（**实心填充圆形图标** + 浅底 + 同色边框 + 专属阴影）。Toast 专属阴影值见附录 A（`--bc-Toast-{success|warn|error}-boxShadow`）。
  - 图标 `14px`（见 §2.7），与文字间距 `8px`。
  - 出现/消失：淡入淡出 `.3s`，缓动 `cubic-bezier(0.55, 0, 0.55, 0.2)`。
  - 默认自动消失（可配 duration），不遮挡操作。

### 5.13 Tooltip / Popover
- Tooltip：白底，padding `5px 9px`，字号 12px，z-index 1060。
- Popover：白底，z-index 1030，带确认操作时最小宽 320px，操作按钮高 28px。
- **交互细节**：
  - **Tooltip**：白底，阴影 `0 2px 8px 0 rgba(0,0,0,.4)`，带 `4px` 白色三角箭头；hover 触发显示，移出隐藏。
  - **Popover**：白底，padding `5px 9px`；支持标题（`14px` 加粗）+ 内容（`12px` 次要色）+ 图标（`20px`）。
  - `withConfirm` 确认型 Popover：最小宽 `320px`，padding `12px`，底部操作按钮高 `28px`，标题 `14px`。
  - 触发方式：hover / click / focus，可配置。

### 5.14 Progress 进度条
- 已填充色：normal 用 `themeColor #0071f3`，exception 用 `#ff1818`。
- 轨道底色 `trackColor #f0f0f0`。
- 支持线性 / 环形。

### 5.15 Spin 加载中
- z-index 999，遮罩式加载。
- **交互细节**：
  - 区域加载：绝对定位铺满父容器（`inset:0`），背景 `rgba(238,238,238,.4)` 半透明浅灰，居中旋转图标。
  - 旋转图标：主题蓝色圆环，`0.8s` 线性匀速旋转。
  - 全屏加载：固定定位铺满视口，z-index `999`。
  - 可包裹任意内容，加载期间内容不可交互。

### 5.16 Tab 选项卡
- **line 线性**（一级 Tab，MMS 主形态）：字号 16px，底部主题色高亮线，padding `0 12px`，label padding `12px 0`。用于页面/模块头部统领内容。**高亮线高度组件默认值为 `1px`**（`--bc-Tab-lineType-activeBelowLabelLineHeight`），部分页面（如状态统计 Tab）会通过内联样式将其显式覆盖为 `2px` 以强化视觉突出（如 §9.4 状态标签页场景），两者均属正常用法，产图时按需选择，不要将 `2px` 误当作组件恒定默认值。
- **card 卡片型**：padding `8px 20px`，字号 12px。
- **capsule 胶囊型**：padding `7px 16px`，直角，字号 12px。
- **reunit 等分型**：padding 16px，字号 12px。
- **交互细节**：
  - 选中态文字色变 `themeColor`，line 型底部 `2px` 主题色高亮线（圆角 `1px`），其余型用边框/底色区分。
  - hover 态文字色变 `themeColor`（`textColors-hoverColor`）。
  - line 型：高亮线宽度跟随 label 文字宽度（`padding 0 12px` 内）。
  - capsule 胶囊型：直角（`borderRadius: 0`），`1px solid borderColor` 描边，选中项顶部 `themeColor` 边线。
  - reunit 等分型：选中项顶部 `themeColor` 边线 + hover 浅蓝底 `themeColor1`。
  - 支持左右翻页箭头（`turner`），超出时显示，色 `icon-color`，hover 变 `primaryTextColor`。

### 5.17 Pagination 分页
- 遵循 §4.1 三档（高度 24/28/40，字号 12/14/16），页码项最小宽 = 高度，行高 26px。
- 常用 `toRight` 靠右对齐，显示「共有 N 条」。
- **交互细节**：
  - **翻页用左右箭头图标，不用「上一页 / 下一页」文字**：prev/next 为**线型 V 形箭头**按钮（见 §2.8，左 `beast-core-icon-left`、右 `beast-core-icon-right`），色 `arrowColor: rgba(0,0,0,.6)`。
  - 跳页用 `«`（`\AB`）/ `»`（`\BB`）符号（`jumpPrevContent` / `jumpNextContent`），非文字。
  - 页码项：方形（最小宽 = 高度，medium 为 `28×28`），白底 + `#dbdbdb` 边框；hover 文字/边框变 `#0058cc`。
  - 选中页码：蓝底 `#0071f3` + 白字 + 蓝边框。
  - 禁用箭头：文字 `rgba(0,0,0,.14)` + 边框 `#ccc`，cursor not-allowed。
  - 总数文字「共有 N 条」字重 `400`，靠左；页码区靠右（`toRight`）。
  - 支持页码跳转输入框 + 「前往 N 页」；支持 `sizeChanger` 每页条数切换（靠右，margin-right `12px`）。

### 5.18 Step 步骤条
- 引导用户按流程完成任务，图标背景用 `themeColor6`。

### 5.19 Breadcrumb 面包屑 / Dropdown / Menu
- Menu 项高 40px，行高 40px，选中项左侧 3px 主题色指示条；折叠宽 64px，子菜单弹层最小宽 160px。
- Dropdown z-index 1050。
- **交互细节**：
  - **Breadcrumb**：分隔符色 `divideColor`，普通项色 `secondaryTextColor`，hover 变 `themeColor6`，点击变 `themeColor7`，当前项 `primaryTextColor`。
  - **Dropdown**：下拉菜单 z-index `1050`，白底 + 阴影；菜单项 hover 浅蓝底。
  - **Menu**：选中项左侧 `3px` 主题色指示条；折叠态宽 `64px`（仅图标）；子菜单弹层最小宽 `160px`。

### 5.20 Drawer 抽屉 / Collapse 折叠面板 / Divider
- Collapse 面板高 44px，容器背景 `#fafafa`。
- Divider 水平最小宽 100%，垂直高 0.9em。
- **交互细节**：
  - **Drawer**：从侧边滑入，遮罩 `rgba(0,0,0,.4)`；OMS 全宽抽屉宽 `calc(100vw - 32px)`，标题栏高 `48px`，内容 padding `24px`，底部栏 sticky。
  - **Collapse**：面板高 `44px`，展开/收起带箭头旋转动效（线型 V 形箭头，与 Select 下拉箭头同款 `beast-core-icon-down`）；容器背景 `#fafafa`。
  - **Divider**：水平线最小宽 `100%`，垂直线高 `0.9em`，色 `divideColor`。

### 5.21 Grid 栅格 / Space 间距 / Box 快捷样式
- Grid 基于 flex，支持百分比布局，Row/Col 横向，纵向用 Container/Item 设 `direction=vertical`。常用 gutter 16px。
- Space 默认水平间距 8px，支持对齐方式。
- Box 快捷样式组件（不支持 SSR），可代替行内 style。

### 5.22 NoticeBar 通告栏
> 源自限流页面运行时 CSS（`--bc-NoticeBar-*` token），OMS 信息提示主组件，用于页面顶部常驻提示。
- **四态三件套**统一引用 §2.9（**实心填充圆形图标** + 浅底 + 同色边框），圆角 `3px`（OMS 覆盖），padding `6px 8px`。
- **交互细节**：
  - 图标 `16px`（见 §2.7，实心填充圆），与内容间距 `8px`，顶部偏移 `1px`。
  - 右侧可选关闭图标（`16px`，色 `icon-color`，hover 变 `primaryTextColor`），与内容间距 `8px`。
  - 内容字号 `12px`，行高 `1.5`，文字色 `primaryTextColor`。
  - 常用于批量操作头部、待确认/已确认提示块。

### 5.23 DatePicker / RangePicker 日期选择器
> 源自限流页面运行时 CSS（`--bc-RangePicker-*` token），非原生控件。
- **交互细节**：
  - **非原生控件**：渲染为自定义容器 + 日历面板，**不使用原生 `<input type="date">`**。
  - 输入框复用 Input 配色（`#dbdbdb` 边框，hover `#0058cc`，focus 主题蓝 + 浅蓝光晕）。
  - 左侧日历图标（`iconCalendarColor: rgba(0,0,0,.4)`），有值时显示清除图标。
  - **RangePicker**：两个日期输入框 + `~` 分隔符，共用一个边框容器；选中区间内日期浅蓝底 `themeColor1`，起止日蓝底白字 `themeColor`。
  - 日历面板：单元格 `24×30`，padding `18px 10px`；今天主题蓝边框，禁用日灰色；月份/年份可切换。
  - 面板 z-index 同 Select 下拉（`101`）。

---

## 六、层级 z-index 体系（Layering）

弹层组件严格分层，**产图/还原时不可随意覆盖**。以下为 z-index **唯一权威源**（对应附录 C）：

| 组件 | z-index |
|------|---------|
| BackTop 回到顶部 | 10 |
| Table 固定列/表头（设计 Token，实际生效见下方注） | 100 |
| Select 下拉面板 | 101 |
| Spin 加载遮罩 | 999 |
| Preview 预览 | 999 |
| Modal 弹窗 + 遮罩 | 1000 |
| Toast 消息 | 1010 |
| Notification 通知 | 1010 |
| Popover 气泡 | 1030 |
| Portal 通用浮层 | 1030 |
| Portal 阴影 | 1029 |
| Dropdown 下拉菜单 | 1050 |
| Tooltip 提示 | 1060 |

> **注（Table 固定列/表头）**：Beast Core 设计系统预留了 `--bc-zIndex-tableFixed: 100` 这一 Token，但经三个真实 OMS 页面运行时 CSS 交叉核验，当前 `Table` 组件实现并未直接引用该 Token，而是分别硬编码为：固定表头（sticky header）`z-index: 3`，左右冻结列（sticky column）`z-index: 2`。产图/还原表格层级关系时请按 3 / 2 的真实值处理，`100` 仅作为设计系统历史/预留 Token 记录，不代表当前实际渲染层级。

---

## 七、主题机制

### 7.1 主题定制
- 通过 `ConfigProvider` 注入：
  - `themeColor="red"` —— 快速切换主题色（影响所有 themeColor 衍生色）。
  - `tokens={adTokens}` —— 注入完整主题包（如广告模式 `@msfe/ad-theme`），覆盖任意 Token。
- 所有视觉值均为 CSS Variables，主题切换零重渲染成本。

### 7.2 OMS 主题实现机制
- OMS 后台通过在 `:root` 上声明 CSS 变量，注入完整主题包，组件层零感知。
- OMS 主题源自 `1.css` 第 2163 行 `:root` 块，包含主题色板、语义色、圆角、表格、Toast、NoticeBar 等全套 Token。
- 本文第二~五章的所有色值即为该主题包的实际生效值。

### 7.3 暗黑模式
- `ConfigProvider isDark` 开启暗黑模式。

### 7.4 国际化
- 默认中英文，已支持哈萨克语、俄语，可扩展。

### 7.5 OMS 细节 Token
OMS 主题中被单独定义的组件级细节 Token 已统一收录至**附录 A** 速查表，此处不再重复列举。

### 7.6 bgb-pc 业务组件库覆盖

OMS 主题还覆盖了 `bgb-pc` 业务组件库的标签/圆点色：

```css
--pc-tag-gray-bg-color: rgba(0, 0, 0, 0.04);
--pc-tag-warn-color: #fb7701;
--pc-tag-warn-bg-color: #fff6e6;
--pc-dot-warn-bg-color: #ffae52;
```

---

## 八、动效

| Token | 值 |
|------|------|
| 缓动函数 `easeInOutCirc` | `cubic-bezier(0.78, 0.14, 0.15, 0.86)` |

---

## 九、OMS 业务组件规范（Business Components）

> 以下组件规范源自 OMS 后台运行时 CSS（`2.css` / `3.css`），是 Beast Core 基础组件之上的**业务封装组件**。这些组件采用 CSS Modules 命名（`模块名_元素名__哈希`），反映 OMS 实际页面的真实结构与视觉规格。

### 9.1 全局文字工具类（Text Utilities）

OMS 页面高频使用以下文字样式工具类，统一文字层级：

| 类名 | 字体 | 字号 | 字重 | 颜色 | 用途 |
|------|------|------|------|------|------|
| `text_bold` | PingFangSC-Semibold | 14px | 600 | `rgba(0,0,0,.8)` | 标题/强调文字 |
| `text_regular` | PingFangSC-Regular | 12px | 400 | `rgba(0,0,0,.8)` | 常规正文 |
| `text_rBold` | — | — | 600 | 继承 | 行内加粗 |
| `text_gray` | — | — | — | `rgba(0,0,0,.4)` | 弱化/灰色文字 |
| `text_warn` | — | — | — | `#fb7701` | 警告文字（OMS 警告色） |

> **产图要点**：OMS 文字默认使用苹方（PingFang SC）字体族，正文 12px Regular，标题 14px Semibold。

### 9.2 信息提示块（Status Block）

OMS 大量使用"浅底 + 边框 + 图标"的信息提示块，配色引用 §2.9 状态色方案，分两种语义态：

**待确认态（needConfirm）：**
- 引用 §2.9 警告方案（浅橙底 + 同色边框），圆角 `6px`
- 右上角带 14×14 背景图标（warning-circle_filled 实心填充圆，见 §2.7）
- 强调文字 `#fb7701`（橙红）

**已确认态（alreadyConfirm）：**
- 引用 §2.9 成功方案（浅绿底 + 同色边框），圆角 `6px`
- 右上角带 14×14 背景图标（check-circle_filled 实心填充圆，见 §2.7）
- 强调文字 `#00bb12`（成功绿）

> **图标说明**：信息提示块右上角图标使用 Beast Core 实心填充圆形图标（`circle_filled` 形态），与 NoticeBar / Toast 图标体系一致（见 §2.7），非线框型。

### 9.3 批量操作头部（Batch Header）

批量操作页面的统一头部提示条：

- 容器 `position: sticky; top: 0; z-index: 5`，白底 `#fff`，padding `16px 0 8px`
- 提示条 padding `12px`，背景 `rgba(0,0,0,.02)`（极浅灰），圆角 `6px`，字号 14px
- 提示条内强调文字色 `#ff7300`（橙色）
- 下方说明文字色 `rgba(0,0,0,.6)`

> **数据来源说明**：本条数值来自 `2.css`/`3.css` 批量操作类模块（`batch-restock-content` 等），三份用于本轮校对的真实页面快照（停滞品生命周期、全托管开款价格管理、同款黑白名单管理）均未包含批量操作场景，故无法在本轮交叉核验中复核；后续如拿到含批量操作头部的真实页面快照，应优先复核本条数值。

### 9.4 状态标签页（Status Tab）

带数字统计的标签页切换，基于 Beast Core `Tab`（line 型）组件叠加业务样式类 `status-tab_*` 实现：

- label 本身**无独立字重覆盖**，字重继承 Tab line 组件默认值 `400`（经真实运行时 CSS 核验，`status-tab_item`/`status-tab_horizon` 相关 class 均未设置 `font-weight`，此前版本"字重 500"的表述缺乏依据，已更正；选中态因 `TAB_lineLabelActive` 变色但不加粗）。
- 数字**无独立字号覆盖**，字号继承外层 line 型 Tab 的字号 Token `--bc-Tab-lineType-fontSize`（默认解析为 `16px`），字重 `400`；与标签间距通过 `margin-left: 4px`（`status-tab_horizonNum`）控制（此前版本"数字字号12px"的表述已更正为"继承外层 Tab 字号，默认 16px"）。
- 选中项使用主题色高亮，高亮线默认 `1px`，部分页面覆盖为 `2px`（见 §5.16 说明）。

### 9.5 全宽抽屉（Full-width Drawer）

OMS 商品销售信息抽屉采用**全屏宽**布局：

| 区域 | 规格 |
|------|------|
| 抽屉体 | 宽 `calc(100vw - 32px)`，max `2488px`，min `900px`，高 `100vh` |
| 标题栏 | 高 `48px`，padding `0 16px 0 24px`，底部 1px 分割线 |
| 内容区 | padding `24px`，可滚动 |
| 底部栏 | flex，padding `12px 24px`，顶部 1px 分割线 |
| 主内容 | min-width `800px`，横向可滚动 |
| 左图区 | 宽 `228px` |
| 右侧锚点菜单 | 宽 `170px`，绝对定位 |
| 灰底块 | 背景 `rgba(0,0,0,.04)`，圆角 `6px` |

> **数据来源说明**：本条数值来自商品销售信息抽屉页面的运行时 CSS（`--bc-Drawer-*` 系列 Token），三份用于本轮校对的真实页面快照均未触发该抽屉、也不含 `--bc-Drawer-*` 变量定义，故无法在本轮交叉核验中复核；后续如拿到含全宽抽屉的真实页面快照，应优先复核本条数值。

### 9.6 商品卡片（Goods Card）

商品信息卡片：

- 卡片信息行：flex 布局，字号 12px，行高 18px，正文色 `rgba(0,0,0,.6)`，标题色 `rgba(0,0,0,.8)`
- 底部附加区：顶部 `1px dashed rgba(0,0,0,.32)` 虚线分隔，字号 12px
- 多语言属性区：左侧 `1px solid rgba(0,0,0,.08)` 分隔线，左 margin `12px`

### 9.7 模特卡（Model Card）

模特/款式信息卡片：

- 最大宽 `620px`，flex 布局，默认透明背景
- 带边框态：边框 `1px solid #dadada`，圆角 `6px`，padding `18px 16px`
- 悬停态：背景 `#fff6e6`（浅橙）
- 名称：14px，`rgba(0,0,0,.8)`，高 20px
- 信息项标签：12px，`rgba(0,0,0,.6)`，宽 `110px`

### 9.8 图片预览面板（Preview Panel）

固定宽度的图片预览面板：

- 容器宽 `350px`，边框 `1px solid #ebebeb`，圆角 `6px`
- 头部高 `40px`，字号 12px，底部 `1px solid rgba(0,0,0,.2)` 分割
- 视图区高 `505px`，纵向滚动
- 单图宽 `300px`，工具栏宽 `50px`
- 工具图标用主题色，禁用态 `#dbdbdb` + `cursor: not-allowed`

### 9.9 SKU 图片生成画布（Set SKU Image）

用于生成 SKU 规格图的离屏画布（`top: 99999px` 定位到屏外）：

- 画布 `720px × 720px`，padding `40px`
- 顶部信息区：背景 `rgba(0,0,0,.04)`，圆角 `12px`
- 标题字号 `40px`，字重 `900`，字体 SourceHanSansCN-Heavy
- 文本项字号 `24px`，字重 `600`，行高 `33px`
- 底部图片区：圆角 `12px`，每项带右下角编号标（97×56px，白字 28px）

### 9.10 操作按钮容器（Divider Block / Footer Block）

**筛选操作区（Divider Block）：**
- 白底，上下 margin `10px`，flex 换行布局
- 左侧操作块：子项间距 `8px`（经真实运行时 CSS 核验，通过 `Space` 组件或内联 `margin-right:8px` 实现，全站未检索到以 `15px` 为间距用途的规则，此前版本"15px"表述已更正）
- 按钮组：flex 换行，按钮间 `margin-right: 8px; margin-bottom: 8px`
- 右侧筛选区：`flex: 1 1 auto`，右对齐

**底部固定操作栏（Footer Block，新架构 temu-oms-newon）：**
- `position: sticky; bottom: 0; z-index: 101`，白底
- padding `12px 0 0 12px`
- 左右各 `margin: -16px`（撑满父容器内边距）
- **投影**：真实运行时观察到底部固定栏带向上投射的轻阴影 `box-shadow: rgba(0,0,0,.12) 0px -4px 24px 6px`，用于在内容滚动时区分固定层与表格内容，产图时不要遗漏（详见 §12.1 引言的阴影原则更正说明）。

**底部固定操作栏（旧架构 oms-layout 等价组件，class 前缀 `sticky-table-bottom`）：**
- 结构与新架构 Footer Block 等价，但实现方式不同：`position: sticky; bottom: 0; z-index: 101`，背景色由 CSS 变量 `--twf-bottom-background-color`（默认 `#fff`）控制
- padding 默认 `24px 0`（CSS 变量 `--twf-sticky-bottom-padding`），可被业务页面覆盖为更紧凑的值（如 `12px 0`）
- 内含独立的阴影装饰层（`shadow` / `shadow-container`），阴影值 `box-shadow: 0px -4px 12px 0px rgba(0,0,0,.12)`（同样可通过 `--twf-sticky-bottom-box-shadow` 覆盖），效果与新架构一致：向上投射的轻阴影分隔滚动内容与固定操作栏

### 9.11 加载蒙层（Loading Spin）

配色、尺寸、z-index 与基础组件 Spin 完全一致，无业务差异，直接引用 **§5.15**，不再重复列值。

### 9.12 业务组件总览

OMS 业务 CSS 共覆盖以下模块（按业务域归类）：

| 业务域 | 模块 |
|------|------|
| 商品信息 | render-product-info、render-goods-card、render-skc-info、render-qc-info、goods-info、goods-info-table、goods-manual |
| 商品生命周期 | goods-lifecycle-manage-new（全托管）、goods-lifecycle-manage-semi（半托管） |
| 批量操作 | batch-restock-content（补货）、batch-semi-offline（半下架）、cancel-select-modal、dress-reselect-modal、not-dress-reselect-modal |
| 价格管理 | activity-price-detail、compare-price-render、popover-formula-price、compete-status-tag、competitor-info-drawer |
| 图片/媒体 | video-preview、preview-tab-image、img-list、multi-guide-upload-view、set-sku-image、set-sku |
| 审核流程 | approve-info、audit-detail-drawer、newon-cofirm-render、modal-check-before-submit |
| 多语言/规格 | decoration-info、specs-main-normal-translate、lan-attr-popover、category-render |
| 通用容器 | drawer-content、divider-block、footer-block、quick-fields、status-tab、loading、model-card |

### 9.13 快筛预设条（Quick Fields）

筛选表单上方的"已保存筛选条件预设"入口条，与筛选表单本身是两个不同组件（不要与 §12.1「快速筛选/状态胶囊组」里的 Tab capsule 混淆）：

- 容器：背景 `#f7f7f7`，padding `8px 24px 8px 8px`，圆角 `6px 6px 0 0`，flex 布局、两端对齐（`justify-content: space-between`）
- 左侧："快速筛选" label（字号 12px，颜色 `rgba(0,0,0,.8)`，宽度 `104px` 右对齐，与筛选表单 label 宽度对齐保持视觉统一）+ 一组 `gray`/`small` 按钮（用户保存的筛选预设名称，如"华东仓""生产环境"等，按钮间距 `8px`）
- 右侧：两个 `textPrimary`/`small` 文字链接，固定文案"保存为快筛"「快筛管理」

### 9.14 快捷统计卡片（Quick Field Card）

位于页面最上方（业务 Tab 之下、筛选表单之上）的可点击统计卡片区，用于展示分类计数并联动触发筛选条件（如"卖家确认超时"场景下的"即将超期/已超期/超期作废"）：

- 容器：最小高 `72px`，背景 `#f7f7f7`，padding `16px 8px`，圆角 `6px 6px 0 0`，底部分隔线 `1px solid rgba(0,0,0,.08)`，flex 换行布局；容器内首个子元素通常是一段说明性文字标签（12px，`rgba(0,0,0,.8)`）
- 卡片：固定尺寸 `192×40px`（`min-width`/`max-width` 均锁定 `192px` 不换行），圆角 `6px`，边框 `1px solid rgba(0,0,0,.14)`，白底，文字 12px `rgba(0,0,0,.8)` 居中，`cursor: pointer`，卡片间距 `margin-left: 8px`
- 点击后通常联动筛选表单，自动带入对应筛选条件并刷新表格

### 9.15 表格图文辅助元素（Table Media Badges）

表格单元格内嵌图片/筛选表单场景中反复出现的两个小型辅助元素，规格独立于所属的父组件（Table / 筛选表单）：

**图片总数角标**（用于表格缩略图，标注该行关联的图片张数）：
- 图片容器 `position: relative`，`cursor: pointer`
- 角标绝对定位于图片底部、宽度撑满图片，背景 `rgba(0,0,0,.34)`，文字白色 12px 居中，如"共3张"

**筛选区"展开/收起"计数徽标**（配合 §12.1②筛选条件区的展开按钮使用）：
- 徽标：`20×20px` 圆形，蓝底（`themeColor`）白字，字号 12px，居中显示折叠隐藏的筛选项数量
- 文案："展开"/"收起" 12px 文字 + 线型下箭头图标（`beast-core-icon-down`，收起时旋转 180°，见 §2.8）
- 徽标与文案、图标之间无额外容器，整体 `margin-left: 12px` 与筛选表单主体分隔

---

## 十、OMS 布局适配（Layout Override）

> 以下规范源自 `4.css`，是 OMS 后台对**框架级布局**的覆盖适配，确保新业务页面铺满展示区域。

### 10.1 OMS 业务根容器

`.temu-oms-newon` 是 OMS 新版业务的根容器类：
- 背景白色（`background: white`）
- 配置滚动/粘性内边距变量：`--twf-scroll-bottom-padding: 16px 0`、`--twf-sticky-bottom-padding: 16px 0`

### 10.2 框架内边距清除

OMS 业务需要铺满，因此清除了外层 metro-layout 框架的默认内边距：

```css
/* 清除 metro-layout 内容区内边距 */
#metro-layout-content:has(.temu-oms-newon) { padding: 0 !important; }

/* 清除 header 最小宽度限制，适配窄屏 */
#root:has(.temu-oms-newon) .metro-layout.metro-dark .metro-header { min-width: 0 !important; }

/* 清除侧栏布局最小宽度限制 */
#root:has(.temu-oms-newon) .rocket-layout-has-sider { min-width: 0 !important; }
```

### 10.3 OMS 暗色布局适配

针对 `oms-layout.oms-dark` 暗色布局的适配：
- 内容区内边距清零：`padding: 0px !important`
- 隐藏页脚：`.oms-footer { display: none !important; }`

### 10.4 全局兜底样式

| 类名 | 样式 | 用途 |
|------|------|------|
| `loading-page_landingPage` | padding-top 10px，居中 | 落地页加载态 |
| `no-available_not_fond_wrapper` | flex 纵向，居中，margin-top 100px | 无数据占位 |
| `no-available_not_fond_title` | `#000`，16px | 无数据标题 |
| `no-available_not_fond_desc` | `#999`，12px | 无数据描述 |
| `no-available_no_permission_tip` | 红色，16px，首行缩进 2em | 无权限提示 |
| `no-available_badWarehouseTip` | 红色，18px，padding 14px | 异常仓库提示 |
| `monospace-font` | 字体 Heiti SC, Microsoft Yahei | 等宽字体兜底 |

---

## 十一、AI 产图指引（Prompt 模板）

> 当需要让 AI 依据本规范生成 OMS 中后台界面图时，可套用以下指令结构。模板内引用本规范各章定义，不重复抄录色值，使用时**直接复制本模板并填充【具体需求】即可**。

```
请基于 Beast Core + OMS 后台设计规范生成 [页面/组件] 高保真设计稿，必须遵守以下规范：

【色彩 —— 详见 §2.1~2.4】
- 主题蓝 #0071f3（hover #0058cc / active #0042a6 / 浅底 #e6f6ff）
- 危险红 #f71010（hover #d10209 / active #ab000b）
- 成功绿 #00bb12，警告橙 #fb7701
- 文字黑：主 rgba(0,0,0,.8)、次 .6、弱 .4、placeholder .32，禁用 .24
- 背景 #fff，禁用底 #f5f5f5，边框 #dbdbdb，hover边框 #0058cc（主题蓝），分割线 #ebebeb
- 链接色 = 主题色 #0071f3

【状态提示块三件套 —— 详见 §2.7、§2.9】
- 图标统一使用 Beast Core 实心填充圆形图标（circle_filled 形态，外圈实心填色+内部白色符号），禁止用线框图标
- 信息：色 #0071f3 / 浅底 #e6f6ff / 边框 #a3daff
- 警告：色 #fb7701 / 浅底 #fff6e6 / 边框 #ffdaa3
- 错误：色 #f71010 / 浅底 #ffeae6 / 边框 #ffbdb3
- 成功：色 #00bb12 / 浅底 #e3fae1 / 边框 #9bed98
- 图标 viewBox 0 0 1024 1024，fill=currentColor 继承语义色

【尺寸 —— 详见 §4.1~4.3】
- 控件三档：small 24px / medium 28px / large 40px，默认 medium
- 字号 12/14/16px，正文 12px，按钮 medium 14px
- 圆角：全局 6px，Toast 3px，卡片 0px（直角），SKU画布 12px
- 间距以 4px 栅格，常用 8/12/16/24；按钮组内按钮间距 10px（ghost 按钮标准 margin）
- 字体：苹方 PingFang SC（正文 Regular 12px，标题 Semibold 14px）

【OMS 业务组件 —— 详见 §9《OMS 业务专属版》；若目标页面非 OMS 商品管理类业务页，可跳过本段】
- 批量操作头部：sticky置顶，白底，提示条浅灰底 rgba(0,0,0,.02) 圆角6px，强调文字 #ff7300
- 全宽抽屉：宽 calc(100vw-32px)，标题栏48px，内容padding 24px，底部栏sticky
- 商品卡片：信息行12px/18px行高，底部虚线分隔 1px dashed rgba(0,0,0,.32)
- 底部操作栏：sticky置底 z-index 101，白底，左右margin -16px撑满
- 加载蒙层：半透明浅灰 rgba(238,238,238,.4)，居中spin，z-index 999

【表格 —— 详见 §5.10】
- 表头背景 #f5f5f5，文字 rgba(0,0,0,.8)，字重 500，行高 18px
- 信息密度高，支持选择/排序/筛选
- 行 hover 浅蓝底 #e6f9ff（Table 专属 Token，非 themeColor1 的 #e6f6ff），选中行同色

【组件交互 —— 必须遵守，详见 §5 各组件】
- 分页：翻页用线型 V 形左右箭头（beast-core-icon-left/right，非实心三角），跳页用 « » 符号，禁止用「上一页/下一页」文字；选中页码蓝底白字
- 下拉选择：自定义控件（非原生 select），右侧线型 V 形下拉箭头（beast-core-icon-down，非实心三角）展开旋转 180°，面板 #e8e8e8 边框 + 阴影，选项 hover 浅蓝底、选中加粗变蓝
- 日期选择：自定义控件（非原生 date input），左侧日历图标，RangePicker 双输入框 + ~ 分隔符共用边框
- 复选框/单选：原生 input 隐藏，自定义视觉层；Checkbox 14×14 方框圆角 2px 选中蓝底白勾，Radio 14×14 圆圈选中蓝色实心点
- 输入框 focus：边框变 #0071f3 + 外发光 0 0 0 2px #eef7ff
- 提示消息：NoticeBar/Toast 用四态三件套（实心填充圆图标+浅底+同色边框），Toast 距顶 56px 圆角 3px 自动消失
- 所有过渡动效用 easeInOutCirc 缓动（§8）

【风格 —— 详见 §1.1~1.2】
- 克制、高效、灰阶为主、亮蓝点睛，白底浅灰分割
- 信息层级用黑色透明度梯度而非彩色区分
- 业务页面铺满框架（无额外内边距），底部操作栏常驻

【具体需求】
[在此描述要生成的页面内容、布局、包含的组件]
```

## 十二、 页面布局规范（Page Layout Systems）

### 12.1 管理列表页布局标准 (Query & Table Page Layout)

OMS 标准管理列表页采用 **"白底画布 + 模块化无界平铺"** 的纵向多层结构。绝大部分区块不依赖阴影，主要依靠容器背景底色与轻量级分割线进行逻辑留白与层级区分；仅**底部固定操作栏/分页栏（sticky footer）**在与可滚动表格内容分离时使用轻投影强化层次（见下文 §5「数据表格与分页区」及 §9.10）。

> **勘误说明（重要）**：此前版本认为 OMS 业务内容区背景为浅灰画布 `#f0f2f5`，经与三个真实线上页面（停滞品生命周期、全托管开款价格管理、同款黑白名单管理）运行时 CSS 交叉核验，`#f0f2f5` 实际只出现在应用最外层 shell 容器 `.rocket-layout` 及其 `.rocket-layout-footer` 上（且业务内容铺满时几乎不可见），三个页面各自的业务根容器（如 `goods-lifecycle-manage-new_container`、`page-container_pageContainer`、`black-white-list_container`）以及中间层容器 `.oms-content-main` 实测背景色均为**纯白 `#fff`**，与 §10.1「`.temu-oms-newon` 背景白色」的记录完全一致。以下已按 `#fff` 更正。

---

#### 1. 结构骨架与背景层级 (Skeleton & Background Elevation)

* **全局底色 (Body Background)**：`#ffffff` (`rgb(255, 255, 255)`)
* **主画布/内容区背景色 (Content Canvas Background)**：**`#ffffff`**（业务内容区与全局底色一致；`#f0f2f5` 仅为应用最外层 shell 背景，不作为业务页面产图色值）
* **区块容器形态**：筛选区与表格区采用无圆角（`border-radius: 0px`）、无额外边框（`border: none`）的沉浸式无界流式排布，整体紧凑高效。

---

#### 2. 纵向卡槽架构与详细规格 (Layout Architecture)

> **架构差异提醒**：OMS 后台实际存在**新架构**（根容器 `.temu-oms-newon`，组件全部基于 Beast Core）与**旧架构**（根容器 `.oms-layout.oms-dark`/`.rocket-layout`，部分顶层组件沿用 Ant Design 风格的 Rocket UI）两条技术路线，二者在"顶部 Tab"层的实现上有明显差异（见下方①）。下表给出的是**最大兼容模型**，具体页面不一定同时出现全部卡槽，也可能出现多层 Tab/Radio 叠加（见①末尾说明），产图前应先判断目标页面属于哪种架构、有哪些实际卡槽。

+-----------------------------------------------------------------------+
| 0. 顶部一级业务 Tabs (Top Business Tabs · 选填，视架构而定)             |
|    - [全托管] [半托管] [本本] [高分品牌]  (高度: 40px, 带有下划线指示条)   |
+-----------------------------------------------------------------------+
| 1. 快速筛选/状态胶囊组 (Status Capsule Filter Bar - 选填)               |
|    - [默认筛选] [精准查询]  /  [待处理(2050)] [待审核(329)]               |
+-----------------------------------------------------------------------+
| 1.5 快筛预设条 (Quick Fields · 选填，详见 §9.13)                       |
|    - "快速筛选" + [已保存预设按钮组]  ... [保存为快筛] [快筛管理]         |
+-----------------------------------------------------------------------+
| 2. 筛选条件区 (Search Block)                                          |
|    - Label 规范: 宽度响应式，1920px 视口下为 104px (右对齐) | 间距: 16px  |
|    - 控件规格: 高度 28px (Medium)                                      |
|    - 按钮组合: [查询 (Primary)] [重置] + 右侧快捷超链接/快照保存            |
+-----------------------------------------------------------------------+
| 3. 业务提示通知条 (Alert Notice Bar - 选填)                            |
|    - 引用 §2.9 Info 三件套: 底#e6f6ff/边#a3daff + 实心填充圆图标(§2.7)   |
+-----------------------------------------------------------------------+
| 4. 批量操作与工具栏 (Action Bar Block)                                |
|    - 左侧: [锁定] [解绑] [批量操作] [导入同步申诉]                       |
|    - 右侧: [一键复制所选 ID] [查询申诉记录]                             |
+-----------------------------------------------------------------------+
| 5. 数据表格与分页区 (Table & Pagination Region)                       |
|    - 表头: 背景 #f5f5f5 | 高度: 36px~40px | Cell Padding: 9px 12px    |
|    - 行高: 随内容扩展 (支持展示商品图文/SKU 标签)                       |
|    - 分页器: 高度 28px, 右对齐 (justify-content: flex-end), Margin 0px  |
+-----------------------------------------------------------------------+

---

#### 3. 各区块细化规范 (Block Detail Specifications)

##### ① 顶部业务 Tabs (Top Business Tabs)
* **定位与作用**：用于大类目或业务模式切换（如全托管/半托管）。
* **实现组件因架构而异，经真实页面核验存在三种真实形态，不要假设只有一种**：
  1. **旧架构 + Rocket UI（rocket-tabs）**：如全托管开款价格管理页，标签为完整业务名（"全托管开款价格管理"/"半托管开款价格管理"等），非 Beast Core 组件，视觉上是 Ant Design 风格的线性 Tab + 下划线动画。
  2. **旧架构 + Beast Core Tab（`TAB_` line 组件）**：如同款黑白名单管理页，标签为简短模式名（"全托管/半托管/本本/高分品牌"，注意真实文案是"本本"而非"本地"），下方紧跟一层 Beast Core Tab capsule 组件做"默认筛选/精准查询"二态切换（注意真实文案是"精准查询"而非"精细查询"）。
  3. **新架构（temu-oms-newon）**：往往**没有独立的业务模式 Tab 层**，顶部唯一的 Tab 行本身就是带数字统计的「状态 Tab」（如停滞品生命周期页"全部(17003)/选品中(4032)/…"，详见 §9.4），即卡槽 0 与卡槽 1 合二为一。
* **渲染规范**：顶部固定 `40px` 高度，选中 Tab 底部配有主色下划线，下方通过 `1px solid #ebebeb`（`divideColor`，见 §2.4，此前版本误写为 `#e8e8e8`）浅灰色线与主内容区分隔。下划线高度默认 `1px`，部分页面（尤其状态 Tab）会显式覆盖为 `2px` 强化视觉突出，详见 §5.16 说明，不要假设 `2px` 是恒定默认值；字重继承 Tab 组件默认 `400`，无独立加粗（详见 §9.4）。
* **多层叠加**：真实页面可能在业务模式 Tab 之下，进一步叠加"二级维度 Tab（TAB_line）+ Switch 开关"、"状态统计 Tab（TAB_card）+ 视角切换 RadioGroup（button-tab 形态）"等 2~4 层纵向堆叠的 Tab/Radio 组合（如全托管开款价格管理页同时出现"我的核价单/全部核价单/…"二级 Tab、"新版本实时同款" Switch、"待核价(5407)/待卖家确认(11)/…" 状态卡片 Tab、"核价单视角/其他视角" 按钮式 RadioGroup 四层），产图时不要局限于"0+1"两卡槽模型。

##### ② 筛选条件区 (Search Block)
* **Label 文本与对齐**：
  * **宽度 (Width)**：**响应式**，随视口宽度自适应（与 §4.3 的固定表单 `144px` 不同场景、不同规则，二者不冲突）；**`1920px` 视口下参考值为 `104px`**，其他分辨率请按实际视口比例换算，不要固定套用某一个像素值。
  * **文本对齐 (Text Align)**：**`right`**（右对齐）。
  * **与控件间距 (Margin-Right)**：固定 **`16px`**。
* **输入控件 (Form Items)**：统一采用 **`28px`** 高度（Medium 规格），每行项数由字段自身宽度需求决定（Beast Core Grid `span15`/`span30`/`span45` 分别对应 `25%`/`50%`/`75%` 列宽），常见为每行 2~4 个不等，并非固定"3~4个"，超出部分通过右下角"展开/收起"控制。
* **展开/收起按钮**：由 `20×20px` 圆形蓝底白字计数徽标（显示折叠隐藏的筛选项数量）+ `12px` "展开"/"收起" 文字 + 线型下箭头图标（收起态旋转180°）组成，整体 `margin-left: 12px`，详见 §9.15。
* **操作按钮聚类 (Action Cluster)**：包含主按钮 `[查询]`（Primary 蓝底）、次按钮 `[重置]`（白底灰框），右侧可紧跟 `[保存快照]`、`[快捷管理]` 等 Link 样式文字。

##### ③ 业务提示条 (Alert Notice Bar)
* **渲染条件**：当存在列表检索限制、规则说明或异步导出提示时展示。
* **样式规则**：配色直接引用 **§2.9 Info 三件套**（浅底 `#e6f6ff` + 边框 `#a3daff`），左侧图标为 **§2.7 实心填充圆信息图标**（`beast-core-icon-info-circle_filled`，禁止用线框图标或 emoji），内边距为 `8px 16px`，位于操作栏与表格之间。

##### ④ 批量操作与工具栏 (Action Bar)
* **排列格式**：位于筛选区下方、数据表格上方。与上/下区块保持 **`10px` ~ `16px`** 的外间距（Margin）。
* **对齐逻辑**：
  * **左侧**：强业务操作按钮组（如"新增"、"批量导出"、"锁定"），按钮间距 `10px`。
  * **右侧**：辅助功能/数据记录入口（如"查询申诉记录"、"一键复制"），通常采用 Link 样式或次级按钮。**实现细节**：部分入口（如"一键复制所选ID"）在真实页面中并非标准 `Button`/`Link`，而是用禁用态 `Select` 组件（`ST_headDisabled` + 只读 `input`，`value` 直接写入文案）伪装的静态展示框，产图/还原时如套用标准 Button 视觉会有细微边框/圆角差异，建议按需向研发确认具体控件类型。

##### ⑤ 数据表格与分页区 (Table & Pagination)
* **表头 (Table Header)**：
  * **背景色 (Background)**：`#f5f5f5` (`rgb(245, 245, 245)`)。
  * **容器高度 (Height)**：`36px` ~ `40px`（测量标称值 `37px` / `39px`）。
  * **单元格内边距 (Cell Padding)**：**`9px 12px`**（上下 9px，左右 12px）。
  * **字体样式**：`12px`，字重 `500`，字色 `#333333`。
* **表格行 (Table Body Row)**：
  * **背景色**：默认 `#ffffff`，**Hover 高亮态 `#e6f9ff`**（浅蓝底，专属 Token `--bc-Table-trHoverBgColor`，**不等于** themeColor1 `#e6f6ff`，此前版本误写，详见 §5.10 说明）。
  * **高度**：自适应扩展，以兼容多行图文、 Goods/SKU ID 标签、状态 Badge 等复杂单元格；表格内嵌缩略图可能带"共N张"图片总数角标，详见 §9.15。
* **分页器 (Pagination)**：
  * **高度**：**`28px`**（Medium 规格）。
  * **对齐方式**：`justify-content: flex-end`（靠右对齐）。
  * **外边距 (Margin-Top)**：默认与表格紧贴（Margin-Top 为 `0px`），保持整体感。
* **底部固定栏投影**：当分页/操作栏以 `position: sticky` 固定在可视区域底部时，真实页面均带有向上投射的轻阴影 `box-shadow: 0px -4px 12~24px 0~6px rgba(0,0,0,.12)`（新架构 Footer Block 实测 `0px -4px 24px 6px`，旧架构 `sticky-table-bottom` 实测 `0px -4px 12px 0px`），用于区分滚动表格内容与固定层，详见 §9.10。

---

## 附录：Design Token 速查表

> 本附录为所有 Token 的**完整速查源**，含色彩、尺寸、字号、圆角、z-index（§6）、动效、SVG 资源。OMS 细节 Token（原 §7.5）已合并入下表 A。

### A. 色彩（含 OMS 细节 Token）
```css
/* —— 主题色板 —— */
--bc-themeColor: #0071f3;       /* 主品牌色（亮蓝） */
--bc-themeColor1: #e6f6ff;      /* 最浅，选中/悬停底 */
--bc-themeColor2: #a3daff;
--bc-themeColor3: #7ac6ff;
--bc-themeColor4: #52aeff;      /* Slider 轨道填充 */
--bc-themeColor5: #2994ff;
--bc-themeColor6: #0071f3;      /* 基准色 */
--bc-themeColor7: #0058cc;      /* hover */
--bc-themeColor8: #0042a6;      /* active */
--bc-themeColor9: #002f80;
--bc-themeColor10: #001e59;     /* 最深蓝 */

/* —— 语义色 —— */
--bc-dangerColor-color: #f71010;
--bc-dangerColor-hoverColor: #d10209;
--bc-dangerColor-activeColor: #ab000b;
--bc-successColor: #00bb12;
--bc-warnColor: #fb7701;        /* 警告橙红 */
--bc-linkColor-color: #0071f3;  /* 链接色 = 主题色 */
--bc-linkColor-hoverColor: #0058cc;
--bc-linkColor-activeColor: #0042a6;
--bc-linkColor-disabledColor: #c2c2c2;
--bc-hoverBorderColor: #0058cc; /* hover边框用主题蓝 */

/* —— 背景与边框 —— */
--bc-bgColor: #fff;
--bc-disabledBgColor: #f5f5f5;
--bc-activeDisabledBgColor: #c2c2c2;
--bc-borderColor: #dbdbdb;
--bc-divideColor: #ebebeb;
--bc-trackColor: #f0f0f0;
--bc-boxShadowColor: #eef7ff;

/* —— 文字色 —— */
--bc-primaryTextColor: rgba(0,0,0,.8);
--bc-secondaryTextColor: rgba(0,0,0,.6);
--bc-thirdlyTextColor: rgba(0,0,0,.4);
--bc-hintTextColor: rgba(0,0,0,.32);
--bc-disabledTextColor: rgba(0,0,0,.24);
--bc-placeholderColor: rgba(0,0,0,.32);

/* —— 图标色 —— */
--bc-icon-color: rgba(0,0,0,.4);
--bc-icon-hoverColor: rgba(0,0,0,.8);

/* —— 表格 —— */
--bc-Table-theadColor: rgba(0,0,0,.8);
--bc-Table-theadBgColor: #f5f5f5;
--bc-Table-theadLineHeight: 18px;
--bc-Table-thFontWeight: 500;

/* —— 状态提示块三件套 —— */
/* 成功 */ --bc-Toast-success-iconColor: #00bb12;
          --bc-Toast-success-background: #e3fae1;
          --bc-Toast-success-border: 1px solid #9bed98;
/* 警告 */ --bc-Toast-warn-iconColor: #fb7701;
          --bc-Toast-warn-background: #fff6e6;
          --bc-Toast-warn-border: 1px solid #ffdaa3;
/* 信息 */ --bc-NoticeBar-infoIconColor: #0071f3;
          --bc-NoticeBar-infoWrapperBgColor: #e6f6ff;
          --bc-NoticeBar-infoWrapperBorder: 1px solid #a3daff;

/* —— OMS 细节 Token（原 §7.5 合并至此） —— */
--bc-Breadcrumb-clickColor: #0042a6;               /* 面包屑点击色 */
--bc-Button-text-hoverBorderColor: #0058cc;        /* 文字按钮 hover 边框 */
--bc-Button-text-activeBorderColor: #0042a6;       /* 文字按钮 active 边框 */
--bc-Checkbox-buttonGhostTagMode-hoverBorderColor: #0058cc; /* 幽灵标签复选 hover 边框 */
--bc-Radio-radioButtonMode-hoverBorderColor: #0058cc;      /* 按钮单选 hover 边框 */
--bc-Radio-buttonGhostTagMode-hoverBorderColor: #0058cc;   /* 幽灵标签单选 hover 边框 */
--bc-Radio-circleColors-hoverColor: #0058cc;      /* 圆形单选 hover 色 */
--bc-Radio-circleColors-disabledColor: #dbdbdb;   /* 圆形单选禁用色 */
--bc-Radio-groupDisabled-disabledBorderColor: #dbdbdb; /* 单选组禁用边框 */
--bc-Slider-track-bgColor: #52aeff;               /* 滑块轨道填充色 */
--bc-Pagination-hoverBorderColor: #0058cc;        /* 分页 hover 边框 */
--bc-Pagination-hoverColor: #0058cc;              /* 分页 hover 文字色 */
--bc-Badge-count-bgColor: #ff1818;                /* 徽标红底色 */
--bc-Progress-exception-color: #ff1818;           /* 进度条异常色 */
--bc-Progress-exception-bgColor: #ff1818;         /* 进度条异常背景色 */
--bc-Toast-borderRadius: 3px;                     /* Toast 圆角（保持小圆角） */
--bc-Toast-success-boxShadow: 0px 2px 8px 0px rgba(0,33,8,.12);   /* 成功 Toast 阴影 */
--bc-Toast-warn-boxShadow: 0px 2px 8px 0px rgba(97,66,0,.12);     /* 警告 Toast 阴影 */
--bc-Toast-error-boxShadow: 0px 2px 8px 0px rgba(94,0,13,.12);    /* 错误 Toast 阴影 */
--bc-NoticeBar-outerWrapperBorderRadius: 3px;     /* 通知栏圆角 */
```

### B. 尺寸 / 字号 / 圆角 / 动效
```css
--bc-height-large: 40px;
--bc-height-medium: 28px;
--bc-height-small: 24px;
--bc-fontSize-large: 16px;
--bc-fontSize-medium: 12px;
--bc-fontSize-small: 12px;
--bc-borderRadius: 6px;         /* 全局基础圆角 */
--bc-Toast-borderRadius: 3px;   /* Toast 保持小圆角 */
--bc-easeInOutCirc: cubic-bezier(0.78, 0.14, 0.15, 0.86);
```

### C. z-index

> z-index 完整定义见 **§6** 表格。对应 CSS 变量名速查：

```css
--bc-zIndex-backTop: 10;
--bc-zIndex-tableFixed: 100;
--bc-zIndex-selectDropdown: 101;
--bc-zIndex-spin: 999;
--bc-zIndex-preview: 999;
--bc-zIndex-modal: 1000;
--bc-zIndex-modalMask: 1000;
--bc-zIndex-toast: 1010;
--bc-zIndex-notification: 1010;
--bc-zIndex-popover: 1030;
--bc-zIndex-portal: 1030;
--bc-zIndex-dropdown: 1050;
--bc-zIndex-tooltip: 1060;
```

### D. 状态提示图标资源索引（实心填充圆形 circle_filled）

> 完整 SVG `path` 源码已抽取至独立附录文件 **《Beast-Core-设计规范-SVG图标附录.md》§D**，仅在需要 AI 直接输出纯文本 HTML/SVG 时注入。本表仅保留 `icon_name` + 视觉特征 + 语义填充色，供规范引用。

| 语义 | icon_name（data-testid） | 视觉特征 | 语义填充色（fill） | 应用组件 |
|------|------|------|------|------|
| 信息 Info | `beast-core-icon-info-circle_filled` | 实心圆 + 白色 `i` 字形 | `#0071f3` | NoticeBar 信息、Popover |
| 警告 Warn | `beast-core-icon-warning-circle_filled` | 实心圆 + 白色感叹号 | `#fb7701` | Toast 警告、NoticeBar 警告、待确认提示块 |
| 错误 Error | `beast-core-icon-close-circle_filled` | 实心圆 + 白色 `×` 叉号 | `#f71010` | Toast 错误、NoticeBar 错误 |
| 成功 Success | `beast-core-icon-check-circle_filled` | 实心圆 + 白色对勾 | `#00bb12` | Toast 成功、已确认提示块 |

> 所有图标 `viewBox="0 0 1024 1024"`，`fill="currentColor"` 继承语义色。配色三件套详见 §2.7、§2.9。

### E. 线型箭头图标资源索引

> 完整 SVG `path` 源码见独立附录文件 **《Beast-Core-设计规范-SVG图标附录.md》§E**。下箭头展开时 `transform: rotate(180deg)` 翻转。

| 方向 | icon_name（data-testid） | 视觉特征 | 颜色（fill） | 应用组件 |
|------|------|------|------|------|
| 下 Down | `beast-core-icon-down` | 线型 V 形（两条粗线段） | `rgba(0,0,0,.4)` | Select 下拉箭头、Collapse 折叠箭头 |
| 左 Left | `beast-core-icon-left` | 线型 V 形（两条粗线段） | `rgba(0,0,0,.6)` | Pagination 上一页 |
| 右 Right | `beast-core-icon-right` | 线型 V 形（两条粗线段） | `rgba(0,0,0,.6)` | Pagination 下一页 |

> 所有图标 `viewBox="0 0 1024 1024"`，`fill="currentColor"`。详见 §2.8。

### F. 勾选图标资源索引

> 完整 SVG `path` 源码见独立附录文件 **《Beast-Core-设计规范-SVG图标附录.md》§F**。Card 选中态中通过 `fill=#fff` 白色显示，叠在蓝色三角形容器内（见 §5.9）。

| icon_name（data-testid） | 视觉特征 | Card 选中态颜色 | 应用组件 |
|------|------|------|------|
| `beast-core-icon-check` | 线型对勾 | `#fff`（白色） | Card 选中态右上角勾选三角标 |

> `viewBox="0 0 1024 1024"`，`fill="currentColor"`。


---

*文档生成依据：OMS 后台 F12 运行时 CSS 提取（1.css~4.css，2026-07-30），辅以 Beast Core v5.191.0 官方文档站组件结构参考。所有色值、圆角、字号均为 OMS 实际生效的真实 Token，可直接用于设计还原与 AI 产图。*
