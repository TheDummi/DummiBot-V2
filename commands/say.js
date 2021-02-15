const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class SayCommand extends Command {
	constructor() {
		super('say', {
			aliases: ['say',],
			category: 'bot maker',
			description: 'Let DummiBot Say anything',
			ownerOnly: true,
			channel: ['guild', 'dm'],
			args: [
				{
					id: 'message',
					match: 'content'
				}
			]
		})
	}

	async exec(message, args) {
        await message.delete()
        await message.util.send(args.message)
    }
};

module.exports = SayCommand;