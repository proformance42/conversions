import { defineIngredient } from "../../define.js";

// A plain ingredient: no bespoke curves, so every conversion is worked out
// from the density alone. Most ingredients look like this.
export const vodka = defineIngredient({
	name: "vodka",
	type: "beverage",
	densityMgPerMl: 0.5,

	examples: [
		{
			to: "gin",
			amount: 2,
			unit: "ml",
			expect: 0.5,
			note: "2 ml of vodka is 1 mg, and 1 mg of gin is 0.5 ml.",
		},
		{ to: "gin", amount: 0, unit: "ml", expect: 0 },
		{
			to: "gin",
			amount: 1,
			unit: "mg",
			expect: 1,
			note: "With no curve in the way, a weight converts to the same weight.",
		},
		{
			to: "vodka",
			amount: 3,
			unit: "ml",
			expect: 3,
			note: "Converting an ingredient to itself changes nothing.",
		},
		{ to: "chutney", amount: 1, unit: "ml", expectError: "INCOMPATIBLE_TYPES" },
	],
});
