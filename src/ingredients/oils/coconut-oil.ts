import { defineIngredient } from "../../define.js";

// Oils all weigh within a whisker of each other, so their conversions are very
// close to one for one and the expected answers need a tolerance.
export const coconutOil = defineIngredient({
	name: "coconut oil",
	type: "oil",
	densityMgPerMl: 924,

	examples: [
		{ to: "canola oil", amount: 1, unit: "ml", expect: 1.009836, tolerance: 1e-6 },
		{
			to: "canola oil",
			amount: 100,
			unit: "g",
			expect: 100,
			note: "By weight it is exactly one for one, because there is no curve on this pair.",
		},
	],
});
