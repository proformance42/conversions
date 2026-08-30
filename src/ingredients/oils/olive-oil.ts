import { defineIngredient } from "../../define.js";

export const oliveOil = defineIngredient({
	name: "olive oil",
	type: "oil",
	densityMgPerMl: 913,

	// The reverse of sesame oil's curve, floor and all.
	curves: {
		"sesame oil": {
			describe:
				"Undoes sesame oil's curve: a third as much. Sesame oil's rule " +
				"starts at a tenth of a millilitre, which is 0.3 ml of olive " +
				"oil, so anything less than that did not come from sesame oil " +
				"and has no answer.",
			toMl: (oliveMl) => {
				if (oliveMl === 0) return 0;
				return oliveMl < 0.3 ? null : oliveMl / 3;
			},
		},
	},

	examples: [
		{ to: "sesame oil", amount: 0, unit: "ml", expect: 0 },
		{ to: "sesame oil", amount: 0.2, unit: "ml", expectError: "NO_CONVERSION_DEFINED" },
		{ to: "sesame oil", amount: 0.3, unit: "ml", expect: 0.1 },
		{ to: "sesame oil", amount: 6, unit: "ml", expect: 2 },
		{ to: "ghee", amount: 1, unit: "ml", expect: 1.002195, tolerance: 1e-6 },
	],
});
