// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
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
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, db, analytics };
