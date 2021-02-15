const {randColor} = require("../funcs.js")
const { Command } = require('discord-akairo');
const Discord = require('discord.js');

const randomHello = [
	'https://media.tenor.com/images/68297735d444dd9e0cf38088ef2523d8/tenor.gif',
	'https://media.tenor.com/images/4effd64e6bb268b061c9a27f74513eb7/tenor.gif',
	'https://media.tenor.com/images/5fa22f21a4da6e05ee6bc5bbf5900a0c/tenor.gif',
	'https://media.tenor.com/images/d27aa535c8289184ad6b735d4b2f3fae/tenor.gif',
	'https://media1.tenor.com/images/c07a0e54601516dbf8b399832636507a/tenor.gif?itemid=13765417',
	'https://media.tenor.com/images/04db233c058379048335e5c121449376/tenor.gif',
	'https://media.tenor.com/images/e348b551f0663041d82ccdb188487afb/tenor.gif'

]
const randomHi = [
	'https://media.tenor.com/images/b770b6c83273da459176de0b148c3658/tenor.gif',
	'https://media.tenor.com/images/c711dc2ee7df2101d21691e762420514/tenor.gif',
	'https://media.tenor.com/images/3e59cfdbe7cdcbd397a59eb103b1e976/tenor.gif',
	'https://media.tenor.com/images/2d99f31eb5f41d271f1da0d144c154e8/tenor.gif',
	'https://media.tenor.com/images/a51e6de6abdec3f969c46df44861b96d/tenor.gif',
	'https://media.tenor.com/images/5d0cd547eb89cc06563f9aacd4db28c0/tenor.gif',
]
const randomHey = [
	'https://media.tenor.com/images/4c82cce6f53274cae8bf1677195faa22/tenor.gif',
	'https://media.tenor.com/images/53e05c45c81499b473c5aeb33f8eec93/tenor.gif',
	'https://media.tenor.com/images/776dd5d813825e2db59841a70e5c1b91/tenor.gif',
	'https://media.tenor.com/images/6a4375fb40d9b064ee304de08f1c1cc3/tenor.gif',
	'https://media.tenor.com/images/2ef7049b64347396504ec1b973cde04a/tenor.gif',
	'https://media.tenor.com/images/ffb540df77c6f990ae8a0b29a3997676/tenor.gif',

]
const randomHelloThere = [
	'https://media1.tenor.com/images/e4a2e558234284ea158baf335fec447b/tenor.gif?itemid=11875188',
	'https://media1.tenor.com/images/b93a212c42e0630c534d90c386b221f3/tenor.gif?itemid=16358959',
]
const randomGoodMorning = [
	'https://media.tenor.com/images/bd8f6a98a7e7e0db9df8ea3a2509b14b/tenor.gif',
	'https://media.tenor.com/images/4aca812658d935187af2c48db4f87b15/tenor.gif',
	'https://media.tenor.com/images/f7596cecf1a898b51169b841a1d08bc5/tenor.gif',
	'https://media.tenor.com/images/8e5b40aaa1e14506a97aea8d9ed916ac/tenor.gif'
]
const helloName = [
	'Hallo, this is hello in dutch',
	'Hallo, this is hello in german',
	'Bonjour, this is hello in french',
	'Bonjorno, this is hello in italian',
	'Здравствуйте, this is hello in russian (pronounced "zdravestveuyte")',
	'您好, this is hello in chinees (pronounced "nín hǎo")',    
]

class HelloCommand extends Command {
	constructor() {
		super('hello', {
			aliases: ['hello', 'helloThere', 'hi', 'hey', 'morning'],
			category: 'actions',
			description: 'Say hello!',
			ownerOnly: false,
			channel: ['guild', 'dm']
		})
	}
	async exec(message) {
		const helloNames = () => helloName[Math.floor(Math.random() * helloName.length)];
		const randomHello2 = () => randomHello[Math.floor(Math.random() * randomHello.length)]
		const randomHelloThere2 = () => randomHelloThere[Math.floor(Math.random() * randomHelloThere.length)];		
		const randomHey2 = () =>randomHey[Math.floor(Math.random() * randomHey.length)];
		const randomHi2 = () => randomHi[Math.floor(Math.random() * randomHi.length)];
		const randomGoodMorning2 = () => randomGoodMorning[Math.floor(Math.random() * randomGoodMorning.length)];

    	let helloEmbed = new Discord.MessageEmbed()
			.setDescription(`**<@${message.author.id}> says hello!**`)
			.setImage(randomHello2())
			.setColor(randColor())
			.setFooter(helloNames());
		let helloThereEmbed = new Discord.MessageEmbed()
			.setDescription(`**<@${message.author.id}> says hello there!**`)
			.setImage(randomHelloThere2())
			.setColor(randColor());
		let hiEmbed = new Discord.MessageEmbed()
			.setDescription(`**<@${message.author.id}> says hi!**`)
			.setImage(randomHi2())
			.setColor(randColor());
		let heyEmbed = new Discord.MessageEmbed()
			.setDescription(`**<@${message.author.id}> says hey!**`)
			.setImage(randomHey2())
			.setColor(randColor());
		let GoodMorningEmbed = new Discord.MessageEmbed()
			.setDescription(`**<@${message.author.id}> says good morning!**`)
			.setImage(randomGoodMorning2())
			.setColor(randColor());
		
		if (message.util.parsed.alias === 'helloThere') {
			return message.util.send(helloThereEmbed)
		}
		if (message.util.parsed.alias === 'hello') {
			return message.util.send(helloEmbed)
		}
		if (message.util.parsed.alias === 'hi') {
			return message.util.send(hiEmbed)
		}
		if (message.util.parsed.alias === 'hey') {
			return message.util.send(heyEmbed)
		}
		if (message.util.parsed.alias === 'morning') {
			return message.util.send(GoodMorningEmbed)
		}
    }
};

module.exports = HelloCommand;