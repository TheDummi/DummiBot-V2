const Discord = require('discord.js');
const { Command } = require('discord-akairo')
const storage = require('../data/storageData.json');
const upgrade = require('../data/upgradeData.json');
const fs = require('fs');

class ReviveCommand extends Command {
    constructor() {
        super('revive', {
            aliases: ['revive'],
            category: 'stats',
            description: 'Revive others with your revives',
            channel: 'guild',
            args: [
                {
                    id: 'user',
                    type: 'user',
                    
                    prompt: {
                        start: 'Who would you like to revive?',
                        retry: 'Couldn\'t find that user, Who?'
                    }
                }
            ]
        })
    }
    async exec(message, args) {
        if (upgrade[message.author.id].curHp <= 0) {
            return await message.util.send('You are dead, use a revive to revive yourself!')
        }
        if (args.user.id == message.author.id) {
            return await message.util.send('In order to revive yourself, you have to `use` a revive.')
        }
        if (!upgrade[args.user.id]) {
            upgrade[args.user.id] = {
                skillPoints: 0,
                curHp: 100,
                health: 100,
                attack: 10,
                storage: 0,
                storageSpace: 400,
                stealth: 1,
                critical: 2,
            }
            return await message.util.send('This user isn\'t dead.')
        }
        if (!storage[message.author.id]) {
            storage[message.author.id] = {
                cheese: 0,
                bandages: 0,
                medkit: 0,
                revives: 0,
                rifle: 0,
                rod: 0
            }
            return message.util.send('You don\'t have any revives!')
        }
        let cheese = storage[message.author.id].cheese;
        let bandages = storage[message.author.id].bandages;
        let medkit = storage[message.author.id].medkit;
        let revives = storage[message.author.id].revives;
        let rifle = storage[message.author.id].rifle;
        let rod = storage[message.author.id].rod;

        let skillPoints = upgrade[args.user.id].skillPoints;
        let curHp = upgrade[args.user.id].curHp;
        let userHealth = upgrade[args.user.id].health;
        let userAttack = upgrade[args.user.id].attack;
        let userStorageMax = upgrade[args.user.id].storage;
        let userStorage = upgrade[args.user.id].storageSpace;
        let userStealth = upgrade[args.user.id].stealth;
        let userCritical = upgrade[args.user.id].critical;

        if (curHp > 0) {
            return await message.util.send('This user is not dead')
        }

        if (!revives) {
            return await message.util.send('You don\'t have any revives!')
        }
        upgrade[args.user.id] = {
            skillPoints: skillPoints,
            curHp: curHp + Math.round(userHealth/2),
            health: userHealth,
            attack: userAttack,
            storage: userStorageMax,
            storageSpace: userStorage,
            stealth: userStealth,
            critical: userCritical,
        }
        storage[message.author.id] = {
            cheese: cheese,
            bandages: bandages,
            medkit: medkit,
            revives: revives - 1,
            rifle: rifle,
            rod: rod
        }
        await message.util.send(`You revived ${args.user}`)
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
    }
}


module.exports = ReviveCommand;