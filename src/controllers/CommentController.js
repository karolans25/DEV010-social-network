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

  getAllMyComments: async () => {
    const user = await AuthService.getCurrentUser();
    const comments = await StoreService.getAllDocuments('comment');
    const myComments = [];
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].idUser === user.uid) {
        myComments.push(comments[i]);
      }
    }
    return myComments;
  },

  deleteComment: (idComment) => StoreService.deleteDocument('comment', idComment),
};
export default CommentController;
