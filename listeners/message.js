const { Listener, Command } = require('discord-akairo');
const moment = require('moment');
const Discord = require('discord.js');
const fs = require('fs');
const data = require('../data/userData.json')
const { getReactions } = require('../funcs.js');
const xp = require('../data/xpData.json');
const respect = require('../data/respectData.json');
const Dimboins = require('../data/currency.json')
const channelID = require('../data/channelData.json');
const settings = require('../data/settings.json');
const usesData = require('../data/usesData.json');
const storage = require('../data/storageData.json');
const serverData = require('../data/serverData.json');
const upgrade = require('../data/upgradeData.json');
const customCooldown = new Set()
class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {

    if (message.author.bot) return;
    if (message.content == Command.id) {
        if (!Object.keys(usesData.cmduses).includes(Command.id)) {
            usesData.cmduses[Command.id] = 1
        }
        else {
            usesData.cmduses[Command.id]++
        }
        fs.writeFileSync('data/usesData.json', JSON.stringify(usesData));
    }

    if (!upgrade[message.author.id]) {
        upgrade[message.author.id] = {
            skillPoints: 1,
            curHp: 100,
            health: 100,
            attack: 10,
            storage: 0,
            storageSpace: 400,
            stealth: 1,
            critical: 2,
        }
    }

    if (!storage[message.author.id]) {
        storage[message.author.id] = {
            cheese: 0,
            bandages: 0,
            medkit: 0,
            revives: 0,
            rifle: 0
        }
    }

    if (!settings) {
        settings = {
            xp: 15,
            coins: 11
        }
    }

    if (!xp[message.author.id]) {
        xp[message.author.id] = {
            xp: 0,
            level: 1,
        };
    }

    if (!Dimboins[message.author.id]) {
        Dimboins[message.author.id] = {
            coins: 0,
            bank: 0
        };
    }

    if (!respect[message.author.id])
        respect[message.author.id] = {
            respect: 0,
            respectLevel: 1
        }
    try {
        if (data[message.guild.id].reactions == true && Math.random() < 0.05) {
            message.react(message.guild.emojis.cache.get(message.guild.emojis.cache.randomKey()));
        }
    
        if (!data[message.guild.id])
                data[message.guild.id] = {
                    reactions: false,
                    prefix: null
                }
        if (!channelID[message.guild.id]) {
            channelID[message.guild.id] = {
                level: null,
                report: null,
                warn: null,
                moderation: null,
                welcome: null,
                leave: null,
                suggestions: null,
            }
        }
    }
    catch {
        return;
    }

    /*let suggestions = channelID[message.guild.id].suggestions;
    suggestions = this.client.channels.cache.get(suggestions)
    if (suggestions == undefined || null) return;
    if (suggestions) {
    let messages = await suggestions.messages.fetch()
        messages.forEach(async message => {
            if (message.content.startsWith('=>')) return;
            message.react('\u2705')
            message.react('\u274c')
        })
    }*/

    if (message.content.startsWith(`<@${this.client.user.id}>`) || message.content.startsWith(`<@!${this.client.user.id}>`)) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Prefix')
            .setDescription(`\`~\`, \`dummi \``)
            .setColor(0xb000ff)
            if (serverData[message.guild.id].prefix !== undefined || null) {
                embed = embed.addField('Custom prefix for this server', "`" + serverData[message.guild.id].prefix + "`")
            }
            embed
            await message.channel.send(embed)
        .then(message => {
            setTimeout(function() {
                message.delete(embed)
            }, 30000)
        });
    }

// Defined variables
    let user = message.author.id;
    let userSkillPoints = upgrade[user].skillPoints;
    let curHp = upgrade[user].curHp;
    let rifle = storage[user].rifle;
    let userHealth = upgrade[user].health;
    let userAttack = upgrade[user].attack;
    let storageMin = upgrade[user].storage;
    let userStorage = upgrade[user].storageSpace;
    let userStealth = upgrade[user].stealth;
    let userCritical = upgrade[user].critical;
    let userCoins = Dimboins[user].coins;
    let userBank = Dimboins[user].bank;
    let userXp = xp[user].xp;
    let userLevel = xp[user].level;
    let userRespect = respect[user].respect;
    let userLevelRespect = respect[user].respectLevel;
    let rank = [xp.level].sort().reverse().indexOf(userXp);
    let timestamp = Number(new Date());
    const TimeMoment = () => moment(timestamp).format("H:mm");
    let xpRate = settings.xp;
    let coinsRate = settings.coins;
    
