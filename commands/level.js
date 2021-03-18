const fs = require('fs');
const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const xp = require('../data/xpData.json');
const respect = require('../data/respectData.json');
class LevelCommand extends Command {
    constructor() {
        super('level', {
            aliases: ['level', 'rank'],
            category: 'economy',
            description: 'Get your level xp',
            channel: 'guild',
            args: [
                {
                    id: 'user',
                    type: 'user'
                }
            ]
        })
    };
    
    async exec(message, args) {
        let member = args.user || message.author;
        if (!xp[member.id]) {
            xp[member.id] = {
                xp: 0,
                level: 1,
            }
        }
        if (!respect[member.id]) {
            respect[member.id] = {
                respect: 0,
                respectLevel: 1
            }
        }

        // Sorts the xp list by amount of xp

        let ranks = Object.entries(xp).sort((a,b) => { return(Object.entries(a[1])[1] - Object.entries(b[1])[1]) });
        
        let curXp = xp[member.id].xp;
        let level = xp[member.id].level;
        let respectXp = respect[member.id].respect;
        let respectLevel = respect[member.id].respectLevel;
        let rank = ranks.indexOf([member.id, curXp]);
        let reqXp = level * 1000 * 2;
        let reqRespect = respectLevel * 100
        let embed = new Discord.MessageEmbed()
            .setDescription(`<@${member.id}> level progress`)
            .addField('Level', `\`\`\`glsl\n${level}\`\`\``, true)
            .addField('XP', `\`\`\`glsl\n${curXp}|${reqXp}\`\`\``, true)
            .addField('Next level', `\`\`\`glsl\n${level + 1}\`\`\``, true)
            .addField('Respect level', `\`\`\`glsl\n${respectLevel}\`\`\``, true)
            .addField('Respect', `\`\`\`glsl\n${respectXp}|${reqRespect}\`\`\``, true)
            .addField('Next respect level', `\`\`\`glsl\n${respectLevel + 1}\`\`\``, true)
            .setFooter(`You are number ${rank} in the world! ${reqXp - curXp} XP til next level`, member.displayAvatarURL({ dynamic: true }))
            .setColor(0xaa00cc);
        message.util.send(embed)
        fs.writeFile('data/xpData.json', JSON.stringify(xp), (err) => {
            if (err) console.log(err)
        });
        fs.writeFile('data/respectData.json', JSON.stringify(respect), (err) => {
            if (err) console.log(err)
        });
    }
};  

module.exports = LevelCommand;