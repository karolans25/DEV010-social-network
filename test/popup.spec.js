import popup from '../src/views/popup';

const DOM = document.createElement('article');

// Mock for navigateTo
const navigateToMock = jest.fn();

describe('Popup Component', () => {
  let popupComponent;

  // Configure the Init Component before each test
  beforeEach(() => {
    popupComponent = popup(navigateToMock);
    DOM.appendChild(popupComponent);
  });

  // Clean after each test
  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  test('Popup component renders with the correct message', () => {
  // Render the component and get the overlay element
    const overlay = popup('Error message');

    // Assert that the overlay exists
    expect(overlay).toBeDefined();

    // Assert that the overlay has the correct classes
    expect(overlay.className).toBe('overlay');

    // Assert that the overlay contains the card element
    const card = overlay.querySelector('.popup');
    expect(card).toBeDefined();

    // Assert that the card contains the header, message section, and footer
    const header = card.querySelector('.card-header');
    const messageSection = card.querySelector('.card-body');
    const footer = card.querySelector('.card-footer');
    expect(header).toBeDefined();
    expect(messageSection).toBeDefined();
    expect(footer).toBeDefined();

    // Assert that the title and paragraph have the correct content
    const title = header.querySelector('h2');
    const paragraph = messageSection.querySelector('paragraph');
    expect(title.innerHTML).toBe('Error');
    expect(paragraph.innerHTML).toBe('Error message');
  });
});
