import React from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

/** Beast Core Checkbox §5.5 —— 非原生控件，隐藏原生 input，自定义视觉层 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  children,
  className = '',
}) => (
  <label className={['bc-checkbox', disabled ? 'bc-checkbox--disabled' : '', className].filter(Boolean).join(' ')}>
    <input
      type="checkbox"
      className="bc-checkbox__native"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.checked)}
    />
    <span
      className={[
        'bc-checkbox__box',
        checked ? 'bc-checkbox__box--checked' : '',
        indeterminate ? 'bc-checkbox__box--indeterminate' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {indeterminate ? (
        <span className="bc-checkbox__indeterminate-bar" />
      ) : (
        checked && (
          <svg viewBox="0 0 1024 1024" width="10" height="10" fill="none">
            <path
              d="M180 540 400 750 844 280"
              stroke="#fff"
              strokeWidth="110"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      )}
    </span>
    {children != null && <span className="bc-checkbox__label">{children}</span>}
  </label>
);
