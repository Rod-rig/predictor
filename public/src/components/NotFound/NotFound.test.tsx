import {shallow} from 'enzyme';
import * as React from 'react';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('should exist', () => {
    const palette = shallow(<NotFound/>);
    const materialTag = palette.find('div');
    expect(materialTag).toHaveLength(1);
  });
});
