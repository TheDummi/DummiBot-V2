const {randColor} = require("../funcs.js")
const randomImages = [ 
    'https://media1.tenor.com/images/108c2257683620292f4687262f26e872/tenor.gif?itemid=17258498',
    'https://media1.tenor.com/images/2d4138c7c24d21b9d17f66a54ee7ea03/tenor.gif?itemid=12535134',
    'https://media1.tenor.com/images/8ac5ada8524d767b77d3d54239773e48/tenor.gif?itemid=16334628',
    'https://media1.tenor.com/images/fd47e55dfb49ae1d39675d6eff34a729/tenor.gif?itemid=12687187',
    'https://media1.tenor.com/images/f20151a1f7e003426ca7f406b6f76c82/tenor.gif?itemid=13985247',
    'https://media1.tenor.com/images/b7492c8996b25e613a2ab58a5d801924/tenor.gif?itemid=14227401'   

]
const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fs = require('fs');
const xp = require('../xp.json')
class HugCommand extends Command {
    constructor() {
        super('hug', {
            aliases: ['hug',],
            category: 'actions',
            description: 'Hug someone.',
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
        })
    }

async exec(message, args) {
    let SelfEmbed = new Discord.MessageEmbed()
        .setTitle('Are you this lonely?')
        .setColor(0xaa00cc);
    let BotEmbed = new Discord.MessageEmbed()
        .setTitle('I would love to hug you, only I can\'t get to you...')
        .setColor(0xaa00cc);
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
    let embed = new Discord.MessageEmbed()
        .setDescription(`**<@${message.author.id}> hugs ${args.user}!!**`)
        .setImage(randomImage)
        .setColor(randColor());
    if (args.user.id === this.client.user.id) {
        return message.util.send(BotEmbed)
    } else if (args.user.id === message.author.id) {
        return message.util.send(SelfEmbed)
    }    else {
    await message.util.send(embed);
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
    let xpAdd = Math.floor(Math.random() * 15) + 5;
    userRespect = userRespect + xpAdd;
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

module.exports = HugCommand;
