/**
 * Ingredient conversions.
 *
 * ```ts
 * import { convert } from "@proformance42/conversions";
 *
 * const result = convert("chutney", "marinara", 0.5, "ml");
 * if (result.ok) console.log(`Use ${result.amount} ${result.unit}`);
 * else console.error(result.error.message);
 * ```
 */

export { convert } from "./convert.js";

export { ALL_UNITS, isUnit } from "./units.js";
export type { Dimension, Unit } from "./units.js";

export { INGREDIENT_TYPES, isIngredientType } from "./ingredient-types.js";
export type { IngredientType } from "./ingredient-types.js";

export { defineIngredient } from "./define.js";
export { IngredientDataError } from "./types.js";
export type {
	ConversionCurve,
	ConversionExample,
	ConvertError,
	ConvertResult,
	ErrorCode,
	Ingredient,
} from "./types.js";

import { registry } from "./registry.js";

import type { IngredientType } from "./ingredient-types.js";

/**
 * Every ingredient name the library knows, sorted alphabetically. Handy for
 * building a dropdown. Pass a type to list only that type's ingredients.
 */
export function listIngredients(type?: IngredientType): string[] {
	const names: string[] = [];
	for (const ingredient of registry.values()) {
		if (type === undefined || ingredient.type === type) names.push(ingredient.name);
	}
	return names.sort();
}

/**
 * Look up an ingredient's type, or `undefined` if the name is not known.
 * Useful for telling someone *why* two ingredients cannot be swapped.
 */
export function ingredientType(name: string): IngredientType | undefined {
	return registry.get(name.trim().toLowerCase())?.type;
}
