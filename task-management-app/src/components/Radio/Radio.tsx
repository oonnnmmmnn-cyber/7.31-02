import React from 'react';
import './Radio.css';

export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  mode?: 'default' | 'button' | 'buttonGhost';
  size?: 'small' | 'medium';
  disabled?: boolean;
  className?: string;
}

/** Beast Core Radio §5.5 —— 非原生控件，支持 tab 胶囊 / 按钮形态 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  mode = 'default',
  size = 'medium',
  disabled = false,
  className = '',
}) => (
  <div
    className={[
      'bc-radio-group',
      mode !== 'default' ? `bc-radio-group--${mode}` : '',
      `bc-radio-group--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {options.map((opt) => {
      const checked = value === opt.value;
      if (mode === 'default') {
        return (
          <label
            key={opt.value}
            className={['bc-radio', disabled ? 'bc-radio--disabled' : ''].filter(Boolean).join(' ')}
          >
            <input
              type="radio"
              className="bc-radio__native"
              checked={checked}
              disabled={disabled}
              onChange={() => onChange?.(opt.value)}
            />
            <span className={['bc-radio__circle', checked ? 'bc-radio__circle--checked' : ''].filter(Boolean).join(' ')}>
              {checked && <span className="bc-radio__dot" />}
            </span>
            <span className="bc-radio__label">{opt.label}</span>
          </label>
        );
      }
      return (
        <button
          key={opt.value}
          type="button"
          disabled={disabled}
          className={['bc-radio-btn', checked ? 'bc-radio-btn--active' : ''].filter(Boolean).join(' ')}
          onClick={() => onChange?.(opt.value)}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
);
