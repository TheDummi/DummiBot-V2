const fs = require('fs')
const Discord = require('discord.js')
const { Command } = require('discord-akairo')
const currency = require('../currency.json')
const xp = require('../xp.json')
const data = require('../data.json');
const { GuildMemberManager } = require('discord.js')
const { GuildMember } = require('discord.js')
class BalanceCommand extends Command {
    constructor() {
        super('balance', {
            aliases: ['balance', 'bal', 'credits', 'cred'],
            category: 'economy',
            description: 'View your or someone else\'s balance.',
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
        if (!data[member.id]) {
            data[member.id] = {
                work: 0,
                day: 0
            }
        }
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
        let day = data[member.id].day;
        let bankLimit = userLevel * 10000 * day;

        let BalEmbed = new Discord.MessageEmbed()
            .setAuthor(`${member.username}'s wallet`, member.displayAvatarURL({ dynamic: true }))
            .addField('Wallet', "₪ " + coinsBalance)
            .addField('Bank', "₪ " + bankBalance + "/" + bankLimit)
            .setFooter(`Total amount: ₪ ${bankBalance + coinsBalance}`)
            .setColor(0xaa00cc)
        
        try {
            message.util.send(BalEmbed)
        }
        catch {
            let embed = new Discord.MessageEmbed()
                .setAuthor(`${member.username} does not have any coins yet!`, message.author.displayAvatarURL({ dynamic: true }))
            message.util.send(embed)
        }
        fs.writeFile('data.json', JSON.stringify(data), (err) => {
            if(err) console.log(err)
        });
        fs.writeFile('currency.json', JSON.stringify(currency), (err) => {
            if(err) console.log(err)
        });
    }
};

module.exports = BalanceCommand;
