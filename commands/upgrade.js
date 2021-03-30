const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const upgrade = require('../data/upgradeData.json');
const fs = require('fs');
const xp = require('../data/xpData.json');
class UpgradeCommand extends Command {
    constructor() {
        super('upgrade', {
            aliases: ['upgrade', 'up'],
            category: 'stats',
            channel: 'guild',
            description: 'Use your upgrade points to upgrade your stats',
            args: [
                {
                    id: 'choice',
                    type: ['health', 'storage', 'attack', 'stealth', 'critical'],
                    prompt: {
                        start: 'What would you like to upgrade?\n`health`\n`storage`\n`attack`\n`stealth`\n`critical`'
                    }
                },
                {
                    id: 'amount',
                    type: 'number',
                    prompt: {
                        start: 'How many skill points would you like to spend?\n check your skill points balance with `~profile`'
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
        let number = args.amount;

        if (!upgrade[message.author.id]) {
            upgrade[message.author.id] = {
                skillPoints: xp[message.author.id].level || 1,
                curHp: 100,
                health: 100,
                attack: 10,
                storage: 0,
                storageSpace: 400,
                stealth: 1,
                critical: 2,
            }
        }
        let user = message.author.id;
        let skillPoints = upgrade[user].skillPoints;
        let curHp = upgrade[user].curHp;
        let userHealth = upgrade[user].health;
        let userAttack = upgrade[user].attack;
        let storage = upgrade[user].storage;
        let userStorage = upgrade[user].storageSpace;
        let userStealth = upgrade[user].stealth;
        let userCritical = upgrade[user].critical;
        if (number > skillPoints) {
            return await message.util.send('You don\'t have that amount of skill points!')
        }
        if (skillPoints <= 0) {
            return await message.util.send('You do not have any skill points.');
        }

        if (choice == 'health') {
            skillPoints = skillPoints - number
            curHp = curHp + (number * 5)
            userHealth = userHealth + (number * 5)
        }

        if (choice == 'attack') {
            skillPoints = skillPoints - number
            userAttack = userAttack + (number * 5)
        }

        if (choice == 'storage') {
            if (skillPoints <= 4) {
                return await message.util.send('You do not have enough skill points.')
            }
            skillPoints = skillPoints - number
            userStorage = userStorage + number * 50
        }

        if (choice == 'stealth') {
            if (userStealth >= 100) {
                return message.util.send('Your stealth is already maxed out!')
            }
            skillPoints = skillPoints - number
            userStealth = userStealth + number
        }
        if (choice == 'critical') {
            skillPoints = skillPoints - number
            userCritical = userCritical + (number * 2)
        }

        upgrade[message.author.id] = {
            skillPoints: skillPoints,
            curHp: curHp,
            health: userHealth,
            attack: userAttack,
            storage: storage,
            storageSpace: userStorage,
            stealth: userStealth,
            critical: userCritical,
        }

        fs.writeFile('data/upgradeData.json', JSON.stringify(upgrade), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        return await message.util.send(`You upgraded ${choice} by ${number}!`)
    }
}

module.exports = UpgradeCommand;