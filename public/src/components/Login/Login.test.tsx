import {shallow} from 'enzyme';
import * as React from 'react';
import {Login} from './Login';

describe('Login', () => {
  it('should render correctly', () => {
    const login = shallow(
      <Login
        store={{
          name: '',
          password: '',
        }}
      />);
  });
});
