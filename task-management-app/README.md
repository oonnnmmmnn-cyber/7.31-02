# 任务管理列表 · Beast Core / OMS 设计规范验证 Demo

本项目根据仓库根目录的《[Beast-Core-设计规范-精简版-02.md](../Beast-Core-设计规范-精简版-02.md)》从零实现了一套「任务管理列表」中后台前端页面，并将文档第五章描述的 **全部组件**（Button / Input / Select / Checkbox / Radio / Switch / Tag / Badge / Card / Table / Modal / Toast / Tooltip / Popover / Progress / Spin / Tab / Pagination / Step / Breadcrumb / Dropdown / Menu / Drawer / Collapse / Divider / Grid / Space / NoticeBar / DatePicker / RangePicker）都实际接入了页面，用于人工比对、验证该设计规范文档的可靠性与可执行性。

> 由于 Beast Core 是 PDD/TEMU 内部组件库（`beast.htj.pdd.net`），在本环境中无法直接安装真实的 `@***/beast-core` 依赖，因此本项目按照规范文档中的 Design Token（色彩 / 字号 / 尺寸 / 圆角 / 间距 / z-index / 动效）与交互细节描述，用原生 React + TypeScript + 纯 CSS **从零还原**了一套同构组件库（见 `src/components`），未使用任何第三方 UI 组件库，所有视觉数值均可与规范文档逐条对照。

## 页面说明

启动后应用包含左侧导航两个页面：

1. **任务管理列表**（`src/pages/TaskListPage.tsx`）—— 严格按照规范 **§12.1 管理列表页布局标准** 搭建的真实业务页面：
   - 顶部一级业务 Tabs（line 型）
   - 快速筛选胶囊 + 状态胶囊组（capsule 型 Tabs）+「只看紧急任务」Checkbox
   - 响应式 Label 宽度的筛选表单（Input / 多选 Select / RangePicker）
   - 业务提示通告条（NoticeBar info）
   - 批量操作工具栏（新建 / 批量指派 / 批量删除 + Popover 二次确认 / 导入）
   - 数据表格（表头 `#f5f5f5`、行 hover 浅蓝底、Tag 优先级/状态、Progress 进度、Switch 自动跟踪开关、Tooltip、Dropdown 更多操作）+ Pagination 分页
   - 「新建/编辑任务」Modal（Form + Card 模板选择 + RadioGroup + DatePicker + Switch）
   - 「任务详情」Drawer（Steps 流程 + 状态提示块 §9.2 + Card 选中态 + Progress 环形 + Collapse + Divider）
   - 全局 Toast 反馈

2. **组件规范速查**（`src/pages/ComponentGalleryPage.tsx`）—— 逐条对照规范第二~六章，systematically 展示色彩 Token、状态提示三件套、Typography 及全部 23 个组件小节（§5.1~§5.23）的各类型/尺寸/状态，以及 z-index 分层表（§6），便于直接与文档比对验证。

## 目录结构

```
src/
  styles/tokens.css        # 唯一 Design Token 权威源（对应文档附录 A/B/C）
  styles/reset.css         # 全局重置 + 动效 keyframes
  components/              # 从零实现的 Beast Core 风格组件库（Button/Input/Select/...）
  layout/AppLayout.tsx      # 顶部 Header + 左侧 Menu + Breadcrumb 应用外壳
  mock/tasks.ts             # 任务管理 Mock 数据
  pages/
    TaskListPage.tsx         # 任务管理列表主页面
    CreateTaskModal.tsx       # 新建/编辑任务 Modal
    TaskDetailDrawer.tsx      # 任务详情 Drawer
    ComponentGalleryPage.tsx  # 组件规范速查页
```

## 本地运行

```bash
npm install
npm run dev      # 本地开发，默认 http://localhost:5173
npm run build    # 生产构建（tsc -b && vite build）
```

## 验证建议

对照根目录设计规范文档，重点检查：

- **色彩**：`src/styles/tokens.css` 中的 `--bc-*` 变量与文档附录 A 是否一一对应；
- **组件交互细节**：Select/DatePicker 是否为非原生控件、Checkbox/Radio 是否隐藏原生 `input`、Pagination 翻页是否使用线型箭头而非文字等（对应文档 §5 各小节「交互细节」）；
- **布局规范**：任务管理列表页与文档 §12.1 的纵向卡槽结构、Label 宽度、表头/行高/Padding 数值是否吻合；
- **z-index 分层**：Modal / Toast / Popover / Dropdown / Tooltip 等浮层堆叠顺序是否符合文档 §6。
