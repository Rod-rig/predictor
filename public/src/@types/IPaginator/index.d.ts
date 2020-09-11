export interface IPaginatorProps {
  url: string;
}

export interface IPaginator<Data = any> {
  data: Data;
  handlePageChange: (event: any, page: number) => void;
  initialData: Data;
  isLoaded: boolean;
  page: number;
  url: string;
}
