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
          // uploadBytes(storageRef, value, metadata)
          //   .then(() => getDownloadURL(storageRef)
          //     .then((url) => {
          //       urls.push(url);
          //       /** Question: Why it doesn't work without doing here */
          //       updateDoc(doc(db, 'post', idPub), {
          //         createdAt: serverTimestamp(),
          //         text: (formData.get('text') ? formData.get('text') : ''),
          //         URL: [...urls],
          //         idTypePost: (urls.length === 0) ? 1 : 2, // text and image
          //         idPostStatus: 1, // 1: public, 2: private
          //       }).catch((err) => err.message);
          //     })
          //     .catch((err) => err.message))
          //   .catch((err) => err.message);
        }
        if (key !== 'text') {
          urls.push(value);
        }
        await StoreService.updateDocument('post', idPost, {
          idUser: currentUser.uid,
          createdAt: serverTimestamp(),
          text: formData.get('text') || '',
          URL: [...urls],
          idTypePost: (urls.length === 0) ? 1 : 2, // 1:text, 2:text and image
          idPostStatus: 1, // 1: public, 2: private
        });
        // updateDoc(doc(db, 'post', idPub), {
        //   createdAt: serverTimestamp(),
        //   text: (formData.get('text') ? formData.get('text') : ''),
        //   URL: [...urls],
        //   idTypePost: (urls.length === 0) ? 1 : 2, // text and image
        //   idPostStatus: 1, // 1: public, 2: private
        // }).catch((err) => err.message);
      });
      return 'The post has been updated';
    } catch (err) { return err.message; }
  },

  deletePostData: (idPost) => StoreService.deleteDocument('post', idPost),

  getRealTimeData: (collectionStore) => StoreService.getDocumentByFilter(collectionStore),
};

// Export the PostController object as the default export
export default PostController;
