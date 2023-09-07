import UserController from '../controllers/UserController';
// import PostController from '../controllers/PostController';
// import LikeController from '../controllers/LikeController';

export const searchHandler = {
  getAllUsers: () => UserController.getAllUsers(),
};
