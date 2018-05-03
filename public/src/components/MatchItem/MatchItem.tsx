import Avatar from 'material-ui/Avatar';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import * as React from 'react';

import './MatchItem.css';

export interface IMatch {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  homeLogo?: string;
  awayLogo?: string;
}

const renderLogo = (logo: any) => {
  return logo ? (
    <ListItemIcon className='match__logo'>
      <Avatar src={logo}/>
    </ListItemIcon>
  ) : null;
};

const renderScore = (homeScore: number, awayScore: number): JSX.Element => (
  <div className='match__score'>
    <div>{homeScore}</div>
    <div className='match__dash'>-</div>
    <div>{awayScore}</div>
  </div>
);

const renderEmptyScore = (): JSX.Element => (
  <div className='match__score'>
    <div className='match__dash'>-</div>
  </div>
);

export const MatchItem = (props: IMatch) => {
  return (
    <ListItem button={true} divider={true} className='match'>
      <ListItemText className='match__text'>
        <div>{props.homeTeam}</div>
        {renderLogo(props.homeLogo)}
      </ListItemText>
      {!isNaN(props.homeScore) ? renderScore(props.homeScore, props.awayScore) : renderEmptyScore()}
      <ListItemText className='match__text'>
        {renderLogo(props.awayLogo)}
        <div>{props.awayTeam}</div>
      </ListItemText>
    </ListItem>
  );
};
