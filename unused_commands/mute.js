const { DMChannel, DiscordAPIError } = require("discord.js");
const { randColor } = require("../funcs");

Discord = require("discord.js")
module.exports = {
	name: 'mute',
	category: 'development',
	description: 'Mute someone, the time in minutes',
	check(message) {
		message.author.id == 482513687417061376 || message.author.id == 541015870072422410 || message.author.id == 487443883127472129
		//return message.member.hasPermission("MANAGE_MESSAGES")
	},
	async execute(message, args) {
		let embed = new Discord.MessageEmbed()
		.setTitle('Muting')
		.setDescription('Format:\nWith reason: mute <user> <time> <reason>\nWithout reason: mute <user> <time>')
		.addField('Important!', 'Time is always in minutes __**Don\'t**__ specify  a time or it won\'t work!')
		if (args.length < 2) return await message.reply(embed)
		let tomute = message.mentions.members.first();
		let muterole = message.guild.roles.cache.find(e => e.name.toLowerCase() == "muted");
		if (!muterole){
			try{
				muterole = await message.guild.createRole({
					name: "Muted",
					color: "#000000",
					permissions:[]
				})
				message.guild.channels.forEach(async (channel, id) => {
					await channel.overwritePermissions(muterole, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false
					});
				});
			}catch(e){
				console.log(e.stack);
			}
			let reason = args.slice()
			reason.splice(0, 2)
			reason = reason.join(" ")
		// ~mute <@mention> <time> [reason]
			let invaliduser = new Discord.MessageEmbed()
				.setTitle('Couldn\'t find user')
				.setColor(0xaa00cc)
		if (tomute.size == 0) return message.reply(invaliduser);
			let embed1 = new Discord.MessageEmbed()
				.setTitle(`${tomute.id} has already been muted!`)
				.setColor(0xaa00cc)
		if (tomute.roles.cache.has(muterole)) return message.reply(embed1)
			let botmute = new Discord.MessageEmbed()
				.setTitle("You can't mute me.")
				.setColor(0xaa00cc)
		if (message.mentions.users.first().id == message.author.id) return message.channel.send(botmute);
			let selfmute = new Discord.MessageEmbed()
			.setTitle('You can\'t mute yourself.')
			.setColor(0xaa00cc)
		if (tomute) return message.reply(selfmute);
			let nomention = new Discord.MessageEmbed()
				.setTitle("You must specify a user")
				.setColor(0xaa00cc)
		if (args[0] === undefined) return message.channel.send(nomention);
		}
		if (reason == "") reason = "No reason given";
		let mutetime = Number(args[1])*1000*60;
			let embed5 = new Discord.MessageEmbed()
				.setTitle('You didn\'t specify a time')
				.setColor(0xaa00cc)
		if (!mutetime) return message.reply(embed5);
		await tomute.roles.add(muterole)
			let embed6 = new Discord.MessageEmbed()
				.setTitle('Muting')
				.setDescription(`<@${tomute.id}> has been muted for ${args[1]} minutes, reason: \`${reason}\`.`)
				.setColor(0xaa00cc)
			message.channel.send(embed6);
		let embed7 = new Discord.MessageEmbed()
				.setTitle('Mute report.')
				.setDescription(`You got muted! Watch it next time!\nListed below are details.`)
				.addField(`Server`, `${message.guild.name}`, true)
				.addField(`time`, `${args[1]} minutes`, true)
				.addField(`You got muted by`, `<@${message.author.id}>`, true)
				.addField(`Reason`, `${reason}`, true)
				//.addField(`Mute count`, ``, true)
				.setColor(0xaa00cc)
			message.client.users.cache.get(tomute.id).send(embed7);
			;
		setTimeout(function(){
			tomute.roles.remove(muterole)
			let embed8 = new Discord.MessageEmbed()
				.setTitle('Muting')
				.setDescription(`<@${tomute.id}> has been unmuted!`)
				.setColor(0xaa00cc)
			message.author.send(embed8);
		}, mutetime);
	},
	
};