import {shallow} from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TableContainer from './TableContainer';

describe('TableContainer', () => {
  const tableContainer = shallow(<TableContainer/>);

  it('should have head', () => {
    const head = tableContainer.find('TableHeadContainer');
    expect(head).toHaveLength(1);
    expect(head.prop('order')).toEqual('asc');
  });

  it('should have correct initial state', () => {
    expect(tableContainer.state('sort')).toEqual('position');
    expect(tableContainer.state('order')).toEqual('asc');
  });

  it('should render correctly', () => {
    const tree = renderer
      .create(<TableContainer/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('sorting in TableContainer', () => {
  const tableContainer = shallow(<TableContainer/>);
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
