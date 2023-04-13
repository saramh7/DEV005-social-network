import {
  GoogleAuthProvider, signInWithPopup, signOut,
} from 'firebase/auth';
import { auth } from './firebase.js';

const provider = new GoogleAuthProvider();
auth.languageCode = 'es';

export const googleLogin = async () => {
  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)

      console.log('Usuario Loggeado exitosamente', result);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...

      console.log('Error', error);
    });
};

export const googleLogout = async () => {
  await signOut(auth).then(() => {
    console.log('Sign-out successful');
    // Sign-out successful.
  }).catch((error) => {
    console.log('Error', error);
    // An error happened.
  });
};
