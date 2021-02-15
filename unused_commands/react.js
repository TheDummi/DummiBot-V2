const { Command } = require('discord-akairo');
const randomEmojis = require('../funcs.js')
const Discord = require('discord.js')
class ReactCommand extends Command {
	constructor() {
		super('react', {
			aliases: ['react', 'emojify'],
			category: 'utility',
			description: 'React a specified number of server emotes to your last message!',
			ownerOnly: false,
			channel: 'guild',
			args: [
				{
					id: 'message',
					type: 'number',
				}
			]
		})
	}

async exec(message, args) {
	let NoneSpecifiedEmbed = new Discord.MessageEmbed()
		.setTitle('Please specify a number of reactions to add.')
		.setColor(0xaa00cc);
	let NoEmotesSpecifiedEmbed = new Discord.MessageEmbed()
		.setTitle('Please specify a number between 1 and 20')
		.setColor(0xaa00cc);
	let NoGuildEmotesEmbed = new Discord.MessageEmbed()
		.setTitle('You have no animated emojis!')
		.setColor(0xaa00cc);
	let NotEnoughGuildEmotes = new Discord.MessageEmbed()
		.setTitle('You don\'t have enough animated emojis!')
		.setColor(0xaa00cc);
// When you don't mention an amount.
	if (!args.message) {
			return await message.util.reply(NoneSpecifiedEmbed)
		.then(message => {
			setTimeout(function() {
				message.delete(NoneSpecifiedEmbed)
			}, 5000);
		})
	}
// When you mention either lower than 1 or 20.
	if (Number(args.message) > 20 || Number(args.message) < 1) {
			return await message.util.reply(NoEmotesSpecifiedEmbed)
		.then(message => {
			setTimeout(function() {
				message.delete(NoEmotesSpecifiedEmbed)
			}, 5000);
		})
	}
// When your guild doesn't have any emotes.
	if (message.guild.emojis.cache.filter(e => e.animated).array() === []) {
			return await message.util.reply(NoGuildEmotesEmbed)
		.then(message => {
			setTimeout(function() {
				message.delete(NoGuildEmotesEmbed)
			}, 5000);
		})
	}
// When your guild doesn't have enough emotes.
	if (message.guild.emojis.cache.filter(e => e.animated).array() > Number(args[0])) {
			return await message.reply(NotEnoughGuildEmotes)
		.then(message => {
			setTimeout(function() {
				message.delete(NotEnoughGuildEmotes)
			}, 5000);
		})
	}
// When all is correct.
await message.delete()
let m = await message.channel.messages.fetch({limit:1})
	m = m.array()[0]
		try {
			let emojis = randomEmojis()
			for (let i = 0; i < emojis.size; i++) {
				await m.react(emojis.array()[i]);
			}
		
		}
		catch (error) {
			return
		}
	}
};

module.exports = ReactCommand;