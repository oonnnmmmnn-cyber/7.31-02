import React from 'react';
import { createPortal } from 'react-dom';
import './Drawer.css';
import { IconClose } from '../Icon/Icon';

export interface DrawerProps {
  open: boolean;
  title?: React.ReactNode;
  onClose: () => void;
  width?: number | string;
  fullWidth?: boolean;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

/** Beast Core Drawer §5.20 / OMS 全宽抽屉 §9.5 */
export const Drawer: React.FC<DrawerProps> = ({
  open,
  title,
  onClose,
  width = 480,
  fullWidth = false,
  footer,
  children,
}) => {
  if (!open) return null;
  return createPortal(
    <div className="bc-drawer-mask" onClick={onClose}>
      <div
        className={['bc-drawer', fullWidth ? 'bc-drawer--full' : ''].filter(Boolean).join(' ')}
        style={fullWidth ? undefined : { width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bc-drawer__header">
          <span className="bc-drawer__title">{title}</span>
          <button className="bc-drawer__close" onClick={onClose} aria-label="close">
            <IconClose size={16} />
          </button>
        </div>
        <div className="bc-drawer__body">{children}</div>
        {footer && <div className="bc-drawer__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};
