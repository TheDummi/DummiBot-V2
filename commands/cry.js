const {randColor} = require("../funcs.js")
const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const randomImages = [
    'https://media1.tenor.com/images/675daa5c96e23bb7e2b5b06ef804cb81/tenor.gif?itemid=15881815',
    'https://media.tenor.com/images/e6d446c26a3685f0c748cfdb634e5b1a/tenor.gif',
    'https://media.tenor.com/images/04db8316e7f739bdb6edb90f93eb0ea0/tenor.gif',
    'https://media1.tenor.com/images/a846f5900be6196031711066e832ea11/tenor.gif?itemid=14580378'

]
class CryCommand extends Command {
	constructor() {
		super('cry', {
			aliases: ['cry', 'sad', 'sob'],
			category: 'emotions',
			description: 'Cry.',
			ownerOnly: false,
			channel: ['guild', 'dm']
		})
	}
async exec(message) {
		const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
var embed = new Discord.MessageEmbed()
		.setDescription(`**<@${message.author.id}> cries...**`)
		.setImage(randomImage)
		.setColor(randColor())
        await message.util.send(embed);
    }
};

module.exports = CryCommand;