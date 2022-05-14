const { MessageEmbed } = require('discord.js');
const _f = require('../functions.js');


module.exports = {
	name: 'winners',
	description: 'Past winners.',
	async execute(interaction, db) {
		const winnersCollection = db.collection('winners');
		const winners = await winnersCollection.find({}).toArray();
		winners.sort( compare );

		let str = "";
	
		let i = 1;
		winners.forEach(winner => {
			str += i+'. **'+winner.user.name + "** - population: **"+_f.formatNumber(winner.user.population, 0)+"**\n";
			i++;
		})


		const embeded = new MessageEmbed()
		.setTitle('-[ The Winners of Kingdoms 🏰 ]-')
		.setColor('#0099ff')
		.setDescription(str)

		return interaction.reply({
			content: _f.timeString(),
			embeds: [embeded]
		});
	},
};



function compare( a, b ) {
	if ( a.date < b.date ){
	  return 1;
	}
	if ( a.date > b.date ){
	  return -1;
	}
	return 0;
  }