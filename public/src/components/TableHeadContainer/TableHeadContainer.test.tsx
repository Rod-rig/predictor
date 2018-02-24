import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TableHeadContainer from './TableHeadContainer';

const sort = ['position', 'team', 'points'];

describe('TableContainer', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<TableHeadContainer orderBy={sort}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
