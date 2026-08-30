import { defineIngredient } from "../../define.js";

export const avocadoOil = defineIngredient({
	name: "avocado oil",
	type: "oil",
	densityMgPerMl: 912,

	examples: [
		{ to: "ghee", amount: 1, unit: "ml", expect: 1.001098, tolerance: 1e-6 },
		{ to: "olive oil", amount: 1, unit: "ml", expect: 0.998905, tolerance: 1e-6 },
	],
});
