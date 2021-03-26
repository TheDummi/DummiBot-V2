const Discord = require('discord.js');
const { Command } = require('discord-akairo');

class UpgradesCommand extends Command {
    constructor() {
        super('upgrades', {
            aliases: ['upgrades'],
            category: 'economy',
            description: 'All buyable things',
        })
    }

    async exec(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Upgrades list cost')
            .addField('❤️ Health (+5)', '⏫ 1')
            .addField('⚔️ Attack (+5)', '⏫ 1')
            .addField('📦 Storage (+50)', '⏫ 5')
            .addField(':ninja: Stealth (+1%)', '⏫ 1')
            .addField('💥 Critical (+2)', '⏫ 1')
            .setColor(0xaa00cc)
            .setFooter('~upgrade [item] [amount]')
        message.util.send(embed)
    }
};

module.exports = UpgradesCommand;