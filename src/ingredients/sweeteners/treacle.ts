import { defineIngredient } from "../../define.js";

export const treacle = defineIngredient({
	name: "treacle",
	type: "sweetener",
	densityMgPerMl: 1440,

	examples: [
		{ to: "glucose", amount: 145, unit: "ml", expect: 144 },
		{ to: "molasses", amount: 70, unit: "ml", expect: 72 },
	],
});
