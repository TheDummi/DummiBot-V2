const got = require("got")
const fs = require("fs")
const { Command } = require('discord-akairo');
const Discord = require('discord.js');
class HasteCommand extends Command {
    constructor() {
        super('haste', {
            aliases: ['haste', 'get'],
            category: 'bot maker',
            description: 'Get bot code',
            ownerOnly: true,
            channel: ['guild', 'dm'],
			args: [
				{
					id: 'message',
					type: 'string',
					match: 'rest',
					prompt: {
						start: 'What path would you like to find?'
					}
				}
			]
        });
    }

	async exec(message, args) {
		let b;
		try {
			b = fs.readFileSync(args.message)
		}
		catch(e) {
			console.log(e)
			return await message.reply("Not a valid file path")
		}
		try {
			const {body} = await got.post('https://hastebin.com/documents', {
				body: b
			});
			message.util.send(`https://hastebin.com/${JSON.parse(body).key}.js`);
		} catch (error) {
			message.util.send(error.response.body);
		}
	}
}

module.exports = HasteCommand;