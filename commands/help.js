module.exports = {
	name: 'help',
	description: 'Guide to Kingdoms.',
	async execute(interaction, game) {
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
__/attack__ - Use the /attack command to attack someone and steal their food.  You can attack once every 6 hours\n\
\n\
Every 6 hours the game updates.  The winner is whoever has the most shrines.  If the bot goes down then the game is over and restarts.\n\
\n\
Source at https://github.com/dan335/kingdoms\
			");
	},
};