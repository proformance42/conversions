# AGENTS.md

Guidance for AI assistants working in this repository. Humans are welcome to
read it too — it is the shortest accurate description of how this library works.

## What this repository is

A dependency-free TypeScript library that answers one question: *"my recipe
calls for X of ingredient A, but I have ingredient B — how much B do I use?"*

It is the maths engine behind a static, client-side website, so it must stay
pure: no network calls, no filesystem access, no Node-only APIs, no
dependencies. Anything added here must run in a browser.

Most contributors are cooks, not programmers. **Optimise every change for how
easy the ingredient files are to read and edit by someone who does not know
TypeScript.** A clever abstraction that saves twenty lines but makes
`src/ingredients/` harder to skim is a bad trade here.

## How a conversion works

Each ingredient has a density in `mg/ml`. Ingredients of the same type are
equivalent **by weight** unless a bespoke curve overrides that pair.

```
amount + unit ──▶ millilitres of source ──▶ [curve, or density maths] ──▶ millilitres of target ──▶ same unit out
             (÷ density, if a weight)                                                          (× density, if a weight)
```

A consequence worth remembering before "fixing" it: with no curve, a weight in
gives the same weight out (1 mg of vodka is 1 mg of gin). That is correct — the
default rule *is* weight-equivalence. Only curves break that identity.

## Invariants — do not break these

1. **`convert()` never throws.** Every user-facing failure is
   `{ ok: false, error: { code, message } }`. Messages must be readable by
   someone cooking, not a stack trace.
2. **The answer is always in the unit that was asked for.** No silent unit
   changes.
3. **Ingredient names are unique across the whole library**, not just within a
   type, and are lowercase with no surrounding spaces.
4. **Conversions only happen within one type.** Cross-type is
   `INCOMPATIBLE_TYPES`, never a number.
5. **Curves are written in both directions, by hand.** Never add automatic
   inversion. A curve with a jump has no single correct reverse; the person
   writing it must decide what the unreachable range means. `src/registry.ts`
   enforces this.
6. **Bad data fails loudly at load time.** Maintainer mistakes (duplicate names,
   one-sided curves, a bad density) throw `IngredientDataError` from
   `src/registry.ts`. Do not soften these into warnings or silent defaults.
7. **Every change to a number comes with examples that pin it down.**

## Where things go

| Change | File |
| --- | --- |
| New ingredient | New file in `src/ingredients/<type>s/`, then register in `src/ingredients/index.ts` |
| Adjust a density | That ingredient's file |
| Bespoke / non-linear conversion | `curves` in both ingredients' files |
| Conversion tests | `examples` in the ingredient's own file |
| New ingredient type | One line in `src/ingredient-types.ts`, plus a folder under `src/ingredients/` |
| New unit | One row in the table in `src/units.ts` |
| Conversion algorithm | `src/convert.ts` |
| Data validation rules | `src/registry.ts` |

`tests/examples.test.ts` turns every `examples` row into a named unit test.
**Do not ask a maintainer to write test code** to check a conversion — add a row
to the ingredient file instead. Hand-written tests in `tests/` are for library
behaviour (units, errors, guards), not for ingredient values.

## Working here

- `npm test` after every change. `npm run typecheck` for types.
- Match the surrounding style: tabs, double quotes, `.js` extensions on relative
  imports (required by NodeNext module resolution).
- Comments in `src/ingredients/` are addressed to non-technical maintainers.
  Keep them plain-spoken and keep them accurate.
- When adding a curve, write its `describe` in plain English *first*. If the
  rule can't be described in a sentence or two, it isn't ready to be code.
- Don't add dependencies. Don't add a build step beyond `tsc`.

## Helping a non-technical maintainer

Three skills in `.claude/skills/` walk through the common jobs step by step:
`add-ingredient`, `add-conversion-examples`, and `add-conversion-curve`. Prefer
following one of those over improvising, so that everyone's contributions come
out looking the same.

Nine pairs already carry curves, deliberately covering different shapes: a jump
(chutney/marinara), a change of rate with no jump (espresso/kombucha), a
logarithm and its inverse (honey/molasses), a square root (cinnamon/nutmeg), an
upper limit that returns `null` (saffron/paprika), a lower floor
(sesame oil/olive oil), a fixed starting cost (buttermilk/yogurt), and a clamp
that deliberately does not round-trip (cornstarch/all-purpose flour). When
writing a new curve, find the closest of these and follow it — the README lists
them in a table.

When someone gives you a conversion in words — *"past 2 ml you need twice as
much marinara"* — read it back to them as numbers before writing any code
(*"so 3 ml of chutney becomes 6 ml of marinara?"*). Ambiguity about what
"twice as much" is twice *of* is the most likely way to get this wrong.
