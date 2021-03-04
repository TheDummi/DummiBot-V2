const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const randColor =  require('../funcs.js')
const channels = require('../serverData.json');
const moment = require('moment');
class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildmemberremove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }
    
async exec(member) {
    
    let embed = new Discord.MessageEmbed()
	    .setTitle(`${member.user.username} Left!`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addField('Joined', member.joinedAt.toDateString())
	    .setFooter(`You're now left with ${member.guild.members.cache.size} members.`)
	    .setColor(0xaa00cc)
        .setTimestamp()
        try {
            let channel = channels[member.guild.id].leave
            channel = this.client.channels.cache.get(channel)
            await channel.send(embed)
        }
        catch {
            return;
        }
    }
};
module.exports = GuildMemberRemoveListener;