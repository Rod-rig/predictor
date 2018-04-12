import {shallow} from 'enzyme';
import * as React from 'react';
import TournamentList from './TournamentList';

describe('TournamentList', () => {
  it('should have classname', () => {
    const tournClass: boolean = shallow(<TournamentList/>).hasClass('tournament_list');
    expect(tournClass).toBeTruthy();
  });

  it('should have container prop', () => {
    const tournProp: boolean = shallow(<TournamentList/>).prop('container');
    expect(tournProp).toEqual(true);
  });

  it('should have spacing prop', () => {
    const tournProp: number = shallow(<TournamentList/>).prop('spacing');
    expect(tournProp).toBeDefined();
  });
});
