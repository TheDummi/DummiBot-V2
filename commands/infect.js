function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
const boolean = [
    "Successful",
    "Failed"
]
const fs = require('fs')
const xp = require('../data/respectData.json')
const { Command } = require('discord-akairo');
const Discord = require('discord.js');
class InfectCommand extends Command {
    constructor() {
        super('infect', {
            aliases: ['infect', 'hack', 'covid-19'],
            category: 'fun',
            description: 'Infect someone with a virus',
            ownerOnly: false,
            channel: 'guild',
            args: [
                {
                    id: 'user',
                    type: 'user',
                    prompt: {
                        start: 'Who would you like to infect?',
                        retry: 'Invalid user, who would you like to infect?',
                        retries: 3,
                        ended: 'Too many retries',
                        cancel: 'Cancelled the command.'
                    }
                }
            ]
        })
    }

    async exec(message, args) {
        let member = args.user;
        let SelfEmbed = new Discord.MessageEmbed()
            .setColor(0xaa00cc)
            .setTitle('Are you really trying to infect yourself?')
        if (member.id === message.author.id) return message.util.send(SelfEmbed)
        let StartEmbed = new Discord.MessageEmbed()
            .setDescription(`infecting ${member}`)
            .setColor(0xaa00cc)
        let BotEmbed = new Discord.MessageEmbed()
            .setColor(0xaa00cc)
            .setTitle('I\'m the the one infecting... you really think I will infect myself?')
        if (member === message.client.user) return message.util.send(BotEmbed)
            
        
        let m = await message.util.send(StartEmbed)
        let timeDiff = () => (m.editedAt || m.createdAt) - (message.editedAt || message.createdAt);    
        let embed1 = new Discord.MessageEmbed()
            .setDescription(`\`░░░░░░░░░░░░░░░░░░░░\`\n\nGathering account information...`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed2 = new Discord.MessageEmbed()
            .setDescription(`\`█░░░░░░░░░░░░░░░░░░░\`\n\nObtaining account...`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed3 = new Discord.MessageEmbed()
            .setDescription(`\`██░░░░░░░░░░░░░░░░░░\`\n\nAccount: ${member}`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed4 = new Discord.MessageEmbed()
            .setDescription(`\`███░░░░░░░░░░░░░░░░░\`\n\nObtaining ID...`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed5 = new Discord.MessageEmbed()
            .setDescription(`\`████░░░░░░░░░░░░░░░░\`\n\nID: ${member.id}`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed6 = new Discord.MessageEmbed()
            .setDescription(`\`█████░░░░░░░░░░░░░░░\`\n\nObtaining username...`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed7 = new Discord.MessageEmbed()
            .setDescription(`\`██████░░░░░░░░░░░░░░\`\n\nUsername: ${member.username}`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed8 = new Discord.MessageEmbed()
            .setDescription(`\`███████░░░░░░░░░░░░░\`\n\nObtaining nickname...`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed9 = new Discord.MessageEmbed()
            .setDescription(`\`████████░░░░░░░░░░░░\`\n\nNickname: ${member.nickname || "No nickname"}`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed10 = new Discord.MessageEmbed()
            .setDescription(`\`█████████░░░░░░░░░░░\`\n\nObtaining Tag...`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed11 = new Discord.MessageEmbed()
            .setDescription(`\`██████████░░░░░░░░░░\`\n\nTag: ${member.tag}`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed12 = new Discord.MessageEmbed()
            .setDescription(`\`███████████░░░░░░░░░\`\n\nObtaining avatar ID`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed13 = new Discord.MessageEmbed()
            .setDescription(`\`████████████░░░░░░░░\`\n\nAvatar ID: ${member.avatar}`)
            .setImage(member.displayAvatarURL({ size: 4096, dynamic: true}))
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed14 = new Discord.MessageEmbed()
            .setDescription(`\`█████████████░░░░░░░\`\n\nObtaining account creation date...`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed15 = new Discord.MessageEmbed()
            .setDescription(`\`██████████████░░░░░░\`\n\nAccount created at: ${member.createdAt}`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed16 = new Discord.MessageEmbed()
            .setDescription(`\`███████████████░░░░░\`\n\nObtaining time stamp...`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed17 = new Discord.MessageEmbed()
            .setDescription(`\`████████████████░░░░\`\n\nTime stamp: ${member.createdTimestamp}`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed18 = new Discord.MessageEmbed()
            .setDescription(`\`█████████████████░░░\`\n\nObtaining guild name...`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed19 = new Discord.MessageEmbed()
            .setDescription(`\`██████████████████░░\`\n\nGuild: ${message.guild.name}`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed20 = new Discord.MessageEmbed() 
            .setDescription(`\`███████████████████░\`\n\nObtaining channel name...`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
        let embed21 = new Discord.MessageEmbed() 
            .setDescription(`\`████████████████████\`\n\nChannel: ${message.channel.name}`)
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
            const Boolean = () => boolean[Math.floor(Math.random() * boolean.length)]
        let ResultEmbed = new Discord.MessageEmbed() 
            .setDescription(`Infection information:\n\nAccount: ${member}\nID: \`${member.id}\`\nUsername: \`${member.username}\`\nNickname: \`${member.nickname || "No nickname"}\`\nTag: \`${member.tag}\`\nAvatar ID: \`${member.avatar}\`\nAccount created at: \`${member.createdAt}\`\nTime stamp: \`${member.createdTimestamp}\`\nGuild: \`${message.guild.name}\`\nChannel: \`${message.channel.name}\`\n\n**Infection ${Boolean()}**`)
            .setImage(member.displayAvatarURL({ size: 4096, dynamic: true}))
            .setColor(0xaa00cc)
            .addField('Ping', `\`\`\`glsl\n${timeDiff()}ms\`\`\``, true)
            await m.edit(embed1)
            await sleep(1000)
            await m.edit(embed2)
            await sleep(1000)
            await m.edit(embed3)
            await sleep(1000)
            await m.edit(embed4)
            await sleep(1000)
            await m.edit(embed5)
            await sleep(1000)
            await m.edit(embed6)
            await sleep(1000)
            await m.edit(embed7)
            await sleep(1000)
            await m.edit(embed8)
            await sleep(1000)
            await m.edit(embed9)
            await sleep(1000)
            await m.edit(embed10)
            await sleep(1000)
            await m.edit(embed11)
            await sleep(1000)
            await m.edit(embed12)
            await sleep(1000)
            await m.edit(embed13)
            await sleep(1000)
            await m.edit(embed14)
            await sleep(1000)
            await m.edit(embed15)
            await sleep(1000)
            await m.edit(embed16)
            await sleep(1000)
            await m.edit(embed17)
            await sleep(1000)
            await m.edit(embed18)
            await sleep(1000)
            await m.edit(embed19)
            await sleep(1000)
            await m.edit(embed20)
            await sleep(1000)
            await m.edit(embed21)
            await sleep(1000)
            await m.edit(ResultEmbed)
            if (!xp[message.author.id]) {
                xp[message.author.id] = {
                    respect: 0,
                    respectLevel: 1,
                };
            }
            let userXp = xp[message.author.id].xp;
            let userLevel = xp[message.author.id].level;
            let userRespect = xp[message.author.id].respect;
            let userLevelRespect = xp[message.author.id].respectLevel;
            let xpAdd = Math.floor(Math.random() * 5) + 5;
            userRespect = userRespect - xpAdd;
            xp[message.author.id] = {
                respect: userRespect,
                respectLevel: userLevelRespect,
            }
            fs.writeFile('data/xpData.json', JSON.stringify(xp), (err) => {
                if (err) console.log(err)
            });
    }
};

module.exports = InfectCommand;