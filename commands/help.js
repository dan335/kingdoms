const { MessageEmbed } = require('discord.js');
const _f = require('../functions.js');

module.exports = {
	name: 'help',
	description: 'Guide to Kingdoms.',
	async execute(interaction, db) {

		const embeded = new MessageEmbed()
		.setTitle('-[ Kingdoms Guide ]-')
		.setDescription("The winner is whoever build 10 shrines first.  The game updates every hour.")
		.addFields(
			{name:'😀 Population', value:"The number of people in your kingdom.  If you have extra food then your population will grow."},
			{name:'🌾 Farmers and Food', value:"Farmers produce food.  Soldiers, builders and researchers consume food.  If you don't have enough food then you will lose population."},
			{name:'⚔️ Soldiers and Recruitment', value:"Soldiers protect your realm from attacks and can attack other realms to steal their food and damage their shrines.  When recruitment is above 0 a portion of your population will be turned into soldiers."},
			{name:'👷 Builders and Shrines', value:"Builders work on building shrines.  The winner is whoever has the most shrines."},
			{name:'📐 Researchers and Technology', value:"Technology speeds up farming and building.  Research it with researchers."},
			{name:'/joingame', value:'Join the game.'},
			{name:'/assign', value:'Use the /assign command to assign a percentage of population to farmers, soldiers, builders or researchers.'},
			{name:'/attack', value:'Use the /attack command to attack someone, damage their shrines and steal their food.  You can attack once every hour.'},
		)
		.setFooter("Source code at https://github.com/dan335/kingdoms")

		return interaction.reply({
			content: _f.timeString(),
			embeds: [embeded]
		});
	},
};