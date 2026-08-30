import { defineIngredient } from "../../define.js";

export const cakeFlour = defineIngredient({
	name: "cake flour",
	type: "flour",
	densityMgPerMl: 495,

	examples: [
		{ to: "rye flour", amount: 102, unit: "ml", expect: 99 },
		{ to: "bread flour", amount: 109, unit: "ml", expect: 99 },
	],
});
