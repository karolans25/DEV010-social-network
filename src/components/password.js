import { sendPasswordResetEmailAuth } from '../lib/index';
import popup from './popup';

function password(navigateTo) {
  const section = document.createElement('section');
  const back = document.createElement('a');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const form = document.createElement('form');
  const title = document.createElement('h2');
  const labelEmail = document.createElement('label');
  const inputEmail = document.createElement('input');
  const buttonRecoverPassword = document.createElement('button');

  // section
  section.className = 'pass';

  // link back
  back.innerHTML = 'back';
  back.href = '/signin';

  // image
  img.src = './assets/icons/genio.webp';
  img.alt = 'genius icon';
  figure.append(img);

  // title
  title.innerHTML = 'Recover Password';

  // form
  labelEmail.innerHTML = 'Email';
  labelEmail.htmlFor = inputEmail.name;
  inputEmail.placeholder = 'Write email';
  inputEmail.name = 'email';
  inputEmail.required = true;
  buttonRecoverPassword.textContent = 'Recover Password';
  buttonRecoverPassword.type = 'submit';

  form.append(labelEmail, inputEmail, buttonRecoverPassword);

  form.addEventListener('submit', async (e) => {
    try {
      e.preventDefault();
      // Check if the user has the email verified before to send the email
      sendPasswordResetEmailAuth(inputEmail.value)
        .then((response) => {
          if (response === 'The email to restore the password has been sent.') {
            form.reset();
            navigateTo('/signin');
          }
          popup(response);
        })
        .catch((err) => popup(err.message));
    } catch (err) {
      popup(err.message);
    }
  });

  section.append(back, figure, title, form);

  return section;
}

export default password;
