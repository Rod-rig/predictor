import {Grid, withStyles} from '@material-ui/core';
import {observer} from 'mobx-react';
import * as React from 'react';
import {Loader, TournamentCard} from '../';
import {ITournament} from '../../@types';

const styles = {
  list: {
    margin: 0,
    width: '100%',
  },
};

const TournamentListElement = observer((props: any) => {
  const {classes, store} = props;
  return store.isLoaded ? (
    <Grid container={true} spacing={16} className={classes.list}>
      {store.list.map((item: ITournament) => {
        return (
          <Grid key={item.id} item={true} xs={12} sm={6} md={4} lg={3}>
            <TournamentCard
              country={item.category.name}
              id={item.id}
              name={item.name}
            />
          </Grid>
        );
      })}
    </Grid>
  ) : <Loader/>;
});

export const TournamentList = withStyles(styles)(TournamentListElement);
