// importamos la funcion que vamos a testear
// import { myFunction } from '../src/lib/index';

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });

import signup from '../src/components/signup';

describe('sign up', () => {
  it('must to be a function', () => {
    expect(typeof signup).toBe('function');
  });
});

describe('Error', () => {
  it('firebase error', () => {
    document.body.append(signup());
    document.getElementById('form').click();

    // expect(document.getElementById('errorPopUp').);
  });
});
