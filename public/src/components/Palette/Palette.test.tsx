import {shallow} from 'enzyme';
import * as React from 'react';
import Palette from './Palette';

describe('Palette', () => {
  it('should contain material theme tag', () => {
    const palette = shallow(<Palette/>);
    const materialTag = palette.find('MuiThemeProvider');
    expect(materialTag).toHaveLength(1);
  });
});
