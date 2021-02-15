const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const { randColor} = require('../funcs.js')

const truth = [
    'If you could be invisible, what is the first thing you would do?',
    'What is a secret you kept from your parents?',
    'What is the most embarrassing music you listen to?',
    'What is one thing you wish you could change about yourself?',
    'Who is your secret crush?',
    'Who is the last person you creeped on social media?',
    'When was the last time you wet the bed?',
    'If a genie granted you three wishes, what would you ask for?',
    'What is your biggest regret?',
    'Where is the weirdest place you\'ve ever gone to the bathroom?',
    'What is the most food you\'ve ever eaten in a single sitting?',
    'Which player would survive a zombie apocalypse and which would be the first to go?',
    'What excuse have you used before to get out plans with a friend?',
    'What\'s the longest you\'ve ever slept?',
    'What\'s your biggest pet peeve?',
    'When was the last time you lied?',
    'What five things would you bring to a desert island?',
    'What\'s the most embarrassing thing you ever did on a date?',
    'What is the craziest pickup line you\'ve ever used?',
    'What animal do you think you most look like?',
    'How many selfies do you take a day?',
    'What is one thing you would stand in line for an hour for?',
    'When was the last time you cried?',
    'What\'s the longest time you\'ve ever gone without showering?',
    'What\'s the most embarrassing top-played song on your phone?',
    'What was your favorite childhood show?',
    'If you could be a fictional character for a day, who would you choose?',
    'What\'s your biggest fear?',
    'What\'s one silly thing you can\'t live without?',
    'What is the weirdest trend you\'ve ever participated in?',
    'If you could only listen to one song for the rest of your life, what would you choose?',
    'What person do you text the most?',
    'Have you ever been fired from a job?',
    'What is an instant deal breaker in a potential love interest?',
    'If you could only eat one thing for the rest of your life, what would you choose?',
    'What is the biggest lie you ever told your parents?',
    'What\'s the worst physical pain you\'ve ever experienced?',
    'Which player knows you the best?',
    'What\'s your favorite part of your body?',
    'What\'s the weirdest thing you\'ve ever eaten?',
    'Have you ever gone skinny dipping?',
    'Tell us about the worst date you\'ve ever been on?',
    'Who is your celebrity crush?',
    'What\'s the strangest dream you\'ve ever had?',
    'What are the top three things you look for in a boyfriend/girlfriend?',
    'What is your worst habit?',
    'How many stuffed animals do you own?',
    'What is your biggest insecurity?',
    'What was the last thing you searched for on your phone?',
    'If you had to choose between going naked or having your thoughts appear in thought bubbles above your head for everyone to read, which would you choose?',
    'Have you ever walked in on your parents doing it?',
    'After you\'ve dropped a piece of food, what\'s the longest time you\'ve left it on the ground and then ate it?',
    'Have you ever tasted a booger?',
    'Have you ever played Cards Against Humanity with your parents?',
    'What\'s the first thing you would do if you woke up one day as the opposite sex?',
    'Have you ever peed in the pool?',
    'Who do you think is the worst-dressed person in this room?',
    'Have you ever farted in an elevator?',
    'True or false: You have a crush on [fill in the blank].',
    'Of the people in this room, who do you want to trade lives with?',
    'What are some things you think about when sitting on the toilet?',
    'Did you have an imaginary friend growing up?',
    'Do you cover your eyes during a scary part in a movie?',
    'Have you ever practiced kissing in a mirror?',
    'Did your parents ever give you the “birds and the bees” talk?',
    'What is your guilty pleasure?',
    'What is your worst habit?',
    'Has anyone ever walked in on you when going #2 in the bathroom?',
    'Have you ever had a wardrobe malfunction?',
    'Have you ever walked into a wall?',
    'Do you pick your nose?',
    'Do you sing in the shower?',
    'Have you ever peed yourself?',
    'What was your most embarrassing moment in public?',
    'Have you ever farted loudly in class?',
    'Do you ever talk to yourself in the mirror?',
    'You’re in a public restroom and just went #2, then you realized your stall has no toilet paper. What do you do?',
    'What would be in your web history that you’d be embarrassed if someone saw?',
    'Have you ever tried to take a sexy picture of yourself?',
    'Do you sleep with a stuffed animal?',
    'Do you drool in your sleep?',
    'Do you talk in your sleep?',
    'Who is your secret crush?',
    'Do you think [fill in the name] is cute?',
    'Who do you like the least in this room, and why?',
    'What does your dream boy or girl look like?',
    'What is your go-to song for the shower?',
    'Who is the sexiest person in this room?',
    'How would you rate your looks on a scale of 1 to 10?',
    'Would you rather have sex with [insert name] in secret or not have sex with that person, but everyone thinks you did?',
    'What don\'t you like about me?',
    'What color underwear are you wearing right now?',
    'What was the last thing you texted?',
    'If you were rescuing people from a burning building and you had to leave one person behind from this room, who would it be?',
    'Do you think you\'ll marry your current girlfriend/boyfriend?',
    'How often do you wash your undergarments?',
    'Have you ever tasted ear wax?',
    'Have you ever farted and then blamed someone else?',
    'Have you ever tasted your sweat?',
    'What is the most illegal thing you have ever done?',
    'Who is your favorite: Mom or Dad?',
    'Would you trade your sibling in for a million dollars?',
    'Would you trade in your dog for a million dollars?',
    'What is your biggest pet peeve?',
    'If you were allowed to marry more than one person, would you? Who would you choose to marry?',
    'Would you rather lose your sex organs forever or gain 200 pounds?',
    'Would you choose to save 100 people without anyone knowing about it or not save them but have everyone praise you for it?',
    'If you could only hear one song for the rest of your life, what would it be?',
    'If you lost one day of your life every time you said a swear word, would you try not to do it?',
    'Who in this room would be the worst person to date? Why?',
    'Would you rather live with no internet or no A/C or heating?',
    'If someone offered you $1 million to break up with your girlfriend/boyfriend, would you do it?',
    'If you were reborn, what decade would you want to be born in?',
    'If you could go back in time in erase one thing you said or did, what would it be?',
    'Has your boyfriend or girlfriend ever embarrassed you?',
    'Have you ever thought about cheating on your partner?',
    'If you could suddenly become invisible, what would you do?',
    'Have you ever been caught checking someone out?',
    'Have you ever waved at someone thinking they saw you when really they didn\'t? What did you do when you realized it?',
    'What\'s the longest time you\'ve stayed in the bathroom, and why did you stay for that long?',
    'What\'s the most unflattering school picture of you?',
    'Have you ever cried because you missed your parents so much?',
    'Would you rather be caught picking your nose or picking a wedgie?',
    'Describe the strangest dream you\'ve ever had. Did you like it?',
    'Have you ever posted something on social media that you regret?',
    'What is your biggest fear?',
    'Do you pee in the shower?',
    'Have you ever ding dong ditched someone?',
    'The world ends next week, and you can do anything you want (even if it\'s illegal). What would you do?',
    'Would you wear your shirt inside out for a whole day if someone paid you $100?',
    'What is the most childish thing that you still do?',
    'How far would you go to land the guy or girl of your dreams?',
    'Tell us about a time you embarrassed yourself in front of a crush.',
    'Have you ever kept a library book?',
    'Who is one person you pretend to like, but actually don’t?',
    'What children’s movie could you watch over and over again?',
    'Do you have bad foot odor?',
    'Do you have any silly nicknames?',
    'When was the last time you wet the bed?',
    'How many pancakes have you eaten in a single sitting?',
    'Have you ever accidentally hit something with your car?',
    'If you had to make out with any Disney character, who would it be?',
    'Have you ever watched a movie you knew you shouldn’t?',
    'Have you ever wanted to try LARP (Live Action Role-Play)?',
    'What app on your phone do you waste the most time on?',
    'Have you ever pretended to be sick to get out of something? If so, what was it?',
    'What is the most food you’ve eaten in a single sitting?',
    'Do you dance when you’re by yourself?',
    'Would you have voted for or against Trump?',
    'What song on the radio do you sing with every time it comes on?',
    'Do you sleep with a stuffed animal?',
    'Do you own a pair of footie pajamas?',
    'Are you scared of the dark?',
    'What "as seen on TV" product do you secretly want to buy?',
    'Do you still take bubble baths?',
    'If you were home by yourself all day, what would you do?',
    'How many selfies do you take a day?',
    'What is something you’ve done to try to be ‘cooler’?',
    'When was the last time you brushed your teeth?',
    'Have you ever used self-tanner?',
    'What do your favorite pajamas look like?',
    'Do you have a security blanket?',
    'Have you ever eaten something off the floor?',
    'Have you ever butt-dialed someone?',
    'Do you like hanging out with your parents?',
    'Have you ever got caught doing something you shouldn’t?',
    'What part of your body do you love, and which part do you hate?',
    'Have you ever had lice?',
    'Have you ever pooped your pants?',
    'What was the last R-rated movie you watched?',
    'Do you lick your plate?',
    'What is something that no one else knows about you?',
    'Do you write in a diary?',
];

