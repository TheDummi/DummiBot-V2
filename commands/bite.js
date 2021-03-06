const {randColor} = require("../funcs.js")
const randomImages = [
    'https://media.tenor.com/images/557723325e65671bae3f9cd061220c3e/tenor.gif',
    'https://media.tenor.com/images/b06d6a26b08516ac069b7a9acdd001e5/tenor.gif',
    'https://media.tenor.com/images/12aaaf60c46d563e3f8f2609f1df3c53/tenor.gif',
    'https://media.tenor.com/images/c84f8b2f69239643243ff50f33bb58e3/tenor.gif',
    'https://media.tenor.com/images/b3f77685f5fed03749ffff22a4c84dbb/tenor.gif',
    'https://media.tenor.com/images/4f6c5ad80164566034ff4854761651bf/tenor.gif',
    'https://media.tenor.com/images/c10697be7432f846149bf3c44deecefa/tenor.gif',
    'https://media1.tenor.com/images/69924081e9c60548c2ec6ba42b1ebea9/tenor.gif?itemid=15310734',
    'https://media1.tenor.com/images/a9eacd8925b5dc9bb2097ec043cfea45/tenor.gif?itemid=16834570',
    'https://media.tenor.com/images/da20d660939571d12eff04a0c0e30c4a/tenor.gif',
    'https://media.tenor.com/images/7572533d0f1fdf6425a5dbcb8ca5ed86/tenor.gif',
    'https://media.tenor.com/images/77b6549ac02fdaf7f8eaefe89fcf0b1d/tenor.gif'

]
const randomImage = () => randomImages[Math.floor(Math.random() * randomImages.length)];
const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fs = require('fs');
const xp = require('../xp.json')

class BiteCommand extends Command {
    constructor() {
        super('bite', {
            aliases: ['bite', 'eat'],
            category: 'actions',
            description: 'Bite someone',
            ownerOnly: false,
			channel: 'guild',
			args: [
                {
                    id: 'user',
                    type: 'user',
                    prompt: {
                        start: 'Who would you like to bite?',
                        retry: 'Invalid user. Who would you like to bite?',
                        limit: 3,
                        ended: 'Too many retries!',
                        timeout: 'Ran out of time!',
                        cancel: 'Cancelled command!'
                    }
                }
            ]
        });
    }

    async exec(message, args) {

// Definitions
        let purple = 0xaa00cc;
        let user = message.author;
        let member = args.user;
        let client = this.client.user;

// If the mentioned user is the bot
	if (member.id == client.id) {
		const BotEmbed = new Discord.MessageEmbed()
			.setAuthor(`${user.username}, really?`, user.displayAvatarURL({ dynamic: true }))
			.setColor(purple)
		await message.util.send(BotEmbed)

// If the mentioned user is the message author
	} else if (member.id == user.id) {
		const SelfEmbed = new Discord.MessageEmbed()
			.setAuthor(`${user.username}, why?`, user.displayAvatarURL({ dynamic: true }))
			.setColor(purple)
	await message.util.send(SelfEmbed)

// In all other cases
    } else {
		const MentionEmbed = new Discord.MessageEmbed()
			.setAuthor(`${user.username} bit ${member.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setImage(randomImage())
			.setColor(randColor())
		await message.util.send(MentionEmbed)
        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0,
                level: 1,
                respect: 0,
                respectLevel: 1,
                prestige: 0,
            };
        }
        let userXp = xp[message.author.id].xp;
        let userLevel = xp[message.author.id].level;
        let userRespect = xp[message.author.id].respect;
        let userLevelRespect = xp[message.author.id].respectLevel;
        let xpAdd = Math.floor(Math.random() * 5) + 5;
        userRespect = userRespect - xpAdd;
        xp[message.author.id] = {
            xp: userXp,
            level: userLevel,
            respect: userRespect,
            respectLevel: userLevelRespect,
            prestige: 0,
        }
        fs.writeFile('xp.json', JSON.stringify(xp), (err) => {
            if (err) console.log(err)
        })
		}
    }
};

module.exports = BiteCommand;