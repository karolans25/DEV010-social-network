import { signinHandler } from '../handlers/signinHandler';
import { popup } from './popup';

import imgAvatar from '../assets/icons/genio.png';
import imgLoading from '../assets/icons/playground.gif';
import imgPass from '../assets/icons/sendEmail.png';

export const password = (navigateTo) => {
  const section = document.createElement('section');
  const back = document.createElement('button');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const form = document.createElement('form');
  const title = document.createElement('h2');

  const sectionEmail = document.createElement('section');
  const labelEmail = document.createElement('label');
  const spanEmail = document.createElement('span');
  const inputEmail = document.createElement('input');

  const imgRecover = document.createElement('img');
  const buttonRecoverPassword = document.createElement('button');
  const loadingContainer = document.createElement('aside');
  const loadingGif = document.createElement('img');

  // section
  section.className = 'pass';

  // link back
  // back.innerHTML = '👈 back';
  // back.innerHTML = 'back';
  back.innerHTML = '👈';
  back.classList.add('link', 'back');
  // back.href = '/signin';

  // image
  img.src = imgAvatar;
  img.alt = 'genius icon';
  figure.append(img);

  // title
  title.innerHTML = 'Recover Pass';

  // form
  // form
  // labelEmail.innerHTML = 'Email: ';
  // labelEmail.htmlFor = inputEmail.name;
  spanEmail.textContent = 'Write email *';
  inputEmail.name = 'email';
  // inputEmail.placeholder = 'Write email';
  inputEmail.type = 'email';
  inputEmail.required = true;
  imgRecover.src = imgPass;
  imgRecover.alt = 'recover pass';
  // buttonRecoverPassword.textContent = 'Recover Password';
  buttonRecoverPassword.type = 'submit';
  loadingContainer.id = 'loading-container';
  loadingGif.src = imgLoading;
  loadingGif.alt = 'loading';

  back.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/signin');
  });

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

  labelEmail.appendChild(spanEmail);
  labelEmail.appendChild(inputEmail);
  sectionEmail.appendChild(labelEmail);

  buttonRecoverPassword.appendChild(imgRecover);
  form.append(sectionEmail, buttonRecoverPassword);
  section.append(back, figure, title, form);
  loadingContainer.append(loadingGif);
  section.append(loadingContainer);

  const inputs = form.querySelectorAll('input');
  inputs.forEach((input) => {
    input.onfocus = () => {
      input.previousElementSibling.classList.add('top');
      input.previousElementSibling.classList.add('focus');
      input.parentNode.classList.add('focus');
    };
    input.onblur = () => {
      input.value = input.value.trim();
      if (input.value.length === 0) {
        input.previousElementSibling.classList.remove('top');
      }
      input.previousElementSibling.classList.remove('focus');
      // previus.parentNode.classList.remove('top');
      input.parentNode.classList.remove('focus');
    };
  });

  return section;
};

// export default password;
