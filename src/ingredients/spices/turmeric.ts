import { defineIngredient } from "../../define.js";

export const turmeric = defineIngredient({
	name: "turmeric",
	type: "spice",
	densityMgPerMl: 520,

	examples: [
		{ to: "cumin", amount: 45, unit: "ml", expect: 52 },
		{ to: "cinnamon", amount: 1, unit: "ml", expect: 1.083, tolerance: 0.001 },
	],
});
