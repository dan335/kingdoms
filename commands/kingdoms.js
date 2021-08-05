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
	
		let i = 1;
		users.forEach(user => {
			let shrines = '';

			for (let i = 1; i < user.shrines; i++) {
				shrines += '⛩️';
			}

			str += i+'. **'+user.name + "** - population: **"+_f.formatNumber(user.population, 0)+"**, shrines: **"+_f.formatNumber(user.shrines, 3)+'** '+shrines+"\n";
			i++;
		})


		const embeded = new MessageEmbed()
		.setTitle('-[ The Kingdoms of Enno Games 🏰 ]-')
		.setColor('#0099ff')
		.setDescription(str)

		

		return interaction.reply({
			content: _f.timeString(),
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