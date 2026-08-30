import { defineIngredient } from "../../define.js";

export const pesto = defineIngredient({
	name: "pesto",
	type: "sauce",
	densityMgPerMl: 180,

	examples: [
		{ to: "marinara", amount: 1, unit: "ml", expect: 0.9 },
		{ to: "aioli", amount: 11, unit: "ml", expect: 9 },
		{
			to: "marinara",
			amount: 1,
			unit: "g",
			expect: 1,
			note: "No curve on this pair, so a weight swaps for the same weight.",
		},
	],
});
