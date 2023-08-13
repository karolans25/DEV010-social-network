function password(navigateTo) {
  const section = document.createElement('section');
  const form = document.createElement('form');
  const title = document.createElement('h2');
  const labelEmail = document.createElement('label');
  const inputEmail = document.createElement('input');
  const buttonRecoverPassword = document.createElement('button');
  const buttonReturn = document.createElement('button');

  title.innerHTML = 'Recover Password';

  inputEmail.placeholder = 'Write email';
  inputEmail.name = 'email';

  labelEmail.innerHTML = 'Email';
  labelEmail.htmlFor = inputEmail.name;

  buttonReturn.textContent = 'Return to home';
  buttonRecoverPassword.textContent = 'Recover Password';

  inputEmail.required = true;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(inputEmail.value);
    alert(inputEmail.value);
    // navigateTo('/signIn');
    navigateTo('/home');
  });

  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  form.append(labelEmail, inputEmail, buttonRecoverPassword);
  section.append(title, form, buttonReturn);

  return section;
}

export default password;
