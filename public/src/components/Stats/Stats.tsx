import {observer} from 'mobx-react';
import * as React from 'react';
import {Loader, MatchItem} from '../';
import {IMatchList} from '../../@types';

export const Stats = observer(class extends React.Component<{
  store: IMatchList,
}, {}> {
  public render() {
    const {store} = this.props;
    return store.isLoaded ? (
      <div>
        {store.list.map((item: any) => {
          return (
            <MatchItem
              key={item.awayTeam + ' ' + item.homeTeam}
              awayTeam={item.awayTeam}
              homeTeam={item.homeTeam}
              homeScore={item.homeScore}
              awayScore={item.awayScore}
            />
          );
        })}
      </div>
    ) : <Loader/>;
  }
});
