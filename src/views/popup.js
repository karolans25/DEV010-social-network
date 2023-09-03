const popup = (message) => {
  const article = document.getElementById('root');
  const overlay = document.createElement('section');
  const card = document.createElement('section');
  const span = document.createElement('span');
  const header = document.createElement('header');
  const messageSection = document.createElement('section');
  const footer = document.createElement('footer');
  const title = document.createElement('h2');
  const paragraph = document.createElement('paragraph');
  const ops = document.createElement('section');

  overlay.className = 'overlay';
  overlay.style.display = 'flex';

  card.className = 'popup';
  header.className = 'card-header';
  messageSection.className = 'card-body';
  footer.className = 'card-footer';

  title.innerHTML = 'Error';
  span.className = 'close';
  ops.className = 'ops';
  span.textContent = '✖️';

  span.addEventListener('click', () => {
    overlay.remove();
  });

  // window.addEventListener('click', (e) => {
  //   console.log(e.target);
  // });

  /*
  const rigthResponses = ['The user has been registered with email', 'The user
  has been logged with email', 'The user has been logged with', 'The post has
  been created', 'The email to restore the password has been sent'];
  */
  const posibilities = [
    'The user has been registered. \nCheck your email to confirm the account',
    'The user has been logged',
    'The user has been registered and logged with',
    'The post has been created',
    'The email to confirm your account has been sent',
    'The email to restore the password has been sent',
  ];
  if (typeof message !== 'undefined' && typeof message === 'string') {
    console.log('Linea 40');
    if (posibilities.includes(message)) {
      console.log('Línea 42');
      title.innerHTML = 'Well done!';
      paragraph.innerHTML = message;
      card.classList.add('correct');
    } else {
      console.log('Línea 46');
      title.innerHTML = 'Firebase Error';
      switch (message) {
        case 'Firebase: Error (auth/email-already-in-use).':
          paragraph.innerHTML = 'Email already in use';
          break;
        case 'Firebase: Error (auth/passwords-not-match).':
          paragraph.innerHTML = 'The passwords don\'t match';
          break;
        case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
          paragraph.innerHTML = 'Password should be at least 6 characters';
          break;
        case 'Firebase: Error (auth/invalid-email).':
          paragraph.innerHTML = 'Invalid email';
          break;
        case 'Firebase: Error (auth/user-not-found).':
          paragraph.innerHTML = 'User not found';
          break;
        case 'Firebase: Error (auth/wrong-password).':
          paragraph.innerHTML = 'Wrong password';
          break;
        case 'Firebase: Error (auth/too-many-requests).':
          paragraph.innerHTML = 'Too many requests. Try again later';
          break;
        case 'Firebase: Error (auth/cancelled-popup-request).':
          paragraph.innerHTML = 'The request was canceled';
          break;
        case 'Firebase: Error (auth/popup-blocked).':
          paragraph.innerHTML = 'The popup was blocked';
          break;
        case 'Firebase: Error (auth/popup-closed-by-user).':
          paragraph.innerHTML = 'The user has closed the popup';
          break;
        case 'Firebase: Error ':
          // There's an error about requiered an recent session
          paragraph.innerHTML = 'Another error';
          break;
        default:
          paragraph.innerHTML = message;
          break;
      }
    }
  }

  header.append(title, span);
  messageSection.append(paragraph);
  card.appendChild(header);
  card.appendChild(messageSection);
  card.appendChild(footer);
  overlay.append(card);
  article.append(overlay);

  return overlay;
};

export default popup;
