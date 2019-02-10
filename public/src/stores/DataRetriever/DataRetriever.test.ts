import {DataRetriever} from './DataRetriever';

describe('DataRetriever', () => {
  const object = new DataRetriever({
    url: '/api/tournaments',
  });
  const array = new DataRetriever({
    url: '/predictions',
  });

  it('should create new instance', () => {
    expect(object).toBeInstanceOf(DataRetriever);
    expect(array).toBeInstanceOf(DataRetriever);
  });

  it('should get data(object)', () => {
    expect(object.data).toBeDefined();
    expect(Object.keys(object.data).length).toBeGreaterThan(0);
    expect(object.isLoaded).toBeTruthy();
  });

  it('should get data(array)', () => {
    expect(array.data).toBeDefined();
    expect(array.data.length).toBeGreaterThan(0);
    expect(array.isLoaded).toBeTruthy();
  });
});
