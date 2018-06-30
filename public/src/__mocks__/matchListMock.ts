/* tslint:disable: object-literal-key-quotes object-literal-sort-keys*/
export const matchListMock = {
  'generated_at': '2018-06-16T14:29:26+00:00',
  'schema': 'http://schemas.sportradar.com/bsa/soccer/v1/json/endpoints/soccer/tournament_results.json',
  'tournament': {
    'id': 'sr:tournament:16',
    'name': 'World Cup',
    'sport': {
      'id': 'sr:sport:1',
      'name': 'Soccer',
    },
    'category': {
      'id': 'sr:category:4',
      'name': 'International',
    },
  },
  'results': [
    {
      'sport_event': {
        'id': 'sr:match:13245886',
        'scheduled': '2018-06-14T15:00:00+00:00',
        'start_time_tbd': false,
        'tournament_round': {
          'type': 'group',
          'number': 1,
          'group': 'A',
          'tournament_match_number': 1,
        },
        'season': {
          'id': 'sr:season:48238',
          'name': 'World Cup 2018',
          'start_date': '2018-06-14',
          'end_date': '2018-07-16',
          'year': '2018',
          'tournament_id': 'sr:tournament:16',
        },
        'tournament': {
          'id': 'sr:tournament:16',
          'name': 'World Cup',
          'sport': {
            'id': 'sr:sport:1',
            'name': 'Soccer',
          },
          'category': {
            'id': 'sr:category:4',
            'name': 'International',
          },
        },
        'competitors': [
          {
            'id': 'sr:competitor:4694',
            'name': 'Russia',
            'country': 'Russia',
            'country_code': 'RUS',
            'abbreviation': 'RUS',
            'qualifier': 'home',
          },
          {
            'id': 'sr:competitor:4834',
            'name': 'Saudi Arabia',
            'country': 'Saudi Arabia',
            'country_code': 'SAU',
            'abbreviation': 'KSA',
            'qualifier': 'away',
          },
        ],
        'venue': {
          'id': 'sr:venue:949',
          'name': 'Luzhniki Stadium',
          'capacity': 78011,
          'city_name': 'Moscow',
          'country_name': 'Russia',
          'map_coordinates': '55.715556,37.553611',
          'country_code': 'RUS',
        },
      },
      'sport_event_status': {
        'status': 'closed',
        'match_status': 'ended',
        'home_score': 0,
        'away_score': 5,
        'winner_id': 'sr:competitor:4694',
        'period_scores': [
          {
            'home_score': 0,
            'away_score': 0,
            'type': 'regular_period',
            'number': 1,
          },
          {
            'home_score': 0,
            'away_score': 5,
            'type': 'regular_period',
            'number': 2,
          },
        ],
      },
    },
    {
      'sport_event': {
        'id': 'sr:match:13246028',
        'scheduled': '2018-06-18T12:00:00+00:00',
        'start_time_tbd': false,
        'tournament_round': {
          'type': 'group',
          'number': 1,
          'group': 'F',
          'tournament_match_number': 12,
        },
        'season': {
          'id': 'sr:season:48238',
          'name': 'World Cup',
          'start_date': '2018-06-14',
          'end_date': '2018-07-16',
          'year': '2018',
          'tournament_id': 'sr:tournament:16',
        },
        'tournament': {
          'id': 'sr:tournament:16',
          'name': 'World Cup',
          'sport': {
            'id': 'sr:sport:1',
            'name': 'Soccer',
          },
          'category': {
            'id': 'sr:category:4',
            'name': 'International',
          },
        },
        'competitors': [
          {
            'id': 'sr:competitor:4688',
            'name': 'Sweden',
            'country': 'Sweden',
            'country_code': 'SWE',
            'abbreviation': 'SWE',
            'qualifier': 'home',
          },
          {
            'id': 'sr:competitor:4735',
            'name': 'Republic of Korea',
            'country': 'Republic of Korea',
            'country_code': 'KOR',
            'abbreviation': 'KOR',
            'qualifier': 'away',
          },
        ],
        'venue': {
          'id': 'sr:venue:26170',
          'name': 'Nizhny Novgorod Stadium',
          'capacity': 43319,
          'city_name': 'Nizhny Novgorod',
          'country_name': 'Russia',
          'map_coordinates': '56.337500,43.963333',
          'country_code': 'RUS',
        },
      },
      'sport_event_status': {
        'status': 'closed',
        'match_status': 'ended',
        'home_score': 1,
        'away_score': 0,
        'winner_id': 'sr:competitor:4688',
        'period_scores': [
          {
            'home_score': 0,
            'away_score': 0,
            'type': 'regular_period',
            'number': 1,
          },
          {
            'home_score': 1,
            'away_score': 0,
            'type': 'regular_period',
            'number': 2,
          },
        ],
      },
    },
    {
      'sport_event': {
        'id': 'sr:match:13245922',
        'scheduled': '2018-06-15T12:00:00+00:00',
        'start_time_tbd': false,
        'tournament_round': {
          'type': 'group',
          'number': 2,
          'group': 'A',
          'tournament_match_number': 2,
        },
        'season': {
          'id': 'sr:season:48238',
          'name': 'World Cup 2018',
          'start_date': '2018-06-14',
          'end_date': '2018-07-16',
          'year': '2018',
          'tournament_id': 'sr:tournament:16',
        },
        'tournament': {
          'id': 'sr:tournament:16',
          'name': 'World Cup',
          'sport': {
            'id': 'sr:sport:1',
            'name': 'Soccer',
          },
          'category': {
            'id': 'sr:category:4',
            'name': 'International',
          },
        },
        'competitors': [
          {
            'id': 'sr:competitor:4758',
            'name': 'Egypt',
            'country': 'Egypt',
            'country_code': 'EGY',
            'abbreviation': 'EGY',
            'qualifier': 'home',
          },
          {
            'id': 'sr:competitor:4725',
            'name': 'Uruguay',
            'country': 'Uruguay',
            'country_code': 'URY',
            'abbreviation': 'URU',
            'qualifier': 'away',
          },
        ],
        'venue': {
          'id': 'sr:venue:5206',
          'name': 'Ekaterinburg Arena',
          'capacity': 33061,
          'city_name': 'Ekaterinburg',
          'country_name': 'Russia',
          'map_coordinates': '56.832500,60.573611',
          'country_code': 'RUS',
        },
      },
      'sport_event_status': {
        'status': 'closed',
        'match_status': 'ended',
        'home_score': 0,
        'away_score': 1,
        'winner_id': 'sr:competitor:4725',
        'period_scores': [
          {
            'home_score': 0,
            'away_score': 0,
            'type': 'regular_period',
            'number': 1,
          },
          {
            'home_score': 0,
            'away_score': 1,
            'type': 'regular_period',
            'number': 2,
          },
        ],
      },
    },
  ],
};
