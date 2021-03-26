const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const coins = require('../data/currency.json');
const xp = require('../data/xpData.json');
const fs = require('fs');
const userData = require('../data/userData.json');
const respect = require('../data/respectData.json');

class DailyCommand extends Command {
    constructor() {
        super('daily', {
            aliases: ['daily', 'd'],
            category: 'economy',
            description: 'Daily coins reward.',
            channel: 'guild',
            cooldown: 86400000,
        })
    }

    async exec(message) {
        let user = message.author.id;
        if (!userData[user]) {
            userData[user] = {
                work: 1,
                day: 0
            }
        }

        if (!coins[user]) {
            coins[user] = {
                coins: 0,
                bank: 0
            }
        }
        if (!respect[user]) {
            respect[user] = {
                respect: 0,
                respectLevel: 0,
            }
        }
        if (!xp[user]) {
            xp[user] = {
                xp: 0,
                level: 0,
            }
        }

        let userLevel = xp[user].level;
        let userCoins = coins[user].coins;
        let userBank = coins[user].bank;
        let daily = 1000 * userLevel;
        let coin = userCoins + daily;
        let userRespect = respect[user].respect;
        let userRespectLevel = respect[user].respectLevel;
        let xpAdd = Math.floor(Math.random() * 15) + 5;
        let embed = new Discord.MessageEmbed()
            .setColor(0xaa00cc)

        userData[user] = {
            work: userData[user].work + 1,
            day: userData[user].day
        }

        coins[user] = {
            coins: userCoins + parseInt(daily),
            bank: userBank
        }

        embed = embed
        .setAuthor(`${message.author.username}, you claimed your daily!`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Daily: ${daily}\nWallet: ${userCoins}\n---------------------\nTotal: ${coin}`)
        await message.util.send(embed)

        userRespect = userRespect + xpAdd;

        respect[user] = {
            respect: userRespect,
            respectLevel: userRespectLevel,
        }
        
        fs.writeFile('data/respectData.json', JSON.stringify(respect), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });

        fs.writeFile("data/currency.json", JSON.stringify(coins), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });

        fs.writeFile('data/userData.json', JSON.stringify(userData), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
    }
};

module.exports = DailyCommand;