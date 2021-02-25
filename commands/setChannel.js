const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs');
const channels = require('../serverData.json');


class SetChannelCommand extends Command {
    constructor() {
        super('setchannel', {
            aliases: ['setchannel'],
            category: 'admin',
            description: 'Change server level up channel',
            ownerOnly: false,
			channel: 'guild',
			userPermissions: 'MANAGE_GUILD',
            args: [
                {
                    id: 'option',
                    type: ['level','report', 'warn', 'moderation'],
                    prompt: {
                        start: 'What would you like to set?',
                        retry: 'not an option'
                    }
                },
                {
                    id: 'channel',
                    type: 'channel',
                    match: 'rest',
                    prompt: {
                        start: 'What channel would you like to use for it?',
                        retry: 'Invalid channel, try again.',
                        limit: 3,
                        ended: 'Too many retries',
                        timeout: 'Ran out of time',
                        cancel: 'cancelled the command'
                    }
                }
            ]
        })
    }

    async exec(message, args) {
        let channel = args.channel.id;
        let option = args.option;
        
        if (!channels[message.guild.id]) 
                channels[message.guild.id] = {
                    level: null,
                    report: null,
                    warn: null,
                    moderation: null,
            }
        let level = channels[message.guild.id].level;
        let report = channels[message.guild.id].report;
        let warn = channels[message.guild.id].warn;
        let moderation = channels[message.guild.id].moderation;
        if (option == 'level') {
            channels[message.guild.id] = {
                level: channel,
                report: report,
                warn: warn,
                moderation: moderation,
            }
        }
        if (option == 'report') {
                channels[message.guild.id] = {
                level: level,
                report: channel,
                warn: warn,
                moderation: moderation,
            }
        }
        if (option == 'warn') {
                channels[message.guild.id] = {
                    level: level,
                    report: report,
                    warn: channel,
                    moderation: moderation,
            }
        }
        if (option == 'moderation') {
                channels[message.guild.id] = {
                    level: level,
                    report: report,
                    warn: warn,
                    moderation: channel,
            }
        }
            fs.writeFile("serverData.json", JSON.stringify(channels), (err) => {
                if (err) console.log(err)
            })
            channel = this.client.channels.cache.get(channel)
            message.util.send(`Set ${channel}, as ${option} channel!`)
    }
};

module.exports = SetChannelCommand;