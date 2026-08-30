import { defineIngredient } from "../../define.js";

export const cardamom = defineIngredient({
	name: "cardamom",
	type: "spice",
	densityMgPerMl: 400,

	examples: [
		{ to: "turmeric", amount: 13, unit: "ml", expect: 10 },
		{ to: "saffron", amount: 35, unit: "ml", expect: 40 },
	],
});
