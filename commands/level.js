
const fs = require('fs')
const Discord = require('discord.js')
const { Command } = require('discord-akairo')
let xp = require('../xp.json');
class LevelCommand extends Command {
    constructor() {
        super('level', {
            aliases: ['level', 'rank'],
            category: 'level',
            description: 'Get your level xp',
            channel: 'guild'
        })
    };
    
    async exec(message) {
        /*let data = fs.readFileSync("xp.json", "utf8");
        let json = JSON.parse(data);*/
        let member = message.mentions.users.first() || message.author
        if (!xp[member.id]) {
            xp[member.id] = {
                    xp: 0,
                    level: 0,
                    respect: 0,
                    respectLevel: 1,
                    prestige: 0,
                
            }
        };
        let curXp = xp[member.id].xp;
        let level = xp[member.id].level;
        let respect = xp[member.id].respect;
        let respectLevel = xp[member.id].respectLevel;
        let rank = [xp].sort().reverse().indexOf(xp[message.author.id].xp);
        let reqXp = level * 1000 * 2;
        let reqRespect = respectLevel * 500
        let embed = new Discord.MessageEmbed()
        .setDescription(`<@${member.id}> level progress`)
        .addField('level', `\`\`\`glsl\n${level}\`\`\``, true)
        .addField('XP', `\`\`\`glsl\n${curXp}|${reqXp}\`\`\``, true)
        .addField('Next level', `\`\`\`glsl\n${level + 1}\`\`\``, true)
        .addField('Respect level', `\`\`\`glsl\n${respectLevel}\`\`\``, true)
        .addField('Respect', `\`\`\`glsl\n${respect}|${reqRespect}\`\`\``, true)
        .addField('Next respect level', `\`\`\`glsl\n${respectLevel + 1}\`\`\``, true)
        .setFooter(`You are number ${rank} in the world! ${reqXp - curXp} XP til next level`, member.displayAvatarURL({ dynamic: true }))
        .setColor(0xaa00cc);
        message.util.send(embed)
    }
};  

module.exports = LevelCommand;