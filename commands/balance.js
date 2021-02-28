const fs = require('fs')
const Discord = require('discord.js')
const { Command } = require('discord-akairo')
const currency = require('../currency.json')
const xp = require('../xp.json')
const data = require('../data.json');
class BalanceCommand extends Command {
    constructor() {
        super('balance', {
            aliases: ['balance', 'bal', 'credits', 'cred'],
            category: 'economy',
            description: 'Coins Balance',
            channel: ['guild'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                }
            ]
        })
    };
    
    async exec(message, args) {

// Define member as first mentioned member or message author, define gold, and balance for member
        let member = args.user || message.author;

// If the member doesn't have any dummicoins, set defaults
        if (!currency[message.author.id]){
            currency[message.author.id] = {
                coins: 0,
                bank: 0
            }
        }
        if (!currency[member.id]){
            currency[member.id] = {
                coins: 0,
                bank: 0
            }
        }
        
        let coinsBalance = currency[member.id].coins;
        let bankBalance = currency[member.id].bank;
        let userLevel = xp[member.id].level;
        let work = data[member.id].work;
        let bankLimit = userLevel * 10000 * work
// Send embed on use of command
        let BalEmbed = new Discord.MessageEmbed()
        .setAuthor(`${member.username}'s wallet`, member.displayAvatarURL())
        .addField('| Wallet', coinsBalance, true)
        .addField('| Bank', bankBalance + "/" + bankLimit, true )
        .setColor(0xaa00cc)
        
        try {
            message.util.send(BalEmbed)
        }
        catch {
            message.channel.send(`${member}, does not have any balance yet...`)
        }
        fs.writeFile('currency.json', JSON.stringify(currency), (err) => {
            if(err) console.log(err)
        });
    }
};

module.exports = BalanceCommand;