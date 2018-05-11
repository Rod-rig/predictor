import {TableStore} from './TableStore';

describe('TableStore', () => {
  const mockStore = new TableStore({
    chars: ['test'],
    order: 'asc',
    sort: 'test',
  });

  const mockEvent = {
    target: {
      textContent: 'foo',
    },
  };

  it('should be initialized correctly', () => {
    expect(mockStore).toBeInstanceOf(TableStore);
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
});
