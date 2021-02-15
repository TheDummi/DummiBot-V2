const {randColor} = require("../funcs.js")
const { DiscordAPIError } = require("discord.js")
const fs = require("fs")
const { send } = require("process")
module.exports = {
	name: 'setup',
	category: 'admin',
	description: 'Set up; prefix, bot name, random reactions, moderator role(s) and admin role(s)',
	check(message) {
		return message.member.hasPermission("MANAGE_GUILD")
	},
	async execute(message, args) {
		let timeout = false;
		function setPrefix(prefix, message) {
			let data = fs.readFileSync("data.json")
			let json = JSON.parse(data)
			json.prefixes[message.guild.id] = prefix
			fs.writeFileSync("data.json", JSON.stringify(json))
		}
		let embed0 = new Discord.MessageEmbed()
		.setTitle("Setup")
		.setDescription("**Prefix**\nWould you like to change the prefix? If so, send it here. Respond with the new prefix or write \`skip\` exactly like, its capital sensitive.")
		.setColor(0xaa00cc) 
		await message.channel.send(embed0)
		// prefix change
		await message.channel.awaitMessages((m) => {return m.author.id == message.author.id}, { max: 1, time: 60000, errors: ['time']})
		.then(async (ms) => {
			const m = ms.first();
			if (m.content == "skip") {
				let embed = new Discord.MessageEmbed()
				.setTitle("Setup")
				.setDescription("Kept current prefix.\n\n**Bot name**\nWould you like to change the bot's nickname? Please respond with the name or write \`skip\` exactly like, its capital sensitive.")
				.setColor(0xaa00cc)
				return message.channel.send(embed);
			}
			setPrefix(m.cleanContent, m)
			let embed = new Discord.MessageEmbed()
			.setTitle('Setup')
			.setDescription("Kept the current name.\n\n**Bot name**\nWould you like to change the bot's nickname? Please respond with the name or write \`skip\` exactly like, its capital sensitive..")
			.setColor(0xaa00cc)
			await message.channel.send(embed)
		})
		.catch(async (e) => {
			message.channel.send("```js\n"+e.stack+"```")
			await message.channel.send("Timed out.")
			timeout = true;
		});
		if (timeout) return;
		// nickname change
		await message.channel.awaitMessages((m) => {return m.author.id == message.author.id}, { max: 1, time: 60000, errors: ['time']})
		.then(async (ms) => {
			const m = ms.first();
			if (m.content == "skip") {
				let embed = new Discord.MessageEmbed()
				.setTitle("Setup")
				.setDescription(`Skipping name change.\n\n**Random reactions**\nWould you like to have random reactions enabled? (The bot will have a small chance to react to messages in this server with one of the server's reactions. Please respond with either \`yes\` or \`no\`.)`)
				.setColor(0xaa00cc)
				return message.channel.send(embed);
			}
			await m.guild.me.setNickname(m.cleanContent)
			let embed = new Discord.MessageEmbed()
			.setTitle('Setup')
			.setDescription(`My nickname has been changed to \`${m.cleanContent}\`\n\n**Random reactions**\nWould you like to have random reactions enabled? (The bot will have a small chance to react to messages in this server with one of the server's reactions. Please respond with either \`yes\` or \`no\`.)`)
			.setColor(0xaa00cc)
			await message.channel.send(embed) 
		})
		.catch(async (e) => {
			message.channel.send("```js\n"+e.stack+"```")
			await message.channel.send("Timed out.")
			timeout = true;
		});
		if (timeout) return;
		// random reactions
		await message.channel.awaitMessages((m) => {return m.author.id == message.author.id}, { max: 1, time: 60000, errors: ['time']})
		.then(async (ms) => {
			const m = ms.first();
			if (m.content.toLowerCase() != "yes" && m.content.toLowerCase() != "no") {
				let embed = new Discord.MessageEmbed()
				.setTitle("Setup")
				.setDescription("Got invalid response, skipping.\n\n**Moderation**\nWould you like to set moderator role(s)? If not than reply with \`skip\`.")
				.setColor(0xaa00cc)
				return message.channel.send(embed);
			}
			if (m.content.toLowerCase() == "yes") {
				// if they say yes
				let data = fs.readFileSync("data.json").toString()
				data = JSON.parse(data)
				if (!data.reactions.includes(m.guild.id)) {
					data.reactions.push(m.guild.id)
					fs.writeFileSync("data.json", JSON.stringify(data))
				}
				let embed = new Discord.MessageEmbed()
				.setTitle('Setup')
				.setDescription(`Random reactions enabled.\n\n**Moderation**\nWould you like to set moderator role(s)? If not than reply with \`skip\`.`)
				.setColor(0xaa00cc)
				await message.channel.send(embed) 
			}
			else {
				// if they say no
				let data = fs.readFileSync("data.json").toString()
				data = JSON.parse(data)
				if (data.reactions.includes(m.guild.id)) {
					data.reactions.splice(data.reactions.indexOf(m.guild.id), 1)
					fs.writeFileSync("data.json", JSON.stringify(data))
				}
				let embed = new Discord.MessageEmbed()
				.setTitle('Setup')
				.setDescription(`Random reactions disabled.\n\n**Moderation**\nWould you like to set moderator role(s)? If not than reply with \`skip\`.`)
				.setColor(0xaa00cc)
				await message.channel.send(embed) 
			}
		})
		.catch(async (e) => {
			message.channel.send("```js\n"+e.stack+"```")
			await message.channel.send("Timed out.")
			timeout = true;
		});
		if (timeout) return;
		// mod roles
        await message.channel.awaitMessages((m) => {return m.author.id == message.author.id}, { max: 1, time: 60000, errors: ['time']})
		.then(async (ms) => {
			const m = ms.first();
			if (m.content == "skip") {
				let embed = new Discord.MessageEmbed()
				.setTitle("Setup")
				.setDescription(`Skipping moderator roles.\n\n**Administration**\nWould you like to set administrator role(s)? If not than reply with \`skip\`.`)
				.setColor(0xaa00cc)
				return message.channel.send(embed);
			}
			if (m.mentions.roles.size != 0) {
				let data = fs.readFileSync("data.json").toString()
				data = JSON.parse(data)
				ids = []
				names = []
				m.mentions.roles.forEach(e => {
					ids.push(e.id)
					names.push(e.name)
				})
				data.modRoles[m.guild.id] = ids
				fs.writeFileSync("data.json", JSON.stringify(data))
				let embed = new Discord.MessageEmbed()
				.setTitle("Setup")
				.setDescription(`Added role(s):\n${names.join("\n")}\n\n**Administration**\nWould you like to set administrator role(s)? If not than reply with \`skip\`.`)
				.setColor(0xaa00cc)
				return message.channel.send(embed);
			}
			else {
				let embed = new Discord.MessageEmbed()
				.setTitle("Setup")
				.setDescription(`Did not mention any roles, skipping.\n\n**Administration**\nWould you like to set administrator role(s)? If not than reply with \`skip\`.`)
				.setColor(0xaa00cc)
				return message.channel.send(embed);
			}
		})
		.catch(async (e) => {
			message.channel.send("```js\n"+e.stack+"```")
			await message.channel.send("Timed out.")
			timeout = true;
		});
		if (timeout) return;
		// admin roles
		await message.channel.awaitMessages((m) => {return m.author.id == message.author.id}, { max: 1, time: 60000, errors: ['time']})
		.then(async (ms) => {
			const m = ms.first();
			if (m.content == "skip") {
				let embed = new Discord.MessageEmbed()
				.setTitle("Setup")
				.setDescription(`Skipping admin roles.\n\nSetup complete!`)
				.setColor(0xaa00cc)
				return message.channel.send(embed);
			}
			if (m.mentions.roles.size != 0) {
				let data = fs.readFileSync("data.json").toString()
				data = JSON.parse(data)
				ids = []
				names = []
				m.mentions.roles.forEach(e => {
					ids.push(e.id)
					names.push(e.name)
				})
				data.adminRoles[m.guild.id] = ids
				fs.writeFileSync("data.json", JSON.stringify(data))
				let embed = new Discord.MessageEmbed()
				.setTitle("Setup")
				.setDescription(`Added role(s):\n${names.join("\n")}\n\nSetup complete!`)
				.setColor(0xaa00cc)
				return message.channel.send(embed);
			}
			else {
				let embed = new Discord.MessageEmbed()
				.setTitle("Setup")
				.setDescription(`Did not mention any roles, skipping.\n\nSetup complete!`)
				.setColor(0xaa00cc)
				return message.channel.send(embed);
			}
		})
		.catch(async (e) => {
			message.channel.send("```js\n"+e.stack+"```")
			await message.channel.send("Timed out.")
			timeout = true;
		});
		if (timeout) return;
		//     if (stage == 1) {
		//         if (m.content !== "skip") {
		//             setPrefix(m.content, m)
		//             let embed1 = new Discord.MessageEmbed() 
		//             .setTitle("Prefix")
		//             .setDescription(`Prefix changed to \`${m.content}\`.\nYou can always change the prefix with ~setprefix.`)
		//             .setColor(0xaa00cc) 
		//             await message.channel.send(embed1)
		//             stage++
		//             let embed2 = new Discord.MessageEmbed()
		//             .setTitle("Bot name")
		//             .setDescription(`Would you like to change the bot name? If so, send it here. If not, say \`skip\``) 
		//             .setColor(0xaa00cc) 
		//             await message.channel.send(embed2)
		//             return
		//         }
		//         else {
		//             stage++
		//             let embed1 = new Discord.MessageEmbed()
		//             .setTitle("Bot name")
		//             .setDescription(`Would you like to change the bot name? If so, send it here. If not, say \`skip\``) 
		//             .setColor(0xaa00cc) 
		//             await message.channel.send(embed1)
		//             return
		//         }
		//     }
		//     else if (stage == 2) {
		//         if (m.content !== "skip") {
		//             if (m.content.split("").length > 32) {
		//                 let embed = new Discord.MessageEmbed()
		//                 .setColor(0xaa00cc)
		//                 .setTitle('Invalid argument')
		//                 .setDescription('Username must be 32 characters or less.')
		//                 return await message.channel.send(embed)
		//             }
		//             await m.guild.me.setNickname(m.content)
		//             let embed1 = new Discord.MessageEmbed()
		//             .setTitle("Bot name")
		//             .setDescription(`Nickname changed to \`${m.content}\``) 
		//             .setColor(0xaa00cc) 
		//             await message.channel.send(embed1)
		//             stage++
		//             let embed2 = new Discord.MessageEmbed()
		//             .setTitle("Random reactions")
		//             .setDescription("Would you like the bot to have a small chance to react with an emoji (from your server) to messages?")
		//             .setColor(0xaa00cc) 
		//             const react = await message.channel.send(embed2)
		//             react.react("✅")
		//             react.react("❌")
		//             react.awaitReactions((r, u)=> ["✅", "❌"].includes(r.emoji.toString()) && u.id == m.author.id, { max: 1, time: 60000, errors: ['time']})
		//             .then(async (r)  => {
		//                 r = r.first()
		//                 const userReactions = react.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
		//                 for (const reaction of userReactions.values()) {
		//                     try {
		//                         await reaction.users.remove(message.author.id);
		//                     }
		//                     catch {}
		//                 }
		//                 if (r.emoji.toString() == "✅") {
		//                     let data = fs.readFileSync("data.json").toString()
		//                     data = JSON.parse(data)
		//                     if (!data.reactions.includes(m.guild.id)) {
		//                         data.reactions.push(m.guild.id)
		//                         fs.writeFileSync("data.json", JSON.stringify(data))
		//                     }
		//                     let embed3 = new Discord.MessageEmbed()
		//                         .setTitle('Random emotes enabled.')
		//                         .setColor(0xaa00cc)
		//                         await message.channel.send(embed3)
		//                 }
		//                 else if (r.emoji.toString() == "❌") {
		//                     let data = fs.readFileSync("data.json").toString()
		//                     data = JSON.parse(data)
		//                     if (data.reactions.includes(m.guild.id)) {
		//                         delete data.reactions[data.reactions.indexOf(m.guild.id)]
		//                         fs.writeFileSync("data.json", JSON.stringify(data))
		//                     }
		//                     let embed4 = new Discord.MessageEmbed()
		//                         .setTitle('Random emotes disabled.')
		//                         .setColor(0xaa00cc)
		//                         await message.channel.send(embed4)
		//                 }
		//             })
		//             .catch((e) => {
		//                 m.channel.send("Timed out, skipping.")
		//             })
		//             collector.stop()
		//             return
		//         }
		//         else {
		//             stage++
		//             let embed2 = new Discord.MessageEmbed()
		//             .setTitle("Random reactions")
		//             .setDescription("Would you like the bot to have a small chance to react with an emoji (from your server) to messages?")
		//             .setColor(0xaa00cc) 
		//             const react = await message.channel.send(embed2)
		//             react.react("✅")
		//             react.react("❌")
		//             react.awaitReactions((r, u)=> ["✅", "❌"].includes(r.emoji.toString()) && u.id == m.author.id, { max: 1, time: 60000, errors: ['time']})
		//             .then(async (r)  => {
		//                 r = r.first()
		//                 const userReactions = react.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
		//                 for (const reaction of userReactions.values()) {
		//                     try {
		//                         await reaction.users.remove(message.author.id);
		//                     }
		//                     catch {}
		//                 }
		//                 if (r.emoji.toString() == "✅") {
		//                     let data = fs.readFileSync("data.json").toString()
		//                     data = JSON.parse(data)
		//                     if (!data.reactions.includes(m.guild.id)) {
		//                         data.reactions.push(m.guild.id)
		//                         fs.writeFileSync("data.json", JSON.stringify(data))
		//                     }
		//                     let embed3 = new Discord.MessageEmbed()
		//                         .setTitle('Random emotes enabled.')
		//                         .setColor(0xaa00cc)
		//                         await message.channel.send(embed3)
		//                 }
		//                 else if (r.emoji.toString() == "❌") {
		//                     let data = fs.readFileSync("data.json").toString()
		//                     data = JSON.parse(data)
		//                     if (data.reactions.includes(m.guild.id)) {
		//                         delete data.reactions[data.reactions.indexOf(m.guild.id)]
		//                         fs.writeFileSync("data.json", JSON.stringify(data))
		//                     }
		//                     let embed4 = new Discord.MessageEmbed()
		//                         .setTitle('Random emotes disabled.')
		//                         .setColor(0xaa00cc)
		//                         await message.channel.send(embed4)
		//                 }
		//             })
		//             .catch((e) => {
		//                 m.channel.send("Timed out, skipping.")
		//             })
		//             collector.stop()
		//             return
		//         }
		//     }
		//     else if (stage == 3) {
		
		
		//     }
		// }); 
	}
} 
// I am just going to rewrite this so it looks better