import {
  uploadBytes, ref, getDownloadURL,
} from 'firebase/storage';
import { storage } from './firebaseConfig';

const StorageService = {

  uploadFile: async (file, path) => {
    try {
      // const storageRef = ref(storage);
      // const fileRef = storageRef.child(file.name);
      // await fileRef.put(file);
      await uploadBytes(ref(storage, path), file);
      // const downloadUrl = await fileRef.getDownloadURL();
      const downloadUrl = await getDownloadURL(ref(storage, path));
      return downloadUrl;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error}`);
    }
  },

  // Function to delete a file from Firebase storage
  deleteFile: async (filePath) => {
    try {
      const storageRef = ref(storage, filePath);
      await storageRef.delete();
    } catch (error) {
      throw new Error(`Failed to delete file: ${error}`);
    }
  },
};

// Export the StorageService object as the default export
export default StorageService;
