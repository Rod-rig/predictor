import {mount} from 'enzyme';
import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import TournamentCard from './TournamentCard';

describe('TournamentCard', () => {
  const card = mount(
    <MemoryRouter>
      <TournamentCard
        id='premier-league'
        name='Premier League'
      />
    </MemoryRouter>);

  it('should exist', () => {
    expect(card.length).toBeGreaterThanOrEqual(1);
  });

  it('should contain correct link', () => {
    const link = card.find('Link');
    expect(link.length).toEqual(1);
    expect(link.prop('to')).toEqual('tournament/premier-league');
  });
});
