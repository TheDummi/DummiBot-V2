const { Command } = require('discord-akairo');

const bal = [
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
];
const ball = () => bal[Math.floor(Math.random() * bal.length)];

class BallCommand extends Command {
    constructor() {
        super('8ball', {
            aliases: ['8ball'],
            category: 'fun',
            description: '8ball command',
            channel: ['guild', 'dm'],
            args: [
                {
                    id: 'message',
                    type: 'string',
                    prompt: {
                        start: 'What is your question?'
                    }
                }
            ]
        });
    }
    async exec(message) {

// Send the answer
        await message.util.send(ball());
    }
};

module.exports = BallCommand;