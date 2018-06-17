import Table from '@material-ui/core/Table';
import {createMount} from '@material-ui/core/test-utils';
import * as React from 'react';
import {TableHeadView} from './';

const sort = ['position', 'team', 'points'];

describe('TableHeadView', () => {
  it('should exist', () => {
    expect(<TableHeadView chars={sort}/>).toBeDefined();
  });

  it('should render correctly with default props', () => {
    const tree = createMount()(
      <Table>
        <TableHeadView chars={sort}/>
      </Table>);
    expect(tree.html()).toMatchSnapshot();
  });

  it('should render correctly with different props', () => {
    const tree = createMount()(
      <Table>
        <TableHeadView order='desc' sort={sort[1]} chars={sort}/>
      </Table>);
    expect(tree.html()).toMatchSnapshot();
  });

  it('should render correctly with another props', () => {
    const tree = createMount()(
      <Table>
        <TableHeadView order='asc' sort={sort[sort.length - 1]} chars={sort}/>
      </Table>);
    expect(tree.html()).toMatchSnapshot();
  });

  // it('should render correctly with default props', () => {
  //   const tree = renderer
  //     .create(<TableHeadView chars={sort}/>)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  //
  // it('should render correctly with different props', () => {
  //   const tree = renderer
  //     .create(
  //       <TableHeadView
  //         order='desc'
  //         sort={sort[1]}
  //         chars={sort}
  //       />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  //
  // it('should render correctly with another props', () => {
  //   const tree = renderer
  //     .create(
  //       <TableHeadView
  //         order='asc'
  //         sort={sort[sort.length - 1]}
  //         chars={sort}
  //       />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
