import {mount} from 'enzyme';
import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {TournamentCard} from './';

describe('TournamentCard', () => {

  it('should render card correctly', () => {
    const card = mount(
      <MemoryRouter>
        <TournamentCard
          id='premier-league'
          name='Premier League'
        />
      </MemoryRouter>);
    const link = card.find('Link');
    expect(card.length).toBeGreaterThanOrEqual(1);
    expect(card.find('CardMedia')).toHaveLength(1);
    expect(link).toHaveLength(1);
    expect(link.prop('to')).toEqual('tournament/premier-league');
  });

  it('should render card with image correctly', () => {
    const card = mount(
      <MemoryRouter>
        <TournamentCard
          id='test_id'
          name='test_name'
          classes={{img: 'card__img'}}
        />
      </MemoryRouter>);
    expect(card.find('CardMedia').prop('className')).toContain('card__img');
    expect(card.find('h2').text()).toBe('test_name');
  });
});
