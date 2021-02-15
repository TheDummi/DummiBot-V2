const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class CloseCommand extends Command {
    constructor() {
        super('close', {
            aliases: ['close', 'hide', 'delete', 'remove'],
            category: 'utility',
            description: 'Edit a message command to close/hide/delete the command message!',
            ownerOnly: false,
            channel: ['guild', 'dm']
        });
    }

    async exec(message, args) {
        let CloseEmbed = new Discord.MessageEmbed()
        .setDescription(`**<@${message.author.id}> closed your command!**`)
        .setColor(0xaa00cc);
        let HideEmbed = new Discord.MessageEmbed()
        .setDescription(`**<@${message.author.id}> hid your command!**`)
        .setColor(0xaa00cc);
        if (message.util.parsed.alias === 'close') {
            return message.util.send(CloseEmbed)
        }
        if (message.util.parsed.alias === 'hide') {
            return message.util.send(HideEmbed)
        }
        if (message.util.parsed.alias === 'delete') {
            let DeleteEmbed = new Discord.MessageEmbed()
            .setTitle('Deleting message in 1 second')
            .setColor(0xaa00cc)
            message.util.send(DeleteEmbed)
            .then(message => {
                setTimeout(function(){
                    message.delete(DeleteEmbed)
                    
                }, 1);
            })
        }
        if (message.util.parsed.alias === 'remove') {
            let removeEmbed = new Discord.MessageEmbed()
            .setTitle('Deleting message in 1 second')
            .setColor(0xaa00cc)
            message.util.send(removeEmbed)
            .then(message => {
                setTimeout(async function(){
                    await message.delete(removeEmbed)
                }, 1);
            })
        }
        }
    };

module.exports = CloseCommand;