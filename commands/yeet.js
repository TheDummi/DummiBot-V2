const {
    randColor
} = require("../funcs.js");
const {
    Command
} = require('discord-akairo');
const randomImages = [
    'https://media1.tenor.com/images/b7cded2e6c866a147425f525eeb1e56e/tenor.gif?itemid=12559094',
    'https://media.tenor.com/images/bffacfd4929e61396e4eec85077efe89/tenor.gif',
    'https://media.tenor.com/images/8367c8974b349e6f7222c4f6fafc0d21/tenor.gif',
    'https://media.tenor.com/images/e04568f1ce59a1cc453e42956521c596/tenor.gif'

]
const Discord = require("discord.js")

class YeetCommand extends Command {
    constructor() {
        super('yeet', {
            aliases: ['yeet'],
            category: 'actions',
            description: 'Yeet Someone',
            ownerOnly: false,
            channel: 'guild',
            args: [{
                id: 'user',
                type: 'user',
                prompt: {
                    start: 'Who would you like to yeet?',
                    retry: 'Invalid user. Who would you like to yeet?',
                    limit: 3,
                    cancel: 'Cancelled the command',
                    ended: 'Too many retries.',
                    timeout: 'Timed out.'
                }
            }]
        })
    }

    async exec(message, args) {

        const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];

        if (args.user.id == this.client.user.id) {
            const BotEmbed = new Discord.MessageEmbed()
                .setTitle('Wh- Yo-... Why?')
                .setColor(0xaa00cc);
            await message.util.send(BotEmbed)
        } else if (args.user.id == message.author.id) {
            const SelfEmbed = new Discord.MessageEmbed()
                .setTitle('You can\'t yeet yourself!')
                .setColor(0xaa00cc);
            await message.util.send(SelfEmbed)
        } else {
            const embed = new Discord.MessageEmbed()
            .setTitle('YA YEET!!!')
            .setDescription(`**<@${message.author.id}> Yeeted <@${args.user.id}>!!**`)
            .setImage(randomImage)
            .setColor(randColor());
            await message.util.send(embed)
        }
    }
};

module.exports = YeetCommand;