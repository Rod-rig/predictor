import Button from 'material-ui/Button';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import dict from '../../dict/dict';
import * as React from 'react';
import {Link} from 'react-router-dom';

import './TournamentCard.css';

interface IProps {
  country?: string;
  id: string;
  img?: string;
  name: string;
}

const TournamentCard = (props: IProps) => {
  const MyLink = (linkProps: any) => <Link to={`tournament/${props.id}`} {...linkProps}/>;

  return (
    <Card>
      <CardMedia
        className='tournament_card__img'
        image={props.img}
        title={props.name}
      />
      <CardContent>
        <div className='tournament_card__title'>{props.name}</div>
        <div className='tournament_card__subtitle'>{props.country}</div>
      </CardContent>
      <CardActions>
        <Button component={MyLink} size='small' color='primary'>{dict.tournamentCardMore}</Button>
      </CardActions>
    </Card>
  );
};

export default TournamentCard;
