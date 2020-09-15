import * as React from "react";

export interface IPaginatorProps {
  url: string;
}

export interface IPaginator<Data = any> {
  data: Data;
  handlePageChange: (
    event: React.ChangeEvent<{ value: string }>,
    page: number,
  ) => void;
  handleSeasonChange: (event: React.ChangeEvent<{ value: string }>) => void;
  initialData: Data;
  isLoaded: boolean;
  page: number;
  season: string;
  url: string;
}
