const { Listener, Command } = require('discord-akairo');
const Discord = require('discord.js');
const fs = require('fs')
const getReactions = require('../funcs.js')
let xp = require('../xp.json');
let Dimboins = require('../currency.json')
const messageXp = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
] 
class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {
        if (message.author.bot) return;
        
        /* if (getReactions(message) === true && Math.random() < 0.05){ 
            number = 5;
            message.react(message.guild.emojis.cache.get(message.guild.emojis.cache.randomKey()));
        }*/
        // DummiBot-suggestions 
	if (message.author.bot) return;
	if (this.client.channels.cache.get('787659328224100383') === message.channel) {
		if (message.content.startsWith('=>')) return;
		message.react('\u2705')
		message.react('\u274c')
		return;
	} 
// py suggestions
	if (message.author.bot) return;
	if (this.client.channels.cache.get('787659486353424396') === message.channel) {
		if (message.content.startsWith('=>')) return;
		message.react('\u2705')
		message.react('\u274c')
		return;
	} 
	if (message.author.bot) return;
// wom server suggestions
	if (this.client.channels.cache.get('777600889284329483') === message.channel) {
		if (message.content.startsWith('=>')) return;
		message.react('\u2705')
		message.react('\u274c')
		return;
	}
// Space cafe 
        if (this.client.channels.cache.get('726870140930490480') === message.channel) {
	if (message.content.startsWith('=>')) return;
	message.react('\u2705')
	message.react('\u274c')
	return;
}
//temp
if (this.client.channels.cache.get('798633664060719114') === message.channel) {
	if (message.content.startsWith('=>')) return;
	message.react('\u2705')
	message.react('\u274c')
	message.react('⏹️')
	return;
}
        // Set reasonable defaults for new users
        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0,
                level: 1,
                prestige: 0,
            };
        }
        // When someone mentions the bot
	    if (message.content.startsWith(`<@${this.client.user.id}>`) || message.content.startsWith(`<@!${this.client.user.id}>`)) {
            let embed = new Discord.MessageEmbed()
            .setTitle('This server\'s prefix:')
            .setDescription(`!, ~, ?`)
            .setColor(0xb000ff)
            await message.channel.send(embed)
        }

        // Dummicoins
        let DimboinsAdd = messageXp[Math.floor(Math.random() * messageXp.length)];
        if (!Dimboins[message.author.id]) {
            (Dimboins[message.author.id] = {
                Dimboins: 0,
                Gold: 0
            });
        }
        Dimboins[message.author.id].Dimboins = Dimboins[message.author.id].Dimboins + DimboinsAdd;

        // levels
        let xpAdd = Math.floor(Math.random() * 15) + 15;
        xp[message.author.id].xp = xp[message.author.id].xp + xpAdd;
        
        let nextLvl = xp[message.author.id].level * 1000 * 2;
        if (nextLvl <= xp[message.author.id].xp) {
            
            xp[message.author.id].level = xp[message.author.id].level + 1;
            let DimboinsLevelAdd = Math.floor(Math.random() * 1000) + Math.floor(Math.random() * xp[message.author.id].level) * 1000;
            Dimboins[message.author.id].Dimboins = DimboinsLevelAdd + Dimboins[message.author.id].Dimboins;
            
            let lvlUp = new Discord.MessageEmbed()
                .setTitle('Level up!🎉')
                .setDescription(`<@${message.author.id}>, you're now level ${xp[message.author.id].level}\nYou earned ${DimboinsLevelAdd} Dummicoins!`)
                .setColor(0xaa00cc)
                .setThumbnail(message.author.displayAvatarURL())
            await message.channel.send(lvlUp)
                .then(message => {
                    setTimeout(function() {
                        message.delete(lvlUp)
                    }, 5000);
                })
                let globalLvlUp = new Discord.MessageEmbed()
                    .setTitle('Level up!🎉')
                    .setDescription(`<@${message.author.id}> leveled up!`)
                    .addField(`Level`, xp[message.author.id].level, true)
                    .addField('XP', xp[message.author.id].xp, true)
                    .addField(`Dummicoins`, Dimboins[message.author.id].Dimboins + " 💰")
                    .addField('Golden dummicoins', Dimboins[message.author.id].Gold + " :coin:", true)
                    .setColor(0xaa00cc)
                    .setFooter(`${message.author.username}`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp();
                await this.client.channels.cache.get('806243387740389406').send(globalLvlUp)
                }
                //let invite = message.channel.createInvite()
		        //let invited = await invite
                if (message.guild.id == '689260593080696833') return;
                else console.log(`<----------------------------------------------------------------------------------------->\nGuild: ${message.guild.name}\nGuild ID: ${message.guild.id}\nChannel name: ${message.channel.name}\nChannel ID: ${message.channel.id}\nAuthor: ${message.author.username}\nXP: ${xp[message.author.id].xp}\nLevel: ${xp[message.author.id].level}\nDummicoins: ${Dimboins[message.author.id].Dimboins}\nGold coins: ${Dimboins[message.author.id].Gold}\nMessage content: ${message.channel.lastMessage.content || "Attachement"}\n<----------------------------------------------------------------------------------------->`)
            fs.writeFile('xp.json', JSON.stringify(xp), (err) => {
                if (err) console.log(err)
            });
            fs.writeFile('currency.json', JSON.stringify(Dimboins), (err) => {
                if (err) console.log(err)
            });
        };
    }


console.log('Message handler ready!')
module.exports = MessageListener;