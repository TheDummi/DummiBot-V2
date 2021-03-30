const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const coins = require('../data/currency.json');
const fs = require('fs');
const xp = require('../data/respectData.json');
const upgrade = require('../data/upgradeData.json');
const ignored = new Set()
class RobCommand extends Command {
    constructor() {
        super('rob', {
            aliases: ['rob', 'steal'],
            category: 'economy',
            ratelimit: 3,
            cooldown: 300000,
            description: 'Steal coins from someone.',
            ownerOnly: false,
			channel: 'guild',
            args: [
                {
                    id: 'user',
                    type: 'user',
                    prompt: {
                        start: 'Who would you like to gift?',
                        retry: 'Invalid user, Who would you like to gift?',
                    }
                }
            ]
        })
    }

    async exec(message, args) {
        if (upgrade[message.author.id].curHp <= 0) {
            return await message.util.send('You are dead, use a revive to revive yourself!')
        }
        let embed = new Discord.MessageEmbed()
            .setColor(0xaa00cc)
        let member = args.user;
        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                respect: 0,
                respectLevel: 1,
            };
        }
        let argsCoins = coins[member.id].coins;
        let argsBank = coins[member.id].bank;
        let userCoins = coins[message.author.id].coins;
        let userBank = coins[message.author.id].bank;
        
        if (ignored.has(args.user.id)) return await message.util.send(`${args.user} is currently immune.`);
    	else {
            const random = Math.floor(Math.random() * argsCoins);
            const failure = [
                'you got caught sneaking!',
                'you were found!',
                `you almost ran of with ₪ ${random}, but you got caught!`,
                'you were so close!',
                'if you\'re going to steal something, at least be quiet about it...'
            ];
            const failures = () => failure[Math.floor(Math.random() * failure.length)];
            const successRate = Math.floor(Math.random() * Math.floor(2));

            if(member.bot == true) {
                embed = embed.setAuthor(`${message.author.username}, you can't steal from bots!`, message.author.displayAvatarURL({ dynamic: true }))
            }

            if(!coins[member.id]) {
                coins[member.id] = {
                    coins: 0,
                    bank: 0,
                }
                embed = embed.setAuthor(`${message.author.username}, ${member.username} doesn't have any coins!`, message.author.displayAvatarURL({ dynamic: true }))
            }
            if (coins[member.id].coins < 0) {
                return await message.util.send('This person is already in the red zone!')
            }
            if (successRate === 0) {
                coins[message.author.id] = {
                    coins: userCoins + parseInt(random),
                    bank: userBank
                }

                coins[args.user.id] = {
                    coins: argsCoins - parseInt(random),
                    bank: argsBank
                }
                embed = embed.setAuthor(`${message.author.username}, you stole ₪ ${random} from ${member.username}`, message.author.displayAvatarURL({ dynamic: true }))
                try {
                    member.send(`${message.author.username} stole ₪ ${random} from you in ${message.guild.name}.`)
                }
                catch {
                    return;
                }
            }
            else {
                embed = embed.setAuthor(`${message.author.username}, ${failures()}`, message.author.displayAvatarURL({ dynamic: true }))
            }
            let userRespect = xp[message.author.id].respect;
            let userLevelRespect = xp[message.author.id].respectLevel;
            let xpAdd = Math.floor(Math.random() * 15) + 15;
            userRespect = userRespect - xpAdd;
            xp[message.author.id] = {
                respect: userRespect,
                respectLevel: userLevelRespect,
            }
            fs.writeFile('data/xpData.json', JSON.stringify(xp), (err) => {
                let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
            })
            fs.writeFile('data/currency.json', JSON.stringify(coins), (err) => {
                let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
            })
            ignored.add(args.user.id);
            setTimeout(() => {
                ignored.delete(args.user.id)
            }, 3600000);
            return await message.util.send(embed)
        }
    }
};

module.exports = RobCommand;