import React, { useMemo, useState } from 'react';
import './TaskListPage.css';
import { Tabs } from '../components/Tabs/Tabs';
import { Form, FormItem } from '../components/Form/Form';
import { Input } from '../components/Input/Input';
import { Select } from '../components/Select/Select';
import { RangePicker } from '../components/DatePicker/DatePicker';
import { Button } from '../components/Button/Button';
import { NoticeBar } from '../components/NoticeBar/NoticeBar';
import { Table, type ColumnType } from '../components/Table/Table';
import { Pagination } from '../components/Pagination/Pagination';
import { Tag } from '../components/Tag/Tag';
import { Progress } from '../components/Progress/Progress';
import { Switch } from '../components/Switch/Switch';
import { Tooltip } from '../components/Tooltip/Tooltip';
import { Popover } from '../components/Popover/Popover';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { IconPlus, IconMore, IconDown } from '../components/Icon/Icon';
import { toast } from '../components/Toast/Toast';
import { CreateTaskModal, type TaskFormValues } from './CreateTaskModal';
import { TaskDetailDrawer } from './TaskDetailDrawer';
import {
  generateTasks,
  PRIORITY_MAP,
  STATUS_MAP,
  type TaskRecord,
  type TaskStatus,
} from '../mock/tasks';

const ALL_TASKS = generateTasks(46);

const BUSINESS_TABS = [
  { key: 'all', label: '全部任务' },
  { key: 'mine', label: '我负责的' },
  { key: 'created', label: '我创建的' },
  { key: 'archived', label: '已归档' },
];

const STATUS_CAPSULES: { key: TaskStatus | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待处理' },
  { key: 'processing', label: '进行中' },
  { key: 'reviewing', label: '待审核' },
  { key: 'done', label: '已完成' },
  { key: 'overdue', label: '已逾期' },
];

const OWNER_OPTIONS = Array.from(new Set(ALL_TASKS.map((t) => t.owner))).map((o) => ({ label: o, value: o }));
const PRIORITY_OPTIONS = Object.entries(PRIORITY_MAP).map(([value, meta]) => ({ label: meta.label, value }));
const STATUS_OPTIONS = Object.entries(STATUS_MAP).map(([value, meta]) => ({ label: meta.label, value }));

interface Filters {
  name: string;
  owners: string[];
  priorities: string[];
  status: string;
  dateRange: [string, string];
}

const EMPTY_FILTERS: Filters = { name: '', owners: [], priorities: [], status: '', dateRange: ['', ''] };

