import React, { useState } from 'react';
import './AppLayout.css';
import { Menu } from '../components/Menu/Menu';
import { Breadcrumb } from '../components/Breadcrumb/Breadcrumb';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { Badge } from '../components/Badge/Badge';
import { Tooltip } from '../components/Tooltip/Tooltip';
import { IconBell, IconMenu } from '../components/Icon/Icon';

export type PageKey = 'task-list' | 'gallery';

interface AppLayoutProps {
  activeKey: PageKey;
  onSelect: (key: PageKey) => void;
  breadcrumb: { label: string; onClick?: () => void }[];
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ activeKey, onSelect, breadcrumb, children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__left">
          <button className="app-header__collapse" onClick={() => setCollapsed((c) => !c)} aria-label="toggle menu">
            <IconMenu size={16} />
          </button>
          <span className="app-header__logo">Beast&nbsp;Core</span>
          <span className="app-header__title">任务管理中心</span>
        </div>
        <div className="app-header__right">
          <Tooltip content="消息通知" placement="bottom">
            <Badge count={5} className="app-header__badge">
              <IconBell size={18} />
            </Badge>
          </Tooltip>
          <Dropdown
            placement="bottom-right"
            options={[
              { key: 'profile', label: '个人中心' },
              { key: 'setting', label: '账号设置' },
              { key: 'logout', label: '退出登录', danger: true },
            ]}
          >
            <span className="app-header__user">
              <span className="app-header__avatar">林</span>
              <span className="app-header__username">林晓雯</span>
            </span>
          </Dropdown>
        </div>
      </header>
      <div className="app-body">
        <aside className={['app-sider', collapsed ? 'app-sider--collapsed' : ''].filter(Boolean).join(' ')}>
          <Menu
            collapsed={collapsed}
            selectedKey={activeKey}
            onSelect={(key) => onSelect(key as PageKey)}
            items={[
              { key: 'task-list', label: '任务管理列表' },
              { key: 'gallery', label: '组件规范速查' },
            ]}
          />
        </aside>
        <main className="app-main">
          <div className="app-main__breadcrumb">
            <Breadcrumb items={breadcrumb} />
          </div>
          <div className="app-main__content">{children}</div>
        </main>
      </div>
    </div>
  );
};
