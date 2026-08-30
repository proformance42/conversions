import { defineIngredient } from "../../define.js";

export const cumin = defineIngredient({
	name: "cumin",
	type: "spice",
	densityMgPerMl: 450,

	examples: [
		{ to: "cayenne", amount: 44, unit: "ml", expect: 45 },
		{ to: "turmeric", amount: 1, unit: "ml", expect: 0.865, tolerance: 0.001 },
	],
});
