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
            channel: ['guild', 'dm']
        })
    }

	async exec(message) {
        let member;
        if (message.mentions.users.array()[0]) member = await message.guild.members.fetch(message.mentions.users.array()[0].id);
        else member = message.member;
        const bigpp = () => pp[Math.floor(Math.random() * pp.length)];
        let embed = new Discord.MessageEmbed()
        .setDescription(`<@${member.id}>'s pp\n\n` + bigpp())
        .setColor(0xaa00cc)
        message.util.send(embed)
    }
};

module.exports = PPCommand;