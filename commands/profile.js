const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const upgrade = require('../data/upgradeData.json');
const fs = require('fs');
const xp = require('../data/xpData.json');
class ProfileCommand extends Command {
    constructor() {
        super('profile', {
            aliases: ['profile','p'],
            category: 'economy',
            description: 'Review your stats',
            args: [
                {
                    id: 'user',
                    type: 'user'
                }
            ]
        })
    }

    async exec(message, args) {
        let user = args.user || message.author

        if (!upgrade[user.id]) {
            upgrade[user.id] = {
                skillPoints: xp[user.id].level || 0,
                curHp: 100,
                health: 100,
                attack: 100,
                storageSpace: 400,
                stealth: 1,
                critical: 2,
            }
        }
        let userSkillPoints = upgrade[user.id].skillPoints;
        let userHealth = upgrade[user.id].health;
        let curHp = upgrade[user.id].curHp;
        let userAttack = upgrade[user.id].attack;
        let storage = upgrade[user.id].storage;
        let userStorage = upgrade[user.id].storageSpace;
        let userStealth = upgrade[user.id].stealth;
        let userCritical = upgrade[user.id].critical;

        let embed = new Discord.MessageEmbed()
            .setAuthor(`${user.username}'s profile`, user.displayAvatarURL({ dynamic: true }))
            .addField('Skill points', `⏫ ${userSkillPoints}`)
            .addField('Health', `❤️ ${curHp}/${userHealth}`)
            .addField('Attack', `⚔️ ${userAttack}`)
            .addField('Storage', `📦 ${storage}/${userStorage}`)
            .addField('Stealth', `:ninja: ${userStealth}`)
            .addField('Critical chance', `💥 ${userCritical}`)
            .setColor(0xaa00cc)
        await message.util.send(embed)
        fs.writeFile('data/upgradeData.json', JSON.stringify(upgrade), (err) => {
            if (err) console.log(err)
        });
    }
}

module.exports = ProfileCommand;