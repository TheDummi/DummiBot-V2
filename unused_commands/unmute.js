const { DMChannel } = require("discord.js");
const { randColor } = require('../funcs.js')

Discord = require("discord.js")
module.exports = {
	name: 'unmute',
    category: 'mdevelopment',
	description: 'Unmute someone who was muted.',
	check(message) {
        message.author.id == 482513687417061376 || message.author.id == 541015870072422410 || message.author.id == 487443883127472129
        //return message.member.hasPermission("MANAGE_MESSAGES")
	},
	async execute(message, args) {
        let tomute = message.mentions.members.first();
        let muterole = message.guild.roles.cache.find(e => e.name.toLowerCase() == "muted");
        if(!muterole) return message.reply(`<@${tomute.id}> isn\'t muted.`);
        if(!tomute) return message.reply("Couldn't find user.");
        tomute.roles.remove(muterole)
            let embed = new Discord.MessageEmbed()
                .setTitle('Muting')
		        .setDescription(`<@${tomute.id}> has been unmuted!`)
		        .setColor(randColor())
            message.channel.send(embed);
            let embed1 = new Discord.MessageEmbed()
                .setTitle('Muting')
		        .setDescription(`You have been unmuted by <@${message.author.id}>.`)
		        .setColor(randColor())
            message.client.users.cache.get(tomute.id).send(embed1);
    },
};