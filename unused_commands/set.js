const Discord = require('discord.js')
const { Command } = require('discord-akairo')
const { fs } = require('fs')
const channelID = require('../data.json')

class SetChannelCommand extends Command {
    constructor() {
        super('setchannel', {
            aliases: ['setchannel'],
            category: 'admin',
            description: 'Change server level up channel',
            ownerOnly: false,
			channel: 'guild',
			userPermissions: 'MANAGE_GUILD',
            args: [{
                id: 'option',
                type: [
                    ['level'],
                    ['report']
                ],
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
            }]
        })
    }

    async exec(message, args) {
        if (args == undefined) {
            return await message.channel.send('Please mention a channel')
        }
        if (args.option == 'level') {
            if (!channelID[message.guild.id]) 
                channelID[message.guild.id] = {
                    channelID: args.channel
            }
            fs.writeFile("data.json", JSON.stringify(channelID))
            message.util.send('Channel set!')
            }
        else {
            
        fs.writeFile("data.json", JSON.stringify(levelchannels))
        message.util.send('Channel set!')
        }
        if (args.option == 'report') {
            // WIP
            }
        
    }
};

module.exports = SetChannelCommand;