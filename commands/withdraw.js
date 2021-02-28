const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs')
let coins = require('../currency.json')
class WithdrawCommand extends Command {
    constructor() {
        super('withdraw', {
            aliases: ['withdraw', 'wit'],
            category: 'economy',
            description: 'Withdraw coins from your bank',
            ownerOnly: false,
			channel: 'guild',
            args: [
                {
                    id: 'message',
                    type: 'number',
                    match: 'rest',
                    prompt: {
                        start: 'How much would you like to sell?'
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
            .setAuthor(`${message.author.username} you don't have any dummicoins!`, message.author.displayAvatarURL())
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

        if (args.message > userBank) {
            return await message.util.send('You don\'t have that amount of coins!')
        }
            coins[message.author.id] = {
                coins: userCoins + parseInt(args.message),
                bank: userBank - parseInt(args.message),
            }
            message.util.send(`You withdrawn ${args.message} coins!`)
// Write changes to ../currency.json
        fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
            if(err) console.log(err)
        });
    }
};

module.exports = WithdrawCommand;