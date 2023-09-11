/**
 * Import the object `UserController`, that contains these methods:
 * `createUser`, `signin`, `signinGoogle`, `signinGithub`, `signout`,
 * `resetPassword`, `getUserData` and `getUserDataById`
 * */
import UserControler from '../src/controllers/UserController';

const AuthService = require('../src/firebase/authService');
const StorageService = require('../src/firebase/storageService');
const StoreService = require('../src/firebase/storeService');

// Mock dependencies
jest.mock('../src/firebase/authService');
jest.mock('../src/firebase/storageService');
jest.mock('../src/firebase/storeService');

// Import the module under test
// const UserController = require('../src/controllers/UserController');
describe('UserController', () => {
  it('should be an object', () => {
    expect(typeof UserControler).toBe('object');
  });

  describe('createUser', () => {
    it('should create a user and return a success message', async () => {
      // Mock the AuthService functions
      AuthService.signUp.mockResolvedValueOnce({
        uid: 'user-id', email: 'test@example.com', displayName: 'Test User', photoURL: 'https://example.com/profile.jpg',
      });
      AuthService.updateImgAndName.mockResolvedValueOnce();
      AuthService.sendEmailVerify.mockResolvedValueOnce();

      // Mock the StorageService function
      StorageService.uploadFile.mockResolvedValueOnce('https://example.com/profile.jpg');

      // Mock the StoreService functions
      StoreService.addDocumentWithId.mockResolvedValueOnce();

      const result = await UserController.createUser('test@example.com', 'password', { type: 'image/jpeg' }, 'Test User');

      expect(result).toBe('The user has been registered. Check your email to confirm the account');

      // Verify that the AuthService functions are called with the correct arguments
      expect(AuthService.signUp).toHaveBeenCalledWith('test@example.com', 'password');
      expect(AuthService.updateImgAndName).toHaveBeenCalledWith({ displayName: 'Test User', photoURL: 'https://example.com/profile.jpg' });
      expect(AuthService.sendEmailVerify).toHaveBeenCalledWith({
        uid: 'user-id', email: 'test@example.com', displayName: 'Test User', photoURL: 'https://example.com/profile.jpg',
      });

      // Verify that the StorageService function is called with the correct arguments
      expect(StorageService.uploadFile).toHaveBeenCalledWith({ type: 'image/jpeg' }, 'user-id/profile.jpg');

      // Verify that the StoreService function is called with the correct arguments
      expect(StoreService.addDocumentWithId).toHaveBeenCalledWith('user', 'user-id', {
        email: 'test@example.com',
        createdAt: expect.anything(),
        // You can use expect.anything() to check that the value is defined
        friends: [],
        name: 'Test User',
        photo: 'https://example.com/profile.jpg',
      });
    });

    // Add more test cases for different scenarios
  });

  describe('signin', () => {
    // Add test cases for the signin function
  });

  describe('signinGoogle', () => {
    // Add test cases for the signinGoogle function
  });

  describe('signinGithub', () => {
    // Add test cases for the signinGithub function
  });

  describe('signout', () => {
    // Add test cases for the signout function
  });

  describe('resetPassword', () => {
    // Add test cases for the resetPassword function
  });

  describe('getUserData', () => {
    // Add test cases for the getUserData function
  });

  describe('getUserDataById', () => {
    // Add test cases for the getUserDataById function
  });
});
