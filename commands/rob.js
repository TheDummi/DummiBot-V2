const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const coins = require('../currency.json');
const fs = require('fs');
const xp = require('../xp.json')
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
        let embed = new Discord.MessageEmbed()
            .setColor(0xaa00cc)
        let member = args.user;
        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0,
                level: 1,
                respect: 0,
                respectLevel: 1,
                prestige: 0,
            };
        }
        let argsCoins = coins[member.id].coins;
        let argsBank = coins[member.id].bank;
        let userCoins = coins[message.author.id].coins;
        let userBank = coins[message.author.id].bank;

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
        }
        else {
            embed = embed.setAuthor(`${message.author.username}, ${failures()}`, message.author.displayAvatarURL({ dynamic: true }))
        }
        let userXp = xp[message.author.id].xp;
        let userLevel = xp[message.author.id].level;
        let userRespect = xp[message.author.id].respect;
        let userLevelRespect = xp[message.author.id].respectLevel;
        let xpAdd = Math.floor(Math.random() * 15) + 15;
        userRespect = userRespect - xpAdd;
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
        fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
            if(err) console.log(err)
        })
        return await message.util.send(embed)
    }
};

module.exports = RobCommand;