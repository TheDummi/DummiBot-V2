const { Listener } = require('discord-akairo');
const moment = require('moment');
const Discord = require('discord.js');
const { getUptime, randColor } = require('../funcs.js')
class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        let client = this.client
// Rainbow role
        let roles = new Discord.Collection()
            client.guilds.cache.forEach(g => {
                g.roles.cache.forEach(r => {
                    roles.set(r.id, r)
                })
            })
        roles.get('id')
        // Slurp roles
        let rainbowRole = roles.get('778574596713480192')
        setInterval(async function() {
                await rainbowRole.edit({
                    color: randColor(),
                })
            }, 600000);
        let DummiBotJSOnlineRole = roles.get('787660624360243230')
// Restart date
        let timestamp = Number(new Date());
        const DateMoment = () => moment(timestamp).format("MMMM Do YYYY");
        const TimeMoment = () => moment(timestamp).format("H:mm");
// Restart message
        console.log(`${client.user.username} signed into ${client.guilds.cache.size} servers. helping ${client.users.cache.size} users, at ${TimeMoment()}`)
// Restart message in status channel
        const channel = this.client.channels.cache.get('787659066573979699');
// Auto delete everything in status channel
        let messages = await channel.messages.fetch()
        messages.forEach(async e => {
            await e.delete()
        })
        
// Rich Presence formats
        const randRP = [
            `${client.guilds.cache.size} servers`,
            `@DummiBot to get server prefix`,
            `your server and ${client.guilds.cache.size - 1} others!`,
            `~commands, open commands list.`,
            `my support server for help.`,
            `you read, this status 👀`,
            `you from heaven.`,
            `and helping ${client.users.cache.size} users.`,
            `my restart date: ${DateMoment()}.`,
            `my restart time: ${TimeMoment()} CEST.`,
        ]
        const randRP2 = [
            `my maintenance... I'll be with you shortly!`,
            `my start up completion... I'll be with you shortly!`
        ]
// Rich Presence randomizer
        const randRP1 = () => randRP[Math.floor(Math.random() * randRP.length)];
        const randRP3 = () => randRP2[Math.floor(Math.random() * randRP2.length)];
// Rich Presence setter
        client.user.setPresence({
            activity: {
                type: "WATCHING",
                name: randRP3()
            }
        })
// Rich Presence updater
        setInterval(async function () {
            client.user.setPresence({
                activity: {
                    type: "WATCHING",
                    name: randRP1()
                }
            })
        }, 60000)
// Online message
        let users = () => this.client.users.cache.size
        let guilds = () => this.client.guilds.cache.size
        const uptime = () => getUptime(this.client).uptime;
        this.client.users.cache.get('482513687417061376').send('I\'m online')
        .then( () => {
            setInterval(function() {
                this.client.commandHandler.reloadAll()
                this.client.listenerHandler.reloadAll()
                this.client.inhibitorHandler.reloadAll()
                this.client.users.cache.get('482513687417061376').send('I reloaded')
            }, 36000000)
        })
        let embed1 = new Discord.MessageEmbed()
            .setImage('https://media.tenor.com/images/82f46c2b4d8b8d8945daa52b8508e38b/tenor.gif')
            .setTitle('I\'m online!')
            .setDescription("I just restarted, I'll be there with you shortly.")
            .addField('| servers I\'m watching', guilds() + " servers", true)
            .addField('| Users I\'m helping', users() + " users", true)
            .addField('| Date I restarted', DateMoment(), true)
            .addField('| Time I restarted', TimeMoment(), true)
            .addField('| Uptime', uptime())
            .setFooter('| If this message does not update every minute it means I\'m either having an outage, or I\'m offline.')
            .setColor(0xaa00cc)
        let m = await channel.send(DummiBotJSOnlineRole, embed1).catch(e => console.log(e));
        setInterval(async function () {
        
// Update online message
        let embed1 = new Discord.MessageEmbed()
            .setTitle('Online update')
            .setImage('https://media.tenor.com/images/82f46c2b4d8b8d8945daa52b8508e38b/tenor.gif')
            .addField('| servers I\'m watching', guilds() + " servers", true)
            .addField('| Users I\'m helping', users() + " users", true)
            .addField('| Date I restarted', DateMoment(), true)
            .addField('| Time I restarted', TimeMoment(), true)
            .addField('| Uptime', uptime())
            .addField('| Last message Update', (new Date().toTimeString()))
            .setFooter('| If this message does not update every minute it means I\'m either having an outage, or I\'m offline.')
            .setColor(0xaa00cc)
        await m.edit(embed1);
        }, 60000);
    }
};
console.log('[DummiBot] Ready handler ready!')
module.exports = ReadyListener;