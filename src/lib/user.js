import {
  serverTimestamp, collection, onSnapshot, addDoc, query, where, deleteDoc,
  orderBy, updateDoc, doc, getDocs, getDoc,
  // getDocs, deleteDoc, query, where, orderBy, getDoc,
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
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
  URL: [],
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

// Update
export const updatePost = (formData) => {
  console.log(formData);
  return updateDoc(doc(db, 'post', formData.get('id')), {
    createdAt: serverTimestamp(),
    text: (formData.get('text')) ? formData.get('text') : '',
    URL: [],
    idTypePost: 1, // text
    idPostStatus: 1, // 1: public, 2: private
  });
};
  /* .then((document) => {
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
};
*/

// Delete
export const deletePost = (idPub) => {
  deleteDoc(doc(db, 'post', idPub)).then(() => {
    alert('Deleted');
  });
};

export const reactPost = (idPub, idType) => addDoc(collection(db, 'like'), {
  idUser: auth.currentUser.uid,
  idPost: idPub,
  likedAt: serverTimestamp(),
  idTypeLike: idType,
})
  .then((document) => document.id);

export const hasReactedPost = (idPub) => {
  const q = query(collection(db, 'like'), where('idPost', '==', `${idPub}`), where('idUser', '==', `${auth.currentUser.uid}`));
  return getDocs(q);
};

export const unreactPost = (idLike) => deleteDoc(doc(db, 'like', idLike))
  .then(() => {
    console.log('Deleted');
  });

export const updateReactPost = (idType, idLike) => updateDoc(doc(db, 'like', idLike), {
  idTypeLike: idType,
  likedAt: serverTimestamp(),
});

export const createComment = (data) => addDoc(collection(db, 'comment'), {
  text: data.text,
  idUser: auth.currentUser.uid,
  idPost: data.idPost,
  createdAt: serverTimestamp(),
})
  .then((document) => document.id);

/*
export const hasReactedPost = (idPub) => {
  const q = query(collection(db, 'like'), where('idPost', '==', `${idPub}`), where('idUser', '==', `${auth.currentUser.uid}`));
  return getDocs(q);
};

export const unreactPost = (idLike) => deleteDoc(doc(db, 'like', idLike))
  .then(() => {
    console.log('Deleted');
  });

export const updateReactPost = (idType, idLike) => updateDoc(doc(db, 'like', idLike), {
  idTypeLike: idType,
  likedAt: serverTimestamp(),
});
*/

export const getMyReactionPost = (idPub) => {
  const q = query(collection(db, 'like'), where('idPost', '==', `${idPub}`, where('idUser', '==', auth.currentUser.uid)));
  onSnapshot(q, (snapshot) => {
    const likes = [];
    snapshot.docs.forEach((document) => {
      likes.push({ ...document.data(), id: document.id });
    });
    return likes;
  });
};

export const getReactionsPost = (idPub) => {
  const q = query(collection(db, 'like'), where('idPost', '==', `${idPub}`));
  onSnapshot(q, (snapshot) => {
    const likes = [];
    snapshot.docs.forEach((document) => {
      likes.push({ ...document.data(), id: document.id });
    });
    return likes;
  });
};

export const getUserReactions = () => {
  const q = query(collection(db, 'like'), where('idUser', '==', `${auth.currentUser.uid}`));
  onSnapshot(q, (snapshot) => {
    const likes = [];
    snapshot.docs.forEach((document) => {
      likes.push({ ...document.data(), id: document.id });
    });
    return likes;
  });
};

export const getReactionMessage = (idTypeReaction) => getDoc(doc(db, 'typeLike', idTypeReaction)).then((document) => document.data());

export const signOutAuth = () => {
  signOut(auth)
    .then(() => {
      console.log('The user signed out');
      alert('User sign out');
    })
    .catch((err) => {
      console.log(err.message);
    });
};
// } else if (likes[0].idTypeLike === idType) {
//   unreactPost(likes[0].id);
// } else if (likes[0].idTypeLike !== idType) {
//   unreactPost(likes[0].id);
//   addDoc(collection(db, 'like/'), {
//     idUser: auth.currentUser.uid,
//     idPost: idPub,
//     likedAt: serverTimestamp(),
//     idTypeLike: Number(idType),
//   }).then((document) => {
//     console.log(document);
//   });
// updateReactPost(idType, likes[0].id);

// return 'The post has been created';
// });
