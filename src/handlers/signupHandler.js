import UserController from '../controllers/UserController';

export const signupHandler = {
  createUser: async (email, password, ...extra) => {
    UserController.createUser(email, password, extra[0], extra[1]);
  },
};
