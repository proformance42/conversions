import { defineIngredient } from "../../define.js";

export const peanutOil = defineIngredient({
	name: "peanut oil",
	type: "oil",
	densityMgPerMl: 914,

	examples: [
		{ to: "walnut oil", amount: 1, unit: "ml", expect: 0.995643, tolerance: 1e-6 },
		{ to: "ghee", amount: 1, unit: "ml", expect: 1.003293, tolerance: 1e-6 },
	],
});
