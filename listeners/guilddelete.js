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
	.setFooter(`I now am in ${this.client.guilds.cache.size} servers!`)
	.setColor(0xaa00cc)
    .setTimestamp()
    let check = guild.deleted;
    if (check == false) {
        embed = embed.setDescription(`${guild.name} got deleted...`)
    }
    else {
        embed = embed.setDescription(`${guild.name} kicked me...`)
    }
	await channel.send(embed)
    }
}

module.exports = GuildDeleteListener;