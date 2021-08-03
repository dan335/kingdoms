// https://discordapp.com/oauth2/authorize?client_id=871916605339238400&scope=bot&permissions=122406578240
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const _f = require('./functions.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

let game = {
	users: []
};


client.once('ready', () => {
	client.commands.forEach(c => {
		client.guilds.cache.get('584901103083323392')?.commands.create(c);
	})

	console.log('Kingdoms is ready to go!');
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (!client.commands.has(interaction.commandName)) return;

	try {
		await client.commands.get(interaction.commandName).execute(interaction, game);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


_f.executeOnHours([0, 12], function() {

	_f.newDay(game);

	

});



client.login(token);