export type TableState = {
  columns: {
    name: string;
  }[];
  data: {
    [key: string]: string;
  }[];
};
