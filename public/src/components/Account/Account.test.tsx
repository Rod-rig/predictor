import {shallow} from 'enzyme';
import * as React from 'react';
import {Account} from './';

describe('Account', () => {
  it('should exist', () => {
    const account = shallow(<Account/>);
    const accountContent = account.find('div');
    expect(accountContent).toHaveLength(1);
  });
});
