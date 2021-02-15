const { Listener, Command } = require('discord-akairo');
const Discord = require('discord.js');

class CommandInvalidListener extends Listener {
    constructor() {
        super('commandinvalid', {
            emitter: "commandHandler",
            event: "messageInvalid"
        })
    }

    async exec(message) {
        if (!Command.id) {
            let embed = new Discord.MessageEmbed()
            .setTitle(`No command \`${message.channel.lastMessage.content}\` found.`)
            .setDescription(`Check if you didn't misspell it with  \`~commands\`\n\nOr join our support server [here](https://discord.gg/ET4yckcD78) to suggest this as an idea!`)
            .setColor(0xaa00cc)
            return await message.util.send(embed)
            .then(message => {
                setTimeout(function() {
                    message.delete(embed)
                }, 60000);
            })
        }
    }
}

module.exports = CommandInvalidListener;