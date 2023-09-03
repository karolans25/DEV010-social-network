import UserController from '../controllers/UserController';
import PostController from '../controllers/PostController';

export const feedHandler = {
  createPost: (formData) => PostController.createPost(formData),

  getUserData: () => UserController.getUserData(),
};
