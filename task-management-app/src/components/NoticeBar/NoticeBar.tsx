import React, { useState } from 'react';
import './NoticeBar.css';
import {
  IconInfoCircleFilled,
  IconWarningCircleFilled,
  IconCloseCircleFilled,
  IconCheckCircleFilled,
  IconClose,
} from '../Icon/Icon';

export type NoticeBarType = 'info' | 'warn' | 'error' | 'success';

export interface NoticeBarProps {
  type?: NoticeBarType;
  closable?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const ICONS: Record<NoticeBarType, React.FC<{ size?: number }>> = {
  info: IconInfoCircleFilled,
  warn: IconWarningCircleFilled,
  error: IconCloseCircleFilled,
  success: IconCheckCircleFilled,
};

/** Beast Core NoticeBar §5.22 / §12.1 业务提示条 */
export const NoticeBar: React.FC<NoticeBarProps> = ({ type = 'info', closable = false, children, className = '' }) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  const Icon = ICONS[type];
  return (
    <div className={['bc-notice-bar', `bc-notice-bar--${type}`, className].filter(Boolean).join(' ')}>
      <Icon size={16} />
      <span className="bc-notice-bar__content">{children}</span>
      {closable && (
        <button className="bc-notice-bar__close" onClick={() => setVisible(false)} aria-label="close">
          <IconClose size={12} />
        </button>
      )}
    </div>
  );
};
