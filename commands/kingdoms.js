const { MessageEmbed } = require('discord.js');
const _f = require('../functions.js');


module.exports = {
	name: 'kingdoms',
	description: 'View all of the kingdoms.',
	async execute(interaction, db) {
		const usersCollection = db.collection('users');
		const users = await usersCollection.find({}).toArray();
		users.sort( compare );

		let str = "";
	
		users.forEach(user => {
			let shrines = '';

			for (let i = 0; i < user.shrines; i++) {
				shrines += '⛩️';
			}

			str += '**'+user.name + "** - population: **"+user.population+"**, shrines: **"+_f.formatNumber(user.shrines, 3)+'** '+shrines+"\n";
		})


		const embeded = new MessageEmbed()
		.setTitle('-[ The Kingdoms of Enno Games 🏰 ]-')
		.setColor('#0099ff')
		.setDescription(str)

		

		return interaction.reply({
			content: "Server time: "+_f.formatAMPM(new Date()) + " | " + (60 - new Date().getMinutes()).toString()+" minutes until next turn.",
			embeds: [embeded]
		});
	},
};



function compare( a, b ) {
	if ( a.shrines < b.shrines ){
	  return 1;
	}
	if ( a.shrines > b.shrines ){
	  return -1;
	}
	return 0;
  }