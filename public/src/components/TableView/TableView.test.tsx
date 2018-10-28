import {createMount, createShallow} from '@material-ui/core/test-utils';
import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {Loader, TableView} from '../';
import {ITable} from '../../@types';
import {tableMock} from '../../__mocks__';

describe('TableView', () => {
  const createMockStore = (isLoaded: boolean): ITable => ({
    chars: ['position', 'teamName', 'points'],
    id: 'test',
    isLoaded,
    order: 'asc',
    sortHandler: () => {
      return;
    },
    sortName: '',
    table: tableMock.standings[0].groups,
    title: 'Title',
  });
  const shallow = createShallow({dive: true});
  const notRenderedTable = shallow(<TableView store={createMockStore(false)}/>);

  it('should render correctly with default props', () => {
    const tree = createMount()(<MemoryRouter><TableView store={createMockStore(true)}/></MemoryRouter>);
    expect(tree.html()).toMatchSnapshot();
  });

  it('should render loader', () => {
    expect(notRenderedTable.find(Loader)).toHaveLength(1);
  });
});
