import { defineIngredient } from "../../define.js";

export const almondFlour = defineIngredient({
	name: "almond flour",
	type: "flour",
	densityMgPerMl: 400,

	examples: [
		{ to: "semolina", amount: 62, unit: "ml", expect: 40 },
		{ to: "cake flour", amount: 1, unit: "ml", expect: 0.808081, tolerance: 1e-6 },
	],
});
