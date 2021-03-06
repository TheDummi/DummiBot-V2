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
        let avatarEmbed = new Discord.MessageEmbed()
			.setDescription(`**[${user.nickname || user.username}'s avatar](${user.displayAvatarURL({ dynamic: true, size: 4096 })})**`)
			.setColor(purple)
			.setImage(user.displayAvatarURL({ dynamic: true, size: 4096}))
		await message.util.send(avatarEmbed);
    }
};

module.exports = AvatarCommand;
