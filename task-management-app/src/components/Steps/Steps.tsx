import React from 'react';
import './Steps.css';
import { IconCheck } from '../Icon/Icon';

export interface StepItem {
  title: string;
  description?: string;
}

export interface StepsProps {
  items: StepItem[];
  current: number;
}

/** Beast Core Step §5.18 */
export const Steps: React.FC<StepsProps> = ({ items, current }) => (
  <div className="bc-steps">
    {items.map((item, index) => {
      const status = index < current ? 'finish' : index === current ? 'process' : 'wait';
      return (
        <div key={item.title} className={`bc-step bc-step--${status}`}>
          <div className="bc-step__icon">
            {status === 'finish' ? <IconCheck size={12} /> : <span>{index + 1}</span>}
          </div>
          <div className="bc-step__content">
            <div className="bc-step__title">{item.title}</div>
            {item.description && <div className="bc-step__desc">{item.description}</div>}
          </div>
          {index < items.length - 1 && <div className="bc-step__line" />}
        </div>
      );
    })}
  </div>
);
