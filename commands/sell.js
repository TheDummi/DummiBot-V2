const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const coins = require('../data/currency.json');
const upgrade = require('../data/upgradeData.json');
const storage = require('../data/storageData.json');
const hunting = require('../data/huntingData.json');
const fs = require('fs');

class SellCommand extends Command {
    constructor() {
        super('sell', {
            aliases: ['sell'],
            category: 'economy',
            description: 'Sell stuff for coins',
            args: [
                {
                    id: 'choice',
                    type: [
                        'cheese',
                        'skillpoints',
                        'bandages',
                        'medkit',
                        'revive',
                        'rifle',
                        'pigeon',
                        'pig',
                        'goat',
                        'fox', 
                        'rabbit',
                        'deer',
                        'tiger',
                        'lion',
                        'buffalo',
                    ],
                    prompt: {
                        start: 'What would you like to sell?',
                        retry: 'Can\'t buy that. What would you like to sell?'
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
        if (upgrade[message.author.id].curHp <= 0) {
            return await message.util.send('You are dead, use a revive to revive yourself!')
        }
        let choice = args.choice;
        let string = args.string;
        if (!storage[message.author.id]) {
            storage[message.author.id] = {
                cheese: 0,
                bandages: 0,
                medkit: 0,
                revives: 0,
                rifle: 0,
            }
        }
        if (!hunting[message.author.id]) {
            hunting[message.author.id] = {
                pigeon: 0,
                pig: 0,
                goat: 0,
                fox: 0, 
                rabbit: 0,
                deer: 0,
                tiger: 0,
                lion: 0,
                buffalo: 0,
            }
        }
        let user = message.author;
        let userCoins = coins[user.id].coins;
        let userBank = coins[user.id].bank;

        let cheese = storage[user.id].cheese;
        let bandages = storage[user.id].bandages;
        let medkit = storage[user.id].medkit;
        let revives = storage[user.id].revives;

        let pigeon = hunting[user.id].pigeon;
        let pig = hunting[user.id].pig;
        let goat = hunting[user.id].goat;
        let fox = hunting[user.id].fox;
        let rabbit = hunting[user.id].rabbit;
        let deer = hunting[user.id].deer;
        let tiger = hunting[user.id].tiger;
        let lion = hunting[user.id].lion;
        let buffalo = hunting[user.id].buffalo;

        
        let skillPoints = upgrade[user.id].skillPoints;
        let curHp = upgrade[user.id].curHp;
        let rifle = storage[user.id].rifle;
        let userHealth = upgrade[user.id].health;
        let userAttack = upgrade[user.id].attack;
        let userStorageMax = upgrade[user.id].storage;
        let userStorage = upgrade[user.id].storageSpace;
        let userStealth = upgrade[user.id].stealth;
        let userCritical = upgrade[user.id].critical;

        let a;

        if (choice == 'skillpoints') {
            return message.util.send(`You can\'t sell skill points`)
        }
        if (choice == 'rifle') {
            return await message.util.send('You can\'t sell a hunting rifle.');
        }
        
        userStorageMax = userStorageMax - string;

        if (choice == 'cheese') {
            if (string > cheese) {
                return await message.util.send(`You don't have enough ${choice}!`)
            }
            a = string * 50;
            userCoins = userCoins + a
            cheese = cheese - string
        }

        if (choice == 'medkit') {
            if (string > medkit) {
                return await message.util.send(`You don't have enough ${choice}!`)
            }
            a = string * 2500
            userCoins = userCoins - a
            medkit = medkit + string
        }

        if (choice == 'bandages') {
            if (string > bandages) {
                return await message.util.send(`You don't have enough ${choice}!`)
            }
            a = string * 500
            userCoins = userCoins + a
            bandages = bandages - string
        }
        if (choice == 'revive') {
            if (string > revives) {
                return await message.util.send(`You don't have enough ${choice}!`)
            }
            a = string * 5000
            userCoins = userCoins + a
            revives = revives - string
        }
        if (choice == 'pigeon') {
            if (string > pigeon) {
                return await message.util.send(`You don't have enough ${choice}!`)
            }
            a = string * 400
            userCoins = userCoins + a
            pigeon = pigeon - string
        }
        if (choice == 'pig') {
            if (string > pig) {
                return await message.util.send(`You don't have enough ${choice}!`)
            }
            a = string * 500
            userCoins = userCoins + a
            pig = pig - string
        }
        if (choice == 'goat') {
            if (string > goat) {
                return await message.util.send(`You don't have enough ${choice}!`)
            }
            a = string * 1250
            userCoins = userCoins + a
            goat = goat - string
        }
        if (choice == 'fox') {
            if (string > fox) {
                return await message.util.send(`You don't have enough ${choice}!`)
            }
            a = string * 2500
            userCoins = userCoins + a
            fox = fox - string
        }
        if (choice == 'rabbit') {
            if (string > rabbit) {
                return await message.util.send(`You don't have enough ${choice}!`)
            }
            a = string * 1000
            userCoins = userCoins + a
            rabbit = rabbit - string
        }
        if (choice == 'deer') {
            if (string > deer) {
                return await message.util.send(`You don't have enough ${choice}!`)
            }
            a = string * 12500
            userCoins = userCoins + a
            deer = deer - string
        }
        if (choice == 'tiger') {
            if (string > tiger) {
                return await message.util.send(`You don't have enough ${choice}!`)
            }
            a = string * 25000
            userCoins = userCoins + a
            tiger = tiger - string
        }
        if (choice == 'lion') {
            if (string > lion) {
                return await message.util.send(`You don't have enough ${choice}!`)
            }
            a = string * 50000
            userCoins = userCoins + a
            lion = lion - string
        }
        if (choice == 'buffalo') {
            if (string > buffalo) {
                return await message.util.send(`You don't have enough ${choice}!`)
            }
            a = string * 100000
            userCoins = userCoins + a
            buffalo = buffalo - string
        }

        coins[message.author.id] = {
            coins: userCoins,
            bank: userBank
        }
        hunting[message.author.id] = {
            pigeon: pigeon,
            pig: pig,
            goat: goat,
            fox: fox, 
            rabbit: rabbit,
            deer: deer,
            tiger: tiger,
            lion: lion,
            buffalo: buffalo,
        }
        storage[message.author.id] = {
            cheese: cheese,
            bandages: bandages,
            medkit: medkit,
            revives: revives,
            rifle: rifle,
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
        fs.writeFile('data/huntingData.json', JSON.stringify(hunting), (err) => {
            let errEmbed = new Discord.MessageEmbed()
            .setTitle('JSON OVERLOAD')
            .setColor(0xaa00cc)
            .setDescription(`\`\`\`json\n${err}\`\`\``)
        if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        fs.writeFile('data/storageData.json', JSON.stringify(storage), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        fs.writeFile('data/upgradeData.json', JSON.stringify(upgrade), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        fs.writeFile('data/currency.json', JSON.stringify(coins), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        return await message.util.send(`You sold ${string} ${choice} for ${a}!`)
    }
}

module.exports = SellCommand;