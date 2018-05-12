import {MatchListStore} from './MatchListStore';

describe('MatchListStore', () => {
  const mockStore = new MatchListStore({type: 'test'});

  it('should be initialized correctly', () => {
    expect(mockStore).toBeInstanceOf(MatchListStore);
  });
});
