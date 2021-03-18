const {randColor} = require("../funcs.js")
const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const randomImages = [
    'https://media1.tenor.com/images/675daa5c96e23bb7e2b5b06ef804cb81/tenor.gif?itemid=15881815',
    'https://media.tenor.com/images/e6d446c26a3685f0c748cfdb634e5b1a/tenor.gif',
    'https://media.tenor.com/images/04db8316e7f739bdb6edb90f93eb0ea0/tenor.gif',
    'https://media1.tenor.com/images/a846f5900be6196031711066e832ea11/tenor.gif?itemid=14580378'

]
const randomImage = () => randomImages[Math.floor(Math.random() * randomImages.length)];

class CryCommand extends Command {
	constructor() {
		super('cry', {
			aliases: ['cry', 'sad', 'sob'],
			category: 'emotion',
			description: 'Cry.',
			ownerOnly: false,
			channel: ['guild', 'dm'],
			args: [
				{
					id: 'member',
					type: 'member'
				}
			]
		})
	}
async exec(message, args) {
	let member = args.user;
	let user = message.author;
	let client = this.client.user;
	let purple = 0xaa00cc;


	// If there is no mentioned user
		if (member == undefined) {
			let noEmbed = new Discord.MessageEmbed()
				.setAuthor(`${user.username} cries...`, user.displayAvatarURL({ dynamic: true }))
				.setImage(randomImage())
				.setColor(randColor())
			return await message.util.send(noEmbed);
		}

	// If the mentioned user is the bot
		if (member.id == client.id) {
			let clientEmbed = new Discord.MessageEmbed()
				.setAuthor(`${user.username}, why because of me?`, user.displayAvatarURL({ dynamic: true }))
				.setColor(purple)
			return await message.util.send(clientEmbed)
		}

	// If the mentioned user is the message author
		if (member.id == user.id) {
			let userEmbed = new Discord.MessageEmbed()
				.setAuthor(`${user.username}, self appreciation is very important!`, user.displayAvatarURL({ dynamic: true }))
				.setColor(purple)
			return await message.util.send(userEmbed)
		}

	// In all other cases
		else {
			let yesEmbed = new Discord.MessageEmbed()
				.setAuthor(`${user.username} cries because of ${member.username}!`, user.displayAvatarURL({ dynamic: true }))
				.setImage(randomImage())
				.setColor(randColor())
			return await message.util.send(yesEmbed)
		}
	}
};
module.exports = CryCommand;