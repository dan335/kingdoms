module.exports = {
	name: 'help',
	description: 'Guide to Kingdoms.',
	async execute(interaction, game) {
		return interaction.reply("\
__Population__ - Everyone starts with the same population.  If you have extra food then your population will grow.  You can steal food by attacking someone.\n\
\n\
__Farmers__ - Farmers produce food.  Soldiers, builders and researchers consume food.  If you don't have enough food then you will lose population.\n\
__Soldiers__ - Soldiers protect your realm from attacks.\n\
__Builders__ - Builders work on building a shrine.  If you build a shrine then you win the game.\n\
__Researchers__ - Researchers speed up farming and building.\n\
\n\
__/joingame__ - Join the game.\n\
__/assign__ - Use the /assign command to assign a percentage of population to farmers, soldiers, builders or researchers.\n\
__/attack__ - Use the /attack command to attack someone and steal their food.\n\
			");
	},
};