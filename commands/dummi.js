const randomImages = [
    "https://media1.tenor.com/images/9aabd2ff6801be53dba6cd250b0ec352/tenor.gif?itemid=19687755",
    "https://media1.tenor.com/images/016669d26b0ea5531d52bca8e803db1b/tenor.gif?itemid=19687758",
    "https://media1.tenor.com/images/56770d8e16f9590b396528ae51151081/tenor.gif?itemid=19687754",
    "https://media1.tenor.com/images/cf5f033f1eb57ed116a49ff4b11f4bb6/tenor.gif?itemid=19687759",
    "https://media1.tenor.com/images/e6866c9f3ce1b32ae674e29d0baea6bd/tenor.gif?itemid=19687766",
    "https://media1.tenor.com/images/a44d78f08db581eb3ded609c59ac853e/tenor.gif?itemid=19687756",
    "https://media1.tenor.com/images/c4375eeb93a5df9f0f22140177f2fbda/tenor.gif?itemid=19687761",
    "https://media1.tenor.com/images/cfbbc5aa9afa996189496def0ee33a9b/tenor.gif?itemid=19687751",
    "https://media1.tenor.com/images/1c609eea90e78c223c8d11f131eab415/tenor.gif?itemid=19687749",
    "https://media1.tenor.com/images/232b6a7689e6b29c0b0382aac5708e17/tenor.gif?itemid=19687745",
    "https://media1.tenor.com/images/fde044c2edfbef3cb8d40b1b98bd0afa/tenor.gif?itemid=19687747",
    "https://media1.tenor.com/images/62471362b1ece5f27e639e99ffdceb8d/tenor.gif?itemid=19687748",
    "https://media1.tenor.com/images/e108b96b77daffe63753908509f046f1/tenor.gif?itemid=19687753",
    "https://media1.tenor.com/images/8b4c25cb58ac2a174d7b2a7f8c399767/tenor.gif?itemid=19687743",
    "https://media1.tenor.com/images/45be22399513485e115f9bdeadfe4279/tenor.gif?itemid=19687744",
    "https://media1.tenor.com/images/faf5b027d951b99bb4decab23054d5ee/tenor.gif?itemid=19687737",
    "https://media1.tenor.com/images/dde64b67b9cdaed2ba49427b3e345f76/tenor.gif?itemid=19687736",
    "https://media1.tenor.com/images/c9b06024a2bcdb7490eb953c74d4c08c/tenor.gif?itemid=19687732",
    "https://media1.tenor.com/images/1ae45b119d157457c637415dc9ca1a8e/tenor.gif?itemid=19687733",
    "https://media1.tenor.com/images/0599a97169138c976c8ad2cee6131f78/tenor.gif?itemid=19687735",
    "https://media1.tenor.com/images/db1fa1f1bd229341324a3c061e3dcd27/tenor.gif?itemid=19687734",
    "https://media1.tenor.com/images/aa5a795fd114450c7b51f168dfc415b9/tenor.gif?itemid=19687728",
    "https://media1.tenor.com/images/33b0e6e22a97f90863297dbbe41faf7e/tenor.gif?itemid=19687731",
    "https://media1.tenor.com/images/574a294396bbb4c060a43ec16eac479b/tenor.gif?itemid=19687726",
    "https://media1.tenor.com/images/7c9bbb6853600f3379945780279543c9/tenor.gif?itemid=19687725",
    "https://media1.tenor.com/images/80a770d721fd03f898b202b3fc68dc18/tenor.gif?itemid=19687723",
    "https://media1.tenor.com/images/a0bbd5610f94c0757487e0416a21c6d3/tenor.gif?itemid=19687721",
    "https://media1.tenor.com/images/cdd10ab04e55ee429566d974c32321d4/tenor.gif?itemid=19687722",
    "https://media1.tenor.com/images/c29fd12aa08935ce98292aac7fd4d01f/tenor.gif?itemid=19687724",
    "https://media1.tenor.com/images/9d4d6e3ea6bdda8c1ef95842631ba20d/tenor.gif?itemid=19687715",
    "https://media1.tenor.com/images/d2b64a75d9455d8e355f3cdb7c70bf28/tenor.gif?itemid=19687714",
    "https://media1.tenor.com/images/40f2ef9638f1c0607b14a96b97693708/tenor.gif?itemid=19687718",
    "https://media1.tenor.com/images/68cdc1af34a90ea65f4f1fe4991339ef/tenor.gif?itemid=19687717",
    "https://media1.tenor.com/images/dac5bbea9519259051881c79a36e1af4/tenor.gif?itemid=19687713",
    "https://media1.tenor.com/images/5c184b36ad753b25cfd4d29a9c5a4f63/tenor.gif?itemid=19687649",
    "https://media1.tenor.com/images/8661a2293dd62b28c58917923afd387b/tenor.gif?itemid=19687636",
    "https://media1.tenor.com/images/611e30b4d1d7d6e6c861446d1b081b2e/tenor.gif?itemid=19687643",
    "https://media1.tenor.com/images/d53f574030a447d4f2a140d1e355c729/tenor.gif?itemid=19687556",
    "https://media1.tenor.com/images/34fc7a17972b8d4c80fb5499695f5629/tenor.gif?itemid=19687628",
    "https://media1.tenor.com/images/3770b21779274a1c845a93d76f5d1124/tenor.gif?itemid=19687617",
    "https://media1.tenor.com/images/780f15a3730b5702d806d6e47cd0f961/tenor.gif?itemid=19687547",
    "https://media1.tenor.com/images/3a92cf2d50d3f4098765bce87d8bac45/tenor.gif?itemid=19687543",
    "https://media1.tenor.com/images/d046abf05c44374dcde784b561a176db/tenor.gif?itemid=19687538",
    "https://media1.tenor.com/images/aace168e3fd9ca5fde03282609888656/tenor.gif?itemid=19687529",
    "https://media1.tenor.com/images/1059878635ff8cb33ede85f9c3be12f4/tenor.gif?itemid=19687526",
    "https://media1.tenor.com/images/202bffc862d3df017c57b104d6918803/tenor.gif?itemid=19687511",
    "https://media1.tenor.com/images/0bb575825e921e48cba5656f1a048439/tenor.gif?itemid=19687519",
    "https://media1.tenor.com/images/0c1b9dd33eade36d0633f77e3c557334/tenor.gif?itemid=19687515",
    "https://media1.tenor.com/images/514fc3e05f12e1d2cb5990cf9e534f1f/tenor.gif?itemid=19687513",
    "https://media1.tenor.com/images/514fc3e05f12e1d2cb5990cf9e534f1f/tenor.gif?itemid=19687513",
    "https://media1.tenor.com/images/44d7b50ad3f27a2a25d33a880f7893f2/tenor.gif?itemid=19687499",
    "https://media1.tenor.com/images/9d5e535ae9dcb8c04f68da1cb3df9187/tenor.gif?itemid=19687500",
    "https://media1.tenor.com/images/6db244bec8be8b3e9be3b9caac24ab7a/tenor.gif?itemid=19687504",
    "https://media1.tenor.com/images/63e0ab02470c421777fadc9101a5cd1a/tenor.gif?itemid=19687245",
    "https://media1.tenor.com/images/aef2e5375a278f2859857ba6fe139de3/tenor.gif?itemid=19687267",
    "https://media1.tenor.com/images/f81e3b454da7ff97bf0f8179fc542a43/tenor.gif?itemid=19687265",
    "https://media1.tenor.com/images/d4efbec84db1cf0909070a216577ad30/tenor.gif?itemid=19687222",
    "https://media1.tenor.com/images/cd657b6a41ce8e65b2b58a63c3f9c0fa/tenor.gif?itemid=19687213",
    "https://media1.tenor.com/images/08dba43683d030db91f12c8b254766a5/tenor.gif?itemid=19687216",
    "https://media1.tenor.com/images/e691e2cff6c4026b54e624e08dbc2261/tenor.gif?itemid=19687211",

]
const randomFooters = [ 
    "Dummi was born on the 13th of may \n2005 and died on 19th of august 2019.",
    "Dummi loved water!",
    "Dummi was born on friday the 13th.",
    "Dummi weighed over 7kilograms (15 pounds).",
    "Dummi loved dressing up!",
    "Dummi was actually called 'dummi' \nbecause of his stupidity.",
    "Dummi loved yoghurt."

]
const { Command } = require('discord-akairo');
const Discord = require('discord.js');
class DummiCommand extends Command {
    constructor() {
        super('dummi', {
            aliases: ['dummi', 'dum', 'dumster'],
            category: 'support',
            description: 'Get a random picture of Dummi.',
            ownerOnly: false,
            channel: ['guild', 'dm']
        });
    }

	async exec(message) {
        const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
        const randomFooter = randomFooters[Math.floor(Math.random() * randomFooters.length)];
		let embed = new Discord.MessageEmbed()
		.setTitle(`Here have a picture of me...`)
        .setImage(randomImage)
        .setFooter('This command is in memory of Dummi.\nFun fact: ' + randomFooter)
        .setColor(0xaa00cc)
		await message.util.send(embed);
	}
};

module.exports = DummiCommand;