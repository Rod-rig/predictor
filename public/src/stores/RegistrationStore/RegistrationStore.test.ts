import {registrationStore} from './';

describe('RegistrationStore', () => {
  it('should have correct fields', () => {
    expect(registrationStore.user.name).toBe('');
    expect(registrationStore.user.email).toBe('');
    expect(registrationStore.user.password).toBe('');
  });
});
