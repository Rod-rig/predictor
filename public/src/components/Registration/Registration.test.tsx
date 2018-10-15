import {shallow} from 'enzyme';
import * as React from 'react';
import {Registration} from './Registration';

describe('Registration', () => {
  it('should render correctly', () => {
    const registration = shallow(<Registration store={{}}/>);
  });
});
