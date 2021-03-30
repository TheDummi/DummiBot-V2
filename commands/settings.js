const { Command } = require('discord-akairo');
const Discord = require("discord.js");
const data = require('../data/serverData.json');
const serverData = require('../data/channelData.json');
const { capitalize } = require('../funcs.js');
const fs = require('fs');
class SettingsCommand extends Command {
    constructor() {
        super('settings', {
            aliases: ['settings', 'options'],
            category: 'info',
            description: 'Get current server settings for DummiBot',
            ownerOnly: false,
            channel: 'guild',
            args: [
                {
                    id: 'guild',
                    type: 'guild'
                }
            ]
        })
    }

    async exec(message, args) {
        let server = args.guild || message.guild;
        if (!data[server.id]) {
            data[server.id] = {
                reactions: false
            }
        }
        if (!serverData[server.id]) {
            serverData[server.id] = {
                level: null,
                report: null,
                warn: null,
                moderation: null,
                welcome: null,
                leave: null,
                suggestions: null,
            }
        }
        let level = serverData[server.id].level;
        let report = serverData[server.id].report;
        let warn = serverData[server.id].warn;
        let moderation = serverData[server.id].moderation;
        let welcome = serverData[server.id].welcome;
        let leave = serverData[server.id].leave;
        let suggestions = serverData[server.id]
        let reactions = data[server.id].reactions;
        let permissions = [];
		for (var i = 0; i < server.me.permissions.toArray().length; i++) {
			permissions.push(capitalize(server.me.permissions.toArray()[i].replace(/_/g, " ")));
		}
        let embed = new Discord.MessageEmbed()
        .setColor(0xaa00cc)    
        .setTitle(`Bot settings for ${server.name}`)
        .setThumbnail(server.iconURL({ dynamic: true }))
        .addField('| Random reactions', reactions ? 'Enabled' : 'Disabled', true ) 
        .addField('| Bot nickname', server.me.nickname || "DummiBot", true)
        .addField(`| Date bot joined`, message.member.joinedAt.toDateString(), true)
        .addField(`| Level channel`, level ? `<#${level}>` : 'Disabled', true)
        .addField(`| Report channel`, report ? `<#${report}>` : 'Disabled', true)
        .addField(`| Warn channel`, warn ? `<#${warn}>` : 'Disabled', true)
        .addField(`| Moderation channel`, moderation ? `<#${moderation}>` : 'Disabled', true)
        .addField(`| Welcome channel`, welcome ? `<#${welcome}>` : 'Disabled', true)
        .addField(`| Leave channel`, leave ? `<#${leave}>` : 'Disabled', true)
        .addField(`| Suggestions channel`, leave ? `<#${leave}>` : 'Disabled', true)
        .setFooter(`This message will get deleted in 2 minutes.`)
        await message.channel.send(embed)
        .then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
        fs.writeFile('data/channelData.json', JSON.stringify(serverData), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        })
        fs.writeFile('data/userData.json', JSON.stringify(data), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        })
    }
};

module.exports = SettingsCommand;