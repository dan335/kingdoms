// Takes an array of hours as number and a function to execute
const executeOnHours = (hours, callback) => {
  //callback(); // First, execute once
  let now = new Date();
  const hoursWithToogle = hours.map(h => {
    return {
      value: h,
      executedToday: now.getHours() === h // Don't run now if already on the given hour
    }
  });
  setInterval(() => {
    now = new Date();
    const triggers = hoursWithToogle.filter(h => {
      if (!h.executedToday && h.value === now.getHours()) {
        return h.executedToday = true;
      } else if (h.value !== now.getHours()) {
        h.executedToday = false; // Clean the boolean on the next hour
      }
    });
    if (triggers.length) callback(); // Trigger the action if some hours match
  }, 30000); // Fix a precision for the check, here 30s
}


const newDay = (game) => {

	// reset attacks
	game.users.forEach(user => {
		user.hasAttackedToday = false;
	})

	game.users.forEach(user => {
		// do research
		user.research += 0.1 * user.researchers;

		// give food
		user.food += user.population * user.farmers * user.research;

		// take away food
		user.food -= user.population  - user.population * user.farmers;

		// grow population
		if (user.food > 0) {
			user.population += 10;
		} else {
			user.population -= 10;
		}

		// build shrines
		user.shrines += user.population * user.builders * 0.01;
	})
}

module.exports = {executeOnHours:executeOnHours, newDay:newDay}