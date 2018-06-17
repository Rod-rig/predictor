import {mount} from 'enzyme';
import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {Header, TableView, TournamentList} from '..';
import App from './App';

describe('App', () => {
  const renderRoute = (path: string) => (
    mount(<MemoryRouter initialEntries={[path]}><App/></MemoryRouter>)
  );

  it('should render main page', () => {
    const mainPage = renderRoute('/');
    expect(mainPage.find(Header)).toHaveLength(1);
    expect(mainPage.find(TournamentList)).toHaveLength(1);
  });

  it('should render table page', () => {
    const tablePage = renderRoute('/tournament/test');
    expect(tablePage.find(Header)).toHaveLength(1);
    // expect(tablePage.find(TableView)).toHaveLength(1);
  });
});
