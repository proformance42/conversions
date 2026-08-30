import { defineIngredient } from "../../define.js";

export const honey = defineIngredient({
	name: "honey",
	type: "sweetener",
	densityMgPerMl: 1420,

	// A logarithmic curve: smooth, never jumps, but flattens off for ever.
	curves: {
		molasses: {
			describe:
				"Molasses is far more forceful than honey, and it builds up. " +
				"A small spoonful swaps almost one for one, but the more the " +
				"recipe wants, the less extra molasses you should add — the " +
				"amount keeps growing but more and more slowly, and never " +
				"stops growing entirely.",
			toMl: (honeyMl) => 5 * Math.log(1 + honeyMl / 5),
		},
	},

	examples: [
		{ to: "molasses", amount: 0, unit: "ml", expect: 0 },
		{
			to: "molasses",
			amount: 1,
			unit: "ml",
			expect: 0.911608,
			tolerance: 1e-6,
			note: "A small amount is nearly one for one.",
		},
		{ to: "molasses", amount: 5, unit: "ml", expect: 3.465736, tolerance: 1e-6 },
		{
			to: "molasses",
			amount: 20,
			unit: "ml",
			expect: 8.04719,
			tolerance: 1e-5,
			note: "Four times the honey of the previous example, but nowhere near four times the molasses.",
		},
		{ to: "stevia", amount: 1, unit: "ml", expect: 1.291, tolerance: 0.001 },
	],
});
