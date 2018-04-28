import * as React from 'react';
import MatchItem from '../MatchItem/MatchItem';

class MatchList extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <MatchItem>
        {this.props}
      </MatchItem>
    );
  }
}

export default MatchList;
