const { Command } = require('discord-akairo');

class ErrorCommand extends Command {
    constructor() {
        super('error', {
            aliases: ['error'],
            category: 'bot maker',
            description: 'Make an error.',
            ownerOnly: true,

        })
    }

    async exec(message) {
        message.channel.a.send('hi')
    }
};

module.exports = ErrorCommand;