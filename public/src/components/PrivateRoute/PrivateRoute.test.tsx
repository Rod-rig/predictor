import {mount} from 'enzyme';
import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {PrivateRoute} from './PrivateRoute';

describe('PrivateRoute', () => {
  it('should render component from props', () => {
    const privateRoute = mount(
      <MemoryRouter>
        <PrivateRoute component='div'/>
      </MemoryRouter>);
    expect(privateRoute.find('div')).toHaveLength(1);
  });
});
