import {shallow} from 'enzyme';
import * as React from 'react';
import axios from '../../__mocks__/axios';
import table from '../../__mocks__/table';
import urls from '../../__mocks__/urls';
import TableContainer from './TableContainer';

describe('TableContainer', () => {
  const tableContainer = shallow(
    <TableContainer
      chars={['test']}
      match={{params: {id: 'premier-league'}}}
    />);

  it('should have head', () => {
    const head = tableContainer.find('TableHeadContainer');
    expect(head).toHaveLength(1);
    expect(head.prop('order')).toEqual('asc');
  });

  it('should have correct initial state', () => {
    expect(tableContainer.state('sort')).toEqual('position');
    expect(tableContainer.state('order')).toEqual('asc');
  });
});

describe('sorting in TableContainer', () => {
  const tableContainer = shallow(<TableContainer chars={['test']} id='premier-league'/>);
  const tableInst = tableContainer.instance();
  const sortSpy = jest.fn(TableContainer.prototype.sort.bind(tableInst));

  it('should change order state if sort was not changed', () => {
    sortSpy({target: {textContent: tableContainer.state('sort')}});
    expect(sortSpy).toHaveBeenCalledTimes(1);
    expect(tableContainer.state('order')).toEqual('desc');
  });

  it('should set default order if sort state was repeated', () => {
    sortSpy({target: {textContent: tableContainer.state('sort')}});
    expect(sortSpy).toHaveBeenCalledTimes(2);
    expect(tableContainer.state('order')).toEqual('asc');
  });

  it('should change sort state if we get custom params', () => {
    sortSpy({target: {textContent: 'foo'}});
    expect(sortSpy).toHaveBeenCalledTimes(3);
    expect(tableContainer.state('order')).toEqual('asc');
    expect(tableContainer.state('sort')).toEqual('foo');
  });
});

describe('range', () => {
  const range = jest.fn(TableContainer.prototype.rangeData);
  it('should range correctly', () => {
    expect(range([1, 2, 3], 1, 2)).toEqual([1, 2]);
    expect(range([1, 2, 3], 2, 3)).toEqual([2, 3]);
    expect(range([1, 2, 3, 4, 5], 0, 7)).toEqual([1, 2, 3, 4, 5]);
    expect(range([1, 2, 3, 4, 5], 4, 7)).toEqual([4, 5]);
    expect(range([1], 4, 7)).toEqual([1]);
    expect(range([1], 7, 4)).toEqual([1]);
    expect(range([1, 2, 3, 4, 5], 4, 1)).toEqual([1, 2, 3, 4]);
  });
});

describe('axios in TableContainer', () => {
  it('should get correct data', () => {
    axios.get(urls.table).then((res: { data: object[] }) => {
      expect(res.data).toEqual(table.table);
    });
  });
});

describe('range in TableContainer', () => {
  const tableContainer = shallow(<TableContainer chars={['test']} id='premier-league' range={[1, 3]}/>);
  it('should have correct props', () => {
    const range = tableContainer.instance().props.range;
    expect(range).toEqual([1, 3]);
  });
});
