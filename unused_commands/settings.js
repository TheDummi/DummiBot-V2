const { Command } = require('discord-akairo');
const getReactions = require("../funcs.js").getReactions;
const getPrefix = require("../funcs.js").getPrefix;
const getModRoles = require("../data.json").modRoles;
const getAdminRoles = require("../data.json").adminRoles;
function capitalize(name) {
    name = name.toLowerCase();
    return name.charAt(0).toUpperCase() + name.slice(1)
};
const Discord = require("discord.js");

class SettingsCommand extends Command {
    constructor() {
        super('settings', {
            aliases: ['settings', 'options'],
            category: 'info',
            description: 'Get current server settings for DummiBot',
            ownerOnly: false,
            channel: 'guild'
        })
    }

    async exec(message) {
        let bots = 0;
        for (var i = 0; i < message.guild.members.cache.array().length; i++) {
            if (message.guild.members.cache.array()[i].user.bot) bots++
        }
        let permissions = [];
		for (var i = 0; i < message.guild.me.permissions.toArray().length; i++) {
			permissions.push(capitalize(message.guild.me.permissions.toArray()[i].replace(/_/g, " ")));
		}
        let embed = new Discord.MessageEmbed()
        .setColor(0xaa00cc)    
        .setTitle('Bot settings')
        .setThumbnail(message.guild.iconURL())
        .addField('| Server name', message.guild.name, true)
        .addField('| This server\'s prefix', `\`${getPrefix(message)}\``, true)
        .addField('| Random reactions', getReactions(message) ? 'Enabled' : 'Disabled', true ) 
        //.addField('| Moderation role(s)', getModRoles.join('\n') || 'No moderator roles set', true)
        //.addField('| Administrator role(s)', getAdminRoles.join('\n') || 'No Administrator roles set', true )
        .addField('| Bot nickname', message.guild.me.nickname || "DummiBot", true)
        .addField(`| Date bot joined`, message.member.joinedAt.toDateString(), true)
        .addField('| Bot permissions', permissions.join(", "))
        await message.channel.send(embed)
        .then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
    }
};

module.exports = SettingsCommand;