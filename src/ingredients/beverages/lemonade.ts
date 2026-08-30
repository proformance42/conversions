import { defineIngredient } from "../../define.js";

export const lemonade = defineIngredient({
	name: "lemonade",
	type: "beverage",
	densityMgPerMl: 1.2,

	examples: [
		{ to: "rum", amount: 1, unit: "ml", expect: 0.8 },
		{ to: "cider", amount: 5, unit: "ml", expect: 2 },
	],
});