// on message, Dummicoins per message
    let coinsAdd = Math.floor(Math.random() * Math.random(coinsRate)) + 1;
    userCoins = userCoins + coinsAdd;
// On message, level xp
    let xpAdd = Math.floor(Math.random() * xpRate) + 15;
    if (customCooldown.has(message.author.id)) return;
    else {

        userXp = userXp + xpAdd;
        
        customCooldown.add(message.author.id);
        setTimeout(() => {
            customCooldown.delete(message.author.id)

        }, 10000);
    };
// On next level, level up
    let nextLvl = userLevel * 1000 * 2;
    let nextRespectLevel = userLevelRespect * 100;
    if (nextRespectLevel <= userRespect) {

        userLevelRespect = userLevelRespect + 1;

        respect[message.author.id] = {
            respect: userRespect,
            respectLevel: userLevelRespect,
        }

        await message.channel.send(`You reached respect level ${userLevelRespect}!`)
    }

    if (nextRespectLevel - 100 > userRespect) {
        
        userLevelRespect = userLevelRespect - 1;

        respect[message.author.id] = {
            respect: userRespect,
            respectLevel: userLevelRespect,
        }

        await message.channel.send(`You're back at respect level ${userLevelRespect}!`)
    }
    if (nextLvl <= userXp) {
    
    userLevel = userLevel + 1;

    userSkillPoints = userSkillPoints + 1;

    let coinsLevelAdd = Math.floor(Math.random() * 1000) + Math.floor(Math.random() * xp[message.author.id].level) * 1000;
    userCoins = coinsLevelAdd + userCoins;

    let lvlUp = new Discord.MessageEmbed()
        .setTitle('Level up!🎉')
        .setDescription(`<@${message.author.id}>, you're now level ${xp[message.author.id].level}\nYou earned ${coinsLevelAdd} coins! And A skill point!`)
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

    let globalLvlUp = new Discord.MessageEmbed()
        .setTitle('Level up!🎉')
        .setDescription(`<@${message.author.id}> leveled up!`)
        .addField(`Level`, userLevel, true)
        .addField('Respect level', userLevelRespect, true)
        .addField('Server', message.guild.name, true)
        .addField(`Coins`, userCoins + userBank, true)
        .setColor(0xaa00cc)
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
    await this.client.channels.cache.get('806243387740389406').send(globalLvlUp);
    }

    Dimboins[message.author.id] = {
        coins: userCoins,
        bank: userBank
    }

    xp[message.author.id] = {
        xp: userXp,
        level: userLevel,
    }
    upgrade[message.author.id] = {
        skillPoints: userSkillPoints,
        curHp: curHp,
        health: userHealth,
        attack: userAttack,
        storage: storageMin,
        storageSpace: userStorage,
        stealth: userStealth,
        critical: userCritical,
    }
    fs.writeFile('data/xpData.json', JSON.stringify(xp), (err) => {
        let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
    });

    fs.writeFile('data/respectData.json', JSON.stringify(respect), (err) => {
        let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
    });

    fs.writeFile('data/currency.json', JSON.stringify(Dimboins), (err) => {
        let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
    });
    fs.writeFile('data/upgradeData.json', JSON.stringify(upgrade), (err) => {
        let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
    });
    fs.writeFile('data/storageData.json', JSON.stringify(storage), (err) => {
        let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
    });
    fs.writeFile('data/channelData.json', JSON.stringify(channelID), (err) => {
        let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
    });
    fs.writeFile('data/serverData.json', JSON.stringify(serverData), (err) => {
        let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
    });
    fs.writeFile('data/upgradeData.json', JSON.stringify(upgrade), (err) => {
        let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
    });
    }
};

module.exports = MessageListener;