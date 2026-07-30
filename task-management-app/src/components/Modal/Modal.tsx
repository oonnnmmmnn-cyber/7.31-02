import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import { IconClose } from '../Icon/Icon';
import { Button } from '../Button/Button';

export interface ModalProps {
  open: boolean;
  title?: React.ReactNode;
  onClose: () => void;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  width?: number | string;
  footer?: React.ReactNode | null;
  maskClosable?: boolean;
  children?: React.ReactNode;
}

/** Beast Core Modal §5.11 */
export const Modal: React.FC<ModalProps> = ({
  open,
  title,
  onClose,
  onOk,
  onCancel,
  okText = '确定',
  cancelText = '取消',
  width = 480,
  footer,
  maskClosable = false,
  children,
}) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="bc-modal-mask" onClick={() => maskClosable && onClose()}>
      <div
        className="bc-modal"
        style={{ width, minWidth: 320 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bc-modal__header">
          <span className="bc-modal__title">{title}</span>
          <button className="bc-modal__close" onClick={onClose} aria-label="close">
            <IconClose size={16} />
          </button>
        </div>
        <div className="bc-modal__body">{children}</div>
        {footer !== null && (
          <div className="bc-modal__footer">
            {footer ?? (
              <>
                <Button type="gray" onClick={onCancel ?? onClose}>
                  {cancelText}
                </Button>
                <Button type="primary" onClick={onOk}>
                  {okText}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};
