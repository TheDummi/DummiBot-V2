const Discord = require("discord.js");
const { Command } = require('discord-akairo');
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
class RollDiceCommand extends Command {
	constructor() {
		super('rolldice', {
			aliases: ['rolldice', 'diceroll', 'roll', 'dice', 'rl'],
			category: 'fun',
			description: 'Roll a dice',
			ownerOnly: false,
			channel: ['guild', 'dm'],
			args: [
				{
					id: 'number',
					type: 'number',
					prompt: {
						start: 'How many dices would you like to roll?'
					}
				}
			]
		})
	}

	async exec(message, args) {
		let MinMaxEmbed = new Discord.MessageEmbed()
			.setTitle('Number must be between 1 and 100!')
			.setColor(0xaa00cc);
        const rollDice = () => Math.floor(Math.random() * 6) + 1;
		if (args.number > 100 || args.number < 1) {
			return await message.reply(MinMaxEmbed)
		}
		var m = await message.util.send(`rolling ${args.number} dice...`);
		await sleep(1000)
		var str = "Rolls:\n";
		for (var i = 0; i < args.number; i++) {
			str = str + (i+1) + ": " + rollDice() + "\n"
		}
		m.edit(`${str}`);
    }
};

module.exports = RollDiceCommand;