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
                }
            ]
        });
    }

    async exec(message, args) {

// Define color, user and url
        let purple = 0xaa00cc;
        let user = args.user || message.author;
        let url = user.displayAvatarURL({ dynamic: true });
		let avatarEmbed = new Discord.MessageEmbed()
			.setDescription(`**[${user.nickname || user.username}'s avatar](${url})**`)
			.setColor(purple)
			.setImage(user.displayAvatarURL({ dynamic: true}))
		await message.util.send(avatarEmbed);
    }
};

module.exports = AvatarCommand;