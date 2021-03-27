const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs');
let settings = require('../data/settings.json')

class SetCommand extends Command {
    constructor() {
        super('set', {
            aliases: ['set',],
            category: 'bot maker',
            description: 'Set stuff',
            ownerOnly: true,
            args: [
                {
                    id: 'choice',
                    type: ['xp', 'coins'],
                    prompt: {
                        start: 'What would you like to change?'
                    }
                },
                {
                    id: 'number',
                    type: 'number',
                    prompt: {
                        start: 'How much?'
                    }
                }
            ]
        })
    }

    async exec(message, args) {
        let owner = this.client.users.cache.get('482513687417061376')
        if (!settings) {
            settings = {
                xp: 15,
                coins: 11
            }
        }
        if (args.choice == 'xp') {
            settings = {
                xp: args.number,
                coins: settings.coins
            }
            message.util.send(`Set xp earn to ${args.number}!`)
            owner.send(`${message.author.username} set xp earn to ${args.number}`)
        }
        if (args.choice == 'coins') {
            settings = {
                xp: settings.xp,
                coins: args.number
            }
            message.util.send(`Set coins earn to ${args.number}!`)
            owner.send(`${message.author.username} set coins earn to ${args.number}`)
        }

        fs.writeFile('data/settings.json', JSON.stringify(settings), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        })
    }
}

module.exports = SetCommand;