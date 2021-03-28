const Discord = require('discord.js');
const { Command } = require('discord-akairo');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload', 'load'],
            category: 'bot maker',
            description: 'reload all existing modules of the bot.',
            ownerOnly: true,
            args: [
                {
                    id: 'option',
                    type: ['commands', 'listeners', 'inhibitors', 'all'],
                    prompt: {
                        start: '`commands`, `listeners`, `inhibitors`, `all`'
                    }
                },
                {
                    id: 'name',
                    type: 'string',
                    
                }
            ]
        })
    }
    async exec(message, args) {
        try {
            let embed = new Discord.MessageEmbed()
                .setColor(0xaa00cc)
            let me = this.client.users.cache.get('482513687417061376')
            if (args.option == 'commands') {
                if (!args.name) {
                    this.client.commandHandler.reloadAll()
                }
                else {
                    this.client.commandHandler.reload(args.name)
                }
            }
            if (args.option == 'listeners') {
                if (!args.name) {
                    this.client.listenerHandler.reloadAll()
                }
                else {
                    this.client.listenerHandler.reload(args.name)
                }
            }
            if (args.option == 'inhibitors') {
                if (!args.name) {
                    this.client.inhibitorHandler.reloadAll()
                }
                else {
                    this.client.inhibitorHandler.reload(args.name)
                }
            }
            if (args.option == 'all') {
            this.client.commandHandler.reloadAll()
            this.client.listenerHandler.reloadAll()
            this.client.inhibitorHandler.reloadAll()
            }
            if (!args.name) {
                me.send(`${message.author.username} reloaded ${args.option}`);
                embed = embed.setAuthor(`${message.author.username} reloaded ${args.option}`, message.author.displayAvatarURL({ dynamic: true}))
            }
            else {
                me.send(`${message.author.username} reloaded ${args.option}, file ${args.name}.`)
                embed = embed.setAuthor(`${message.author.username} reloaded ${args.option}, file ${args.name}`, message.author.displayAvatarURL({ dynamic: true}))
            }
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