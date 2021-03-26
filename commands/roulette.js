const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const coins = require('../data/currency.json');
const fs = require('fs');

class RouletteCommand extends Command {
    constructor() {
        super('roulette', {
            aliases: ['roulette'],
            category: 'economy',
            description: 'Bet on a color to win double your money',
            cooldown: 60000,
            ratelimit: 2,
            args: [
                {
                    id: 'option',
                    type: ['red', 'black'],
                    prompt: {
                        start: 'What color do you bet on? `red` or `black`?',
                        retry: 'Wrong color. `red` or `black`?',
                    }
                },
                {
                    id: 'number',
                    type: 'number',
                    match: 'rest',
                    prompt: {
                        start: 'How much are you betting?',
                    }
                }
            ]
        })
    }

    async exec(message, args) {
        if (!coins[message.author.id]) {
            coins[message.author.id] = {
                coins: 0,
                bank: 0
            }
            return await message.util.send('You have no coins to bet!')
        }
        let random = Math.floor(Math.random() * Math.floor(2));
        let option = args.option;
        let number = args.number;
        let user = message.author
        let coin = coins[user.id].coins;
        let bank = coins[user.id].bank;
        let m = message.util;
        if (coin < number) {
            return await m.send('You don\'t have that amount of coins!')
        }

        if (random == 0) {
            if (option == 'red') {
                coin = coin + (number * 2);
                await m.send('You won double your betting!')
            }
            else {
                coin = coin - number;
                await m.send('You lost your betting')
            }
        }
        if (random == 1) {
            if (option == 'black') {
                coin = coin + (number * 2);
                await m.send('You won double your betting!')
            }
            else {
                coin = coin - number;
                await m.send('You lost your betting')
            }
        }
        coins[user.id] = {
            coins: coin,
            bank: bank
        }
        fs.writeFile('data/coins.json', JSON.stringify(coins), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
    }
};

module.exports = RouletteCommand;