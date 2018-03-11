import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TableHeadContainer from './TableHeadContainer';

const sort = ['position', 'team', 'points'];

describe('TableHeadContainer', () => {
  it('should render correctly with default props', () => {
    const tree = renderer
      .create(<TableHeadContainer chars={sort}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with different props', () => {
    const tree = renderer
      .create(
        <TableHeadContainer
          order='desc'
          sort={sort[1]}
          chars={sort}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with another props', () => {
    const tree = renderer
      .create(
        <TableHeadContainer
          order='asc'
          sort={sort[sort.length - 1]}
          chars={sort}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
