const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const storage = require('../data/storageData.json');
const items = [
    'cheese',
    'bandages',
    'medkit',
    'revives',
    'rifle',
    'skillpoints'
]
class ShopCommand extends Command {
    constructor() {
        super('shop', {
            aliases: ['shop', 's'],
            category: 'economy',
            channel: 'guild',
            description: 'All buyable things',
        })
    }

    async exec(message) {
        let randomItems = items[Math.floor(Math.random() * items.length)];
        let medkit = this.client.guilds.cache.get('784094726432489522').emojis.cache.get('824936230105907211')
        let a = storage[message.author.id].rifle ? "`Owned`" : "`Not owned`";
        let b = storage[message.author.id].rod ? "`Owned`" : "`Not owned`";
        let embed = new Discord.MessageEmbed()
            .setTitle('Shop')
            .addField('🧀 cheese', '₪ 100')
            .addField('🩹 bandages', '₪ 1000')
            .addField(`${medkit} medkit`, '₪ 5000')
            .addField('💉 revive', '₪ 10000')
            .addField('⏫ skill point', '₪ 1000000')
            .addField('🔫 Hunting rifle', `₪ 750000 ${a}`)
            .addField('🎣 fishing rod', `₪ 10000 ${b}`)
            .setColor(0xaa00cc)
            .setFooter(`~use [${randomItems}] [${Math.floor(Math.random() * Math.floor(500))}]`)
        message.util.send(embed)
    }
};

module.exports = ShopCommand;