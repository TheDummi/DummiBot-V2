const { Command } = require('discord-akairo');
const Discord = require('discord.js');

class FlipCoinCommand extends Command {
    constructor() {
        super('flipcoin', {
            aliases: ['flipcoin', 'coinflip', 'flip', 'coin'],
            category: 'fun',
            description: 'Flip a coin.',
            ownerOnly: false,
            channel: ['guild', 'dm']
        })
    }
    async exec(message) {
        let random = (Math.floor(Math.random() * Math.floor(2)));
        let headEmbed = new Discord.MessageEmbed()
        .setTitle('I flipped heads')
        .setColor(0Xaa00cc);
        let TailEmbed = new Discord.MessageEmbed()
        .setTitle('I flipped tails')
        .setColor(0xaa00cc);
        if(random === 0) {
            message.util.send(headEmbed);
        }
        else {
            message.util.send(TailEmbed);
        } 
		
	}
};

module.exports = FlipCoinCommand;