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
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {Link} from 'react-router-dom';

const styles = ({spacing}: Theme) => createStyles({
  btn: {
    textAlign: 'center',
  },
  btnIcon: {
    marginRight: spacing.unit,
  },
  control: {
    margin: spacing.unit,
    width: '20%',
  },
  wrap: {
    display: 'flex',
  },
});

interface IDatePickerProps extends WithStyles<typeof styles> {
  dates: string[];
}

export const PredictionFilter = withStyles(styles)(observer(class extends React.Component<IDatePickerProps, {}> {
  public date = observable.box('');

  public render() {
    const {classes, dates} = this.props;
    const FilterBtn = (elProps: any) => <Link to={`/`} {...elProps}/>;
    const handleChange = (event: any) => {
      this.date.set(event.target.value);
    };

    return (
      <div>
        <div className={classes.wrap}>
          <FormControl className={classes.control}>
            <InputLabel htmlFor='date'>Date</InputLabel>
            <Select
              value={this.date.get()}
              onChange={handleChange}
              inputProps={{
                id: 'date',
                name: 'date',
              }}
            >
              <MenuItem key={'None'} value={''}><em>None</em></MenuItem>
              {dates.map((item: string) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.btn}>
          <Button size='small' component={FilterBtn} variant='contained' color='secondary'>
            <FilterList className={classes.btnIcon}/>
            Filter
          </Button>
        </div>
      </div>
    );
  }
}));
