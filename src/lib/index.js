/**
 * En este archivo se cargan todas las configuraciones para utilizar los servicios
 * de firebase. Se exportan las variables auth, db y analytics que contienen las
 * instancias a cada servicio para ser utilizadas en los archivos correspondientes
 * a cada servicio.
 *
 * const auth = contiene la instancia para el servicio de autenticación
 * const db = contiene la instancia para el servicio de firestore (base de datos)
 * const analytics = contiene la instancia para el servicio de google analytics
 *
 * Este archivo se construyó con la configuración propuesta por la documentación
 * de Firebase. https://firebase.google.com/docs/web/setup?authuser=0&hl=es
 * NO MODIFICAR
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAz6OSQ_9gp07rKjoq31lfRM0zbjGBzbYU',
  authDomain: 'social-network-te-recomiendo.firebaseapp.com',
  projectId: 'social-network-te-recomiendo',
  storageBucket: 'social-network-te-recomiendo.appspot.com',
  messagingSenderId: '647650903243',
  appId: '1:647650903243:web:6da88eb1edc7230645c74e',
  measurementId: 'G-GTG1855LG3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, db };
