import { gin } from "./beverages/gin.js";
import { vodka } from "./beverages/vodka.js";
import { chutney } from "./sauces/chutney.js";
import { marinara } from "./sauces/marinara.js";

import type { Ingredient } from "../types.js";

/**
 * ---------------------------------------------------------------------------
 * THE LIST. Every ingredient in the library is registered here.
 * ---------------------------------------------------------------------------
 *
 * To add an ingredient:
 *   1. Create a file next to the others, e.g. `sauces/pesto.ts`.
 *   2. Import it above.
 *   3. Add its name to the list below.
 *   4. Run `npm test`.
 *
 * Names must be unique across the WHOLE list, not just within one type. The
 * tests will tell you if you reuse one by mistake.
 */
export const ingredients: Ingredient[] = [chutney, marinara, vodka, gin];
