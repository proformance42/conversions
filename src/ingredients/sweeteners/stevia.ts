import { defineIngredient } from "../../define.js";

export const stevia = defineIngredient({
	name: "stevia",
	type: "sweetener",
	densityMgPerMl: 1100,

	examples: [
		{ to: "sorghum", amount: 68, unit: "ml", expect: 55 },
		{ to: "honey", amount: 1, unit: "ml", expect: 0.775, tolerance: 0.001 },
	],
});
