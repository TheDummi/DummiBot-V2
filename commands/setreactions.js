const fs = require("fs");
const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const data = require('../data/serverData.json');

class ReactionsCommand extends Command {
    constructor() {
        super('reactions', {
            aliases: ['setreactions', 'sr'],
            category: 'admin',
            description: 'set random reactions on or off',
            channel: 'guild',
            args: [
                {
                    id: 'choice',
                    type: ['on', 'off'],
                    userPermissions: 'MANAGE_GUILD',
                    match: 'rest'
                }
            ]
        })
    }

    async exec(message, args) {
        let embed = new Discord.MessageEmbed()
            .setColor(0xaa00cc)
            if (!data[message.guild.id]) {
				data[message.guild.id] = {
					reactions: false,
					prefix: data[message.guild.id].prefix,
				}
			}
        if (args.choice == 'on') {
            data[message.guild.id] = {
                reactions: true,
				prefix: data[message.guild.id].prefix
            }
            embed = embed.setDescription(`Random reactions enabled.`)
        }
        if (args.choice == 'off') {
            data[message.guild.id] = {
                reactions: false,
				prefix: data[message.guild.id].prefix
            }
            embed = embed.setDescription(`Random reactions disabled.`)
        }
        fs.writeFile('data/serverData.json', JSON.stringify(data), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        })
        return await message.channel.send(embed)
    }
};

module.exports = ReactionsCommand;