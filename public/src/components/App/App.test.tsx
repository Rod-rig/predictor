import {shallow} from 'enzyme';
import * as React from 'react';
import App from './App';

describe('App', () => {
  const app = shallow(<App/>);

  it('should have header', () => {
    const header = app.find('WithTheme(Header)');
    expect(header).toHaveLength(1);
  });

  it('should have table', () => {
    const table = app.find('TableContainer');
    expect(table).toHaveLength(1);
  });
});
