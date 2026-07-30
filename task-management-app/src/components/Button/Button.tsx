import React from 'react';
import './Button.css';
import { IconLoading } from '../Icon/Icon';

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'danger'
  | 'secondaryDanger'
  | 'grayDanger'
  | 'textPrimary'
  | 'text'
  | 'textTip';

export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: ButtonType;
  htmlType?: 'button' | 'submit' | 'reset';
  size?: ButtonSize;
  loading?: boolean;
  iconOnly?: boolean;
  icon?: React.ReactNode;
}

/**
 * Beast Core Button §5.1
 * 8 种类型 x 三档尺寸，遵循 default/hover/active/disabled 四态。
 */
export const Button: React.FC<ButtonProps> = ({
  type = 'secondary',
  htmlType = 'button',
  size = 'medium',
  loading = false,
  iconOnly = false,
  icon,
  disabled,
  className = '',
  children,
  ...rest
}) => {
  const isTip = type === 'textTip';
  return (
    <button
      type={htmlType}
      className={[
        'bc-btn',
        `bc-btn--${type}`,
        `bc-btn--${size}`,
        iconOnly ? 'bc-btn--icon-only' : '',
        loading ? 'bc-btn--loading' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled || loading || isTip}
      {...rest}
    >
      {loading && <IconLoading className="bc-btn__loading-icon" size={size === 'large' ? 16 : 14} />}
      {!loading && icon && <span className="bc-btn__icon">{icon}</span>}
      {children != null && <span className="bc-btn__text">{children}</span>}
    </button>
  );
};
