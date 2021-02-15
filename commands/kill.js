const {randColor} = require("../funcs.js")
const { Command } = require('discord-akairo')
const randomShot = [
	'https://media1.tenor.com/images/66eb6a312af9a99be2b42bf45c0068c7/tenor.gif?itemid=17982088',
	'https://media.tenor.com/images/d08da0153edb0797eeb0b9a07a6af556/tenor.gif',
	'https://media.tenor.com/images/afe7f07361276c7d6a33c57c9363e71c/tenor.gif'
	
]
const randomKill = [
	'',
]
const Discord = require("discord.js")
class KillCommand extends Command {
	constructor() {
		super('kill', {
			aliases: ['kill', 'shoot'],
			category: 'actions',
			description: 'Kill someone.',
			ownerOnly: false,
			channel: ['guild']
		})
	}

	async exec(message, args) {
		args[0] = message.mentions.users.first();
		let SelfEmbed = new Discord.MessageEmbed()
		.setTitle('I\'m not here to support suicide, just putting that out there.')
		.setColor(0xaa00cc)
		let BotEmbed = new Discord.MessageEmbed()
		.setTitle('You thought... I\'m a God, gods can\'t be killed by humans!!')
		.setColor(0xaa00cc)
		let NoneEmbed = new Discord.MessageEmbed()
		.setTitle('You need to specify a user')
		.setColor(0xaa00cc)
		const randomShooting = randomShot[Math.floor(Math.random() * randomShot.length)];
		let ShotEmbed = new Discord.MessageEmbed()
		.setDescription(`**<@${message.author.id}> shot ${args[0]}!!**`)
		.setImage(randomShooting)
		.setColor(randColor())
		const randomKilling = randomKill[Math.floor(Math.random() * randomKill.length)];
		let KillEmbed = new Discord.MessageEmbed()
		.setDescription(`**<@${message.author.id}> Killed ${args[0]}!!**`)
		.setImage(randomKilling)
		.setColor(randColor())
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

	if (message.util.parsed.alias === 'kill') {
		return message.util.send(KillEmbed)
	}
	if (message.util.parsed.alias === 'shoot') {
		return message.util.send(ShootEmbed)
	}
}
};

module.exports = KillCommand;