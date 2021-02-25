const fs = require('fs')
const Discord = require('discord.js')
const { Command } = require('discord-akairo')
const currency = require('../currency.json')
class BalanceCommand extends Command {
    constructor() {
        super('balance', {
            aliases: ['balance', 'bal', 'credits', 'cred'],
            category: 'economy',
            description: 'Dimboins Balance',
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
                Dimboins: 0,
                silver: 0,
                Gold: 0,
                diamond: 0
            }
        }
        if (!currency[member.id]){
            currency[member.id] = {
                Dimboins: 0,
                silver: 0,
                Gold: 0,
                diamond: 0
            }
        }
        
        let goldBalance = currency[member.id].Gold;
        let silverBalance = currency[member.id].silver;
        let balance = currency[member.id].Dimboins;
        let diamondBalance = currency[member.id].diamond;
// Send embed on use of command
        let BalEmbed = new Discord.MessageEmbed()
        .setAuthor(`${member.username}'s wallet`, member.displayAvatarURL())
        .addField('| Coins', balance + " 💰", true)
        .addField('| Silver', silverBalance, true )
        .addField('| Gold', goldBalance , true )
        .addField('| Diamond', diamondBalance, true )
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