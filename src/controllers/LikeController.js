import { serverTimestamp } from 'firebase/firestore';
import AuthService from '../firebase/authService';
import StoreService from '../firebase/storeService';

// Create a PostController object
const PostController = {
  getReactionMessage: (idTypeReaction) => StoreService.getDocumentById('typeLike', idTypeReaction),

  getMyReactions: async (collectionStore) => {
    const user = await AuthService.getCurrentUser();
    const likes = await StoreService.getAllDocuments(collectionStore);
    const myLikes = [];
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].idUser === user.uid) {
        myLikes.push(likes[i]);
      }
    }
    return myLikes;
  },

  hasReactedPost: (idPost) => StoreService.hasReactedPost(idPost),

  reactPost: (idPub, idType) => {
    const data = {
      idUser: AuthService.getCurrentUser().uid,
      idPost: idPub,
      likedAt: serverTimestamp(),
      idTypeLike: idType,
    };
    return StoreService.addDocument('like', data);
  },

  //   unreactPost: (idPost) => StoreService.unreactPost(idPost),
  unreactPost: (idLike) => StoreService.deleteDocument('like', idLike),

  updateReactPost: (idLike, idType) => {
    const data = {
      idTypeLike: idType,
      likedAt: serverTimestamp(),
    };
    return StoreService.updateDocument('like', idLike, data);
  },
};
export default PostController;
