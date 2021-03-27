const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const coins = require('../data/currency.json');
const level = require('../data/xpData.json')
const fs = require('fs');
const upgrade = require('../data/upgradeData.json');

class WeeklyCommand extends Command {
    constructor() {
        super('weekly', {
            aliases: ['weekly', 'w'],
            category: 'economy',
            description: 'Claim a weekly reward.',
            channel: 'guild',
            cooldown: 604800000,
        })
    }
    async exec(message) {
        if (upgrade[message.author.id].curHp <= 0) {
            return await message.util.send('You are dead, use a revive to revive yourself!')
        }
        if (!coins[message.author.id]) {
            coins[message.author.id] = {
                coins: 0,
                bank: 0
            }
        }
        
        if (!level[message.author.id]) {
            level[message.author.id] = {
                xp: 0,
                level: 1,
            }
        }
            let UserLevel = level[message.author.id].level;
            let userCoins = coins[message.author.id].coins;
            let userBank = coins[message.author.id].bank;

            let Weekly = 10000 * UserLevel;
            let coin = userCoins + Weekly;
            coins[message.author.id] = {
                coins: coin,
                bank: userBank
            }
        fs.writeFile("data/currency.json", JSON.stringify(coins), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        let embed = new Discord.MessageEmbed()
            .setColor(0xaa00cc)
            .setAuthor(`${message.author.username}, you claimed your weekly!`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Weekly: ${Weekly}\nWallet: ${userCoins}\n---------------------\nTotal: ${coin}`)
        return await message.util.send(embed)
    }
};

module.exports = WeeklyCommand;