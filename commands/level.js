const fs = require('fs')
const Discord = require('discord.js')
const { Command } = require('discord-akairo')
const xp = require('../xp.json');
class LevelCommand extends Command {
    constructor() {
        super('level', {
            aliases: ['level', 'rank'],
            category: 'info',
            description: 'Get your level xp',
            channel: 'guild'
        })
    };
    
    async exec(message) {
        /*let data = fs.readFileSync("xp.json", "utf8");
        let json = JSON.parse(data);*/
        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0,
                level: 1
            }
        };
        let curXp = xp[message.author.id].xp;
        let level = xp[message.author.id].level;
        let reqXp = level * 1000 * 2;
        let embed = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}> level progress`)
        .setThumbnail(message.author.displayAvatarURL())
        .addField('level', `\`\`\`glsl\n${level}\`\`\``, true)
        .addField('XP', `\`\`\`glsl\n${curXp}/${reqXp}\`\`\``, true)
        .addField('Next level', `\`\`\`glsl\n${level + 1}\`\`\``, true)
        .setFooter(`${reqXp - curXp} XP til next level`, message.author.displayAvatarURL)
        .setColor(0xaa00cc);
        message.util.send(embed)
    }
    
};  

module.exports = LevelCommand;