import {ITableProps} from '../../@types';
import {TableStore} from './';

describe('TableStore', () => {
  const props: ITableProps = {
    chars: ['test'],
    id: 'test',
    order: 'asc',
    sort: 'test',
  };
  const mockStore = new TableStore(props);

  const mockStoreWithRange = new TableStore({...props, range: [0, 5]});

  const mockEvent = {
    target: {
      textContent: 'foo',
    },
  };

  it('should be initialized correctly', () => {
    expect(mockStore).toBeInstanceOf(TableStore);
    expect(mockStoreWithRange).toBeInstanceOf(TableStore);
  });

  it('should have correct sort handler', () => {
    const mockHandler = jest.fn(mockStore.sortHandler);
    mockHandler(mockEvent);
    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockStore.sort).toEqual('foo');
    expect(mockStore.order).toEqual('desc');

    mockHandler(mockEvent);
    expect(mockHandler).toHaveBeenCalledTimes(2);
    expect(mockStore.sort).toEqual('foo');
    expect(mockStore.order).toEqual('asc');
  });

  it('should have correct props', () => {
    expect(mockStore.isLoaded).toBeTruthy();
    expect(mockStore.table[0].team.name).toBe('Arsenal');
    expect(mockStore.table[0].rank).toBe(1);
    expect(mockStore.table[0].current_outcome).toBe('Champions League');
    expect(mockStore.table[0].points).toBe(95);
    expect(mockStore.table[1].team.name).toBe('AFC Bournemouth');
    expect(mockStore.table[1].rank).toBe(2);
    expect(mockStore.table[1].loss).toBe(10);
    expect(mockStore.table[1].goals_against).toBe(0);
  });

  it('should return correct object with range', () => {
    expect(mockStoreWithRange.isLoaded).toBeTruthy();
  });
});
