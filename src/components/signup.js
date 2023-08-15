import { signUpAuth, sendEmailVerificationAuth } from '../lib/auth';
// import { dataJson } from '../lib/authui';

function signup(navigateTo) {
  const section = document.createElement('section');
  const back = document.createElement('a');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const title = document.createElement('h2');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const inputPassConfirm = document.createElement('input');
  const labelEmail = document.createElement('label');
  const labelPass = document.createElement('label');
  const labelPassConfirm = document.createElement('label');
  const buttonSignUp = document.createElement('button');

  // section
  section.className = 'signup';

  // link back
  back.innerHTML = 'back';
  back.href = '/signin';

  // figure
  img.src = './assets/icons/nina.webp';
  img.alt = 'user icon';
  figure.append(img);

  // title
  title.textContent = 'Sign Up';
  buttonSignUp.textContent = 'Sign Up';

  // form
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
    labelEmail,
    inputEmail,
    labelPass,
    inputPass,
    labelPassConfirm,
    inputPassConfirm,
    buttonSignUp,
  );

  form.addEventListener('submit', async (e) => {
    try {
      e.preventDefault();
      if (inputPass.value === inputPassConfirm.value) {
        signUpAuth(inputEmail.value, inputPass.value)
          .then((credential) => {
            alert(`User created with email ${credential.user.email}.\nAn email has been sent to confirm your account.`);
            sendEmailVerificationAuth();
            form.reset();
            setTimeout(navigateTo('/signin'), 1000);
          })
          .catch((err) => {
            alert(err.message.split('Firebase: ')[1]);
          });
      } else {
        alert('Error (auth/passwords-does-not-match)');
      }
    } catch (err) {
      alert(err.message);
    }
  });

  section.append(back, figure, title, form);

  return section;
}

export default signup;
