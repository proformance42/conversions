---
name: add-ingredient
description: Add a new ingredient (or a new ingredient type) to the conversions library. Use when someone wants to add an ingredient like "pesto" or "rum", change an ingredient's density, or introduce a new category of ingredient.
---

# Add an ingredient

Your job is to do the editing while the maintainer supplies the cooking
knowledge. Ask for what you need in plain language; never ask them to write
TypeScript.

## 1. Collect three things

Ask for whichever of these you weren't given:

- **The name.** Lowercase, one word if possible, e.g. `pesto`.
- **The type.** Check `src/ingredient-types.ts` for the current list. If they
  name a type that isn't there, see "Adding a new type" below.
- **The density in mg/ml** — how many milligrams one millilitre weighs. If they
  don't know it in those terms, help them: "how much does a 250 ml jar of it
  weigh?" and divide. Say the number back to them before using it.

Also ask for **at least one worked example**: "when a recipe calls for some
amount of an ingredient we already have, how much of the new one would you
use?" Without an example, nothing checks the number.

## 2. Check the name is free

```bash
grep -ri "the-new-name" src/ingredients/
```

Names must be unique across the whole library, not just within a type. If it
collides, pick a more specific name with the maintainer.

## 3. Write the file

Put it in the folder for its type, e.g. `src/ingredients/sauces/pesto.ts`.
Copy the shape of `src/ingredients/beverages/vodka.ts` — the simplest example.

```ts
import { defineIngredient } from "../../define.js";

export const pesto = defineIngredient({
	name: "pesto",
	type: "sauce",
	densityMgPerMl: 180,

	examples: [
		{ to: "marinara", amount: 1, unit: "ml", expect: 0.9, note: "why this matters" },
	],
});
```

Use tabs, double quotes, and keep the `.js` on the import — that is required
here, even though the file is `.ts`.

Most ingredients need no `curves` block. Only add one if the maintainer
describes a substitution that isn't a fixed ratio, and then run the
`add-conversion-curve` skill instead of improvising.

## 4. Register it

In `src/ingredients/index.ts`, add the import and add the name to the
`ingredients` list. Both, or it won't exist.

## 5. Work out the expected numbers with them

For an ordinary ingredient with no curve, the maths is weight-for-weight:

```
target amount = source amount × source density ÷ target density
```

So 1 ml of pesto (180 mg/ml) into marinara (200 mg/ml) is
`1 × 180 ÷ 200 = 0.9 ml`.

If the maintainer's expected number disagrees with that, **stop and ask** — it
usually means either the density is off or the pair genuinely needs a curve.
Don't quietly adjust the density to make an example pass.

## 6. Run the tests

```bash
npm test
```

Show the maintainer the lines about their ingredient — they read as plain
sentences like `1 ml of pesto gives 0.9 ml of marinara`. Confirm those sentences
match what they expected.

## Adding a new type

Add one entry to the list in `src/ingredient-types.ts`:

```ts
export const INGREDIENT_TYPES = ["sauce", "beverage", "spice"] as const;
```

Then create the matching folder, e.g. `src/ingredients/spices/`. Remember that
ingredients can only convert within their own type, so a new type starts out
unable to convert to anything until it has at least two members.
