import Grid from 'material-ui/Grid';
import * as React from 'react';
import TournamentCard from '../TournamentCard/TournamentCard';

import './TournamentList.css';

const TournamentList = () => {
  return (
    <Grid container={true} spacing={16} className='tournament_list'>
      <Grid item={true} xs={12} sm={6} md={4} lg={3}>
        <TournamentCard />
      </Grid>
    </Grid>
  );
};

export default TournamentList;
