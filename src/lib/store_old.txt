import {
  collection, doc, setDoc, serverTimestamp,
  // onSnapshot, getDocs, addDoc, deleteDoc, query, where, orderBy, getDoc, updateDoc,
} from 'firebase/firestore';
import { db, auth } from './firebaseConfig';

/**
   * It's created for register users in the app
   * @param {string} theEmail :email for signing up
   * @param {string} thePassword :password of the account
   */
export function createUserStore() {
  const userColRef = collection(db, 'user');
  const userDoc = doc(userColRef, auth.currentUser.uid);
  setDoc(userDoc, {
    email: auth.currentUser.email,
    name: auth.currentUser.displayName,
    photo: auth.currentUser.photoURL,
    createdAt: serverTimestamp(),
    friends: [],
  })
    .then(() => {
      alert('Created in Firestore');
    });
}

// export function createPostStore() {
//   const userColRef = collection(db, 'post');
//   const addDoc()
// }
/*
  // queries
  const q = query(colRef, orderBy('createdAt'));

  // queries
  const q = query(colRef, orderBy('createdAt'));

  // get real time collection data with a filter
  onSnapshot(q, (snapshot) => {
    const posts = [];
    snapshot.docs.forEach((document) => {
      posts.push({ ...document.data(), id: document.id });
    });
    console.log(posts);
  });

  // queries
  const q = query(colRef, where('pass', '==', 'me'), orderBy('text', 'desc'));

  // get real time collection data with a filter
  onSnapshot(q, (snapshot) => {
    const posts = [];
    snapshot.docs.forEach((document) => {
      posts.push({ ...document.data(), id: document.id });
    });
    console.log(posts);
  });

  // queries
  const q = query(colRef, where('pass', '==', 'me'));

  // get real time collection data with a filter
  onSnapshot(q, (snapshot) => {
    const posts = [];
    snapshot.docs.forEach((document) => {
      posts.push({ ...document.data(), id: document.id });
    });
    console.log(posts);
  });

  // get real time collection data
  onSnapshot(colRef, (snapshot) => {
    const posts = [];
    snapshot.docs.forEach((document) => {
      posts.push({ ...document.data(), id: document.id });
    });
    console.log(posts);
  });

  // get static collection data
  getDocs(colRef)
    .then((snapshot) => {
      const posts = [];
      snapshot.docs.forEach((document) => {
        posts.push({ ...document.data(), id: document.id });
      });
      console.log(posts);
    })
    .catch((err) => {
      console.log(err.message);
    });
  */

/*

  // delete post
  const docRef = doc(db, 'post', 'LzeicGshkLbpcmzgtiGU');

  deleteDoc(docRef).then(() => {
    alert('Deleted');
  });
  */

/*
  // get one doc by its id and subscribe to its change
  const docRef = doc(db, 'post', 'HwZlpQabPH3XodOY9Z7W');

  getDoc(docRef)
    .then((document) => {
      console.log(document.data(), document.id);
    });

  // subscribe to an unique doc when change
  onSnapshot(docRef, (document) => {
    console.log(document.data(), document.id);
  });
  */

// update a document
/*
  const docRef = doc(db, 'post', 'aW1XmHENplgBVyGrPFLE');

  updateDoc(docRef, {
    text: 'updated pepito',
    pass: 'Florez',
    createdAt: serverTimestamp(),
  })
    .then(() => {
      alert('Updated');
    });
  */
/*
  const docRef = doc(db, 'post', 'aW1XmHENplgBVyGrPFLE');

  // subscribe to an unique doc when change
  onSnapshot(docRef, (document) => {
    console.log(document.data(), document.id);
  });
  */
