const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs');
const channels = require('../serverData.json');


class SetRoleCommand extends Command {
    constructor() {
        super('setrole', {
            aliases: ['setrole'],
            category: 'admin',
            description: 'Change server roles',
            ownerOnly: false,
			channel: 'guild',
			userPermissions: 'MANAGE_GUILD',
            args: [
                {
                    id: 'option',
                    type: ['mute', 'mod', 'admin', ],
                    prompt: {
                        start: 'What would you like to set?\n`mute`\n`mod`\n`admin`',
                        retry: 'not an option'
                    }
                },
                {
                    id: 'role',
                    type: 'role',
                    match: 'rest',
                    prompt: {
                        start: 'What role would you like to use for it?',
                        retry: 'Invalid role, try again.',
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
        let channel = args.role.id;
        let option = args.option;
        
        if (!channels[message.guild.id]) 
                channels[message.guild.id] = {
                    level: null,
                    report: null,
                    warn: null,
                    moderation: null,
                    welcome: null,
                    leave: null,
                    mute: null,
                    mod: null,
                    admin: null
            }
        let level = channels[message.guild.id].level;
        let report = channels[message.guild.id].report;
        let warn = channels[message.guild.id].warn;
        let moderation = channels[message.guild.id].moderation;
        let welcome = channels[message.guild.id].welcome;
        let leave = channels[message.guild.id].leave;
        let mute = channels[message.guild.id].mute;
        let mod = channels[message.guild.id].mod;
        let admin = channels[message.guild.id].admin;
        if (option == 'mod') {
            channels[message.guild.id] = {
                level: level,
                report: report,
                warn: warn,
                moderation: moderation,
                welcome: welcome,
                leave: leave,
                mute: channel,
                mod: mod,
                admin:admin
            }
        }
        if (option == 'mute') {
                channels[message.guild.id] = {
                level: level,
                report: report,
                warn: warn,
                moderation: moderation,
                welcome: welcome,
                leave: leave,
                mute: mute,
                mod: channel,
                admin: admin
            }
        }
        if (option == 'admin') {
                channels[message.guild.id] = {
                    level: level,
                    report: report,
                    warn: warn,
                    moderation: moderation,
                    welcome: welcome,
                    leave: leave,
                    mute: mute,
                    mod: mod,
                    admin: channel
            }
        }
            fs.writeFile("serverData.json", JSON.stringify(channels), (err) => {
                let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
            })
            channel = message.guild.roles.cache.get(channel)
            message.util.send(`Set ${channel}, as ${option} role!`)
    }
};

module.exports = SetRoleCommand;