const {randColor} = require("../funcs.js")
const { Command } = require('discord-akairo');
const randomImages = [
    'https://media.tenor.com/images/2fcbb381572bcbc9fa3009b7f5c00a01/tenor.gif',
    'https://media.tenor.com/images/9a018d658fb18e8be2a9c7a2e21259d4/tenor.gif',
    'https://media.tenor.com/images/8e8f51d09d5e2ce2d2226efea8986a93/tenor.gif',
    'https://media.tenor.com/images/199170515a989a6d2a2077d72266e48f/tenor.gif'

]
const Discord = require("discord.js")
class BlushCommand extends Command {
	constructor() {
		super('blush', {
			aliases: ['blush'],
			category: 'emotion',
			description: 'Blush for no reason',
			ownerOnly: false,
			channel: ['guild', 'dm']
		});
	}

	async exec(message) {
		const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
		let embed = new Discord.MessageEmbed()
			.setDescription(`**<@${message.author.id}> blushes...**`)
			.setImage(randomImage)
			.setColor(randColor())
		await message.util.send(embed);
	}
};

module.exports = BlushCommand;
