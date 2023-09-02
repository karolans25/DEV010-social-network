import UserController from '../controllers/UserController';

export const signinHandler = {
  signin: async (email, password) => UserController.signin(email, password),

  signinGoogle: () => {

  },

  signinGithub: () => {

  },

  resetPassword: (email) => UserController.resetPassword(email),
};
