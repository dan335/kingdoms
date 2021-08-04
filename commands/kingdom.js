const { MessageEmbed } = require('discord.js');
const _f = require('../functions.js');

module.exports = {
	name: 'kingdom',
	description: 'View your kingdom.',
	async execute(interaction, db, client) {
		const usersCollection = db.collection('users');
		const user = await usersCollection.findOne({discordId: interaction.user.id});

		if (!user) {
			return interaction.reply('You are not in the game.  Join with /joingame.');
		}

		let desc = user.hasAttackedToday ? "Your soldiers are tired and cannot attack again today.  \n\n" : "Your soldiers are ready to attack.  \n\n";

		desc += "Last turn you gained "+_f.formatNumber(user.foodGained, 3)+" food.  ";
		desc += "Gained "+_f.formatNumber(user.populationGained, 3)+" population.  ";
		desc += "Gained "+_f.formatNumber(user.researchGained, 3)+" research.  ";
		desc += "Trained "+_f.formatNumber(user.soldiersGained, 3)+" soldiers.  ";
		desc += "Built "+_f.formatNumber(user.shrinesGained, 3)+" shrines.  ";

		const embeded = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle("-[ **"+user.name+"**'s Kingdom ]-")
		.setDescription(desc)
		.addFields(
			{name:'😀 Population', value:_f.formatNumber(user.population, 3)},
			{name:'👷 Builders', value:_f.formatNumber(user.builders * 100, 0)+"% = "+_f.formatNumber(user.population * user.builders, 3)+"\n"+_f.formatNumber(user.shrines, 3)+" Shrines ⛩️", inline: true},
			{name:'⚔️ Recruitment', value:_f.formatNumber(user.recruitment * 100, 0)+"% = "+_f.formatNumber(user.population * user.recruitment, 3)+"\n"+ _f.formatNumber(user.soldiers, 3)+" Soldiers", inline: true},
			{name:'🌾 Farmers', value:_f.formatNumber(user.farmers * 100, 0)+"% = "+_f.formatNumber(user.population * user.farmers, 3)+"\n"+_f.formatNumber(user.food, 3)+" Food 🌮", inline: true},
			{name:'📐 Researchers', value:_f.formatNumber(user.researchers * 100, 0)+"% = "+_f.formatNumber(user.population * user.researchers, 3)+"\n"+_f.formatNumber(user.research, 3)+'x Technology', inline: true},
		)
		.setThumbnail(interaction.user.avatarURL())

		return interaction.reply({
			content: "Server time: "+_f.formatAMPM(new Date()) + " | " + (60 - new Date().getMinutes()).toString()+" minutes until next turn.",
			embeds: [embeded]
		});
	},
};
