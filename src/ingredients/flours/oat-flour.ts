import { defineIngredient } from "../../define.js";

export const oatFlour = defineIngredient({
	name: "oat flour",
	type: "flour",
	densityMgPerMl: 480,

	examples: [
		{ to: "all-purpose flour", amount: 53, unit: "ml", expect: 48 },
		{ to: "rye flour", amount: 1, unit: "ml", expect: 0.941176, tolerance: 1e-6 },
	],
});
