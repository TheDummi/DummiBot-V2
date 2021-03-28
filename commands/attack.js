const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const upgrade = require('../data/upgradeData.json');
const fs = require('fs');
const xp = require('../data/xpData.json');
const shield = new Set()
class AttackCommand extends Command {
    constructor() {
        super('attack', {
            aliases: ['attack'],
            category: 'action',
            description: 'Attack someone to damage them, kill them to finish it off.',
            args: [
                {
                    id: 'user',
                    type: 'user',
                    prompt: {
                        start: 'What would you like to upgrade?\n`health`\n`storage`\n`attack`\n`stealth`\n`critical`'
                    }
                }
            ]
        })
    }

    async exec(message, args) {
        if (upgrade[message.author.id].curHp <= 0) {
            return await message.util.send('You are dead, use a revive to revive yourself!')
        }
        if (!upgrade[args.user.id]) {
            upgrade[args.user.id] = {
                skillPoints: 1,
                curHp: 100,
                health: 100,
                attack: 10,
                storage: 0,
                storageSpace: 400,
                stealth: 1,
                critical: 2,
            }
        }
        if (shield.has(args.user.id)) {
            return await message.util.send(`${args.user} is currently immune`)
        }
        else {
            let userAttack = upgrade[message.author.id].attack;
            let userCritical = upgrade[message.author.id].critical;
            let user = args.user.id;
            let skillPoints = upgrade[user].skillPoints;
            let curHp = upgrade[user].curHp;
            let health = upgrade[user].health;
            let attack = upgrade[user].attack;
            let storage = upgrade[user].storage;
            let storageMax = upgrade[user].storageSpace;
            let stealth = upgrade[user].stealth;
            let critical = upgrade[user].critical;
            if (curHp <= 0) {
                return await message.util.send(`${args.user} is already dead!`)
            }
            if ((userAttack + userCritical)>= curHp) {
                return await message.util.send(`You need to finish ${args.user} by killing them.`)
            }
            else {
                curHp = curHp - (userAttack + userCritical);
                await message.util.send(`You dealt ${userAttack + userCritical}⚔️ to ${args.user} leaving them with ${curHp}❤️!`)
            }
            upgrade[args.user.id] = {
                skillPoints: skillPoints,
                curHp: curHp,
                health: health,
                attack: attack,
                storage: storage,
                storageSpace: storageMax,
                stealth: stealth,
                critical: critical,
            }
    
            fs.writeFile('data/upgradeData.json', JSON.stringify(upgrade), (err) => {
                let errEmbed = new Discord.MessageEmbed()
                    .setTitle('JSON OVERLOAD')
                    .setColor(0xaa00cc)
                    .setDescription(`\`\`\`json\n${err}\`\`\``)
                if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
            });
            shield.add(args.user.id) 
            setTimeout(() => {
                shield.delete(args.user.id)
            }, 60000)
        }
    }
};

module.exports = AttackCommand;
