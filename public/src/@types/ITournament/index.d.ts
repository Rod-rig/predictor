export interface ITournament {
  category: {
    id: string;
    name: string;
    country_code: string;
  };
  current_season: {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    year: string;
  };
  id: string;
  img?: string;
  name: string;
}

export interface ITournamentList {
  isLoaded: boolean;
  list: ITournament[];
}
