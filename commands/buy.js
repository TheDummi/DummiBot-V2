const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const coins = require('../data/currency.json');
const upgrade = require('../data/upgradeData.json');
const storage = require('../data/storageData.json');
const fs = require('fs');
class BuyCommand extends Command {
    constructor() {
        super('buy', {
            aliases: ['buy'],
            category: 'economy',
            description: 'Buy stuff with coins',
            args: [
                {
                    id: 'choice',
                    type: [
                        'cheese',
                        'skillpoints',
                        'bandages',
                        'revive'
                    ],
                    prompt: {
                        start: 'What would you like to buy?'
                    }
                },
                {
                    id: 'string',
                    type: 'number',
                    match: 'rest',
                    prompt: {
                        start: 'How much?'
                    }
                }
            ]
        })
    }
    async exec(message, args) {
        let choice = args.choice;
        let string = args.string;
        if (!storage[message.author.id]) {
            storage[message.author.id] = {
                cheese: 0,
                bandages: 0,
                revives: 0
            }
        }

        let userCoins = coins[message.author.id].coins;
        let userBank = coins[message.author.id].bank;

        let cheese = storage[message.author.id].cheese;
        let bandages = storage[message.author.id].bandages;
        let revives = storage[message.author.id].revives;

        let user = message.author.id;
        let skillPoints = upgrade[user].skillPoints;
        let curHp = upgrade[user].curHp;
        let userHealth = upgrade[user].health;
        let userAttack = upgrade[user].attack;
        let userStorageMax = upgrade[user].storage;
        let userStorage = upgrade[user].storageSpace;
        let userStealth = upgrade[user].stealth;
        let userCritical = upgrade[user].critical;
        if (choice == 'skillpoints') {
            if (userCoins < string * 1000000) {
                return message.util.send('Not enough coins!')
            }
            userCoins = userCoins - (string * 1000000)
            skillPoints = skillPoints + string
            upgrade[message.author.id] = {
                skillPoints: skillPoints,
                curHp: curHp,
                health: userHealth,
                attack: userAttack,
                storage: userStorageMax,
                storageSpace: userStorage,
                stealth: userStealth,
                critical: userCritical,
            }
            coins[message.author.id] = {
                coins: userCoins,
                bank: userBank
            }
            fs.writeFile('data/currency.json', JSON.stringify(coins), (err) => {
                if (err) console.log(err)
            });
            fs.writeFile('data/upgradeData.json', JSON.stringify(upgrade), (err) => {
                if (err) console.log(err)
            });
            return message.util.send(`You bought ${string} skill points`)
        }
        userStorageMax = userStorageMax + string;
        if (string > (userStorage - userStorageMax)) {
            return await message.util.send('You do not have enough space!')
        }
        if (choice == 'cheese') {
            if (userCoins < string * 100) {
                return message.util.send('Not enough coins!')
            }
            userCoins = userCoins - (string * 100)
            cheese = cheese + string
        }
        if (choice == 'bandages') {
            if (userCoins < string * 1000) {
                return message.util.send('Not enough coins!')
            }
            userCoins = userCoins - (string * 1000)
            bandages = bandages + string
        }
        if (choice == 'revive') {
            if (userCoins < string * 10000) {
                return message.util.send('Not enough coins!')
            }
            userCoins = userCoins - (string * 10000)
            revives = revives + string
        }
        coins[message.author.id] = {
            coins: userCoins,
            bank: userBank
        }
        storage[message.author.id] = {
            cheese: cheese,
            bandages: bandages,
            revives: revives
        }
        upgrade[message.author.id] = {
            skillPoints: skillPoints,
            curHp: curHp,
            health: userHealth,
            attack: userAttack,
            storage: userStorageMax,
            storageSpace: userStorage,
            stealth: userStealth,
            critical: userCritical,
        }
        fs.writeFile('data/storageData.json', JSON.stringify(storage), (err) => {
            if (err) console.log(err)
        });
        fs.writeFile('data/upgradeData.json', JSON.stringify(upgrade), (err) => {
            if (err) console.log(err)
        });
        fs.writeFile('data/currency.json', JSON.stringify(coins), (err) => {
            if (err) console.log(err)
        });
        return await message.util.send(`You bought ${string} ${choice}!`)
    }
}

module.exports = BuyCommand;