import {mount} from 'enzyme';
import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import App from './App';

describe('App', () => {
  const app = mount(<MemoryRouter><App/></MemoryRouter>);

  it('should have header', () => {
    const header = app.find('Header');
    expect(header).toHaveLength(1);
  });
});
