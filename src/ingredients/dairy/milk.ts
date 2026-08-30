import { defineIngredient } from "../../define.js";

export const milk = defineIngredient({
	name: "milk",
	type: "dairy",
	densityMgPerMl: 1030,

	examples: [
		{ to: "cream", amount: 1, unit: "ml", expect: 1.03 },
		{ to: "half and half", amount: 1, unit: "ml", expect: 1.004878, tolerance: 1e-6 },
	],
});
