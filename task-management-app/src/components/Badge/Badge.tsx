import React from 'react';
import './Badge.css';

export interface BadgeProps {
  count?: number;
  dot?: boolean;
  size?: 'medium' | 'large';
  max?: number;
  children?: React.ReactNode;
  className?: string;
}

/** Beast Core Badge §5.8 */
export const Badge: React.FC<BadgeProps> = ({
  count = 0,
  dot = false,
  size = 'medium',
  max = 99,
  children,
  className = '',
}) => {
  const showBadge = dot || count > 0;
  const display = count > max ? `${max}+` : `${count}`;

  return (
    <span className={['bc-badge-wrap', className].filter(Boolean).join(' ')}>
      {children}
      {showBadge && (
        <span
          className={[
            'bc-badge',
            `bc-badge--${size}`,
            dot ? 'bc-badge--dot' : '',
            !children ? 'bc-badge--standalone' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {!dot && display}
        </span>
      )}
    </span>
  );
};
