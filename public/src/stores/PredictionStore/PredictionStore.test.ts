import {PredictionStore} from './';

describe('PredictionStore', () => {
  const mockStore = new PredictionStore();

  it('should be initialized correctly', () => {
    expect(mockStore).toBeInstanceOf(PredictionStore);
  });

  it('should create correct object', () => {
    expect(mockStore.matches[0]).toMatchSnapshot();
  });
});
