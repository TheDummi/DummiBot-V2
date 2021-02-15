const Discord = require("discord.js");
const { Command } = require('discord-akairo');
const {paginate} = require("../funcs.js");
const fs = require("fs");

class UsesCommand extends Command {
	constructor() {
		super('uses', {
			aliases: ['uses', 'u'],
			category: 'info',
			description: 'Get a list of the most used commands.',
			ownerOnly: false,
			channel: ['guild', 'dm']
		})
	}

	async exec(message, args) {
		let uses = JSON.parse(fs.readFileSync('data.json').toString())
		uses = uses.cmduses
		commandsWithUses = Object.keys(uses)
		commandsWithUses = commandsWithUses.sort((a, b) => {
			if (uses[a] > uses[b]) return -1
			else return 1
		})
		commands = []
		embeds = []
		while (commandsWithUses.length > 0) commands.push(commandsWithUses.splice(0, 15));
		for (let i = 0; i < commands.length; i++) {
			let niceCmds = ""
			commands[i].forEach(e => {
				niceCmds = niceCmds + `\n\`${e}\`: ${uses[e]}`
			})
			embeds[i] = new Discord.MessageEmbed()
			.setTitle(`Commands usage`)
			.setDescription(niceCmds)
			.setColor(0xaa00cc)
		}
		if (embeds.length < 1) {
			embeds.push(new Discord.MessageEmbed()
			.setTitle(`Commands usage`)
			.setDescription("No commands :/")
			.setColor(0xaa00cc))
			embeds.push(new Discord.MessageEmbed()
			.setTitle(`Commands usage`)
			.setDescription("No commands :/")
			.setColor(0xaa00cc))
			embeds.push(new Discord.MessageEmbed()
			.setTitle(`Commands usage`)
			.setDescription("Still no commands :/")
			.setColor(0xaa00cc))
			embeds.push(new Discord.MessageEmbed()
			.setTitle(`Commands usage`)
			.setDescription("Still still no commands :/")
			.setColor(0xaa00cc))
			embeds.push(new Discord.MessageEmbed()
			.setTitle(`Commands usage`)
			.setDescription("Why are you still looking?") // is this needed? no. do I want it? yes. why? idk lol
			.setColor(0xaa00cc))
			embeds.push(new Discord.MessageEmbed()
			.setTitle(`Commands usage`)
			.setDescription("...")
			.setColor(0xaa00cc))
			embeds.push(new Discord.MessageEmbed()
			.setTitle(`Commands usage`)
			.setDescription("Fine. have a command")
			.setColor(0xaa00cc))
			embeds.push(new Discord.MessageEmbed()
			.setTitle(`Commands usage`)
			.setDescription("`fakecmd`: -0")
			.setColor(0xaa00cc))
		}
		paginate(message, embeds)
    }
};

module.exports = UsesCommand;