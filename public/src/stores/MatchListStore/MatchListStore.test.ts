import {MatchListStore} from './';

describe('MatchListStore', () => {
  const mockStore = new MatchListStore({type: 'test_type', id: 'test_id'});

  it('should be initialized correctly', () => {
    expect(mockStore).toBeInstanceOf(MatchListStore);
  });

  it('should create correct object', () => {
    const homeTeam = mockStore.list[0].sport_event.competitors[0].name;
    const awayTeam = mockStore.list[0].sport_event.competitors[1].name;
    const homeScore = mockStore.list[0].sport_event_status.home_score;
    const awayScore = mockStore.list[0].sport_event_status.away_score;
    expect(mockStore.type).toBe('test_type');
    expect(mockStore.id).toBe('test_id');
    expect(mockStore.isLoaded).toBeTruthy();
    expect(homeTeam).toBe('Russia');
    expect(awayTeam).toBe('Saudi Arabia');
    expect(homeScore).toBe(0);
    expect(awayScore).toBe(5);
  });
});
