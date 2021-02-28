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
    let channel = channels[member.guild.id].welcome
    channel = this.client.channels.cache.get(channel)
    let embed = new Discord.MessageEmbed()
	    .setTitle(`Welcome ${member.user.username}!`)
	    .addField('Account age', member.user.createdAt.toDateString(),true)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
	    .setFooter(`This is the ${member.guild.members.cache.size} member!`)
	    .setColor(0xaa00cc)
        try {
            await channel.send(embed)
        }
        catch(e) {
            console.log(e)
            return;
        }
    }
} 

console.log('Guild member add handler ready!')
module.exports = GuildMemberAddListener;