const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs');
const data = require('../data/userData.json');
const coins = require('../data/currency.json');
const xp = require('../data/xpData.json');
const respect = require('../data/respectData.json');

class WorkCommand extends Command {
    constructor() {
        super('work', {
            aliases: ['work'],
            category: 'economy',
            description: 'Work for coins',
            cooldown: 3600000,
        })
    }

    async exec(message) {
        let embed = new Discord.MessageEmbed()
            .setColor(0xaa00cc)
        if (!data[message.author.id]) {
            data[message.author.id] = {
                work: 0,
                day: 1
            }
        }

        if (!coins[message.author.id]) {
            coins[message.author.id] = {
                coins: 0,
                bank: 0
            }
        }

        let work = data[message.author.id].work * 1000
        let hour = data[message.author.id].day * 100
        if (data[message.author.id].work == 0) {
            embed = embed.setAuthor(`${message.author.username}, you need to claim 1 daily before being able to work!`, message.author.displayAvatarURL({ dynamic: true }))
        }
        coins[message.author.id] = {
            coins: coins[message.author.id].coins + parseInt(work + hour),
            bank: coins[message.author.id].bank
        }
        data[message.author.id] = {
            work: data[message.author.id].work,
            day: data[message.author.id].day + 1
        }
        if (!respect[message.author.id]) {
            respect[message.author.id] = {
                respect: 0,
                respectLevel: 1,
            };
        }
        let userRespect = xp[message.author.id].respect;
        let userLevelRespect = xp[message.author.id].respectLevel;
        let xpAdd = Math.floor(Math.random() * 15) + 5;
        userRespect = userRespect + xpAdd;
        respect[message.author.id] = {
            respect: userRespect,
            respectLevel: userLevelRespect,
        }
        fs.writeFile('data/respectData.json', JSON.stringify(respect), (err) => {
            if (err) console.log(err)
        })
        fs.writeFile('data/userData.json', JSON.stringify(data), (err) => {
            if (err) console.log(err)
        })
        embed = embed.setAuthor(`${message.author.username}, your ${data[message.author.id].work} days of work has been rewarded in ₪ ${work}! You've worked a total of ${data[message.author.id].day}h, this gave you a bonus of ₪ ${hour}`, message.author.displayAvatarURL({ dynamic: true }))
        return await message.channel.send(embed)
    }
}

module.exports = WorkCommand;