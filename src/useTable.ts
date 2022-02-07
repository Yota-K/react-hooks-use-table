import { useState, useMemo, useCallback } from 'react';
import { TableState } from './type';

type StateType<T> = {
  columns: TableState['columns'];
  data: T[];
};

type Order = 'asc' | 'desc';

export const useTable = <T extends { [T: string]: string }>(
  columns: StateType<T>['columns'],
  data: StateType<T>['data']
) => {
  const [tableData, setTableData] = useState<{
    columns: StateType<T>['columns'];
    data: StateType<T>['data'];
  }>({
    columns,
    data,
  });

  const [sort, setSort] = useState<Order>('desc');

  const generateTableRow = (ary: T[]) => ary.map((e) => Object.values(e));

  const tableItems = useMemo(() => data, [data]);

  const filterTableItems = useCallback(
    (keyword: string) => {
      const filterItems = tableItems.filter((e) => Object.values(e).join(',').includes(keyword));
      setTableData({
        columns,
        data: filterItems,
      });
    },
    [tableItems]
  );

  const sortTableItems = useCallback(
    (sortKey: string) => {
      let sortItems;

      if (sort === 'desc') {
        sortItems = tableItems.sort((a, b) => (a[sortKey] < b[sortKey] ? 1 : -1));
        setSort('asc');
      } else if (sort === 'asc') {
        sortItems = tableItems.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
        setSort('desc');
      }

      if (sortItems) {
        setTableData({
          columns,
          data: sortItems,
        });
      }
    },
    [tableItems, sort]
  );

  return { tableData, setTableData, generateTableRow, filterTableItems, sortTableItems };
};
