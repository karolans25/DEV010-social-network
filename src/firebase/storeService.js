import {
  addDoc, getDocs, onSnapshot, doc, collection, updateDoc, query, where, getDoc,
  deleteDoc, orderBy, setDoc,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import AuthService from './authService';
// import AuthService from './authService';

// Export the StoreService object with store-related functions
const StoreService = {
  // Function to create a document in a collection
  addDocument: async (collectionStore, data) => {
    try {
      const docRef = await addDoc(collection(db, collectionStore), data);
      return docRef.id;
    } catch (error) {
      throw new Error('Failed to add document');
    }
  },

  addDocumentWithId: async (collectionStore, id, data) => {
    try {
      const storeDoc = await doc(collection(db, collectionStore), id);
      return await setDoc(storeDoc, data);
    } catch (err) { return err.message; }
  },

  // Get the static database
  getAllDocuments: async (collectionStore) => {
    try {
      const snapshot = await getDocs(collection(db, collectionStore)); // getDocs
      const documents = snapshot.docs.map((theDoc) => ({
        id: theDoc.id,
        ...theDoc.data(),
      }));
      return documents;
    } catch (error) {
      throw new Error('Failed to get documents');
    }
  },

  // Get the real time database
  getAllDocumentsRealTime: async (collectionStore) => {
    try {
      const snapshot = await getDocs(collection(db, collectionStore));
      const documents = snapshot.docs.map((theDoc) => ({
        id: theDoc.id,
        ...theDoc.data(),
      }));
      return documents;
    } catch (error) {
      throw new Error('Failed to get documents');
    }
  },

  // Get the real time database with filter
  getAllDocumentsRealTimeWithFilter: async (q) => {
    try {
      const snapshot = await onSnapshot(q);
      const likes = [];
      snapshot.docs.forEach((element) => {
        likes.push({ ...element.data(), id: element.id });
      });
      return likes;
    } catch (error) {
      throw new Error('Failed to get documents');
    }
  },

  getDocumentById: async (collectionStore, id) => {
    try {
      // const docRef = await getDoc(doc(db, collectionStore, id));
      const docSnap = await getDoc(doc(db, collectionStore, id));
      if (docSnap.exists()) {
        return docSnap.data();
      }
      throw new Error('Document not found line 92 store service');
    } catch (err) {
      return err.message;
    }
  },

  // getDocumentByFilter: (collectionStore) => {
  //   const q = query(collection(db, collectionStore), orderBy('createdAt', 'desc'));
  //   // return onSnapshot(q);
  //   // onSnapshot(q).then((snapshot) => console.log(snapshot.docs.length));
  //   onSnapshot(q, (snapshot) => {
  //     const docs = [];
  //     snapshot.docs.forEach((element) => docs.push({ ...element.data(), id: element.id }));
  //   });
  // },

  getDocumentByFilter: (collectionStore) => {
    const q = query(collection(db, collectionStore), orderBy('createdAt', 'desc'));
    return new Promise((resolve, reject) => {
      onSnapshot(q, (snapshot) => {
        const docs = [];
        snapshot.docs.forEach((element) => docs.push({ ...element.data(), id: element.id }));
        resolve(docs);
      }, (err) => {
        reject(err);
      });
    });
  },

  getDocumentByComposeFilter: async (collectionStore, userId) => {
    const q = query(collection(db, collectionStore), where('idUser', '==', `${userId}`), orderBy('createdAt', 'desc'));
    return new Promise((resolve, reject) => {
      onSnapshot(q, (snapshot) => {
        const docs = [];
        snapshot.docs.forEach((element) => docs.push({ ...element.data(), id: element.id }));
        resolve(docs);
      }, (err) => {
        reject(err);
      });
    });
  },

  updateDocument: async (collectionStore, id, data) => {
    try {
      return updateDoc(doc(collection(db, collectionStore), id), data);
    } catch (err) {
      return err.message;
    }
  },

  deleteDocument: async (collectionStore, id) => {
    try {
      return deleteDoc(doc(db, collectionStore, id));
    } catch (err) {
      return err.message;
    }
  },

  hasReactedPost: (idPost) => {
    const q = query(collection(db, 'like'), where('idPost', '==', `${idPost}`), where('idUser', '==', `${AuthService.getCurrentUser().uid}`));
    return getDocs(q);
  },

  deleteLikesPost: async (idPost) => {
    const q = query(collection(db, 'like'), where('idPost', '==', idPost));
    await getDocs(q).then((documents) => documents.forEach((item) => deleteDoc(doc(db, 'like', item.id))));
  },
};

// Export the AuthService object as the default export
export default StoreService;
