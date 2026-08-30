import { defineIngredient } from "../../define.js";

export const nutmeg = defineIngredient({
	name: "nutmeg",
	type: "spice",
	densityMgPerMl: 500,

	// The reverse of cinnamon's curve. Squaring undoes the square root exactly,
	// so this direction needs no judgement calls.
	curves: {
		cinnamon: {
			describe:
				"Undoes cinnamon's curve. Halve the nutmeg and square it. " +
				"Because cinnamon's rule grows so slowly, this one grows fast: " +
				"doubling the nutmeg needs four times the cinnamon.",
			toMl: (nutmegMl) => (nutmegMl / 2) ** 2,
		},
	},

	examples: [
		{ to: "cinnamon", amount: 1, unit: "ml", expect: 0.25 },
		{ to: "cinnamon", amount: 2, unit: "ml", expect: 1 },
		{ to: "cinnamon", amount: 4, unit: "ml", expect: 4 },
		{ to: "cinnamon", amount: 6, unit: "ml", expect: 9 },
		{ to: "cayenne", amount: 44, unit: "ml", expect: 50 },
	],
});
