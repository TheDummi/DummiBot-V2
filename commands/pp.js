const pp = [
    "8=D",
    "8==D",
    "8===D",
    "8====D",
    "8=====D",
    "8======D",
    "8=======D",
    "8========D",
    "8=========D",
    "8==========D",
    "8===========D",
    "8============D",
    "8=============D"

];
const Discord = require('discord.js');
const { Command } = require('discord-akairo')

class PPCommand extends Command {
    constructor() {
        super('pp', {
            aliases: ['pp',],
            category: 'fun',
            description: 'I won\'t explain this.',
            ownerOnly: false,
            channel: ['guild', 'dm'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ]
        })
    }

	async exec(message, args) {
        let member = args.member || message.author
        const bigpp = () => pp[Math.floor(Math.random() * pp.length)];
        let embed = new Discord.MessageEmbed()
        .setDescription(`${member}'s pp\n\n` + bigpp())
        .setColor(0xaa00cc)
        message.util.send(embed)
    }
};

module.exports = PPCommand;