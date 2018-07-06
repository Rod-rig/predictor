import {PredictionStore} from './';

describe('PredictionStore', () => {
  const mockStore = new PredictionStore();

  it('should be initialized correctly', () => {
    expect(mockStore).toBeInstanceOf(PredictionStore);
  });

  it('should create correct object', () => {
    const homeTeam = mockStore.matches[0].competitors[0].name;
    const awayTeam = mockStore.matches[0].competitors[1].name;
    expect(mockStore.isLoaded).toBeTruthy();
    expect(homeTeam).toBe('Newcastle United');
    expect(awayTeam).toBe('Tottenham Hotspur');
  });
});
