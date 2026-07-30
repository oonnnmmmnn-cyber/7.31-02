import React from 'react';
import './Card.css';
import { IconCheck } from '../Icon/Icon';

export interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  cover?: React.ReactNode;
  footer?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Beast Core Card §5.9 —— 默认直角，选中态右上角三角勾选标 */
export const Card: React.FC<CardProps> = ({
  title,
  extra,
  cover,
  footer,
  selected = false,
  onClick,
  children,
  className = '',
  style,
}) => (
  <div
    className={['bc-card', selected ? 'bc-card--selected' : '', className].filter(Boolean).join(' ')}
    onClick={onClick}
    style={style}
  >
    {selected && (
      <span className="bc-card__checked-triangle">
        <IconCheck size={12} className="bc-card__checked-icon" />
      </span>
    )}
    {cover && <div className="bc-card__cover">{cover}</div>}
    {(title || extra) && (
      <div className="bc-card__header">
        <span className="bc-card__title">{title}</span>
        {extra && <span className="bc-card__extra">{extra}</span>}
      </div>
    )}
    <div className="bc-card__body">{children}</div>
    {footer && <div className="bc-card__footer">{footer}</div>}
  </div>
);
