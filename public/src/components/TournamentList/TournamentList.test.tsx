import {mount} from 'enzyme';
import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import TournamentList from './TournamentList';

describe('TournamentList', () => {
  const root = mount(<MemoryRouter><TournamentList/></MemoryRouter>);
  it('should have container prop', () => {
    const tournProp = root.find('Grid').first().prop('container');
    expect(tournProp).toBe(true);
  });

  it('should have spacing prop', () => {
    const tournProp = root.find('Grid').first().prop('spacing');
    expect(tournProp).toBe(16);
  });
});
