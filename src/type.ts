export type TableState = {
  columns: {
    fieldName: string;
    sortKey?: string;
  }[];
  data: {
    [key: string]: string;
  }[];
};

export type StateType<T> = {
  columns: TableState['columns'];
  data: T[];
};

export type Order = 'asc' | 'desc';
