import {mount} from 'enzyme';
import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {Nav} from './';

describe('Nav', () => {
  const navInRouter = (
    <MemoryRouter>
      <Nav
        match={{params: {id: 'test', title: 'title'}}}
        classes={{title: 'title'}}
      />
    </MemoryRouter>
  );
  const nav = mount(navInRouter);

  it('should have correct nav links', () => {
    const links = nav.find('Link');
    expect(links.length).toBeGreaterThan(1);
    expect(links.first().prop('to')).toBe('/fixtures/test');
  });

  it('should have correct title', () => {
    const title = nav.find('.title');
    expect(title.first().text()).toBe('Title');
  });
});
