const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const moment = require('moment');
const client  = new Discord.Client;
const channel = client.channels.cache.get('787659066573979699');
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class LogoutCommand extends Command {
    constructor() {
        super('logout', {
            aliases: ['logout', 'signout'],
            category: 'bot maker',
            description: 'Turn DummiBot off',
            ownerOnly: true,
            channel: ['guild', 'dm']
        })
    }
async exec(message) {
    let roles = new Discord.Collection()
            client.guilds.cache.forEach(g => {
                g.roles.cache.forEach(r => {
                    roles.set(r.id, r)
                })
            })
        roles.get('id')
        let role = roles.get('787660624360243230')
    let timestamp = Number(new Date());
        const moments = () => moment(timestamp).format("MMMM Do YYYY");
        const moments1 = () => moment(timestamp).format("H:mm");
    const channel = this.client.channels.cache.get('787659066573979699')
    var m = await message.util.send(`<@${message.author.id}>  Would you like to sign me out?`)
    await m.react(this.client.emojis.cache.get('726935952584605737'))
    const filter = (reaction, user) => reaction.emoji.id == 726935952584605737 && user.id == message.author.id
    m.awaitReactions(filter, { max: 1 })
        .then(async collected => {
        await m.edit('Signing Out...')
        await sleep(1000)
        await m.edit('Signing Out...\nDeleting online message. Sending offline message.')
        await sleep(1000)
        let embed = new Discord.MessageEmbed()
            .setTitle('I\'m Offline I\'m sure I will be online soon ;)')
            .setColor(0xaa00cc)
            .addField('Date I went offline', moments(), true)
            .addField('Time I went Offline', moments1(), true)
            .addField('Signed Out by', `<@${message.author.id}>`)
            .setImage('https://media1.tenor.com/images/cfc16681879690cfab0923e15aa96545/tenor.gif?itemid=20355356')
        let messages = await channel.messages.fetch()
        messages.forEach(async e => {
            await e.delete()
        })
        await channel.send(role, embed)
        await m.edit('Signing Out...\nFinalizing Rainbow color.')
        await sleep(1000)
        await m.edit('Signing Out...\nFinalizing status message.')
        await sleep(1000)
        await m.edit(`<@${this.client.user.id}> Signed Out by <@${message.author.id}> Successfully!`)
        await this.client.users.cache.get('482513687417061376').send(`${message.author.username} signed me out.`)
        await sleep(1000)
        await process.exit()
        })
    }
};

module.exports = LogoutCommand;