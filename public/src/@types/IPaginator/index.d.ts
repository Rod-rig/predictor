export interface IPaginatorProps {
  url: string;
}

export interface IPaginator<Data = any> {
  data: Data;
  initialData: Data;
  isLoaded: boolean;
  url: string;
  page: number;
  handlePageChange: (event: any, page: number) => void;
}
