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
			channel: 'guild',
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: 'Who would you like to punch?',
						retry: 'Invalid user, Who would you like to punch?',
						limit: 3,
						ended: 'Too many retries.',
						cancel: 'Cancelled the command',
						timeout: 'Out of time.'
					}
				}
			]
		})
	}

async exec(message, args) {
let member = args.member;
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
		.setDescription(`**<@${message.author.id}> punches ${member}!!**`)
		.setImage(randomImage)
		.setColor(randColor());
// If you mention no one.
	if (member === undefined) {
			return message.util.send(NoneEmbed)
		.then(message => {
			setTimeout(function() {
				message.delete(NoneEmbed)
			}, 5000);
		})
	}
// If you mention yourself.
	if (member.id === message.author.id) {
			return message.util.send(SelfEmbed)
		.then(message => {
			setTimeout(function() {
				message.delete(SelfEmbed)
			}, 5000);
		})
	}
// If you mention the bot.
	if (member.id === message.client.user.id) {
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