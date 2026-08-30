import { defineIngredient } from "../../define.js";

export const hollandaise = defineIngredient({
	name: "hollandaise",
	type: "sauce",
	densityMgPerMl: 195,

	examples: [
		{ to: "marinara", amount: 1, unit: "ml", expect: 0.975 },
		{ to: "chutney", amount: 4, unit: "ml", expect: 5.2 },
	],
});
