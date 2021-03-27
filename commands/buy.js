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
                        'medkit',
                        'revive',
                        'rifle',
                    ],
                    prompt: {
                        start: 'What would you like to buy?',
                        retry: 'Can\'t buy that. What would you like to buy?'
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
                revives: 0,
                medkit: 0,
                rifle: 0,
            }
        }

        let userCoins = coins[message.author.id].coins;
        let userBank = coins[message.author.id].bank;

        let cheese = storage[message.author.id].cheese;
        let bandages = storage[message.author.id].bandages;
        let medkit = storage[message.author.id].medkit;
        let revives = storage[message.author.id].revives;

        let user = message.author.id;
        let skillPoints = upgrade[user].skillPoints;
        let curHp = upgrade[user].curHp;
        let rifle = storage[user].rifle;
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
            return message.util.send(`You bought ${string} skill points`)
        }
        if (choice == 'rifle') {
            if (userCoins < 750000) {
                return await message.util.send('You don\'t have enough coins!')
            }
            if (string > 1) return await message.util.send('You can only own 1 rifle.') 
            if (rifle >= 1) return await message.util.send('You already have a hunting rifle.')
            storage[message.author.id] = {
                cheese: cheese,
                bandages: bandages,
                medkit: medkit,
                revives: revives,
                rifle: rifle + string,
            }
            coins[message.author.id] = {
                coins: userCoins - 750000,
                bank: userBank
            }
            fs.writeFile('data/storageData.json', JSON.stringify(storage), (err) => {
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
            return await message.util.send('You bought a hunting rifle.');
        }
        
        if (string > (userStorage - userStorageMax)) {
            return await message.util.send('You do not have enough space!')
        }
        userStorageMax = userStorageMax + string;

        if (choice == 'cheese') {
            if (userCoins < string * 100) {
                return message.util.send('Not enough coins!')
            }
            userCoins = userCoins - (string * 100)
            cheese = cheese + string
        }

        if (choice == 'medkit') {
            if (userCoins < string * 5000) {
                return message.util.send('Not enough coins!')
            }
            userCoins = userCoins - (string * 5000)
            medkit = medkit + string
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
        return await message.util.send(`You bought ${string} ${choice}!`)
    }
}

module.exports = BuyCommand;