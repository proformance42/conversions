import { defineIngredient } from "../../define.js";

export const molasses = defineIngredient({
	name: "molasses",
	type: "sweetener",
	densityMgPerMl: 1400,

	// The reverse of honey's curve. Undoing a curve that flattens off gives one
	// that climbs away steeply — which is the honest answer, not a mistake.
	curves: {
		honey: {
			describe:
				"Undoes honey's curve. Because honey's rule flattens off, this " +
				"one runs away in the other direction: a little more molasses " +
				"in the recipe means a lot more honey. Every amount has an " +
				"answer, but check large ones look sensible before you pour.",
			toMl: (molassesMl) => 5 * (Math.exp(molassesMl / 5) - 1),
		},
	},

	examples: [
		{ to: "honey", amount: 0, unit: "ml", expect: 0 },
		{ to: "honey", amount: 1, unit: "ml", expect: 1.107014, tolerance: 1e-6 },
		{
			to: "honey",
			amount: 3.465736,
			unit: "ml",
			expect: 5,
			tolerance: 1e-5,
			note: "The exact reverse of honey's 5 ml example.",
		},
		{
			to: "honey",
			amount: 5,
			unit: "ml",
			expect: 8.591409,
			tolerance: 1e-6,
			note: "Climbing away steeply now.",
		},
		{ to: "treacle", amount: 72, unit: "ml", expect: 70 },
	],
});
