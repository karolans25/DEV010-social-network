import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup, GoogleAuthProvider,
  deleteUser, // signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { createUserStore } from './store';
import { auth } from './firebaseConfig';

// const provider = new GoogleAuthProvider();

/**
 * Send an email for verifyng account
 */
export function sendEmailVerificationAuth() {
  const actionCodeSettings = {
    url: 'http://localhost:5173/signin',
    // iOS: {
    //   bundleId: 'com.example.ios'
    // },
    // android: {
    //   packageName: 'com.example.android',
    //   installApp: true,
    //   minimumVersion: '12'
    // },
    handleCodeInApp: true,
    // When multiple custom dynamic link domains are defined, specify which
    // one to use.
    // dynamicLinkDomain: 'signin',
  };
  sendEmailVerification(auth.currentUser, actionCodeSettings)
    .catch((err) => {
      alert(err.message);
    });
}

/**
 * Send an email for verifyng account
 */
export function sendPasswordResetEmailAuth(theEmail) {
  const actionCodeSettings = {
    url: 'http://localhost:5173/signin',
    handleCodeInApp: true,
  };
  sendPasswordResetEmail(auth, theEmail, actionCodeSettings)
    .catch((err) => {
      alert(err.message.split('Firebase: ')[1]);
    });
}

/**
 * Sign Up
 * It's for register a user into the platform (using firebase/auth)
 * @param {string} theEmail :create account by email
 * @param {string} thePassword :create accout by email and password
 */
export function signUpAuth(theEmail, thePassword) {
  return createUserWithEmailAndPassword(auth, theEmail, thePassword);
}

/**
 * Sign In
 * Logging with email and password
 * @param {string} theEmail :sign in the account by email
 * @param {string} thePassword :sign in the account by email and password
 */
export function signInAuth(theEmail, thePassword) {
  return signInWithEmailAndPassword(auth, theEmail, thePassword)
    .then((credential) => {
      const user = auth.currentUser;
      console.log(credential);
      if (user) {
        if (user.emailVerified) {
          console.log('loggeado');
        } else {
          console.log('no verificado');
        }
      } else {
        console.log('no existe usuario');
      }
    });
}
// Debo agregar un pop up para preguntar si quiere que se le envíe el correo de nuevo

export function signInAuthGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
    // El usuario ha iniciado sesión con éxito
      const user = result.user;
      alert(`User registered and logged with email ${user.email}`);
      // Puedes acceder a la información del usuario a través de la variable user
      createUserStore(user.email);
    })
    .catch((error) => {
      // Ocurrió un error durante el inicio de sesión con Google
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // Maneja el error adecuadamente
      alert(error.message);
    });
}

export function deleteUserAuth() {
  const user = auth.currentUser;

  return deleteUser(user).then(() => {
  // User deleted.
  });// .catch((error) => {
  // An error ocurred
  // ...
// });
}

/** reauthenticate an user
const credential = promptForCredentials();

reauthenticateWithCredential(user, credential).then(() => {
  // User re-authenticated.
}).catch((error) => {
  // An error ocurred
  // ...
});
 */

/*
*/
/*
function signOutAuth() {
  signOut(auth)
    .then(() => {
      console.log('The user signed out');
      alert('User sign out');
    })
    .catch((err) => {
      console.log(err.message);
    });
}
*/
/** configurar el email de un usuario
updateEmail(auth.currentUser, "user@example.com").then(() => {
  // Email updated!
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});
 */
/** configurar contraseña de un usuario
const newPassword = getASecureRandomPassword();

updatePassword(user, newPassword).then(() => {
  // Update successful.
}).catch((error) => {
  // An error ocurred
  // ...
});
 */
/** actualizar el perfil de un usuario
updateProfile(auth.currentUser, {
  displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
  // Profile updated!
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});
 */
/** obtener el perfil de un usuario
if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}
 */

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(uid);
    // ...
  } else {
    // User is signed out
    // ...
  }
});
