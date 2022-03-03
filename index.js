const {Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.DIRECT_MESSAGES , Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES]
})
const config = require('./config.json');

client.once('ready' , () => {
    console.log(`Logged as: ${client.user.tag}`);
})

client.on('messageCreate' , async(message) => {
    let prefix = config.settings.prefix;
    if(message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const cmd = args.shift().toLowerCase();

    for(var names in config.links){
        const link = config.links[names];

        if(cmd === names){
            const embed = new MessageEmbed()
                .setDescription(`You have requsted the ${names} link.\n[Click here](${link}) to access it.`)

            await message.author.send({embeds: [embed]}).catch(() => console.log(`${message.author.tag}, Has dms off.`));
        }
    }
})

client.login(config.settings.token);