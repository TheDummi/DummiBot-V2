const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const fs = require('fs')
let coins = require('../data/currency.json')
const xp = require('../data/xpData.json')
class GiveCommand extends Command {
    constructor() {
        super('give', {
            aliases: ['give', 'pay'],
            category: 'economy',
            cooldown: 240000,
            description: 'Give coins to someone.',
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
        let embed = new Discord.MessageEmbed()
            .setColor(0xaa00cc)
        if(!coins[message.author.id]){
            coins[message.author.id] = {
                coins: 0,
                bank: 0
            }
            embed = embed.setAuthor(`${message.author.username}, you don't have any coins.`, message.author.displayAvatarURL({ dynamic: true}))
            
        }
        let member = args.user
        if(!coins[member.id]){
            coins[member.id] ={
                coins: 0,
                bank: 0
            };
        }

        let memberCoins = coins[member.id].coins;
        let userCoins = coins[message.author.id].coins;

        if(userCoins < args.message) {
            embed = embed.setAuthor(`${message.author.username}, you don't have enough coins.`, message.author.displayAvatarURL({ dynamic: true}))
        }

        else {
        coins[message.author.id] = {
            coins: userCoins - parseInt(args.message),
            bank: coins[message.author.id].bank
        }
        coins[member.id] = {
            coins: memberCoins + parseInt(args.message),
            bank: coins[member.id].bank
        }
            fs.writeFile('data/currency.json', JSON.stringify(coins), (err) => {
                let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
            });
        embed = embed.setAuthor(`${message.author.username}, you given ₪ ${args.message} to ${member.username}`, member.displayAvatarURL({ dynamic: true }))
        }
        return await message.util.send(embed)
    }
};

module.exports = GiveCommand;