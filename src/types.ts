import type { IngredientType } from "./ingredient-types.js";
import type { Unit } from "./units.js";

/** Why a conversion could not be done. */
export type ErrorCode =
	/** One of the two ingredient names is not in the library. */
	| "UNKNOWN_INGREDIENT"
	/** The two ingredients are different types, e.g. a sauce and a beverage. */
	| "INCOMPATIBLE_TYPES"
	/** The unit is not one this library accepts. */
	| "UNKNOWN_UNIT"
	/** The amount was negative, not a number, or infinite. */
	| "INVALID_AMOUNT"
	/** A bespoke curve exists for this pair but has no answer for this amount. */
	| "NO_CONVERSION_DEFINED";

/**
 * What {@link convert} gives back. Check `ok` first:
 *
 * ```ts
 * const result = convert("chutney", "marinara", 0.5, "ml");
 * if (result.ok) console.log(result.amount, result.unit);
 * else console.error(result.error.message);
 * ```
 */
export type ConvertResult =
	| { ok: true; amount: number; unit: Unit }
	| { ok: false; error: ConvertError };

export interface ConvertError {
	code: ErrorCode;
	/** A sentence that is safe to show to a person cooking. */
	message: string;
}

/**
 * A bespoke conversion from one specific ingredient to one specific other
 * ingredient, used instead of the normal density maths.
 *
 * Curves are one-directional. If chutney declares a curve to marinara, then
 * marinara must declare its own curve back to chutney — the library will not
 * guess the reverse, because reversing a curve with a jump in it is a
 * judgement call only a person can make.
 */
export interface ConversionCurve {
	/**
	 * Plain-English explanation of the curve, for maintainers and for error
	 * messages. Write this before writing the maths.
	 */
	describe: string;
	/**
	 * Given an amount of the source ingredient in millilitres, return the
	 * equivalent amount of the target ingredient in millilitres.
	 *
	 * Return `null` to say "there is no sensible answer for this amount"; the
	 * caller gets a `NO_CONVERSION_DEFINED` error quoting `describe`.
	 */
	toMl: (sourceMl: number) => number | null;
}

/**
 * A worked example: "this much of me becomes that much of them".
 *
 * Every example becomes its own unit test automatically — see
 * `tests/examples.test.ts`. Maintainers add rows here rather than writing
 * test code.
 */
export interface ConversionExample {
	/** The ingredient being converted TO. */
	to: string;
	/** How much of this ingredient the recipe calls for. */
	amount: number;
	/** The unit of `amount`. The answer comes back in this same unit. */
	unit: Unit;
	/** The expected answer, in the same unit. */
	expect?: number;
	/** Use instead of `expect` when the conversion is meant to fail. */
	expectError?: ErrorCode;
	/**
	 * How far off the answer is allowed to be. Defaults to 1e-9, which is
	 * tight enough that only genuine rounding wobble slips through.
	 */
	tolerance?: number;
	/** Optional free text explaining why this example matters. */
	note?: string;
}

/** One ingredient, exactly as written in `src/ingredients/`. */
export interface Ingredient {
	/** Unique across the whole library, not just within this type. Lowercase. */
	name: string;
	type: IngredientType;
	/** How many milligrams one millilitre of this ingredient weighs. */
	densityMgPerMl: number;
	/**
	 * Bespoke conversions, keyed by the target ingredient's name. Omit this
	 * entirely for ordinary ingredients — most conversions need no curve.
	 */
	curves?: Record<string, ConversionCurve>;
	/** Worked examples, each of which becomes a unit test. */
	examples?: ConversionExample[];
}

/** Thrown at load time when the ingredient data itself is invalid. */
export class IngredientDataError extends Error {
	override readonly name = "IngredientDataError";
}
