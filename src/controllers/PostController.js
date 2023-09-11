import { serverTimestamp } from 'firebase/firestore';
import AuthService from '../firebase/authService';
import StoreService from '../firebase/storeService';
import StorageService from '../firebase/storageService';

// Create a PostController object
const PostController = {
  createPostData: async (formData) => {
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

  getPostDataById: (idPost) => StoreService.getDocumentById('post', idPost),

  updatePostData: async (idPost, formData) => {
    try {
      const urls = [];
      const currentUser = await AuthService.getCurrentUser();
      formData.forEach(async (value, key) => {
        if (key !== 'text' && value instanceof File) {
          const path = `${currentUser.uid}/posts/${idPost}/${key}.${value.type.split('/')[1]}`;
          const downloadUrl = await StorageService.uploadFile(value, path);
          urls.push(downloadUrl);
          await StoreService.updateDocument('post', idPost, {
            idUser: currentUser.uid,
            createdAt: serverTimestamp(),
            text: formData.get('text') || '',
            URL: [...urls],
            idTypePost: (urls.length === 0) ? 1 : 2, // 1:text, 2:text and image
            idPostStatus: 1, // 1: public, 2: private
          });
        }
        if (key !== 'text') {
          urls.push(value);
        }
        await StorageService.updateDirectory(urls, `${currentUser.uid}/posts/${idPost}`);

        await StoreService.updateDocument('post', idPost, {
          idUser: currentUser.uid,
          createdAt: serverTimestamp(),
          text: formData.get('text') || '',
          URL: [...urls],
          idTypePost: (urls.length === 0) ? 1 : 2, // 1:text, 2:text and image
          idPostStatus: 1, // 1: public, 2: private
        });
      });
      return 'The post has been updated';
    } catch (err) { return err.message; }
  },

  deletePostData: async (idPost) => {
    const user = await AuthService.getCurrentUser();
    await StorageService.deleteFile(`${user.uid}/posts/${idPost}`);
    await StoreService.deleteLikesPost(idPost);
    await StoreService.deleteDocument('post', idPost);
    return 'The post has been deleted';
  },

  getRealTimeData: (collectionStore) => StoreService.getDocumentByFilter(collectionStore),

  getMyRealTimeData: async (collectionStore) => {
    const user = await AuthService.getCurrentUser();
    return StoreService.getDocumentByComposeFilter(collectionStore, user.uid);
  },
};

// Export the PostController object as the default export
export default PostController;
