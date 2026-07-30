import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Select.css';
import { IconDown, IconClear } from '../Icon/Icon';
import { Tag } from '../Tag/Tag';

export interface SelectOption {
  label: string;
  value: string;
}

export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectProps {
  options: SelectOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  size?: SelectSize;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  isError?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Beast Core Select §5.4 —— 非原生控件，自定义容器 + 下拉面板。
 */
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = '请选择',
  size = 'medium',
  multiple = false,
  searchable = false,
  clearable = false,
  disabled = false,
  isError = false,
  style,
  className = '',
}) => {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<string | string[]>(
    defaultValue ?? (multiple ? [] : ''),
  );
  const currentValue = isControlled ? value! : innerValue;
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setKeyword('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectedValues = multiple
    ? ((currentValue as string[]) ?? [])
    : currentValue
      ? [currentValue as string]
      : [];

  const filteredOptions = useMemo(
    () =>
      keyword
        ? options.filter((o) => o.label.toLowerCase().includes(keyword.toLowerCase()))
        : options,
    [keyword, options],
  );

  const commit = (next: string | string[]) => {
    if (!isControlled) setInnerValue(next);
    onChange?.(next);
  };

  const handleSelect = (opt: SelectOption) => {
    if (multiple) {
      const set = new Set(selectedValues);
      if (set.has(opt.value)) set.delete(opt.value);
      else set.add(opt.value);
      commit(Array.from(set));
    } else {
      commit(opt.value);
      setOpen(false);
      setKeyword('');
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    commit(multiple ? [] : '');
  };

  const labelOf = (v: string) => options.find((o) => o.value === v)?.label ?? v;

  return (
    <div
      ref={rootRef}
      style={style}
      className={[
        'bc-select',
        `bc-select--${size}`,
        open ? 'bc-select--open' : '',
        disabled ? 'bc-select--disabled' : '',
        isError ? 'bc-select--error' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className="bc-select__control"
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        <div className="bc-select__values">
          {selectedValues.length === 0 && !keyword && (
            <span className="bc-select__placeholder">{placeholder}</span>
          )}
          {multiple
            ? selectedValues.map((v) => (
                <Tag
                  key={v}
                  type="info"
                  size="small"
                  closable
                  onClose={(e) => {
                    e?.stopPropagation();
                    commit(selectedValues.filter((x) => x !== v));
                  }}
                >
                  {labelOf(v)}
                </Tag>
              ))
            : !keyword && selectedValues[0] && (
                <span className="bc-select__single-value">{labelOf(selectedValues[0])}</span>
              )}
          {searchable && (open || keyword) && (
            <input
              className="bc-select__search"
              autoFocus
              value={keyword}
              placeholder={selectedValues.length ? '' : ''}
              onChange={(e) => setKeyword(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
        <span className="bc-select__icons">
          {clearable && selectedValues.length > 0 && !disabled && (
            <button
              type="button"
              className="bc-select__clear"
              onClick={handleClear}
              aria-label="clear"
            >
              <IconClear size={14} />
            </button>
          )}
          <IconDown size={14} className="bc-select__arrow" />
        </span>
      </div>
      {open && (
        <div className="bc-select__panel">
          {filteredOptions.length === 0 ? (
            <div className="bc-select__empty">
              暂无数据 · <a onClick={() => setKeyword('')}>刷新</a>
            </div>
          ) : (
            <ul className="bc-select__options">
              {filteredOptions.map((opt) => {
                const active = selectedValues.includes(opt.value);
                return (
                  <li
                    key={opt.value}
                    className={['bc-select__option', active ? 'bc-select__option--active' : '']
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handleSelect(opt)}
                  >
                    {opt.label}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
