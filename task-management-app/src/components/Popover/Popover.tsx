import React, { useEffect, useRef, useState } from 'react';
import './Popover.css';
import { Button } from '../Button/Button';

export interface PopoverProps {
  title?: React.ReactNode;
  content: React.ReactNode;
  trigger?: 'hover' | 'click';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  withConfirm?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  children: React.ReactElement;
}

/** Beast Core Popover §5.13 */
export const Popover: React.FC<PopoverProps> = ({
  title,
  content,
  trigger = 'hover',
  placement = 'bottom',
  withConfirm = false,
  onConfirm,
  onCancel,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (trigger !== 'click') return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setVisible(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [trigger]);

  const hoverProps =
    trigger === 'hover'
      ? { onMouseEnter: () => setVisible(true), onMouseLeave: () => setVisible(false) }
      : { onClick: () => setVisible((v) => !v) };

  return (
    <span className="bc-popover-wrap" ref={rootRef} {...hoverProps}>
      {children}
      {visible && (
        <span
          className={[
            'bc-popover',
            `bc-popover--${placement}`,
            withConfirm ? 'bc-popover--confirm' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {title && <span className="bc-popover__title">{title}</span>}
          <span className="bc-popover__content">{content}</span>
          {withConfirm && (
            <span className="bc-popover__actions">
              <Button
                size="small"
                type="gray"
                onClick={() => {
                  setVisible(false);
                  onCancel?.();
                }}
              >
                取消
              </Button>
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  setVisible(false);
                  onConfirm?.();
                }}
              >
                确定
              </Button>
            </span>
          )}
        </span>
      )}
    </span>
  );
};
