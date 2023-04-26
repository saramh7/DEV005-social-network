import { signInNewAccount } from '../templates/auth.js';

function register(navigateTo) {
  const section = document.createElement('section');
  const newAccountButton = document.createElement('button');
  const formNewAccount = document.createElement('form');
  const nameNewAccount = document.createElement('input');
  const lastNameNewAccount = document.createElement('input');
  const userNameNewAccount = document.createElement('input');
  const passwordNewAccount = document.createElement('input');
  const confirmationNewAccount = document.createElement('input');

  newAccountButton.className = 'new-account-btn';

  newAccountButton.textContent = 'Crear cuenta'; // Crea cuenta
  newAccountButton.addEventListener('click', async (e) => {
    try {
      await signInNewAccount();
    } catch (error) {
      console.log(error);
    }
  });

  formNewAccount.append(
    nameNewAccount,
    lastNameNewAccount,
    userNameNewAccount,
    passwordNewAccount,
    confirmationNewAccount,
    newAccountButton,
  );

  formNewAccount.append(
    nameNewAccount,
    lastNameNewAccount,
    userNameNewAccount,
    passwordNewAccount,
    confirmationNewAccount,
    newAccountButton,
  );
  section.append(formNewAccount);
  section.className = 'login';
  return section;
}

export default register;
