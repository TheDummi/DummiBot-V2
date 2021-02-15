const Discord = require('discord.js');
const { Command } = require('discord-akairo');

const ball = [
    'No',
    'Definitely',
    'Yes',
    'Of course',
    'Never',
    'Probably not',
    'Probably',
    'Fortunately no',
    'I\'m not sure',
    'I don\'t know',
    'maybe',
    'I am not certain',
]
const bal = () => ball[Math.floor(Math.random() * ball.length)]

class BallCommand extends Command {
    constructor() {
        super('8ball', {
            aliases: ['8ball'],
            category: 'fun',
            description: '8ball command',
            channel: ['guild', 'dm'],
        })
    }
    async exec(message, args) {
        if (args[0] == " ") {
            return await message.util.channel('hi')
        }
        else {
            return await message.util.send(bal())
        }
    }
};

module.exports = BallCommand;