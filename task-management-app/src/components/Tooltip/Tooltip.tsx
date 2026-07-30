import React, { useRef, useState } from 'react';
import './Tooltip.css';

export interface TooltipProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactElement;
}

/** Beast Core Tooltip §5.13 */
export const Tooltip: React.FC<TooltipProps> = ({ content, placement = 'top', children }) => {
  const [visible, setVisible] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const show = () => {
    window.clearTimeout(timer.current);
    setVisible(true);
  };
  const hide = () => {
    timer.current = window.setTimeout(() => setVisible(false), 60);
  };

  return (
    <span className="bc-tooltip-wrap" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {visible && (
        <span className={`bc-tooltip bc-tooltip--${placement}`} role="tooltip">
          <span className="bc-tooltip__arrow" />
          {content}
        </span>
      )}
    </span>
  );
};
