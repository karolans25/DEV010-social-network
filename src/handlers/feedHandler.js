import UserController from '../controllers/UserController';
import PostController from '../controllers/PostController';

export const feedHandler = {
  createPost: (formData) => PostController.createPostData(formData),

  getUserData: async () => {
    const user = await UserController.getUserData();
    return [user.uid, user.displayName, user.photoURL];
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
};
