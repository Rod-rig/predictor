import {Table} from '@material-ui/core';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {tableMock} from '../../__mocks__';
import {Row} from './';

describe('Row', () => {
  const teams = tableMock.standings[0].groups[0].team_standings;
  const chars = Object.keys(teams[0]);

  it('should render correctly', () => {
    const tree = renderer
      .create(
        <Table>
          {teams.map((team) => (<Row row={team} chars={chars}/>))}
        </Table>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
