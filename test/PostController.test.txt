import PostController from '../src/controllers/PostController';
import AuthService from '../src/firebase/authService';
import StoreService from '../src/firebase/storeService';
import StorageService from '../src/firebase/storageService';

jest.mock('../src/firebase/authService');
jest.mock('../src/firebase/storeService');
jest.mock('../src/firebase/storageService');

describe('PostController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPostData', () => {
    it('should create a post and return success message', async () => {
      AuthService.getCurrentUser.mockResolvedValueOnce({ uid: 'user-id' });
      StoreService.addDocument.mockResolvedValueOnce('doc-id');
      StorageService.uploadFile.mockResolvedValueOnce('download-url');

      const formData = new FormData();
      formData.append('text', 'Hello, world!');
      formData.append('file', new File(['file contents'], 'file.txt'));

      const result = await PostController.createPostData(formData);

      expect(AuthService.getCurrentUser).toHaveBeenCalled();
      expect(StoreService.addDocument).toHaveBeenCalledWith('post', {
        createdAt: expect.anything(),
        idUser: 'user-id',
        text: 'Hello, world!',
        URL: [],
        idTypePost: 1,
        idPostStatus: 1,
      });
      expect(StorageService.uploadFile).toHaveBeenCalled();
      expect(StoreService.updateDocument).toHaveBeenCalledWith('post', 'doc-id', {
        createdAt: expect.anything(),
        idUser: 'user-id',
        text: 'Hello, world!',
        URL: ['download-url'],
        idTypePost: 2,
        idPostStatus: 1,
      });
      expect(result).toBe('The post has been created');
    });

    it('should handle errors and return error message', async () => {
      AuthService.getCurrentUser.mockRejectedValueOnce(new Error('Authentication error'));

      const formData = new FormData();
      formData.append('text', 'Hello, world!');

      const result = await PostController.createPostData(formData);

      expect(AuthService.getCurrentUser).toHaveBeenCalled();
      expect(result).toBe('Authentication error');
    });
  });

  describe('getPostDataById', () => {
    it('should get a post by id', () => {
      const idPost = 'post-id';

      PostController.getPostDataById(idPost);

      expect(StoreService.getDocumentById).toHaveBeenCalledWith('post', idPost);
    });
  });

  // Write tests for other functions in the PostController object
});
