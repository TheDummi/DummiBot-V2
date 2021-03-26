const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs');
const channels = require('../data/channelData.json');


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
                    type: ['level','report', 'warn', 'moderation', 'welcome', 'leave', 'suggestions'],
                    prompt: {
                        start: 'What would you like to set?\n`level`\n`report`\n`warn`\n`moderation`\n`welcome`\n`leave`\n`suggestions`',
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
                    welcome: null,
                    leave: null,
                    suggestions: null,
            }
        let level = channels[message.guild.id].level;
        let report = channels[message.guild.id].report;
        let warn = channels[message.guild.id].warn;
        let moderation = channels[message.guild.id].moderation;
        let welcome = channels[message.guild.id].welcome;
        let leave = channels[message.guild.id].leave;
        let suggestions = channels[message.guild.id].suggestions;
        if (option == 'level') {
            channels[message.guild.id] = {
                level: channel,
                report: report,
                warn: warn,
                moderation: moderation,
                welcome: welcome,
                leave: leave,
                suggestions: suggestions,
            }
        }
        if (option == 'report') {
                channels[message.guild.id] = {
                level: level,
                report: channel,
                warn: warn,
                moderation: moderation,
                welcome: welcome,
                leave: leave,
                suggestions: suggestions,
            }
        }
        if (option == 'warn') {
                channels[message.guild.id] = {
                level: level,
                report: report,
                warn: channel,
                moderation: moderation,
                welcome: welcome,
                leave: leave,
                suggestions: suggestions,
            }
        }
        if (option == 'moderation') {
                channels[message.guild.id] = {
                level: level,
                report: report,
                warn: warn,
                moderation: channel,
                welcome: welcome,
                leave: leave,
                suggestions: suggestions,
            }
        }
        if (option == 'welcome') {
            channels[message.guild.id] = {
                level: level,
                report: report,
                warn: warn,
                moderation: moderation,
                welcome: channel,
                leave: leave,
                suggestions: suggestions,
            }
        }
        if (option == 'leave') {
            channels[message.guild.id] = {
                level: level,
                report: report,
                warn: warn,
                moderation: moderation,
                welcome: welcome,
                leave: channel,
                suggestions: suggestions,
            }
        }
        if (option == 'suggestions') {
            channels[message.guild.id] = {
                level: level,
                report: report,
                warn: warn,
                moderation: moderation,
                welcome: welcome,
                leave: leave,
                suggestions: channel,
            }
        }
            fs.writeFile("data/channelData.json", JSON.stringify(channels), (err) => {
                let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
            })
        channel = this.client.channels.cache.get(channel)
        return await message.util.send(`Set ${channel}, as ${option} channel!`);
    }
};

module.exports = SetChannelCommand;