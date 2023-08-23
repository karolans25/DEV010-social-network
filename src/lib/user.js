import {
  serverTimestamp,
  collection, doc, setDoc,
  onSnapshot,
  addDoc,
  updateDoc,
  query,
  orderBy,
  // getDocs, deleteDoc, query, where, orderBy, getDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from 'firebase/storage';
import { displayImage } from './index';
import { auth, db, storage } from './firebaseConfig';

export const getAllPosts = () => {
  const q = query(collection(db, 'post'), orderBy('createdAt', 'desc'));
  const posts = [];
  onSnapshot(q, (snapshot) => {
    snapshot.docs.forEach((document) => {
      posts.push({ ...document.data(), id: document.id });
    });
  });
};

export const createPost = (theText, ...extra) => addDoc(collection(db, 'post/'), {
  idUser: auth.currentUser.uid,
  createdAt: serverTimestamp(),
  text: theText,
  URL: '',
  idTypePost: 1,
  idPostStatus: 2,
}).then((document) => {
  if (extra[0]) {
    const storageRef = ref(storage, `${auth.currentUser.uid}/posts/${document.id}.${extra[0].type.split('/')[1]}`);
    const metadata = { contentType: extra[0].type };
    uploadBytes(storageRef, extra[0], metadata)
      .then(() => displayImage(storageRef)
        .then((url) => {
          const docRef = doc(db, 'post', document.id);
          updateDoc(docRef, {
            URL: url,
          }).catch((err) => err.message);
        }).catch((err) => err.message)).catch((err) => err.message);
    return 'The post has been created with an image';
  }
  return 'The post has been created';
})
  .catch((err) => err.message);
