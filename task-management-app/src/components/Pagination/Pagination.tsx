import React, { useMemo, useState } from 'react';
import './Pagination.css';
import { IconLeft, IconRight } from '../Icon/Icon';
import { Select } from '../Select/Select';

export interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  showJumper?: boolean;
  toRight?: boolean;
}

/** Beast Core Pagination §5.17 */
export const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  pageSize,
  onChange,
  showSizeChanger = true,
  showJumper = true,
  toRight = true,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [jumpValue, setJumpValue] = useState('');

  const pages = useMemo(() => {
    const list: (number | 'ellipsis')[] = [];
    const windowSize = 2;
    for (let i = 1; i <= totalPages; i += 1) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= current - windowSize && i <= current + windowSize)
      ) {
        list.push(i);
      } else if (list[list.length - 1] !== 'ellipsis') {
        list.push('ellipsis');
      }
    }
    return list;
  }, [current, totalPages]);

  const goto = (p: number) => {
    const next = Math.min(totalPages, Math.max(1, p));
    onChange(next, pageSize);
  };

  return (
    <div className={['bc-pagination', toRight ? 'bc-pagination--right' : ''].filter(Boolean).join(' ')}>
      <span className="bc-pagination__total">共有 {total} 条</span>
      <div className="bc-pagination__pages">
        <button
          type="button"
          className="bc-pagination__arrow"
          disabled={current <= 1}
          onClick={() => goto(current - 1)}
          aria-label="prev"
        >
          <IconLeft size={10} />
        </button>
        {pages.map((p, idx) =>
          p === 'ellipsis' ? (
            <span key={`e-${idx}`} className="bc-pagination__jump">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={['bc-pagination__item', p === current ? 'bc-pagination__item--active' : ''].filter(Boolean).join(' ')}
              onClick={() => goto(p)}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          className="bc-pagination__arrow"
          disabled={current >= totalPages}
          onClick={() => goto(current + 1)}
          aria-label="next"
        >
          <IconRight size={10} />
        </button>
      </div>
      {showJumper && (
        <span className="bc-pagination__jumper">
          前往
          <input
            className="bc-pagination__jump-input"
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value.replace(/\D/g, ''))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && jumpValue) {
                goto(Number(jumpValue));
                setJumpValue('');
              }
            }}
          />
          页
        </span>
      )}
      {showSizeChanger && (
        <span className="bc-pagination__size-changer">
          <Select
            size="small"
            style={{ width: 108 }}
            value={String(pageSize)}
            options={[
              { label: '10 条/页', value: '10' },
              { label: '20 条/页', value: '20' },
              { label: '50 条/页', value: '50' },
            ]}
            onChange={(v) => onChange(1, Number(v))}
          />
        </span>
      )}
    </div>
  );
};
