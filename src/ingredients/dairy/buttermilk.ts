import { defineIngredient } from "../../define.js";

export const buttermilk = defineIngredient({
	name: "buttermilk",
	type: "dairy",
	densityMgPerMl: 1035,

	// A curve with a fixed cost built in: every swap starts with a spoonful of
	// yogurt before the amount even begins to scale.
	curves: {
		yogurt: {
			describe:
				"Yogurt is thicker than buttermilk, so it takes four fifths as " +
				"much once it is going — but it needs 2 ml to get started at " +
				"all, or it will not loosen into the batter. Ask for none and " +
				"you get none; ask for any at all and that starting 2 ml is " +
				"included.",
			toMl: (buttermilkMl) => (buttermilkMl === 0 ? 0 : buttermilkMl * 0.8 + 2),
		},
	},

	examples: [
		{ to: "yogurt", amount: 0, unit: "ml", expect: 0 },
		{
			to: "yogurt",
			amount: 5,
			unit: "ml",
			expect: 6,
			note: "4 ml of scaling plus the 2 ml starter.",
		},
		{
			to: "yogurt",
			amount: 10,
			unit: "ml",
			expect: 10,
			note: "The one amount where the two match exactly.",
		},
		{ to: "yogurt", amount: 20, unit: "ml", expect: 18 },
		{ to: "kefir", amount: 1, unit: "ml", expect: 0.995192, tolerance: 1e-6 },
	],
});
