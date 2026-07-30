import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './Toast.css';
import {
  IconCheckCircleFilled,
  IconWarningCircleFilled,
  IconCloseCircleFilled,
  IconInfoCircleFilled,
} from '../Icon/Icon';

export type ToastType = 'success' | 'warn' | 'error' | 'info';

interface ToastItem {
  id: number;
  type: ToastType;
  content: string;
}

let listeners: ((items: ToastItem[]) => void)[] = [];
let items: ToastItem[] = [];
let uid = 0;

function emit() {
  listeners.forEach((l) => l(items));
}

function push(type: ToastType, content: string, duration = 2400) {
  const id = ++uid;
  items = [...items, { id, type, content }];
  emit();
  setTimeout(() => {
    items = items.filter((i) => i.id !== id);
    emit();
  }, duration);
}

/** Beast Core Toast §5.12 —— 命令式全局轻提示 */
export const toast = {
  success: (content: string, duration?: number) => push('success', content, duration),
  warn: (content: string, duration?: number) => push('warn', content, duration),
  error: (content: string, duration?: number) => push('error', content, duration),
  info: (content: string, duration?: number) => push('info', content, duration),
};

const ICONS: Record<ToastType, React.FC<{ size?: number }>> = {
  success: IconCheckCircleFilled,
  warn: IconWarningCircleFilled,
  error: IconCloseCircleFilled,
  info: IconInfoCircleFilled,
};

export const ToastContainer: React.FC = () => {
  const [list, setList] = useState<ToastItem[]>(items);

  useEffect(() => {
    listeners.push(setList);
    return () => {
      listeners = listeners.filter((l) => l !== setList);
    };
  }, []);

  return createPortal(
    <div className="bc-toast-container">
      {list.map((item) => {
        const Icon = ICONS[item.type];
        return (
          <div key={item.id} className={`bc-toast bc-toast--${item.type}`}>
            <Icon size={14} />
            <span className="bc-toast__text">{item.content}</span>
          </div>
        );
      })}
    </div>,
    document.body,
  );
};
