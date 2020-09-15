import * as React from "react";
import { IPredictionMatch } from "../IMatch";

export interface IStatsProps {
  url: string;
}

export interface IStats {
  data: IPredictionMatch[];
  handlePageChange: (
    event: React.ChangeEvent<{ value: string }>,
    page: number,
  ) => void;
  handleSeasonChange: (event: React.ChangeEvent<{ value: string }>) => void;
  initialData: IPredictionMatch[];
  isLoaded: boolean;
  page: number;
  season: string;
  url: string;
}
