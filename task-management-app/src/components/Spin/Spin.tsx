import React from 'react';
import './Spin.css';
import { IconLoading } from '../Icon/Icon';

export interface SpinProps {
  spinning?: boolean;
  tip?: string;
  fullscreen?: boolean;
  children?: React.ReactNode;
}

/** Beast Core Spin §5.15 */
export const Spin: React.FC<SpinProps> = ({ spinning = false, tip, fullscreen = false, children }) => {
  if (children === undefined) {
    return spinning ? (
      <div className={fullscreen ? 'bc-spin-mask bc-spin-mask--fullscreen' : 'bc-spin-mask'}>
        <div className="bc-spin__content">
          <IconLoading size={28} />
          {tip && <div className="bc-spin__tip">{tip}</div>}
        </div>
      </div>
    ) : null;
  }
  return (
    <div className="bc-spin-container">
      {children}
      {spinning && (
        <div className="bc-spin-mask">
          <div className="bc-spin__content">
            <IconLoading size={28} />
            {tip && <div className="bc-spin__tip">{tip}</div>}
          </div>
        </div>
      )}
    </div>
  );
};
