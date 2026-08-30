import { defineIngredient } from "../../define.js";

export const chutney = defineIngredient({
	name: "chutney",
	type: "sauce",
	densityMgPerMl: 150,

	// Bespoke conversions that do NOT follow the normal density maths.
	// One entry per direction: the matching chutney entry lives in marinara.ts.
	curves: {
		marinara: {
			describe:
				"Up to and including 2 ml, chutney and marinara swap weight for " +
				"weight, so 1 ml of chutney becomes 0.75 ml of marinara. Past " +
				"2 ml the chutney's flavour drops away, so you need twice as " +
				"much marinara as the recipe's chutney.",
			toMl: (chutneyMl) => (chutneyMl <= 2 ? chutneyMl * 0.75 : chutneyMl * 2),
		},
	},

	// Worked examples. Every row below runs as its own unit test.
	examples: [
		{
			to: "marinara",
			amount: 0.5,
			unit: "ml",
			expect: 0.375,
			note: "Under 2 ml, so plain weight-for-weight: 0.5 ml is 75 mg, and 75 mg of marinara is 0.375 ml.",
		},
		{
			to: "marinara",
			amount: 2,
			unit: "ml",
			expect: 1.5,
			note: "Exactly 2 ml is still on the weight-for-weight side of the curve.",
		},
		{
			to: "marinara",
			amount: 2.5,
			unit: "ml",
			expect: 5,
			note: "Just past 2 ml the answer jumps to double the chutney amount.",
		},
		{ to: "marinara", amount: 3, unit: "ml", expect: 6 },
		{
			to: "marinara",
			amount: 75,
			unit: "mg",
			expect: 75,
			note: "75 mg of chutney is 0.5 ml, which is under the curve's 2 ml step, so the weights match.",
		},
		{
			to: "marinara",
			amount: 450,
			unit: "mg",
			expect: 1200,
			note: "450 mg of chutney is 3 ml, which is past the step, so the weights no longer match.",
		},
		{
			to: "gin",
			amount: 1,
			unit: "ml",
			expectError: "INCOMPATIBLE_TYPES",
			note: "A sauce can never stand in for a beverage.",
		},
	],
});
