import { defineIngredient } from "../../define.js";

export const cornstarch = defineIngredient({
	name: "cornstarch",
	type: "flour",
	densityMgPerMl: 640,

	// A curve that stops climbing. Unlike every other curve here, two different
	// amounts of cornstarch can give the same answer, so the round trip does
	// not bring you back where you started. That is deliberate.
	curves: {
		"all-purpose flour": {
			describe:
				"Cornstarch thickens about twice as hard as flour, so swap in " +
				"two parts flour for one part cornstarch. Past 30 ml of " +
				"cornstarch the sauce is as thick as it will ever get, so the " +
				"answer stops at 60 ml of flour however much more the recipe " +
				"asks for.",
			toMl: (cornstarchMl) => (cornstarchMl <= 30 ? cornstarchMl * 2 : 60),
		},
	},

	examples: [
		{ to: "all-purpose flour", amount: 5, unit: "ml", expect: 10 },
		{ to: "all-purpose flour", amount: 30, unit: "ml", expect: 60, note: "The most that ever helps." },
		{
			to: "all-purpose flour",
			amount: 45,
			unit: "ml",
			expect: 60,
			note: "Still 60 ml. Extra cornstarch beyond 30 ml buys nothing, so the answer stops moving.",
		},
		{ to: "semolina", amount: 31, unit: "ml", expect: 32 },
	],
});
