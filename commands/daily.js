const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const coins = require('../currency.json');
const level = require('../xp.json');
const fs = require('fs');
const xp = require('../xp.json');
const data = require('../data.json');

class DailyCommand extends Command {
    constructor() {
        super('daily', {
            aliases: ['daily', 'd'],
            category: 'economy',
            description: 'Claim a reward everyday!',
            channel: 'guild',
            cooldown: 86400000,
        })
    }
        async exec(message) {
            
            if (!data[message.author.id]) {
                data[message.author.id] = {
                    work: 1,
                    day: 0
                }
            }


            if (!coins[message.author.id]) {
                coins[message.author.id] = {
                    coins: 0,
                    bank: 0
                }
            }
            
            if (!level[message.author.id]) {
                level[message.author.id] = {
                    xp: level[message.author.id].xp,
                    level: 0,
                    respect: 0,
                    respectLevel: 1,
                    prestige: 0
                }
            }
                let UserLevel = level[message.author.id].level;
                let userCoins = coins[message.author.id].coins;
                let userBank = coins[message.author.id].bank;
                let daily = 1000 * UserLevel;
                let coin = userCoins + daily;
                data[message.author.id] = {
                    work: data[message.author.id].work + 1,
                    day: data[message.author.id].day
                }
                coins[message.author.id] = {
                    coins: userCoins + parseInt(daily),
                    bank: userBank
                }
                let embed = new Discord.MessageEmbed()
                    .setAuthor(`${message.author.username} you claimed a daily of ${daily}, you now have ${coin} in your wallet`, message.author.displayAvatarURL({ dynamic: true }))
                    .setColor(0xaa00cc)
                await message.util.send(embed)
                let userXp = xp[message.author.id].xp;
                let userLevel = xp[message.author.id].level;
                let userRespect = xp[message.author.id].respect;
                let userLevelRespect = xp[message.author.id].respectLevel;
                let xpAdd = Math.floor(Math.random() * 15) + 5;
                userRespect = userRespect + xpAdd;
                xp[message.author.id] = {
                    xp: userXp,
                    level: userLevel,
                    respect: userRespect,
                    respectLevel: userLevelRespect,
                    prestige: 0,
                }
                fs.writeFile('xp.json', JSON.stringify(level), (err) => {
                    if (err) console.log(err)
                })
            fs.writeFile("currency.json", JSON.stringify(coins), (err) => {
                if(err) console.log(err)
            });
            fs.writeFile('data.json', JSON.stringify(data), (err) => {
                if (err) console.log(err)
            })
        }
};

module.exports = DailyCommand;