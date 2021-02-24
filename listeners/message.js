const { Listener } = require('discord-akairo');
const Discord = require('discord.js');
const fs = require('fs');
const data = require('../data.json')
const { getReactions} = require('../funcs.js');
let xp = require('../xp.json');
let Dimboins = require('../currency.json')
const channelID = require('../serverData.json');
const settings = require('../developer.json');

class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message, command) {
// Check if the message author is a bot
    if (message.author.bot) return;

// Random reactions
    /* if (getReactions(message) === true && Math.random() < 0.05){ 
        number = 5;
        message.react(message.guild.emojis.cache.get(message.guild.emojis.cache.randomKey()));
    }*/

// Suggestion channels
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
    if (this.client.channels.cache.get('812453291593957426') === message.channel) {
        message.delete()
        let m = message.channel.send(message.channel.name + "!!!")
        .then(message => {
            setTimeout(function() {
                message.delete(m)
            }, 5000)
        })
        
    }
    if (this.client.channels.cache.get('812445240978964513') === message.channel) {
        message.delete()
    }

// When someone mentions the bot
    if (message.content.startsWith(`<@${this.client.user.id}>`) || message.content.startsWith(`<@!${this.client.user.id}>`)) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Prefix')
            .setDescription(`\`~\`, \`dummi \``)
            .setColor(0xb000ff)
                await message.channel.send(embed)
        .then(message => {
            setTimeout(function() {
                message.delete(embed)
            }, 30000)
        });
    }

// Set reasonable defaults for levels
    if (!xp[message.author.id]) {
        xp[message.author.id] = {
            xp: 0,
            level: 1,
            respect: 0,
            respectLevel: 1,
            prestige: 0,
        };
    }

// Set reasonable defaults for coins
    if (!Dimboins[message.author.id]) {
        Dimboins[message.author.id] = {
            Dimboins: 0,
            silver: 0,
            Gold: 0,
            diamond: 0
        };
    }

// Defined variables
    let userCoins = Dimboins[message.author.id].Dimboins;
    let userGold = Dimboins[message.author.id].Gold;
    let userXp = xp[message.author.id].xp;
    let userLevel = xp[message.author.id].level;
    let userRespect = xp[message.author.id].respect;
    let userLevelRespect = xp[message.author.id].respectLevel;
    let userDiamond = Dimboins[message.author.id].diamond;
    let userSilver = Dimboins[message.author.id].silver;
    let rank = [xp.level].sort().reverse().indexOf(userXp);
    if (!settings) {
        settings = {
            xp: 15,
            coins: 11
        }
    }
    let xpRate = settings.xp;
    let coinsRate = settings.coins;

// on message, Dummicoins per message
    let coinsAdd = Math.floor(Math.random() * Math.random(coinsRate)) + 1;
    userCoins = userCoins + coinsAdd;
    console.log(`${message.author.username}, has ${userCoins} coins, ${userSilver} silver, ${userGold} gold, ${userDiamond} diamonds, ${userXp} xp and is level ${userLevel}. Respect: ${userRespect}, level: ${userLevelRespect}`)
// On message, level xp
    let xpAdd = Math.floor(Math.random() * xpRate) + 15;
    userXp = userXp + xpAdd;

// On next level, level up
    let nextLvl = userLevel * 1000 * 2;
    let nextRespectLevel = userLevelRespect * 100;
    if (nextRespectLevel <= userRespect) {
        
        userLevelRespect = userLevelRespect + 1;

        xp[message.author.id] = {
            xp: userXp,
            level: userLevel,
            respect: userRespect,
            respectLevel: userLevelRespect,
            prestige: 0,
        }
        await message.channel.send(`You reached respect level ${userLevelRespect}!`)
    }
    if (nextRespectLevel - 500 > userRespect) {
        
        userLevelRespect = userLevelRespect - 1;

        xp[message.author.id] = {
            xp: userXp,
            level: userLevel,
            respect: userRespect,
            respectLevel: userLevelRespect,
            prestige: 0,
        }
        await message.channel.send(`You're back at respect level ${userLevelRespect}!`)
    }
    if (nextLvl <= userXp) {
    
// level + 1 in xp.json
    userLevel = userLevel + 1;

// On level up, add X-amount of coins
    let coinsLevelAdd = Math.floor(Math.random() * 1000) + Math.floor(Math.random() * xp[message.author.id].level) * 1000;
    userCoins = coinsLevelAdd + userCoins;

// On level up, send a message to the current channel, delete in 5 seconds
    let lvlUp = new Discord.MessageEmbed()
        .setTitle('Level up!🎉')
        .setDescription(`<@${message.author.id}>, you're now level ${xp[message.author.id].level}\nYou earned ${coinsLevelAdd} Dummicoins!`)
        .setColor(0xaa00cc)
        .setThumbnail(message.author.displayAvatarURL())
    try {
        let channel = channelID[message.guild.id].level;
        channel = this.client.channels.cache.get(channel)
        let m = await channel.send(message.author, lvlUp)
    }
    catch {
        await message.channel.send(lvlUp)
        .then(message => {
            setTimeout(function() {
                message.delete(lvlUp)
            }, 5000);
        });
    }

// On level up, send a message to #global-levels in Dummi Studios.
    let globalLvlUp = new Discord.MessageEmbed()
        .setTitle('Level up!🎉')
        .setDescription(`<@${message.author.id}> leveled up!`)
        .addField(`Level`, userLevel, true)
        .addField('XP', userXp, true)
        .addField('Server', message.guild.name, true)
        .addField(`Dummicoins`, userCoins + " 💰")
        .addField('Golden dummicoins', userGold + " :coin:", true)
        .setColor(0xaa00cc)
        .setFooter(`${message.author.username}`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp();
    await this.client.channels.cache.get('806243387740389406').send(globalLvlUp);
    }
    xp[message.author.id] = {
        xp: userXp,
        level: userLevel,
        respect: userRespect,
        respectLevel: userLevelRespect,
        prestige: 0,
    }
// Update xp.json with XP, and Levels
    fs.writeFile('xp.json', JSON.stringify(xp), (err) => {
        if (err) console.log(err)
    });
    Dimboins[message.author.id] = {
        Dimboins: userCoins,
        silver: userSilver,
        Gold: userGold,
        diamond: userDiamond
    }
// Update currency.json with dummicoins and golden dummicoins
    fs.writeFile('currency.json', JSON.stringify(Dimboins), (err) => {
        if (err) console.log(err)
    });
    };
}


console.log('Message handler ready!');
module.exports = MessageListener;