import { registerTemplate } from '../templates/register.js';
import { signInNewAccount } from '../lib/auth.js';

function register(navigateTo) {
  const registerContainer = document.createElement('div');
  registerContainer.classList.add('registerContainer');
  registerContainer.innerHTML = registerTemplate;// Inserta el template de templates/login.js

  const form = document.createElement('form');
  const div = document.createElement('div');
  const br = document.createElement('br');
  form.className = 'fomRegister';
  const nombre = registerContainer.querySelector('#nombre');
  const apellido = registerContainer.querySelector('#apellido');
  const email = registerContainer.querySelector('#email');

  const password = registerContainer.querySelector('#password');
  const confirPassword = registerContainer.querySelector('#password-reconfirmacion');
  const loginCorreoBtn = registerContainer.querySelector('#loginBtn');

  div.append(nombre, apellido);
  form.append(div, email, password, confirPassword, br, loginCorreoBtn);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const onFinishRegister = (isSuccess) => {
      if (isSuccess) {
        navigateTo('/');
      }
    };
    signInNewAccount(email.value, password.value, onFinishRegister);
  });
  registerContainer.append(form);

  return registerContainer;
}

export default register;
