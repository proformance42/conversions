---
name: add-conversion-examples
description: Add or fix conversion test cases ("0.5 ml of chutney gives 0.375 ml of marinara") in the conversions library. Use when someone wants to check the maths, pin down a conversion, or understand why a conversion test is failing.
---

# Add conversion examples

Examples are how this library is tested. A maintainer never writes test code —
they add a row of numbers to an ingredient's own file, and it becomes a named
test automatically.

## 1. Open the right file

The example lives on the ingredient being converted **from**. For "0.5 ml of
chutney gives 0.375 ml of marinara", open
`src/ingredients/sauces/chutney.ts`.

## 2. Add a row to `examples`

```ts
examples: [
	{ to: "marinara", amount: 0.5, unit: "ml", expect: 0.375, note: "why this one matters" },
],
```

| Field | Meaning |
| --- | --- |
| `to` | The ingredient being converted to. |
| `amount` + `unit` | What the recipe calls for. Units: `ml`, `l`, `mg`, `g`, `kg`. |
| `expect` | The answer, **in the same unit**. |
| `expectError` | Use instead of `expect` when the conversion should fail. |
| `note` | Optional, but worth writing — say why the example exists. |
| `tolerance` | Optional. How far off the answer may be; defaults to a billionth. |

Set `tolerance` when the maintainer's expected number is rounded. If they say
"about 0.33 ml", write `expect: 0.33, tolerance: 0.005` rather than arguing
about decimal places.

To pin down a failure, use a code from the list in `src/types.ts`:

```ts
{ to: "gin", amount: 1, unit: "ml", expectError: "INCOMPATIBLE_TYPES" },
```

## 3. Suggest the examples worth having

Offer these; the maintainer decides which are real:

- The everyday amount someone would actually cook with.
- Both sides of any step in a curve, and the step amount itself.
- The reverse direction, on the other ingredient's file.
- A weight as well as a volume, if the pair has a curve — weights and volumes
  behave differently there.
- Anything that has been got wrong before.

## 4. Run them

```bash
npm test
```

Each row prints as a sentence: `0.5 ml of chutney gives 0.375 ml of marinara`.
Read those back to the maintainer.

## When an example fails

The failure means the number in the file and the number the library computes
disagree. **Do not just change the expected number to match the code.** Work out
which is wrong:

1. Ask the maintainer to confirm the expected number is what they meant.
2. If it is, the data is wrong — the density, or the curve. Check the ordinary
   maths first: `source amount × source density ÷ target density`.
3. If that formula gives the maintainer's number but the test doesn't, a curve
   is overriding the pair. Look for a `curves` entry, and read its `describe`
   back to them — the described rule may not be the rule they have in mind.
4. Only change the expected number when the maintainer agrees the original
   expectation was mistaken.
