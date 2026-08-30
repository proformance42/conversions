---
name: add-conversion-curve
description: Add a bespoke or non-linear conversion between two specific ingredients in the conversions library — a rule that is not a fixed ratio, e.g. logarithmic, stepped, or capped. Use when a maintainer says one ingredient does not substitute for another at a constant rate.
---

# Add a bespoke conversion curve

Normally, two ingredients of the same type swap weight for weight, worked out
from their densities. A **curve** overrides that for one specific pair, in one
specific direction.

Only reach for a curve when the maintainer describes behaviour that a single
ratio cannot express: a step, a cap, a curve that bends, a minimum.

## 1. Pin down the rule in numbers first

This is the step that matters. Conversational descriptions are ambiguous, and
getting it wrong produces confidently incorrect cooking advice.

When someone says *"past 2 ml of chutney you need twice as much marinara"*,
"twice as much" could mean twice the ordinary answer, or twice the chutney
amount. **Do not guess.** Ask with concrete numbers:

> Ordinarily 3 ml of chutney would be 2.25 ml of marinara. Under your rule,
> is 3 ml of chutney 4.5 ml of marinara (twice the usual answer), or 6 ml
> (twice the chutney)?

Get two or three answered points before writing code. They become the examples.

Also establish:

- **Where the rule changes**, and whether the boundary amount itself is on the
  old side or the new side. "Past 2 ml" usually means 2 ml is still the old
  rule — confirm it.
- **Whether any amounts have no sensible answer** at all.

## 2. Write the forward curve

In the source ingredient's file, keyed by the target's name:

```ts
curves: {
	marinara: {
		describe:
			"Up to and including 2 ml, chutney and marinara swap weight for " +
			"weight. Past 2 ml the chutney's flavour drops away, so you need " +
			"twice as much marinara as the recipe's chutney.",
		toMl: (chutneyMl) => (chutneyMl <= 2 ? chutneyMl * 0.75 : chutneyMl * 2),
	},
},
```

- Write `describe` **before** the maths, in the maintainer's own words. It is
  shown in error messages and is what the next maintainer will read.
- `toMl` takes millilitres of the source and returns millilitres of the target.
  Always millilitres, whatever unit the person asked in — the library handles
  units and weights around you.
- Return `null` for an amount with no sensible answer; the caller then gets a
  `NO_CONVERSION_DEFINED` error quoting your `describe`.

## 3. Write the reverse curve — this is required

The other ingredient must declare its own curve back. The library will not
reverse it automatically, and `npm test` fails if the reverse is missing.

This is not busywork. Reversing a curve with a step means deciding what to do
with amounts the forward curve can never produce. In the example above, chutney
jumps from 1.5 ml of marinara straight to just over 4 ml, so **no amount of
chutney produces 2 ml of marinara**. Take that question to the maintainer:

> Nothing between 1.5 ml and 4 ml of marinara can come from chutney. If someone
> has 2.25 ml of marinara, what should we tell them — the 2 ml of chutney at
> the step, or that there's no answer?

Then write their decision down, in both the `describe` and the maths. See
`src/ingredients/sauces/marinara.ts` for how the shipped pair resolves it.

## 4. Add examples on both sides

At minimum:

- One amount below the step, one at the step exactly, one just above it.
- The same points in the reverse direction.
- One amount inside any unreachable range.
- A weight (`mg` / `g`), since curves break the usual "same weight in, same
  weight out" behaviour and that is worth pinning down.

Use the `add-conversion-examples` skill for the mechanics.

## 5. Run the tests

```bash
npm test
```

Read the resulting sentences back to the maintainer and confirm each one is
what they meant. If the curve is right, those sentences are the documentation.
