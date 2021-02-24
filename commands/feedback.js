const Discord = require('discord.js');
const { Command } = require('discord-akairo');

class FeedbackCommand extends Command {
    constructor() {
        super('feedback', {
            aliases: ['feedback', 'bugreport'],
            category: 'support',
            description: 'Report a bug or glitch without having to join the support server. Or give DummiBot feedback',
            channel: ['guild', 'dm'],
            args: [
                {
                    id: 'message',
                    type: 'string',
                    match: 'text',
                    prompt: {
                        start: 'What would you like to give feedback on?',
                        ended: 'Thank you for giving your feedback.',
                        timeout: 'Out of time!'
                    }
                }
            ]
        })
    }
    async exec(message, args){
        let channel = this.client.channels.cache.get('811239116377161789')
        let embed = new Discord.MessageEmbed()
            .setTitle('Feedback')
            .addField('Author', message.author.tag)
            .addField('Server', message.guild.name || 'DM')
            .addField('Report', args.message)
            .setColor(0xaa00cc)
            .setFooter('✅: reviewed\n❌: Not reviewed\n📥: under review')
        let m = channel.send(embed)
            .then(message => {
                setTimeout(function() {
                    message.react('✅')
                    message.react('📥')
                    message.react('❌')
                }, 1)
            });
        

        let ThankEmbed = new Discord.MessageEmbed()
            .setTitle('Thank you for giving us feedback!')
            .setDescription(`Feedback: ${args.message}\n\nYour feedback got sent to the [DummiBot support server](https://discord.gg/ET4yckcD78).`)
            .setColor(0xaa00cc)
        await message.channel.send(ThankEmbed)
            .then(message => {
                setTimeout(function() {
                message.delete(ThankEmbed)
            }, 10000)
        });
    }
};

module.exports = FeedbackCommand;