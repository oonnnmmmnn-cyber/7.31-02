import React from 'react';

export interface RowProps {
  gutter?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Beast Core Grid §5.21 —— 基于 flex 的百分比栅格 */
export const Row: React.FC<RowProps> = ({ gutter = 16, children, className = '', style }) => (
  <div
    className={className}
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      marginLeft: -gutter / 2,
      marginRight: -gutter / 2,
      ...style,
    }}
  >
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child as React.ReactElement<any>, {
            style: { paddingLeft: gutter / 2, paddingRight: gutter / 2, ...(child.props as any).style },
          })
        : child,
    )}
  </div>
);

export interface ColProps {
  span?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Col: React.FC<ColProps> = ({ span = 24, children, className = '', style }) => (
  <div className={className} style={{ width: `${(span / 24) * 100}%`, boxSizing: 'border-box', ...style }}>
    {children}
  </div>
);
