const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs       = require('fs');
const userData = require('../data/userData.json');
const xp       = require('../data/xpData.json');
const respect  = require('../data/respectData.json');
const coins    = require('../data/currency.json');
const storage  = require('../data/storageData.json');
const upgrade  = require('../data/upgradeData.json');
const hunting  = require('../data/huntingData.json');

class ResetCommand extends Command {
    constructor() {
        super('reset', {
            aliases: ['reset'],
            category: 'bot maker',
            description: 'Reset someone\'s progress in any progression.',
            ownerOnly: true,
            args: [
                {
                    id: 'option',
                    type: ['level', 'respect', 'coins', 'userdata', 'storage', 'upgrades', 'hunting', 'all'],
                    prompt: {
                        start: 'What would you like to reset?\n`level`, \n`respect`, \n`coins`, \n`userdata`, \n`storage`, \n`upgrades`, \n`hunting`, \n`all`',
                    }
                },
                {
                    id: 'user',
                    type: 'user',
                    prompt: {
                        start: 'Who are you going to reset?'
                    }
                }
            ]
        })
    }
    async exec(message, args) {
        let user = args.user;
        let option = args.option;
        if (option == 'upgrades') {
            upgrade[user.id] = {
                skillPoints: xp[user.id].level,
                curHp: 100,
                health: 100,
                attack: 10,
                storage: upgrade[user.id].storage,
                storageSpace: 400,
                stealth: 1,
                critical: 2,
            }
        }
    
        if (option == 'storage') {
            storage[user.id] = {
                cheese: 0,
                bandages: 0,
                medkit: 0,
                revives: 0,
                rifle: 0
            }
        }
    
        if (option == 'level') {
            xp[user.id] = {
                xp: 0,
                level: 1,
            };
        }
    
        if (option == 'coins') {
            coins[user.id] = {
                coins: 0,
                bank: 0
            };
        }
    
        if (option == 'respect')
            respect[user.id] = {
                respect: 0,
                respectLevel: 1
            }

        if (option == 'userdata') {
            userData[user.id] = {
                work: 0,
                day: 0
            }
        }

        if (option == 'hunting') {
            hunting[user.id] = {
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
        if (option == 'all') {
                upgrade[user.id] = {
                    skillPoints: 1,
                    curHp: 100,
                    health: 100,
                    attack: 10,
                    storage: 0,
                    storageSpace: 400,
                    stealth: 1,
                    critical: 2,
                }
        
                storage[user.id] = {
                    cheese: 0,
                    bandages: 0,
                    medkit: 0,
                    revives: 0,
                    rifle: 0
                }
        
                xp[user.id] = {
                    xp: 0,
                    level: 1,
                }
        
                coins[user.id] = {
                    coins: 0,
                    bank: 0
                }
        
                respect[user.id] = {
                    respect: 0,
                    respectLevel: 1
                }
                
                userData[user.id] = {
                    work: 0,
                    day: 0
                }
    
                hunting[user.id] = {
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
        await message.util.send(`Reset ${option} for ${args.user}`)
        fs.writeFile('data/xpData.json', JSON.stringify(xp), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                    .setTitle('JSON OVERLOAD')
                    .setColor(0xaa00cc)
                    .setDescription(`\`\`\`json\n${err}\`\`\``)
                if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        fs.writeFile('data/respectData.json', JSON.stringify(respect), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                    .setTitle('JSON OVERLOAD')
                    .setColor(0xaa00cc)
                    .setDescription(`\`\`\`json\n${err}\`\`\``)
                if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        fs.writeFile('data/currency.json', JSON.stringify(coins), (err) => {
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
        fs.writeFile('data/storageData.json', JSON.stringify(storage), (err) => {
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
        fs.writeFile('data/userData.json', JSON.stringify(userData), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
        fs.writeFile('data/huntingData.json', JSON.stringify(hunting), (err) => {
            let errEmbed = new Discord.MessageEmbed()
            .setTitle('JSON OVERLOAD')
            .setColor(0xaa00cc)
            .setDescription(`\`\`\`json\n${err}\`\`\``)
        if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
    }
}

module.exports = ResetCommand;