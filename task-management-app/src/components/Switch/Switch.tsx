import React from 'react';
import './Switch.css';
import { IconLoading } from '../Icon/Icon';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium';
  className?: string;
}

/** Beast Core Switch §5.6 */
export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  loading = false,
  size = 'medium',
  className = '',
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled || loading}
    onClick={() => onChange?.(!checked)}
    className={[
      'bc-switch',
      `bc-switch--${size}`,
      checked ? 'bc-switch--checked' : '',
      disabled ? 'bc-switch--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <span className="bc-switch__dot">{loading && <IconLoading size={size === 'small' ? 8 : 12} />}</span>
  </button>
);
