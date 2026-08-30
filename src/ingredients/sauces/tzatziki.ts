import { defineIngredient } from "../../define.js";

export const tzatziki = defineIngredient({
	name: "tzatziki",
	type: "sauce",
	densityMgPerMl: 140,

	examples: [
		{ to: "aioli", amount: 11, unit: "ml", expect: 7 },
		{ to: "gravy", amount: 1, unit: "ml", expect: 1.12 },
	],
});
