import React from 'react';
import './Divider.css';

export interface DividerProps {
  direction?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
  className?: string;
}

/** Beast Core Divider §5.20 */
export const Divider: React.FC<DividerProps> = ({ direction = 'horizontal', children, className = '' }) => {
  if (direction === 'vertical') {
    return <span className={['bc-divider bc-divider--vertical', className].filter(Boolean).join(' ')} />;
  }
  if (children) {
    return (
      <div className={['bc-divider-text-wrap', className].filter(Boolean).join(' ')}>
        <span className="bc-divider bc-divider--horizontal" />
        <span className="bc-divider-text">{children}</span>
        <span className="bc-divider bc-divider--horizontal" />
      </div>
    );
  }
  return <div className={['bc-divider bc-divider--horizontal', className].filter(Boolean).join(' ')} />;
};
