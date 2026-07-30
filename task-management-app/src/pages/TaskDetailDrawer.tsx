import React from 'react';
import './TaskDetailDrawer.css';
import { Drawer } from '../components/Drawer/Drawer';
import { Steps } from '../components/Steps/Steps';
import { Progress } from '../components/Progress/Progress';
import { Card } from '../components/Card/Card';
import { Collapse } from '../components/Collapse/Collapse';
import { Divider } from '../components/Divider/Divider';
import { Space } from '../components/Space/Space';
import { Tag } from '../components/Tag/Tag';
import { Button } from '../components/Button/Button';
import { IconWarningCircleFilled, IconCheckCircleFilled } from '../components/Icon/Icon';
import { PRIORITY_MAP, STATUS_MAP, type TaskRecord } from '../mock/tasks';

const STEP_ITEMS = [
  { title: '创建任务', description: '负责人确认任务范围' },
  { title: '进行中', description: '按计划推进并更新进度' },
  { title: '待审核', description: '提交验收材料等待复核' },
  { title: '已完成', description: '任务归档' },
];

const STATUS_TO_STEP: Record<string, number> = {
  pending: 0,
  processing: 1,
  reviewing: 2,
  done: 3,
  overdue: 1,
};

interface TaskDetailDrawerProps {
  task: TaskRecord | null;
  onClose: () => void;
}

export const TaskDetailDrawer: React.FC<TaskDetailDrawerProps> = ({ task, onClose }) => {
  if (!task) return null;
  const needConfirm = task.status === 'reviewing';
  const alreadyConfirm = task.status === 'done';

  return (
    <Drawer
      open={!!task}
      title={`任务详情 · ${task.id}`}
      onClose={onClose}
      width={560}
      footer={
        <>
          <Button type="gray" onClick={onClose}>
            关闭
          </Button>
          <Button type="primary" onClick={onClose}>
            前往编辑
          </Button>
        </>
      }
    >
      <div className="task-detail">
        <Steps items={STEP_ITEMS} current={STATUS_TO_STEP[task.status] ?? 0} />

        <Divider />

        {needConfirm && (
          <div className="task-detail__status-block task-detail__status-block--warn">
            <IconWarningCircleFilled size={14} />
            <span>该任务处于<b>待确认</b>状态，请负责人尽快提交审核材料。</span>
          </div>
        )}
        {alreadyConfirm && (
          <div className="task-detail__status-block task-detail__status-block--success">
            <IconCheckCircleFilled size={14} />
            <span>该任务已于 {task.dueDate} <b>确认完成</b>，验收记录已归档。</span>
          </div>
        )}

        <Card title="基本信息" selected className="task-detail__card">
          <Space direction="vertical" size={10} style={{ width: '100%' }}>
            <div className="task-detail__row">
              <span className="task-detail__label">任务名称</span>
              <span className="task-detail__value">{task.name}</span>
            </div>
            <div className="task-detail__row">
              <span className="task-detail__label">所属项目</span>
              <span className="task-detail__value">{task.project}</span>
            </div>
            <div className="task-detail__row">
              <span className="task-detail__label">负责人</span>
              <span className="task-detail__value">{task.owner}</span>
            </div>
            <div className="task-detail__row">
              <span className="task-detail__label">优先级</span>
              <Tag type={PRIORITY_MAP[task.priority].tagType} dot size="small">
                {PRIORITY_MAP[task.priority].label}
              </Tag>
            </div>
            <div className="task-detail__row">
              <span className="task-detail__label">状态</span>
              <Tag type={STATUS_MAP[task.status].tagType} size="small">
                {STATUS_MAP[task.status].label}
              </Tag>
            </div>
            <div className="task-detail__row">
              <span className="task-detail__label">截止日期</span>
              <span className="task-detail__value">{task.dueDate}</span>
            </div>
          </Space>
        </Card>

        <div className="task-detail__progress-row">
          <Progress type="circle" percent={task.progress} status={task.status === 'overdue' ? 'exception' : 'normal'} size={88} />
          <div className="task-detail__progress-desc">
            <div className="task-detail__progress-title">整体进度</div>
            <div className="task-detail__progress-sub">
              创建于 {task.createdAt}，预计 {task.dueDate} 截止
            </div>
          </div>
        </div>

        <Collapse
          panels={[
            {
              key: 'log',
              header: '操作日志',
              content: (
                <Space direction="vertical" size={6} style={{ width: '100%' }}>
                  <div>2026-07-30 09:12 林晓雯 创建了任务</div>
                  <div>2026-07-30 14:20 {task.owner} 更新了进度至 {task.progress}%</div>
                  <div>2026-07-30 16:45 系统 自动同步了任务状态</div>
                </Space>
              ),
            },
            {
              key: 'attachment',
              header: '附件（2）',
              content: (
                <Space size={8}>
                  <Tag type="info" size="small">
                    需求文档.pdf
                  </Tag>
                  <Tag type="info" size="small">
                    验收清单.xlsx
                  </Tag>
                </Space>
              ),
            },
          ]}
          defaultActiveKeys={['log']}
        />
      </div>
    </Drawer>
  );
};
