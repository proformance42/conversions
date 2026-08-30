import type { Ingredient } from "./types.js";

/**
 * Wrap every ingredient definition in this. It does nothing at runtime — it
 * exists so your editor autocompletes the fields and underlines typos in red
 * before you ever run the tests.
 */
export function defineIngredient<const T extends Ingredient>(ingredient: T): T {
	return ingredient;
}
