export type TableState = {
  columns: {
    fieldName: string;
    sortKey?: string;
  }[];
  data: {
    [key: string]: string;
  }[];
};
