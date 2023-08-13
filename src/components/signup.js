// import { signUpAuth } from '../lib/auth';

function signup(navigateTo) {
  const back = document.createElement('a');
  const section = document.createElement('section');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const title = document.createElement('h2');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const inputPassCheck = document.createElement('input');
  const labelEmail = document.createElement('label');
  const labelPass = document.createElement('label');
  const labelPassCheck = document.createElement('label');
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
  labelPassCheck.innerHTML = 'Confirm Password: ';
  labelPassCheck.htmlFor = inputPassCheck.name;
  inputPassCheck.name = 'passCheck';
  inputPassCheck.placeholder = 'Write password again';
  inputPassCheck.type = 'password';
  inputPassCheck.required = true;
  buttonSignUp.type = 'submit';

  form.append(
    labelEmail,
    inputEmail,
    labelPass,
    inputPass,
    labelPassCheck,
    inputPassCheck,
    buttonSignUp,
  );

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (inputPass.value === inputPassCheck.value) {
    //   try {
    //     const credential = await signUpAuth(inputEmail.value, inputPass.value);
    //     console.log(credential);
    //   } catch (err) {
    //     console.error(err);
    //   }
      //   form.reset();
      //   navigateTo('/home');
      /*
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          alert(err.message.split('Firebase: ')[1]);
        });
        */
    } else {
      alert('Error (auth/passwords-does-not-match');
    }
  });

  section.append(back, figure, title, form);

  return section;
}

export default signup;
