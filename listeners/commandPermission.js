const { Listener } = require('discord-akairo');
const Discord = require('discord.js');
class CommandPermissionsListener extends Listener {
    constructor() {
        super('commandPermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }

    async exec(message, command, missingPermissions) {
        if (!this.client.permissions) {
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} I'm missing the following permissions: ${missingPermissions} to run ${command.id}`, message.author.displayAvatarURL( { dynamic: true } ))
            .setColor(0xaa00cc)
            await message.channel.send(embed)
        .then(message => {
            setTimeout(function() {
                message.delete(embed)
            }, 60000)
        })
        }
        if (!message.author.permissions) {
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} you don't have the following permissions: ${missingPermissions}, for ${command.id}`, message.author.displayAvatarURL( { dynamic: true } ))
            .setColor(0xaa00cc)
            await message.channel.send(embed)
        .then(message => {
            setTimeout(function() {
                message.delete(embed)
            }, 60000)
        })
        }
        else return;
    }
};
console.log('[DummiBot] Command permission handler ready!')
module.exports = CommandPermissionsListener;