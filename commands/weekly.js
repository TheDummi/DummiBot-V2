const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const coins = require('../currency.json');
const level = require('../xp.json')
const fs = require('fs');

class WeeklyCommand extends Command {
    constructor() {
        super('weekly', {
            aliases: ['weekly', 'w'],
            category: 'economy',
            description: 'Claim a reward every week!',
            channel: 'guild',
            cooldown: 604800000,
        })
    }
        async exec(message) {
            
            if (!coins[message.author.id]) {
                coins[message.author.id] = {
                    coins: 0,
                    bank: 0
                }
            }
            
            if (!level[message.author.id]) {
                level[message.author.id] = {
                    xp: xp[message.author.id].xp,
                    level: 1,
                    respect: 0,
                    respectLevel: 0,
                    prestige: 0
                }
            }
                let UserLevel = level[message.author.id].level;
                let userCoins = coins[message.author.id].coins;
                let userBank = coins[message.author.id].bank;

                let Weekly = 100000 * UserLevel;
                let coin = userCoins + Weekly;
                coins[message.author.id] = {
                    coins: userCoins + parseInt(Weekly),
                    bank: userBank
                }
                await message.util.send(`You received ${Weekly}, you now have ${coin} in your wallet!`)
            fs.writeFile("currency.json", JSON.stringify(coins), (err) => {
                if(err) console.log(err)
            });
        }
};

module.exports = WeeklyCommand;