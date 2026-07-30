import React, { useEffect, useRef, useState } from 'react';
import './Dropdown.css';

export interface DropdownOption {
  key: string;
  label: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  options: DropdownOption[];
  children: React.ReactElement;
  placement?: 'bottom-left' | 'bottom-right';
}

/** Beast Core Dropdown §5.19 */
export const Dropdown: React.FC<DropdownProps> = ({ options, children, placement = 'bottom-left' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <span className="bc-dropdown-wrap" ref={ref}>
      <span onClick={() => setOpen((o) => !o)}>{children}</span>
      {open && (
        <ul className={['bc-dropdown-menu', `bc-dropdown-menu--${placement}`].join(' ')}>
          {options.map((opt) => (
            <li
              key={opt.key}
              className={['bc-dropdown-menu__item', opt.danger ? 'bc-dropdown-menu__item--danger' : ''].filter(Boolean).join(' ')}
              onClick={() => {
                setOpen(false);
                opt.onClick?.();
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </span>
  );
};
