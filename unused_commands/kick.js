const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require("fs");

class KickCommand extends Command {
	constructor() {
		super('kick', {
			aliases: ['kick', 'k'],
			category: 'moderation',
			description: 'Kick a user.',
			ownerOnly: false,
			channel: 'guild',
			clientPermissions: 'KICK_MEMBERS',
			userPermissions: 'KICK_MEMBERS'
		})
	}


	async exec(message, args) {
        let toKick = message.mentions.members.first();
        let reason = args.slice();
		reason.splice(0, 1)
		reason = reason.join(" ")
		if (reason == "") reason = "No reason given";
		let MultipleUsersEmbed = new Discord.MessageEmbed()
			.setTitle('You can only kick 1 person at a time.')
			.setColor(0xaa00cc)
        if (message.mentions.members.size != 1) return await message.reply(embed)
        try {
			let embed1 = new Discord.MessageEmbed()
			.setDescription(`**${toKick} got kicked by ` + message.author.tag + "reason: " + `\`${reason}\`**`)
			.setColor(0xaa00cc)
			toKick.kick(embed1)
        }
		catch {
			let embed2 = new Discord.MessageEmbed()
			.Title(`Unable to kick, is my role higher than ${toKick}?`)
			.setColor(0xaa00cc)
			message.reply(embed2)
        }
        let embed3 = new Discord.MessageEmbed()
		.setTitle('Muting')
		.setDescription(`<@${toKick.id}> has been kicked, reason: \`${reason}\`.`)
		.setColor(0xaa00cc)
		message.channel.send(embed3);
        let embed4 =  new Discord.MessageEmbed()
        .setTitle('You got kicked!')
        .setDescription(`check the details below`)
        .addField(`Server`, `${message.guild.name}`, true)
        .addField(`User who kicked you`, `<@${message.author.id}>`, true)
        .setColor(0xaa00cc)
        .addField(`Reason`, `${reason}`, true)
        // .addField(`Kick count`, ``, true)
        await message.mentions.members.get(toKick.id).send(embed4)
    }
};