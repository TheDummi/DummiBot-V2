const fs = require("fs");
module.exports = {
	name: 'afk',
	category: 'wom',
	description: 'Put your status to afk.',
	check(message) {
	return message.guild.id == 689260593080696833
        },
	async execute(message, args) {

		let reason = args.join(" ")
		if (reason == "") reason = "None provided"
		let nick = message.member.nickname || message.author.username;
		if (reason == " ") reason = "No reason given";
		if (('[AFK] ' + nick).length > 32) return await message.reply("Your nickname/name is too long to change. Please make it shorter.")
		try {
			if (!nick.startsWith("[AFK] ")) {
				await message.member.setNickname('[AFK] ' + nick)
			}
		}
		catch {
			let embed1 = new Discord.MessageEmbed()
				.setTitle('You are afk')
				.setDescription('details below')
				.addField(`| Server`, `${message.guild.name}`, true)
				.addField('| Name', `couldn't change your name, most likely because of permissions.`, true)
				.addField('| Reason', reason, true)
				.setColor(0xaa00cc)
			let data = fs.readFileSync("data.json").toString()
			data = JSON.parse(data)
			let embed2 =  new Discord.MessageEmbed()
            	.setTitle('You are already afk!')
            	.setColor(0xaa00cc)
			if (Object.keys(data.afk).includes(message.author.id)) return await message.author.send(embed2)
			data.afk[message.author.id] = {
				reason: reason,
				pings: 0
			}
			fs.writeFileSync("data.json", JSON.stringify(data))
			return await message.author.send(embed1)
		}
		let data = fs.readFileSync("data.json").toString()
		data = JSON.parse(data)
		if (Object.keys(data.afk).includes(message.author.id)) return await message.author.send(embed2)
		data.afk[message.author.id] = {
			reason: reason,
			pings: 0
		}
		fs.writeFileSync("data.json", JSON.stringify(data))
		let embed = new Discord.MessageEmbed()
			.setTitle('You are afk')
			.setDescription('details below')
			.addField(`| Server`, `${message.guild.name}`, true)
			.addField('| Name', `${nick}`, true)
			.addField('| Reason', reason, true)
			.setColor(0xaa00cc)
		message.author.send(embed)
	},
};
