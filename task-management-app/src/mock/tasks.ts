export type TaskPriority = 'urgent' | 'high' | 'normal' | 'low';
export type TaskStatus = 'pending' | 'processing' | 'reviewing' | 'done' | 'overdue';

export interface TaskRecord {
  id: string;
  name: string;
  project: string;
  owner: string;
  ownerAvatar: string;
  priority: TaskPriority;
  status: TaskStatus;
  progress: number;
  autoTrack: boolean;
  dueDate: string;
  createdAt: string;
  tags: string[];
}

export const PRIORITY_MAP: Record<TaskPriority, { label: string; tagType: 'danger' | 'warn' | 'info' | 'gray' }> = {
  urgent: { label: '紧急', tagType: 'danger' },
  high: { label: '高', tagType: 'warn' },
  normal: { label: '中', tagType: 'info' },
  low: { label: '低', tagType: 'gray' },
};

export const STATUS_MAP: Record<TaskStatus, { label: string; tagType: 'success' | 'warn' | 'danger' | 'info' | 'fail' | 'gray' }> = {
  pending: { label: '待处理', tagType: 'info' },
  processing: { label: '进行中', tagType: 'warn' },
  reviewing: { label: '待审核', tagType: 'gray' },
  done: { label: '已完成', tagType: 'success' },
  overdue: { label: '已逾期', tagType: 'danger' },
};

const OWNERS = ['林晓雯', '陈志远', '黄佳怡', '王思远', '赵梦琪', '刘子豪'];
const PROJECTS = ['OMS 商品域', '供应链协同', '风控合规', '数据中台', '增长营销'];
const NAMES = [
  '梳理商品审核规则文档',
  '修复库存同步偶发延迟问题',
  '设计任务管理列表页高保真原型',
  '接入新版物流轨迹回调',
  '优化搜索召回排序策略',
  '编写 Q3 复盘周报',
  '排查支付对账差异',
  '完成多语言翻译校对',
  '搭建灰度发布流水线',
  '评审商家入驻新流程',
  '补齐单元测试覆盖率',
  '整理设计规范 Token 附录',
  '开展半托管商品质检抽查',
  '跟进竞品比价数据接入',
  '完善售后退款自动化规则',
  '制定双十一大促值班表',
  '归档历史批次任务日志',
  '收敛异常仓库预警名单',
];

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

export function generateTasks(count = 46): TaskRecord[] {
  const priorities: TaskPriority[] = ['urgent', 'high', 'normal', 'low'];
  const statuses: TaskStatus[] = ['pending', 'processing', 'reviewing', 'done', 'overdue'];

  return Array.from({ length: count }, (_, i) => {
    const seed = i + 1;
    const status = pick(statuses, seed);
    const progress = status === 'done' ? 100 : status === 'overdue' ? 40 + (seed % 30) : (seed * 13) % 90;
    return {
      id: `TSK-${2026000 + seed}`,
      name: pick(NAMES, seed),
      project: pick(PROJECTS, seed),
      owner: pick(OWNERS, seed),
      ownerAvatar: pick(OWNERS, seed).slice(0, 1),
      priority: pick(priorities, seed * 3),
      status,
      progress,
      autoTrack: seed % 3 !== 0,
      dueDate: `2026-08-${String((seed % 27) + 1).padStart(2, '0')}`,
      createdAt: `2026-07-${String((seed % 27) + 1).padStart(2, '0')}`,
      tags: seed % 4 === 0 ? ['跨部门', '重点'] : seed % 3 === 0 ? ['常规'] : ['自动化'],
    };
  });
}
