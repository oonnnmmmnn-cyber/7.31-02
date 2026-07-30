import React from 'react';
import './Progress.css';

export interface ProgressProps {
  percent: number;
  type?: 'line' | 'circle';
  status?: 'normal' | 'exception';
  size?: number;
  showInfo?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

/** Beast Core Progress §5.14 */
export const Progress: React.FC<ProgressProps> = ({
  percent,
  type = 'line',
  status = 'normal',
  size = 80,
  showInfo = true,
  style,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, percent));
  const color = status === 'exception' ? '#ff1818' : 'var(--bc-themeColor)';

  if (type === 'circle') {
    const r = (size - 8) / 2;
    const c = 2 * Math.PI * r;
    return (
      <span className={['bc-progress-circle', className].filter(Boolean).join(' ')} style={{ width: size, height: size, ...style }}>
        <svg width={size} height={size}>
          <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--bc-trackColor)" strokeWidth={6} fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={6}
            fill="none"
            strokeDasharray={c}
            strokeDashoffset={c - (c * clamped) / 100}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: 'stroke-dashoffset 0.3s var(--bc-easeInOutCirc)' }}
          />
        </svg>
        {showInfo && <span className="bc-progress-circle__text">{clamped}%</span>}
      </span>
    );
  }

  return (
    <span className={['bc-progress-line', className].filter(Boolean).join(' ')} style={style}>
      <span className="bc-progress-line__track">
        <span
          className="bc-progress-line__fill"
          style={{ width: `${clamped}%`, background: color }}
        />
      </span>
      {showInfo && <span className="bc-progress-line__text">{clamped}%</span>}
    </span>
  );
};
