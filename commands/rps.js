const {randColor} = require("../funcs.js");
const Discord = require("discord.js");
const { Command } = require('discord-akairo');

class RPSCommand extends Command {
    constructor() {
        super('rps', {
            aliases: ['rps'],
            category: 'fun',
            description: 'Play rock, paper, scissors',
            ownerOnly: false,
            channel: ['guild', 'dm'],
            args: [
                {
                    id: 'choice',
                    type: ['rock', 'paper', 'scissors'],
                    prompt: {
                        start: 'Please choose rock, paper, or scissors.',
                        retry: 'Invalid choice. Please choose rock, paper, or scissors.'
                    }
                }
            ]
        })
    }

    async exec(message, args) {
        
        const acceptedReplies = ['rock', 'paper', 'scissors'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];
        
        const choice = args.choice

        if (result === choice) return message.util.reply("It's a tie! We had the same choice.");
        
        switch (choice) {
            case 'rock': {
                if (result === 'paper') return message.util.reply('I chose paper, You lost!');
                else return message.util.reply('I chose scissors, You won!');
            }
            case 'paper': {
                if (result === 'scissors') return message.util.reply('I chose scissors, You lost!');
                else return message.util.reply('I chose rock, You won!');        
            }
            case 'scissors': {
                if (result === 'rock') return message.util.reply('I chose rock,You lost!');
                else return message.util.reply('I chose paper, You won!');
            }
        }
    }
};

module.exports = RPSCommand;