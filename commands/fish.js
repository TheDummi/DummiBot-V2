const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fishing = require('../data/fishingData.json');
const storage = require('../data/storageData.json');
const upgrade = require('../data/upgradeData.json');
const fishTime = new Set()
const fs = require('fs');
class FishCommand extends Command {
    constructor() {
        super('fish', {
            aliases: ['fish'],
            category: 'stats',
            description: 'Go fish for fish, sell these goods to earn money',
            channel: 'guild',
            args: [
                {
                    id: 'time',
                    type: ['1', '2', '4', '8', '12', '24'],
                    prompt: {
                        start: 'How long would you like to go fish for? `1`, `2`, `4`, `8`, `12` or `24` h?',
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
        if (storage[message.author.id].rod <= 0) {
            return await message.util.send('You can\'t hunt without a fishing rod!')
        }
        if (fishTime.has(message.author.id)) {
            return await message.util.send('You\'re already fishing!')
        }
        else {
            if (!fishing[message.author.id]) {
                fishing[message.author.id] = {
                    fish: 0,
                }
            }
            let a;
            let random;
            let i;
            let user = message.author;
            let time = args.time;

            // skills
            let skillPoints = upgrade[user.id].skillPoints;
            let health = upgrade[user.id].health;
            let curHp = upgrade[user.id].curHp;
            let attack = upgrade[user.id].attack;
            let storageMin = upgrade[user.id].storage;
            let storageMax = upgrade[user.id].storageSpace;
            let stealth = upgrade[user.id].stealth;
            let critical = upgrade[user.id].critical;
            
            // animals
            let fish = fishing[message.author.id].fish

            let embed = new Discord.MessageEmbed()
                .setColor(0xaa00cc)
                .setAuthor(`${user.username}, you are back from fishing!`)
            if (time == '1') {
                a = 3600000;
                setTimeout(() => {
                    random = Math.floor(Math.random() * Math.floor(11));
                    i = random;
                }, a)
            }
            if (time == '2') {
                if (stealth < 10) {
                    return message.util.send('You\'re not stealthy enough to fish this long')
                }
                a = 7200000;
                setTimeout(() => {
                    random = Math.floor(Math.random() * Math.floor(31));
                    i = random;
                }, a)
            }
            if (time == '4') {
                if (stealth < 20) {
                    return message.util.send('You\'re not stealthy enough to fish this long')
                }
                a = 14400000;
                setTimeout(() => {
                    random = Math.floor(Math.random() * Math.floor(51))
                    i = random
                }, a)
            }
            if (time == '8') {
                if (stealth < 30) {
                    return message.util.send('You\'re not stealthy enough to fish this long')
                }
                a = 28800000;
                setTimeout(() => {
                    random = Math.floor(Math.random() * Math.floor(91))
                    i = random
                }, a)
            }
            if (time == '12') {
                if (stealth < 40) {
                    return message.util.send('You\'re not stealthy enough to fish this long')
                }
                a = 43200000;
                setTimeout(() => {
                    random = Math.floor(Math.random() * Math.floor(131))
                    i = random
                }, a)
            }
            if (time == '24') {
                if (stealth < 50) {
                    return message.util.send('You\'re not stealthy enough to fish this long')
                }
                a = 86400000;
                setTimeout(() => {
                    random = Math.floor(Math.random() * Math.floor(251))
                    i = random
                }, a)
            }
            await message.util.send(`You went fishing for ${time}h`)
            fishTime.add(message.author.id)
                setTimeout(async () => {
                        embed = embed
                            .setDescription(`You caught:`)
                            .addField('🐟', random)
                        fish = fish + i
                        try {
                            await message.author.send(embed)
                        }
                        catch {
                            await message.util.send(user, embed)
                        }
                        
                        upgrade[user.id] = {
                            skillPoints: skillPoints,
                            curHp: curHp,
                            health: health,
                            attack: attack,
                            storage: storageMin + i,
                            storageSpace: storageMax,
                            stealth: stealth,
                            critical: critical,
                        }
                    fishing[message.author.id] = {
                            fish: fish
                        }
                    fs.writeFile('data/fishingData.json', JSON.stringify(fishing), (err) => {
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
                fishTime.delete(message.author.id)
            }, a)
        }
    }
};

module.exports = FishCommand;