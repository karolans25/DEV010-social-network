import UserController from '../controllers/UserController';
import PostController from '../controllers/PostController';
import LikeController from '../controllers/LikeController';
import CommentController from '../controllers/CommentController';

export const feedHandler = {
  createPost: (formData) => PostController.createPostData(formData),

  getUserData: async () => {
    const user = await UserController.getUserData();
    try {
      return [user.uid, user.displayName, user.photoURL, user.email];
    } catch (err) {
      return err.message;
    }
  },

  getUserDataById: (idUser) => UserController.getUserDataById(idUser),

  getPostById: (idPost) => PostController.getPostDataById(idPost),

  updatePost: (idPost, formData) => PostController.updatePostData(idPost, formData),

  deletePost: (idPost) => PostController.deletePostData(idPost),

  getAllPost: () => PostController.getRealTimeData('post'),
  // .then((snapshot) => {
  //   const posts = [];
  //   snapshot.docs.forEach((element) => {
  //     posts.push({ ...element.data(), id: element.id });
  //   });
  //   console.log(posts.length);
  // });
  // },
  // const q = query(collection(db, 'post'), orderBy('createdAt', 'desc'));

  getAllMyPost: () => PostController.getMyRealTimeData('post'),

  getAllMyReactions: () => LikeController.getMyReactions('like'),

  getReactionsOfPost: async (idPost) => {
    const likes = await LikeController.getReactionsOfPost(idPost);
    console.log(likes);
  },

  getReactionMessage: (idTypeReaction) => LikeController.getReactionMessage(idTypeReaction),

  hasReactedPost: (idPost) => LikeController.hasReactedPost(idPost),

  reactPost: (idPost, idTypeLike) => LikeController.reactPost(idPost, idTypeLike),

  unreactPost: (idLike) => LikeController.unreactPost(idLike),

  updateReactPost: (idLike, idTypeLike) => LikeController.updateReactPost(idLike, idTypeLike),

  createComment: async (idPost, text) => {
    const idRef = await CommentController.createComment(idPost, text);
    if (idRef) return 'The comment has been published';
    return 'The comment wasn\'t published';
  },

  getAllMyComments: () => CommentController.getAllMyComments(),

  deleteComment: async (idComment) => {
    CommentController.deleteComment(idComment);
  },
};
