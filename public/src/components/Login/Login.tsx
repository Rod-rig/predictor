import {Button, createStyles, Paper, TextField, Theme, withStyles} from '@material-ui/core';
import * as React from 'react';

const styles = ({spacing}: Theme) => createStyles({
  paper: {
    margin: spacing.unit,
    padding: spacing.unit * 3,
  },
});

export const Login =  withStyles(styles)(class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleChange(name: string, event: any) {
    this.setState({
      [name]: event.target.value,
    });
  }

  public handleSubmit(event: any) {
    event.preventDefault();
    console.log(this.state);
  }

  public render() {
    const {classes} = this.props;
    return (
      <Paper classes={{root: classes.paper}}>
        <form onSubmit={this.handleSubmit} autoComplete='off'>
          <TextField
            id='name'
            fullWidth={true}
            label='Name'
            value={this.state.name}
            onChange={this.handleChange.bind(this, 'name')}
            margin='normal'
            autoFocus={true}
          />
          <TextField
            id='password'
            fullWidth={true}
            label='Password'
            value={this.state.password}
            onChange={this.handleChange.bind(this, 'password')}
            margin='normal'
            type='password'
          />
          <Button type='submit' variant='contained' color='secondary'>
            Login
          </Button>
        </form>
      </Paper>
    );
  }
});
