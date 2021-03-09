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
			aliases: ['info', 'i', 'botinfo', 'developer', 'contributors', 'servers', 'library', 'version', 'uptime', 'users', 'git'],
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
			.setColor(0xaa00cc)
			.setFooter('This message gets deleted after 2 minutes.')
		if (message.util.parsed.alias === 'developer') {
			embed = embed.addField('| Developers', owners, true);
			return await m.edit("",embed)
		.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
		}
		if (message.util.parsed.alias === 'contributors') {
			embed = embed.addField(`| Contributors`, contributors, true);
			return await m.edit("",embed)
		.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
		}
		if (message.util.parsed.alias === 'servers') {
			embed = embed.addField(`| Servers`, `\`\`\`glsl\n${this.client.guilds.cache.array().length}\`\`\``, true);
			return await m.edit("",embed)
		.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
		}
		if (message.util.parsed.alias === 'users') {
			embed = embed.addField(`| Users`, `\`\`\`glsl\n${this.client.users.cache.size}\`\`\``, true);
			return await m.edit("",embed)
		.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
		}
		if (message.util.parsed.alias === 'library') {
			embed = embed.addField(`| Library`, '```glsl\nDiscord.js```', true);
			return await m.edit("",embed)
		.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
		}
		if (message.util.parsed.alias === 'version') {
			embed = embed.addField(`| Version`, `\`\`\`glsl\nV${version}\`\`\``, true);
			return await m.edit("",embed)
		.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
		}
		if (message.util.parsed.alias === 'uptime') {
			embed = embed.addField(`| Uptime`, `\`\`\`glsl\n${uptime}\`\`\``);
			return await m.edit("",embed)
		.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
		}
		if (message.util.parsed.alias == 'git') {
			embed = embed.addField(`| Git repository`, '[DummiBot v2](https://github.com/TheDummi/DummiBot-v2.0.git)', true);
			return await m.edit("",embed)
		.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
		}
		if (message.util.parsed.alias == 'info' || 'i' || 'botinfo') {
			embed = embed
				.setTitle(`Bot Info`)
				.addField(`| Developers`, owners, true)
				.addField(`| Contributors`, contributors, true)
				.addField(`| Latency`, `\`\`\`glsl\n${m.createdTimestamp - message.createdTimestamp}ms.\`\`\``, true)
				.addField(`| Servers`, `\`\`\`glsl\n${this.client.guilds.cache.array().length}\`\`\``, true)
				.addField(`| Users`, `\`\`\`glsl\n${this.client.users.cache.size}\`\`\``, true)
				.addField(`| Library`, '```glsl\nDiscord.js```', true)
				.addField(`| Version`, `\`\`\`glsl\nV${version}\`\`\``, true)
				.addField(`| Git repository`, '[DummiBot v2](https://github.com/TheDummi/DummiBot-v2.0.git)', true)
				.addField(`| Uptime`, `\`\`\`glsl\n${uptime}\`\`\``);
				return await m.edit("",embed)
		.then(message => {
			setTimeout(function() {
				message.delete(embed)
			}, 120000);
		})
		}
	}
};

module.exports = InfoCommand;
