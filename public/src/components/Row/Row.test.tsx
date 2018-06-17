import {Table} from '@material-ui/core';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {tableMock} from '../../__mocks__';
import {Row} from './';

describe('Row', () => {
  const team = tableMock.standings[0].groups[0].team_standings[0];
  const chars = Object.keys(team);

  it('should render correctly', () => {
    const tree = renderer
      .create(<Table><Row row={team} chars={chars}/></Table>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
