const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const { Deck, User, Card } = require('server/src/models');
const { db } = require('server/src/db/config');

// define in global scope
let deck;
let user;
let card1;
let card2;

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true })
    deck = await Deck.create({ name: 'mojojojo', xp: 22 })
    user = await User.create({ username: 'v1per' });
    card1 = await Card.create({
        name: 'Arcturus Spellweaver',
        mojo: 100,
        stamina: 10,
        imgUrl: 'http://localhost:5000/img/arcturus-spellweaver.jpg'
    });
    card2 = await Card.create({
        name: 'Nimue Mistral',
        mojo: 100,
        stamina: 10,
        imgUrl: 'http://localhost:5000/img/nimue-mistral.jpg'
    });
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Deck', () => {
    test('has an id', async () => {
        expect(deck).toHaveProperty('id')
    })

    /**
     * Create more tests
     * E.g. check that the username of the created user is actually gandalf
     */
    test('has a name', async () => {
        expect(deck.name).toEqual('mojojojo')
    })

    test('has a xp', async () => {
        expect(deck.xp).toEqual(22)
    })

    test("deck can have one user", async () => {
        await deck.setUser(user);
        const associatedUser = await deck.getUser()
        expect(associatedUser instanceof User).toBeTruthy();
    })

    test("deck can have many cards", async () => {
        deck.addCard(card1);
        deck.addCard(card2);

        const associatedCards = await deck.getCards();
        expect(associatedCards.length).toBe(2);
        expect(associatedCards[0] instanceof Card).toBe(true);
        expect(associatedCards[1] instanceof Card).toBe(true);
    })
})
