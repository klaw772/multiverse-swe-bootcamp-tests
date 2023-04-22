const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

describe("Scooter App", () => {

  test ("create object", () => {
    const app = new ScooterApp();
    expect(typeof app.registeredUsers).toBe('object');
    expect(Object.keys(app.registeredUsers).length).toBe(0);
    expect(typeof app.stations).toBe('object');
    expect(app.stations['Johns Hopkins Hospital']).not.toBeNull();
  });

  test("register user succeeds", () => {
    const app = new ScooterApp();
    const user = app.registerUser('Jane', 'doe', 27);
    expect(user.username).toBe('Jane');
    expect(user.password).toBe('doe');
    expect(user.age).toBe(27);
    expect(user.loggedIn).toBe(false);
  });

  test("register user fails due to age", () => {
    const app = new ScooterApp();
    expect(() => app.registerUser('Eloise', 'plaza', 7))
      .toThrow('too young to register');
  });

  test("re-register user fails", () => {
    const app = new ScooterApp();
    app.registerUser("Velma", "the truth", 19);
    expect(() =>  app.registerUser("Velma", "Fred", 20))
      .toThrow('already registered');
  });

  test("login succeeds", () => {
    const app = new ScooterApp();
    const user = app.registerUser("Daphne", "purple", 18);
    app.loginUser("Daphne", "purple");
    expect(user.loggedIn).toBe(true);
  })

  test("login fails because user does not exist", () => {
    const app = new ScooterApp();
    expect(() => app.loginUser("Fred", "ascot"))
      .toThrow("Username or password is incorrect");
  })

  test("login fails because password is wrong", () => {
    const app = new ScooterApp();
    const user = app.registerUser("Fred", "ascot", 18);
    expect(() => app.loginUser("Fred", "hot"))
      .toThrow("Username or password is incorrect");
  })

  test("logout succeeds", () => {
    const app = new ScooterApp();
    const user = app.registerUser("Shaggy", "ganja", 30);
    app.loginUser("Shaggy", "ganja");
    app.logoutUser("Shaggy");
    expect(user.loggedIn).toBe(false);
  })

  test("createScooter succeeds", () => {
    const app = new ScooterApp();
    const scooter = app.createScooter("Johns Hopkins Hospital");
    expect(scooter.station).toBe("Johns Hopkins Hospital");
  });

  test("createScooter fails due to no such station", () => {
    const app = new ScooterApp();
    expect(() => app.createScooter("Unknown Location"))
      .toThrow("no such station");
    
  });

  test("rentScooter succeeds", () => {
    const app = new ScooterApp();
    const user = app.registerUser("Bender", "shiny metal", 50);
    const scooter = app.createScooter("Old Court");
    app.rentScooter(scooter, user);
    expect(scooter.user).toEqual(user);
  });

  test("rentScooter fails if already rented", () => {
    const app = new ScooterApp();
    const user = app.registerUser("Bender", "shiny metal", 50);
    const scooter = app.createScooter("Old Court");
    app.rentScooter(scooter, user);
    expect(() => app.rentScooter(scooter, user))
      .toThrow('scooter already rented')
  });

  test("dockScooter succeeds", () => {
    const app = new ScooterApp();
    const user = app.registerUser("Bender", "shiny metal", 50);
    const scooter = app.createScooter("Old Court");
    app.rentScooter(scooter, user);
    app.dockScooter(scooter, "Rogers Avenue");
    expect(scooter.user).toBeNull();
    expect(scooter.station).toBe("Rogers Avenue");
  });

  test("dockScooter fails if station does not exist", () => {
    const app = new ScooterApp();
    const user = app.registerUser("Bender", "shiny metal", 50);
    const scooter = app.createScooter("Old Court");
    app.rentScooter(scooter, user);
    expect(() => app.dockScooter(scooter, "Penn Station"))
      .toThrow('no such station');
  });

  test("dockScooter fails if scooter already there", () => {
    const app = new ScooterApp();
    const user = app.registerUser("Bender", "shiny metal", 50);
    const scooter = app.createScooter("Old Court");
    expect(() => app.dockScooter(scooter, "Old Court"))
      .toThrow('scooter already at station');
  });

})