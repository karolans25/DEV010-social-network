// aqui exportaras las funciones que necesites
import {
  sendEmailVerification,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  serverTimestamp,
  collection, doc, setDoc,
  // onSnapshot, getDocs, addDoc, deleteDoc, query, where, orderBy, getDoc, updateDoc,
} from 'firebase/firestore';
import { auth, db, storage } from './firebaseConfig';

const actionCodeSettings = {
  url: 'http://localhost:5173/signin',
  handleCodeInApp: true,
};

/**
 * Send an email for verifyng account
 */
const sendEmailVerificationAuth = (user) => sendEmailVerification(user, actionCodeSettings)
  .then(() => 'The email to confirm your account has been sent.')
  .catch((err) => err.message);

/**
 * Send an email for verifyng account
 */
// eslint-disable-next-line max-len
export const sendPasswordResetEmailAuth = (theEmail) => sendPasswordResetEmail(auth, theEmail, actionCodeSettings)
  .then(() => 'The email to restore the password has been sent.')
  .catch((err) => err.message);

/**
 * Sign Up
 * It's for register a user into the platform (using firebase/auth)
 * @param {string} theEmail :create account by email
 * @param {string} thePassword :create accout by email and password
 */
// eslint-disable-next-line max-len
export const signUpUser = (theEmail, thePassword, ...extra) => createUserWithEmailAndPassword(auth, theEmail, thePassword)
  .then((credential) => {
    setDoc(doc(collection(db, 'user'), credential.user.uid), {
      email: credential.user.email,
      name: extra[0] ? extra[0] : credential.user.displayName,
      photo: extra[1] ? extra[1] : credential.user.photoURL,
      createdAt: serverTimestamp(),
      friends: [],
    });
    sendEmailVerificationAuth(credential.user);
    return `The user has been registered with email ${credential.user.email}\nCheck your email to confirm the account.`;
  })
  .catch((err) => err.message);

/**
 * Sign In
 * @param {*} theEmail
 * @param {*} thePassword
 * @returns
 */
// eslint-disable-next-line max-len
export const signInUser = (theEmail, thePassword) => signInWithEmailAndPassword(auth, theEmail, thePassword)
  .then((credential) => {
    let message = '';
    if (credential.user) {
      if (credential.user.emailVerified) {
        setDoc(doc(collection(db, 'user'), credential.user.uid), {
          email: credential.user.email,
          name: credential.user.displayName,
          photo: credential.user.photoURL,
          createdAt: serverTimestamp(),
          friends: [],
        });
        message = `The user has been logged with email ${credential.user.email}`;
      } else {
        // eslint-disable-next-line no-restricted-globals
        const send = confirm(`The email ${credential.user.email} hasn't been verified.\nWould you like to receive the email again?`);
        if (send) {
          sendEmailVerificationAuth(credential.user);
          message = 'The email to confirm your account has been sent';
        }
      }
    } else {
      message = `The ${theEmail} has'nt been registered`;
    }
    return message;
  })
  .catch((err) => err.message);

/**
 * 
 * @returns 
 */
export const signInGoogle = () => signInWithPopup(auth, new GoogleAuthProvider())
  .then((credential) => {
    let message = '';
    if (credential.user) {
      if (credential.user.emailVerified) {
        setDoc(doc(collection(db, 'user'), credential.user.uid), {
          email: credential.user.email,
          name: credential.user.displayName,
          photo: credential.user.photoURL,
          createdAt: serverTimestamp(),
          friends: [],
        });
        message = `The user has been registered and looged with email ${credential.user.email}`;
      } else {
        message = 'Needs verified?';
      }
    } else {
      message = 'The user hasn\'t been registered';
    }
    return message;
  })
  .catch((error) => {
    alert(error.message);
  });

auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(uid);
    db.collection('user').onSnapshot((snapshot) => {
      console.log('Línea 85 de index.js');
      console.log(snapshot.docs);
      // setupUsers(snapshot.docs);
      // setupUI(user);
    }, (err) => {
      console.log(err.message);
    });
  } else {
    // setupUI();
    // setupUsers([]);
  }
});
