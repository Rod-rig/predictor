export interface ITournament {
  category: {
    country_code?: string;
    id: string;
    name: string;
  };
  current_season?: {
    end_date: string;
    id: string;
    name: string;
    start_date: string;
    year: string;
  };
  id: string;
  img?: string;
  name: string;
  sport?: {
    id: string;
    name: string;
  };
}

export interface ITournamentList {
  isLoaded: boolean;
  list: ITournament[];
}
