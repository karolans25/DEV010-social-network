// aqui exportaras las funciones que necesites
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import {
  serverTimestamp,
  collection, doc, setDoc,
  // onSnapshot, getDocs, addDoc, deleteDoc, query, where, orderBy, getDoc, updateDoc,
} from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

export const signUpUser = (theEmail, thePassword, ...extra) => createUserWithEmailAndPassword(auth, theEmail, thePassword)
  .then((credential) => {
    setDoc(doc(collection(db, 'user'), credential.user.uid), {
      email: credential.user.email,
      name: extra[0] ? extra[0] : credential.user.displayName,
      photo: extra[1] ? extra[1] : credential.user.photoURL,
      createdAt: serverTimestamp(),
      friends: [],
    });
    const actionCodeSettings = {
      url: 'http://localhost:5173/signin',
      handleCodeInApp: true,
    };
    sendEmailVerification(auth.currentUser, actionCodeSettings);
    return `The user has been registered with email ${credential.user.email}`;
  })
  .catch((err) => err.message);

export const signInUser = (theEmail, thePassword) => {
  const user = auth.currentUser;
  if (user) {
    if (user.emailVerified) {
      return signInWithEmailAndPassword(auth, theEmail, thePassword)
        .then((credential) => console.log(credential.user));
    }
    const yes = confirm('You\'re email is not verified.\nSend the link for email verification again?');
    if (yes) {
      const actionCodeSettings = {
        url: 'http://localhost:5173/signin',
        handleCodeInApp: true,
      };
      return sendEmailVerification(user, actionCodeSettings);
    }
  }
  return 'The user doesn\'t exist or doesn\'t have an active session';
};

// Debo agregar un pop up para preguntar si quiere que se le envíe el correo de nuevo
/*
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(uid);
    db.collection('user').onSnapshot((snapshot) => {
      setupUsers(snapshot.docs);
      setupUI(user);
    }, (err) => {
      console.log(err.message);
    });
  } else {
    setupUI();
    setupUsers([]);
  }
});
*/
