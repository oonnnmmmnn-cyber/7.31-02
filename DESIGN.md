# Beast Core × OMS — Design System

> Open Design 专用精简版。权威完整源：`Beast-Core-设计规范-完整合并版.md`（1091 行）。
> 本文件约 220 行，覆盖 Open Design 九维结构，供 Agent 产图/原型时自动套用。
> 组件库：Beast Core v5.191.0 · 主题：OMS 运行时（`#0071f3` / 圆角 6px）

---

## Brand 品牌

- **产品**：Beast Core 企业级中后台组件库，典型场景为 OMS 商品/运营后台
- **气质**：克制、高效、信息密度高、灰阶为主、亮蓝点睛
- **视觉基调**：白底 + 浅灰分割 + 黑透明度文字层级 + 单一主题蓝 + 语义状态色
- **禁止**：多主题色混用、纯黑 `#000` 正文、实心三角箭头、原生 `<select>` / `<input type="date">` 外观

---

## Color 色彩

### 主题色（Brand Blue）
| 角色 | 色值 |
|------|------|
| 主色 default | `#0071f3` |
| hover | `#0058cc` |
| active / pressed | `#0042a6` |
| 浅底 / 选中背景 | `#e6f6ff` |
| focus 外发光 | `#eef7ff`（`box-shadow: 0 0 0 2px`） |

### 语义色
| 语义 | 默认 | hover | active |
|------|------|-------|--------|
| Danger | `#f71010` | `#d10209` | `#ab000b` |
| Success | `#00bb12` | — | — |
| Warning | `#fb7701` | — | — |
| Info | `#0071f3` | — | — |

### 状态提示三件套（Toast / NoticeBar / 信息块）
| 语义 | 图标色 | 浅底 | 边框 |
|------|--------|------|------|
| Success | `#00bb12` | `#e3fae1` | `#9bed98` |
| Warning | `#fb7701` | `#fff6e6` | `#ffdaa3` |
| Error | `#f71010` | `#ffeae6` | `#ffbdb3` |
| Info | `#0071f3` | `#e6f6ff` | `#a3daff` |

> Tag 组件 success 例外：`#00b359` / `#e8fbe5` / `#00b359`（与 §2.9 不同，以 Tag 为准）

### 文字（黑透明度梯度，不用纯黑）
| 层级 | 色值 | 用途 |
|------|------|------|
| 主要 | `rgba(0,0,0,.8)` | 标题、正文 |
| 次要 | `rgba(0,0,0,.6)` | 辅助说明 |
| 三级 | `rgba(0,0,0,.4)` | 图标、弱化 |
| 提示 | `rgba(0,0,0,.32)` | placeholder |
| 禁用 | `rgba(0,0,0,.24)` | 不可用文字 |

### 背景 / 边框 / 分割
| Token | 色值 |
|-------|------|
| 页面/卡片背景 | `#fff` |
| 禁用背景 | `#f5f5f5` |
| 默认边框 | `#dbdbdb` |
| hover 边框 | `#0058cc` |
| 分割线 | `#ebebeb` |
| 表头背景 | `#f5f5f5` |
| 表格行 hover | `#e6f9ff`（≠ `#e6f6ff`） |
| 斑马纹偶数行 | `#fafafa` |

### 链接
`#0071f3` → hover `#0058cc` → active `#0042a6` → disabled `#c2c2c2`

---

## Typography 字体

- **字体族**：PingFang SC（苹方），等宽兜底 Heiti SC / Microsoft Yahei
- **字号阶梯**：12px（正文/辅助）· 14px（控件 medium / 小标题）· 16px（大控件 / Modal 标题 / line Tab）
- **行高**：通用 `1.5`；表单内容 `24px`；Modal 正文 `20px`
- **字重**：正文 `400` · 按钮 primary/danger `500` · 表头/列表选中 `500`~`600`
- **OMS 工具类**：`text_bold` 14px/600 · `text_regular` 12px/400 · `text_gray` 0.4 黑 · `text_warn` `#fb7701`

