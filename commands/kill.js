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
const fs = require('fs');
const xp = require('../data/respectData.json')
const Discord = require("discord.js")
class KillCommand extends Command {
	constructor() {
		super('kill', {
			aliases: ['kill', 'shoot'],
			category: 'actions',
			description: 'Kill someone.',
			ownerOnly: false,
			channel: ['guild'],
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: 'Who would you like to kill?',
						retry: 'Invalid user, Who would you like to kill?',
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
		.setDescription(`**<@${message.author.id}> shot ${member}!!**`)
		.setImage(randomShooting)
		.setColor(randColor())
		const randomKilling = randomKill[Math.floor(Math.random() * randomKill.length)];
		let KillEmbed = new Discord.MessageEmbed()
		.setDescription(`**<@${message.author.id}> Killed ${member}!!**`)
		.setImage(randomKilling)
		.setColor(randColor())
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
		
		if (!xp[message.author.id]) {
			xp[message.author.id] = {
				respect: 0,
				respectLevel: 1,
			};
		}
		let userRespect = xp[message.author.id].respect;
		let userLevelRespect = xp[message.author.id].respectLevel;
		let xpAdd = Math.floor(Math.random() * 5) + 5;
		userRespect = userRespect - xpAdd;
		xp[message.author.id] = {
			respect: userRespect,
			respectLevel: userLevelRespect,
		}
		fs.writeFile('data/respectData.json', JSON.stringify(xp), (err) => {
			if (err) console.log(err)
		})
		return message.util.send(KillEmbed)
	}
};

module.exports = KillCommand;