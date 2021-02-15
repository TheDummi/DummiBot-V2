const { Command } = require('discord-akairo')

class RepeatCommand extends Command {
	constructor() {
		super('repeat', {
			aliases: ['repeat', 'rep'],
			category: 'bot makers',
			description: 'Runs commands multiple times',
			ownerOnly: true,
			channel: 'guild'
		})
	}

	async exec(message, args) {
		const num = Number(args[0])
		try {
			command = require(`./${args[1]}.js`)
		}
		catch {
			return message.util.reply(`Invalid command`)
		}
		let m = message
		let args1 = args
		args1.splice(0, 2)
		let margs = args1
		m.content = `${args[1]} ${margs.join(" ")}`
		m.cleanContent = `${args[1]} ${margs.join(" ")}`
		console.log(margs)
		for (let i = 0; i < num; i++) {
			command.execute(m, margs)
		}
	}
};

module.exports = RepeatCommand;