import List from 'material-ui/List';
import {observer} from 'mobx-react';
import * as React from 'react';
import {IMatch, IMatchList} from '../../@types';
import {Loader} from '../Loader/Loader';
import {MatchItem} from '../MatchItem';

@observer
class MatchList extends React.Component<{
  store: IMatchList,
}, {}> {
  public render() {
    const store = this.props.store;

    return store.isLoaded ? (
      <List disablePadding={true}>
        {
          store.list.map((item: IMatch, index: number) => (
            <MatchItem
              key={`${item.homeTeam}-${item.awayTeam}-${index}`}
              homeTeam={item.homeTeam}
              awayTeam={item.awayTeam}
              homeScore={item.homeScore}
              awayScore={item.awayScore}
              homeLogo={store.logos[item.homeTeam]}
              awayLogo={store.logos[item.awayTeam]}
            />
          ))
        }
      </List>
    ) : (
      <Loader/>
    );
  }
}

export default MatchList;
