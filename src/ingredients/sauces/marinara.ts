import { defineIngredient } from "../../define.js";

export const marinara = defineIngredient({
	name: "marinara",
	type: "sauce",
	densityMgPerMl: 200,

	// The reverse of the curve in chutney.ts. It has to be written by hand
	// because chutney's curve jumps at 2 ml, and only a person can decide what
	// the amounts inside that jump should mean.
	curves: {
		chutney: {
			describe:
				"Undoes chutney's curve. Up to 1.5 ml of marinara came from " +
				"weight-for-weight chutney. Above 4 ml it came from the doubled " +
				"side of the curve. Nothing between 1.5 ml and 4 ml can be " +
				"produced by chutney at all — that is chutney's jump at 2 ml — " +
				"so we answer with the 2 ml of chutney that sits at the jump.",
			toMl: (marinaraMl) => {
				if (marinaraMl <= 1.5) return marinaraMl / 0.75;
				if (marinaraMl <= 4) return 2;
				return marinaraMl / 2;
			},
		},
	},

	examples: [
		{
			to: "chutney",
			amount: 0.375,
			unit: "ml",
			expect: 0.5,
			note: "The exact reverse of chutney's first example.",
		},
		{ to: "chutney", amount: 1.5, unit: "ml", expect: 2 },
		{
			to: "chutney",
			amount: 2.25,
			unit: "ml",
			expect: 2,
			note: "Inside the jump: no amount of chutney makes 2.25 ml of marinara, so we answer with the 2 ml at the step.",
		},
		{
			to: "chutney",
			amount: 4,
			unit: "ml",
			expect: 2,
			note: "The last amount inside the jump.",
		},
		{
			to: "chutney",
			amount: 5,
			unit: "ml",
			expect: 2.5,
			note: "Just above the jump: the reverse of chutney's 2.5 ml example.",
		},
		{
			to: "chutney",
			amount: 6,
			unit: "ml",
			expect: 3,
			note: "Above the jump: the reverse of chutney's 3 ml example.",
		},
	],
});
