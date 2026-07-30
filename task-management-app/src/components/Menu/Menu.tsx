import React from 'react';
import './Menu.css';

export interface MenuItemType {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface MenuProps {
  items: MenuItemType[];
  selectedKey: string;
  onSelect: (key: string) => void;
  collapsed?: boolean;
}

/** Beast Core Menu §5.19 */
export const Menu: React.FC<MenuProps> = ({ items, selectedKey, onSelect, collapsed = false }) => (
  <ul className={['bc-menu', collapsed ? 'bc-menu--collapsed' : ''].filter(Boolean).join(' ')}>
    {items.map((item) => (
      <li
        key={item.key}
        className={['bc-menu__item', item.key === selectedKey ? 'bc-menu__item--active' : ''].filter(Boolean).join(' ')}
        onClick={() => onSelect(item.key)}
      >
        {item.key === selectedKey && <span className="bc-menu__indicator" />}
        {item.icon && <span className="bc-menu__icon">{item.icon}</span>}
        {!collapsed && <span className="bc-menu__label">{item.label}</span>}
      </li>
    ))}
  </ul>
);
