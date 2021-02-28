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
            description: 'Steal Dummicoins from someone.',
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

// Defined amounts
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
            'You got caught sneaking!',
            'You were found!',
            `You almost ran of with ${random}, but you got caught!`,
            'You were so close!',
            'If you\'re going to steal something, at least be quiet about it...'
        ];
        const failures = () => failure[Math.floor(Math.random() * failure.length)];
        const successRate = Math.floor(Math.random() * Math.floor(2));

// If mentioned user is a bot, return a message, telling the message author, bots can't be stolen from
        if(member.bot == true) {
            let BotEmbed = new Discord.MessageEmbed()
            .setTitle('You cannot steal from bots')
            .setColor(0xaa00cc)
            return await message.channel.send(BotEmbed)
        }

// If the mentioned user does not have any coins, set amount, and send a message to current channel
        if(!coins[member.id]) {
            coins[member.id] = {
                coins: 0,
                bank: 0,
            }
        return await message.util.send(`${member} does not have any dummicoins!`)
        }
        
// If successRate is 0 you steal a certain amount
        if (successRate === 0) {
            coins[message.author.id] = {
                coins: userCoins + parseInt(random),
                bank: userBank
            }

            coins[args.user.id] = {
                coins: argsCoins - parseInt(random),
                bank: argsBank
            }
            let WinEmbed = new Discord.MessageEmbed()
                .setColor(0xaa00cc)
                .setAuthor(`You stole ${random} dummicoins from ${args.user.username}`, message.author.displayAvatarURL())
            await message.util.send(WinEmbed)
        }

// In all other cases, you lose
        else {
            return await message.util.send(failures())
        }

// Write changes to ../currency.json
        
        let userXp = xp[message.author.id].xp;
        let userLevel = xp[message.author.id].level;
        let userRespect = xp[message.author.id].respect;
        let userLevelRespect = xp[message.author.id].respectLevel;
        let xpAdd = Math.floor(Math.random() * 15) + 5;
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
    }
};

module.exports = RobCommand;