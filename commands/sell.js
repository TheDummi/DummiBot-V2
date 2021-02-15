const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs')
let coins = require('../currency.json')
class SellCommand extends Command {
    constructor() {
        super('sell', {
            aliases: ['sell'],
            category: 'actions',
            cooldown: 240000,
            description: 'sell golden Dummicoins',
            ownerOnly: false,
			channel: 'guild',
            args: [
                {
                    id: 'message',
                    type: 'number',
                    match: 'rest',
                    prompt: {
                        start: 'How much would you like to buy?'
                    }
                },
            ]
        })
    }
    async exec(message, args) {
            
            if(!coins[message.author.id]){
                coins[message.author.id] = {
                    Dimboins: 0,
                    Gold: 0
                }
            }

                let userCoins = coins[message.author.id].Dimboins;
                let userGold = coins[message.author.id].Gold;
                if (args.message > userGold) {
                    return await message.util.send('Not enough Golden coins!')
                }
                coins[message.author.id] = {
                    Dimboins: userCoins + parseInt(args.message * 100000),
                    Gold: userGold - Number(args.message)
                }
                
                let WithDrawEmbed = new Discord.MessageEmbed()
                .setTitle('Withdraw receipt')
                .setDescription(`<@${message.author.id}> has sold ${args.message} golden dummicoins`)
                .addField('Before', userCoins + " 💰" + "\n" + userGold + " :coin:", true)
                .addField('Withdraw', "+" + args.message * 100000 + " :coin:\n-" + args.message + " :coin:", true)
                .addField('After', userCoins + (args.message * 100000) + " 💰" + "\n" + args.message + " :coin:", true)
                .setColor(0xaa00cc)
                await message.util.send(WithDrawEmbed)
                
                fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
                    if(err) console.log(err)
                });
        }
    }

    module.exports = SellCommand;