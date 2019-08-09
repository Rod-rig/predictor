/* tslint:disable: object-literal-key-quotes object-literal-sort-keys*/
export const futureMatchDetailsMock = {
  generated_at: "2019-08-04T16:21:35+00:00",
  schema:
    "http://schemas.sportradar.com/bsa/soccer/v1/json/endpoints/soccer/match_summary.json",
  sport_event: {
    id: "sr:match:18427304",
    scheduled: "2019-08-09T19:00:00+00:00",
    start_time_tbd: false,
    tournament_round: { type: "group", number: 1, phase: "regular season" },
    season: {
      id: "sr:season:66441",
      name: "Premier League 19/20",
      start_date: "2019-08-09",
      end_date: "2020-05-18",
      year: "19/20",
      tournament_id: "sr:tournament:17",
    },
    tournament: {
      id: "sr:tournament:17",
      name: "Premier League",
      sport: { id: "sr:sport:1", name: "Soccer" },
      category: { id: "sr:category:1", name: "England", country_code: "ENG" },
    },
    competitors: [
      {
        id: "sr:competitor:44",
        name: "Liverpool FC",
        country: "England",
        country_code: "ENG",
        abbreviation: "LFC",
        qualifier: "home",
      },
      {
        id: "sr:competitor:263",
        name: "Norwich City",
        country: "England",
        country_code: "ENG",
        abbreviation: "NOR",
        qualifier: "away",
      },
    ],
    venue: {
      id: "sr:venue:579",
      name: "Anfield",
      capacity: 54074,
      city_name: "Liverpool",
      country_name: "England",
      map_coordinates: "53.430622,-2.960919",
      country_code: "ENG",
    },
  },
  sport_event_conditions: {
    venue: {
      id: "sr:venue:579",
      name: "Anfield",
      capacity: 54074,
      city_name: "Liverpool",
      country_name: "England",
      map_coordinates: "53.430622,-2.960919",
      country_code: "ENG",
    },
  },
  sport_event_status: { status: "not_started" },
};
