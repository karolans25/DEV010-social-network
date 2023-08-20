import init from '../src/components/init';

describe('init', () => {
  test('must be a function', () => {
    expect(typeof init).toBe('function');
  });
});
