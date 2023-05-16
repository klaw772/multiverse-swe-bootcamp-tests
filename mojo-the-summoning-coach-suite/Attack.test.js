const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Attack, Card } = require('../')
const { db } = require('../../db/config')

// define in global scope
let attack;
let card1;
let card2;

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true })
    attack = await Attack.create({
        title: "flame",
        mojoCost: 12,
        staminaCost: 15
    })
    card1 = await Card.create({
        name: 'Arcturus Spellweaver',
        mojo: 100,
        stamina: 10,
        imgUrl: 'http://localhost:5000/img/arcturus-spellweaver.jpg'
    })

    card2 = await Card.create({
        name: 'Nimue Mistral',
        mojo: 100,
        stamina: 10,
        imgUrl: 'http://localhost:5000/img/nimue-mistral.jpg'
    })
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Attack', () => {
    test('has an id', async () => {
        expect(attack).toHaveProperty('id')
    })

    /**
     * Create more tests
     * E.g. check that the username of the created user is actually gandalf
     */
    test('has a title', async () => {
        expect(attack.title).toEqual('flame')
    })

    test('has a mojo', async () => {
        expect(attack.mojoCost).toEqual(12)
    })

    test('has a stamina', async () => {
        expect(attack.staminaCost).toEqual(15)
    })

    test("attack can have many cards", async () => {
        attack.addCard(card1);
        attack.addCard(card2);
        const associatedCards = await attack.getCards();
        expect(associatedCards.length).toBe(2);
        expect(associatedCards[0] instanceof Card).toBe(true);
        expect(associatedCards[1] instanceof Card).toBe(true);
    })
})