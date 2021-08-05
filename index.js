// https://discordapp.com/oauth2/authorize?client_id=871916605339238400&scope=bot&permissions=122406578240
require('dotenv').config();
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
//const { token } = require('./config.json');
const token = process.env.TOKEN;
const _f = require('./functions.js');
const { MongoClient } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true });
var cron = require('node-cron');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


mongo.connect(error => {
	if (error) {
		console.log('Error connecting to mongodb.');
		console.log(error);
		return;
	}

	const db = mongo.db(process.env.MONGO_DB);

  	client.once('ready', () => {
		client.commands.forEach(c => {
			client.guilds.cache.get('299633112328175617')?.commands.create(c);
		})

		console.log('Kingdoms is ready to go!');
	});


	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return;

		if (!client.commands.has(interaction.commandName)) return;

		try {
			await client.commands.get(interaction.commandName).execute(interaction, db, client);
		} catch (error) {
			console.error(error);
			return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	});

  	client.login(token);

	cron.schedule('0 * * * *', () => {
		_f.newDay(db);
		_f.checkForGameOver(db);
	});
})






