import React, { useState } from 'react';
import { GallerySection, GalleryRow } from './GallerySection';
import './ComponentGalleryPage.css';
import { Button } from '../components/Button/Button';
import { Input, TextArea } from '../components/Input/Input';
import { Select } from '../components/Select/Select';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { RadioGroup } from '../components/Radio/Radio';
import { Switch } from '../components/Switch/Switch';
import { Tag } from '../components/Tag/Tag';
import { Badge } from '../components/Badge/Badge';
import { Card } from '../components/Card/Card';
import { Table, type ColumnType } from '../components/Table/Table';
import { Modal } from '../components/Modal/Modal';
import { toast } from '../components/Toast/Toast';
import { Tooltip } from '../components/Tooltip/Tooltip';
import { Popover } from '../components/Popover/Popover';
import { Progress } from '../components/Progress/Progress';
import { Spin } from '../components/Spin/Spin';
import { Tabs } from '../components/Tabs/Tabs';
import { Pagination } from '../components/Pagination/Pagination';
import { Steps } from '../components/Steps/Steps';
import { Breadcrumb } from '../components/Breadcrumb/Breadcrumb';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { Menu } from '../components/Menu/Menu';
import { Drawer } from '../components/Drawer/Drawer';
import { Collapse } from '../components/Collapse/Collapse';
import { Divider } from '../components/Divider/Divider';
import { Space } from '../components/Space/Space';
import { Row, Col } from '../components/Grid/Grid';
import { NoticeBar } from '../components/NoticeBar/NoticeBar';
import { DatePicker, RangePicker } from '../components/DatePicker/DatePicker';
import { Form, FormItem } from '../components/Form/Form';
import { IconMore, IconPlus } from '../components/Icon/Icon';

const THEME_COLORS = [
  ['themeColor1', '#e6f6ff'],
  ['themeColor2', '#a3daff'],
  ['themeColor3', '#7ac6ff'],
  ['themeColor4', '#52aeff'],
  ['themeColor5', '#2994ff'],
  ['themeColor6', '#0071f3'],
  ['themeColor7', '#0058cc'],
  ['themeColor8', '#0042a6'],
  ['themeColor9', '#002f80'],
  ['themeColor10', '#001e59'],
];

const SEMANTIC_COLORS: [string, string, string][] = [
  ['danger', '#f71010', 'dangerColor'],
  ['success', '#00bb12', 'successColor'],
  ['warn', '#fb7701', 'warnColor'],
  ['info', '#0071f3', '(=themeColor)'],
];

const TEXT_COLORS: [string, string][] = [
  ['主要 .8', 'rgba(0,0,0,.8)'],
  ['次要 .6', 'rgba(0,0,0,.6)'],
  ['三级 .4', 'rgba(0,0,0,.4)'],
  ['提示 .32', 'rgba(0,0,0,.32)'],
  ['禁用 .24', 'rgba(0,0,0,.24)'],
];

const STATUS_TRIPLE: [string, string, string, string][] = [
  ['success', '#00bb12', '#e3fae1', '#9bed98'],
  ['warn', '#fb7701', '#fff6e6', '#ffdaa3'],
  ['error', '#f71010', '#ffeae6', '#ffbdb3'],
  ['info', '#0071f3', '#e6f6ff', '#a3daff'],
];

const Z_INDEX_TABLE: [string, number][] = [
  ['BackTop 回到顶部', 10],
  ['Table 固定列/表头', 100],
  ['Select 下拉面板', 101],
  ['Spin 加载遮罩 / Preview 预览', 999],
  ['Modal 弹窗 + 遮罩', 1000],
  ['Toast 消息 / Notification 通知', 1010],
  ['Popover 气泡 / Portal 通用浮层', 1030],
  ['Dropdown 下拉菜单', 1050],
  ['Tooltip 提示', 1060],
];

interface DemoRow {
  id: string;
  name: string;
  status: string;
}

const DEMO_COLUMNS: ColumnType<DemoRow>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', width: 100 },
  { key: 'name', title: '名称', dataIndex: 'name' },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    render: (v: string) => <Tag type={v === '成功' ? 'success' : 'warn'} size="small">{v}</Tag>,
  },
];

const DEMO_DATA: DemoRow[] = [
  { id: 'D-001', name: '示例数据行 A', status: '成功' },
  { id: 'D-002', name: '示例数据行 B', status: '待处理' },
];

