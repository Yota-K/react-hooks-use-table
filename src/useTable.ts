import { useState, useMemo } from 'react';
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

  const tableItems = useMemo(() => data, [data]);

  const generateTableRow = (ary: T[]) => ary.map((e) => Object.values(e));

  const filterTableItems = (keyword: string) => {
    const filterItems = tableItems.filter((e) => Object.values(e).join(',').includes(keyword));
    setTableData({
      columns,
      data: filterItems,
    });
  };

  const sortTableItems = (sortKey: string) => {
    let sortItems;

    if (sort === 'desc') {
      sortItems = tableData.data.sort((a, b) => (a[sortKey] < b[sortKey] ? 1 : -1));
      setSort('asc');
    } else if (sort === 'asc') {
      sortItems = tableData.data.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
      setSort('desc');
    }

    if (sortItems) {
      setTableData({
        columns,
        data: sortItems,
      });
    }
  };

  return { tableData, setTableData, generateTableRow, filterTableItems, sortTableItems };
};
