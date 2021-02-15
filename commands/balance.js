const fs = require('fs')
const Discord = require('discord.js')
const { Command } = require('discord-akairo')
const currency = require('../currency.json')
class BalanceCommand extends Command {
    constructor() {
        super('balance', {
            aliases: ['balance', 'bal', 'credits', 'cred'],
            category: 'info',
            description: 'Dimboins Balance',
            channel: ['guild'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                }
            ]
        })
    };
    
    async exec(message) {
        if (!currency[message.author.id]){
            currency[message.author.id] = {
                Dimboins: 0,
                Gold: 0
            }
        };
        let goldBalance = currency[message.author.id].Gold;
        let balance = currency[message.author.id].Dimboins;
        let BalEmbed = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}>'s wallet`)
        .addField('| Dummicoins', balance + " 💰", true)
        .addField('| Golden Dummicoins', goldBalance + " :coin:", true )
        .setThumbnail(message.author.displayAvatarURL())
        .setColor(0xaa00cc)
        .addField('Note*', '1 :coin: = 100000 💰')
        message.util.send(BalEmbed)
    }
}

module.exports = BalanceCommand;