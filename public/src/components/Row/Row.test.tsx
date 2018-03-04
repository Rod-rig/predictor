import {Table} from 'material-ui';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Row} from './Row';

const table = require('../../mocks/england-table.json');

describe('Row', () => {
  const team = table[0];

  it('should render correctly', () => {
    const tree = renderer
      .create(<Table><Row row={team}/></Table>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
