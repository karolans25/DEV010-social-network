import {
  addDoc, getDocs, onSnapshot, doc,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

// Export the StoreService object with store-related functions
const StoreService = {
  // Function to create a document in a collection
  addDocument: async (collection, data) => {
    try {
      const docRef = await addDoc(collection(db, collection), data); // addDoc
      console.log(`Document added with ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      console.error(`Error adding document: ${error}`);
      throw new Error('Failed to add document');
    }
  },

  // Get the static database
  getAllDocuments: async (collection) => {
    try {
      const snapshot = await getDocs(collection(db, collection)); // getDocs
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
  getAllDocumentsRealTime: async (collection) => {
    try {
      const snapshot = await getDocs(collection(db, collection));
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

  getDocumentById: async (collection, id) => {
    try {
      const docRef = await db.collection(collection).doc(id).get();
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

  updateDocument: async (collection, id, data) => {
    try {
      await doc(collection(db, collection), id).update(data);
      console.log(`Document updated with ID: ${id}`);
    } catch (error) {
      console.error(`Error updating document: ${error}`);
      throw new Error('Failed to update document');
    }
  },

  deleteDocument: async (collection, id) => {
    try {
      await db.collection(collection).doc(id).delete();
      console.log(`Document deleted with ID: ${id}`);
    } catch (error) {
      console.error(`Error deleting document: ${error}`);
      throw new Error('Failed to delete document');
    }
  },
};

// Export the AuthService object as the default export
export default StoreService;
