const Discord = require("discord.js");
const { Command } = require('discord-akairo');

class LinkCommand extends Command {
	constructor() {
		super('link', {
			aliases: ['link', 'l'],
			category: 'support',
			description: 'Get a link to the official DummiBot Support server.',
			ownerOnly: false,
			channel: ['guild', 'dm']
		})
	}

	async exec(message, args) {
        let embed = new Discord.MessageEmbed()
			.setTitle('Support server link:')
			.setDescription('[DummiBot support server](https://discord.gg/ET4yckcD78)')
			.setColor(0xaa00cc)
		await message.util.send(embed);
    }
};

module.exports = LinkCommand;