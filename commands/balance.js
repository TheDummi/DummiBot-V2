const fs = require('fs')
const Discord = require('discord.js')
const { Command } = require('discord-akairo')
const currency = require('../data/currency.json')
const xp = require('../data/xpData.json')
const respect = require('../data/respectData.json')
const userData = require('../data/userData.json');
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
        if (!userData[member.id]) {
            userData[member.id] = {
                work: 0,
                day: 0
            }
        }
        if (!currency[member.id]){
            currency[member.id] = {
                coins: 0,
                bank: 0
            }
        }
        
        if (!xp[member.id]) {
            xp[member.id] = {
                xp: 0,
                level: 1
            }
        }

        if (!respect[member.id]) {
            respect[member.id] = {
                respect: 0,
                respectLevel: 1
            }
        }

        let coinsBalance = currency[member.id].coins;
        let bankBalance = currency[member.id].bank;
        let userLevel = xp[member.id].level;
        let work = userData[member.id].work;
        let day = userData[member.id].day;
        if (day == 0) {
            day = 1
        }
        let bankLimit = userLevel * 10000 * day;
        let percent = Math.round(bankBalance/bankLimit * 1000) / 10 + "%"

        let BalEmbed = new Discord.MessageEmbed()
            .setAuthor(`${member.username}'s wallet`, member.displayAvatarURL({ dynamic: true }))
            .addField('Wallet', "₪ " + coinsBalance)
            .addField('Bank', "₪ " + bankBalance + "/" + bankLimit + ` \`${percent}\``)
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
        fs.writeFile('data/xpData.json', JSON.stringify(xp), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
    
        fs.writeFile('data/respectData.json', JSON.stringify(respect), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
    
        fs.writeFile('data/currency.json', JSON.stringify(currency), (err) => {
            let errEmbed = new Discord.MessageEmbed()
                .setTitle('JSON OVERLOAD')
                .setColor(0xaa00cc)
                .setDescription(`\`\`\`json\n${err}\`\`\``)
            if (err) this.client.channels.cache.get('825128362291757146').send(errEmbed)
        });
    }
};

module.exports = BalanceCommand;
