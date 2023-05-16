const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Card, Deck, Attack } = require('../')
const { db } = require('../../db/config')

// define in global scope
let card;
let deck;
let attack1;
let attack2;

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true })
    card = await Card.create({
        name: 'Arcturus Spellweaver',
        mojo: 100,
        stamina: 10,
        imgUrl: 'http://localhost:5000/img/arcturus-spellweaver.jpg'
    })
    deck = await Deck.create({ name: 'the matrix', xp: 22 });
    attack1 = await Attack.create({
        title: "charge",
        mojoCost: 10,
        staminaCost: 15
    });
    attack2 = await Attack.create({
        title: "punch",
        mojoCost: 5,
        staminaCost: 10
    });
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Deck', () => {
    test('has an id', async () => {
        expect(card).toHaveProperty('id')
    })

    /**
     * Create more tests
     * E.g. check that the username of the created user is actually gandalf
     */
    test('has a name', async () => {
        expect(card.name).toEqual('Arcturus Spellweaver')
    })

    test('has a mojo', async () => {
        expect(card.mojo).toEqual(100)
    })

    test('has a stamina', async () => {
        expect(card.stamina).toEqual(10)
    })

    test('has a stamina', async () => {
        expect(card.imgUrl).toEqual("http://localhost:5000/img/arcturus-spellweaver.jpg")
    })

    test("card has one deck", async () => {
        card.setDeck(deck);
        const associatedDeck = await card.getDeck();
        expect(associatedDeck instanceof Deck).toBe(true);
    })

    test("card has many attacks", async () => {
        card.addAttack(attack1);
        card.addAttack(attack2);
        const associatedAttacks = await card.getAttacks();
        expect(associatedAttacks.length).toBe(2);
        expect(associatedAttacks[0] instanceof Attack).toBe(true);
        expect(associatedAttacks[1] instanceof Attack).toBe(true);
    })
})
