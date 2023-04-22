const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('Scooter object', () => {
  test('Scooter creation', () => {
    const scooter = new Scooter('Rogers Avenue');
    expect(typeof scooter).toBe('object');
    expect(scooter.station).toBe('Rogers Avenue');
    expect(scooter.user).toBeNull();
    expect(scooter.serial).toBe(1);
    expect(scooter.charge).toBe(100);
    expect(scooter.isBroken).toBe(false);
    expect(Scooter.nextSerial).toBe(2);
  });

  test('rent succeeds', () => {
    const scooter = new Scooter('Milford Mill');
    const user = new User('Scooby', 'snack', 10);
    scooter.rent(user);
    expect(scooter.user).toBe(user);
    expect(scooter.station).toBeNull();
  });

  test('rent fails due to low battery', () => {
    const scooter = new Scooter('Milford Mill');
    scooter.charge = 15;
    const user = new User('Scooby', 'snack', 10);
    expect(() => scooter.rent(user))
      .toThrow('scooter needs to charge');
    expect(scooter.user).toBeNull();
    expect(scooter.station).toBe('Milford Mill');
  });

  test('rent fails due to broken scooter', () => {
    const scooter = new Scooter('Milford Mill');
    scooter.isBroken = true;
    const user = new User('Scooby', 'snack', 10);
    expect(() => scooter.rent(user))
      .toThrow('scooter needs repair');
    expect(scooter.user).toBeNull();
    expect(scooter.station).toBe('Milford Mill');
  });

  test('dock succeeds', () => {
    const scooter = new Scooter('Milford Mill');
    const user = new User('Scooby', 'snack', 10);
    scooter.rent(user);
    scooter.dock('Johns Hopkins Hospital');
    expect(scooter.user).toBeNull();
    expect(scooter.station).toBe('Johns Hopkins Hospital');
  });

  test('recharge', () => {
    const scooter = new Scooter('Milford Mill');
    const user = new User('Scooby', 'snack', 10);
    scooter.charge = 10;
    scooter.recharge();
    expect(scooter.charge).toBe(100);
  });

  test('request repair', () => {
    const scooter = new Scooter('Milford Mill');
    const user = new User('Scooby', 'snack', 10);
    scooter.isBroken = true;
    scooter.requestRepair();
    expect(scooter.isBroken).toBe(false);
  });

});