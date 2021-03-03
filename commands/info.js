const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const {getUptime} = require('../funcs.js');
const package = require('../package.json');
let version = package.version;
const contributors = [
	'Minion3665#6456',
	'Avril Lavigne#1474'
]
class InfoCommand extends Command {
	constructor() {
		super('Info', {
			aliases: ['info', 'i', 'botinfo'],
			category: 'info',
			description: 'Get general info about the bot.',
			channel: ['guild', 'dm']
		})
	}

	async exec(message, args) {
		let uptime = getUptime(this.client).uptime;
		const owners = (await Promise.all(this.client.ownerID.map(id => this.client.users.fetch(id)))).map(u => u.tag)
		let m = await message.util.send('calculating...')
		let embed = new Discord.MessageEmbed()
			.setTitle(`Bot Info`)
			.addField(`| Bot makers`, owners, true)
			.addField(`| Contributors`, contributors, true)
			.addField(`| Latency`, `\`\`\`glsl\n${m.createdTimestamp - message.createdTimestamp}ms.\`\`\``, true)
			.addField(`| Servers`, `\`\`\`glsl\n${this.client.guilds.cache.array().length}\`\`\``, true)
			.addField(`| Users`, `\`\`\`glsl\n${this.client.users.cache.size}\`\`\``, true)
			.addField(`| Library`, '```glsl\nDiscord.js```', true)
			.addField(`| Version`, `\`\`\`glsl\nV${version}\`\`\``, true)
			.addField(`| Git repository`, '[DummiBot v2](https://github.com/TheDummi/DummiBot-v2.0.git)', true)
			.addField(`| Uptime`, `\`\`\`glsl\n${uptime}\`\`\``)
			.setColor(0xaa00cc) 
			.setFooter('This message gets deleted after 2 minutes.')
		await m.edit("",embed)
		.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
	}
};

module.exports = InfoCommand;