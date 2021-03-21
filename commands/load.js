const Discord = require('discord.js');
const { Command } = require('discord-akairo');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload', 'load'],
            category: 'bot maker',
            description: 'reload all existing modules of the bot.',
            ownerOnly: true
        })
    }
    async exec(message) {
        try {
            this.client.commandHandler.reloadAll()
            this.client.listenerHandler.reloadAll()
            this.client.inhibitorHandler.reloadAll()
            let me = this.client.users.cache.get('482513687417061376')
            me.send(`${message.author.username} reloaded me.`);
            let embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username} reloaded all modules!`, message.author.displayAvatarURL({ dynamic: true}))
                .setColor(0xaa00cc)
            message.util.send(embed)
        }
        catch (error) {
            let embed = new Discord.MessageEmbed()
                .setTitle('`ERROR`')
                .setDescription(error)
                .setColor(0xaa00cc);
            message.util.send(embed)
            .then(message => {
                setTimeout(function() {
                    message.delete(embed)
                }, 10000)
            });
        }
    }
};

module.exports = ReloadCommand;