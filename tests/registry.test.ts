import { describe, expect, it } from "vitest";

import { INGREDIENT_TYPES } from "../src/ingredient-types.js";
import { ingredients } from "../src/ingredients/index.js";
import { buildRegistry, normalizeName, registry } from "../src/registry.js";

import type { Ingredient } from "../src/types.js";

/** A minimal valid pair to mutate in the guard tests below. */
function pair(overrides: Partial<Ingredient> = {}, other: Partial<Ingredient> = {}): Ingredient[] {
	return [
		{ name: "alpha", type: "sauce", densityMgPerMl: 100, ...overrides },
		{ name: "beta", type: "sauce", densityMgPerMl: 200, ...other },
	];
}

describe("the shipped ingredient data", () => {
	it("loads without complaint", () => {
		expect(registry.size).toBe(ingredients.length);
	});

	it("gives every ingredient a unique name", () => {
		const names = ingredients.map((i) => normalizeName(i.name));
		expect(new Set(names).size).toBe(names.length);
	});

	it("only uses known types", () => {
		for (const ingredient of ingredients) {
			expect(INGREDIENT_TYPES).toContain(ingredient.type);
		}
	});

	it("gives every ingredient a positive density", () => {
		for (const ingredient of ingredients) {
			expect(ingredient.densityMgPerMl).toBeGreaterThan(0);
		}
	});

	it("has both directions of every curve", () => {
		for (const ingredient of ingredients) {
			for (const target of Object.keys(ingredient.curves ?? {})) {
				const other = ingredients.find((i) => normalizeName(i.name) === target);
				expect(other, `${ingredient.name} points at unknown "${target}"`).toBeDefined();
				expect(
					other?.curves?.[normalizeName(ingredient.name)],
					`${target} is missing its curve back to ${ingredient.name}`,
				).toBeDefined();
			}
		}
	});
});

describe("data guards", () => {
	it("accepts a well-formed pair", () => {
		expect(() => buildRegistry(pair())).not.toThrow();
	});

	it("rejects two ingredients sharing a name", () => {
		expect(() => buildRegistry(pair({}, { name: "alpha" }))).toThrow(/unique/i);
	});

	it("rejects a shared name even across different types", () => {
		expect(() =>
			buildRegistry(pair({}, { name: "alpha", type: "beverage" })),
		).toThrow(/unique/i);
	});

	it("rejects an empty name", () => {
		expect(() => buildRegistry(pair({ name: "" }))).toThrow(/empty name/i);
	});

	it("rejects a name that is not plain lowercase", () => {
		expect(() => buildRegistry(pair({ name: "Alpha" }))).toThrow(/lowercase/i);
		expect(() => buildRegistry(pair({ name: " alpha" }))).toThrow(/lowercase/i);
	});

	it("rejects an unknown type", () => {
		expect(() => buildRegistry(pair({ type: "condiment" as never }))).toThrow(/unknown type/i);
	});

	it("rejects a density that is zero, negative or missing", () => {
		for (const density of [0, -5, Number.NaN]) {
			expect(() => buildRegistry(pair({ densityMgPerMl: density }))).toThrow(/density/i);
		}
	});

	it("rejects a curve pointing at an ingredient that does not exist", () => {
		const curve = { describe: "x", toMl: (ml: number) => ml };
		expect(() => buildRegistry(pair({ curves: { nowhere: curve } }))).toThrow(/not an ingredient/i);
	});

	it("rejects a curve across two types", () => {
		const curve = { describe: "x", toMl: (ml: number) => ml };
		expect(() =>
			buildRegistry(
				pair({ curves: { beta: curve } }, { type: "beverage", curves: { alpha: curve } }),
			),
		).toThrow(/same type/i);
	});

	it("rejects a curve to itself", () => {
		const curve = { describe: "x", toMl: (ml: number) => ml };
		expect(() => buildRegistry(pair({ curves: { alpha: curve } }))).toThrow(/to itself/i);
	});

	it("rejects a curve written in only one direction", () => {
		const curve = { describe: "x", toMl: (ml: number) => ml };
		expect(() => buildRegistry(pair({ curves: { beta: curve } }))).toThrow(/both directions/i);
	});

	it("rejects a curve with no plain-English description", () => {
		const forward = { describe: "   ", toMl: (ml: number) => ml };
		const back = { describe: "x", toMl: (ml: number) => ml };
		expect(() =>
			buildRegistry(pair({ curves: { beta: forward } }, { curves: { alpha: back } })),
		).toThrow(/describe/i);
	});
});
