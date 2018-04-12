import {shallow} from 'enzyme';
import * as React from 'react';
import TournamentCard from './TournamentCard';

describe('TournamentCard', () => {
  it('should exist', () => {
    const card = shallow(<TournamentCard/>);
    expect(card.length).toBeGreaterThanOrEqual(1);
  });
});
