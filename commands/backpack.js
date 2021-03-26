const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const storage = require('../data/storageData.json');
const items = [
    'cheese',
    'bandages',
    'medkit',
    'revives',
    'rifle'
]
class BackpackCommand extends Command {
    constructor() {
        super('backpack', {
            aliases: ['backpack', 'bp'],
            category: 'economy',
            description: 'View your backpack.',
            args: [
                {
                    id: 'user',
                    type: 'user'
                },
            ]
        })
    }
    async exec(message, args) {
        let randomItems = items[Math.floor(Math.random() * items.length)];
        let member = args.user || message.author;
        if (!storage[message.author.id]) {
            storage[message.author.id] = {
                cheese: 0,
                bandages: 0,
                medkit: 0,
                revives: 0,
                rifle: 0,
            }
        }
        
        let cheese = storage[message.author.id].cheese;
        let medkit = storage[message.author.id].medkit;
        let bandages = storage[message.author.id].bandages;
        let revives = storage[message.author.id].revives;
        let medkits = this.client.guilds.cache.get('784094726432489522').emojis.cache.get('824936230105907211')
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${member.username}'s backpack`, member.displayAvatarURL({ dynamic: true }))
            .addField('Items', `🧀 ${cheese}\n🩹 ${bandages}\n${medkits} ${medkit}\n💉 ${revives}`)
            .setFooter(`~use [${randomItems}] [${Math.floor(Math.random() * Math.floor(500))}]`)
            .setColor(0xaa00cc)
        message.util.send(embed);
    }
}

module.exports = BackpackCommand;