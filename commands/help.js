const { MessageEmbed } = require('discord.js');
const _f = require('../functions.js');

module.exports = {
	name: 'help',
	description: 'Guide to Kingdoms.',
	async execute(interaction, db) {

		const embeded = new MessageEmbed()
		.setTitle('-[ Kingdoms Guide ]-')
		.setDescription("The winner is whoever has the most shrines.  Every hour the game updates.")
		.addFields(
			{name:'😀 Population', value:"The number of people in your kingdom.  If you have extra food then your population will grow."},
			{name:'🌾 Farmers and Food', value:"Farmers produce food.  Soldiers, builders and researchers consume food.  If you don't have enough food then you will lose population."},
			{name:'⚔️ Soldiers and Recruitment', value:"Soldiers protect your realm from attacks and can attack other realms to steal their food.  When recruitment is above 0 a portion of your population will be turned into soldiers."},
			{name:'👷 Builders and Shrines', value:"Builders work on building shrines.  The winner is whoever has the most shrines."},
			{name:'📐 Researchers and Technology', value:"Technology speeds up farming and building.  Research it with researchers."},
			{name:'/joingame', value:'Join the game.'},
			{name:'/assign', value:'Use the /assign command to assign a percentage of population to farmers, soldiers, builders or researchers.'},
			{name:'/attack', value:'Use the /attack command to attack someone and steal their food.  You can attack once every hour.'},
		)
		.setFooter("Source code at https://github.com/dan335/kingdoms")

		return interaction.reply({
			content: "Server time: "+_f.formatAMPM(new Date()) + " | " + (60 - new Date().getMinutes()).toString()+" minutes until next turn.",
			embeds: [embeded]
		});

		return interaction.reply("\
__Population__ - The number of people in your kingdom.  If you have extra food then your population will grow.\n\
\n\
__Farmers__ - Farmers produce food.  Soldiers, builders and researchers consume food.  If you don't have enough food then you will lose population.\n\
__Soldiers__ - Soldiers protect your realm from attacks and can attack other realms to steal their food.\n\
__Builders__ - Builders work on building shrines.  The winner is whoever has the most shrines.\n\
__Researchers__ - Researchers speed up farming and building.\n\
\n\
__/joingame__ - Join the game.\n\
__/assign__ - Use the /assign command to assign a percentage of population to farmers, soldiers, builders or researchers.\n\
__/attack__ - Use the /attack command to attack someone and steal their food.  You can attack once every hour\n\
\n\
Every hour the game updates.  The winner is whoever has the most shrines.  If the bot goes down then the game is over and restarts.\n\
\n\
Source at https://github.com/dan335/kingdoms\
			");
	},
};