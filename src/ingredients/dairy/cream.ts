import { defineIngredient } from "../../define.js";

export const cream = defineIngredient({
	name: "cream",
	type: "dairy",
	densityMgPerMl: 1000,

	examples: [
		{ to: "milk", amount: 103, unit: "ml", expect: 100 },
		{ to: "half and half", amount: 41, unit: "ml", expect: 40 },
	],
});
