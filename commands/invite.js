const {randColor} = require("../funcs.js");
const Discord = require("discord.js");
const { Command } = require('discord-akairo');
const fs = require('fs');
const xp = require('../data/respectData.json')
class InviteCommand extends Command {
	constructor() {
		super('invite', {
			aliases: ['invite', 'inv'],
			category: 'support',
			description: 'Get invite links to invite the bot.',
			ownerOnly: false,
			channel: ['guild', 'dm']
		})
	}

	async exec(message, args) {
		let embed = new Discord.MessageEmbed()
			.setTitle(`Invite bot here:`)
			.setDescription(`Thank you for inviting DummiBot!`)
			.addField('Fully operational, with admin perm', 'click [here](https://discord.com/oauth2/authorize?client_id=741940149633679390&scope=bot&permissions=8)')
			.addField('Fully operational, without admin perm', 'click [here](https://discord.com/oauth2/authorize?client_id=741940149633679390&scope=bot&permissions=2146958839)')
			.addField('Fully operational, without unneeded perms', 'click [here](https://discord.com/oauth2/authorize?client_id=741940149633679390&scope=bot&permissions=1983245414)')
			.addField('No role (no perms), only invite this when you\'re experienced with bots!', 'click [here](https://discord.com/oauth2/authorize?client_id=741940149633679390&scope=bot&permissions=0)')
			.setColor(0xaa00cc)
		await message.util.send(embed);
		if (!xp[message.author.id]) {
			xp[message.author.id] = {
				respect: 0,
				respectLevel: 1,
			};
		}
		let userRespect = xp[message.author.id].respect;
		let userLevelRespect = xp[message.author.id].respectLevel;
		let xpAdd = Math.floor(Math.random() * 15) + 5;
		userRespect = userRespect + xpAdd;
		xp[message.author.id] = {
			respect: userRespect,
			respectLevel: userLevelRespect,
		}
		fs.writeFile('data/respectData.json', JSON.stringify(xp), (err) => {
			if (err) console.log(err)
		})
	}
};

module.exports = InviteCommand;