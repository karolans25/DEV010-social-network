const popup = (message) => {
  const article = document.getElementById('root');
  const overlay = document.createElement('section');
  const card = document.createElement('section');
  const header = document.createElement('header');
  const messageSection = document.createElement('section');
  const footer = document.createElement('footer');
  const title = document.createElement('h2');
  const p = document.createElement('p');
  const ops = document.createElement('section');
  const buttonOk = document.createElement('button');

  overlay.className = 'overlay';
  overlay.style.display = 'flex';

  card.className = 'popup';
  header.className = 'card-header';
  messageSection.className = 'card-body';
  footer.className = 'card-footer';

  title.innerHTML = 'Error';
  ops.className = 'ops';
  buttonOk.textContent = 'Ok';
  buttonOk.className = 'ok';
  buttonOk.addEventListener('click', () => {
    overlay.remove();
    // overlay.style.display = 'none';
  });

  if (typeof message !== 'undefined') {
    if (message.includes('Firebase')) {
      title.innerHTML = 'Firebase Error';
      switch (message) {
        case 'Firebase: Error (auth/email-already-in-use).':
          p.innerHTML = 'Email already in use';
          break;
        case 'Firebase: Error (auth/passwords-not-match).':
          p.innerHTML = 'The passwords don\'t match';
          break;
        case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
          p.innerHTML = 'Password should be at least 6 characters';
          break;
        case 'Firebase: Error (auth/invalid-email).':
          p.innerHTML = 'Invalid email';
          break;
        case 'Firebase: Error (auth/user-not-found).':
          p.innerHTML = 'User not found';
          break;
        case 'Firebase: Error (auth/wrong-password).':
          p.innerHTML = 'Wrong password';
          break;
        case 'Firebase: Error (auth/too-many-requests).':
          p.innerHTML = 'Too many requests. Try again later';
          break;
        case 'Firebase: Error (auth/cancelled-popup-request).':
          p.innerHTML = 'The request was canceled';
          break;
        case 'Firebase: Error (auth/popup-blocked).':
          p.innerHTML = 'The popup was blocked';
          break;
        case 'Firebase: Error (auth/popup-closed-by-user).':
          p.innerHTML = 'The user has closed the popup';
          break;
        case 'Firebase: Error ':
          // There's an error about requiered an recent session
          p.innerHTML = 'Another error';
          break;
        default:
          p.innerHTML = message;
          break;
      }
      ops.append(buttonOk);
    } else if (message.includes('Would you like to receive the email again?')) {
      card.classList.add('confirm');
      const buttonCancel = document.createElement('button');
      buttonCancel.textContent = 'Cancel';
      buttonCancel.className = 'cancel';
      buttonOk.addEventListener('click', () => {
        overlay.style.display = 'none';
      });
      buttonCancel.addEventListener('click', () => {
        overlay.style.display = 'none';
      });
      ops.append(buttonOk, buttonCancel);
    } else if (message.startsWith('The user has been registered with email') || message.startsWith('The user has been logged with email') || message.startsWith('The user has been registered and logged with') || message === 'The post has been created' || message === 'The email to restore the password has been sent.') {
      title.innerHTML = 'Well done!';
      p.innerHTML = message;
      card.classList.add('correct');
    } else {
      p.innerHTML = message;
      ops.append(buttonOk);
    }
  }

  header.append(title);
  messageSection.append(p, buttonOk);
  card.appendChild(header);
  card.appendChild(messageSection);
  card.appendChild(footer);
  overlay.append(card);
  article.append(overlay);

  return overlay;
};

export default popup;
