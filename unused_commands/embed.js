const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const {randColor} = require("../funcs.js");

class EmbedCommand extends Command {
    constructor() {
        super('embed', {
            aliases: ['embed', 'em'],
            category: 'utility',
            description: 'Make an embedded message.',
            ownerOnly: false,
            channel: ['guild', 'dm'],
        })
    }


    async exec(message, args) {
        message.delete()
        let embed1 = new Discord.MessageEmbed()
        .setTitle('Custom embed')
        .setDescription('First line will be the title. This is always fat.\n\n seperate fields with `/`.\n\nStart on a new line with `\\n`.\n\nSecond line (or after the `/`) it will be the description.\n\n You can have just a description by starting your command with `/`. Just a Title is not possible. \n(color is random as we haven\'t found out how to make it customizable)')
        .addField('Normal use', '```js\n\"~embed Hello world!/I\'m DummiBot!\"\n\nThis will create a simple embed with a title and a description.```', true)
        .addField('Just a description', '```js\n\"~embed /I\'m DummiBot!\"\n\nThis will create a simple embed with just a description.```', true)
        .addField('New lines', '```js\n\"~embed Hello world/ I\'m DummiBot!\\nI have cool features!\"\n\nThis will create a simple embed with a title and a description and let the second phrase start on a new line.```' )
        .setColor(randColor())
        .setFooter('This message gets deleted after 2 minutes')
        if (!message.content.includes("/")) return message.reply(embed1)
        .then(message => {
            setTimeout(function() {
                message.delete(embed1)
            }, 120000);
        })
        parts = args.join(" ").split("/")
        parts[0] = parts[0].replace(/\\n/g, "\n")
        parts[1] = parts[1].replace(/\\n/g, "\n")
        var embed = new Discord.MessageEmbed()
        .setTitle(parts[0])
        .setDescription(parts[1])
        .setColor(randColor())
        await message.channel.send(embed); 
    }
};

module.exports = EmbedCommand;