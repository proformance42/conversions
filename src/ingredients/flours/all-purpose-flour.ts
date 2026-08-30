import { defineIngredient } from "../../define.js";

export const allPurposeFlour = defineIngredient({
	name: "all-purpose flour",
	type: "flour",
	densityMgPerMl: 530,

	// The reverse of cornstarch's curve. Because that curve stops climbing, 60 ml
	// of flour could have come from any amount of cornstarch at or above 30 ml.
	// We answer with the smallest one, so nobody is told to use more cornstarch
	// than the dish can use.
	curves: {
		cornstarch: {
			describe:
				"Undoes cornstarch's curve: half as much. At exactly 60 ml of " +
				"flour the answer is ambiguous, because 30 ml of cornstarch and " +
				"anything above it all thicken the same — we answer 30 ml, the " +
				"least that gets you there. More than 60 ml of flour is thicker " +
				"than cornstarch can manage, so it has no answer.",
			toMl: (flourMl) => {
				if (flourMl < 60) return flourMl / 2;
				return flourMl === 60 ? 30 : null;
			},
		},
	},

	examples: [
		{ to: "cornstarch", amount: 20, unit: "ml", expect: 10 },
		{
			to: "cornstarch",
			amount: 60,
			unit: "ml",
			expect: 30,
			note: "The least cornstarch that gets this thick.",
		},
		{
			to: "cornstarch",
			amount: 75,
			unit: "ml",
			expectError: "NO_CONVERSION_DEFINED",
			note: "Thicker than cornstarch can reach.",
		},
		{ to: "oat flour", amount: 48, unit: "ml", expect: 53 },
	],
});
