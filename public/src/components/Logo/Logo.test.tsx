import {shallow} from 'enzyme';
import * as React from 'react';
import Logo from './Logo';

describe('Logo', () => {
  const logo = shallow(<Logo/>);

  it('should have classname', () => {
    const logoClass: boolean = logo.hasClass('logo');
    expect(logoClass).toBeTruthy();
  });

  it('should have src attr', () => {
    const logoSrc: string = logo.find('img').prop('src');
    expect(logoSrc).toBeDefined();
  });

  it('should have one image', () => {
    const logoImg = logo.find('img');
    expect(logoImg).toHaveLength(1);
  });
});
