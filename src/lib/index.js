// aqui exportaras las funciones que necesites
import {
  sendEmailVerification,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
} from 'firebase/auth';
import {
  serverTimestamp,
  collection, doc, setDoc,
  onSnapshot,
  // getDocs, addDoc, deleteDoc, query, where, orderBy, getDoc, updateDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from 'firebase/storage';
import { auth, db, storage } from './firebaseConfig';

const actionCodeSettings = {
  url: 'http://localhost:5173/signin',
  handleCodeInApp: true,
};

// eslint-disable-next-line max-len
const displayImage = (imageRef) => getDownloadURL(imageRef).catch((err) => err.message);

const sendEmailVerificationAuth = (user) => sendEmailVerification(user, actionCodeSettings)
  .then(() => 'The email to confirm your account has been sent.')
  .catch((err) => err.message);

// eslint-disable-next-line max-len
export const sendPasswordResetEmailAuth = (theEmail) => sendPasswordResetEmail(auth, theEmail, actionCodeSettings)
  .then(() => 'The email to restore the password has been sent.')
  .catch((err) => err.message);

const deleteUserAuth = () => {
  deleteUser(auth.currentUser).then(() => {
    // User deleted.
  }).catch((err) => err.message);
};

// eslint-disable-next-line max-len
export const signUpUser = (theEmail, thePassword, ...extra) => createUserWithEmailAndPassword(auth, theEmail, thePassword)
  .then((credential) => {
    let message = '';
    if (credential.user) {
      const storageRef = ref(storage, `${credential.user.uid}/profile.${extra[1].type.split('/')[1]}`);
      const metadata = { contentType: extra[1].type };
      uploadBytes(storageRef, extra[1], metadata)
        .then(() => displayImage(storageRef)
          .then((url) => setDoc(doc(collection(db, 'user'), credential.user.uid), {
            email: credential.user.email,
            name: extra[0],
            photo: url,
            createdAt: serverTimestamp(),
            friends: [],
          }).catch((err) => console.log(err.message)))
          .catch((err) => console.log(err.message)))
        .catch((err) => console.log(err.message));
      // first catch: setDoc
      //  - must delete the directory in storage named with the user id
      //  - must to delete the document in store
      //  - must to delete the user in auth ?
      // second catch: displayImage => downloadURL
      //  - must delete the directory in storage named with the user id
      //  - must to delete the user in auth ?
      // thirth catch: uploadBytes
      //  - must to delete the user in auth ?
      sendEmailVerificationAuth(credential.user);
      message = `The user has been registered with email ${credential.user.email}\nCheck your email to confirm the account.`;
    }
    if (message === '') {
      deleteUser(auth.currentUser).then(() => {
        // User deleted.
      });// .catch((error) => {
      // An error ocurred
      // ...
      // });
    }
    return message;
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
      fetch(credential.user.photoURL).then((res) => res.blob()).then((blob) => {
        const storageRef = ref(storage, `${credential.user.uid}/profile.${blob.type.split('/')[1]}`);
        const metadata = { contentType: blob.type };
        uploadBytes(storageRef, blob, metadata).then(() => getDownloadURL(storageRef).then((url) => setDoc(doc(collection(db, 'user'), credential.user.uid), {
          email: credential.user.email,
          name: credential.user.displayName,
          photo: url,
          createdAt: serverTimestamp(),
          friends: [],
        })));
      });
      message = `The user has been registered and looged with email ${credential.user.email}`;
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
    // const uid = user.uid;
    // console.log(uid);
    const colRef = collection(db, 'user');
    onSnapshot(colRef, (snapshot) => {
      console.log('Línea 85 de index.js');
      console.log(snapshot.docs);
      // setupUsers(snapshot.docs);
      // setupUI(user);
    }).catch((err) => {
      console.log(err.message);
    });
  } else {
    // setupUI();
    // setupUsers([]);
  }
});

// Since you mentioned your images are in a folder,
// we'll create a Reference to that folder:
export const loadDefaultImages = () => {
  const storageRef = ref(storage, 'default');

  const defaultArr = [];

  listAll(storageRef).then((result) => {
    result.items.forEach((imageRef) => {
      displayImage(imageRef).then((url) => defaultArr.push(url));
    });
  }).then(() => defaultArr).catch((err) => err.message);
};
