const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const storage = require('../data/storageData.json');
const hunting = require('../data/huntingData.json');

const items = [
    'cheese',
    'bandages',
    'medkit',
    'revives',
    'rifle'
]
class BackpackCommand extends Command {
    constructor() {
        super('backpack', {
            aliases: ['backpack', 'bp'],
            category: 'economy',
            description: 'View your backpack.',
            args: [
                {
                    id: 'user',
                    type: 'user'
                },
            ]
        })
    }
    async exec(message, args) {
        let randomItems = items[Math.floor(Math.random() * items.length)];
        let member = args.user || message.author;
        if (!hunting[member.id]) {
            hunting[member.id] = {
                pigeon: 0,
                pig: 0,
                goat: 0,
                fox: 0, 
                rabbit: 0,
                deer: 0,
                tiger: 0,
                lion: 0,
                buffalo: 0,
            }
        }
        if (!storage[member.id]) {
            storage[member.id] = {
                cheese: 0,
                bandages: 0,
                medkit: 0,
                revives: 0,
                rifle: 0,
            }
        }
        
        // animals
        let pigeon = hunting[member.id].pigeon;
        let pig = hunting[member.id].pig;
        let goat = hunting[member.id].goat;
        let fox = hunting[member.id].fox;
        let rabbit = hunting[member.id].rabbit;
        let deer = hunting[member.id].deer;
        let tiger = hunting[member.id].tiger;
        let lion = hunting[member.id].lion;
        let buffalo = hunting[member.id].buffalo;
        
        // storage
        let cheese = storage[member.id].cheese;
        let medkit = storage[member.id].medkit;
        let bandages = storage[member.id].bandages;
        let revives = storage[member.id].revives;
        
        let str = 'You don\'t have any items!'
        let medkits = this.client.guilds.cache.get('784094726432489522').emojis.cache.get('824936230105907211')
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${member.username}'s backpack`, member.displayAvatarURL({ dynamic: true }))
            if (cheese !== 0) {
                embed = embed.addField('🧀', cheese, true)
            }
            if (bandages !== 0) {
                embed = embed.addField('🩹', bandages, true)
            }
            if (medkit !== 0) {
                embed = embed.addField(`${medkits}`,medkit, true)
            }
            if (revives !== 0) {
                embed = embed.addField('💉', revives, true)
            }
            if (pigeon !== 0) {
                embed = embed.addField('🐦', pigeon, true)
            }
            if (pig !== 0) {
                embed = embed.addField('🐖', pig, true)
            }
            if (goat !== 0) {
                embed = embed.addField('🐐', goat, true)
            }
            if (fox !== 0) {
                embed = embed.addField('🦊', fox, true)
            }
            if (rabbit !== 0) {
                embed = embed.addField('🐇', rabbit, true)
            }
            if (deer !== 0) {
                embed = embed.addField('🦌', deer, true)
            }
            if (tiger !== 0) {
                embed = embed.addField('🐅', tiger, true)
            }
            if (lion !== 0) {
                embed = embed.addField('🦁', lion, true)
            }
            if (buffalo !== 0) {
                embed = embed.addField('🐃', buffalo, true)
            }
            if (embed.fields.length <= 0) {
                embed = embed.setDescription(str)
            }
            embed
            .setFooter(`~use [${randomItems}] [${Math.floor(Math.random() * Math.floor(500))}]`)
            .setColor(0xaa00cc)
        message.util.send(embed);
    }
}

module.exports = BackpackCommand;