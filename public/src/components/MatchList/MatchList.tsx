import axios, {AxiosResponse} from 'axios';
import List from 'material-ui/List';
import * as React from 'react';
import {IMatch, MatchItem} from '../MatchItem';

const ghUrl: string = 'https://raw.githubusercontent.com/Rod-rig/epl-store/master';

class MatchList extends React.Component<{
  id?: string;
  match?: {
    params: {
      id: string;
    };
  };
  type: string,
}, {
  list: object[],
  logos: any,
}> {
  private readonly id: string;
  constructor(props: any) {
    super(props);
    this.id = this.props.match ? this.props.match.params.id : this.props.id;
    this.state = {
      list: [],
      logos: [],
    };
  }

  public componentDidMount() {
    const matchesUrl = `${ghUrl}/2017-2018/england/${this.id}/${this.props.type}.json`;
    const logosUrl = `${ghUrl}/2017-2018/england/${this.id}/teams.json`;
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
