import { defineIngredient } from "../../define.js";

export const whiskey = defineIngredient({
	name: "whiskey",
	type: "beverage",
	densityMgPerMl: 0.8,

	examples: [
		{ to: "vodka", amount: 1, unit: "ml", expect: 1.6 },
		{ to: "gin", amount: 1, unit: "ml", expect: 0.4 },
	],
});
