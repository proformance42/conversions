import { describe, expect, it } from "vitest";

import { convert } from "../src/convert.js";
import { ingredients } from "../src/ingredients/index.js";

/**
 * This file turns every `examples:` row in every ingredient file into a unit
 * test. Maintainers should not need to edit it — to add a test, add a row to
 * the ingredient's own file and it will appear here automatically.
 */

const DEFAULT_TOLERANCE = 1e-9;

/** "0.5 ml of chutney gives 0.375 ml of marinara" */
function describeExample(from: string, to: string, amount: number, unit: string, expect: number) {
	return `${amount} ${unit} of ${from} gives ${expect} ${unit} of ${to}`;
}

/** "1 ml of chutney cannot become gin (INCOMPATIBLE_TYPES)" */
function describeFailure(from: string, to: string, amount: number, unit: string, code: string) {
	return `${amount} ${unit} of ${from} cannot become ${to} (${code})`;
}

for (const ingredient of ingredients) {
	const examples = ingredient.examples ?? [];

	describe(`${ingredient.name} (${ingredient.type}, ${ingredient.densityMgPerMl} mg/ml)`, () => {
		it("has at least one worked example", () => {
			expect(
				examples.length,
				`${ingredient.name} has no examples. Every ingredient needs at least ` +
					`one worked example so its numbers are checked.`,
			).toBeGreaterThan(0);
		});

		for (const example of examples) {
			const hasExpect = example.expect !== undefined;
			const hasError = example.expectError !== undefined;

			const title = hasError
				? describeFailure(
						ingredient.name,
						example.to,
						example.amount,
						example.unit,
						String(example.expectError),
					)
				: describeExample(
						ingredient.name,
						example.to,
						example.amount,
						example.unit,
						Number(example.expect),
					);

			it(title, () => {
				expect(
					hasExpect !== hasError,
					`This example must set exactly one of "expect" or "expectError".`,
				).toBe(true);

				const result = convert(ingredient.name, example.to, example.amount, example.unit);

				if (hasError) {
					expect(result.ok, `Expected this to fail, but it succeeded.`).toBe(false);
					if (!result.ok) expect(result.error.code).toBe(example.expectError);
					return;
				}

				if (!result.ok) {
					throw new Error(
						`Expected ${example.expect} ${example.unit}, but the conversion ` +
							`failed: ${result.error.message}`,
					);
				}

				const tolerance = example.tolerance ?? DEFAULT_TOLERANCE;
				expect(Math.abs(result.amount - example.expect!)).toBeLessThanOrEqual(tolerance);
				expect(result.unit).toBe(example.unit);
			});
		}
	});
}
