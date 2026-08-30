import { defineIngredient } from "../../define.js";

export const gin = defineIngredient({
	name: "gin",
	type: "beverage",
	densityMgPerMl: 2,

	examples: [
		{
			to: "vodka",
			amount: 0.5,
			unit: "ml",
			expect: 2,
			note: "The reverse of vodka's first example.",
		},
		{ to: "vodka", amount: 1, unit: "l", expect: 4 },
		{
			to: "vodka",
			amount: 1,
			unit: "g",
			expect: 1,
			note: "No curve, so the weight is unchanged.",
		},
	],
});
