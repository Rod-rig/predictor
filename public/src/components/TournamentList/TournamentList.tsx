import Grid from 'material-ui/Grid';
import * as React from 'react';
import TournamentCard from '../TournamentCard/TournamentCard';

import './TournamentList.css';

const TournamentList = () => {
  const tournaments = [{
    country: 'England',
    id: 'premier-league',
    img: 'https://www.premierleague.com/resources/ver/i/elements/premier-league-logo.svg',
    name: 'Premier League',
  }];
  return (
    <Grid container={true} spacing={16} className='tournament_list'>
      <Grid item={true} xs={12} sm={6} md={4} lg={3}>
        {tournaments.map((item, index: number) => {
          return (
            <TournamentCard
              country={item.country}
              id={item.id}
              img={item.img}
              key={index}
              name={item.name}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default TournamentList;
