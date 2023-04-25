/**
 * En este archivo tiene todas las funciones que conectarán el DOM con Firestore.
 */

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './index.js';

const provider = new GoogleAuthProvider();
auth.languageCode = 'es';

/**
 * Function de ingreso con correo de google.
 * Se creó con la documentación de Firebase.
 * Utiliza el método signInWithPopup de la librería firebase/auth
 * @return  {object} Objeto con el status del intento de login con google
*/
const googleLogin = async () => {
  const loginStatus = await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      return { loginOk: true, data: { user, token } };
    })
    .catch((error) => ({
      loginOk: false,
      data: error,
    }));
  return loginStatus;
};

/**
 * Function para finalizar sesión.
 * Se creó con la documentación de Firebase.
 * Utiliza el método signOut de la librería firebase/auth
 * @return  no retorna datos, sólo imprime por consola el resultado del proceso.
*/
const googleLogout = async () => {
  await signOut(auth)
    .then(() => {
      console.warn('Sign-out successful');
    })
    .catch((error) => {
      console.warn('auth.js - googleLogout - Error:', error);
    });
};

/**
 * Function para crear un nuevo usuario.
 * Debe ser instanciada desde el archivo components/Register.js
 * Se creó con la documentación de Firebase.
 * Utiliza el método createUserWithEmailAndPassword de la librería firebase/auth
 * @param  {string} email del nuevo usuario
 * @param  {string} password del nuevo usuario
 * @return  por el momento no retorna datos porque no está siendo utilizada aún.
*/
const signInNewAccount = async (email, password, onFinishRegister) => {
  // función registrarse
  await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    onFinishRegister(true);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    onFinishRegister(false);
  });
};

/**
 * Function para ingresar con email y password.
 * Debe ser instanciada desde el archivo components/Login.js
 * Se creó con la documentación de Firebase.
 * Utiliza el método signInWithEmailAndPassword de la librería firebase/auth
 * @param  {string} email del usuario que desea ingresar a la App
 * @param  {string} password del usuario que desea ingresar a la App
 * @return {object} Objeto con el resultado del intento de login con email y password
*/
const loginWithUserEmail = async (email, password) => {
  const resultLogin = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => ({ loginOk: true, data: userCredential }))
    .catch((error) => ({ loginOk: false, data: error }));

  return resultLogin;
};

/**
 * Function para validar si existe una sesión activa para el usuario que ingresa a la App.
 * Debe ser instanciada desde el archivo components/Login.js
 * Se creó con la documentación de Firebase.
 * Utiliza el método onAuthStateChanged de la librería firebase/auth
 * @return {object} Debe retornar un objeto con los datos del usuario si es que existe una sesión
 * iniciada. De lo contrario debe retornar un null. Esta función aun no trabaja correctamente.
 * Trabajo en Progreso.
*/
const validateSession = () => {
  // Ver como retornar los datos correctos porque está retornando una función
  const sessionData = onAuthStateChanged(auth, (user) => {
    console.log('LOG 💥 ~ file: auth.js:64 ~ sessionData ~ user:', user);
    if (user) {
      return user;
    }
    return null;
  });
  console.log('LOG 💥 ~ file: auth.js:63 ~ validateSession ~ sessionData:', sessionData);

  if (sessionData) {
    console.warn('Active Session');
    return sessionData;
  }

  console.warn('Inactive Session');
  return null;
};

export {
  googleLogin,
  googleLogout,
  signInNewAccount,
  validateSession,
  loginWithUserEmail,
};
