import { defineIngredient } from "../../define.js";

export const semolina = defineIngredient({
	name: "semolina",
	type: "flour",
	densityMgPerMl: 620,

	examples: [
		{ to: "almond flour", amount: 40, unit: "ml", expect: 62 },
		{ to: "bread flour", amount: 1, unit: "ml", expect: 1.137615, tolerance: 1e-6 },
	],
});
