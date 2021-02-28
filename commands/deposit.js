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
            description: 'Deposit your money to the bank',
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
// If the message author has no coins, set coins.
        if(!coins[message.author.id]){
            coins[message.author.id] = {
                coins: 0,
                bank: 0
            }

// Send a message to the current channel, to let the message author know he has not enough coins.
        let NoCoinsEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} you don't have any coins!`, message.author.displayAvatarURL())
            .setColor(0xaa00cc)
        return await message.util.send(NoCoinsEmbed)
            .then(message => {
                setTimeout(function(){
                    message.delete(NoCoinsEmbed)
                }, 5000)
            });
        }

// Defined coins and gold
        let userCoins = coins[message.author.id].coins;
        let userBank = coins[message.author.id].bank;
        let userLevel = xp[message.author.id].level;
        let work = data[message.author.id].work;
        let bankLimit = userLevel * 10000 * work

// If the message author does have enough, subtract userCoins, add userGold
        
        if (userBank + args.message > bankLimit) {
            return await message.channel.send('You can\'t store that much on your bank!')
        }
        if (userCoins < args.message) {
            return await message.util.send('You don\'t have enough coins!')
        }
        coins[message.author.id] = {
            coins: userCoins - parseInt(args.message),
            bank: userBank + parseInt(args.message),
        }
        message.util.send(`You deposited ${args.message} coins!`)
// Write changes to ../currency.json
        fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
            if(err) console.log(err)
        });
    }
};

    module.exports = DepositCommand;