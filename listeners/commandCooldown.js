const { Listener } = require('discord-akairo');
const Discord = require('discord.js');
class CommandCooldownListener extends Listener {
    constructor() {
        super('commandCooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }

    async exec(message, command, cooldown) {
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} you're still on ${Math.round(cooldown / 1000 / 3600)}h cooldown for ${command.id}`, message.author.displayAvatarURL( { dynamic: true } ))
            .setColor(0xaa00cc)
            await message.channel.send(embed)
        .then(message => {
            setTimeout(function() {
                message.delete(embed)
            }, 60000)
        })
    }
};

module.exports = CommandCooldownListener;