export type ParamPaginate = { page?: number; pageSize?: number; filter?: any };

export type ResultPaginate<T> = {
  list: T[];
  total: number;
  limit: number;
  page: number;
  length: number;
};
