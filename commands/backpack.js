const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const storage = require('../data/storageData.json');

class BackpackCommand extends Command {
    constructor() {
        super('backpack', {
            aliases: ['backpack'],
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
        let member = args.user || message.author;
        if (!storage[message.author.id]) {
            storage[message.author.id] = {
                cheese: 0,
                bandages: 0,
                revives: 0
            }
        }

        let cheese = storage[message.author.id].cheese;
        let bandages = storage[message.author.id].bandages;
        let revives = storage[message.author.id].revives;
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${member.username}'s backpack`, member.displayAvatarURL({ dynamic: true }))
            .addField('Items', `🧀 ${cheese}\n🩹 ${bandages}\n💉 ${revives}`)
            .setColor(0xaa00cc)
        message.util.send(embed);
    }
}

module.exports = BackpackCommand;