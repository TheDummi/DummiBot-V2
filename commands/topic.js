const {randColor} = require("../funcs.js");
const Discord = require("discord.js");
const { Command } = require('discord-akairo');
const randTopic = [
    "Would you rather be the best player on a horrible team or the worst player on a great team?",
    "What is your favorite party game (or board game)?",
    "If you could choose your last meal, what would it be?",
    "Do you believe in a higher being?",
    "What job would you like to do?",
    "What was/is your favorite subject in school?",
    "What is the best thing about school/work?",
    "What are things that you should not say at your own wedding?",
    "Would you rather not be able to use your hands or not be able to walk?",
    "What is your favourite game?",
    "What is your favourite book?",
    "What is your favourite food?",
    "What is your favourite sports?",
    "What is your favourite song?",
    "What is your favourite music genre",
    "Who is your favourite artist?",
    "What is your favourite animal?",
    "What is your favourite place to travel to?",
    "Is global climate change caused by humans?",
    "Is the death penalty effective?",
    "Is our election process fair?",
    "Is torture ever acceptable?",
    "Should men get paternity leave from work?",
    "Are school uniforms beneficial?",
    "Do we have a fair tax system?",
    "Do curfews keep teens out of trouble?",
    "Is cheating out of control?",
    "Are we too dependent on computers?",
    "Should animals be used for research?",
    "Should cigarette smoking be banned?",
    "Are cell phones dangerous?",
    "Are law enforcement cameras an invasion of privacy?",
    "Do we have a throwaway society?",
    "Is child behavior better or worse than it was years ago?",
    "Should companies market to children?",
    "Should the government have a say in our diets?",
    "Does access to condoms prevent teen pregnancy?",
    "Should members of Congress have term limits?",
    "Are actors and professional athletes paid too much?",
    "Are CEOs paid too much?",
    "Should athletes be held to high moral standards?",
    "Do violent video games cause behavior problems?",
    "Should creationism be taught in public schools?",
    "Are beauty pageants exploitative?",
    "Should English be the official language of the United States?",
    "Should the racing industry be forced to use biofuels?",
    "Should the alcohol drinking age be increased or decreased?",
    "Should everyone be required to recycle?",
    "Is it okay for prisoners to vote (as they are in some states)?",
    "Is it good that same-sex couples are able to marry?",
    "Are there benefits to attending a single-sex school?",
    "Does boredom lead to trouble?",
    "Should schools be in session year-round?",
    "Does religion cause war?",
    "Should the government provide health care?",
    "Should abortion be illegal?",
    "Are girls too mean to each other?",
    "Is homework harmful or helpful?",
    "Is the cost of college too high?",
    "Is college admission too competitive?",
    "Should euthanasia be illegal?",
    "Should the federal government legalize marijuana use nationally?",
    "Should rich people be required to pay more taxes?",
    "Should schools require foreign language or physical education?",
    "Is affirmative action fair?",
    "Is public prayer okay in schools?",
    "Are schools and teachers responsible for low test scores?",
    "Is greater gun control a good idea?",
    "What do you do in your free time?",
    "Do you play any musical instruments?",
    "Do you draw, paint or do art?",
    "Do you like dancing?",
    "What do you do/study?",
    "What is your most (or least) favorite subject in school?",
    "How do you get along with the people you work with?",
    "What is your dream job?",
    "What countries have you traveled to?",
    "What was your biggest experience of “culture shock” in another country?",
    "Where in the world would you love to live most? Why?",
    "How does your home country compare to here?",
    "What’s the worst thing that’s happened to you while traveling?",
    "Have you ever traveled by yourself?",
    "Do you speak any other languages?",
    "What’s your favorite movie (or TV show) ever?",
    "Which movie/book/show are you ashamed to admit you love?",
    "Which movie are you most looking forward to being released?",
    "What kind of books do you usually read? What was the last one you read?",
    "What kind of music are you into right now?",
    "What concerts have you been to?",
    "What movies have you watched more than once? Or what books have you read multiple times?",
    "Do you play video games?",
    "Where did you grow up?",
    "What were you like as a kid?"
];
class TopicCommand extends Command {
    constructor() {
        super('topic', {
            aliases: ['topic', 'top'],
            category: 'fun',
            description: 'Get a random topic',
            ownerOnly: false,
            channel: 'guild'
        })
    }

async exec(message) {
    const randTopics = randTopic[Math.floor(Math.random() * randTopic.length)];
    let member;
	if (message.mentions.users.array()[0]) member = await message.guild.members.fetch(message.mentions.users.array()[0].id);
	else member = message.member;
    let embed = new Discord.MessageEmbed()
        .setTitle(randTopics)
        .setFooter(`Requested by: ${message.member.nickname || message.author.username}`)
		.setColor(randColor())
        await message.channel.send(embed);
        await message.delete()
    }
};

module.exports = TopicCommand;