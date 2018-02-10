import {shallow} from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import TableContainer from './TableContainer';
const table = require('../../mocks/england-table.json');

describe('TableContainer', () => {
    const tableContainer = shallow(<TableContainer table={table}/>);
    it('should have classname', () => {
        const headCell = tableContainer.find('thead td');
        expect(headCell.length).toBeGreaterThan(2);
    });

    it('should have correct initial state', () => {
        expect(tableContainer.state('sort')).toEqual('position');
        expect(tableContainer.state('order')).toEqual('asc');
    });

    it('should render correctly', () => {
        const tree = renderer
            .create(<TableContainer table={table}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
