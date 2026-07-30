import React, { useEffect, useState } from 'react';
import './CreateTaskModal.css';
import { Modal } from '../components/Modal/Modal';
import { Form, FormItem } from '../components/Form/Form';
import { Input, TextArea } from '../components/Input/Input';
import { Select, type SelectOption } from '../components/Select/Select';
import { RadioGroup } from '../components/Radio/Radio';
import { DatePicker } from '../components/DatePicker/DatePicker';
import { Switch } from '../components/Switch/Switch';
import { Card } from '../components/Card/Card';
import { Space } from '../components/Space/Space';
import { PRIORITY_MAP, type TaskPriority, type TaskRecord } from '../mock/tasks';

export interface TaskFormValues {
  name: string;
  project: string;
  owner: string;
  priority: TaskPriority;
  dueDate: string;
  description: string;
  autoTrack: boolean;
}

const TEMPLATES = [
  { key: 'blank', title: '空白任务', desc: '从零开始创建任务' },
  { key: 'review', title: '审核类任务', desc: '预置审核流程与检查清单' },
  { key: 'bugfix', title: '缺陷修复', desc: '预置问题定位与验收步骤' },
];

const PROJECT_OPTIONS: SelectOption[] = [
  { label: 'OMS 商品域', value: 'OMS 商品域' },
  { label: '供应链协同', value: '供应链协同' },
  { label: '风控合规', value: '风控合规' },
  { label: '数据中台', value: '数据中台' },
  { label: '增长营销', value: '增长营销' },
];

interface CreateTaskModalProps {
  open: boolean;
  initialValue: TaskRecord | null;
  ownerOptions: SelectOption[];
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  open,
  initialValue,
  ownerOptions,
  onClose,
  onSubmit,
}) => {
  const [template, setTemplate] = useState('blank');
  const [values, setValues] = useState<TaskFormValues>({
    name: '',
    project: PROJECT_OPTIONS[0].value,
    owner: ownerOptions[0]?.value ?? '',
    priority: 'normal',
    dueDate: '',
    description: '',
    autoTrack: true,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setValues(
        initialValue
          ? {
              name: initialValue.name,
              project: initialValue.project,
              owner: initialValue.owner,
              priority: initialValue.priority,
              dueDate: initialValue.dueDate,
              description: '',
              autoTrack: initialValue.autoTrack,
            }
          : {
              name: '',
              project: PROJECT_OPTIONS[0].value,
              owner: ownerOptions[0]?.value ?? '',
              priority: 'normal',
              dueDate: '',
              description: '',
              autoTrack: true,
            },
      );
      setTemplate('blank');
      setError('');
    }
  }, [open, initialValue, ownerOptions]);

  const handleOk = () => {
    if (!values.name.trim()) {
      setError('请输入任务名称');
      return;
    }
    setError('');
    onSubmit(values);
  };

  return (
    <Modal
      open={open}
      title={initialValue ? '编辑任务' : '新建任务'}
      width={640}
      onClose={onClose}
      onOk={handleOk}
      okText={initialValue ? '保存' : '创建'}
    >
      {!initialValue && (
        <div className="create-task__templates">
          <div className="create-task__templates-label">选择任务模板</div>
          <Space size={12}>
            {TEMPLATES.map((t) => (
              <Card
                key={t.key}
                selected={template === t.key}
                onClick={() => setTemplate(t.key)}
                className="create-task__template-card"
              >
                <div className="create-task__template-title">{t.title}</div>
                <div className="create-task__template-desc">{t.desc}</div>
              </Card>
            ))}
          </Space>
        </div>
      )}

      <Form>
        <FormItem label="任务名称" required error={error}>
          <Input
            placeholder="请输入任务名称，简要描述任务目标"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            isError={!!error}
          />
        </FormItem>
        <FormItem label="所属项目" required>
          <Select
            options={PROJECT_OPTIONS}
            value={values.project}
            onChange={(v) => setValues((s) => ({ ...s, project: v as string }))}
          />
        </FormItem>
        <FormItem label="负责人" required>
          <Select
            options={ownerOptions}
            searchable
            value={values.owner}
            onChange={(v) => setValues((s) => ({ ...s, owner: v as string }))}
          />
        </FormItem>
        <FormItem label="优先级" required>
          <RadioGroup
            mode="buttonGhost"
            options={Object.entries(PRIORITY_MAP).map(([value, meta]) => ({ label: meta.label, value }))}
            value={values.priority}
            onChange={(v) => setValues((s) => ({ ...s, priority: v as TaskPriority }))}
          />
        </FormItem>
        <FormItem label="截止日期">
          <DatePicker
            style={{ width: 220 }}
            value={values.dueDate}
            onChange={(v) => setValues((s) => ({ ...s, dueDate: v }))}
          />
        </FormItem>
        <FormItem label="任务描述">
          <TextArea
            placeholder="补充任务背景、验收标准等信息"
            rows={4}
            value={values.description}
            onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
          />
        </FormItem>
        <FormItem label="自动跟踪进度">
          <Switch checked={values.autoTrack} onChange={(c) => setValues((s) => ({ ...s, autoTrack: c }))} />
        </FormItem>
      </Form>
    </Modal>
  );
};
