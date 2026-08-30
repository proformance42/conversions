import { defineIngredient } from "../../define.js";

export const agave = defineIngredient({
	name: "agave",
	type: "sweetener",
	densityMgPerMl: 1380,

	examples: [
		{ to: "maple syrup", amount: 66, unit: "ml", expect: 69 },
		{ to: "glucose", amount: 145, unit: "ml", expect: 138 },
	],
});
