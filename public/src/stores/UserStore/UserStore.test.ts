import {userStore} from './';

describe('UserStore', () => {
  it('should have correct fields', () => {
    expect(userStore.name).toBeUndefined();
    expect(userStore.isLoggedIn).toBeFalsy();
  });
});
