import React from 'react';

export interface SpaceProps {
  size?: number;
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'center' | 'end' | 'baseline';
  wrap?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Beast Core Space §5.21 */
export const Space: React.FC<SpaceProps> = ({
  size = 8,
  direction = 'horizontal',
  align = 'center',
  wrap = false,
  children,
  className = '',
  style,
}) => (
  <div
    className={className}
    style={{
      display: 'flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      alignItems: direction === 'horizontal' ? align : 'stretch',
      gap: size,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      ...style,
    }}
  >
    {children}
  </div>
);
