/**
 * Vista 2. Registrase
 */
import { registerTemplate } from '../templates/register.js';
import { signInNewAccount } from '../lib/auth';

function Register(navigateTo) {
  const registerContainer = document.createElement('div');
  registerContainer.classList.add('registerContainer');
  registerContainer.innerHTML = registerTemplate;

  const newAccount = registerContainer.querySelector('#registerBtn');
  newAccount.addEventListener('click', async () => {
    const name = registerContainer.querySelector('#name').value;
    const lastName = registerContainer.querySelector('#lastName').value;
    const userEmail = registerContainer.querySelector('#userEmail').value;
    const password = registerContainer.querySelector('#password').value;
    const confirm = registerContainer.querySelector('#confirm').value;
    const statusLogin = registerContainer.querySelector('#statusLogin');

    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (name === '' || lastName === '' || userEmail === '' || password === '' || confirm === '') {
      statusLogin.innerText = 'Debe llenar todos los datos antes de crear tu cuenta.';
    } else if (!userEmail.match(validEmailRegex)) {
      statusLogin.innerText = 'Debes ingresar un correo válido';
      registerContainer.querySelector('#userEmail').focus();
      return false;
    } else if (password !== confirm) {
      statusLogin.innerText = 'Ups... Las contraseñas no coinciden.';
    } else {
      try {
        const accessRegister = await signInNewAccount(name, lastName, userEmail, password, confirm);
        if (accessRegister.loginOk) {
          navigateTo('/home');
        } else {
          statusLogin.innerText = `Tuvimos un problema creando tu cuenta. Error: ${accessRegister.data.code}`;
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  });

  return registerContainer;
}
export default Register;
