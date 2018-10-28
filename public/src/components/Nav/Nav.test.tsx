import {mount} from 'enzyme';
import * as React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';
import {Nav} from './';

describe('Nav', () => {
  const renderNav = (props: any) => <Nav {...props}/>;
  const navInRouter = (
    <MemoryRouter initialEntries={['/test']}>
      <Route path='/:id' render={renderNav}/>
    </MemoryRouter>
  );
  const nav = mount(navInRouter);

  it('should have correct nav links', () => {
    const links = nav.find('Link');
    expect(links).toHaveLength(4);
    expect(links.at(0).text()).toBe('Table');
    expect(links.at(1).prop('to')).toBe('/fixtures/test');
    expect(links.at(2).text()).toBe('Results');
    expect(links.at(3).prop('to')).toBe('/predictions?tournament_id=test');
  });
});
