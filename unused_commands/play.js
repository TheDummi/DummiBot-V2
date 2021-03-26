const ytdl = require("ytdl-core")
function validURL(str) {
	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
	'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
	'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
	'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
	'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
	'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	return !!pattern.test(str);
}
module.exports = {
    name: 'play',
    category: 'music',
    description: 'Play a song.',
    async execute(message, args) {
        if (!message.member.voice.channel) {
            return message.reply("You are not in a voice channel!")
        }
        var connection = await message.member.voice.channel.join();
        var dispatcher;
        if (!validURL(args[0])) {
            await message.guild.me.voice.channel.leave()
            return message.reply('Please use a valid url.');
        }
        try {
            dispatcher = connection.play(ytdl(args[0], { filter: 'audioonly' }));
            message.delete()
        }
        catch {
            if (String(e) === "Error: Not a YouTube domain") {
                dispatcher = connection.play(args[0]);
                message.delete()
            }
            else {
                await message.guild.me.voice.channel.leave()
                return await message.reply("Error playing url, is it a valid audio source?")
            }
        }
    },
};