const dare = [
    'test',
    'test1',
    'test2'

];
const random = () => Math.floor[Math.random() * (2)]
const truths = () => truth[Math.floor(Math.random() *  truth.length)];
const dares = () => dare[Math.floor(Math.random() *  dare.length)];
class ToDCommand extends Command {
    constructor() {
        super('tod', {
            aliases: ['truth', 'dare', 'tod'],
            category: 'fun',
            description: 'Truth or dare',
            channel: ['guild', 'dm']
        })
    }
    async exec(message) {
        let TruthEmbed = new Discord.MessageEmbed()
        .setTitle('Truth!')
        .setDescription(`${truths()}`)
        .setColor(randColor())
        let DareEmbed = new Discord.MessageEmbed()
        .setTitle('Dare!')
        .setDescription(`I dare you to ${dares()}`)
        .setColor(randColor())
		if (message.util.parsed.alias === 'truth') {
            return message.util.send(TruthEmbed)
        }
        if (message.util.parsed.alias === 'dare') {
            return message.util.send(DareEmbed)
        }
        if (message.util.parsed.alias === 'tod') {
            if (random == 0) {
                return message.util.send(DareEmbed)
            }
            if (random == 1) {
                return message.util.send(DareEmbed)
            }
            else {
                return message.util.send(TruthEmbed)
            }
        }
    }
}

module.exports = ToDCommand;