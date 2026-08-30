import { defineIngredient } from "../../define.js";

export const yogurt = defineIngredient({
	name: "yogurt",
	type: "dairy",
	densityMgPerMl: 1050,

	// The reverse of buttermilk's curve. Because that curve always includes a
	// 2 ml starter, anything at or under 2 ml could not have come from it.
	curves: {
		buttermilk: {
			describe:
				"Undoes buttermilk's curve: take off the 2 ml starter, then " +
				"divide by four fifths. Any amount of yogurt up to and " +
				"including 2 ml is the starter alone, which no amount of " +
				"buttermilk asks for, so it has no answer.",
			toMl: (yogurtMl) => {
				if (yogurtMl === 0) return 0;
				return yogurtMl <= 2 ? null : (yogurtMl - 2) / 0.8;
			},
		},
	},

	examples: [
		{ to: "buttermilk", amount: 0, unit: "ml", expect: 0 },
		{
			to: "buttermilk",
			amount: 1,
			unit: "ml",
			expectError: "NO_CONVERSION_DEFINED",
			note: "Less than the starter, so nothing produces it.",
		},
		{ to: "buttermilk", amount: 2, unit: "ml", expectError: "NO_CONVERSION_DEFINED" },
		{ to: "buttermilk", amount: 6, unit: "ml", expect: 5 },
		{ to: "buttermilk", amount: 10, unit: "ml", expect: 10 },
		{ to: "buttermilk", amount: 18, unit: "ml", expect: 20 },
		{ to: "cream", amount: 1, unit: "ml", expect: 1.05 },
	],
});
