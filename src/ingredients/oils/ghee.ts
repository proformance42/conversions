import { defineIngredient } from "../../define.js";

export const ghee = defineIngredient({
	name: "ghee",
	type: "oil",
	densityMgPerMl: 911,

	examples: [
		{ to: "olive oil", amount: 1, unit: "ml", expect: 0.997809, tolerance: 1e-6 },
		{ to: "avocado oil", amount: 1, unit: "ml", expect: 0.998904, tolerance: 1e-6 },
	],
});
