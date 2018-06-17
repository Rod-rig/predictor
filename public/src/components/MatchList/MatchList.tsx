import {List} from '@material-ui/core';
import {observer} from 'mobx-react';
import * as React from 'react';
import {Loader, MatchItem} from '../';
import {IMatch, IMatchList} from '../../@types';

@observer
export class MatchList extends React.Component<{
  store: IMatchList,
}, {}> {
  public render() {
    const store = this.props.store;

    return store.isLoaded ? (
      <List disablePadding={true}>
        {
          store.list.map((item: IMatch, index: number) => {
            const stat = {
              awayScore: item.sport_event_status.away_score,
              awayTeam: item.sport_event.competitors[1].name,
              homeScore: item.sport_event_status.home_score,
              homeTeam: item.sport_event.competitors[0].name,
            };
            return (
              <MatchItem key={`${stat.homeTeam}-${stat.awayTeam}-${index}`} {...stat}/>
            );
          })
        }
      </List>
    ) : (
      <Loader/>
    );
  }
}
