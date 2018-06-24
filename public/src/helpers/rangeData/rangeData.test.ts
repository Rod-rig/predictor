import {rangeData} from './rangeData';

describe('rangeData', () => {
  const getValue = (arr: any[]) => {
    return arr[0].team_standings;
  };
  it('should return correct result', () => {
    const data = [1, 2, 3, 4, 5];
    expect(getValue(rangeData(data, 1, 2))).toEqual([1, 2]);
    expect(getValue(rangeData(data, 2, 3))).toEqual([2, 3]);
    expect(getValue(rangeData(data, 1, 5))).toEqual(data);
    expect(getValue(rangeData(data, 5, 1))).toEqual(data);
    expect(getValue(rangeData(data, 7, 5))).toEqual([5]);
    expect(getValue(rangeData(data, -5, 7))).toEqual(data);
    expect(getValue(rangeData(data, 3, 3))).toEqual([3]);
    expect(getValue(rangeData(data, 7, 7))).toEqual(data);
  });
});