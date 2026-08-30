import { defineIngredient } from "../../define.js";

export const halfAndHalf = defineIngredient({
	name: "half and half",
	type: "dairy",
	densityMgPerMl: 1025,

	examples: [
		{ to: "cream", amount: 1, unit: "ml", expect: 1.025 },
		{ to: "milk", amount: 103, unit: "ml", expect: 102.5 },
	],
});
