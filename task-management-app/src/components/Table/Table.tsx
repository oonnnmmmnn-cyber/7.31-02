import React, { useMemo, useState } from 'react';
import './Table.css';
import { Checkbox } from '../Checkbox/Checkbox';
import { IconDown } from '../Icon/Icon';
import { Spin } from '../Spin/Spin';

export interface ColumnType<T> {
  key: string;
  title: React.ReactNode;
  dataIndex?: keyof T;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface TableProps<T> {
  columns: ColumnType<T>[];
  dataSource: T[];
  rowKey: (record: T) => string;
  rowSelection?: {
    selectedRowKeys: string[];
    onChange: (keys: string[]) => void;
  };
  loading?: boolean;
  zebra?: boolean;
  emptyText?: React.ReactNode;
}

/** Beast Core Table §5.10 */
export function Table<T>({
  columns,
  dataSource,
  rowKey,
  rowSelection,
  loading = false,
  zebra = false,
  emptyText = '暂无数据',
}: TableProps<T>) {
  const [sortState, setSortState] = useState<{ key: string; order: 'asc' | 'desc' | null }>({
    key: '',
    order: null,
  });

  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.order) return dataSource;
    const col = columns.find((c) => c.key === sortState.key);
    if (!col?.dataIndex) return dataSource;
    const copy = [...dataSource];
    copy.sort((a, b) => {
      const av = a[col.dataIndex as keyof T];
      const bv = b[col.dataIndex as keyof T];
      if (av === bv) return 0;
      const res = av! > bv! ? 1 : -1;
      return sortState.order === 'asc' ? res : -res;
    });
    return copy;
  }, [dataSource, sortState, columns]);

  const toggleSort = (key: string) => {
    setSortState((prev) => {
      if (prev.key !== key) return { key, order: 'asc' };
      if (prev.order === 'asc') return { key, order: 'desc' };
      if (prev.order === 'desc') return { key: '', order: null };
      return { key, order: 'asc' };
    });
  };

  const allKeys = dataSource.map(rowKey);
  const allChecked = rowSelection ? allKeys.length > 0 && allKeys.every((k) => rowSelection.selectedRowKeys.includes(k)) : false;
  const someChecked = rowSelection ? allKeys.some((k) => rowSelection.selectedRowKeys.includes(k)) && !allChecked : false;

  const toggleAll = () => {
    if (!rowSelection) return;
    rowSelection.onChange(allChecked ? [] : allKeys);
  };

  const toggleOne = (key: string) => {
    if (!rowSelection) return;
    const set = new Set(rowSelection.selectedRowKeys);
    if (set.has(key)) set.delete(key);
    else set.add(key);
    rowSelection.onChange(Array.from(set));
  };

  return (
    <div className="bc-table-wrap">
      <Spin spinning={loading}>
        <table className="bc-table">
          <thead>
            <tr>
              {rowSelection && (
                <th className="bc-table__th bc-table__th--checkbox">
                  <Checkbox checked={allChecked} indeterminate={someChecked} onChange={toggleAll} />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="bc-table__th"
                  style={{ width: col.width, textAlign: col.align ?? 'left' }}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                >
                  <span className={['bc-table__th-inner', col.sortable ? 'bc-table__th-inner--sortable' : ''].filter(Boolean).join(' ')}>
                    {col.title}
                    {col.sortable && (
                      <span className="bc-table__sort-icons">
                        <IconDown
                          size={8}
                          className={[
                            'bc-table__sort-icon bc-table__sort-icon--up',
                            sortState.key === col.key && sortState.order === 'asc' ? 'bc-table__sort-icon--active' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                        />
                        <IconDown
                          size={8}
                          className={[
                            'bc-table__sort-icon bc-table__sort-icon--down',
                            sortState.key === col.key && sortState.order === 'desc' ? 'bc-table__sort-icon--active' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                        />
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td className="bc-table__empty" colSpan={columns.length + (rowSelection ? 1 : 0)}>
                  <div className="bc-table__empty-inner">
                    <div className="bc-table__empty-icon">□</div>
                    <div className="bc-table__empty-title">暂无数据</div>
                    <div className="bc-table__empty-desc">{emptyText}</div>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((record, index) => {
                const key = rowKey(record);
                const checked = rowSelection?.selectedRowKeys.includes(key) ?? false;
                return (
                  <tr
                    key={key}
                    className={[
                      'bc-table__tr',
                      zebra && index % 2 === 1 ? 'bc-table__tr--zebra' : '',
                      checked ? 'bc-table__tr--selected' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {rowSelection && (
                      <td className="bc-table__td bc-table__td--checkbox">
                        <Checkbox checked={checked} onChange={() => toggleOne(key)} />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className="bc-table__td" style={{ textAlign: col.align ?? 'left' }}>
                        {col.render
                          ? col.render(col.dataIndex ? record[col.dataIndex] : undefined, record, index)
                          : col.dataIndex
                            ? String(record[col.dataIndex] ?? '')
                            : null}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </Spin>
    </div>
  );
}
