import { defineIngredient } from "../../define.js";

export const breadFlour = defineIngredient({
	name: "bread flour",
	type: "flour",
	densityMgPerMl: 545,

	examples: [
		{ to: "cake flour", amount: 1, unit: "ml", expect: 1.10101, tolerance: 1e-5 },
		{ to: "rye flour", amount: 102, unit: "ml", expect: 109 },
	],
});
