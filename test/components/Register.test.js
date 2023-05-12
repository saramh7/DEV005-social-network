/**
 * @jest-environment jsdom
 */
import Register '../../src/components/Register.js';
import * as auth from '../../src/lib/auth.js';


describe('signInNewAccount', () => {
  test('it should to be a function', () => {
    expect(typeof signInNewAccount).toBe('function');
  });

  test('La función signInNewAccount permite el acceso con una cuenta de correo válida', async () => {
    const email = 'prueba@prueba.com';
    const password = '123456';

    await expect(signInNewAccount(email, password))
      .resolves.not.toThrow();

    // verificar que el usuario está logeado en
    const user = auth.currentUser;
    expect(user).not.toBeNull();
    expect(user.email).toBe(email);
  });

  test('snapshot of signInNewAccount', () => {
    const template = document.createElement('div');
    template.append(signInNewAccount());
    expect(template).toMatchSnapshot();
  });
});
