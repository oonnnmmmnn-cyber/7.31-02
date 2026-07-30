import React from 'react';
import './Tag.css';
import { IconClose } from '../Icon/Icon';

export type TagType = 'info' | 'warn' | 'danger' | 'success' | 'fail' | 'gray';

export interface TagProps {
  type?: TagType;
  size?: 'small' | 'medium' | 'large';
  dot?: boolean;
  closable?: boolean;
  onClose?: (e?: React.MouseEvent) => void;
  children?: React.ReactNode;
  className?: string;
}

/** Beast Core Tag §5.7 */
export const Tag: React.FC<TagProps> = ({
  type = 'info',
  size = 'medium',
  dot = false,
  closable = false,
  onClose,
  children,
  className = '',
}) => (
  <span className={['bc-tag', `bc-tag--${type}`, `bc-tag--${size}`, className].filter(Boolean).join(' ')}>
    {dot && <span className="bc-tag__dot" />}
    <span className="bc-tag__text">{children}</span>
    {closable && (
      <button type="button" className="bc-tag__close" onClick={onClose} aria-label="close">
        <IconClose size={8} />
      </button>
    )}
  </span>
);
