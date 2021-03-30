const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const upgrade = require('../data/upgradeData.json');
const items = [
    'health',
    'attack',
    'storage',
    'stealth',
    'critical'
]
class UpgradesCommand extends Command {
    constructor() {
        super('upgrades', {
            aliases: ['upgrades'],
            category: 'stats',
            channel: 'guild',
            description: 'All buyable things',
        })
    }

    async exec(message) {
        let points = upgrade[message.author.id].skillPoints
        let randomItems = items[Math.floor(Math.random() * items.length)];
        let a = Math.floor(Math.random() * points)
        let embed = new Discord.MessageEmbed()
            .setTitle('Upgrades list cost')
            .addField('❤️ Health (+5)', '⏫ 1')
            .addField('⚔️ Attack (+5)', '⏫ 1')
            .addField('📦 Storage (+50)', '⏫ 5')
            .addField(':ninja: Stealth (+1%)', '⏫ 1')
            .addField('💥 Critical (+2)', '⏫ 1')
            .setColor(0xaa00cc)
            .setFooter(`~use [${randomItems}] [${a + 1}]`)
        message.util.send(embed)
    }
};

module.exports = UpgradesCommand;