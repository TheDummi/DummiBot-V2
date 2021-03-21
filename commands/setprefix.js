const Discord = require("discord.js")
const { Command } = require('discord-akairo');
const fs = require("fs");
const data = require('../data/serverData.json');

class SetPrefixCommand extends Command {
    constructor() {
        super('setprefix', {
            aliases: ['setprefix', 'prefix'],
            category: 'admin',
            description: 'Change server prefix',
            ownerOnly: false,
			channel: 'guild',
			userPermissions: 'MANAGE_GUILD',
			args: [
					{
					id: 'prefix',
					type: 'string',
					match: 'rest',
					prompt: {
						start: 'What would you like to be the new prefix?',
						retry: 'failed',
						ended: 'ended'
					}
				}
			]	
        });
    }

	async exec(message, args) {
		if (args.prefix) {
			if (!data[message.guild.id]) {
				data[message.guild.id] = {
					reactions: data[message.guild.id].reactions,
					prefix: null,
				}
			}
			data[message.guild.id] = {
				reactions: data[message.guild.id].reactions,
				prefix: args.prefix
			}
			fs.writeFileSync("data/serverData.json", JSON.stringify(data))
			let embed = new Discord.MessageEmbed()
			.setDescription(`**Set the prefix for this server to \`${args.prefix}\`**`)
			.setColor(0xaa00cc)
			await message.reply(embed)
		}
		else {
			let data = fs.readFileSync("data/serverData.json")
			let json = JSON.parse(data)
			delete json.prefixes[message.guild.id]
			fs.writeFileSync("data/serverData.json", JSON.stringify(json))
			let embed1 = new Discord.MessageEmbed()
			.setDescription(`**Changed the prefix for this server to the default! (\`~\`)**`)
			.setColor(0xaa00cc)
			await message.reply(embed1)
		}
	}
}

module.exports = SetPrefixCommand;