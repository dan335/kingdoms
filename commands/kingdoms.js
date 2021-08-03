module.exports = {
	name: 'kingdoms',
	description: 'View all of the kingdoms.',
	async execute(interaction, game) {
		let str = "";

		game.users.forEach(user => {
			str += user.name + " - population: "+user.population+" shrines: "+user.shrines+"\n";
		})

		if (str == "") {
			return interaction.reply("No kingdoms.");
		} else {
			return interaction.reply(str);
		}
		
	},
};