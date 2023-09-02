import {
  addDoc, getDocs, onSnapshot, doc, collection, setDoc,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

// Export the StoreService object with store-related functions
const StoreService = {
  // Function to create a document in a collection
  addDocument: async (collectionStore, data) => {
    try {
      const docRef = await addDoc(collection(db, collectionStore), data); // addDoc
      console.log(`Document added with ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      console.error(`Error adding document: ${error}`);
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
      console.error(`Error getting documents: ${error}`);
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
      console.error(`Error getting documents: ${error}`);
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
      console.error(`Error getting documents with filter: ${error}`);
      throw new Error('Failed to get documents');
    }
  },

  getDocumentById: async (collectionStore, id) => {
    try {
      const docRef = await db.collection(collectionStore).doc(id).get();
      if (docRef.exists) {
        return {
          id: docRef.id,
          ...docRef.data(),
        };
      }
      throw new Error('Document not found');
    } catch (error) {
      console.error(`Error getting document: ${error}`);
      throw new Error('Failed to get document');
    }
  },

  updateDocument: async (collectionStore, id, data) => {
    try {
      console.log(collectionStore);
      console.log(id);
      console.log(data);
      await setDoc(doc(collection(db, collectionStore), id), data);
      console.log(`Document updated with ID: ${id}`);
    } catch (error) {
      console.error(`Error updating document: ${error}`);
      throw new Error('Failed to update document');
    }
  },

  deleteDocument: async (collectionStore, id) => {
    try {
      await db.collection(collectionStore).doc(id).delete();
      console.log(`Document deleted with ID: ${id}`);
    } catch (error) {
      console.error(`Error deleting document: ${error}`);
      throw new Error('Failed to delete document');
    }
  },
};

// Export the AuthService object as the default export
export default StoreService;
