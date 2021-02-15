const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const {paginate} = require("../funcs.js");

class EmotesCommand extends Command {
	constructor() {
		super('emotes', {
			aliases: ['emotes', 'emojis'],
			category: 'info',
			description: 'Show the emotes of the guild',
			ownerOnly: false,
			channel: 'guild'
		})
	}


	async exec(message, args) {
		let emojiArray = [];
		let emojis = message.guild.emojis.cache.array();
		let embeds = [];
		while (emojis.length > 0) emojiArray.push(emojis.splice(0, 15));
		for (let i = 0; i < emojiArray.length; i++) {
			embeds[i] = new Discord.MessageEmbed()
			.setTitle(`Emojis:`)
			.setDescription(emojiArray[i].join("\n") + "\n\n\nThe emotes are time of adding based (not name)")
			.setColor(0xaa00cc)
		}
		paginate(message, embeds)
	}
};

module.exports = EmotesCommand;
