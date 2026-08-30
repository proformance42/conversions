import { defineIngredient } from "../../define.js";

export const paprika = defineIngredient({
	name: "paprika",
	type: "spice",
	densityMgPerMl: 460,

	// The reverse of saffron's curve, including its limit: saffron's rule tops
	// out at 6 ml of paprika, so anything above that came from somewhere else.
	curves: {
		saffron: {
			describe:
				"Undoes saffron's curve: a twelfth as much saffron. Saffron's " +
				"rule stops at half a millilitre, which is 6 ml of paprika, so " +
				"more paprika than that cannot have come from saffron and has " +
				"no answer.",
			toMl: (paprikaMl) => (paprikaMl <= 6 ? paprikaMl / 12 : null),
		},
	},

	examples: [
		{ to: "saffron", amount: 3, unit: "ml", expect: 0.25 },
		{ to: "saffron", amount: 6, unit: "ml", expect: 0.5 },
		{ to: "saffron", amount: 9, unit: "ml", expectError: "NO_CONVERSION_DEFINED" },
		{ to: "cumin", amount: 45, unit: "ml", expect: 46 },
	],
});
