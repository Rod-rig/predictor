import Button from 'material-ui/Button';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import * as React from 'react';

import './TournamentCard.css';

const TournamentCard = () => {
  return (
    <Card>
      <CardMedia
        className='tournament_card__img'
        image='https://www.premierleague.com/resources/ver/i/elements/premier-league-logo.svg'
        title='Premier League'
      />
      <CardContent>
        <div className='tournament_card__title'>Premier League</div>
        <div className='tournament_card__subtitle'>England</div>
      </CardContent>
      <CardActions>
        <Button size='small' color='primary'>Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default TournamentCard;
