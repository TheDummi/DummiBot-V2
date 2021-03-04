const { Listener } = require('discord-akairo');
const Discord = require('discord.js');
const moment = require('moment');
const { randColor } =  require('../funcs.js');
class GuildCreateListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }
    
async exec(guild) {
    const channel = this.client.channels.cache.get('787659277408927746')
    let thumbnail = guild.iconURL();
	let embed = new Discord.MessageEmbed()
	.setTitle(`${guild.name}`)
	.setDescription(`I got invited to ${guild.name}!\nOn ${guild.me.joinedAt.toDateString()}`)
	.setFooter(`I now am in ${this.client.guilds.cache.size} servers!`)
	.setImage(thumbnail)
	.setColor(randColor())
    await channel.send(embed)
    }
};
module.exports = GuildCreateListener;