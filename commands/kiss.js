const {randColor} = require("../funcs.js")
const randomImages = [
    'https://media.tenor.com/images/39fe167bdab90223bcc890bcb067b761/tenor.gif',
    'https://media.tenor.com/images/83bceada9e9a957a3909934de9c4a0f6/tenor.gif',
    'https://media.tenor.com/images/ec85a866a451e1a47008ac6a8534d1c4/tenor.gif',
    'https://media.tenor.com/images/84900d5c4088c08cac576f241bfe5d1a/tenor.gif',
    'https://media.tenor.com/images/a2b2a46aef7e20955412b15ffff1a9ce/tenor.gif',
    'https://media.tenor.com/images/894f7f8efac0f1af5206c66e8297f311/tenor.gif',
    'https://media.tenor.com/images/c0828ddd44542bc87a949cdf3d4d2488/tenor.gif',
    'https://media.tenor.com/images/e020fa4283bff46be4b6372891d323ac/tenor.gif',
    'https://media.tenor.com/images/4d1a91a7b23ddedb5ee16d3af7248bee/tenor.gif',
	'https://media.tenor.com/images/8046e6cd73eab8471f5d92e96a0d90f0/tenor.gif',
	'https://media1.tenor.com/images/74b7edb473b5877a82d1179ca131886a/tenor.gif?itemid=16274372',
	'https://media.tenor.com/images/916d1343950d45a97daef422b6c7a08f/tenor.gif',
	'https://media.tenor.com/images/92d58e55331184f39aeb7b8da17c3652/tenor.gif',
	'https://media1.tenor.com/images/015c71df440861e567364cf44e5d00fe/tenor.gif?itemid=16851922',
	'https://media1.tenor.com/images/31362a548dc7574f80d01a42a637bc93/tenor.gif?itemid=13985240',
	'https://media.tenor.com/images/e88862ac1161ed4bb6fe01d82d1ed100/tenor.gif',
	'https://media.tenor.com/images/4985cf439b5dc9b9646b7a947172025a/tenor.gif',
	'https://media.tenor.com/images/1972b74c707d38bd936d717f85cd7048/tenor.gif',
	'https://media.tenor.com/images/41d91122e2f24b5f99184779e7a7ded5/tenor.gif',
	'https://media.tenor.com/images/18ac66478040eeae7616c581de4da7dc/tenor.gif',
	'https://media.tenor.com/images/1a3c9dbc1e8fd345eec15e55315a17df/tenor.gif',
	'https://media.tenor.com/images/47874bc01ab06735a3b73403292d7265/tenor.gif',
	'https://media.tenor.com/images/4db57193238c0d242f5306beb3b8e542/tenor.gif',
	'https://media.tenor.com/images/0c57492076a2d9dfcb9a13cbc10baa12/tenor.gif',
	'https://media.tenor.com/images/9fa36316e7447b9dc8462b9e1d82a1f0/tenor.gif',
	'https://media.tenor.com/images/b2886e1077191ae6addeaec62185a7f3/tenor.gif',
	'https://media.tenor.com/images/0b369b36e2db98733a40eba4113929a1/tenor.gif'
]
const { Command } = require('discord-akairo')
const Discord = require("discord.js")

class KissCommand extends Command {
	constructor() {
		super('kiss', {
			aliases: ['kiss'],
			category: 'actions',
			description: 'Kiss someone',
			ownerOnly: false,
			channel: ['guild', 'dm']
		})
	}

async exec(message, args) {
	args[0] = message.mentions.users.first()
	let SelfEmbed = new Discord.MessageEmbed()
		.setTitle('Its physically impossible to kiss yourself, at least somewhere in the face then...')
		.setColor(0xaa00cc);
	let BotEmbed = new Discord.MessageEmbed()
		.setTitle('Don\'t kiss me!')
		.setColor(0xaa00cc);
	let NoneEmbed = new Discord.MessageEmbed()
		.setTitle('You need to specify a user')
		.setColor(0xaa00cc);
	const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
	let embed = new Discord.MessageEmbed()
		.setDescription(`**<@${message.author.id}> kisses ${args[0]}...**`)
		.setImage(randomImage)
		.setColor(randColor());
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

	else {
		await message.util.send(embed);
		}
	}
};

module.exports = KissCommand;