const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
class UnhandledRejectionListener extends Listener {
    constructor() {
        super('UnhandledRejection', {
            emitter: 'process',
            event: 'unhandledRejection'
        });
    }

    async exec(error, message, command) {
        const tracebackChannel = this.client.channels.cache.get('805529461394112542')
        const logsChannel = this.client.channels.cache.get("787659536710238238")
        let errorEmbed = new Discord.MessageEmbed()
        .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
        .setColor(0xaa00cc)
        let m = await logsChannel.send(errorEmbed)
        let reason = error.message
        let embed = new Discord.MessageEmbed()
        .setTitle('Unhandled rejection traceback')
        .setColor(0xAA00CC)
        .addField('Error log', `[error link](${m.url})`)
        .addField('Reason', reason)
        await tracebackChannel.send(embed)
        
    }
}

console.log('UnhandledRejection handler ready!')
module.exports = UnhandledRejectionListener;