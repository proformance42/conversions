import { defineIngredient } from "../../define.js";

export const glucose = defineIngredient({
	name: "glucose",
	type: "sweetener",
	densityMgPerMl: 1450,

	examples: [
		{ to: "treacle", amount: 144, unit: "ml", expect: 145 },
		{ to: "agave", amount: 138, unit: "ml", expect: 145 },
	],
});
