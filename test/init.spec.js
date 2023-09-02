// eslint-disable-next-line import/no-extraneous-dependencies
// import { JSDOM } from 'jsdom';
import init from '../src/views/init';

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

describe('Init Component', () => {
  let initComponent;

  // Configure the Init Component before each test
  beforeEach(() => {
    initComponent = init(navigateToMock);
    DOM.appendChild(initComponent);
  });

  // Clean after each test
  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('Must be a function', () => {
    expect(typeof init).toBe('function');
  });

  test('Init function should return a section element', () => {
    const section = init();
    expect(section.tagName).toBe('SECTION');
  });

  it('It should redirect to "Sign in" screen on click on "Go" button ', () => {
    const buttonStart = initComponent.querySelector('.go');
    buttonStart.click();

    expect(navigateToMock).toHaveBeenCalledWith('/signin');
  });
});
