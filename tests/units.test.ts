import { describe, expect, it } from "vitest";

import { ALL_UNITS, fromMillilitres, isUnit, toMillilitres, UNITS } from "../src/units.js";

describe("units", () => {
	it("recognises exactly the units in the table", () => {
		for (const unit of ALL_UNITS) expect(isUnit(unit)).toBe(true);
		for (const unit of ["tbsp", "cup", "oz", "", "ML"]) expect(isUnit(unit)).toBe(false);
	});

	it("uses SI multiples of the base units", () => {
		expect(UNITS.ml.inBaseUnits).toBe(1);
		expect(UNITS.l.inBaseUnits).toBe(1000);
		expect(UNITS.mg.inBaseUnits).toBe(1);
		expect(UNITS.g.inBaseUnits).toBe(1000);
		expect(UNITS.kg.inBaseUnits).toBe(1_000_000);
	});

	it("converts volumes without needing the density", () => {
		expect(toMillilitres(1, "l", 150)).toBe(1000);
		expect(toMillilitres(2.5, "ml", 999)).toBe(2.5);
	});

	it("converts weights into the space they take up", () => {
		// 150 mg of something weighing 150 mg per ml takes up 1 ml.
		expect(toMillilitres(150, "mg", 150)).toBe(1);
		expect(toMillilitres(1, "g", 200)).toBe(5);
		expect(toMillilitres(1, "kg", 0.5)).toBe(2_000_000);
	});

	it("undoes itself exactly", () => {
		for (const unit of ALL_UNITS) {
			for (const density of [0.5, 2, 150, 200]) {
				const ml = toMillilitres(3.25, unit, density);
				expect(fromMillilitres(ml, unit, density)).toBeCloseTo(3.25, 12);
			}
		}
	});
});
