import {loginStore} from './LoginStore';

describe('LoginStore', () => {
  beforeEach(() => {
    loginStore.user = {
      name: '',
      password: '',
    };
  });

  it('should have correct initial fields', () => {
    expect(loginStore.user.name).toBe('');
    expect(loginStore.user.password).toBe('');
    expect(loginStore.isSnackbarOpen).toBeFalsy();
  });

  it('should change login fields', () => {
    loginStore.handleChange('name', {target: {value: 'user'}});
    expect(loginStore.user.name).toBe('user');
  });

  it('should toggle snackbar', () => {
    loginStore.toggleSnackbar();
    expect(loginStore.isSnackbarOpen).toBeTruthy();
    loginStore.toggleSnackbar();
    expect(loginStore.isSnackbarOpen).toBeFalsy();
  });

  it('should submit form with correct creds', () => {
    loginStore.user.name = 'test';
    loginStore.handleSubmit({preventDefault: jest.fn()});
    expect(loginStore.user.name).toBe('test');
    expect(loginStore.isSnackbarOpen).toBeFalsy();
  });

  it('should submit form with wrong creds', () => {
    loginStore.user.name = 'user';
    loginStore.handleSubmit({preventDefault: jest.fn()});
    expect(loginStore.user.name).toBe('user');
  });
});
