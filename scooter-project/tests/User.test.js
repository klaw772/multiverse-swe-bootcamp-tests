const User = require('../src/User')

// User tests here
describe('User object', () => {

  test('user creation', () => {
    const maggie = new User("Maggie", "woof", 62);
    expect(maggie.username).toBe("Maggie");
    expect(maggie.password).toBe("woof");
    expect(maggie.age).toBe(62);
  });

  test('login succeeds', () => {
    const kiki = new User("Kiki", "meow", 12);
    kiki.login("meow");
    expect(kiki.loggedIn).toBe(true);
  });

  test('login fails', () => {
    const kiki = new User("Kiki", "meow", 12);
    expect(() => kiki.login("woof"))
      .toThrow("incorrect password");
  });

  test('logout succeeds', () => {
    const kiki = new User("Kiki", "meow", 12);
    kiki.login("meow");
    kiki.logout();
    expect(kiki.loggedIn).toBe(false);
  });
});