export const TaskListPage: React.FC = () => {
  const [businessTab, setBusinessTab] = useState('all');
  const [filterMode, setFilterMode] = useState<'default' | 'advanced'>('default');
  const [statusCapsule, setStatusCapsule] = useState<TaskStatus | 'all'>('all');
  const [draftFilters, setDraftFilters] = useState<Filters>(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(EMPTY_FILTERS);
  const [onlyUrgent, setOnlyUrgent] = useState(false);
  const [tasks, setTasks] = useState<TaskRecord[]>(ALL_TASKS);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskRecord | null>(null);
  const [detailTask, setDetailTask] = useState<TaskRecord | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (businessTab === 'mine' && t.owner !== '林晓雯') return false;
      if (businessTab === 'archived' && t.status !== 'done') return false;
      if (statusCapsule !== 'all' && t.status !== statusCapsule) return false;
      if (onlyUrgent && t.priority !== 'urgent') return false;
      if (appliedFilters.name && !t.name.includes(appliedFilters.name)) return false;
      if (appliedFilters.owners.length && !appliedFilters.owners.includes(t.owner)) return false;
      if (appliedFilters.priorities.length && !appliedFilters.priorities.includes(t.priority)) return false;
      if (appliedFilters.status && t.status !== appliedFilters.status) return false;
      const [from, to] = appliedFilters.dateRange;
      if (from && t.dueDate < from) return false;
      if (to && t.dueDate > to) return false;
      return true;
    });
  }, [tasks, businessTab, statusCapsule, onlyUrgent, appliedFilters]);

  const pagedTasks = useMemo(() => {
    const start = (current - 1) * pageSize;
    return filteredTasks.slice(start, start + pageSize);
  }, [filteredTasks, current, pageSize]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tasks.length };
    tasks.forEach((t) => {
      counts[t.status] = (counts[t.status] ?? 0) + 1;
    });
    return counts;
  }, [tasks]);

  const handleQuery = () => {
    setAppliedFilters(draftFilters);
    setCurrent(1);
  };

  const handleReset = () => {
    setDraftFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
    setCurrent(1);
  };

  const handleToggleAutoTrack = (id: string, checked: boolean) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, autoTrack: checked } : t)));
    toast.success(`已${checked ? '开启' : '关闭'}自动跟踪`);
  };

  const handleDelete = (record: TaskRecord) => {
    setTasks((prev) => prev.filter((t) => t.id !== record.id));
    setSelectedRowKeys((prev) => prev.filter((k) => k !== record.id));
    toast.success(`任务「${record.name}」已删除`);
  };

  const handleBatchDelete = () => {
    setTasks((prev) => prev.filter((t) => !selectedRowKeys.includes(t.id)));
    toast.success(`已批量删除 ${selectedRowKeys.length} 条任务`);
    setSelectedRowKeys([]);
  };

  const handleSubmitTask = (values: TaskFormValues) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...values } : t)),
      );
      toast.success('任务已更新');
    } else {
      const newTask: TaskRecord = {
        id: `TSK-${2026000 + tasks.length + 1}`,
        name: values.name,
        project: values.project,
        owner: values.owner,
        ownerAvatar: values.owner.slice(0, 1),
        priority: values.priority,
        status: 'pending',
        progress: 0,
        autoTrack: values.autoTrack,
        dueDate: values.dueDate || '2026-08-30',
        createdAt: '2026-07-30',
        tags: ['新建'],
      };
      setTasks((prev) => [newTask, ...prev]);
      toast.success('任务创建成功');
    }
    setCreateOpen(false);
    setEditingTask(null);
  };

  const columns: ColumnType<TaskRecord>[] = [
    {
      key: 'id',
      title: '任务 ID',
      dataIndex: 'id',
      width: 128,
      sortable: true,
      render: (value, record) => (
        <a className="task-link" onClick={() => setDetailTask(record)}>
          {value}
        </a>
      ),
    },
    {
      key: 'name',
      title: '任务名称',
      dataIndex: 'name',
      render: (value, record) => (
        <div className="task-name-cell">
          <Tooltip content={value}>
            <span className="task-name-cell__text">{value}</span>
          </Tooltip>
          <div className="task-name-cell__tags">
            {record.tags.map((tg) => (
              <Tag key={tg} type="gray" size="small">
                {tg}
              </Tag>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'owner',
      title: '负责人',
      dataIndex: 'owner',
      width: 120,
      render: (value: string) => (
        <span className="task-owner-cell">
          <span className="task-owner-cell__avatar">{value.slice(0, 1)}</span>
          {value}
        </span>
      ),
    },
    {
      key: 'priority',
      title: '优先级',
      dataIndex: 'priority',
      width: 90,
      render: (value: keyof typeof PRIORITY_MAP) => (
        <Tag type={PRIORITY_MAP[value].tagType} dot size="small">
          {PRIORITY_MAP[value].label}
        </Tag>
      ),
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (value: TaskStatus) => (
        <Tag type={STATUS_MAP[value].tagType} size="small">
          {STATUS_MAP[value].label}
        </Tag>
      ),
    },
    {
      key: 'progress',
      title: '进度',
      dataIndex: 'progress',
      width: 150,
      render: (value: number, record) => (
        <Progress percent={value} status={record.status === 'overdue' ? 'exception' : 'normal'} />
      ),
    },
    {
      key: 'autoTrack',
      title: (
        <Tooltip content="开启后系统将自动同步任务进度">
          <span>自动跟踪</span>
        </Tooltip>
      ),
      width: 90,
      align: 'center',
      render: (_v, record) => (
        <Switch size="small" checked={record.autoTrack} onChange={(c) => handleToggleAutoTrack(record.id, c)} />
      ),
    },
    { key: 'dueDate', title: '截止日期', dataIndex: 'dueDate', width: 110, sortable: true },
    {
      key: 'actions',
      title: '操作',
      width: 160,
      render: (_v, record) => (
        <span className="task-actions">
          <Button type="textPrimary" size="small" onClick={() => setDetailTask(record)}>
            详情
          </Button>
          <Button
            type="textPrimary"
            size="small"
            onClick={() => {
              setEditingTask(record);
              setCreateOpen(true);
            }}
          >
            编辑
          </Button>
          <Popover
            trigger="click"
            withConfirm
            title="删除确认"
            content={`确定删除任务「${record.name}」吗？`}
            onConfirm={() => handleDelete(record)}
          >
            <Button type="textPrimary" size="small" style={{ color: 'var(--bc-dangerColor)' }}>
              删除
            </Button>
          </Popover>
          <Dropdown
            placement="bottom-right"
            options={[
              { key: 'copy', label: '复制任务', onClick: () => toast.info('已复制任务') },
              { key: 'archive', label: '归档任务', onClick: () => toast.info('已归档任务') },
              { key: 'transfer', label: '转交他人', onClick: () => toast.info('转交功能开发中') },
            ]}
          >
            <button className="task-more-btn" aria-label="more">
              <IconMore size={14} />
            </button>
          </Dropdown>
        </span>
      ),
    },
  ];

  return (
    <div className="task-page">
      <div className="task-page__panel">
        <Tabs
          type="line"
          items={BUSINESS_TABS}
          activeKey={businessTab}
          onChange={(k) => {
            setBusinessTab(k);
            setCurrent(1);
          }}
        />

        <div className="task-page__capsule-row">
          <Tabs
            type="capsule"
            items={[
              { key: 'default', label: '默认筛选' },
              { key: 'advanced', label: '精细查询' },
            ]}
            activeKey={filterMode}
            onChange={(k) => setFilterMode(k as 'default' | 'advanced')}
          />
          <span className="task-page__capsule-divider" />
          <Tabs
            type="capsule"
            items={STATUS_CAPSULES.map((s) => ({
              key: s.key,
              label: `${s.label}${s.key !== 'all' ? `(${statusCounts[s.key] ?? 0})` : ''}`,
            }))}
            activeKey={statusCapsule}
            onChange={(k) => {
              setStatusCapsule(k as TaskStatus | 'all');
              setCurrent(1);
            }}
          />
          <Checkbox checked={onlyUrgent} onChange={setOnlyUrgent} className="task-page__urgent-checkbox">
            只看紧急任务
          </Checkbox>
        </div>

        <Form className="task-search-form" onSubmit={handleQuery}>
          <div className="task-search-form__grid">
            <FormItem label="任务名称">
              <Input
                placeholder="请输入任务名称"
                allowClear
                value={draftFilters.name}
                onChange={(e) => setDraftFilters((f) => ({ ...f, name: e.target.value }))}
                onClear={() => setDraftFilters((f) => ({ ...f, name: '' }))}
              />
            </FormItem>
            <FormItem label="负责人">
              <Select
                options={OWNER_OPTIONS}
                multiple
                searchable
                clearable
                placeholder="请选择负责人"
                value={draftFilters.owners}
                onChange={(v) => setDraftFilters((f) => ({ ...f, owners: v as string[] }))}
              />
            </FormItem>
            <FormItem label="优先级">
              <Select
                options={PRIORITY_OPTIONS}
                multiple
                clearable
                placeholder="请选择优先级"
                value={draftFilters.priorities}
                onChange={(v) => setDraftFilters((f) => ({ ...f, priorities: v as string[] }))}
              />
            </FormItem>
            <FormItem label="状态">
              <Select
                options={STATUS_OPTIONS}
                clearable
                placeholder="请选择状态"
                value={draftFilters.status}
                onChange={(v) => setDraftFilters((f) => ({ ...f, status: v as string }))}
              />
            </FormItem>
            {filterMode === 'advanced' && (
              <FormItem label="截止日期">
                <RangePicker
                  value={draftFilters.dateRange}
                  onChange={(v) => setDraftFilters((f) => ({ ...f, dateRange: v }))}
                />
              </FormItem>
            )}
          </div>
          <div className="task-search-form__actions">
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button type="gray" onClick={handleReset}>
              重置
            </Button>
            <Button type="textPrimary" size="medium">
              保存快照
            </Button>
            <Button
              type="textPrimary"
              size="medium"
              icon={<IconDown size={10} />}
              onClick={() => setFilterMode((m) => (m === 'default' ? 'advanced' : 'default'))}
            >
              {filterMode === 'default' ? '展开' : '收起'}
            </Button>
          </div>
        </Form>
      </div>

      <div className="task-page__gap" />

      <div className="task-page__panel">
        <NoticeBar type="info" closable className="task-page__notice">
          当前展示为「{BUSINESS_TABS.find((t) => t.key === businessTab)?.label}」筛选结果，共匹配 {filteredTasks.length}{' '}
          条任务；系统将于本周日 24:00 进行例行维护，请提前保存草稿。
        </NoticeBar>

        <div className="task-action-bar">
          <div className="task-action-bar__left">
            <Button
              type="primary"
              icon={<IconPlus size={12} />}
              onClick={() => {
                setEditingTask(null);
                setCreateOpen(true);
              }}
            >
              新建任务
            </Button>
            <Button type="gray" disabled={selectedRowKeys.length === 0} onClick={() => toast.info('批量指派功能开发中')}>
              批量指派
            </Button>
            <Popover
              trigger="click"
              withConfirm
              title="批量删除确认"
              content={`确定删除选中的 ${selectedRowKeys.length} 条任务吗？`}
              onConfirm={handleBatchDelete}
            >
              <Button type="grayDanger" disabled={selectedRowKeys.length === 0}>
                批量删除{selectedRowKeys.length > 0 ? `(${selectedRowKeys.length})` : ''}
              </Button>
            </Popover>
            <Button type="gray" onClick={() => toast.info('导入功能开发中')}>
              导入同步申诉
            </Button>
          </div>
          <div className="task-action-bar__right">
            <Button type="textPrimary" onClick={() => toast.success('导出任务已提交，请前往下载中心查看')}>
              一键复制所选 ID
            </Button>
            <Button type="textPrimary" onClick={() => toast.info('查询申诉记录功能开发中')}>
              查询申诉记录
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={pagedTasks}
          rowKey={(r) => r.id}
          rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
        />

        <div className="task-page__pagination">
          <Pagination
            current={current}
            total={filteredTasks.length}
            pageSize={pageSize}
            onChange={(page, size) => {
              setCurrent(page);
              setPageSize(size);
            }}
          />
        </div>
      </div>

      <CreateTaskModal
        open={createOpen}
        initialValue={editingTask}
        ownerOptions={OWNER_OPTIONS}
        onClose={() => {
          setCreateOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmitTask}
      />

      <TaskDetailDrawer task={detailTask} onClose={() => setDetailTask(null)} />
    </div>
  );
};
