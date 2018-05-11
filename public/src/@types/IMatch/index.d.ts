export interface ILogo {
  [index: string]: string;
}

export interface IMatchListProps {
  type: string;
}

export interface IMatchList extends IMatchListProps {
  id: string;
  isLoaded: boolean;
  logosUrl: string;
  list: object[];
  logos: ILogo;
}

export interface IMatch {
  awayLogo?: string;
  awayScore?: number;
  awayTeam: string;
  classes?: any;
  homeLogo?: string;
  homeScore?: number;
  homeTeam: string;
}
