import { defineIngredient } from "../../define.js";

export const kefir = defineIngredient({
	name: "kefir",
	type: "dairy",
	densityMgPerMl: 1040,

	examples: [
		{ to: "sour cream", amount: 101, unit: "ml", expect: 104 },
		{ to: "milk", amount: 1, unit: "ml", expect: 1.009709, tolerance: 1e-6 },
	],
});
