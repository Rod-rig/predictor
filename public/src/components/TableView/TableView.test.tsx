import {shallow} from 'enzyme';
import * as React from 'react';
import {ITable} from '../../@types/ITable';
import table from '../../__mocks__/table';
import {Loader} from '../Loader/Loader';
import {Row} from '../Row';
import TableView from './TableView';

describe('TableView', () => {
  const mockStore: ITable = {
    chars: ['position', 'teamName', 'points'],
    isLoaded: true,
    order: 'asc',
    sort: '',
    sortHandler: () => {
      return;
    },
    table: table.table,
    url: '',
  };
  const tableElement = shallow(<TableView store={mockStore}/>);
  const notRenderedTable = shallow(<TableView store={{...mockStore, ...{isLoaded: false}}}/>);

  it('should render rows correctly', () => {
    const row = tableElement.find(Row);
    expect(row).toHaveLength(table.table.length);
    expect(row.first().prop('row')).toEqual(table.table[0]);
  });

  it('should render loader', () => {
    expect(notRenderedTable.find(Loader)).toHaveLength(1);
  });
});
