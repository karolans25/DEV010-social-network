import UserController from '../controllers/UserController';

export const profileHandler = {
  signout: () => UserController.signout(),
};
