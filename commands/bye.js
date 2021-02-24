const {randColor} = require("../funcs.js")
const { Command } = require('discord-akairo');
const randomImages = [
    'https://media.tenor.com/images/e955f55bab6839ec724531e3bae3303c/tenor.gif',
    'https://media.tenor.com/images/12686b599b3af757f546e330941c39e4/tenor.gif',
    'https://media.tenor.com/images/806630b207f40797eb35a5b0135ef2b2/tenor.gif',
    'https://media.tenor.com/images/33c7bbf779e792d8a25ba1e5b80d8c9f/tenor.gif'

]
const randomImage = () => randomImages[Math.floor(Math.random() * randomImages.length)];
const Discord = require("discord.js")
class ByeCommand extends Command {
	constructor() {
		super('bye', {
			aliases: ['bye', 'goodbye', 'cya'],
			category: 'actions',
			description: 'Say bye.',
			ownerOnly: false,
			channel: ['guild', 'dm'],
			args: [
				{
					id: 'user',
					type: 'member'
				}
			]
		});
	}
	async exec(message) {

// Definitions
		let member = args.user;
		let user = message.author;
		let purple = 0xaa00cc;	
		let memberAvatar = user.displayAvatarURL()
		
// If no one gets mentioned
		if (member == undefined) {
		let embed = new Discord.MessageEmbed()
			.setAuthor(`${user.username} says bye!`, memberAvatar)
			.setImage(randomImage())
			.setColor(randColor())
        await message.util.send(embed);
		}

// If mentioned user is the bot
		if (member.id == client.id) {
			let botEmbed = new Discord.MessageEmbed()
				.setAuthor(`${user.username} What you saying goodbye to me for?`, memberAvatar)
				.setColor(purple)
			await message.util.send(botEmbed)
		}

// If mentioned user is the message author himself
		if (member.id == user.id) {
			let userEmbed = new Discord.MessageEmbed()
				.setAuthor(`${user.username} saying bye to yourself?`)
				.setColor(purple)
		}

// In any other case
		else {
			let mentionEmbed = new Discord.MessageEmbed()
				.setAuthor(`${user.username} says bye to ${member.username}`, memberAvatar)
				.setImage(randomImage())
				.setColor(randColor())
			await message.util.send(mentionEmbed)
		}
    }
};

module.exports = ByeCommand;