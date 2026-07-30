import React, { useState } from 'react';
import './Collapse.css';
import { IconDown } from '../Icon/Icon';

export interface CollapsePanel {
  key: string;
  header: React.ReactNode;
  content: React.ReactNode;
}

export interface CollapseProps {
  panels: CollapsePanel[];
  defaultActiveKeys?: string[];
}

/** Beast Core Collapse §5.20 */
export const Collapse: React.FC<CollapseProps> = ({ panels, defaultActiveKeys = [] }) => {
  const [active, setActive] = useState<string[]>(defaultActiveKeys);

  const toggle = (key: string) => {
    setActive((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  return (
    <div className="bc-collapse">
      {panels.map((panel) => {
        const open = active.includes(panel.key);
        return (
          <div key={panel.key} className="bc-collapse__panel">
            <div className="bc-collapse__header" onClick={() => toggle(panel.key)}>
              <IconDown size={12} className={['bc-collapse__arrow', open ? 'bc-collapse__arrow--open' : ''].filter(Boolean).join(' ')} />
              <span>{panel.header}</span>
            </div>
            {open && <div className="bc-collapse__content">{panel.content}</div>}
          </div>
        );
      })}
    </div>
  );
};
