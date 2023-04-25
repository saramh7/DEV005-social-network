/**
 * Vista 1. Inicia sesión
 */
import {
  googleLogin, validateSession, loginWithUserEmail,
} from '../lib/auth';
import { loginTemplate } from '../templates/login.js';

function Login(navigateTo) {
  const loginContainer = document.createElement('div');
  loginContainer.classList.add('loginContainer');
  loginContainer.innerHTML = loginTemplate; // Inserta el template de templates/login.js

  /**
  * Por revisar, no está funcionando correctamente.
  * Se supone que debe validar si el usuario tiene una sesión activa para redirigirlo
  * directamente al Home
  */
  // const validate = validateSession();
  // if (validate) {
  //   console.log('va');
  //   navigateTo('/home');
  //   return '<div></div>';
  // }

  /**
  * Agrega evento click al botón de ingresar con google
  */
  const loginGoogleBtn = loginContainer.querySelector('#loginGoogleBtn');
  loginGoogleBtn.addEventListener('click', async () => {
    try {
      // Invoca función googleLogin del archivo lib/auth.js y recibe datos retornados
      const accessData = await googleLogin();
      if (accessData.loginOk) {
        navigateTo('/home'); // Si el ingreso del usuario es correcto lo redirige al Home.
      } else {
        const statusLogin = loginContainer.querySelector('#statusLogin');
        switch (accessData.data.code) {
          case 'auth/popup-closed-by-user':
            statusLogin.innerText = 'Lo sentimos, la ventana de ingreso fue cerrada.';
            break;
          default:
            statusLogin.innerText = 'Hubo un problema con tu inicio de sesión. Contacta al administrador de la App';
        }
      }
    } catch (error) {
      // Si algo falla en el proceso de login con Google muestra este log por consola y muestra
      // un error en el label id="statusLogin"
      console.warn('Login.js - loginGoogleBtn - click - Error: ', error);
      const statusLogin = loginContainer.querySelector('#statusLogin');
      statusLogin.innerText = 'Tuvimos un problema. Intente más tarde';
    }
  });

  /**
  * Agrega evento click al botón de ingresar con email y password
  */
  const loginBtn = loginContainer.querySelector('#loginBtn');
  loginBtn.addEventListener('click', async () => {
    // Lee los datos ingresados por el usuario en el campo email y password
    const email = loginContainer.querySelector('#email').value;
    const password = loginContainer.querySelector('#password').value;

    // Instancia el label de error del login (donde se mostrarán los errores)
    const statusLogin = loginContainer.querySelector('#statusLogin');

    // Valida que el usuario haya ingresado ambos datos
    if (email === '' || password === '') {
      statusLogin.innerText = 'Debe ingresar su email y password antes de continuar.';
      return null;
    }

    try {
      // Invoca función loginWithUserEmail del archivo lib/auth.js y recibe datos retornados
      const accessData = await loginWithUserEmail(email, password);
      if (accessData.loginOk) {
        navigateTo('/home'); // Si el ingreso del usuario es correcto lo redirige al Home.
      } else {
        // Si el ingreso del usuario es incorrecto muestra un mensaje de error
        // en el label id="statusLogin" según el error que se recibe desde Firebase
        // hay muchas posibilidades de error. Sólo estamos mostrando mensajes personalizados
        // para 2 posibles errores: user-not-found y wrong-password
        switch (accessData.data.code) {
          case 'auth/user-not-found':
            // link para documentación: https://firebase.google.com/docs/auth/admin/errors?hl=es-419
            statusLogin.innerText = 'Lo sentimos, no pudimos encontrar tu cuenta';
            break;
          case 'auth/wrong-password':
            statusLogin.innerText = 'La contraseña es inválida';
            break;
          default:
            statusLogin.innerText = 'Hubo un problema con tu inicio de sesión. Contacta al administrador de la App';
        }
      }
    } catch (error) {
      // Si algo falla en el proceso de login con Google muestra este log por consola y muestra
      // un error en el label id="statusLogin"
      console.warn('Login.js - loginBtn - click - Error: ', error);
      statusLogin.innerText = 'Tuvimos un problema. Intente más tarde';
    }

    return null;
  });
  return loginContainer;
}

export default Login;
