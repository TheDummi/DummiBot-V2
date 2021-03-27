const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const upgrade = require('../data/upgradeData.json');
const fs = require('fs');
const xp = require('../data/xpData.json');
const space = require('../data/storageData.json');
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
        if (!space[user.id]) {
            space[user.id] = {
                cheese: 0,
                bandages: 0,
                revives: 0,
                rifle: 0
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
        let rifle = space[user.id].rifle

        let embed = new Discord.MessageEmbed()
            .setAuthor(`${user.username}'s profile`, user.displayAvatarURL({ dynamic: true }))
            .addField('Skill points', `⏫ ${userSkillPoints}`)
            .addField('Health', `❤️ ${curHp}/${userHealth}`)
            .addField('Attack', `⚔️ ${userAttack}`)
            .addField('Storage', `[📦 ${storage}/${userStorage}](https://www.youtube.com/watch?v=oHg5SJYRHA0&ab_channel=cotter548)`)
            .addField('Stealth', `:ninja: ${userStealth}`)
            .addField('Critical chance', `💥 ${userCritical}`)
            .addField('Hunting rifle', `🔫 ${rifle ? "Owned" : "Not owned"}`)
            .setColor(0xaa00cc)
        await message.util.send(embed)
        fs.writeFile('data/upgradeData.json', JSON.stringify(upgrade), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
    }
}

module.exports = ProfileCommand;