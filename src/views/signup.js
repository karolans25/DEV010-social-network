import { signupHandler } from '../handlers/signupHandler';
import popup from './popup';

const signup = (navigateTo) => {
  const section = document.createElement('section');
  const back = document.createElement('a');
  const sectionFig = document.createElement('section');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const buttonLeft = document.createElement('button');
  const buttonRight = document.createElement('button');
  const iconAddFile = document.createElement('img');
  const file = document.createElement('input');
  const title = document.createElement('h2');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const inputPassConfirm = document.createElement('input');
  const labelName = document.createElement('label');
  const labelEmail = document.createElement('label');
  const labelPass = document.createElement('label');
  const labelPassConfirm = document.createElement('label');
  const buttonSignUp = document.createElement('button');

  // section
  section.className = 'signup';

  // link back
  back.innerHTML = '👈 back';
  iconAddFile.className = 'icon-add-file';
  file.classList.add('file', 'file-upload', 'file-signup');

  file.type = 'file';
  file.setAttribute('accept', 'image/*');
  file.name = 'file';

  file.type = 'file';
  file.setAttribute('accept', 'image/*');
  file.addEventListener('change', (e) => {
    img.src = URL.createObjectURL(e.target.files[0]);
    e.target.value = '';
  });

  // figure
  img.src = './assets/icons/nina.png';
  img.alt = 'user icon';
  // const caption = document.createElement('caption');
  // caption.append(imgUrl);

  sectionFig.className = 'sec-figure';
  buttonLeft.innerHTML = '◀️';
  buttonLeft.name = 'left';
  buttonLeft.style.padding = '0';
  buttonRight.innerHTML = '▶️';
  buttonRight.name = 'right';
  buttonRight.style.padding = '0';

  buttonRight.addEventListener('click', () => { console.log('Right'); });
  buttonLeft.addEventListener('click', () => { console.log('Left'); });

  // title
  title.textContent = 'Sign Up';
  buttonSignUp.textContent = '👉 Sign Up';

  // form
  labelName.innerHTML = 'Display Name:';
  labelName.htmlFor = inputName.name;
  inputName.name = 'name';
  inputName.placeholder = 'Write display name';
  inputName.type = 'text';
  inputName.required = false;
  labelEmail.innerHTML = 'Email: ';
  labelEmail.htmlFor = inputEmail.name;
  inputEmail.name = 'email';
  inputEmail.placeholder = 'Write email';
  inputEmail.type = 'email';
  inputEmail.required = true;
  labelPass.innerHTML = 'Password: ';
  labelPass.htmlFor = inputPass.name;
  inputPass.name = 'pass';
  inputPass.placeholder = 'Write password';
  inputPass.type = 'password';
  inputPass.required = true;
  labelPassConfirm.innerHTML = 'Confirm Password: ';
  labelPassConfirm.htmlFor = inputPassConfirm.name;
  inputPassConfirm.name = 'passCheck';
  inputPassConfirm.placeholder = 'Write password again';
  inputPassConfirm.type = 'password';
  inputPassConfirm.required = true;
  buttonSignUp.type = 'submit';

  form.addEventListener('submit', (e) => {
    try {
      e.preventDefault();
      if (inputPass.value === inputPassConfirm.value) {
        signupHandler.createUser(inputEmail.value, inputPass.value);
      } else {
        throw new Error('Firebase: Error (auth/passwords-not-match).');
      }
    } catch (err) { popup(err.message); }
  });

  // fetch(img.src).then((res) => res.blob()).then((blob) => {
  //   signUpUser(inputEmail.value, inputPass.value, inputName.value, blob)
  //     .then((response) => {
  //       if (response.includes('Check your email to confirm the account.')) {
  //         form.reset();
  //         popup(response);
  //         navigateTo('/signin');
  //       }
  //       // section.style.display = 'none';
  //       popup(response);
  //     })
  //     // }).then(() => navigateTo('/signin'))
  //     .catch((err) => { popup(err.message); });
  // });

  form.append(
    labelName,
    inputName,
    labelEmail,
    inputEmail,
    labelPass,
    inputPass,
    labelPassConfirm,
    inputPassConfirm,
    buttonSignUp,
  );
  // img.appendChild(iconAddFile);
  // img.appendChild(file);
  back.href = '/signin';
  figure.style.display = 'grid';
  figure.append(img, iconAddFile, file);
  sectionFig.append(buttonLeft, figure, buttonRight);
  section.append(back, sectionFig, title, form);

  return section;
};

export default signup;
