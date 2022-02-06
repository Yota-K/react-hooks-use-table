import { useState, useMemo } from 'react';
import { TableState } from './type';

type StateType<T> = {
  columns: TableState['columns'];
  data: T[];
};

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

  const [tableLoading, setTableLoading] = useState(true);

  const tableItems = useMemo(() => data, [data]);

  const filterTableItems = (keyqord: string) => {
    const filterItems = tableItems.filter((e) => Object.values(e).join(',').includes(keyqord));
    setTableData({
      columns,
      data: filterItems,
    });
  };

  return { tableData, setTableData, tableLoading, setTableLoading, filterTableItems };
};
