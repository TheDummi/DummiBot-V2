const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const coins = require('../data/currency.json');
const upgrade = require('../data/upgradeData.json');
const fs = require('fs');
class BegCommand extends Command {
    constructor() {
        super('beg', {
            aliases: ['beg'],
            category: 'economy',
            description: 'Beg for money',
            cooldown: 43200000,
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
        
        let user = message.author
        let coin = coins[user.id].coins;
        let bank = coins[user.id].bank;
        let random = Math.floor(Math.random() * Math.floor(coin));
        let m = message.util;

        coins[user.id] = {
            coins: coin + random,
            bank: bank
        }
        fs.writeFile('data/currency.json', JSON.stringify(coins), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        return await m.send(`You silly, here have ₪ ${random}.`)
    }
};

module.exports = BegCommand;