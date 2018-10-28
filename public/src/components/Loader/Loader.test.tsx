import {CircularProgress} from '@material-ui/core';
import {mount} from 'enzyme';
import * as React from 'react';
import {Loader} from './';

describe('Loader', () => {
  it('should exist', () => {
    const loader = mount(<Loader/>);
    const loaderElement = loader.find(CircularProgress);
    expect(loaderElement).toHaveLength(1);
  });
});
