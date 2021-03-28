const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs');
const coins = require('../data/currency.json');
const xp = require('../data/xpData.json');
const data = require('../data/userData.json');
const upgrade = require('../data/upgradeData.json');
class DepositCommand extends Command {
    constructor() {
        super('deposit', {
            aliases: ['deposit','dep'],
            category: 'economy',
            description: 'Deposit coins to the bank.',
            ownerOnly: false,
			channel: 'guild',
            args: [
                {
                    id: 'message',
                    type: 'string',
                    prompt: {
                        start: 'How much would you like to deposit?'
                    }
                }
            ]
        })
    }
    async exec(message, args) {
        if (upgrade[message.author.id].curHp <= 0) {
            return await message.util.send('You are dead, use a revive to revive yourself!')
        }
        let user = message.author.id
        let embed = new Discord.MessageEmbed()
            .setColor(0xaa00cc)

        if (!data[user]) {
            data[user] = {
                work: 0,
                day: 0
            }
        }

        if (!coins[user]){
            coins[user] = {
                coins: 0,
                bank: 0
            }
            embed = embed.setAuthor(`${message.author.username}, you don't have any coins!`, message.author.displayAvatarURL({ dynamic: true}))
            return await message.util.send(embed)
        }

        let userCoins = coins[user].coins;
        let userBank = coins[user].bank;
        let userLevel = xp[user].level;
        let work = data[user].work;
        let day = data[user].day;
        if (work == 0) {
            work = 1
        }
        let bankLimit = (userLevel * 10000 * work)
        let a;
        if (args.message == 'all') {
            if (userBank >= bankLimit) {
                return await message.util.send('You already have a full bank!')
            }
            if (userCoins < bankLimit) {
                a = userCoins
            }
            if (userBank <= 0) {
                a = bankLimit
            }
            if (userCoins > bankLimit - userBank) {
                a = bankLimit - userBank
            }
            
        }
        else {
            if (isNaN(args.message)) {
                return message.util.send('Not a valid amount.')
            }
            if (userBank + Number(args.message) > bankLimit) {
                embed = embed.setAuthor(`${message.author.username}, you can't store that much on your bank!`, message.author.displayAvatarURL({ dynamic: true}))
                return await message.channel.send(embed)
            }
            if (userCoins < Number(args.message)) {
                embed = embed.setAuthor(`${message.author.username}, you don\'t have enough coins!`, message.author.displayAvatarURL({ dynamic: true}))
                return await message.util.send(embed)
            }
            a = Number(args.message)
        }
        coins[user] = {
            coins: userCoins - parseInt(a),
            bank: userBank + parseInt(a),
        }
            embed = embed.setAuthor(`${message.author.username} you deposited ₪ ${a}, you now have ₪ ${userCoins - a} in your wallet`, message.author.displayAvatarURL({ dynamic: true }))
            
        fs.writeFile('data/currency.json', JSON.stringify(coins), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        fs.writeFile('data/userData.json', JSON.stringify(data), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        return await message.util.send(embed)
    }
};

    module.exports = DepositCommand;