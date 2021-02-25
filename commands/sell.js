const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs')
let coins = require('../currency.json')
class SellCommand extends Command {
    constructor() {
        super('sell', {
            aliases: ['sell'],
            category: 'economy',
            description: 'sell golden Dummicoins',
            ownerOnly: false,
			channel: 'guild',
            args: [
                {
                    id: 'choice',
                    type: ['gold', 'diamond', 'silver'],
                    prompt: {
                        start: 'What would you like to sell? silver, gold or diamond?',
                    }
                },
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
        let choice = args.choice
// If the message author has no coins, set coins.
        if(!coins[message.author.id]){
            coins[message.author.id] = {
                Dimboins: 0,
                silver: 0,
                Gold: 0,
                diamond: 0,
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
        let userCoins = coins[message.author.id].Dimboins;
        let userSilver = coins[message.author.id].silver;
        let userGold = coins[message.author.id].Gold;
        let userDiamond = coins[message.author.id].diamond;

// If the message author does have enough, subtract userCoins, add userGold
        if (choice == 'silver') {
            if (userSilver < args.message) {
                return await message.util.send('Not enough silver!')
            }
            coins[message.author.id] = {
                Dimboins: userCoins + parseInt(args.message * 10000),
                silver: userSilver - parseInt(args.message),
                Gold: userGold,
                diamond: userDiamond
            }
            message.util.send(`You sold ${args.message} silver!`)
        }

        if (choice == 'gold') {
            if (userGold < args.message) {
                return await message.util.send('Not enough gold!')
            }
            coins[message.author.id] = {
            Dimboins: userCoins,
            silver: userSilver + parseInt(args.message * 1000),
            Gold: userGold - parseInt(args.message),
            diamond: userDiamond
            }
        message.util.send(`You sold ${args.message} gold!`)
        }
        if (choice == 'diamond') {
            if (userDiamond < args.message) {
                return await message.util.send('Not enough diamond!')
            }
            coins[message.author.id] = {
                Dimboins: userCoins,
                silver: userSilver,
                Gold: userGold + parseInt(args.message * 100),
                diamond: userDiamond - parseInt(args.message)
            }
            message.util.send(`You sold ${args.message} diamond!`)
        }
// Write changes to ../currency.json
        fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
            if(err) console.log(err)
        });
    }
};

module.exports = SellCommand;