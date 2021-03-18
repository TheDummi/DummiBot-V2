const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs');
const coins = require('../data/currency.json');
class GambleCommand extends Command {
    constructor() {
        super('gamble', {
            aliases: ['gamble'],
            category: 'economy',
            description: 'Gamble coins',
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

        let embed = new Discord.MessageEmbed()
            .setColor(0xaa00cc)
        if(!coins[message.author.id]){
            coins[message.author.id] = {
                coins: 0,
                bank: 0
            }
            embed = embed.setAuthor(`${message.author.username} you don't have any coins!`, message.author.displayAvatarURL({ dynamic: true}))
        }

        let member = message.author;
        let memberCoins = coins[member.id].coins;
        let memberBank = coins[member.id].bank;
        let success = Math.floor(Math.random() * Math.floor(18));

        if(memberCoins < args.message) {
            embed = embed.setAuthor(`${message.author.username} you don't enough coins!`, message.author.displayAvatarURL({ dynamic: true}))
        }
        
        if (success === 17) {
        coins[member.id] = {
            coins: memberCoins - parseInt(args.message),
            bank: memberBank
        }
            embed = embed.setAuthor(`${message.author.username}, you lost all of your bet, -₪ ${args.message}`, message.author.displayAvatarURL({ dynamic: true}))
        }
        if (success === 16) {
            coins[member.id] = {
                coins: memberCoins - parseInt(args.message),
                bank: memberBank
            }
            embed = embed.setAuthor(`${message.author.username}, you lost all of your bet, -₪ ${args.message}`, message.author.displayAvatarURL({ dynamic: true}))
        }
        if (success === 15) {
            coins[member.id] = {
                coins: memberCoins - parseInt(args.message),
                bank: memberBank
            }
            embed = embed.setAuthor(`${message.author.username}, you lost all of your bet, -₪ ${args.message}`, message.author.displayAvatarURL({ dynamic: true}))
        }
        if (success === 14) {
            coins[member.id] = {
                coins: memberCoins - parseInt(args.message),
                bank: memberBank
            }
            embed = embed.setAuthor(`${message.author.username}, you lost all of your bet, -₪ ${args.message}`, message.author.displayAvatarURL({ dynamic: true}))
        }
        if (success === 13) {
        coins[member.id] = {
            coins: memberCoins - parseInt(Math.round(args.message / 2)),
            bank: memberBank
            }
            embed = embed.setAuthor(`${message.author.username}, you lost half of your bet , -₪ ${Math.round(args.message / 2)}`, message.author.displayAvatarURL({ dynamic: true}))
        }
        if (success === 12) {
            coins[member.id] = {
                coins: memberCoins - parseInt(Math.round(args.message / 2)),
                bank: memberBank
                }
            embed = embed.setAuthor(`${message.author.username}, you lost half of your bet, -₪ ${Math.round(args.message / 2)}`, message.author.displayAvatarURL({ dynamic: true}))
            }
        if (success === 11) {
            coins[member.id] = {
                coins: memberCoins - parseInt(Math.round(args.message / 2)),
                bank: memberBank
                }
            embed = embed.setAuthor(`${message.author.username}, you lost half of your bet, -₪ ${Math.round(args.message / 2)}`, message.author.displayAvatarURL({ dynamic: true}))
            }
        if (success === 10) {
            coins[member.id] = {
                coins: memberCoins - parseInt(Math.round(args.message / 2)),
                bank: memberBank
                }
            embed = embed.setAuthor(`${message.author.username}, you lost half of your bet, -₪ ${Math.round(args.message / 2)}`, message.author.displayAvatarURL({ dynamic: true}))
            }
        
        if (success === 9) {
            embed = embed.setAuthor(`${message.author.username}, you won your betting back, ₪ ${args.message}`, message.author.displayAvatarURL({ dynamic: true}))
        }
        if (success === 8) {
            embed = embed.setAuthor(`${message.author.username}, you won your betting back, ₪ ${args.message}`, message.author.displayAvatarURL({ dynamic: true}))
            }
        if (success === 7) {
            coins[member.id] = {
                coins: memberCoins + parseInt(args.message),
                bank: memberBank
                }
            embed = embed.setAuthor(`${message.author.username}, you won double your bet, +₪ ${args.message * 2}`, message.author.displayAvatarURL({ dynamic: true}))
        }
        if (success === 6) {
            coins[member.id] = {
                coins: memberCoins + parseInt(args.message),
                bank: memberBank
                }
            embed = embed.setAuthor(`${message.author.username}, you won double your bet, +₪ ${args.message * 2}`, message.author.displayAvatarURL({ dynamic: true}))
            }
        
        if (success === 5) {
            coins[member.id] = {
                coins: memberCoins + parseInt(args.message * 2),
                bank: memberBank
                }
            embed = embed.setAuthor(`${message.author.username}, you won 3x your bet, +₪ ${args.message * 3}`, message.author.displayAvatarURL({ dynamic: true}))
        }
        if (success === 4) {
            //success triple gamble
            coins[member.id] = {
                coins: memberCoins + parseInt(args.message * 2),
                bank: memberBank
                }
            embed = embed.setAuthor(`${message.author.username}, you won 3x your bet, +₪ ${args.message * 3}`, message.author.displayAvatarURL({ dynamic: true}))
            }
        if (success === 3) {
            coins[member.id] = {
                coins: memberCoins + parseInt(args.message * 3),
                bank: memberBank
                }
            embed = embed.setAuthor(`${message.author.username}, you won 4x your bet, +₪ ${args.message * 4}`, message.author.displayAvatarURL({ dynamic: true}))
        }
        if (success === 2) {
            coins[member.id] = {
                coins: memberCoins + parseInt(args.message * 3),
                bank: memberBank
                }
            embed = embed.setAuthor(`${message.author.username}, you won 4x your bet, +₪ ${args.message * 4}`, message.author.displayAvatarURL({ dynamic: true}))
        }
        if (success === 1) {
            coins[member.id] = {
                coins: memberCoins + parseInt(args.message * 4),
                bank: memberBank
                }
            embed = embed.setAuthor(`${message.author.username}, you won 5x your bet, +₪ ${args.message * 5}`, message.author.displayAvatarURL({ dynamic: true}))
        }
        if (success === 0) {
            coins[member.id] = {
                coins: memberCoins + parseInt(args.message * 3),
                bank: memberBank
                }
            embed = embed.setAuthor(`${message.author.username}, you won 6x your bet, +₪ ${args.message * 6}`, message.author.displayAvatarURL({ dynamic: true}))
        }
        fs.writeFile('data/currency.json', JSON.stringify(coins), (err) => {
            if(err) console.log(err)
        })
        return await message.util.send(embed)
    }
};

module.exports = GambleCommand;