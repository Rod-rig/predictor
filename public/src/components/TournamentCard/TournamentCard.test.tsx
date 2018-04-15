import {shallow} from 'enzyme';
import * as React from 'react';
import TournamentCard from './TournamentCard';

describe('TournamentCard', () => {
  it('should exist', () => {
    const card = shallow(
      <TournamentCard
        id='premier-league'
        name='Premier League'
      />);
    expect(card.length).toBeGreaterThanOrEqual(1);
  });
});
