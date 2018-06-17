import {shallow} from 'enzyme';
import * as React from 'react';
import {Loader, Row, TableView} from '../';
import {ITable} from '../../@types';
import {tableMock} from '../../__mocks__';

describe('TableView', () => {
  const mockStore: ITable = {
    chars: ['position', 'teamName', 'points'],
    id: 'test',
    isLoaded: true,
    order: 'asc',
    sort: '',
    sortHandler: () => {
      return;
    },
    table: tableMock.standings[0].groups[0].team_standings,
  };
  const tableElement = shallow(<TableView store={mockStore}/>);
  const notRenderedTable = shallow(<TableView store={{...mockStore, isLoaded: false}}/>);

  it('should render rows correctly', () => {
    const row = tableElement.find(Row);
    expect(row).toHaveLength(mockStore.table.length);
    expect(row.first().prop('row')).toEqual(mockStore.table[0]);
  });

  it('should render loader', () => {
    expect(notRenderedTable.find(Loader)).toHaveLength(1);
  });
});
