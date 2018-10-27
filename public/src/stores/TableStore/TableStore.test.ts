import {ITableProps} from '../../@types';
import {TableStore} from './';

describe('TableStore', () => {
  const props: ITableProps = {
    chars: ['test'],
    id: 'id',
    order: 'asc',
    sortName: 'test',
  };
  const mockStore = new TableStore(props);

  const mockStoreWithRange = new TableStore({
    chars: ['test'],
    id: 'id',
    range: [0, 5],
  });

  it('should be initialized correctly', () => {
    expect(mockStore).toBeInstanceOf(TableStore);
    expect(mockStoreWithRange).toBeInstanceOf(TableStore);
  });

  it('should have correct sort handler', () => {
    const mockHandler = jest.fn(mockStore.sortHandler);
    mockHandler(0, 'foo');
    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockStore.sortName).toEqual('test');
    expect(mockStore.order).toEqual('asc');
    expect(mockStore.table[0].sortName).toEqual('foo');
    expect(mockStore.table[0].order).toEqual('desc');

    mockHandler(0, 'foo');
    expect(mockHandler).toHaveBeenCalledTimes(2);
    expect(mockStore.sortName).toEqual('test');
    expect(mockStore.order).toEqual('asc');
    expect(mockStore.table[0].sortName).toEqual('foo');
    expect(mockStore.table[0].order).toEqual('asc');

    mockHandler(0, 'bar');
    expect(mockHandler).toHaveBeenCalledTimes(3);
    expect(mockStore.sortName).toEqual('test');
    expect(mockStore.order).toEqual('asc');
    expect(mockStore.table[0].sortName).toEqual('bar');
    expect(mockStore.table[0].order).toEqual('desc');
  });

  it('should have correct props', () => {
    expect(mockStore.isLoaded).toBeTruthy();
    expect(mockStore.table[0].team_standings[0].team.name).toBe('Arsenal');
    expect(mockStore.table[0].team_standings[0].rank).toBe(1);
    expect(mockStore.table[0].team_standings[0].current_outcome).toBe('Champions League');
    expect(mockStore.table[0].team_standings[0].points).toBe(95);
    expect(mockStore.table[0].team_standings[1].team.name).toBe('AFC Bournemouth');
    expect(mockStore.table[0].team_standings[1].rank).toBe(2);
    expect(mockStore.table[0].team_standings[1].loss).toBe(10);
    expect(mockStore.table[0].team_standings[1].goals_against).toBe(0);
  });

  it('should return correct object with range', () => {
    expect(mockStoreWithRange.table[0].team_standings).toHaveLength(5);
    expect(mockStoreWithRange.isLoaded).toBeTruthy();

    const mockHandler = jest.fn(mockStoreWithRange.sortHandler);
    mockHandler(0, 'foo');
    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockStoreWithRange.table[0].order).toBe('asc');
  });
});
