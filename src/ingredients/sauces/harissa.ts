import { defineIngredient } from "../../define.js";

export const harissa = defineIngredient({
	name: "harissa",
	type: "sauce",
	densityMgPerMl: 165,

	examples: [
		{ to: "gravy", amount: 1, unit: "ml", expect: 1.32 },
		{ to: "chutney", amount: 1, unit: "ml", expect: 1.1 },
		{ to: "tzatziki", amount: 1, unit: "ml", expect: 1.179, tolerance: 0.001 },
	],
});
