import Button from 'material-ui/Button';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import {Link} from 'react-router-dom';
import dict from '../../dict/dict';

interface IProps {
  classes?: any;
  country?: string;
  id: string;
  img?: string;
  name: string;
}

const styles = {
  img: {
    backgroundSize: 'contain',
    height: '300px',
  },
};

const TournamentCard = (props: IProps) => {
  const {classes} = props;
  const MyLink = (linkProps: any) => <Link to={`tournament/${props.id}`} {...linkProps}/>;

  return (
    <Card>
      <CardMedia
        className={classes.img}
        image={props.img}
        title={props.name}
      />
      <CardContent>
        <Typography variant='headline' component='h2'>{props.name}</Typography>
        <Typography variant='caption'>{props.country}</Typography>
      </CardContent>
      <CardActions>
        <Button component={MyLink} size='small' color='primary'>{dict.tournamentCardMore}</Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(TournamentCard);
