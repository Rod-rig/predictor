import {shallow} from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TableContainer from './TableContainer';

const table = require('../../mocks/england-table.json');

describe('TableContainer', () => {
  const tableContainer = shallow(<TableContainer table={table}/>);

  it('should have head', () => {
    const head = tableContainer.find('TableHeadContainer');
    expect(head).toHaveLength(1);
    expect(head.prop('order')).toEqual('asc');
  });

  it('should have correct initial state', () => {
    expect(tableContainer.state('sort')).toEqual('position');
    expect(tableContainer.state('order')).toEqual('asc');
  });

  it('should sort correctly', () => {
    const tableInst = tableContainer.instance();
    const sortSpy = jest.spyOn(tableInst, 'sort');

    sortSpy({target: {textContent: tableContainer.state('sort')}});
    expect(sortSpy).toHaveBeenCalledTimes(1);
    expect(tableContainer.state('order')).toEqual('desc');

    sortSpy({target: {textContent: tableContainer.state('sort')}});
    expect(sortSpy).toHaveBeenCalledTimes(2);
    expect(tableContainer.state('order')).toEqual('asc');

    sortSpy({target: {textContent: 'foo'}});
    expect(sortSpy).toHaveBeenCalledTimes(3);
    expect(tableContainer.state('order')).toEqual('asc');
    expect(tableContainer.state('sort')).toEqual('foo');
  });

  it('should render correctly', () => {
    const tree = renderer
      .create(<TableContainer table={table}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
