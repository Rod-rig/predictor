import {DataRetriever} from './DataRetriever';

describe('DataRetriever', () => {
  it('should create new instance', () => {
    const dataRetriever = new DataRetriever({
      url: '/test',
    });
    expect(dataRetriever).toBeInstanceOf(DataRetriever);
  });
});
