import Table from '@material-ui/core/Table';
import {createMount} from '@material-ui/core/test-utils';
import * as React from 'react';
import {TableHeadView} from './';

const props = {
  chars: ['position', 'team', 'points'],
  sortHandle: () => {
    return;
  },
};

describe('TableHeadView', () => {
  it('should exist', () => {
    expect(<TableHeadView {...props}/>).toBeDefined();
  });

  it('should render correctly with default props', () => {
    const tree = createMount()(
      <Table>
        <TableHeadView {...props}/>
      </Table>);
    expect(tree.html()).toMatchSnapshot();
  });

  it('should render correctly with different props', () => {
    const tree = createMount()(
      <Table>
        <TableHeadView order='desc' sortName={props.chars[1]} {...props}/>
      </Table>);
    expect(tree.html()).toMatchSnapshot();
  });

  it('should render correctly with another props', () => {
    const tree = createMount()(
      <Table>
        <TableHeadView order='asc' sortName={props.chars[props.chars.length - 1]} {...props}/>
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
