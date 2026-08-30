import { defineIngredient } from "../../define.js";

export const ryeFlour = defineIngredient({
	name: "rye flour",
	type: "flour",
	densityMgPerMl: 510,

	examples: [
		{ to: "oat flour", amount: 1, unit: "ml", expect: 1.0625 },
		{ to: "cake flour", amount: 99, unit: "ml", expect: 102 },
	],
});
