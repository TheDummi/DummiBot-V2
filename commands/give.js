const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs')
let coins = require('../currency.json')
class GiveCommand extends Command {
    constructor() {
        super('give', {
            aliases: ['give', 'pay'],
            category: 'actions',
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
                    Dimboins: 0,
                    Gold: coins[member].Gold
                };
            }

            let memberCoins = coins[member].Dimboins;
            let userCoins = coins[message.author.id].Dimboins;

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
                Dimboins: userCoins - parseInt(args.message),
                Gold: coins[member].Gold
            }
            

            coins[member] = {
                Dimboins: memberCoins + parseInt(args.message),
                Gold: coins[member].Gold
            }
            let WithDrawEmbed = new Discord.MessageEmbed()
            .setTitle('Withdraw receipt')
            .setDescription(`<@${message.author.id}> has given <@${args.user.id}> ${args.message} dummicoins`)
            .addField(`${message.author.username}'s info`, `Before: ${userCoins + args.message}\nWithdraw: -${args.message}\nAfter: ${userCoins}`, true)
            .addField(`${args.user.username}'s info`, `Before: ${memberCoins}\nWithdraw: +${args.message}\nAfter: ${memberCoins + args.message}`)
            .setColor(0xaa00cc)
            await message.util.send(WithDrawEmbed)
            
            fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
                if(err) console.log(err)
            })
        }
    }

    module.exports = GiveCommand;