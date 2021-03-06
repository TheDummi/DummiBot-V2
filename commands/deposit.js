const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs');
const coins = require('../currency.json');
const xp = require('../xp.json');
const data = require('../data.json');
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
                },
            ]
        })
    }
    async exec(message, args) {

        let embed = new Discord.MessageEmbed()
            .setColor(0xaa00cc)
        if(!coins[message.author.id]){
            coins[message.author.id] = {
                coins: 0,
                bank: 0
            }
            embed = embed.setAuthor(`${message.author.username}, you don't have any coins!`, message.author.displayAvatarURL({ dynamic: true}))
            return await message.util.send(embed)
        }

        let userCoins = coins[message.author.id].coins;
        let userBank = coins[message.author.id].bank;
        let userLevel = xp[message.author.id].level;
        let work = data[message.author.id].work;
        let day = data[message.author.id].day;
        let bankLimit = (userLevel * 10000 * day)
        
        if (userBank + args.message > bankLimit) {
            embed = embed.setAuthor(`${message.author.username}, you can't store that much on your bank!`, message.author.displayAvatarURL({ dynamic: true}))
            return await message.channel.send(embed)
        }
        if (userCoins < args.message) {
            embed = embed.setAuthor(`${message.author.username}, you don\'t have enough coins!`, message.author.displayAvatarURL({ dynamic: true}))
            return await message.util.send(embed)
        }
        coins[message.author.id] = {
            coins: userCoins - parseInt(args.message),
            bank: userBank + parseInt(args.message),
        }
            embed = embed.setAuthor(`${message.author.username} you deposited ₪ ${args.message}, you now have ₪ ${userCoins - args.message} in your wallet`, message.author.displayAvatarURL({ dynamic: true }))
            
        fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
            if(err) console.log(err)
        });
        return await message.util.send(embed)
    }
};

    module.exports = DepositCommand;