import { defineIngredient } from "../../define.js";

export const kombucha = defineIngredient({
	name: "kombucha",
	type: "beverage",
	densityMgPerMl: 2.5,

	// The reverse of espresso's curve. This one is a clean mirror image: because
	// espresso's curve never jumps, every amount of kombucha has exactly one
	// answer and nothing is unreachable.
	curves: {
		espresso: {
			describe:
				"Undoes espresso's curve. Up to 40 ml of kombucha came from the " +
				"fast first stretch, so divide by 4. Above 40 ml the rest came " +
				"2 ml at a time, so take the 10 ml that got us to 40 and halve " +
				"whatever is left over.",
			toMl: (kombuchaMl) => (kombuchaMl <= 40 ? kombuchaMl / 4 : 10 + (kombuchaMl - 40) / 2),
		},
	},

	examples: [
		{ to: "espresso", amount: 10, unit: "ml", expect: 2.5 },
		{ to: "espresso", amount: 40, unit: "ml", expect: 10 },
		{ to: "espresso", amount: 60, unit: "ml", expect: 20 },
		{ to: "gin", amount: 1, unit: "ml", expect: 1.25, note: "No curve on this pair." },
	],
});
