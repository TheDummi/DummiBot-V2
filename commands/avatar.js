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

    async exec(message) {
        let user = message.mentions.users.first() || message.author
		let embed = new Discord.MessageEmbed()
			.setAuthor(`${user.nickname || user.username}'s avatar`)
			.setTitle('Avatar link')
			.setColor(0xaa00cc)
			.setImage(user.displayAvatarURL())
			.setURL(user.displayAvatarURL())
		await message.util.send(embed);
    }
};

module.exports = AvatarCommand;