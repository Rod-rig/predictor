/* tslint:disable: object-literal-key-quotes object-literal-sort-keys*/
export const scheduleMock = {
  generated_at:
    '2018-07-06T20:26:44+00:00',
  schema:
    'http://schemas.sportradar.com/bsa/soccer/v1/json/endpoints/soccer/schedule.json',
  sport_events:
    [
      {
        id: 'sr:match:14735959',
        scheduled: '2018-08-11T11:30:00+00:00',
        start_time_tbd: false,
        status: 'not_started',
        tournament_round: {
          type: 'group',
          number: 1,
        },
        season: {
          id: 'sr:season:54571',
          name: 'Premier League 18/19',
          start_date: '2018-08-10',
          end_date: '2019-05-13',
          year: '18/19',
          tournament_id: 'sr:tournament:17',
        },
        tournament: {
          id: 'sr:tournament:17',
          name: 'Premier League',
          sport: {
            id: 'sr:sport:1',
            name: 'Soccer',
          },
          category: {
            id: 'sr:category:1',
            name: 'England',
            country_code: 'ENG',
          },
        },
        competitors: [
          {
            id: 'sr:competitor:39',
            name: 'Newcastle United',
            country: 'England',
            country_code: 'ENG',
            abbreviation: 'NEW',
            qualifier: 'home',
          },
          {
            id: 'sr:competitor:33',
            name: 'Tottenham Hotspur',
            country: 'England',
            country_code: 'ENG',
            abbreviation: 'TOT',
            qualifier: 'away',
          },
        ],
        venue: {
          id: 'sr:venue:765',
          name: 'St James\' Park',
          capacity: 52338,
          city_name: 'Newcastle upon Tyne',
          country_name: 'England',
          map_coordinates: '54.975033,-1.615061',
          country_code: 'ENG',
        },
      },
      {
        id: 'sr:match:14730857',
        scheduled: '2018-08-11T16:30:00+00:00',
        start_time_tbd: false,
        status: 'not_started',
        tournament_round: {
          type: 'group',
          number: 1,
        },
        season: {
          id: 'sr:season:54555',
          name: 'Eredivisie 18/19',
          start_date: '2018-08-10',
          end_date: '2019-05-27',
          year: '18/19',
          tournament_id: 'sr:tournament:37',
        },
        tournament: {
          id: 'sr:tournament:37',
          name: 'Eredivisie',
          sport: {
            id: 'sr:sport:1',
            name: 'Soccer',
          },
          category: {
            id: 'sr:category:35',
            name: 'Netherlands',
            country_code: 'NLD',
          },
        },
        competitors: [
          {
            id: 'sr:competitor:2961',
            name: 'Willem II Tilburg',
            country: 'Netherlands',
            country_code: 'NLD',
            abbreviation: 'WIL',
            qualifier: 'home',
          },
          {
            id: 'sr:competitor:2980',
            name: 'VVV Venlo',
            country: 'Netherlands',
            country_code: 'NLD',
            abbreviation: 'VEN',
            qualifier: 'away',
          },
        ],
        venue: {
          id: 'sr:venue:826',
          name: 'Willem II Stadion',
          capacity: 14637,
          city_name: 'Tilburg',
          country_name: 'Netherlands',
          map_coordinates: '51.542778,5.066944',
          country_code: 'NLD',
        },
      },
      {
        id: 'sr:match:14699413',
        scheduled: '2018-08-11T18:00:00+00:00',
        start_time_tbd: true,
        status: 'not_started',
        tournament_round: {
          type: 'group',
          number: 1,
        },
        season: {
          id: 'sr:season:54373',
          name: 'Ligue 1 18/19',
          start_date: '2018-08-11',
          end_date: '2019-06-01',
          year: '18/19',
          tournament_id: 'sr:tournament:34',
        },
        tournament: {
          id: 'sr:tournament:34',
          name: 'Ligue 1',
          sport: {
            id: 'sr:sport:1',
            name: 'Soccer',
          },
          category: {
            id: 'sr:category:7',
            name: 'France',
            country_code: 'FRA',
          },
        },
        competitors: [
          {
            id: 'sr:competitor:1684',
            name: 'SCO Angers',
            country: 'France',
            country_code: 'FRA',
            abbreviation: 'SCO',
            qualifier: 'home',
          },
          {
            id: 'sr:competitor:1663',
            name: 'Olympique Nimes',
            country: 'France',
            country_code: 'FRA',
            abbreviation: 'NIM',
            qualifier: 'away',
          },
        ],
        venue: {
          id: 'sr:venue:19889',
          name: 'Stade Raymond Kopa',
          capacity: 17835,
          city_name: 'Angers',
          country_name: 'France',
          map_coordinates: '47.460458,-0.530741',
          country_code: 'FRA',
        },
      },
    ],
};
