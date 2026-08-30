import { defineIngredient } from "../../define.js";

export const espresso = defineIngredient({
	name: "espresso",
	type: "beverage",
	densityMgPerMl: 4,

	// A curve that bends without ever jumping: the rate changes at 10 ml, but
	// the two halves meet, so every amount of kombucha comes from exactly one
	// amount of espresso. Compare with chutney, whose curve leaves a gap.
	curves: {
		kombucha: {
			describe:
				"The first 10 ml of espresso needs 4 ml of kombucha each to " +
				"carry the flavour. Past 10 ml the kombucha is already doing " +
				"the work, so every extra millilitre of espresso needs only " +
				"2 ml more.",
			toMl: (espressoMl) => (espressoMl <= 10 ? espressoMl * 4 : 40 + (espressoMl - 10) * 2),
		},
	},

	examples: [
		{ to: "kombucha", amount: 2.5, unit: "ml", expect: 10 },
		{
			to: "kombucha",
			amount: 10,
			unit: "ml",
			expect: 40,
			note: "The bend. Both halves of the curve agree here, so there is no jump.",
		},
		{ to: "kombucha", amount: 20, unit: "ml", expect: 60, note: "On the slower half." },
		{
			to: "kombucha",
			amount: 4,
			unit: "mg",
			expect: 10,
			note: "4 mg of espresso is 1 ml, which needs 4 ml of kombucha, and that weighs 10 mg. Curves change the weight; plain conversions do not.",
		},
		{ to: "vodka", amount: 1, unit: "ml", expect: 8, note: "No curve on this pair." },
	],
});
