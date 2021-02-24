const {randColor} = require("../funcs.js")
const { Command } = require('discord-akairo');
const randomImages = [
    'https://media.tenor.com/images/2fcbb381572bcbc9fa3009b7f5c00a01/tenor.gif',
    'https://media.tenor.com/images/9a018d658fb18e8be2a9c7a2e21259d4/tenor.gif',
    'https://media.tenor.com/images/8e8f51d09d5e2ce2d2226efea8986a93/tenor.gif',
    'https://media.tenor.com/images/199170515a989a6d2a2077d72266e48f/tenor.gif'
];
const randomImage = () => randomImages[Math.floor(Math.random() * randomImages.length)];
const Discord = require("discord.js")
class BlushCommand extends Command {
	constructor() {
		super('blush', {
			aliases: ['blush'],
			category: 'emotion',
			description: 'Blush for no reason',
			ownerOnly: false,
			channel: ['guild', 'dm'],
			args: [
				{
					id: 'user',
					type: 'user'
				}
			]
		});
	}

	async exec(message, args) {

// Definitions
		let member = args.user;
		let user = message.author;
		let client = this.client.user;
		let purple = 0xaa00cc;


// If there is no mentioned user
		if (member == undefined) {
			let noEmbed = new Discord.MessageEmbed()
				.setAuthor(`${user.username} blushes...`, user.displayAvatarURL())
				.setImage(randomImage())
				.setColor(randColor())
			return await message.util.send(noEmbed);
		}

// If the mentioned user is the bot
		if (member.id == client.id) {
			let clientEmbed = new Discord.MessageEmbed()
				.setAuthor(`${user.username}, why at me?`, user.displayAvatarURL())
				.setColor(purple)
			return await message.util.send(clientEmbed)
		}

// If the mentioned user is the message author
		if (member.id == user.id) {
			let userEmbed = new Discord.MessageEmbed()
				.setAuthor(`${user.username}, self appreciation is very important!`, user.displayAvatarURL())
				.setColor(purple)
			return await message.util.send(userEmbed)
		}

// In all other cases
		else {
			let yesEmbed = new Discord.MessageEmbed()
				.setAuthor(`${user.username} blushes at ${member.username}!`, user.displayAvatarURL())
				.setImage(randomImage())
				.setColor(randColor())
			return await message.util.send(yesEmbed)
		}
	}
};

module.exports = BlushCommand;
