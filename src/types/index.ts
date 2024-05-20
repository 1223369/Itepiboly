export type searchHistory = {
  id: number;
  title: string;
  value: string;
  loading: boolean;
  taskList: never[];
  searchHistory: string[];
  pageNum: number;
  pageSize: number;
  finished: boolean;
  searchFlag: boolean;
};
