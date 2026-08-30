/**
 * Every kind of ingredient this library knows about.
 *
 * ---------------------------------------------------------------------------
 * TO ADD A NEW INGREDIENT TYPE: add one line to the list below.
 * ---------------------------------------------------------------------------
 *
 * Ingredients can only ever be converted into other ingredients of the SAME
 * type. "chutney" (a sauce) can become "marinara" (a sauce), but asking for
 * "chutney" as "gin" (a beverage) is an error.
 */
export const INGREDIENT_TYPES = ["sauce", "beverage"] as const;

export type IngredientType = (typeof INGREDIENT_TYPES)[number];

export function isIngredientType(value: string): value is IngredientType {
	return (INGREDIENT_TYPES as readonly string[]).includes(value);
}
