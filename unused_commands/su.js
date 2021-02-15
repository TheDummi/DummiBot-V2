const { Command } = require('discord-akairo');

class SuCommand extends Command {
	constructor() {
		super('su', {
			aliases: ['su'],
			category: 'bot maker',
			description: 'Runs command as someone else, must use user id',
			ownerOnly: true,
			channel: 'guild'
		})
	}

	async exec(message, args) {
		let m = message
		let member = message.guild.members.cache.get(args[0]) || null
		let command;
		try {
			command = require(`./${args[1]}.js`)
		}
		catch {
			return message.reply(`Invalid command`)
		}
		if (member === null) return message.reply(`User ${args[0]} is either invalid, or not in this server.`)
		m.author =  member.user
		m.member = member
		command.execute(m, args.splice(0, 2))
	}
};

module.exports = SuCommand;