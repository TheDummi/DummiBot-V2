const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs');
const data = require('../data.json');
const coins = require('../currency.json');
const xp = require('../xp.json')

class WorkCommand extends Command {
    constructor() {
        super('work', {
            aliases: ['work'],
            category: 'economy',
            description: 'Work for dummicoins',
            cooldown: 3600000,
        })
    }

    async exec(message) {

        if (!data[message.author.id]) {
            data[message.author.id] = {
                work: 0,
                day: 1
            }
        }

        if (!coins[message.author.id]) {
            coins[message.author.id] = {
                Dimboins: 0,
                silver: 0,
                Gold: 0,
                diamonds: 0,
            }
        }

        let work = data[message.author.id].work * 1000
        let hour = data[message.author.id].day * 100
        if (data[message.author.id].work == 0) {
            return await message.channel.send('You need to claim 1 daily before you can start working')
        }
        coins[message.author.id] = {
            Dimboins: coins[message.author.id].Dimboins + parseInt(work + hour),
            silver: coins[message.author.id].silver,
            Gold: coins[message.author.id].Gold,
            diamond: coins[message.author.id].diamond
        }
        data[message.author.id] = {
            work: data[message.author.id].work,
            day: data[message.author.id].day + 1
        }
        await message.util.send(`Your ${data[message.author.id].work}days of work has been rewarded in ${work}! You've worked a total of ${data[message.author.id].day}h, this gave you a bonus of ${hour}`)
        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0,
                level: 1,
                respect: 0,
                respectLevel: 1,
                prestige: 0,
            };
        }
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
        fs.writeFile('xp.json', JSON.stringify(xp), (err) => {
            if (err) console.log(err)
        })
        fs.writeFile('data.json', JSON.stringify(data), (err) => {
            if (err) console.log(err)
        })
    }
}

module.exports = WorkCommand;