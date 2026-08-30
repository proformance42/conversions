import { describe, expect, it } from "vitest";

import { convert } from "../src/convert.js";
import { ingredientType, listIngredients } from "../src/index.js";
import { ALL_UNITS } from "../src/units.js";

/** Unwraps a successful conversion, or fails loudly with the error message. */
function amountOf(from: string, to: string, amount: number, unit: Parameters<typeof convert>[3]) {
	const result = convert(from, to, amount, unit);
	if (!result.ok) throw new Error(`${from} -> ${to} failed: ${result.error.message}`);
	expect(result.unit).toBe(unit);
	return result.amount;
}

describe("convert: ordinary density maths", () => {
	it("swaps beverages weight for weight", () => {
		// 2 ml of vodka is 1 mg; 1 mg of gin takes up 0.5 ml.
		expect(amountOf("vodka", "gin", 2, "ml")).toBeCloseTo(0.5, 12);
		expect(amountOf("gin", "vodka", 0.5, "ml")).toBeCloseTo(2, 12);
	});

	it("round-trips back to the original amount", () => {
		const there = amountOf("vodka", "gin", 3.7, "ml");
		expect(amountOf("gin", "vodka", there, "ml")).toBeCloseTo(3.7, 12);
	});

	it("returns zero for zero", () => {
		expect(amountOf("vodka", "gin", 0, "ml")).toBe(0);
	});

	it("scales linearly when there is no curve", () => {
		const one = amountOf("vodka", "gin", 1, "ml");
		expect(amountOf("vodka", "gin", 10, "ml")).toBeCloseTo(one * 10, 12);
	});

	it("leaves an ingredient converted to itself alone", () => {
		expect(amountOf("chutney", "chutney", 1.234, "ml")).toBe(1.234);
		expect(amountOf("gin", "gin", 5, "kg")).toBe(5);
	});

	it("ignores case and surrounding spaces in ingredient names", () => {
		expect(amountOf("  VODKA ", "Gin", 2, "ml")).toBeCloseTo(0.5, 12);
	});
});

describe("convert: units", () => {
	it("answers in the same unit it was asked in", () => {
		for (const unit of ALL_UNITS) {
			const result = convert("vodka", "gin", 1, unit);
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.unit).toBe(unit);
		}
	});

	it("treats litres as a thousand millilitres", () => {
		expect(amountOf("vodka", "gin", 1, "l")).toBeCloseTo(amountOf("vodka", "gin", 1000, "ml") / 1000, 12);
	});

	it("keeps the weight unchanged when no curve is involved", () => {
		// The plain rule IS weight-for-weight, so a weight in is the same weight out.
		expect(amountOf("vodka", "gin", 1, "mg")).toBeCloseTo(1, 12);
		expect(amountOf("gin", "vodka", 2.5, "g")).toBeCloseTo(2.5, 12);
		expect(amountOf("vodka", "gin", 0.75, "kg")).toBeCloseTo(0.75, 12);
	});

	it("does NOT keep the weight unchanged when a curve is involved", () => {
		// 450 mg of chutney is 3 ml, which is past the curve's step at 2 ml.
		expect(amountOf("chutney", "marinara", 450, "mg")).toBeCloseTo(1200, 9);
	});
});

describe("convert: bespoke curves", () => {
	it("uses weight-for-weight below the step", () => {
		expect(amountOf("chutney", "marinara", 0.5, "ml")).toBeCloseTo(0.375, 12);
		expect(amountOf("chutney", "marinara", 1, "ml")).toBeCloseTo(0.75, 12);
	});

	it("includes the step amount itself on the lower side", () => {
		expect(amountOf("chutney", "marinara", 2, "ml")).toBeCloseTo(1.5, 12);
	});

	it("jumps to double just past the step", () => {
		expect(amountOf("chutney", "marinara", 2.000001, "ml")).toBeCloseTo(4.000002, 9);
		expect(amountOf("chutney", "marinara", 3, "ml")).toBeCloseTo(6, 12);
	});

	it("uses the hand-written reverse, not an automatic one", () => {
		expect(amountOf("marinara", "chutney", 1.5, "ml")).toBeCloseTo(2, 12);
		expect(amountOf("marinara", "chutney", 6, "ml")).toBeCloseTo(3, 12);
	});

	it("answers amounts inside the jump with the amount at the step", () => {
		for (const marinara of [1.6, 2.25, 3, 4]) {
			expect(amountOf("marinara", "chutney", marinara, "ml")).toBeCloseTo(2, 12);
		}
	});

	it("round-trips outside the jump", () => {
		for (const chutney of [0.25, 1, 2, 2.5, 10]) {
			const marinara = amountOf("chutney", "marinara", chutney, "ml");
			expect(amountOf("marinara", "chutney", marinara, "ml")).toBeCloseTo(chutney, 9);
		}
	});

	it("does not apply a curve to an unrelated pair", () => {
		// vodka -> gin has no curve, so it stays on the plain density maths.
		expect(amountOf("vodka", "gin", 4, "ml")).toBeCloseTo(1, 12);
	});
});

describe("convert: errors", () => {
	it("reports an unknown source ingredient", () => {
		const result = convert("ketchup", "marinara", 1, "ml");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error.code).toBe("UNKNOWN_INGREDIENT");
			expect(result.error.message).toContain("ketchup");
		}
	});

	it("reports an unknown target ingredient", () => {
		const result = convert("marinara", "ketchup", 1, "ml");
		expect(result.ok).toBe(false);
		if (!result.ok) expect(result.error.code).toBe("UNKNOWN_INGREDIENT");
	});

	it("refuses to swap across types", () => {
		const result = convert("chutney", "gin", 1, "ml");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error.code).toBe("INCOMPATIBLE_TYPES");
			expect(result.error.message).toContain("sauce");
			expect(result.error.message).toContain("beverage");
		}
	});

	it("refuses an unknown unit", () => {
		const result = convert("chutney", "marinara", 1, "tablespoon" as never);
		expect(result.ok).toBe(false);
		if (!result.ok) expect(result.error.code).toBe("UNKNOWN_UNIT");
	});

	it("refuses an amount that is not a sensible number", () => {
		for (const amount of [-1, Number.NaN, Number.POSITIVE_INFINITY, "1" as never]) {
			const result = convert("chutney", "marinara", amount, "ml");
			expect(result.ok, `${String(amount)} should be rejected`).toBe(false);
			if (!result.ok) expect(result.error.code).toBe("INVALID_AMOUNT");
		}
	});

	it("never throws, whatever it is given", () => {
		expect(() => convert("", "", Number.NaN, "" as never)).not.toThrow();
		expect(() => convert(null as never, undefined as never, 1, "ml")).not.toThrow();
	});
});

describe("helpers", () => {
	it("lists every ingredient alphabetically", () => {
		expect(listIngredients()).toEqual(["chutney", "gin", "marinara", "vodka"]);
	});

	it("lists ingredients of one type", () => {
		expect(listIngredients("sauce")).toEqual(["chutney", "marinara"]);
		expect(listIngredients("beverage")).toEqual(["gin", "vodka"]);
	});

	it("looks up an ingredient's type", () => {
		expect(ingredientType("Chutney")).toBe("sauce");
		expect(ingredientType("ketchup")).toBeUndefined();
	});
});
