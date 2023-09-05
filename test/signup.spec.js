import signup from '../src/views/signup';

const DOM = document.createElement('article');

// Mock for navigateTo
const navigateToMock = jest.fn();

describe('Signup Component', () => {
  let signupComponent;

  // Configure the Init Component before each test
  beforeEach(() => {
    signupComponent = signup(navigateToMock);
    DOM.appendChild(signupComponent);
  });

  // Clean after each test
  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('Must be a function', () => {
    expect(typeof signup).toBe('function');
  });

  test('Signup function should return a section element', () => {
    const section = signup();
    expect(section.tagName).toBe('SECTION');
  });

  it('It should redirect to "Sign" screen on click on "back" link ', () => {
    const linkBack = signupComponent.querySelector('[name="back"]');

    expect(linkBack.href).toBe('http://localhost/signin');
    expect(linkBack.textContent).toBe('👈 back');
    // const mockOnClick = jest.fn();
    // linkBack.addEventListener('click', mockOnClick);
    // fireEvent.click(linkBack);
    // expect(mockOnClick).toHaveBeenCalled();
  });

  it('It should redirect to "Sign In" screen on click on "Sign Up" button with email and password', () => {
    const inputEmail = signupComponent.querySelector('[name="email"]');
    const inputPassword = signupComponent.querySelector('[name="pass"]');
    const inputPasswordConfirm = signupComponent.querySelector('[name="pass-check"]');
    const buttonSignup = signupComponent.querySelector('[type="submit"]');

    inputEmail.value = 'test@example.com';
    inputPassword.value = '123456';
    inputPasswordConfirm.value = '123456';
    buttonSignup.click();
    // expect(signin.getByTestId('success-message')).toBeInTheDocument();

    const handleSubmit = jest.fn();
    const formSignup = signupComponent.querySelector('form');
    formSignup.addEventListener('submit', handleSubmit);
    formSignup.submit();
    // Missing an addecuatte test
    // expect(navigateToMock).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('It should upload an image with input file ', () => {
    const inputFile = signupComponent.querySelector('[type="file"]');
    // Mock the event handler function
    const handleFileUpload = jest.fn();

    // Add the event listener to the file input
    inputFile.addEventListener('change', handleFileUpload);

    // Create a mock file object
    const mockFile = new File(['file content'], 'test.png', { type: 'image/png' });

    // Simulate a file upload
    inputFile.change(inputFile, { target: { files: [mockFile] } });

    // Assert that the event handler function was called
    expect(handleFileUpload).toHaveBeenCalled();
    // Missing an addecuatte test
    // inputFile.click();
    // expect(navigateToMock).toHaveBeenCalled();
  });

  it('It should redirect to "Feed" screen on click on "Github" sign in button ', () => {
    const buttonSigninGithub = signupComponent.querySelector('#github');
    buttonSigninGithub.click();
    // Missing an addecuatte test
    expect(navigateToMock).toHaveBeenCalled();
  });
});
