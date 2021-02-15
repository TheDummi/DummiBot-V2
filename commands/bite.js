const {randColor} = require("../funcs.js")
const randomImages = [
    'https://media.tenor.com/images/557723325e65671bae3f9cd061220c3e/tenor.gif',
    'https://media.tenor.com/images/b06d6a26b08516ac069b7a9acdd001e5/tenor.gif',
    'https://media.tenor.com/images/12aaaf60c46d563e3f8f2609f1df3c53/tenor.gif',
    'https://media.tenor.com/images/c84f8b2f69239643243ff50f33bb58e3/tenor.gif',
    'https://media.tenor.com/images/b3f77685f5fed03749ffff22a4c84dbb/tenor.gif',
    'https://media.tenor.com/images/4f6c5ad80164566034ff4854761651bf/tenor.gif',
    'https://media.tenor.com/images/c10697be7432f846149bf3c44deecefa/tenor.gif'

]
const { Command } = require('discord-akairo');
const Discord = require('discord.js');
class BiteCommand extends Command {
    constructor() {
        super('bite', {
            aliases: ['bite'],
            category: 'actions',
            description: 'Bite someone',
            ownerOnly: false,
			channel: 'guild',
			args: [{
                id: 'user',
                type: 'user',
                prompt: {
                    start: 'Who would you like to bite?',
                    retry: 'Invalid user. Who would you like to bite?'
                }
            }]
        });
    }

    async exec(message, args) {

	const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];

	if (args.user.id == this.client.user.id) {
		const BotEmbed = new Discord.MessageEmbed()
			.setTitle('As I\'m a bot, I don\'t have feelings... thus biting won\'t hurt')
			.setColor(0xaa00cc)
		await message.util.send(BotEmbed)
	} else if (args.user.id == message.author.id) {
		const SelfEmbed = new Discord.MessageEmbed()
			.setTitle('Don\'t bite yourself, it hurts!')
			.setColor(0xaa00cc)
	await message.util.send(SelfEmbed)
	} else {
		const MentionEmbed = new Discord.MessageEmbed()
			.setDescription(`**<@${message.author.id}> bites ${args[0]}!**`)
			.setImage(randomImage)
			.setColor(randColor())
		await message.util.send(MentionEmbed)
		}
    }
};

module.exports = BiteCommand;
