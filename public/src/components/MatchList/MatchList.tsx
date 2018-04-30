import axios, {AxiosResponse} from 'axios';
import List from 'material-ui/List';
import * as React from 'react';
import {IMatch, MatchItem} from '../MatchItem/MatchItem';

const ghUrl: string = 'https://raw.githubusercontent.com/Rod-rig/epl-data/master';

class MatchList extends React.Component<{}, {
  list: object[],
  logos: any,
}> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: [],
      logos: [],
    };
  }

  public componentDidMount() {
    // const matchesUrl = `${ghUrl}/2017-2018/england/${this.id}/results.json`;
    const matchesUrl = `${ghUrl}/2017-2018/england/premier-league/results.json`;
    const logosUrl = `${ghUrl}/2017-2018/england/premier-league/teams.json`;
    axios.all([
      axios.get(matchesUrl),
      axios.get(logosUrl),
    ]).then(axios.spread((matchesRes: AxiosResponse, logosRes: AxiosResponse) => {
      this.setState({
        list: [...matchesRes.data],
        logos: this.flatLogos(logosRes.data),
      });
    }))
      .catch(/* istanbul ignore next */(error) => {
        throw error;
      });
  }

  public flatLogos(logos: object[]) {
    const logosCollection: any = {};
    logos.forEach((logo: {logo: string, teamName: string}) => {
      logosCollection[logo.teamName] = logo.logo;
    });
    return logosCollection;
  }

  public render() {
    return (
      <List disablePadding={true}>
        {
          this.state.list.map((item: IMatch, index: number) => (
            <MatchItem
              key={index}
              homeTeam={item.homeTeam}
              awayTeam={item.awayTeam}
              homeScore={item.homeScore}
              awayScore={item.awayScore}
              homeLogo={this.state.logos[item.homeTeam]}
              awayLogo={this.state.logos[item.awayTeam]}
            />
          ))
        }
      </List>
    );
  }
}

export default MatchList;
