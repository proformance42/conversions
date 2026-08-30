import { defineIngredient } from "../../define.js";

export const rum = defineIngredient({
	name: "rum",
	type: "beverage",
	densityMgPerMl: 1.5,

	examples: [
		{ to: "gin", amount: 1, unit: "ml", expect: 0.75 },
		{ to: "whiskey", amount: 1, unit: "ml", expect: 1.875 },
	],
});
