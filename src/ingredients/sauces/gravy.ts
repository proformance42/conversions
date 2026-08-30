import { defineIngredient } from "../../define.js";

export const gravy = defineIngredient({
	name: "gravy",
	type: "sauce",
	densityMgPerMl: 125,

	examples: [
		{ to: "pesto", amount: 18, unit: "ml", expect: 12.5 },
		{ to: "marinara", amount: 1, unit: "ml", expect: 0.625 },
	],
});
