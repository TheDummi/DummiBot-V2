const Discord = require("discord.js");
const { Command } = require('discord-akairo');
const fs = require("fs");

class BanCommand extends Command {
    constructor(){
        super('ban', {
            aliases: ['ban', 'b'],
            category: 'moderation',
            description: 'Ban a user.',
            ownerOnly: false,
            channel: 'guild',
            clientPermissions: 'BAN_MEMBERS',
            userPermissions: 'BAN_MEMBERS',
            args: [
                {
                id: 'user',
                type: 'user',
                prompt: {
                    start: 'Who would you like to ban?',
                    retry: 'Invalid user, try again.',
                    limit: 3,
                    ended: 'Too many retries!',
                    timeout: 'time ran out.'
                }
                },
                {
                    id: 'message',
                    type: 'message',
                    match: 'rest',
                    prompt: {
                        start: 'What\'s the reason of this ban?',
                    }
                },
            ]
        })
    }

	async exec(message, args) {
        let toBan = args.user
		let reason = args.message
        if (reason == "") reason = "No reason given";
        try {
            let BanEmbed = new Discord.MessageEmbed()
            .setDescription(`${toBan} got banned by ` + message.author.tag + "reason: " + `\`${reason}\``)
            .setColor(0xaa00cc);
		    await toBan.ban(BanEmbed)
        }
		catch {
            let ErrorEmbed = new Discord.Message()
            .setDescription("Error banning, is my role higher than theirs?")
            .setColor(0xaa00cc)
            await message.reply(ErrorEmbed)
        }
        let guildBanEmbed = new Discord.MessageEmbed()
		    .setTitle('Muting')
		    .setDescription(`<@${toBan.id}> has been banned, reason: \`${reason}\`.`)
            .setColor(0xaa00cc);
		await message.util.send(guildBanEmbed);
        let DMBanEmbed =  new Discord.MessageEmbed()
            .setTitle('You got banned!')
            .setDescription(`check the details below`)
            .addField(`Server`, `${message.guild.name}`, true)
            .addField(`User who banned you`, `<@${message.author.id}>`, true)
            .setColor(0xaa00cc)
            .addField(`Reason`, `${reason}`, true);
        await toBan.get(toBan.id).send(DMBanEmbed)
    }
};

module.exports = BanCommand;