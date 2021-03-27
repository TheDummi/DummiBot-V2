const { Listener } = require('discord-akairo');
const Discord = require('discord.js');
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
    let thumbnail = guild.iconURL({ dynamic: true, size: 4096});
	let embed = new Discord.MessageEmbed()
	.setTitle(`${guild.name}`)
	.setDescription(`I got invited to ${guild.name}!`)
	.setFooter(`I now am in ${this.client.guilds.cache.size} servers!`)
	.setImage(thumbnail)
	.setColor(randColor())
    .setTimestamp()
    await channel.send(embed)
    let owner = this.client.users.cache.get(guild.owner.id)
    let pEmbed = new Discord.MessageEmbed()
        .setTitle(`${owner.username}, thank you for inviting me to ${guild.name}!`)
        .setDescription(`Use \`~help\`, for a help message\nUse \`~commands\` for a list of commands\nPing me in ${guild.name} to get my prefixes (by default these are \`dummi \` and \`~\`).\n\nI am looking forward to be accompanied by you and your community!\n\nIf you have any questions or feedback, join the [support server here](https://discord.gg/DZJCyaU2RS).`)
        .setColor(0xaa00cc)
        guild.owner.user.send(pEmbed)
    }
};
module.exports = GuildCreateListener;