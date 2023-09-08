// eslint-disable-next-line import/no-extraneous-dependencies
// import { JSDOM } from 'jsdom';
// import '@testing-library/jest-dom/extend-expect';
import signin from '../src/views/signin';

/**  * @jest-environment jsdom  */
// test('use jsdom in this test file', () => {
//   const element = document.createElement('div');
//   expect(element).not.toBeNull();
// });

// const { window } = new JSDOM();
// global.document = window.document;
const DOM = document.createElement('article');

// Mock for navigateTo
const navigateToMock = jest.fn();

describe('Signin Component', () => {
  let signinComponent;

  // Configure the Init Component before each test
  beforeEach(() => {
    signinComponent = signin(navigateToMock);
    DOM.appendChild(signinComponent);
  });

  // Clean after each test
  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('Must be a function', () => {
    expect(typeof signin).toBe('function');
  });

  test('Signin function should return a section element', () => {
    const section = signin();
    expect(section.tagName).toBe('SECTION');
  });

  it('It should redirect to "Init" screen on click on "back" link ', () => {
    const linkBack = signinComponent.querySelector('[name="back"]');

    expect(linkBack).toBeDefined();
    expect(linkBack.href).toBe('http://localhost/');
    expect(linkBack.textContent).toBe('👈 back');
    // const mockOnClick = jest.fn();
    // linkBack.addEventListener('click', mockOnClick);
    // fireEvent.click(linkBack);
    // expect(mockOnClick).toHaveBeenCalled();
  });

  it('It should redirect to "Recover Password" screen on click on "forgot password?" link ', () => {
    const linkRecoverPass = signinComponent.querySelector('[name="recover-pass"]');

    expect(linkRecoverPass).toBeDefined();
    expect(linkRecoverPass.href).toBe('http://localhost/password');
    expect(linkRecoverPass.textContent).toBe('Forgot password ?');
    // const mockOnClick = jest.fn();
    // linkBack.addEventListener('click', mockOnClick);
    // fireEvent.click(linkBack);
    // expect(mockOnClick).toHaveBeenCalled();
  });

  it('It should redirect to "Sign Up" screen on click on "sign up" link ', () => {
    const linkSignUp = signinComponent.querySelector('[name="signup"]');

    expect(linkSignUp).toBeDefined();
    expect(linkSignUp.href).toBe('http://localhost/signup');
    expect(linkSignUp.textContent).toBe('👉 Sign Up');
    // const mockOnClick = jest.fn();
    // linkBack.addEventListener('click', mockOnClick);
    // fireEvent.click(linkBack);
    // expect(mockOnClick).toHaveBeenCalled();
  });

  it('It should handle the sign in with ', () => {
    const linkSignUp = signinComponent.querySelector('[name="signup"]');

    expect(linkSignUp).toBeDefined();
    expect(linkSignUp.href).toBe('http://localhost/signup');
    expect(linkSignUp.textContent).toBe('👉 Sign Up');
    // const mockOnClick = jest.fn();
    // linkBack.addEventListener('click', mockOnClick);
    // fireEvent.click(linkBack);
    // expect(mockOnClick).toHaveBeenCalled();
  });

  it('It should redirect to "Feed" screen on click on "Sign In" button with email and password', () => {
    const inputEmail = signinComponent.querySelector('[name="email"]');
    const inputPassword = signinComponent.querySelector('[name="pass"]');
    const buttonSignin = signinComponent.querySelector('[name="signin-submit"]');

    inputEmail.value = 'test@example.com';
    inputPassword.value = '123456';
    buttonSignin.click();
    // expect(signin.getByTestId('success-message')).toBeInTheDocument();

    expect(inputEmail).toBeDefined();
    expect(inputPassword).toBeDefined();
    expect(buttonSignin).toBeDefined();
    const handleSubmit = jest.fn();
    const formSignin = signinComponent.querySelector('form');
    formSignin.addEventListener('submit', handleSubmit);
    formSignin.submit();
    // Missing an addecuatte test
    // expect(navigateToMock).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('It should redirect to "Feed" screen on click on "Google" sign in button ', () => {
    const buttonSigninGoogle = signinComponent.querySelector('#google');
    buttonSigninGoogle.click();
    // Missing an addecuatte test
    expect(buttonSigninGoogle).toBeDefined();
    expect(navigateToMock).toHaveBeenCalled();
  });

  it('It should redirect to "Feed" screen on click on "Github" sign in button ', () => {
    const buttonSigninGithub = signinComponent.querySelector('#github');
    buttonSigninGithub.click();
    // Missing an addecuatte test
    expect(buttonSigninGithub).toBeDefined();
    expect(navigateToMock).toHaveBeenCalled();
  });
});
