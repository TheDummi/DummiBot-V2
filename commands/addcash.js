const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs')
let coins = require('../currency.json')
class AddCashCommand extends Command {
    constructor() {
        super('addcash', {
            aliases: ['addcash', 'removecash'],
            category: 'actions',
            cooldown: 240000,
            description: 'Give Dummicoins to someone.',
            ownerOnly: true,
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
            let member = args.user.id
            
            if(!coins[member]){
                coins[member] ={
                    Dimboins: 0,
                    Gold: 0
                };
            }

            let memberCoins = coins[member].Dimboins;
            let memberGold = coins[member].Gold
            if (message.util.parsed.alias === 'addcash') {
            coins[member] = {
                Dimboins: memberCoins + parseInt(args.message),
                Gold: memberGold
            }
            let WithDrawEmbed = new Discord.MessageEmbed()
            .setDescription(`Added ${args.message} to ${args.user}`)
            .setColor(0xaa00cc)
            await message.util.send(WithDrawEmbed)
            
            fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
                if(err) console.log(err)
            })
            }
            if (message.util.parsed.alias === 'removecash') {
                if (memberCoins < args.message) {
                    return await message.util.send(`Can't remove ${args.message}`)
                }

                coins[member] = {
                    Dimboins: memberCoins - parseInt(args.message),
                    Gold: memberGold
                }
                let WithDrawEmbed = new Discord.MessageEmbed()
                .setDescription(`Taken ${args.message} from ${args.user}`)
                .setColor(0xaa00cc)
                await message.util.send(WithDrawEmbed)
                
                fs.writeFile('currency.json', JSON.stringify(coins), (err) => {
                    if(err) console.log(err)
                })
            }
        }
    }

    module.exports = AddCashCommand;