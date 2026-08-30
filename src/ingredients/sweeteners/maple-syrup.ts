import { defineIngredient } from "../../define.js";

export const mapleSyrup = defineIngredient({
	name: "maple syrup",
	type: "sweetener",
	densityMgPerMl: 1320,

	examples: [
		{ to: "agave", amount: 69, unit: "ml", expect: 66 },
		{ to: "sorghum", amount: 34, unit: "ml", expect: 33 },
	],
});
