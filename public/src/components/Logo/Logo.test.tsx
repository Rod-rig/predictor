import {mount} from 'enzyme';
import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import Logo from './Logo';

describe('Logo', () => {
  const logo = mount(<MemoryRouter><Logo/></MemoryRouter>);

  it('should have src attr', () => {
    const logoSrc: string = logo.find('img').prop('src');
    expect(logoSrc).toBeDefined();
  });

  it('should have one image', () => {
    const logoImg = logo.find('img');
    expect(logoImg).toHaveLength(1);
  });
});
