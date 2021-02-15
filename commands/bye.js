const {randColor} = require("../funcs.js")
const { Command } = require('discord-akairo');
const randomImages = [
    'https://media.tenor.com/images/e955f55bab6839ec724531e3bae3303c/tenor.gif',
    'https://media.tenor.com/images/12686b599b3af757f546e330941c39e4/tenor.gif',
    'https://media.tenor.com/images/806630b207f40797eb35a5b0135ef2b2/tenor.gif',
    'https://media.tenor.com/images/33c7bbf779e792d8a25ba1e5b80d8c9f/tenor.gif'

]
const Discord = require("discord.js")
class ByeCommand extends Command {
	constructor() {
		super('bye', {
			aliases: ['bye', 'goodbye', 'cya'],
			category: 'actions',
			description: 'Say bye.',
			ownerOnly: false,
			channel: ['guild', 'dm']
		});
	}
	async exec(message) {
		const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
		let embed = new Discord.MessageEmbed()
			.setDescription(`**<@${message.author.id}> says bye!**`)
			.setImage(randomImage)
			.setColor(randColor())
        await message.util.send(embed);
    }
};

module.exports = ByeCommand;