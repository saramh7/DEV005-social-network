/**
 * @jest-environment jsdom
 */
import Register from '../../src/components/Register.js';
import * as auth from '../../src/lib/auth.js';

const navigateTo = jest.fn();

describe('signInNewAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing DOM Elements', () => {
    test('it should be a function', () => {
      expect(typeof Register).toBe('function');
    });

    test('it should have a register button', () => {
      const DOM = document.createElement('div');
      DOM.append(Register(navigateTo));
      const confirmBtn = DOM.querySelector('#registerBtn');
      expect(confirmBtn).toBeTruthy();
    });

    test('it should have a 5 input elements', () => {
      const DOM = document.createElement('div');
      DOM.append(Register(navigateTo));

      const name = DOM.querySelector('#name');
      const lastName = DOM.querySelector('#lastName');
      const userEmail = DOM.querySelector('#userEmail');
      const password = DOM.querySelector('#password');
      const confirm = DOM.querySelector('#confirm');

      expect(name).toBeTruthy();
      expect(lastName).toBeTruthy();
      expect(userEmail).toBeTruthy();
      expect(password).toBeTruthy();
      expect(confirm).toBeTruthy();
    });
  });

  describe('Testing Login Actions', () => {
    test('it should show an empty field error message', async () => {
      const DOM = document.createElement('div');
      DOM.append(Register(navigateTo));

      const registerBtn = DOM.querySelector('#registerBtn');
      const statusLogin = DOM.querySelector('#statusLogin');
      registerBtn.click();

      expect(statusLogin.innerText).toBe('Debe llenar todos los datos antes de crear tu cuenta.');
    });

    test('it should show an incorrect confirmation password error message', async () => {
      const DOM = document.createElement('div');
      DOM.append(Register(navigateTo));
      const registerBtn = DOM.querySelector('#registerBtn');
      const statusLogin = DOM.querySelector('#statusLogin');

      DOM.querySelector('#name').value = 'mockName';
      DOM.querySelector('#lastName').value = 'mockLastName';
      DOM.querySelector('#userEmail').value = 'test@test.com';
      DOM.querySelector('#password').value = '12345';
      DOM.querySelector('#confirm').value = '123abc';

      registerBtn.click();

      expect(statusLogin.innerText).toBe('Ups... Las contraseñas no coinciden.');
    });

    test('it should show an incorrect email error message', async () => {
      const DOM = document.createElement('div');
      DOM.append(Register(navigateTo));
      const statusLogin = DOM.querySelector('#statusLogin');
      const registerBtn = DOM.querySelector('#registerBtn');

      DOM.querySelector('#name').value = 'mockName';
      DOM.querySelector('#lastName').value = 'mockLastName';
      DOM.querySelector('#userEmail').value = 'testInvalidEmail';
      DOM.querySelector('#password').value = 'abc8561';
      DOM.querySelector('#confirm').value = 'abc8561';

      registerBtn.click();

      expect(statusLogin.innerText).toBe('Debes ingresar un correo válido');
    });

    test('it should call function signInNewAccount and create a new user', async () => {
      jest.spyOn(auth, 'signInNewAccount').mockImplementation(() => Promise.resolve({ loginOk: true, data: { code: 'mockData' } }));

      const DOM = document.createElement('div');
      DOM.append(Register(navigateTo));
      const registerBtn = DOM.querySelector('#registerBtn');

      DOM.querySelector('#name').value = 'mockName';
      DOM.querySelector('#lastName').value = 'mockLastName';
      DOM.querySelector('#userEmail').value = 'test@test.com';
      DOM.querySelector('#password').value = 'abc8561';
      DOM.querySelector('#confirm').value = 'abc8561';

      registerBtn.click();
      expect(auth.signInNewAccount).toHaveBeenCalledTimes(1);
      setTimeout(() => {
        expect(navigateTo).toHaveBeenCalledTimes(1);
        expect(navigateTo).toHaveBeenCalledWith('/home');
      }, 0);
    });

    test('it should call function signInNewAccount and return an error', async () => {
      jest.spyOn(auth, 'signInNewAccount').mockImplementation(() => Promise.resolve({ loginOk: false, data: { code: 'auth/weak-password' } }));

      const DOM = document.createElement('div');
      DOM.append(Register(navigateTo));
      const registerBtn = DOM.querySelector('#registerBtn');
      const statusLogin = DOM.querySelector('#statusLogin');

      DOM.querySelector('#name').value = 'mockName';
      DOM.querySelector('#lastName').value = 'mockLastName';
      DOM.querySelector('#userEmail').value = 'test@test.com';
      DOM.querySelector('#password').value = '12345';
      DOM.querySelector('#confirm').value = '12345';

      registerBtn.click();

      expect(auth.signInNewAccount).toHaveBeenCalledTimes(1);
      setTimeout(() => {
        expect(navigateTo).toHaveBeenCalledTimes(0);
        expect(statusLogin.innerText).toBe('Tuvimos un problema creando tu cuenta. Error: auth/weak-password');
      }, 0);
    });
  });
});
