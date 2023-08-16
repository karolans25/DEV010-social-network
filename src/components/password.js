import { sendPasswordResetEmailAuth } from '../lib/auth';

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
      sendPasswordResetEmailAuth(inputEmail.value)
        .then(() => {
          alert('An email has been sent to recover password');
          navigateTo('/signin');
        })
        .catch((err) => {
          alert(err.message);
          // console.log(err.message);
        });
    } catch (err) {
      // console.log(err.message.split('Firebase: ')[1]);
    }
  });

  section.append(back, figure, title, form);

  return section;
}

export default password;
