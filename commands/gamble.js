const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs')
let coins = require('../currency.json')
const xp = require('../xp.json')
class GambleCommand extends Command {
    constructor() {
        super('gamble', {
            aliases: ['gamble'],
            category: 'economy',
            description: 'Gamble your coins',
            cooldown: 3600000,
            ratelimit: 30,
            ownerOnly: false,
			channel: 'guild',
            args: [
                {
                    id: 'message',
                    type: 'number',
                    match: 'rest',
                    prompt: {
                        start: 'How much would you like to gamble??'
                    }
                },
            ]
        })
    }
    async exec(message, args) {

        if(!coins[message.author.id]){
            let NoCoinsEmbed = new Discord.MessageEmbed()
                .setTitle('You don\'t have any dummicoins!')
                return await message.util.send(NoCoinsEmbed)
                .then(message => {
                    setTimeout(function(){
                        message.delete(NoCoinsEmbed)
                    }, 5000)
                })
        }

            let member = message.author;
            let memberCoins = coins[member.id].coins;
            let memberBank = coins[member.id].bank
            let success = Math.floor(Math.random() * Math.floor(6));

            if(memberCoins < args.message) {
                let NotEnoughEmbed = new Discord.MessageEmbed()
                .setTitle('Not enough coins to give!')
                return await message.util.send(NotEnoughEmbed)
                .then(message => {
                    setTimeout(function(){
                        message.delete(NotEnoughEmbed)
                    }, 5000)
                })
            }
            
            if (success === 0) {
            //fail - all
            coins[member.id] = {
                coins: memberCoins - parseInt(args.message),
                bank: memberBank
            }
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
            let xpAdd = Math.floor(Math.random() * 5) + 5;
            userRespect = userRespect - xpAdd;
            xp[message.author.id] = {
                xp: userXp,
                level: userLevel,
                respect: userRespect,
                respectLevel: userLevelRespect,
                prestige: 0,
            }
            return await message.util.send(`You lost all of your bet, ${args.message}`)
            }
            if (success === 1) {
            //fail - 1/2
            coins[member.id] = {
                coins: memberCoins - parseInt(Math.round(args.message / 2)),
                bank: memberBank
                }
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
            let xpAdd = Math.floor(Math.random() * 5) + 5;
            userRespect = userRespect - xpAdd;
            xp[message.author.id] = {
                xp: userXp,
                level: userLevel,
                respect: userRespect,
                respectLevel: userLevelRespect,
                prestige: 0,
            }
            return await message.util.send(`You lost half of your bet, ${Math.round(args.message / 2)}`)
            }
            
            if (success === 2) {
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
            return await message.util.send(`You won your betting back! ${args.message}`)
            }
            if (success === 3) {
            //success double gamble
            coins[member.id] = {
                coins: memberCoins + parseInt(args.message),
                bank: memberBank
                }
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
            return await message.util.send(`You won double of your betting! ${args.message * 2}`)
            }
            
            if (success === 4) {
            //success triple gamble
            coins[member.id] = {
                coins: memberCoins + parseInt(args.message * 2),
                bank: memberBank
                }
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
            return await message.util.send(`You won triple your betting, ${args.message * 3}`)
            }
            
            if (success === 5) {
            //success quadruple gamble
            coins[member.id] = {
                coins: memberCoins + parseInt(args.message * 3),
                bank: memberBank
                }
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
            
            return await message.util.send(`You won quadruple your betting, ${args.message * 4}`)
            }
            fs.writeFile('xp.json', JSON.stringify(xp), (err) => {
                if (err) console.log(err)
            })
            fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
                if(err) console.log(err)
            })
        }
    };

    module.exports = GambleCommand;