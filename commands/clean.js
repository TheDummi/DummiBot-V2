const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const channels = require('../serverData.json');
class CleanCommand extends Command {
	constructor() {
		super('clean', {
			aliases: ['clean', 'clear', 'cl'],
			category: 'moderation',
			description: 'Delete up to 50 messages in current channel',
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
		let embed1 = new Discord.MessageEmbed()
			.setTitle('There is a maximum of 100 messages.')
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
			await message.channel.bulkDelete(Number(args.message))
				let embed3 = new Discord.MessageEmbed()
					.setTitle(`${args.message} messages deleted`)
					.setColor(0xaa00cc)
				message.reply(embed3)
				.then(message => {
					setTimeout(function() {
						message.delete(embed3)
					}, 5000);
				})
			let channel = channels[message.guild.id].moderation;
			channel = this.client.channels.cache.get(channel);
			if (channel == undefined) return;
			else {
			let logEmbed = new Discord.MessageEmbed()
			.setTitle('Moderation command used!')
			.addField(`Name`, message.author, true)
			.addField(`Command`, "clean", true)
			.addField(`Channel`, `<#${message.channel.id}>`, true)
			.addField(`Command specifics`, `Cleaned ${args.message} messages in ${message.channel}.`)
			.setTimestamp()
			.setColor(0xaa00cc)
			channel.send(logEmbed)
			}
		}
		catch(e) {
			console.log(e)
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