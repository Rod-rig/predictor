import {Grid, withStyles} from '@material-ui/core';
import {observer} from 'mobx-react';
import * as React from 'react';
import {ITournament} from '../../@types';
import {Loader} from '../Loader/Loader';
import TournamentCard from '../TournamentCard/TournamentCard';

const styles = {
  list: {
    margin: 0,
    width: '100%',
  },
};

const TournamentList = observer((props: any) => {
  const {classes, store} = props;
  return store.isLoaded ? (
    <Grid container={true} spacing={16} className={classes.list}>
      {store.list.map((item: ITournament) => {
        return (
          <Grid key={item.id} item={true} xs={12} sm={6} md={4} lg={3}>
            <TournamentCard
              country={item.category.name}
              id={item.id}
              img={item.img}
              name={item.name}
            />
          </Grid>
        );
      })}
    </Grid>
  ) : <Loader/>;
});

export default withStyles(styles)(TournamentList);
