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
                    Dimboins: 0,
                    silver: 0,
                    Gold: 0,
                    diamond: 0
                }
            }
            
            if (!level[message.author.id]) {
                level[message.author.id] = {
                    xp: xp[message.author.id].xp,
                    level: 1,
                    respect: 0,
                    respectLevel: 0,
                }
            }
                let UserLevel = level[message.author.id].level;
                let UserCoins = coins[message.author.id].Dimboins;
                let Weekly = 100000 * UserLevel;
                let coin = UserCoins + Weekly;
                coins[message.author.id] = {
                    Dimboins: UserCoins + parseInt(Weekly),
                    silver: coins[message.author.id].silver,
                    Gold: coins[message.author.id].Gold,
                    diamond: coins[message.author.id].diamond
                }
                await message.util.send(`You received ${Weekly}, you now have ${coin}`)
            fs.writeFile("currency.json", JSON.stringify(coins), (err) => {
                if(err) console.log(err)
            });
        }
};

module.exports = WeeklyCommand;