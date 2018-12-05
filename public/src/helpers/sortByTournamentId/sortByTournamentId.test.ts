import {getTournamentId, sortByTournamentId} from './';

describe('sortByTournamentId', () => {
  const createSportEvent = (id: number) => ({
    competitors: [
      {
        abbreviation: 'KSS',
        country: 'Russia',
        country_code: 'RUS',
        id: 'sr:competitor:2322',
        name: 'FC Krylia Sovetov Samara',
        qualifier: 'home',
      },
      {
        abbreviation: 'ANM',
        country: 'Russia',
        country_code: 'RUS',
        id: 'sr:competitor:2327',
        name: 'FC Anzhi Makhachkala',
        qualifier: 'away',
      },
    ],
    id: 'sr:match:14971485',
    scheduled: '2018-09-01T11:00:00+00:00',
    season: {
      end_date: '2019-06-03',
      id: 'sr:season:55279',
      name: 'Premier League 18/19',
      start_date: '2018-07-28',
      tournament_id: 'sr:tournament:203',
      year: '18/19',
    },
    start_time_tbd: false,
    status: 'not_started',
    tournament: {
      category: {
        country_code: 'RUS',
        id: `sr:category:123`,
        name: 'Russia',
      },
      id: `sr:tournament:${id}`,
      name: 'Premier League',
      sport: {
        id: 'sr:sport:1',
        name: 'Soccer',
      },
    },
    tournament_round: {
      number: 6,
      type: 'group',
    },
    venue: {
      capacity: 41970,
      city_name: 'Samara',
      country_code: 'RUS',
      country_name: 'Russia',
      id: 'sr:venue:26174',
      map_coordinates: '53.277778,50.237222',
      name: 'Samara Arena',
    },
  });

  const tournaments = [
    createSportEvent(8),
    createSportEvent(2),
    createSportEvent(5),
    createSportEvent(4),
  ];

  it('should sort correctly', () => {
    const sortedTournaments = tournaments.sort(sortByTournamentId);
    expect(getTournamentId(sortedTournaments[0])).toBe(2);
    expect(getTournamentId(sortedTournaments[1])).toBe(4);
    expect(getTournamentId(sortedTournaments[2])).toBe(5);
    expect(getTournamentId(sortedTournaments[3])).toBe(8);
  });
});
