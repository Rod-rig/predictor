import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Row} from './Row';

const table = require('../../mocks/england-table.json');

describe('Row', () => {
    const team = table[0];

    it('should render correctly', () => {
        const tree = renderer
            .create(<Row row={team}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
