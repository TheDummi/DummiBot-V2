const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const hunting = require('../data/huntingData.json');
const storage = require('../data/storageData.json');
const upgrade = require('../data/upgradeData.json');
const huntTime = new Set()
const restTime = new Set()
const fs = require('fs');

class HuntCommand extends Command {
    constructor() {
        super('hunt', {
            aliases: ['hunt'],
            category: 'economy',
            description: 'Go hunt for animals, sell these goods to earn money',
            args: [
                {
                    id: 'time',
                    type: ['1', '2', '4', '8', '12', '24'],
                    prompt: {
                        start: 'How long would you like to go hunt for? `1`, `2`, `4`, `8`, `12` or `24` h?',
                        retry: 'How long? `1`, `2`, `4`, `8`, `12` or `24` h?'
                    }
                },

            ]
        })
    }

    async exec(message, args) {
        if (upgrade[message.author.id].curHp <= 0) {
            return await message.util.send('You are dead, use a revive to revive yourself!')
        }
        if (upgrade[message.author.id].storage >= upgrade[message.author.id].storageSpace) {
            return await message.util.send('You have no storage space left.')
        }
        if (storage[message.author.id].rifle <= 0) {
            return await message.util.send('You can\'t hunt without a rifle!')
        }
        if (huntTime.has(message.author.id)) {
            return await message.util.send('You\'re already on a hunt!')
        }
        else if (restTime.has(message.author.id)) {
            return await message.util.send('You\'re tired. Rest and go hunt later.')
        }
        else {
            if (!hunting[message.author.id]) {
                hunting[message.author.id] = {
                    pigeon: 0,
                    pig: 0,
                    goat: 0,
                    fox: 0, 
                    rabbit: 0,
                    deer: 0,
                    tiger: 0,
                    lion: 0,
                    buffalo: 0,
                }
            }
            let a;
            let user = message.author;
            let time = args.time;

            // skills
            let skillPoints = upgrade[user.id].skillPoints;
            let health = upgrade[user.id].health;
            let curHp = upgrade[user.id].curHp
            let attack = upgrade[user.id].attack;
            let storageMin = upgrade[user.id].storage;
            let storageMax = upgrade[user.id].storageSpace;
            let stealth = upgrade[user.id].stealth;
            let critical = upgrade[user.id].critical;
            
            // animals
            let pigeon = hunting[user.id].pigeon;
            let pig = hunting[user.id].pig;
            let goat = hunting[user.id].goat;
            let fox = hunting[user.id].fox;
            let rabbit = hunting[user.id].rabbit;
            let deer = hunting[user.id].deer;
            let tiger = hunting[user.id].tiger;
            let lion = hunting[user.id].lion;
            let buffalo = hunting[user.id].buffalo;

            let random = Math.floor(Math.random() * Math.floor(5)) + 1
            let embed = new Discord.MessageEmbed()
                .setColor(0xaa00cc)
                .setAuthor(`${user.username}, you are back from hunting!`)
            if (time == '1') {
                a = 3600000;
                setTimeout(() => {
                pigeon = pigeon + random;
                rabbit = rabbit + random;
                embed = embed
                    .addField('🐦', pigeon)
                    .addField('🐇', rabbit)
                }, a)
            }
            if (time == '2') {
                if (stealth < 10) {
                    return message.util.send('You\'re not stealthy enough to hunt ')
                }
                a = 7200000;
                setTimeout(() => {
                pig = pig + random;
                goat = goat + random;
                embed = embed
                    .addField('🐖', pig)
                    .addField('🐐', goat)
                }, a)
            }
            if (time == '4') {
                if (stealth < 20) {
                    return message.util.send('You\'re not stealthy enough to hunt ')
                }
                a = 14400000;
                setTimeout(() => {
                fox = fox + random;
                embed = embed
                    .addField('🦊', fox)
                }, a)
            }
            if (time == '8') {
                if (stealth < 30) {
                    return message.util.send('You\'re not stealthy enough to hunt ')
                }
                a = 28800000;
                setTimeout(() => {
                deer = deer + random;
                embed = embed
                    .addField('🦌', deer)
                }, a)
            }
            if (time == '12') {
                if (stealth < 40) {
                    return message.util.send('You\'re not stealthy enough to hunt ')
                }
                a = 43200000;
                setTimeout(() => {
                tiger = tiger + random;
                lion = lion + random;
                embed = embed
                    .addField('🐅', tiger)
                    .addField('🦁', lion)
                }, a)
            }
            if (time == '24') {
                if (stealth < 50) {
                    return message.util.send('You\'re not stealthy enough to hunt ')
                }
                a = 86400000;
                setTimeout(() => {
                buffalo = buffalo + random;
                embed = embed
                    .addField('🐃', buffalo)
                }, a)
            }
            await message.util.send(`You went hunting for ${time}h`)
            huntTime.add(message.author.id)
                setTimeout(async () => {
                    try {
                        await message.author.send(embed)
                    }
                    catch {
                        await message.util.send(user, embed)
                    }
                    huntTime.delete(message.author.id)
                }, a)
            restTime.add(message.author.id)
                setTimeout(() => {
                    restTime.delete(message.Author.id)
                }, a + (a/2))
                upgrade[user.id] = {
                    skillPoints: skillPoints,
                    curHp: curHp - Math.floor(Math.random() * Math.floor(curHp/2)),
                    health: health,
                    attack: attack,
                    storage: storageMin + random,
                    storageSpace: storageMax,
                    stealth: stealth,
                    critical: critical,
                }
                hunting[message.author.id] = {
                    pigeon: pigeon,
                    pig: pig,
                    goat: goat,
                    fox: fox, 
                    rabbit: rabbit,
                    deer: deer,
                    tiger: tiger,
                    lion: lion,
                    buffalo: buffalo,
                }
            fs.writeFile('data/huntingData.json', JSON.stringify(hunting), (err) => {
                let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
            });
            fs.writeFile('data/upgradeData.json', JSON.stringify(upgrade), (err) => {
                let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
            });
        }
    }
}

module.exports = HuntCommand;