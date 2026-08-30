import { findIngredient, normalizeName } from "./registry.js";
import { fromMillilitres, isUnit, toMillilitres } from "./units.js";

import type { ConvertResult, ErrorCode } from "./types.js";
import type { Unit } from "./units.js";

function fail(code: ErrorCode, message: string): ConvertResult {
	return { ok: false, error: { code, message } };
}

/**
 * Work out how much of one ingredient to use in place of another.
 *
 * ```ts
 * convert("chutney", "marinara", 0.5, "ml");
 * // { ok: true, amount: 0.375, unit: "ml" }
 * ```
 *
 * The answer always comes back in the unit you asked in. Nothing here throws:
 * bad ingredient names, mismatched types and bad units all come back as
 * `{ ok: false, error }` so a website can show the message directly.
 *
 * @param from   The ingredient the recipe calls for, e.g. `"chutney"`.
 * @param to     The ingredient you actually have, e.g. `"marinara"`.
 * @param amount How much of `from` the recipe calls for.
 * @param unit   The unit of `amount`, e.g. `"ml"`.
 */
export function convert(from: string, to: string, amount: number, unit: Unit): ConvertResult {
	if (typeof unit !== "string" || !isUnit(unit)) {
		return fail(
			"UNKNOWN_UNIT",
			`"${String(unit)}" is not a unit this library understands.`,
		);
	}
	if (typeof amount !== "number" || !Number.isFinite(amount) || amount < 0) {
		return fail(
			"INVALID_AMOUNT",
			`An amount must be a number of zero or more, but got "${String(amount)}".`,
		);
	}

	const source = typeof from === "string" ? findIngredient(from) : undefined;
	if (!source) {
		return fail("UNKNOWN_INGREDIENT", `"${String(from)}" is not an ingredient we know about.`);
	}

	const target = typeof to === "string" ? findIngredient(to) : undefined;
	if (!target) {
		return fail("UNKNOWN_INGREDIENT", `"${String(to)}" is not an ingredient we know about.`);
	}

	if (source.type !== target.type) {
		return fail(
			"INCOMPATIBLE_TYPES",
			`${source.name} is a ${source.type} and ${target.name} is a ${target.type}, ` +
				`so one cannot stand in for the other.`,
		);
	}

	if (source === target) {
		return { ok: true, amount, unit };
	}

	// Everything is worked out in millilitres, so a weight is first turned into
	// the space it takes up, using the ingredient's own density.
	const sourceMl = toMillilitres(amount, unit, source.densityMgPerMl);

	// A bespoke curve for this exact pair wins over the normal density maths.
	const curve = source.curves?.[normalizeName(target.name)];
	const targetMl = curve
		? curve.toMl(sourceMl)
		: (sourceMl * source.densityMgPerMl) / target.densityMgPerMl;

	if (targetMl === null || !Number.isFinite(targetMl) || targetMl < 0) {
		return fail(
			"NO_CONVERSION_DEFINED",
			`There is no sensible amount of ${target.name} for ${amount} ${unit} of ` +
				`${source.name}.` + (curve ? ` ${curve.describe}` : ""),
		);
	}

	return { ok: true, amount: fromMillilitres(targetMl, unit, target.densityMgPerMl), unit };
}
