import { serverTimestamp } from 'firebase/firestore';
import AuthService from '../firebase/authService';
import StoreService from '../firebase/storeService';

// Create a CommentController object
const CommentController = {
  createComment: (idPub, comment) => {
    const data = {
      createdAt: serverTimestamp(),
      idUser: AuthService.getCurrentUser().uid,
      idPost: idPub,
      text: comment,
    };
    return StoreService.addDocument('comment', data);
  },
};
export default CommentController;
