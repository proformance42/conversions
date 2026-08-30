import { defineIngredient } from "../../define.js";

export const saffron = defineIngredient({
	name: "saffron",
	type: "spice",
	densityMgPerMl: 350,

	// A curve that runs out. Past a point there is simply no honest answer, so
	// it returns null and the caller gets a NO_CONVERSION_DEFINED error rather
	// than a confidently wrong number.
	curves: {
		paprika: {
			describe:
				"Paprika brings the colour but almost none of the perfume, so " +
				"it takes twelve times as much. That only holds for small " +
				"amounts: past half a millilitre of saffron, no quantity of " +
				"paprika will stand in for it and you should leave the dish " +
				"unsaffroned rather than fake it.",
			toMl: (saffronMl) => (saffronMl <= 0.5 ? saffronMl * 12 : null),
		},
	},

	examples: [
		{ to: "paprika", amount: 0.25, unit: "ml", expect: 3 },
		{ to: "paprika", amount: 0.5, unit: "ml", expect: 6, note: "The last amount that works." },
		{
			to: "paprika",
			amount: 0.75,
			unit: "ml",
			expectError: "NO_CONVERSION_DEFINED",
			note: "Past the limit, so there is no answer at all.",
		},
		{ to: "cardamom", amount: 40, unit: "ml", expect: 35 },
	],
});
