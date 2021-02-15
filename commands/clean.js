const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class CleanCommand extends Command {
	constructor() {
		super('clean', {
			aliases: ['clean', 'clear', 'cl'],
			category: 'moderation',
			description: 'Clean all messages in current channel send by DummiBot.',
			ownerOnly: false,
			channel: 'guild',
			clientPermissions: ['MANAGE_MESSAGES'],
			userPermissions: ['MANAGE_MESSAGES'],
			args: [
				{
					id: 'message',
					type: 'number',
					prompt: {
						start: 'How many message do you want to delete?',
					}
				}
			]
		});
	}

	async exec(message, args) {
		let embed = new Discord.MessageEmbed()
			.setTitle('Please specify an amount from 0-50 to delete.')
			.setColor(0xaa00cc)
		if (!args.message) return message.reply(embed)
		.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 5000);
		})
		let embed1 = new Discord.MessageEmbed()
			.setTitle('There is a maximum of 50 messages.')
			.setColor(0xaa00cc)
		if (Number(args.message) > 100) return message.reply(embed1)
		.then(message => {
			setTimeout(function() {
				message.delete(embed1)
			}, 5000);
		})
		let embed2 = new Discord.MessageEmbed()
			.setTitle('You can\'t clear less than 0.')
			.setColor(0xaa00cc)
		if (Number(args.message) < 0) return message.reply(embed2)
		.then(message => {
			setTimeout(function() {
				message.delete(embed2)
			}, 5000);
		})
		try {
			await message.channel.bulkDelete(Number(args.message) + 1)
				let embed3 = new Discord.MessageEmbed()
					.setTitle(`${args.message} messages deleted`)
					.setColor(0xaa00cc)
				return message.reply(embed3)
				.then(message => {
					setTimeout(function() {
						message.delete(embed3)
					}, 5000);
				})
		}
		catch {
			let embed4 = new Discord.MessageEmbed()
				.setTitle('Error deleting, please make sure the messages are less than two weeks old.')
				.setColor(0xaa00cc)
			return message.reply(embed4)	
			.then(message => {
				setTimeout(function() {
					message.delete(embed4)
				}, 5000);
			})
		}
	}
};

module.exports = CleanCommand;