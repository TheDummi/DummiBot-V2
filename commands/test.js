const { Command } = require('discord-akairo');

class StatsCommand extends Command {
    constructor() {
        super('stats', {
            aliases: ['stats'],
            args: [
                {
                    id: 'advanced',
                    match: 'flag',
                    flag: '--advanced'
                }
            ]
        });
    }

    exec(message, args) {

        if (args.advanced) {
            message.util.send("hi");
            message.util.send("hi");
            message.util.send("hi");
            message.util.send("hi");
            return message.util.send("hi");
        }

        return message.util.send("hello");
    }
}

module.exports = StatsCommand;