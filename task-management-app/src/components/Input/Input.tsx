import React, { useState } from 'react';
import './Input.css';
import { IconClear, IconEye, IconEyeOff } from '../Icon/Icon';

export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: InputSize;
  isError?: boolean;
  displayType?: 'default' | 'simple';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  onClear?: () => void;
  password?: boolean;
}

/** Beast Core Input §5.2 */
export const Input: React.FC<InputProps> = ({
  size = 'medium',
  isError = false,
  displayType = 'default',
  prefix,
  suffix,
  allowClear = false,
  onClear,
  password = false,
  className = '',
  value,
  disabled,
  type,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  const showClear = allowClear && !!value && !disabled;
  const inputType = password ? (visible ? 'text' : 'password') : type ?? 'text';

  return (
    <span
      className={[
        'bc-input-wrap',
        `bc-input-wrap--${size}`,
        `bc-input-wrap--${displayType}`,
        isError ? 'bc-input-wrap--error' : '',
        disabled ? 'bc-input-wrap--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {prefix && <span className="bc-input__addon bc-input__prefix">{prefix}</span>}
      <input
        className="bc-input"
        value={value}
        disabled={disabled}
        type={inputType}
        {...rest}
      />
      {showClear && (
        <button
          type="button"
          className="bc-input__clear"
          aria-label="clear"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onClear}
        >
          <IconClear size={14} />
        </button>
      )}
      {password && (
        <button
          type="button"
          className="bc-input__eye"
          aria-label="toggle visibility"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <IconEyeOff size={14} /> : <IconEye size={14} />}
        </button>
      )}
      {suffix && <span className="bc-input__addon bc-input__suffix">{suffix}</span>}
    </span>
  );
};

export const TextArea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { isError?: boolean }
> = ({ className = '', isError, ...rest }) => (
  <textarea
    className={['bc-textarea', isError ? 'bc-textarea--error' : '', className]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  />
);
