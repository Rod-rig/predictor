import {loginStore} from './LoginStore';

describe('LoginStore', () => {
  it('should have correct initial fields', () => {
    expect(loginStore.user.name).toBe('');
    expect(loginStore.user.password).toBe('');
  });
});
