import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MatchList from './MatchList';

describe('MatchList', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<MatchList type='results' id='test'/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
