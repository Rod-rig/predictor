import {Paper} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {mount} from 'enzyme';
import * as React from 'react';
import {Account} from './';

describe('Account', () => {
  it('should exist', () => {
    const account = mount(<Account/>);
    const userNameElement = account.find('b');
    const avatar = account.find(AccountCircle);
    const accountRoot = account.find(Paper);

    expect(avatar).toHaveLength(1);
    expect(accountRoot).toHaveLength(1);
    expect(userNameElement.text()).toBe('test user');
  });
});
