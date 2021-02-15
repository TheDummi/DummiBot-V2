const { Command } = require('discord-akairo');
const Discord = require('discord-akairo');
const fs = require('fs');
const warns = require('../warning.json');
class WarnCommand extends Command {
    constructor() {
        super('warn', {
            aliases: ['warn'],
            category: 'moderation',
            description: 'Warn a user.',
            channel: 'guild',
            userPermissions: 'KICK_MEMBERS',
            args: [
                    {
                    id: 'user',
                    type: 'user',
                    prompt: {
                        start: 'Who would you like to warn?',
                        retry: 'Invalid user. Who would you like to warn?'
                    }
                },
                {
                    id: 'message',
                    type: 'message',
                    prompt: {
                        start: "what's the reason of this warning?"
                    }
                }
            ]
        })
    }

    async exec(message) {
        let reason = args.message;
        if (![message.guild.id].warns[args.user.id]) {
            [message.guild.id].warns[args.user.id] = {
                warns: 0
            }
        }
        
        let warn = [message.guild.id].warns[args.user.id].warns
        [message.guild.id].warns[args.user.id] = {
            warns: warn++
        }
        await message.util.send(`Warned <@${args.user.id}> for the ${warn++} time! With reason: ${reason}`)
        await message.args.user.send(`You got warned in ${message.guild.name} for ${reason} ${warn++}!`)
        fs.writeFile("warning.json", JSON.stringify(warns), (err) => {
            if(err) console.log(err)
        })
    }
};

module.exports = WarnCommand;