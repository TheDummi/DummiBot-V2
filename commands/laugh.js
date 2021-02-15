const {randColor} = require("../funcs.js")
const randomImages = [
    'https://media.tenor.com/images/1d3e261b0447150bad4aebe8de786d58/tenor.gif',
    'https://media.tenor.com/images/acea1a340a3e2e94b7d1da5dd522310d/tenor.gif',
    'https://media.tenor.com/images/48217124b285c5930f074a2ffff4cfa3/tenor.gif',
    'https://media.tenor.com/images/d532fa82563168a3307a870be4dcd8d2/tenor.gif'

]
const { Command } = require('discord-akairo');
const Discord = require("discord.js");
class LaughCommand extends Command {
	constructor() {
		super('laugh', {
			aliases: ['laugh',],
			category: 'emotions',
			description: 'Laugh',
			ownerOnly: false,
			channel: ['guild', 'dm']
		})
	}

	async exec(message, args) {
		const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
		let embed = new Discord.MessageEmbed()
			.setDescription(`**<@${message.author.id}> laughs...**`)
			.setImage(randomImage)
			.setColor(randColor())
		await message.util.send(embed);
	}
};

module.exports = LaughCommand;