export const ComponentGalleryPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkedA, setCheckedA] = useState(true);
  const [checkedB, setCheckedB] = useState(false);
  const [radioValue, setRadioValue] = useState('a');
  const [tagRadio, setTagRadio] = useState('b');
  const [switchA, setSwitchA] = useState(true);
  const [switchB, setSwitchB] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>(['a']);
  const [tabsLine, setTabsLine] = useState('one');
  const [tabsCard, setTabsCard] = useState('one');
  const [tabsCapsule, setTabsCapsule] = useState('one');
  const [tabsReunit, setTabsReunit] = useState('one');
  const [page, setPage] = useState(3);
  const [spinning, setSpinning] = useState(false);
  const [menuKey, setMenuKey] = useState('a');
  const [dateVal, setDateVal] = useState('');
  const [rangeVal, setRangeVal] = useState<[string, string]>(['', '']);

  return (
    <div className="gallery-page">
      <div className="gallery-page__intro">
        <h1>Beast Core / OMS 设计规范 —— 组件全览</h1>
        <p>
          本页面依据《Beast-Core-设计规范-精简版-02.md》逐条还原第二~五章的色彩、字体、尺寸、组件与交互细节，供逐项比对验证规范文档的可靠性。所有色值、圆角、间距均直接取自文档定义的
          Design Token，未做二次调整。
        </p>
      </div>

      <GallerySection title="色彩体系 —— 主题色板" specRef="§2.1">
        <GalleryRow>
          {THEME_COLORS.map(([name, hex]) => (
            <div className="color-swatch" key={name}>
              <div className="color-swatch__block" style={{ background: hex }} />
              <span className="color-swatch__label">{name}</span>
              <span className="color-swatch__value">{hex}</span>
            </div>
          ))}
        </GalleryRow>
      </GallerySection>

      <GallerySection title="色彩体系 —— 功能状态色 / 文字色" specRef="§2.2 · §2.3">
        <GalleryRow label="状态色">
          {SEMANTIC_COLORS.map(([name, hex, token]) => (
            <div className="color-swatch" key={name}>
              <div className="color-swatch__block" style={{ background: hex }} />
              <span className="color-swatch__label">{name}</span>
              <span className="color-swatch__value">{token}</span>
            </div>
          ))}
        </GalleryRow>
        <GalleryRow label="文字色">
          {TEXT_COLORS.map(([name, rgba]) => (
            <div className="color-swatch" key={name}>
              <div className="color-swatch__block" style={{ background: '#fafafa', color: rgba, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                文字
              </div>
              <span className="color-swatch__label">{name}</span>
            </div>
          ))}
        </GalleryRow>
      </GallerySection>

      <GallerySection title="状态提示三件套（唯一权威源）" specRef="§2.9">
        <GalleryRow>
          {STATUS_TRIPLE.map(([name, color, bg, border]) => (
            <div
              key={name}
              className="status-triple-demo"
              style={{ color, background: bg, borderColor: border }}
            >
              {name}
            </div>
          ))}
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Button 按钮" specRef="§5.1">
        <GalleryRow label="8 种类型">
          <Button type="primary">Primary</Button>
          <Button type="secondary">Secondary</Button>
          <Button type="gray">Gray</Button>
          <Button type="danger">Danger</Button>
          <Button type="secondaryDanger">SecondaryDanger</Button>
          <Button type="grayDanger">GrayDanger</Button>
          <Button type="textPrimary">TextPrimary</Button>
          <Button type="text">Text</Button>
          <Button type="textTip">TextTip</Button>
        </GalleryRow>
        <GalleryRow label="三档尺寸">
          <Button type="primary" size="small">Small 24</Button>
          <Button type="primary" size="medium">Medium 28</Button>
          <Button type="primary" size="large">Large 40</Button>
        </GalleryRow>
        <GalleryRow label="状态">
          <Button type="primary" loading>Loading</Button>
          <Button type="primary" disabled>Disabled</Button>
          <Button type="primary" iconOnly icon={<IconPlus size={14} />} aria-label="add" />
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Input 输入框 / Form 表单" specRef="§5.2 · §5.3">
        <GalleryRow label="基础">
          <Input placeholder="请输入内容" style={{ width: 200 }} />
          <Input placeholder="可清除" allowClear defaultValue="Beast Core" style={{ width: 200 }} />
          <Input placeholder="密码" password style={{ width: 200 }} />
        </GalleryRow>
        <GalleryRow label="状态">
          <Input placeholder="禁用态" disabled style={{ width: 200 }} />
          <Input placeholder="错误态" isError style={{ width: 200 }} />
          <Input placeholder="简约型" displayType="simple" style={{ width: 200 }} />
        </GalleryRow>
        <GalleryRow label="多行">
          <TextArea placeholder="TextArea 多行文本" rows={3} style={{ width: 320 }} />
        </GalleryRow>
        <GalleryRow label="Form 示例">
          <Form className="gallery-form-demo">
            <FormItem label="表单项" required labelWidth={104}>
              <Input placeholder="宽度 144px（固定表单场景）" />
            </FormItem>
          </Form>
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Select 下拉选择器" specRef="§5.4">
        <GalleryRow label="单选/可搜索">
          <Select
            style={{ width: 200 }}
            searchable
            clearable
            placeholder="请选择"
            value={selectValue}
            onChange={(v) => setSelectValue(v as string)}
            options={[
              { label: '选项一', value: 'a' },
              { label: '选项二', value: 'b' },
              { label: '选项三', value: 'c' },
            ]}
          />
        </GalleryRow>
        <GalleryRow label="多选">
          <Select
            style={{ width: 260 }}
            multiple
            clearable
            value={multiSelectValue}
            onChange={(v) => setMultiSelectValue(v as string[])}
            options={[
              { label: '标签 A', value: 'a' },
              { label: '标签 B', value: 'b' },
              { label: '标签 C', value: 'c' },
            ]}
          />
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Checkbox / Radio" specRef="§5.5">
        <GalleryRow label="Checkbox">
          <Checkbox checked={checkedA} onChange={setCheckedA}>已选中</Checkbox>
          <Checkbox checked={checkedB} onChange={setCheckedB}>未选中</Checkbox>
          <Checkbox indeterminate>半选中</Checkbox>
          <Checkbox disabled>禁用</Checkbox>
        </GalleryRow>
        <GalleryRow label="Radio 默认">
          <RadioGroup
            value={radioValue}
            onChange={setRadioValue}
            options={[
              { label: '选项一', value: 'a' },
              { label: '选项二', value: 'b' },
            ]}
          />
        </GalleryRow>
        <GalleryRow label="Radio 按钮组">
          <RadioGroup
            mode="button"
            value={tagRadio}
            onChange={setTagRadio}
            options={[
              { label: '按钮态', value: 'a' },
              { label: '选中态', value: 'b' },
              { label: '第三项', value: 'c' },
            ]}
          />
          <RadioGroup
            mode="buttonGhost"
            value={tagRadio}
            onChange={setTagRadio}
            options={[
              { label: '幽灵态', value: 'a' },
              { label: '选中态', value: 'b' },
            ]}
          />
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Switch 开关" specRef="§5.6">
        <GalleryRow>
          <Switch checked={switchA} onChange={setSwitchA} />
          <Switch checked={switchB} onChange={setSwitchB} />
          <Switch checked disabled />
          <Switch disabled />
          <Switch size="small" checked={switchA} onChange={setSwitchA} />
          <Switch loading checked />
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Tag 标签" specRef="§5.7">
        <GalleryRow>
          <Tag type="info">info 信息</Tag>
          <Tag type="warn">warn 提醒</Tag>
          <Tag type="danger">danger 警告</Tag>
          <Tag type="success">success 成功</Tag>
          <Tag type="fail">fail 失败</Tag>
          <Tag type="gray">gray 中性</Tag>
          <Tag type="info" dot>带圆点</Tag>
          <Tag type="warn" closable onClose={() => toast.info('标签已关闭')}>可关闭</Tag>
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Badge 徽标数" specRef="§5.8">
        <GalleryRow>
          <Badge count={5}><span className="gallery-badge-anchor">消息</span></Badge>
          <Badge count={120}><span className="gallery-badge-anchor">通知</span></Badge>
          <Badge count={1288} max={999}><span className="gallery-badge-anchor">超限</span></Badge>
          <Badge dot><span className="gallery-badge-anchor">圆点</span></Badge>
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Card 卡片" specRef="§5.9">
        <GalleryRow>
          <Card title="卡片标题" style={{ width: 200 }}>普通直角卡片，边框 1px solid #dbdbdb。</Card>
          <Card title="选中态卡片" selected style={{ width: 200 }}>
            右上角三角勾选标，边框变主题蓝。
          </Card>
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Table 表格" specRef="§5.10">
        <Table columns={DEMO_COLUMNS} dataSource={DEMO_DATA} rowKey={(r) => r.id} zebra />
      </GallerySection>

      <GallerySection title="Modal 弹窗" specRef="§5.11">
        <GalleryRow>
          <Button type="primary" onClick={() => setModalOpen(true)}>打开 Modal</Button>
        </GalleryRow>
        <Modal open={modalOpen} title="示例弹窗" onClose={() => setModalOpen(false)} onOk={() => setModalOpen(false)}>
          最小宽 320px，圆角 6px，header padding 8px 12px，body padding 24px 24px 20px。
        </Modal>
      </GallerySection>

      <GallerySection title="Toast 消息" specRef="§5.12">
        <GalleryRow>
          <Button type="gray" onClick={() => toast.success('操作成功')}>Success Toast</Button>
          <Button type="gray" onClick={() => toast.warn('请注意风险提示')}>Warn Toast</Button>
          <Button type="gray" onClick={() => toast.error('操作失败，请重试')}>Error Toast</Button>
          <Button type="gray" onClick={() => toast.info('这是一条信息提示')}>Info Toast</Button>
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Tooltip / Popover" specRef="§5.13">
        <GalleryRow>
          <Tooltip content="这是一个 Tooltip 提示">
            <Button type="gray">Hover 查看 Tooltip</Button>
          </Tooltip>
          <Popover title="Popover 标题" content="Popover 内容说明文字">
            <Button type="gray">Hover 查看 Popover</Button>
          </Popover>
          <Popover
            trigger="click"
            withConfirm
            title="操作确认"
            content="确定要执行该操作吗？"
            onConfirm={() => toast.success('已确认')}
          >
            <Button type="secondaryDanger">Click 确认型 Popover</Button>
          </Popover>
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Progress 进度条" specRef="§5.14">
        <GalleryRow label="线性">
          <Progress percent={68} style={{ width: 240 }} />
          <Progress percent={92} status="exception" style={{ width: 240 }} />
        </GalleryRow>
        <GalleryRow label="环形">
          <Progress type="circle" percent={68} />
          <Progress type="circle" percent={30} status="exception" />
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Spin 加载中" specRef="§5.15">
        <GalleryRow>
          <Button type="gray" onClick={() => { setSpinning(true); setTimeout(() => setSpinning(false), 1500); }}>
            触发区域加载
          </Button>
          <Spin spinning={spinning}>
            <div className="gallery-spin-demo">加载区域内容占位</div>
          </Spin>
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Tab 选项卡" specRef="§5.16">
        <GalleryRow label="line 线性">
          <Tabs
            type="line"
            activeKey={tabsLine}
            onChange={setTabsLine}
            items={[{ key: 'one', label: '一级标签' }, { key: 'two', label: '标签二' }, { key: 'three', label: '标签三' }]}
          />
        </GalleryRow>
        <GalleryRow label="card 卡片型">
          <Tabs
            type="card"
            activeKey={tabsCard}
            onChange={setTabsCard}
            items={[{ key: 'one', label: '卡片一' }, { key: 'two', label: '卡片二' }]}
          />
        </GalleryRow>
        <GalleryRow label="capsule 胶囊型">
          <Tabs
            type="capsule"
            activeKey={tabsCapsule}
            onChange={setTabsCapsule}
            items={[{ key: 'one', label: '胶囊一' }, { key: 'two', label: '胶囊二' }]}
          />
        </GalleryRow>
        <GalleryRow label="reunit 等分型">
          <div style={{ width: 320 }}>
            <Tabs
              type="reunit"
              activeKey={tabsReunit}
              onChange={setTabsReunit}
              items={[{ key: 'one', label: '等分一' }, { key: 'two', label: '等分二' }]}
            />
          </div>
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Pagination 分页" specRef="§5.17">
        <Pagination current={page} total={230} pageSize={10} onChange={(p) => setPage(p)} />
      </GallerySection>

      <GallerySection title="Step 步骤条" specRef="§5.18">
        <Steps
          current={1}
          items={[
            { title: '提交申请', description: '填写基础信息' },
            { title: '资料审核', description: '等待审核人处理' },
            { title: '审核通过', description: '完成流程' },
          ]}
        />
      </GallerySection>

      <GallerySection title="Breadcrumb / Dropdown / Menu" specRef="§5.19">
        <GalleryRow label="Breadcrumb">
          <Breadcrumb items={[{ label: '首页' }, { label: '任务管理' }, { label: '任务详情' }]} />
        </GalleryRow>
        <GalleryRow label="Dropdown">
          <Dropdown
            options={[
              { key: 'a', label: '菜单项一' },
              { key: 'b', label: '菜单项二' },
              { key: 'c', label: '危险操作', danger: true },
            ]}
          >
            <Button type="gray" icon={<IconMore size={12} />}>点击展开菜单</Button>
          </Dropdown>
        </GalleryRow>
        <GalleryRow label="Menu">
          <div className="gallery-menu-demo">
            <Menu
              selectedKey={menuKey}
              onSelect={setMenuKey}
              items={[
                { key: 'a', label: '菜单项 A' },
                { key: 'b', label: '菜单项 B' },
                { key: 'c', label: '菜单项 C' },
              ]}
            />
          </div>
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Drawer / Collapse / Divider" specRef="§5.20">
        <GalleryRow label="Drawer">
          <Button type="gray" onClick={() => setDrawerOpen(true)}>打开 Drawer</Button>
          <Drawer open={drawerOpen} title="示例抽屉" onClose={() => setDrawerOpen(false)}>
            从右侧滑入，遮罩 rgba(0,0,0,.4)。
          </Drawer>
        </GalleryRow>
        <GalleryRow label="Collapse">
          <div style={{ width: 320 }}>
            <Collapse
              panels={[
                { key: '1', header: '面板一', content: '面板高 44px，容器背景 #fafafa。' },
                { key: '2', header: '面板二', content: '展开/收起带箭头旋转动效。' },
              ]}
            />
          </div>
        </GalleryRow>
        <GalleryRow label="Divider">
          <div style={{ width: 320 }}>
            <Divider />
            <Divider>分割文字</Divider>
            水平<Divider direction="vertical" />垂直
          </div>
        </GalleryRow>
      </GallerySection>

      <GallerySection title="Grid / Space / Box" specRef="§5.21">
        <GalleryRow label="Grid">
          <Row gutter={16} style={{ width: 400 }}>
            <Col span={8}><div className="gallery-grid-block">span=8</div></Col>
            <Col span={8}><div className="gallery-grid-block">span=8</div></Col>
            <Col span={8}><div className="gallery-grid-block">span=8</div></Col>
          </Row>
        </GalleryRow>
        <GalleryRow label="Space">
          <Space size={8}>
            <Button type="gray" size="small">A</Button>
            <Button type="gray" size="small">B</Button>
            <Button type="gray" size="small">C</Button>
          </Space>
        </GalleryRow>
      </GallerySection>

      <GallerySection title="NoticeBar 通告栏" specRef="§5.22">
        <GalleryRow>
          <NoticeBar type="info">信息类通告 —— 浅底 #e6f6ff + 边框 #a3daff</NoticeBar>
        </GalleryRow>
        <GalleryRow>
          <NoticeBar type="warn" closable>警告类通告 —— 浅底 #fff6e6 + 边框 #ffdaa3</NoticeBar>
        </GalleryRow>
        <GalleryRow>
          <NoticeBar type="error">错误类通告 —— 浅底 #ffeae6 + 边框 #ffbdb3</NoticeBar>
        </GalleryRow>
        <GalleryRow>
          <NoticeBar type="success">成功类通告 —— 浅底 #e3fae1 + 边框 #9bed98</NoticeBar>
        </GalleryRow>
      </GallerySection>

      <GallerySection title="DatePicker / RangePicker" specRef="§5.23">
        <GalleryRow>
          <DatePicker style={{ width: 200 }} value={dateVal} onChange={setDateVal} />
          <RangePicker style={{ width: 280 }} value={rangeVal} onChange={setRangeVal} />
        </GalleryRow>
      </GallerySection>

      <GallerySection title="层级 z-index 体系" specRef="§6">
        <table className="gallery-zindex-table">
          <thead>
            <tr>
              <th>组件</th>
              <th>z-index</th>
            </tr>
          </thead>
          <tbody>
            {Z_INDEX_TABLE.map(([name, z]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{z}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GallerySection>
    </div>
  );
};
