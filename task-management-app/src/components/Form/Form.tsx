import React from 'react';
import './Form.css';

export interface FormProps {
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

/** Beast Core Form §5.3 */
export const Form: React.FC<FormProps> = ({ children, onSubmit, className = '' }) => (
  <form
    className={['bc-form', className].filter(Boolean).join(' ')}
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit?.(e);
    }}
  >
    {children}
  </form>
);

export interface FormItemProps {
  label?: React.ReactNode;
  required?: boolean;
  error?: string;
  labelWidth?: number | string;
  children?: React.ReactNode;
  className?: string;
  inline?: boolean;
}

export const FormItem: React.FC<FormItemProps> = ({
  label,
  required = false,
  error,
  labelWidth,
  children,
  className = '',
  inline = true,
}) => (
  <div
    className={[
      'bc-form-item',
      inline ? 'bc-form-item--inline' : '',
      error ? 'bc-form-item--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {label !== undefined && (
      <label className="bc-form-item__label" style={labelWidth !== undefined ? { width: labelWidth, flex: `0 0 ${labelWidth}` } : undefined}>
        {required && <span className="bc-form-item__required">*</span>}
        {label}
      </label>
    )}
    <div className="bc-form-item__content">
      {children}
      {error && <div className="bc-form-item__error-text">{error}</div>}
    </div>
  </div>
);
