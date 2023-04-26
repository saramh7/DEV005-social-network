/**
 * @jest-environment jsdom
 */

import Login from '../../src/components/Login.js';
import * as auth from '../../src/lib/auth.js';

const navigateTo = jest.fn();

describe('googleLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing DOM Elements', () => {
    test('it should be a function', () => {
      expect(typeof Login).toBe('function');
    });

    test('it should have a login button', () => {
      const DOM = document.createElement('div');
      DOM.append(Login(navigateTo));
      const loginBtn = DOM.querySelector('#loginBtn');
      expect(loginBtn).toBeTruthy();
    });

    test('it should have a login with google button', () => {
      const DOM = document.createElement('div');
      DOM.append(Login(navigateTo));
      const loginGoogleBtn = DOM.querySelector('#loginGoogleBtn');
      expect(loginGoogleBtn).toBeTruthy();
    });

    test('it should have an email and password inputs', () => {
      const DOM = document.createElement('div');
      DOM.append(Login(navigateTo));
      const email = DOM.querySelector('#email');
      const password = DOM.querySelector('#password');
      expect(email).toBeTruthy();
      expect(password).toBeTruthy();
    });

    test('it should have an Label for error description', () => {
      const DOM = document.createElement('div');
      DOM.append(Login(navigateTo));
      const label = DOM.querySelector('#statusLogin');
      expect(label).toBeTruthy();
    });
  });

  describe('Testing Login with Google', () => {
    test('it should call function googleLogin and redirect to home', () => {
      jest.spyOn(auth, 'googleLogin').mockImplementation(() => Promise.resolve({ loginOk: true, data: { code: 'mockData' } }));
      const DOM = document.createElement('div');
      DOM.append(Login(navigateTo));
      const loginGoogleBtn = DOM.querySelector('#loginGoogleBtn');
      loginGoogleBtn.click();
      expect(auth.googleLogin).toHaveBeenCalledTimes(1);
      setTimeout(() => {
        expect(navigateTo).toHaveBeenCalledTimes(1);
        expect(navigateTo).toHaveBeenCalledWith('/home');
      }, 0);
    });

    test('it should show an error when googleLogin return loginOk=false', () => {
      jest.spyOn(auth, 'googleLogin').mockImplementation(() => Promise.resolve({ loginOk: false, data: { code: 'auth/popup-closed-by-user' } }));
      const DOM = document.createElement('div');
      DOM.append(Login(navigateTo));
      const loginGoogleBtn = DOM.querySelector('#loginGoogleBtn');
      const statusLogin = DOM.querySelector('#statusLogin');
      loginGoogleBtn.click();
      setTimeout(() => {
        expect(statusLogin.innerText).toBe('Lo sentimos, la ventana de ingreso fue cerrada.');
      }, 0);
    });

    test('it should show an error when googleLogin return another kind of error', () => {
      jest.spyOn(auth, 'googleLogin').mockImplementation(() => Promise.resolve({ loginOk: false, data: { code: 'auth/another-error' } }));
      const DOM = document.createElement('div');
      DOM.append(Login(navigateTo));
      const loginGoogleBtn = DOM.querySelector('#loginGoogleBtn');
      const statusLogin = DOM.querySelector('#statusLogin');
      loginGoogleBtn.click();
      setTimeout(() => {
        expect(statusLogin.innerText).toBe('Lo sentimos, la ventana de ingreso fue cerrada.');
      }, 0);
    });

    test('it should show an error when googleLogin return a promise rejected', async () => {
      jest.spyOn(auth, 'googleLogin').mockImplementation(() => Promise.reject());
      const DOM = document.createElement('div');
      DOM.append(Login(navigateTo));
      const loginGoogleBtn = DOM.querySelector('#loginGoogleBtn');
      const statusLogin = DOM.querySelector('#statusLogin');
      loginGoogleBtn.click();
      setTimeout(() => {
        expect(statusLogin.innerText).toBe('Tuvimos un problema. Intente más tarde');
      }, 0);
    });
  });

  describe('Testing Login with Email and Password', () => {
    test('it should show error message when try login without entering email or password', () => {
      const DOM = document.createElement('div');
      DOM.append(Login(navigateTo));
      const loginBtn = DOM.querySelector('#loginBtn');
      loginBtn.click();
      const statusLogin = DOM.querySelector('#statusLogin');
      expect(statusLogin.innerText).toBe('Debe ingresar su email y password antes de continuar.');
    });

    test('it should show call loginWithUserEmail and redirect to home when loginWithUserEmail return loginOk=true', () => {
      jest.spyOn(auth, 'loginWithUserEmail').mockImplementation(() => Promise.resolve({ loginOk: true, data: { code: 'mockData' } }));
      const DOM = document.createElement('div');
      DOM.append(Login(navigateTo));
      const loginBtn = DOM.querySelector('#loginBtn');
      DOM.querySelector('#email').value = 'test@test.com';
      DOM.querySelector('#password').value = '123456';
      loginBtn.click();
      expect(auth.loginWithUserEmail).toHaveBeenCalledTimes(1);
      expect(auth.loginWithUserEmail).toHaveBeenCalledWith('test@test.com', '123456');
      setTimeout(() => {
        expect(navigateTo).toHaveBeenCalledTimes(1);
        expect(navigateTo).toHaveBeenCalledWith('/home');
      }, 0);
    });

    test('it should show an error when loginWithUserEmail return loginOk=false with code auth/user-not-found', async () => {
      jest.spyOn(auth, 'loginWithUserEmail').mockImplementation(() => Promise.resolve({ loginOk: false, data: { code: 'auth/user-not-found' } }));
      const DOM = document.createElement('div');
      DOM.append(Login(navigateTo));
      const loginBtn = DOM.querySelector('#loginBtn');
      DOM.querySelector('#email').value = 'test@test.com';
      DOM.querySelector('#password').value = '123456';
      const statusLogin = DOM.querySelector('#statusLogin');
      loginBtn.click();
      expect(auth.loginWithUserEmail).toHaveBeenCalledTimes(1);
      setTimeout(() => {
        expect(navigateTo).toHaveBeenCalledTimes(0);
        expect(statusLogin.innerText).toBe('Lo sentimos, no pudimos encontrar tu cuenta.');
      }, 0);
    });

    test('it should show an error when loginWithUserEmail return loginOk=false with another kind of error', async () => {
      jest.spyOn(auth, 'loginWithUserEmail').mockImplementation(() => Promise.resolve({ loginOk: false, data: { code: 'auth/another-error' } }));
      const DOM = document.createElement('div');
      DOM.append(Login(navigateTo));
      const loginBtn = DOM.querySelector('#loginBtn');
      DOM.querySelector('#email').value = 'test@test.com';
      DOM.querySelector('#password').value = '123456';
      const statusLogin = DOM.querySelector('#statusLogin');
      loginBtn.click();
      expect(auth.loginWithUserEmail).toHaveBeenCalledTimes(1);
      setTimeout(() => {
        expect(navigateTo).toHaveBeenCalledTimes(0);
        expect(statusLogin.innerText).toBe('Lo sentimos, no pudimos encontrar tu cuenta.');
      }, 0);
    });

    test('it should show an error when loginWithUserEmail return loginOk=false with code auth/wrong-password', async () => {
      jest.spyOn(auth, 'loginWithUserEmail').mockImplementation(() => Promise.resolve({
        loginOk: false,
        data: { code: 'auth/wrong-password' },
      }));
      const DOM = document.createElement('div');
      DOM.append(Login(navigateTo));
      const loginBtn = DOM.querySelector('#loginBtn');
      DOM.querySelector('#email').value = 'test@test.com';
      DOM.querySelector('#password').value = '123456';
      const statusLogin = DOM.querySelector('#statusLogin');
      loginBtn.click();
      expect(auth.loginWithUserEmail).toHaveBeenCalledTimes(1);
      setTimeout(() => {
        expect(navigateTo).toHaveBeenCalledTimes(0);
        expect(statusLogin.innerText).toBe('Lo sentimos, no pudimos encontrar tu cuenta.');
      }, 0);
    });

    test('it should show an error when loginWithUserEmail return a promise rejected', async () => {
      jest.spyOn(auth, 'loginWithUserEmail').mockImplementation(() => Promise.reject());
      const DOM = document.createElement('div');
      DOM.append(Login(navigateTo));
      const loginBtn = DOM.querySelector('#loginBtn');
      DOM.querySelector('#email').value = 'test@test.com';
      DOM.querySelector('#password').value = '123456';
      const statusLogin = DOM.querySelector('#statusLogin');
      loginBtn.click();
      expect(auth.loginWithUserEmail).toHaveBeenCalledTimes(1);
      setTimeout(() => {
        expect(navigateTo).toHaveBeenCalledTimes(0);
        expect(statusLogin.innerText).toBe('Tuvimos un problema. Intente más tarde');
      }, 0);
    });
  });
});
