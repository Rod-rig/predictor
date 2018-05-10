import {shallow} from 'enzyme';
import * as React from 'react';
import {Loader} from './Loader';

describe('Loader', () => {
  it('should exist', () => {
    const loader = shallow(<Loader/>);
    const loaderElement = loader.find('div');
    expect(loaderElement).toHaveLength(1);
    expect(loaderElement.text()).toBe('Loading...');
  });
});
