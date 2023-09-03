import { serverTimestamp } from 'firebase/firestore';
import AuthService from '../firebase/authService';
import StoreService from '../firebase/storeService';
import StorageService from '../firebase/storageService';

// Create a PostController object
const PostController = {
  createPost: async (formData) => {
    try {
      const userId = await AuthService.getCurrentUser().uid;
      const docId = await StoreService.addDocument('post', {
        createdAt: serverTimestamp(),
        idUser: userId,
        text: formData.get('text') || '',
        URL: [],
        idTypePost: 1, // 1:text, 2: text and image
        idPostStatus: 1, // 1: public, 2: private
      });

      const urls = [];
      formData.forEach(async (value, key) => {
        if (key !== 'text' && value instanceof File) {
          const path = `${userId}/posts/${docId}/${key}.${value.type.split('/')[1]}`;
          await StorageService.uploadFile(value, path)
            .then((downloadUrl) => urls.push(downloadUrl))
            .then(() => StoreService.updateDocument('post', docId, {
              createdAt: serverTimestamp(),
              idUser: userId,
              text: formData.get('text') || '',
              URL: urls,
              idTypePost: (urls.length === 0) ? 1 : 2, // 1:text, 2: text and image
              idPostStatus: 1, // 1: public, 2: private
            }));
        }
      });
      return 'The post has been created';
    } catch (err) { return err.message; }
  },
};

// Export the PostController object as the default export
export default PostController;
