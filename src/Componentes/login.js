import { googleLogin, googleLogout } from '../lib/auth';

function login(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const buttonLoginGoogle = document.createElement('button');
  const buttonLogoutGoogle = document.createElement('button');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonLogin = document.createElement('button');

  inputEmail.placeholder = 'Write email';
  inputPass.placeholder = 'pass';

  title.textContent = 'Login';
  buttonLogin.textContent = 'go';

  buttonReturn.textContent = 'Return to home';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  buttonLoginGoogle.textContent = 'Login con Google';
  buttonLoginGoogle.addEventListener('click', async (e) => {
    try {
      await googleLogin();
    } catch (error) {
      console.log(error);
    }
  });

  buttonLogoutGoogle.textContent = 'Logout';
  buttonLogoutGoogle.addEventListener('click', async (e) => {
    try {
      await googleLogout();
    } catch (error) {
      console.log(error);
    }
  });

  form.append(inputEmail, inputPass, buttonLogin);
  section.append(title, form, buttonLoginGoogle, buttonLogoutGoogle, buttonReturn);
  section.className = 'login';

  return section;
}

export default login;
