import {
  serverTimestamp, collection, onSnapshot, addDoc, query,
  orderBy, updateDoc, doc,
  // getDocs, deleteDoc, query, where, orderBy, getDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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

export const createPost = (formData) => addDoc(collection(db, 'post/'), {
  idUser: auth.currentUser.uid,
  createdAt: serverTimestamp(),
  text: (formData.get('text')) ? formData.get('text') : '',
  URL: '',
  idTypePost: 1, // text
  idPostStatus: 1, // 1: public, 2: private
}).then((document) => {
  const urls = [];
  formData.forEach((value, key) => {
    if (value instanceof File) {
      const storageRef = ref(storage, `${auth.currentUser.uid}/posts/${document.id}/${key}.${value.type.split('/')[1]}`);
      const metadata = { contentType: value.type };
      uploadBytes(storageRef, value, metadata)
        .then(() => getDownloadURL(storageRef)
          .then((url) => {
            urls.push(url);
            updateDoc(doc(db, 'post', document.id), {
              URL: urls,
              idTypePost: 2, // text and image
              idPostStatus: 1, // 1: public, 2: private
            }).catch((err) => err.message);
          })
          .catch((err) => err.message))
        .catch((err) => err.message);
    }
  });
  return 'The post has been created';
});
/*
export const createPost = (formData) => {
  const urls = [];
  formData.forEach((value, key) => {
    if (value instanceof File) {
      const storageRef = ref(storage, `${auth.currentUser.uid}/posts/${key.split('_')[1]}/${key}.${value.type.split('/')[1]}`);
      const metadata = { contentType: value.type };
      uploadBytes(storageRef, value, metadata)
        .then(() => getDownloadURL(storageRef)
          .then((url) => {
            urls.push(url);
          })
          .catch((err) => err.message))
        .catch((err) => err.message);
    }
  });
  addDoc(collection(db, 'post/'), {
    idUser: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    text: formData.text,
    url: urls,
    idTypePost: (urls.length === 0) ? 1 : 2, // 1: text, 2: text and image
    idPostStatus: 1, // 1: public, 2: private
  }).catch((err) => err.message);
  return 'The post has been created';
};
*/
