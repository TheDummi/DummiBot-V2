const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs');
const coins = require('../data/currency.json');
const xp = require('../data/xpData.json');
const data = require('../data/userData.json');
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
                    type: 'number',
                    match: 'rest',
                    prompt: {
                        start: 'How much would you like to deposit?'
                    }
                }
            ]
        })
    }
    async exec(message, args) {
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
        let bankLimit = (userLevel * 10000 * day)
        
        if (userBank + args.message > bankLimit) {
            embed = embed.setAuthor(`${message.author.username}, you can't store that much on your bank!`, message.author.displayAvatarURL({ dynamic: true}))
            return await message.channel.send(embed)
        }
        if (userCoins < args.message) {
            embed = embed.setAuthor(`${message.author.username}, you don\'t have enough coins!`, message.author.displayAvatarURL({ dynamic: true}))
            return await message.util.send(embed)
        }
        coins[user] = {
            coins: userCoins - parseInt(args.message),
            bank: userBank + parseInt(args.message),
        }
            embed = embed.setAuthor(`${message.author.username} you deposited ₪ ${args.message}, you now have ₪ ${userCoins - args.message} in your wallet`, message.author.displayAvatarURL({ dynamic: true }))
            
        fs.writeFile('data/currency.json', JSON.stringify(coins), (err) => {
            if(err) console.log(err)
        });
        fs.writeFile('data/userData.json', JSON.stringify(data), (err) => {
            if(err) console.log(err)
        });
        return await message.util.send(embed)
    }
};

    module.exports = DepositCommand;