const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const getPrefix = require('../funcs.js')
class HelpCommand extends Command {
	constructor() {
		super('help', {
			aliases: ['help', 'h'],
			category: 'info',
			description: 'Get a help message.',
			ownerOnly: false,
			channel: ['guild', 'dm']
		});
	}

	async exec(message) {
		let embed = new Discord.MessageEmbed()
			.setTitle('Help menu:')
			.setColor(0xaa00cc)
			.setDescription(`\n**Prefix**\n@DummiBot#2349 to get server prefix.\n\n**Commands**\n${getPrefix || "~"}commands for a paginating commands list.\n\n**Setup**\n~setup for a setup guide of the bot.\n\n**Need any help or have suggestions?**\nJoin the support server for help [here](https://discord.gg/AJxtuxg)`);
		await message.util.send(embed)
		.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
    }
};

module.exports = HelpCommand;