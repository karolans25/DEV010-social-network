import signin from '../src/components/signin';

describe('sign in', () => {
  it('must to be a function', () => {
    expect(typeof signin).toBe('function');
  });
});

describe('Error', () => {
  it('firebase error', () => {
    document.body.append(signin());
    document.getElementById('form').click();

    // expect(document.getElementById('errorPopUp').);
  });
});
