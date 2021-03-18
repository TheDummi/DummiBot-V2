const Discord = require('discord.js');
const { Command, Util } = require('discord-akairo');
let Scraper = require('images-scraper')
const google = new Scraper({
    puppeteer: {
        headless: true,
    },
});

class ImageCommand extends Command {
    constructor() {
        super('image', {
            aliases: ['image'],
            category: 'utility',
            description: 'Get an image on google by your wish.',
            args: [
            {
                id: 'message',
                type: 'string',
                match: 'rest',
                prompt: {
                    start: 'What would you like to search on google images?'
                }
            }
            ]
        })
    }

    async exec(message, args) {
        const random = Math.floor(Math.random() * Math.floor(50)) + 1
        const image = args.message;
        message.util.send(`Started looking for: \`${image}\` as an image.`)
        const results = await google.scrape(image, 50);
        try {
            if (random == 0) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[0].url)
                    .setURL(results[0].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 1) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[1].url)
                    .setURL(results[1].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 2) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[2].url)
                    .setURL(results[2].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 3) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[3].url)
                    .setURL(results[3].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 4) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[4].url)
                    .setURL(results[4].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 5) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[5].url)
                    .setURL(results[5].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 6) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[6].url)
                    .setURL(results[6].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 7) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[7].url)
                    .setURL(results[7].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 8) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[8].url)
                    .setURL(results[8].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 9) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[9].url)
                    .setURL(results[9].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 10) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[10].url)
                    .setURL(results[10].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 11) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[11].url)
                    .setURL(results[11].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 12) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[12].url)
                    .setURL(results[12].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 13) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[13].url)
                    .setURL(results[13].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 14) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[14].url)
                    .setURL(results[14].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 15) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[15].url)
                    .setURL(results[15].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 16) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[16].url)
                    .setURL(results[16].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 17) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[17].url)
                    .setURL(results[17].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 18) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[18].url)
                    .setURL(results[18].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 19) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[19].url)
                    .setURL(results[19].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 20) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[20].url)
                    .setURL(results[20].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 21) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[21].url)
                    .setURL(results[21].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 22) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[22].url)
                    .setURL(results[22].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 23) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[23].url)
                    .setURL(results[23].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 24) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[24].url)
                    .setURL(results[24].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 25) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[25].url)
                    .setURL(results[25].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 26) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[26].url)
                    .setURL(results[26].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 27) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[27].url)
                    .setURL(results[27].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 28) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[28].url)
                    .setURL(results[28].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 29) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[29].url)
                    .setURL(results[29].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 30) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[30].url)
                    .setURL(results[30].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 31) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[31].url)
                    .setURL(results[31].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 32) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[32].url)
                    .setURL(results[32].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 33) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[33].url)
                    .setURL(results[33].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 34) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[34].url)
                    .setURL(results[34].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 35) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[35].url)
                    .setURL(results[35].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 36) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[36].url)
                    .setURL(results[36].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 37) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[37].url)
                    .setURL(results[37].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 38) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[38].url)
                    .setURL(results[38].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 39) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[39].url)
                    .setURL(results[39].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 40) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[40].url)
                    .setURL(results[40].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 41) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[41].url)
                    .setURL(results[41].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 42) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[42].url)
                    .setURL(results[42].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 43) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[43].url)
                    .setURL(results[43].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 44) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[44].url)
                    .setURL(results[44].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 45) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[45].url)
                    .setURL(results[45].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 46) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[46].url)
                    .setURL(results[46].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 47) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[47].url)
                    .setURL(results[47].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 48) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[48].url)
                    .setURL(results[48].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
            if (random == 49) {
                let embed = new Discord.MessageEmbed()
                .setTitle(`${image}, search result no. ${random}`)
                .setImage(results[49].url)
                    .setURL(results[49].url)
                    .setColor(0xaa00cc)
                message.util.send(embed);
            }
        }
        catch {
            message.util.send('No images found!')
        }
    }
}

module.exports = ImageCommand;