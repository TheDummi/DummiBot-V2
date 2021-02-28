const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const randColor =  require('../funcs.js')
const channels = require('../serverData.json');
class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }
    
async exec(member) {
    
    let embed = new Discord.MessageEmbed()
	    .setTitle(`Welcome ${member.user.username}!`)
	    .addField('Account age', member.user.createdAt.toDateString(),true)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
	    .setFooter(`This is the ${member.guild.members.cache.size} member!`)
	    .setColor(0xaa00cc)
        .setTimestamp()
        try {
            let channel = channels[member.guild.id].welcome;
            channel = this.client.channels.cache.get(channel)
            await channel.send(embed)
        }
        catch {
            return;
        }
    }
} 

console.log('Guild member add handler ready!')
module.exports = GuildMemberAddListener;