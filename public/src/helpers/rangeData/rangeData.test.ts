import {rangeData} from './rangeData';

describe('rangeData', () => {
  it('should return correct result', () => {
    const data = [1, 2, 3, 4, 5];
    expect(rangeData(data, 1, 2)).toEqual([1, 2]);
    expect(rangeData(data, 2, 3)).toEqual([2, 3]);
    expect(rangeData(data, 1, 5)).toEqual(data);
    expect(rangeData(data, 5, 1)).toEqual(data);
    expect(rangeData(data, 7, 5)).toEqual([5]);
    expect(rangeData(data, -5, 7)).toEqual(data);
    expect(rangeData(data, 3, 3)).toEqual([3]);
    expect(rangeData(data, 7, 7)).toEqual(data);
  });
});