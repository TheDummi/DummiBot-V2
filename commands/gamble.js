const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs');
let coins = require('../currency.json');
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
            let memberBank = coins[member.id].bank;
            let success = Math.floor(Math.random() * Math.floor(18));

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
            return await message.util.send(`You lost all of your bet, -${args.message}`)
            }
            if (success === 1) {
                //fail - all
                coins[member.id] = {
                    coins: memberCoins - parseInt(args.message),
                    bank: memberBank
                }
                return await message.util.send(`You lost all of your bet, -${args.message}`)
            }
            if (success === 2) {
                //fail - all
                coins[member.id] = {
                    coins: memberCoins - parseInt(args.message),
                    bank: memberBank
                }
                return await message.util.send(`You lost all of your bet, -${args.message}`)
            }
            if (success === 3) {
                //fail - all
                coins[member.id] = {
                    coins: memberCoins - parseInt(args.message),
                    bank: memberBank
                }
                return await message.util.send(`You lost all of your bet, -${args.message}`)
            }
            if (success === 4) {
            //fail - 1/2
            coins[member.id] = {
                coins: memberCoins - parseInt(Math.round(args.message / 2)),
                bank: memberBank
                }
            return await message.util.send(`You lost half of your bet, -${Math.round(args.message / 2)}`)
            }
            if (success === 5) {
                //fail - 1/2
                coins[member.id] = {
                    coins: memberCoins - parseInt(Math.round(args.message / 2)),
                    bank: memberBank
                    }
                return await message.util.send(`You lost half of your bet, -${Math.round(args.message / 2)}`)
                }
            if (success === 6) {
                //fail - 1/2
                coins[member.id] = {
                    coins: memberCoins - parseInt(Math.round(args.message / 2)),
                    bank: memberBank
                    }
                return await message.util.send(`You lost half of your bet, -${Math.round(args.message / 2)}`)
                }
            if (success === 7) {
                //fail - 1/2
                coins[member.id] = {
                    coins: memberCoins - parseInt(Math.round(args.message / 2)),
                    bank: memberBank
                    }
                return await message.util.send(`You lost half of your bet, -${Math.round(args.message / 2)}`)
                }
            
            if (success === 8) {
            return await message.util.send(`You won your betting back! ${args.message}`)
            }
            if (success === 9) {
                return await message.util.send(`You won your betting back! ${args.message}`)
                }
            if (success === 10) {
            //success double gamble
            coins[member.id] = {
                coins: memberCoins + parseInt(args.message),
                bank: memberBank
                }
            return await message.util.send(`You won 2x of your betting! +${args.message * 2}`)
            }
            if (success === 11) {
                //success double gamble
                coins[member.id] = {
                    coins: memberCoins + parseInt(args.message),
                    bank: memberBank
                    }
                return await message.util.send(`You won 2x of your betting! +${args.message * 2}`)
                }
            
            if (success === 12) {
            //success triple gamble
            coins[member.id] = {
                coins: memberCoins + parseInt(args.message * 2),
                bank: memberBank
                }
            return await message.util.send(`You won 3x your betting, +${args.message * 3}`)
            }
            if (success === 13) {
                //success triple gamble
                coins[member.id] = {
                    coins: memberCoins + parseInt(args.message * 2),
                    bank: memberBank
                    }
                return await message.util.send(`You won 3x your betting, +${args.message * 3}`)
                }
            if (success === 14) {
            //success quadruple gamble
            coins[member.id] = {
                coins: memberCoins + parseInt(args.message * 3),
                bank: memberBank
                }
            return await message.util.send(`You won 4x your betting, +${args.message * 4}`)
            }
            if (success === 15) {
                //success quadruple gamble
                coins[member.id] = {
                    coins: memberCoins + parseInt(args.message * 3),
                    bank: memberBank
                    }
                return await message.util.send(`You won 4x your betting, +${args.message * 4}`)
                }
                if (success === 16) {
                    //success quadruple gamble
                    coins[member.id] = {
                        coins: memberCoins + parseInt(args.message * 4),
                        bank: memberBank
                        }
                    return await message.util.send(`You won 5x your betting, +${args.message * 5}`)
                }
                if (success === 17) {
                    //success quadruple gamble
                    coins[member.id] = {
                        coins: memberCoins + parseInt(args.message * 3),
                        bank: memberBank
                        }
                    return await message.util.send(`You won 6x your betting, +${args.message * 6}`)
                }
            fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
                if(err) console.log(err)
            })
        }
    };

    module.exports = GambleCommand;