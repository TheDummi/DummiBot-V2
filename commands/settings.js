const { Command } = require('discord-akairo');
const Discord = require("discord.js");
const data = require('../data/serverData.json');
const serverData = require('../data/channelData.json');
const { capitalize } = require('../funcs.js');

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
        if (!data[message.guild.id]) {
            data[message.guild.id] = {
                reactions: false
            }
        }
        if (!serverData[message.guild.id]) 
                serverData[message.guild.id] = {
                    level: null,
                    report: null,
                    warn: null,
                    moderation: null,
                    welcome: null,
                    leave: null,
            }
        let level = serverData[message.guild.id].level;
        let report = serverData[message.guild.id].report;
        let warn = serverData[message.guild.id].warn;
        let moderation = serverData[message.guild.id].moderation;
        let welcome = serverData[message.guild.id].welcome;
        let leave = serverData[message.guild.id].leave;
        let reactions = data[message.guild.id].reactions;
        let permissions = [];
		for (var i = 0; i < message.guild.me.permissions.toArray().length; i++) {
			permissions.push(capitalize(message.guild.me.permissions.toArray()[i].replace(/_/g, " ")));
		}
        let embed = new Discord.MessageEmbed()
        .setColor(0xaa00cc)    
        .setTitle('Bot settings')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField('| Random reactions', reactions ? 'Enabled' : 'Disabled', true ) 
        .addField('| Bot nickname', message.guild.me.nickname || "DummiBot", true)
        .addField(`| Date bot joined`, message.member.joinedAt.toDateString(), true)
        .addField(`| level channel`, level ? `<#${level}>` : 'Disabled', true)
        .addField(`| report channel`, report ? `<#${report}>` : 'Disabled', true)
        .addField(`| warn channel`, warn ? `<#${warn}>` : 'Disabled', true)
        .addField(`| moderation channel`, moderation ? `<#${moderation}>` : 'Disabled', true)
        .addField(`| welcome channel`, welcome ? `<#${welcome}>` : 'Disabled', true)
        .addField(`| leave channel`, leave ? `<#${leave}>` : 'Disabled', true)
        await message.channel.send(embed)
        .then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
    }
};

module.exports = SettingsCommand;