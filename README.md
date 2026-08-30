# conversions

Work out how much of one ingredient to use when a recipe calls for another.

> My recipe says 0.5 ml of chutney, but I only have marinara. How much marinara?

```ts
import { convert } from "@proformance42/conversions";

convert("chutney", "marinara", 0.5, "ml");
// { ok: true, amount: 0.375, unit: "ml" }
```

Pure maths, no network, no dependencies — it runs entirely in the browser, which
is what the static conversion site is built on.

---

## Using the library

There is one function.

```ts
convert(from, to, amount, unit)
```

| Argument | What it is |
| --- | --- |
| `from` | The ingredient the recipe calls for, e.g. `"chutney"`. |
| `to` | The ingredient you actually have, e.g. `"marinara"`. |
| `amount` | How much of `from` the recipe asks for. Zero or more. |
| `unit` | The unit of `amount`. **The answer comes back in this same unit.** |

It never throws. Every answer is a result object you check with `ok`:

```ts
const result = convert("chutney", "marinara", 0.5, "ml");

if (result.ok) {
	console.log(`Use ${result.amount} ${result.unit}`); // Use 0.375 ml
} else {
	console.error(result.error.message); // safe to show to a person
}
```

When something is wrong, `result.error.code` is one of:

| Code | Meaning |
| --- | --- |
| `UNKNOWN_INGREDIENT` | We have never heard of one of those ingredients. |
| `INCOMPATIBLE_TYPES` | They are different types — a sauce can't replace a beverage. |
| `UNKNOWN_UNIT` | That unit isn't in the table below. |
| `INVALID_AMOUNT` | The amount was negative, or not a number. |
| `NO_CONVERSION_DEFINED` | A bespoke rule exists for this pair but has no answer for that amount. |

Two small helpers come along for building a dropdown:

```ts
listIngredients();          // ["chutney", "gin", "marinara", "vodka"]
listIngredients("sauce");   // ["chutney", "marinara"]
ingredientType("chutney");  // "sauce"
```

### Units

SI only. Volume and weight both work, because every ingredient knows how much a
millilitre of it weighs.

| Volume | Weight |
| --- | --- |
| `ml`, `l` | `mg`, `g`, `kg` |

