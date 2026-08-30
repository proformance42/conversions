import { defineIngredient } from "../../define.js";

export const cinnamon = defineIngredient({
	name: "cinnamon",
	type: "spice",
	densityMgPerMl: 480,

	// A curve with no straight line in it anywhere: the more you use, the less
	// extra nutmeg each spoonful needs.
	curves: {
		nutmeg: {
			describe:
				"Nutmeg fades much faster than cinnamon. A pinch of cinnamon " +
				"still needs a proper amount of nutmeg to be noticed, but from " +
				"there on the amount you need grows more and more slowly: " +
				"quadrupling the cinnamon only doubles the nutmeg.",
			toMl: (cinnamonMl) => 2 * Math.sqrt(cinnamonMl),
		},
	},

	examples: [
		{
			to: "nutmeg",
			amount: 0.25,
			unit: "ml",
			expect: 1,
			note: "A quarter of a millilitre of cinnamon still needs a whole millilitre of nutmeg.",
		},
		{ to: "nutmeg", amount: 1, unit: "ml", expect: 2 },
		{
			to: "nutmeg",
			amount: 4,
			unit: "ml",
			expect: 4,
			note: "The one amount where the two are equal.",
		},
		{
			to: "nutmeg",
			amount: 9,
			unit: "ml",
			expect: 6,
			note: "Nine times the cinnamon of the 1 ml example, but only three times the nutmeg.",
		},
		{ to: "turmeric", amount: 1, unit: "ml", expect: 0.923, tolerance: 0.001 },
	],
});
