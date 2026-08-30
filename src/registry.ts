import { isIngredientType } from "./ingredient-types.js";
import { ingredients } from "./ingredients/index.js";
import { IngredientDataError } from "./types.js";

import type { Ingredient } from "./types.js";

/** Ingredient names are matched case-insensitively and ignoring outer spaces. */
export function normalizeName(name: string): string {
	return name.trim().toLowerCase();
}

/**
 * Check the ingredient data for the mistakes a maintainer can actually make,
 * and explain each one in terms of the file to go and fix.
 *
 * This runs when the library loads, so a bad edit fails loudly and immediately
 * rather than producing quietly wrong numbers in someone's kitchen.
 */
export function buildRegistry(list: readonly Ingredient[]): Map<string, Ingredient> {
	const byName = new Map<string, Ingredient>();

	for (const ingredient of list) {
		const name = normalizeName(ingredient.name);

		if (name === "") {
			throw new IngredientDataError("An ingredient has an empty name.");
		}
		if (name !== ingredient.name) {
			throw new IngredientDataError(
				`Ingredient "${ingredient.name}" must be written in lowercase with no ` +
					`surrounding spaces. Rename it to "${name}".`,
			);
		}
		if (byName.has(name)) {
			throw new IngredientDataError(
				`Two ingredients are both named "${name}". Ingredient names must be ` +
					`unique across the whole library, including across types. Rename one ` +
					`of them.`,
			);
		}
		if (!isIngredientType(ingredient.type)) {
			throw new IngredientDataError(
				`Ingredient "${name}" has an unknown type "${ingredient.type}". Add that ` +
					`type to src/ingredient-types.ts, or correct the spelling.`,
			);
		}
		if (!Number.isFinite(ingredient.densityMgPerMl) || ingredient.densityMgPerMl <= 0) {
			throw new IngredientDataError(
				`Ingredient "${name}" has an invalid densityMgPerMl ` +
					`(${ingredient.densityMgPerMl}). It must be a number greater than zero.`,
			);
		}

		byName.set(name, ingredient);
	}

	// Curves can only be checked once every ingredient is known.
	for (const ingredient of byName.values()) {
		for (const [rawTarget, curve] of Object.entries(ingredient.curves ?? {})) {
			const target = normalizeName(rawTarget);
			const source = normalizeName(ingredient.name);

			if (target === source) {
				throw new IngredientDataError(
					`"${source}" declares a curve to itself. Remove it — converting an ` +
						`ingredient to itself always leaves the amount unchanged.`,
				);
			}

			const targetIngredient = byName.get(target);
			if (!targetIngredient) {
				throw new IngredientDataError(
					`"${source}" declares a curve to "${target}", which is not an ` +
						`ingredient in the library. Check the spelling, or add "${target}".`,
				);
			}
			if (targetIngredient.type !== ingredient.type) {
				throw new IngredientDataError(
					`"${source}" (${ingredient.type}) declares a curve to "${target}" ` +
						`(${targetIngredient.type}). Curves can only join two ingredients ` +
						`of the same type.`,
				);
			}
			if (typeof curve.describe !== "string" || curve.describe.trim() === "") {
				throw new IngredientDataError(
					`The "${source}" to "${target}" curve needs a describe: explain in ` +
						`plain English what the curve does before writing the maths.`,
				);
			}

			const reverse = targetIngredient.curves?.[source];
			if (!reverse) {
				throw new IngredientDataError(
					`"${source}" declares a curve to "${target}", but "${target}" has no ` +
						`curve back to "${source}". Curves must be written in both ` +
						`directions — add one to the "${target}" file. The library will ` +
						`not reverse a curve for you, because a curve with a jump in it ` +
						`has no single correct reverse.`,
				);
			}
		}
	}

	return byName;
}

/** Every ingredient, keyed by its normalized name. */
export const registry: ReadonlyMap<string, Ingredient> = buildRegistry(ingredients);

export function findIngredient(name: string): Ingredient | undefined {
	return registry.get(normalizeName(name));
}
