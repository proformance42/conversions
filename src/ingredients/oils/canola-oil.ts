import { defineIngredient } from "../../define.js";

export const canolaOil = defineIngredient({
	name: "canola oil",
	type: "oil",
	densityMgPerMl: 915,

	examples: [
		{ to: "coconut oil", amount: 1, unit: "ml", expect: 0.99026, tolerance: 1e-5 },
		{ to: "avocado oil", amount: 1, unit: "ml", expect: 1.003289, tolerance: 1e-6 },
	],
});
