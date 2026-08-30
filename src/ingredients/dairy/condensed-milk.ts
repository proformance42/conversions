import { defineIngredient } from "../../define.js";

export const condensedMilk = defineIngredient({
	name: "condensed milk",
	type: "dairy",
	densityMgPerMl: 1280,

	examples: [
		{
			to: "milk",
			amount: 1,
			unit: "ml",
			expect: 1.242718,
			tolerance: 1e-6,
			note: "Condensed milk is much heavier, so it takes noticeably more milk to match it.",
		},
		{ to: "cream", amount: 1, unit: "ml", expect: 1.28 },
	],
});
