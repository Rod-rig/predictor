import {userStore} from './';

describe('UserStore', () => {
  it('should have correct fields', () => {
    expect(userStore.name).toBe('test user');
    expect(userStore.isLoggedIn).toBeTruthy();
  });

  it('should logout', () => {
    const logoutSpy = jest.fn(userStore.logout);
    logoutSpy();
    expect(logoutSpy.mock.calls).toHaveLength(1);
    // fix async test
    setTimeout(() => {
      expect(userStore.isLoggedIn).toBeFalsy();
      expect(userStore.name).toBeUndefined();
    }, 0);
  });
});
