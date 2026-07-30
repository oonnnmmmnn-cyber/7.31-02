import React from 'react';
import './Tabs.css';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  badge?: number;
}

export type TabsType = 'line' | 'card' | 'capsule' | 'reunit';

export interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  type?: TabsType;
}

/** Beast Core Tab §5.16 */
export const Tabs: React.FC<TabsProps> = ({ items, activeKey, onChange, type = 'line' }) => (
  <div className={['bc-tabs', `bc-tabs--${type}`].join(' ')}>
    {items.map((item) => (
      <button
        key={item.key}
        type="button"
        className={['bc-tabs__item', item.key === activeKey ? 'bc-tabs__item--active' : ''].filter(Boolean).join(' ')}
        onClick={() => onChange(item.key)}
      >
        {item.label}
        {item.badge !== undefined && item.badge > 0 && (
          <span className="bc-tabs__badge">{item.badge}</span>
        )}
      </button>
    ))}
  </div>
);
