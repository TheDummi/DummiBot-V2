const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const coins = require('../currency.json');
const level = require('../xp.json')
const fs = require('fs');

class DailyCommand extends Command {
    constructor() {
        super('daily', {
            aliases: ['daily', 'd'],
            category: 'fun',
            description: 'Claim a reward everyday!',
            channel: 'guild',
            cooldown: 86400000,
        })
    }
        async exec(message) {
            
            if (!coins[message.author.id]) {
                coins[message.author.id] = {
                    Dimboins: 0
                }
            }
            
            if (!level[message.author.id]) {
                level[message.author.id] = {
                    level: 1
                }
            }
                let UserLevel = level[message.author.id].level;
                let UserCoins = coins[message.author.id].Dimboins;
                let daily = 1000 * UserLevel;
                let coin = UserCoins + daily;
                coins[message.author.id] = {
                    Dimboins: UserCoins + parseInt(daily)
                }
                await message.util.send(`You received ${daily}, you now have ${coin}`)
            fs.writeFile("currency.json", JSON.stringify(coins), (err) => {
                if(err) console.log(err)
            });
        }
};

module.exports = DailyCommand;