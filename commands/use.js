const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const upgrade = require('../data/upgradeData.json');
const storage = require('../data/storageData.json');
const fs = require('fs');
class UseCommand extends Command {
    constructor() {
        super('use', {
            aliases: ['use'],
            category: 'economy',
            description: 'use stuff with coins',
            args: [
                {
                    id: 'choice',
                    type: [
                        'cheese',
                        'bandages',
                        'medkit',
                        'revive',
                    ],
                    prompt: {
                        start: 'What would you like to use?',
                        retry: 'Couldn\'t find that item, what would you like to use?'
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
                revives: 0,
                rifle: 0
            }
            return await message.util.send('You don\'t have anything in your backpack to use!')
        }

        let cheese = storage[message.author.id].cheese;
        let bandages = storage[message.author.id].bandages;
        let medkit = storage[message.author.id].medkit;
        let revives = storage[message.author.id].revives;
        let shield = storage[message.author.id].shield;

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
        userStorageMax = userStorageMax - string;
        if (choice == 'cheese') {
                if (cheese < string) {
                    return await message.util.send('You don\'t have enough cheese')
                }
                if (curHp <= 0) {
                    return await message.util.send('YOu cannot heal yourself until you have been revived!')
                }
                if (curHp >= userHealth) {
                    storage[message.author.id] = {
                        cheese: cheese - string,
                        bandages: bandages,
                        revives: revives,
                        rifle: rifle
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
                .setDescription(`\`\`\`${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
                    });
                    fs.writeFile('data/upgradeData.json', JSON.stringify(upgrade), (err) => {
                        let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
                    });
                    return await message.util.send(`You ate ${string} cheese!`)
                }
                
            cheese = cheese - string
            curHp = curHp + string
        }
        if (choice == 'bandages') {
            if (bandages < string) {
                return await message.util.send('You don\'t have enough bandages')
            }
            if (curHp <= 0) {
                return await message.util.send('YOu cannot heal yourself until you have been revived!')
            }
            if (curHp >= userHealth) {
                return await message.util.send('You are full health!')
            }
            if (curHp + string * 10 > userHealth) {
                return await message.util.send('You can\'t over heal!')
            }
            
            bandages = bandages - string
            curHp = curHp + string * 10
        }
        if (choice == 'medkit') {
            if (medkit < string) {
                return await message.util.send('You don\'t have enough bandages')
            }
            if (curHp <= 0) {
                return await message.util.send('YOu cannot heal yourself until you have been revived!')
            }
            if (curHp >= userHealth) {
                return await message.util.send('You are full health!')
            }
            if (curHp + string * 25 > userHealth) {
                return await message.util.send('You can\'t over heal!')
            }
            
            medkit = medkit - string
            curHp = curHp + string * 25
        }
        if (choice == 'revive') {
            if (revives < string) {
                return await message.util.send('You don\'t have enough revives!')
            }
            if (curHp > 0) {
                return await message.util.send('You are not down!')
            }
            curHp = curHp + Math.round(userHealth/2)
            revives = revives - string
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
                .setDescription(`\`\`\`${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        fs.writeFile('data/upgradeData.json', JSON.stringify(upgrade), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        return await message.util.send(`You used ${string} ${choice}!`)
    }
}

module.exports =  UseCommand;