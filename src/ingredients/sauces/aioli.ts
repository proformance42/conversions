import { defineIngredient } from "../../define.js";

export const aioli = defineIngredient({
	name: "aioli",
	type: "sauce",
	densityMgPerMl: 220,

	examples: [
		{ to: "chutney", amount: 1.5, unit: "ml", expect: 2.2 },
		{
			to: "hollandaise",
			amount: 1,
			unit: "ml",
			expect: 1.128,
			tolerance: 0.001,
			note: "The exact answer runs on forever, so we only check it to the nearest thousandth.",
		},
	],
});
