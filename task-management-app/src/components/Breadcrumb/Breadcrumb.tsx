import React from 'react';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/** Beast Core Breadcrumb §5.19 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <nav className="bc-breadcrumb">
    {items.map((item, idx) => {
      const isLast = idx === items.length - 1;
      return (
        <React.Fragment key={item.label}>
          {idx > 0 && <span className="bc-breadcrumb__sep">/</span>}
          {isLast ? (
            <span className="bc-breadcrumb__current">{item.label}</span>
          ) : (
            <span className="bc-breadcrumb__item" onClick={item.onClick}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      );
    })}
  </nav>
);
