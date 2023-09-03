import {
  addDoc, getDocs, onSnapshot, doc, collection, setDoc, query, where, getDoc,
  deleteDoc, orderBy,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
// import AuthService from './authService';

// Export the StoreService object with store-related functions
const StoreService = {
  // Function to create a document in a collection
  addDocument: async (collectionStore, data) => {
    try {
      const docRef = await addDoc(collection(db, collectionStore), data); // addDoc
      // console.log(`Document added with ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      // console.error(`Error adding document: ${error}`);
      throw new Error('Failed to add document');
    }
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
      // console.error(`Error getting documents: ${error}`);
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
      // console.error(`Error getting documents: ${error}`);
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
      // console.error(`Error getting documents with filter: ${error}`);
      throw new Error('Failed to get documents');
    }
  },

  getDocumentById: async (collectionStore, id) => {
    try {
      // const docRef = await getDoc(doc(db, collectionStore, id));
      const docRef = await getDoc(doc(collection(db, collectionStore), id));
      if (docRef.exists) {
        return {
          id: docRef.id,
          ...docRef.data(),
        };
      }
      throw new Error('Document not found');
    } catch (error) {
      // console.error(`Error getting document: ${error}`);
      throw new Error('Failed to get document');
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
      await setDoc(doc(collection(db, collectionStore), id), data);
      // console.log(`Document updated with ID: ${id}`);
    } catch (error) {
      // console.error(`Error updating document: ${error}`);
      throw new Error('Failed to update document');
    }
  },

  deleteDocument: async (collectionStore, id) => {
    try {
      await deleteDoc(doc(db, collectionStore, id));
      // console.log(`Document deleted with ID: ${id}`);
    } catch (error) {
      // console.error(`Error deleting document: ${error}`);
      throw new Error('Failed to delete document');
    }
  },
};

// Export the AuthService object as the default export
export default StoreService;
