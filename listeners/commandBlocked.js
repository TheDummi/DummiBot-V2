const { Listener } = require('discord-akairo');
const Discord = require('discord.js');
class CommandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        });
    }

    async exec(message, command, reason) {
        const channel = this.client.channels.cache.get('805529461394112542')
        
        let embed = new Discord.MessageEmbed()
        .setTitle('Command block traceback')
        .setColor(0xAA00CC)
        .addField('Author', message.author.username)
        if (message.guild.name !== null) {
            embed = embed.addField('Server', message.guild.name)
        }
        if (message.channel.id !== undefined) {
            let invite = message.channel.createInvite()
		    let invited = await invite
            embed = embed.addField('Direct link', `[click me](${invited})`)
        }
        embed
            .addField('Command', command.id)
            .addField('Reason', 'not in/an ' + reason)
        channel.send(embed)
        if (reason == "owner") return message.channel.send(`<@${message.author.id}> you are not a developer. \`${command.id}\` is a developer command.`)
        if (reason == "dm") return message.channel.send(`<@${message.author.id}> you can only use \`${command.id}\` in DMs.`)
        if (reason == "guild") return message.channel.send(`<@${message.author.id}> you can only use \`${command.id}\` in guilds.`)
    }
};

module.exports = CommandBlockedListener;