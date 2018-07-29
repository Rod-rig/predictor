import {
  Button,
  createStyles,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import {observer} from 'mobx-react';
import * as React from 'react';
import {Loader, PredictionFilter} from '../';
import {IPredictionStore, ISportEvent} from '../../@types';
import {dict} from '../../dict';

const styles = ({palette, spacing}: Theme) => createStyles({
  away: {
    width: '100%',
  },
  btnWrap: {
    marginBottom: spacing.unit,
    textAlign: 'center',
  },
  home: {
    '&:first-child': {
      paddingLeft: spacing.unit * 2,
    },
    'textAlign': 'right',
    'width': '100%',
  },
  input: {
    textAlign: 'center',
    width: '3rem',
  },
  inputWrap: {
    fontSize: '1.25rem',
  },
  name: {},
  score: {
    alignItems: 'center',
    display: 'flex',
  },
  underline: {
    '&:after': {
      borderBottomColor: palette.secondary.main,
    },
  },
});

interface IProps extends WithStyles<typeof styles> {
  store: IPredictionStore;
}

const renderForm = (props: IProps) => {
  const {classes, store} = props;
  return (
    <form autoComplete='off' onSubmit={store.handleSubmit.bind(store)}>
      <PredictionFilter dates={store.dates}/>
      <List>
        {store.matches.map((item: ISportEvent, index: number) => {
          return (
            <ListItem disableGutters={true} divider={true} key={item.id}>
              <ListItemText classes={{root: classes.home}}>
                <InputLabel htmlFor={item.competitors[0].id}>{item.competitors[0].name}</InputLabel>
              </ListItemText>
              <div className={classes.score}>
                <Input
                  classes={{input: classes.input, root: classes.inputWrap, underline: classes.underline}}
                  id={item.competitors[0].id}
                  name={item.competitors[0].name}
                  onChange={store.handleChange.bind(store, index, 0)}
                  autoFocus={index === 0}
                />
                <div>:</div>
                <Input
                  classes={{input: classes.input, root: classes.inputWrap, underline: classes.underline}}
                  id={item.competitors[1].id}
                  name={item.competitors[1].name}
                  onChange={store.handleChange.bind(store, index, 1)}
                />
              </div>
              <ListItemText classes={{root: classes.away}}>
                <InputLabel htmlFor={item.competitors[1].id}>{item.competitors[1].name}</InputLabel>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
      <div className={classes.btnWrap}>
        <Button type='submit' variant='contained' color='secondary'>{dict.submit_btn_text}</Button>
      </div>
    </form>
  );
};

export const Prediction = withStyles(styles)(observer((props: IProps) => {
  const {store} = props;
  return store.isLoaded && !store.isSuccessSubmit && store.matches.length > 0 ? (
    renderForm(props)
  ) : !store.isLoaded || !store.isSuccessSubmit ? (
    <Loader/>
  ) : (
    <div>Successssszzzzzzzzzzzzzz!</div>
  );
}));
