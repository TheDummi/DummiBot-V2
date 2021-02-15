const {randColor} = require("../funcs.js")
const randomImages = [
    'https://media.tenor.com/images/0c9113f85ba4a58c4d10ecf444cae6bb/tenor.gif',
    'https://media.tenor.com/images/94664693a59fced0a8eebbe7a176753c/tenor.gif',
    'https://media.tenor.com/images/b23637ddd52fd137f81be9296444975b/tenor.gif',
    'https://media.tenor.com/images/bc1ba42c8180b34e114c3e25b61796e8/tenor.gif'

]
const { Command } = require('discord-akairo');
const Discord = require("discord.js");

class PunchCommand extends Command {
	constructor() {
		super('punch', {
			aliases: ['punch', 'hit'],
			category: 'actions',
			description: 'Hit Someone',
			ownerOnly: false,
			channel: 'guild'
		})
	}

async exec(message, args) {
args[0] = message.mentions.users.first()
let NoneEmbed = new Discord.MessageEmbed()
		.setTitle('You need to specify a user')
		.setColor(0xaa00cc);
let SelfEmbed = new Discord.MessageEmbed()
		.setTitle('Don\'t punch yourself... It hurts.')
		.setColor(0xaa00cc);
let BotEmbed = new Discord.MessageEmbed()
		.setTitle('You can\'t punch me, as I\'m a bot')
		.setColor(0xaa00cc);
		const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
		let embed = new Discord.MessageEmbed()
		.setDescription(`**<@${message.author.id}> punches ${args[0]}!!**`)
		.setImage(randomImage)
		.setColor(randColor());
// If you mention no one.
	if (args[0] === undefined) {
			return message.util.send(NoneEmbed)
		.then(message => {
			setTimeout(function() {
				message.delete(NoneEmbed)
			}, 5000);
		})
	}
// If you mention yourself.
	if (args[0].id === message.author.id) {
			return message.util.send(SelfEmbed)
		.then(message => {
			setTimeout(function() {
				message.delete(SelfEmbed)
			}, 5000);
		})
	}
// If you mention the bot.
	if (args[0].id === message.client.user.id) {
			return message.util.send(BotEmbed)
		.then(message => {
			setTimeout(function() {
				message.delete(BotEmbed)
			}, 5000);
		})
	}
	else {
		await message.util.send(embed)
	}
}
};

module.exports = PunchCommand;