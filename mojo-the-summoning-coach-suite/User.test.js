const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { User, Deck } = require('server/src/models')
const { db } = require('server/src/db/config')

// define in global scope
let user;
let deck;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  user = await User.create({ username: 'gandalf' });
  deck = await Deck.create({ name: 'The Fellowship', xp: 10 });
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('User', () => {
  test('has an id', async () => {
    expect(user).toHaveProperty('id')
  })

  test('has a username', async () => {
    expect(user.username).toEqual('gandalf')
  })

  test("User can have one deck", async () => {
    await user.setDeck(deck);
    const associatedDeck = await user.getDeck()
    expect(associatedDeck instanceof Deck).toBeTruthy();
  })
})
