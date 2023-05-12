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
  newAccount.addEventListener('click', async (e) => {
    const name = registerContainer.querySelector('#name').value;
    const lastName = registerContainer.querySelector('#lastName').value;
    const userEmail = registerContainer.querySelector('#userEmail').value;
    const password = registerContainer.querySelector('#password').value;
    const confirm = registerContainer.querySelector('#confirm').value;

    if (password !== confirm) {
      const statusLogin = registerContainer.querySelector('#statusLogin');
      statusLogin.innerText = 'Las contraseñas no coinciden.';
    } else {
      try {
        const accessRegister = await signInNewAccount(name, lastName, userEmail, password, confirm);
        console.log('LOG 💥 ~ file: Register.js:30 ~ newAccount.addEventListener ~ accessRegister:', accessRegister);
        if (accessRegister.loginOk) {
          navigateTo('/home');
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  });

  return registerContainer;
}
export default Register;
