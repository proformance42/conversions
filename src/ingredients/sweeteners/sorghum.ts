import { defineIngredient } from "../../define.js";

export const sorghum = defineIngredient({
	name: "sorghum",
	type: "sweetener",
	densityMgPerMl: 1360,

	examples: [
		{ to: "maple syrup", amount: 33, unit: "ml", expect: 34 },
		{ to: "treacle", amount: 1, unit: "ml", expect: 0.944, tolerance: 0.001 },
	],
});
