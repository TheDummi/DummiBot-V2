const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const storage = require('../data/storageData.json');

class ShopCommand extends Command {
    constructor() {
        super('shop', {
            aliases: ['shop', 's'],
            category: 'economy',
            description: 'All buyable things',
        })
    }

    async exec(message) {
        let a = storage[message.author.id].rifle ? "`Owned`" : "`Not owned`";
        let embed = new Discord.MessageEmbed()
            .setTitle('Shop')
            .addField('🧀 cheese', '₪ 100')
            .addField('🩹 bandages', '₪ 1000')
            .addField('💉 revive', '₪ 10000')
            .addField('⏫ skill point', '₪ 1000000')
            .addField('🔫 Hunting rifle', `₪ 750000 ${a}`)
            .setColor(0xaa00cc)
            .setFooter('~buy [item] [amount]')
        message.util.send(embed)
    }
};

module.exports = ShopCommand;