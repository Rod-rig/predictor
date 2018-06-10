import {MatchListStore} from './MatchListStore';

describe('MatchListStore', () => {
  const mockStore = new MatchListStore({type: 'test', id: 'test'});

  it('should be initialized correctly', () => {
    expect(mockStore).toBeInstanceOf(MatchListStore);
  });
});
