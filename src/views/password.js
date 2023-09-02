import { signinHandler } from '../handlers/signinHandler';
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
  const loadingContainer = document.createElement('aside');
  const loadingGif = document.createElement('img');

  // section
  section.className = 'pass';

  // link back
  back.innerHTML = '👈 back';
  back.href = '/signin';

  // image
  img.src = './assets/icons/genio.png';
  img.alt = 'genius icon';
  figure.append(img);

  // title
  title.innerHTML = 'Recover Password';

  // form
  labelEmail.innerHTML = 'Email';
  labelEmail.htmlFor = inputEmail.name;
  inputEmail.placeholder = 'Write email';
  inputEmail.name = 'email';
  inputEmail.type = 'email';
  inputEmail.required = true;
  buttonRecoverPassword.textContent = 'Recover Password';
  buttonRecoverPassword.type = 'submit';
  loadingContainer.id = 'loading-container';
  loadingGif.src = '../assets/icons/playground.gif';
  loadingGif.alt = 'loading';

  form.addEventListener('submit', async (e) => {
    try {
      loadingContainer.style.display = 'block';
      e.preventDefault();
      const res = await signinHandler.resetPassword(inputEmail.value);
      loadingContainer.style.display = 'none';
      popup(res);
      if (res === 'The email to restore the password has been sent') {
        form.reset();
        navigateTo('/signin');
        popup(res);
      }
    } catch (err) {
      loadingContainer.style.display = 'none';
      popup(err.message);
    }
  });

  form.append(labelEmail, inputEmail, buttonRecoverPassword);
  section.append(back, figure, title, form);
  loadingContainer.append(loadingGif);
  section.append(loadingContainer);

  return section;
}

export default password;
