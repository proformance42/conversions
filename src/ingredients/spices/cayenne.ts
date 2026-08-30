import { defineIngredient } from "../../define.js";

export const cayenne = defineIngredient({
	name: "cayenne",
	type: "spice",
	densityMgPerMl: 440,

	examples: [
		{ to: "cardamom", amount: 1, unit: "ml", expect: 1.1 },
		{ to: "paprika", amount: 46, unit: "ml", expect: 44 },
	],
});
