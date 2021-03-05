const { Command } = require('discord-akairo');
const Discord = require('discord.js');
class AvatarCommand extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar', 'av', 'pfp'],
            category: 'info',
            description: 'Get your avatar.\nUse ~avatar [user mention] to get their avatar.',
            ownerOnly: false,
            channel: ['guild', 'dm'],
            args: [
                {
                    id: 'advanced',
                    match: 'none',
                    flag: 'server'
                },
                {
                    id: 'user',
                    type: 'user'
                },
                
            ]
        });
    }

    async exec(message, args) {

// Define color, user
        let purple = 0xaa00cc;
        let user = args.user || message.author;
        if (args.advanced) {
            let embed = new Discord.MessageEmbed()
                .setDescription(`**[${message.guild.name} icon](${message.guild.iconURL({ dynamic: true, size: 4096})})**`)
                .setColor(purple)
                .setImage(message.guild.iconURL({ dynamic: true, size: 4096}))
            message.util.send(embed)
        }
        else {
        let avatarEmbed = new Discord.MessageEmbed()
			.setDescription(`**[${user.nickname || user.username}'s avatar](${user.displayAvatarURL({ dynamic: true, size: 4096 })})**`)
			.setColor(purple)
			.setImage(user.displayAvatarURL({ dynamic: true, size: 4096}))
		await message.util.send(avatarEmbed);
        }
    }
};

module.exports = AvatarCommand;
