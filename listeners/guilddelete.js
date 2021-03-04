const { Listener } = require('discord-akairo');
const Discord = require('discord.js');
const moment = require('moment');
class GuildDeleteListener extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }
    
async exec(guild) {
    const channel = this.client.channels.cache.get('787659277408927746')
    let embed = new Discord.MessageEmbed()
	.setTitle(`${guild.name} either kicked me or deleted the server!`)
	.setFooter(`I now am in ${this.client.guilds.cache.size} servers!`)
	.setColor(0xaa00cc)
	await channel.send(embed)
    }
}

module.exports = GuildDeleteListener;