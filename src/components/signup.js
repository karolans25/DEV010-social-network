import { signUpUser } from '../lib/index';

function signup(navigateTo) {
  const section = document.createElement('section');
  const back = document.createElement('a');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const imgUrl = document.createElement('input');
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

  let file;

  // section
  section.className = 'signup';

  // link back
  back.innerHTML = 'back';
  back.href = '/signin';

  // figure
  img.src = './assets/icons/nina.webp';
  img.alt = 'user icon';
  figure.append(img);

  // button to update img
  imgUrl.type = 'file';
  imgUrl.id = 'imgUrl';
  imgUrl.value = '';
  imgUrl.addEventListener('change', (e) => {
    file = e.target.files[0];
    img.src = URL.createObjectURL(file);
  });

  // title
  title.textContent = 'Sign Up';
  buttonSignUp.textContent = 'Sign Up';

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

  form.addEventListener('submit', (e) => {
    try {
      e.preventDefault();
      if (inputPass.value === inputPassConfirm.value) {
        signUpUser(inputEmail.value, inputPass.value, inputName.value, file)
          .then((response) => {
            if (response === `The user has been registered with email ${inputEmail.value}\nCheck your email to confirm the account.`) {
              form.reset();
              navigateTo('/signin');
            }
            alert(response);
          })
          .catch((err) => console.log(err));
      } else {
        throw new Error('The passwords don\'t match');
      }
    } catch (err) {
      alert(err.message);
    }
  });

  section.append(back, figure, imgUrl, title, form);

  return section;
}

export default signup;