One thing that surprises people: for an ordinary pair, **a weight converts to
the same weight** — 1 mg of vodka is 1 mg of gin. That is not a bug. Two
ingredients of the same type are equivalent by weight, so swapping them changes
how much *space* they take up, not how much they *weigh*. Weights only change
when a bespoke rule ([below](#3-a-conversion-that-isnt-a-straight-line)) says
they should.

---

## Maintaining the ingredients

Everything a maintainer touches lives in [`src/ingredients/`](src/ingredients).
One file per ingredient, sorted into a folder per type.

```
src/ingredients/
	index.ts             <- the list every ingredient is registered in
	sauces/       chutney, marinara, pesto, aioli, harissa, tzatziki, gravy, hollandaise
	beverages/    vodka, gin, rum, whiskey, cider, kombucha, espresso, lemonade
	spices/       cinnamon, paprika, turmeric, cumin, saffron, nutmeg, cayenne, cardamom
	sweeteners/   honey, molasses, maple syrup, agave, treacle, glucose, stevia, sorghum
	oils/         olive oil, sesame oil, coconut oil, canola oil, peanut oil, walnut oil, avocado oil, ghee
	dairy/        milk, cream, buttermilk, yogurt, sour cream, kefir, condensed milk, half and half
	flours/       all-purpose flour, bread flour, cake flour, rye flour, almond flour, semolina, cornstarch, oat flour
```

The type names themselves live in
[`src/ingredient-types.ts`](src/ingredient-types.ts). An ingredient can only be
swapped for another of the same type.

If you use an AI assistant, ask it to run the `add-ingredient`,
`add-conversion-examples`, or `add-conversion-curve` skill and it will walk you
through the steps below.

### 1. Add an ingredient

Copy [`beverages/vodka.ts`](src/ingredients/beverages/vodka.ts) — it is the
simplest one — into the right folder and change the details:

```ts
import { defineIngredient } from "../../define.js";

export const pesto = defineIngredient({
	name: "pesto",
	type: "sauce",
	densityMgPerMl: 180,

	examples: [
		{ to: "marinara", amount: 1, unit: "ml", expect: 0.9 },
	],
});
```

- **`name`** must be lowercase and unique across the *whole* library, not just
  its own type. The tests will stop you if you reuse one.
- **`type`** must be one of the types in
  [`src/ingredient-types.ts`](src/ingredient-types.ts). Adding a new type is one
  line in that file.
- **`densityMgPerMl`** is how many milligrams one millilitre weighs. This single
  number drives every ordinary conversion.

Then register it in [`src/ingredients/index.ts`](src/ingredients/index.ts) — an
import line and an entry in the list — and run `npm test`.

### 2. Add conversion tests

You do not write test code. You add a row of numbers to the ingredient's own
`examples` list, and it becomes a test automatically:

```ts
examples: [
	{ to: "marinara", amount: 0.5, unit: "ml", expect: 0.375 },
	{ to: "marinara", amount: 2,   unit: "ml", expect: 1.5   },
	{ to: "gin",      amount: 1,   unit: "ml", expectError: "INCOMPATIBLE_TYPES" },
],
```

Read that first row as *"0.5 ml of chutney gives 0.375 ml of marinara"* — which
is exactly how it is printed when you run `npm test`:

```
✓ chutney (sauce, 150 mg/ml)
  ✓ 0.5 ml of chutney gives 0.375 ml of marinara
  ✓ 2 ml of chutney gives 1.5 ml of marinara
  ✓ 1 ml of chutney cannot become gin (INCOMPATIBLE_TYPES)
```

Each row can also carry:

- `note` — free text explaining why the example matters. Worth writing.
- `tolerance` — how far off the answer may be. Defaults to a billionth, so set
  it if your expected number is rounded, e.g. `tolerance: 0.001`.

### 3. A conversion that isn't a straight line

Sometimes one ingredient doesn't substitute for another at a fixed ratio. Those
pairs get a **curve**, written in the source ingredient's file under `curves`,
keyed by the target ingredient's name:

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

`toMl` takes millilitres of the source and returns millilitres of the target —
always millilitres, whatever unit the person asked in. Write `describe` first,
in plain English; if you can't describe the rule, it isn't ready to be code.
Return `null` for amounts that have no sensible answer, and the caller gets a
`NO_CONVERSION_DEFINED` error quoting your description.

**Curves must be written in both directions.** If chutney has a curve to
marinara, marinara needs its own curve back to chutney — see
[`sauces/marinara.ts`](src/ingredients/sauces/marinara.ts). The library will not
reverse a curve for you on purpose: the example above jumps at 2 ml, so no
amount of chutney produces between 1.5 ml and 4 ml of marinara, and only a
person can decide what to answer in that gap. The tests fail if you write only
one side.

#### Find a curve shaped like yours

Eight pairs already carry curves, each a different shape. Open the one closest
to what you are describing and copy it rather than starting from nothing.

| If your rule… | Look at | Where |
| --- | --- | --- |
| jumps suddenly at some amount | chutney → marinara | [`sauces/chutney.ts`](src/ingredients/sauces/chutney.ts) |
| changes rate but never jumps | espresso → kombucha | [`beverages/espresso.ts`](src/ingredients/beverages/espresso.ts) |
| grows more and more slowly | honey → molasses | [`sweeteners/honey.ts`](src/ingredients/sweeteners/honey.ts) |
| grows faster and faster | molasses → honey | [`sweeteners/molasses.ts`](src/ingredients/sweeteners/molasses.ts) |
| needs a lot up front, little after | cinnamon → nutmeg | [`spices/cinnamon.ts`](src/ingredients/spices/cinnamon.ts) |
| stops working above some amount | saffron → paprika | [`spices/saffron.ts`](src/ingredients/spices/saffron.ts) |
| is not worth doing below some amount | sesame oil → olive oil | [`oils/sesame-oil.ts`](src/ingredients/oils/sesame-oil.ts) |
| has a fixed cost before it scales | buttermilk → yogurt | [`dairy/buttermilk.ts`](src/ingredients/dairy/buttermilk.ts) |
| stops making a difference past a point | cornstarch → all-purpose flour | [`flours/cornstarch.ts`](src/ingredients/flours/cornstarch.ts) |

Two of them are worth reading even if you are not writing a curve, because they
show what the library will and will not promise:

- **cornstarch → all-purpose flour** stops climbing, so 30 ml and 500 ml of
  cornstarch give the same answer. Converting back gives you 30 ml, not what you
  started with. Some conversions genuinely lose information, and the library
  would rather say so than pretend.
- **saffron → paprika** simply refuses above half a millilitre. Returning `null`
  from a curve is a real answer — better than a number nobody should cook with.

---

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install the tooling. Once, at the start. |
| `npm test` | Run every test, including all the worked examples. |
| `npm run test:watch` | Re-run tests as you edit. Nice while tuning numbers. |
| `npm run typecheck` | Check for typos and mistakes without running anything. |
| `npm run build` | Produce the published files in `dist/`. |

## Contributing

Bug reports and new ingredients are welcome. Every change to the numbers should
come with examples that show the new behaviour. See [AGENTS.md](AGENTS.md) for
the invariants this library holds itself to — it is written for AI assistants,
but it is a good summary for people too.

## Licence

MIT — see [LICENSE](LICENSE).
