import { defineIngredient } from "../../define.js";

export const sesameOil = defineIngredient({
	name: "sesame oil",
	type: "oil",
	densityMgPerMl: 921,

	// A curve with a floor rather than a ceiling: below a certain amount the
	// answer is not a small number, it is "don't".
	curves: {
		"olive oil": {
			describe:
				"Sesame oil is a flavour, not a cooking fat, so standing olive " +
				"oil in for it takes three times as much. Below a tenth of a " +
				"millilitre there is nothing to replace — you cannot measure " +
				"that much olive oil into a pan usefully, so leave it out " +
				"instead of guessing.",
			toMl: (sesameMl) => {
				if (sesameMl === 0) return 0;
				return sesameMl < 0.1 ? null : sesameMl * 3;
			},
		},
	},

	examples: [
		{ to: "olive oil", amount: 0, unit: "ml", expect: 0, note: "Nothing in, nothing out." },
		{
			to: "olive oil",
			amount: 0.05,
			unit: "ml",
			expectError: "NO_CONVERSION_DEFINED",
			note: "Too little to be worth replacing.",
		},
		{ to: "olive oil", amount: 0.1, unit: "ml", expect: 0.3, note: "The smallest amount that works." },
		{ to: "olive oil", amount: 2, unit: "ml", expect: 6 },
		{ to: "peanut oil", amount: 1, unit: "ml", expect: 1.007658, tolerance: 1e-6 },
	],
});
