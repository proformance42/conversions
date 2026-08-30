import { defineIngredient } from "../../define.js";

export const walnutOil = defineIngredient({
	name: "walnut oil",
	type: "oil",
	densityMgPerMl: 918,

	examples: [
		{ to: "peanut oil", amount: 1, unit: "ml", expect: 1.004376, tolerance: 1e-6 },
		{ to: "coconut oil", amount: 1, unit: "ml", expect: 0.993506, tolerance: 1e-6 },
	],
});
