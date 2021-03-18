const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const coins = require('../data/currency.json');
const fs = require('fs');

class FlipCoinCommand extends Command {
    constructor() {
        super('flipcoin', {
            aliases: ['flipcoin', 'coinflip', 'flip', 'coin'],
            category: 'fun',
            description: 'Flip a coin.',
            ownerOnly: false,
            channel: ['guild', 'dm'],
            args: [
                {
                    id: 'guess',
                    type: ['tails', 'heads'],
                    match: 'rest'
                }
            ]
        })
    }
    async exec(message, args) {
        let coin = coins[message.author.id].coins;
        let bank = coins[message.author.id].bank;
        let random = (Math.floor(Math.random() * Math.floor(2)));
        let headEmbed = new Discord.MessageEmbed()
        .setTitle('I flipped heads')
        .setColor(0Xaa00cc);
        let TailEmbed = new Discord.MessageEmbed()
        .setTitle('I flipped tails')
        .setColor(0xaa00cc);
        if(args.guess == undefined) {
            if(random === 0) {
                message.util.send(headEmbed);
            }
            else {
                message.util.send(TailEmbed);
            }
        }
        if (args.guess == 'tails') {
            if(random === 1) {
                TailEmbed = TailEmbed.setDescription('you won 1000 coins')
                message.util.send(TailEmbed);
                coins[message.author.id] = {
                    coins: coin + 1000,
                    bank: bank
                }
            }
            else {
                headEmbed = headEmbed.setDescription('you lost 1000 coins')
                message.util.send(headEmbed)
                coins[message.author.id] = {
                    coins: coin - 1000,
                    bank: bank
                }
            }
        }
        if (args.guess == 'heads') {
            if(random === 0) {
                headEmbed = headEmbed.setDescription('you won 1000 coins')
                message.util.send(headEmbed);
                coins[message.author.id] = {
                    coins: coin + 1000,
                    bank: bank
                }
            }
            else {
                TailEmbed = TailEmbed.setDescription('you lost 1000 coins')
                message.util.send(TailEmbed);
                coins[message.author.id] = {
                    coins: coin - 1000,
                    bank: bank
                }
            }
        }
		fs.writeFile('data/currency.json', JSON.stringify(coins), (err) => {
            if (err) console.log(err)
        })
	}
};

module.exports = FlipCoinCommand;