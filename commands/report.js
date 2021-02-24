const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const reportChannel = require('../serverData.json');
let purple = 0xaa00cc;

class ReportCommand extends Command {
    constructor() {
        super('report', {
            aliases: ['report'],
            category: 'moderation',
            description: 'Report a user',
            cooldown: 3600000,
            ratelimit: 3,
            ownerOnly: false,
			channel: 'guild',
			args: [
                {
                id: 'user',
                type: 'user',
                prompt: {
                    start: 'Who would you like to report?',
                    retry: 'Invalid user. Who would you like to report?',
                    ended: 'Too many retries!',
                    limit: 3,
                    cancel: 'Cancelled the report.'
                },
            },
            {
                id: 'message',
                type: 'string',
                match: 'rest',
                prompt: {
                    start: `What's the reason of this report?` 
                },
            }
            ]
        })
    }

    async exec(message, args) {
        if (args.user.id == message.author.id) {
            let SelfEmbed = new Discord.MessageEmbed()
            .setColor(purple)
            .setDescription(`<@${message.author.id}, you can't report yourself!`);
            return await message.util.send(SelfEmbed)
        }
        if (args.user.id == this.client.user.id) {
            let ClientEmbed = new Discord.MessageEmbed()
            .setColor(purple)
            .setDescription(`<@${message.author.id}, you can't report me!`);
            return await message.util.send(ClientEmbed)
        }
        if (args.user.bot) {
            let BotEmbed = new Discord.MessageEmbed()
            .setColor(purple)
            .setDescription(`<@${message.author.id}>, you can't report bots!`)
            return await message.util.send(BotEmbed)
        }
        else {
        let reason = args.message
        let reporterEmbed = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}>, you reported <@${args.user.id}> for ${reason}`)
        .setColor(purple);
        
        let reportEmbed = new Discord.MessageEmbed()
        .setTitle('New report!')
        .addField(`Reported user`, `<@${args.user.id}>`)
        .addField(`Reported by`, `<@${message.author.id}>`)
        .addField(`Reason`, `${reason}`)
        .addField(`channel`, `<#${message.channel.id}>`)
        .setTimestamp()
        .setColor(0xaa00cc);
            try {
                let channel = reportChannel[message.guild.id].report;
                channel = this.client.channels.cache.get(channel)
                channel.send(reportEmbed);
                message.util.send(reporterEmbed)
            .then(message => {
                setTimeout(function() {
				    message.delete(reporterEmbed)
			    }, 30000);
            });
            }
            catch {
            message.channel.send('This server does not have a report channel set up yet.')
            }
        }
    }
};
module.exports = ReportCommand;