---

## Spacing 间距

- **基础栅格**：4px
- **常用间距**：4 / 8 / 12 / 16 / 20 / 24
- **控件高度**：small `24px` · medium `28px`（默认）· large `40px`
- **按钮内边距**：`0 12px`(s/m) · `0 16px`(l)；图标与文字间距 4px(s/m) / 8px(l)
- **按钮组间距**：ghost 组内 `10px`；Modal footer 按钮 `13px`
- **卡片内边距**：12px · Modal body `24px 24px 20px` · 表单元间距 16px
- **表单 label**：Modal/Drawer 固定 `144px`；列表页筛选 label 响应式（1920px 视口约 `104px`，右对齐，与控件间距 16px）

---

## Layout 布局

### OMS 管理列表页（纵向卡槽，白底无界平铺）
```
[0] 顶部业务 Tab（选填，高 40px，底部分割线 #ebebeb）
[1] 状态胶囊 / 统计 Tab（选填）
[1.5] 快筛预设条（选填，底 #f7f7f7）
[2] 筛选区（控件 28px，查询 Primary + 重置）
[3] 业务提示 NoticeBar（选填）
[4] 批量操作栏（左操作 / 右辅助链接）
[5] 表格 + 分页（分页 28px 右对齐）
[sticky] 底部操作栏（z-index 101，向上轻阴影）
```

- **主画布背景**：`#fff`（非 `#f0f2f5`，后者仅外层 shell）
- **区块形态**：筛选区与表格区无圆角、无边框，沉浸式流式排布
- **全宽抽屉**：宽 `calc(100vw - 32px)`，标题栏 48px，内容 padding 24px
- **Grid gutter**：常用 16px

---

## Components 组件

### Button
| type | 背景 | 文字 | 边框 |
|------|------|------|------|
| primary | `#0071f3` | `#fff` | 同色 |
| secondary | `#fff` | `#0071f3` | `#0071f3` |
| gray | `#fff` | `rgba(0,0,0,.8)` | `#adadad` |
| danger | `#f71010` | `#fff` | 同色 |
| textPrimary | 透明 | `#0071f3` | 无 |

- hover/active：实心改填充色；描边型仅改边框+文字色
- disabled：背景 `#f5f5f5`，边框 `#dbdbdb`，文字 `rgba(0,0,0,.32)`

### Input / Select / DatePicker
- 白底，`#dbdbdb` 边框，hover 边框 `#0058cc`
- focus：边框 `#0071f3` + 外发光 `0 0 0 2px #eef7ff`
- error：边框 `#f71010`
- Select/DatePicker：**自定义控件**，非原生；下拉箭头为**线型 V 形**（`beast-core-icon-down`），展开旋转 180°
- Select 面板：白底，`#e8e8e8` 边框，阴影 `0 2px 8px rgba(0,0,0,.15)`，选项 hover `#e6f6ff`

### Checkbox / Radio
- 原生 input 隐藏，自定义视觉层
- Checkbox：`14×14` 方框圆角 2px，选中蓝底白勾
- Radio：`14×14` 圆，选中 `8×8` 蓝实心点

### Table
- 表头：`#f5f5f5`，12px/500，行高 18px，cell padding `9px 12px`
- 行 hover / 选中：`#e6f9ff`
- 固定表头 z-index `3`，冻结列 z-index `2`

### Modal
- 圆角 6px，遮罩 `rgba(0,0,0,.4)`，z-index 1000
- 标题 16px，正文 12px，footer 按钮右对齐间距 13px

### Toast / NoticeBar
- Toast：距顶 56px，圆角 3px，padding `10px 16px`，z-index 1010
- 图标：**实心填充圆**（`circle_filled`），非线框；14~16px
- NoticeBar：圆角 3px，padding `6px 8px`

