import { defineIngredient } from "../../define.js";

export const cider = defineIngredient({
	name: "cider",
	type: "beverage",
	densityMgPerMl: 3,

	examples: [
		{ to: "lemonade", amount: 1, unit: "ml", expect: 2.5 },
		{ to: "vodka", amount: 1, unit: "ml", expect: 6 },
	],
});
