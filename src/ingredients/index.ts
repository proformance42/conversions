import { cider } from "./beverages/cider.js";
import { espresso } from "./beverages/espresso.js";
import { gin } from "./beverages/gin.js";
import { kombucha } from "./beverages/kombucha.js";
import { lemonade } from "./beverages/lemonade.js";
import { rum } from "./beverages/rum.js";
import { vodka } from "./beverages/vodka.js";
import { whiskey } from "./beverages/whiskey.js";

import { buttermilk } from "./dairy/buttermilk.js";
import { condensedMilk } from "./dairy/condensed-milk.js";
import { cream } from "./dairy/cream.js";
import { halfAndHalf } from "./dairy/half-and-half.js";
import { kefir } from "./dairy/kefir.js";
import { milk } from "./dairy/milk.js";
import { sourCream } from "./dairy/sour-cream.js";
import { yogurt } from "./dairy/yogurt.js";

import { allPurposeFlour } from "./flours/all-purpose-flour.js";
import { almondFlour } from "./flours/almond-flour.js";
import { breadFlour } from "./flours/bread-flour.js";
import { cakeFlour } from "./flours/cake-flour.js";
import { cornstarch } from "./flours/cornstarch.js";
import { oatFlour } from "./flours/oat-flour.js";
import { ryeFlour } from "./flours/rye-flour.js";
import { semolina } from "./flours/semolina.js";

import { avocadoOil } from "./oils/avocado-oil.js";
import { canolaOil } from "./oils/canola-oil.js";
import { coconutOil } from "./oils/coconut-oil.js";
import { ghee } from "./oils/ghee.js";
import { oliveOil } from "./oils/olive-oil.js";
import { peanutOil } from "./oils/peanut-oil.js";
import { sesameOil } from "./oils/sesame-oil.js";
import { walnutOil } from "./oils/walnut-oil.js";

import { aioli } from "./sauces/aioli.js";
import { chutney } from "./sauces/chutney.js";
import { gravy } from "./sauces/gravy.js";
import { harissa } from "./sauces/harissa.js";
import { hollandaise } from "./sauces/hollandaise.js";
import { marinara } from "./sauces/marinara.js";
import { pesto } from "./sauces/pesto.js";
import { tzatziki } from "./sauces/tzatziki.js";

import { cardamom } from "./spices/cardamom.js";
import { cayenne } from "./spices/cayenne.js";
import { cinnamon } from "./spices/cinnamon.js";
import { cumin } from "./spices/cumin.js";
import { nutmeg } from "./spices/nutmeg.js";
import { paprika } from "./spices/paprika.js";
import { saffron } from "./spices/saffron.js";
import { turmeric } from "./spices/turmeric.js";

import { agave } from "./sweeteners/agave.js";
import { glucose } from "./sweeteners/glucose.js";
import { honey } from "./sweeteners/honey.js";
import { mapleSyrup } from "./sweeteners/maple-syrup.js";
import { molasses } from "./sweeteners/molasses.js";
import { sorghum } from "./sweeteners/sorghum.js";
import { stevia } from "./sweeteners/stevia.js";
import { treacle } from "./sweeteners/treacle.js";

import type { Ingredient } from "../types.js";

/**
 * ---------------------------------------------------------------------------
 * THE LIST. Every ingredient in the library is registered here.
 * ---------------------------------------------------------------------------
 *
 * To add an ingredient:
 *   1. Create a file next to the others, e.g. `sauces/ketchup.ts`.
 *   2. Import it above, in the block for its type.
 *   3. Add its name to the list below, in the block for its type.
 *   4. Run `npm test`.
 *
 * Names must be unique across the WHOLE list, not just within one type. The
 * tests will tell you if you reuse one by mistake.
 */
export const ingredients: Ingredient[] = [
	// Beverages
	cider,
	espresso,
	gin,
	kombucha,
	lemonade,
	rum,
	vodka,
	whiskey,

	// Dairy
	buttermilk,
	condensedMilk,
	cream,
	halfAndHalf,
	kefir,
	milk,
	sourCream,
	yogurt,

	// Flours
	allPurposeFlour,
	almondFlour,
	breadFlour,
	cakeFlour,
	cornstarch,
	oatFlour,
	ryeFlour,
	semolina,

	// Oils
	avocadoOil,
	canolaOil,
	coconutOil,
	ghee,
	oliveOil,
	peanutOil,
	sesameOil,
	walnutOil,

	// Sauces
	aioli,
	chutney,
	gravy,
	harissa,
	hollandaise,
	marinara,
	pesto,
	tzatziki,

	// Spices
	cardamom,
	cayenne,
	cinnamon,
	cumin,
	nutmeg,
	paprika,
	saffron,
	turmeric,

	// Sweeteners
	agave,
	glucose,
	honey,
	mapleSyrup,
	molasses,
	sorghum,
	stevia,
	treacle,
];
