const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs')
let coins = require('../currency.json')
const xp = require('../xp.json')
class GiveCommand extends Command {
    constructor() {
        super('give', {
            aliases: ['give', 'pay'],
            category: 'economy',
            cooldown: 240000,
            description: 'Give Dummicoins to someone.',
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
                },
                {
                    id: 'message',
                    type: 'number',
                    match: 'rest',
                    prompt: {
                        start: 'How much would you like to gift?'
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

            let member = args.user.id
            
            if(!coins[member]){
                coins[member] ={
                    coins: 0,
                    silver: 0,
                    Gold: 0,
                    diamond: 0
                };
            }

            let memberCoins = coins[member].coins;
            let userCoins = coins[message.author.id].coins;

            if(userCoins < args.message) {
                let NotEnoughEmbed = new Discord.MessageEmbed()
                .setTitle('Not enough coins to give!')
                return await message.util.send(NotEnoughEmbed)
                .then(message => {
                    setTimeout(function(){
                        message.delete(NotEnoughEmbed)
                    }, 5000)
                })
            }

            coins[message.author.id] = {
                coins: userCoins - parseInt(args.message),
                bank: coins[message.author.id].bank
            }
            

            coins[member] = {
                coins: memberCoins + parseInt(args.message),
                bank: coins[member].bank
            }
            let WithDrawEmbed = new Discord.MessageEmbed()
            .setTitle('Withdraw receipt')
            .setDescription(`<@${message.author.id}> has given <@${args.user.id}> ${args.message} dummicoins`)
            .addField(`${message.author.username}'s info`, `Before: ${userCoins + args.message}\nWithdraw: -${args.message}\nAfter: ${userCoins}`, true)
            .addField(`${args.user.username}'s info`, `Before: ${memberCoins}\nWithdraw: +${args.message}\nAfter: ${memberCoins + args.message}`)
            .setColor(0xaa00cc)
            await message.util.send(WithDrawEmbed)
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
            fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
                if(err) console.log(err)
            })
        }
    }

    module.exports = GiveCommand;