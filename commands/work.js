const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs');
const data = require('../data/userData.json');
const coins = require('../data/currency.json');
const xp = require('../data/xpData.json');
const respect = require('../data/respectData.json');
const upgrade = require('../data/upgradeData.json');

class WorkCommand extends Command {
    constructor() {
        super('work', {
            aliases: ['work'],
            category: 'economy',
            description: 'Work for coins',
            channel: 'guild',
            cooldown: 3600000,
        })
    }

    async exec(message) {
        if (upgrade[message.author.id].curHp <= 0) {
            return await message.util.send('You are dead, use a revive to revive yourself!')
        }
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
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        })
        fs.writeFile('data/userData.json', JSON.stringify(data), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        })
        let days = data[message.author.id].work;
        let hours = data[message.author.id].day;
        embed = embed
            .setAuthor(`${message.author.username}, you worked for 1h!`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Day loan: ${work}\nHour loan: ${hour}\n----------------------\nTotal loan: ${work + hour}`)
            .addField('Total days', days, true)
            .addField('Total hours', hours, true)
        return await message.channel.send(embed)
    }
}

module.exports = WorkCommand;