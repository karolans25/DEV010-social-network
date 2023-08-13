// import { signUpAuth } from '../lib/auth';

function signup(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  // const inputName = document.createElement('input');
  // const inputLastName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const inputPassCheck = document.createElement('input');
  // const labelName = document.createElement('label');
  // const labelLastName = document.createElement('label');
  const labelEmail = document.createElement('label');
  const labelPass = document.createElement('label');
  const labelPassCheck = document.createElement('label');
  const buttonSignUp = document.createElement('button');

  form.className = 'sign-up';
  title.textContent = 'Sign Up';
  buttonSignUp.textContent = 'Sign Up';

  // labelName.innerHTML = 'Name: ';
  // labelLastName.innerHTML = 'Last Name: ';
  labelEmail.innerHTML = 'Email: ';
  labelPass.innerHTML = 'Password: ';
  labelPassCheck.innerHTML = 'Password again: ';

  // inputName.name = 'name';
  // inputLastName.name = 'lastName';
  inputEmail.name = 'email';
  inputPass.name = 'pass';
  inputPassCheck.name = 'passCheck';

  // inputName.placeholder = 'Write name';
  // inputLastName.placeholder = 'Write last name';
  inputEmail.placeholder = 'Write email';
  inputPass.placeholder = 'pass';
  inputPassCheck.placeholder = 'pass again';

  // labelName.htmlFor = inputName.name;
  // labelLastName.htmlFor = inputLastName.name;
  labelEmail.htmlFor = inputEmail.name;
  labelPass.htmlFor = inputPass.name;
  labelPassCheck.htmlFor = inputPassCheck.name;

  // inputName.type = 'text';
  // inputLastName.type = 'text';
  inputEmail.type = 'email';
  inputPass.type = 'password';
  inputPassCheck.type = 'password';
  buttonSignUp.type = 'submit';

  // inputName.required = true;
  // inputLastName.required = true;
  inputEmail.required = true;
  inputPass.required = true;
  inputPassCheck.required = true;

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

  buttonReturn.textContent = 'Return to home';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  form.append(
    // labelName,
    // inputName,
    // labelLastName,
    // inputLastName,
    labelEmail,
    inputEmail,
    labelPass,
    inputPass,
    labelPassCheck,
    inputPassCheck,
    buttonSignUp,
  );
  section.append(title, form, buttonReturn);

  return section;
}

export default signup;
