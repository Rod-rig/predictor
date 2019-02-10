import { MuiThemeProvider } from '@material-ui/core/styles';
import {mount} from 'enzyme';
import * as React from 'react';
import {Palette} from './';

describe('Palette', () => {
  it('should contain material theme tag', () => {
    const palette = mount(<Palette>Foo</Palette>);
    const materialTag = palette.find(MuiThemeProvider);
    expect(materialTag).toHaveLength(1);
  });
});
