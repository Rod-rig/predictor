import {Table} from 'material-ui';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import table from '../../__mocks__/table';
import {Row} from './Row';

describe('Row', () => {
  const team = table.table[0];
  const chars = Object.keys(team);

  it('should render correctly', () => {
    const tree = renderer
      .create(<Table><Row row={team} chars={chars}/></Table>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