### Tab
- line 型：16px，底部分割线 `#ebebeb`，高亮线默认 1px（部分页面 2px）
- capsule 型：直角，12px 字号

### Pagination
- 翻页用**线型 V 形箭头**（`beast-core-icon-left/right`），禁止「上一页/下一页」文字
- 跳页用 `«` `»`；选中页码蓝底白字

### Tag
- 圆角 6px，padding 4px
- info `#0071f3`/`#e6f6ff`/`#52aeff` · warn `#ff7300`/`#fff5e6`/`#ffc37a` · danger `#f71010`/`#fff2f0`/`#ffaca6` · success `#00b359`/`#e8fbe5`/`#00b359`

### Card
- **直角**（0px 圆角），边框 `#dbdbdb`
- 选中：边框 `#0071f3` + 右上角蓝色三角勾选标

### 图标体系
| 类型 | 形态 | 示例 |
|------|------|------|
| 状态提示 | 实心填充圆 + 白色符号 | `beast-core-icon-info-circle_filled` |
| 方向箭头 | 线型 V 形两条线段 | `beast-core-icon-down/left/right` |
| 勾选 | 线型对勾 | `beast-core-icon-check` |

所有图标 `viewBox="0 0 1024 1024"`，`fill="currentColor"`

---

## Motion 动效

- **缓动函数**：`cubic-bezier(0.78, 0.14, 0.15, 0.86)`（`easeInOutCirc`）
- **过渡范围**：按钮/输入框/开关的背景、边框、文字色
- **Toast 出现/消失**：0.3s，`cubic-bezier(0.55, 0, 0.55, 0.2)`
- **Modal**：淡入淡出
- **Switch 圆点**：滑动 `easeInOutCirc`

---

## Voice 语气

- **文案风格**：简洁、业务导向、无营销腔
- **按钮文案**：动词开头（查询、重置、导出、锁定）
- **分页**：「共有 N 条」靠左，页码靠右
- **空状态**：居中图标 + 16px 标题 + 12px 描述（`#999`）
- **错误提示**：11px 红色文案，控件下方展示

---

## Anti-patterns 反模式

1. **禁止纯黑正文** — 最深 `rgba(0,0,0,.8)`
2. **禁止实心三角箭头** — 下拉/翻页/折叠一律用线型 V 形图标
3. **禁止线框型状态图标** — Toast/NoticeBar 用实心填充圆
4. **禁止滥用多色调** — 可交互主色统一 `#0071f3`
5. **禁止原生控件外观** — Select、DatePicker、Checkbox/Radio 均为自定义渲染
6. **禁止 Table hover 用 `#e6f6ff`** — 必须用 `#e6f9ff`
7. **禁止列表页背景用 `#f0f2f5`** — 业务内容区为 `#fff`
8. **禁止 Modal 按钮间距 8px** — 实际为 13px
9. **禁止 Card 加圆角** — OMS 卡片为直角 0px
10. **禁止彩色区分信息层级** — 用黑透明度梯度，状态色仅用于语义

---

## z-index 速查

| 层级 | 值 |
|------|-----|
| BackTop | 10 |
| Table sticky 冻结列 | 2 |
| Table sticky 表头 | 3 |
| Select 下拉 | 101 |
| Spin | 999 |
| Modal + 遮罩 | 1000 |
| Toast | 1010 |
| Popover | 1030 |
| Dropdown | 1050 |
| Tooltip | 1060 |
| 底部 sticky 操作栏 | 101 |

---

## 圆角速查

| 场景 | 值 |
|------|-----|
| 全局（按钮/输入/标签） | 6px |
| Toast / NoticeBar | 3px |
| Card | 0px（直角） |
| SKU 画布 | 12px |
| Badge | 6px / 8px(large) |

---

*基于 OMS 运行时 CSS（2026-07-31 交叉核验）提炼。完整 Token 附录见权威源文档。*
