import { defineIngredient } from "../../define.js";

export const sourCream = defineIngredient({
	name: "sour cream",
	type: "dairy",
	densityMgPerMl: 1010,

	examples: [
		{ to: "kefir", amount: 104, unit: "ml", expect: 101 },
		{ to: "cream", amount: 1, unit: "ml", expect: 1.01 },
	],
});
