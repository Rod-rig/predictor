import {
  Button,
  createStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import FilterList from '@material-ui/icons/FilterList';
import {observer} from 'mobx-react';
import * as React from 'react';
import {IPredictionStore} from '../../@types';

const styles = ({spacing}: Theme) => createStyles({
  btn: {
    paddingBottom: spacing.unit * 1.5,
    paddingTop: spacing.unit * 1.5,
  },
  btnIcon: {
    marginRight: spacing.unit,
  },
  control: {
    margin: spacing.unit,
    width: '20%',
  },
  wrap: {
    alignItems: 'center',
    display: 'flex',
  },
});

interface IDatePickerProps extends WithStyles<typeof styles> {
  store: IPredictionStore;
}

export const PredictionFilter = withStyles(styles)(observer(class extends React.Component<IDatePickerProps, {}> {
  public render() {
    const {classes, store} = this.props;
    const refreshMatches = () => {
      store.fetchMatches();
    };
    const handleChange = (event: any) => {
      store.setCurrentDate(event.target.value);
    };

    return (
      <div>
        <div className={classes.wrap}>
          <FormControl className={classes.control}>
            <InputLabel htmlFor='date'>Date</InputLabel>
            <Select
              value={store.currentDate}
              onChange={handleChange}
              inputProps={{
                id: 'date',
                name: 'date',
              }}
            >
              {store.dates.map((item: string) => {
                const date = item.split('-').reverse().join('.');
                return <MenuItem key={item} value={item}>{date}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <Button className={classes.btn} size='small' onClick={refreshMatches} variant='contained' color='secondary'>
            <FilterList className={classes.btnIcon}/>
            Filter
          </Button>
        </div>
      </div>
    );
  }
}));
