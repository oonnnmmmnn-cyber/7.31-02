import React, { useEffect, useRef, useState } from 'react';
import './DatePicker.css';
import { IconCalendar, IconClear, IconLeft, IconRight } from '../Icon/Icon';
import { formatDate, getMonthMatrix, isSameDay } from './calendarUtils';

const WEEK_LABELS = ['日', '一', '二', '三', '四', '五', '六'];

interface CalendarPanelProps {
  viewDate: Date;
  setViewDate: (d: Date) => void;
  onSelect: (d: Date) => void;
  isInRange?: (d: Date) => boolean;
  isSelected?: (d: Date) => boolean;
}

const CalendarPanel: React.FC<CalendarPanelProps> = ({ viewDate, setViewDate, onSelect, isInRange, isSelected }) => {
  const matrix = getMonthMatrix(viewDate.getFullYear(), viewDate.getMonth());
  const today = new Date();

  return (
    <div className="bc-datepicker__panel">
      <div className="bc-datepicker__panel-header">
        <button
          type="button"
          className="bc-datepicker__nav"
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
        >
          <IconLeft size={10} />
        </button>
        <span className="bc-datepicker__panel-title">
          {viewDate.getFullYear()} 年 {viewDate.getMonth() + 1} 月
        </span>
        <button
          type="button"
          className="bc-datepicker__nav"
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
        >
          <IconRight size={10} />
        </button>
      </div>
      <div className="bc-datepicker__weekrow">
        {WEEK_LABELS.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      <div className="bc-datepicker__grid">
        {matrix.map((d) => {
          const outside = d.getMonth() !== viewDate.getMonth();
          const isToday = isSameDay(d, today);
          const selected = isSelected?.(d);
          const inRange = isInRange?.(d);
          return (
            <button
              type="button"
              key={d.toISOString()}
              className={[
                'bc-datepicker__cell',
                outside ? 'bc-datepicker__cell--outside' : '',
                isToday ? 'bc-datepicker__cell--today' : '',
                selected ? 'bc-datepicker__cell--selected' : '',
                inRange ? 'bc-datepicker__cell--in-range' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onSelect(d)}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
}

/** Beast Core DatePicker §5.23 —— 非原生控件 */
export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = '请选择日期',
  size = 'medium',
  style,
}) => {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={rootRef} style={style} className={['bc-datepicker', `bc-datepicker--${size}`].join(' ')}>
      <div className="bc-datepicker__control" onClick={() => setOpen((o) => !o)}>
        <IconCalendar size={14} className="bc-datepicker__calendar-icon" />
        <span className={value ? 'bc-datepicker__value' : 'bc-datepicker__placeholder'}>
          {value || placeholder}
        </span>
        {value && (
          <button
            type="button"
            className="bc-datepicker__clear"
            onClick={(e) => {
              e.stopPropagation();
              onChange?.('');
            }}
          >
            <IconClear size={12} />
          </button>
        )}
      </div>
      {open && (
        <CalendarPanel
          viewDate={viewDate}
          setViewDate={setViewDate}
          isSelected={(d) => !!value && formatDate(d) === value}
          onSelect={(d) => {
            onChange?.(formatDate(d));
            setOpen(false);
          }}
        />
      )}
    </div>
  );
};

export interface RangePickerProps {
  value?: [string, string];
  onChange?: (value: [string, string]) => void;
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
}

/** Beast Core RangePicker §5.23 */
export const RangePicker: React.FC<RangePickerProps> = ({ value, onChange, size = 'medium', style }) => {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(value?.[0] ?? '');
  const [end, setEnd] = useState(value?.[1] ?? '');
  const [picking, setPicking] = useState<'start' | 'end'>('start');
  const [viewDate, setViewDate] = useState(new Date());
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (d: Date) => {
    const str = formatDate(d);
    if (picking === 'start' || (start && end)) {
      setStart(str);
      setEnd('');
      setPicking('end');
    } else {
      if (new Date(str) < new Date(start)) {
        setEnd(start);
        setStart(str);
      } else {
        setEnd(str);
      }
      setPicking('start');
      onChange?.([start > str ? str : start, start > str ? start : str]);
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} style={style} className={['bc-datepicker bc-rangepicker', `bc-datepicker--${size}`].join(' ')}>
      <div className="bc-datepicker__control" onClick={() => setOpen((o) => !o)}>
        <IconCalendar size={14} className="bc-datepicker__calendar-icon" />
        <span className={start ? 'bc-datepicker__value' : 'bc-datepicker__placeholder'}>{start || '开始日期'}</span>
        <span className="bc-rangepicker__sep">~</span>
        <span className={end ? 'bc-datepicker__value' : 'bc-datepicker__placeholder'}>{end || '结束日期'}</span>
      </div>
      {open && (
        <CalendarPanel
          viewDate={viewDate}
          setViewDate={setViewDate}
          isSelected={(d) => (!!start && formatDate(d) === start) || (!!end && formatDate(d) === end)}
          isInRange={(d) => !!start && !!end && new Date(formatDate(d)) > new Date(start) && new Date(formatDate(d)) < new Date(end)}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};
