/**
 * The units a recipe can be written in. SI only.
 *
 * ---------------------------------------------------------------------------
 * TO ADD A NEW UNIT: add one line to the table below.
 * ---------------------------------------------------------------------------
 *
 * `dimension` says whether the unit measures space taken up ("volume") or how
 * heavy something is ("mass"). `inBaseUnits` says how many base units one of
 * this unit is worth. The base unit is millilitres for volume and milligrams
 * for mass, because that is what ingredient densities are written in
 * (mg per ml).
 */
export const UNITS = {
	ml: { dimension: "volume", inBaseUnits: 1 },
	l: { dimension: "volume", inBaseUnits: 1000 },
	mg: { dimension: "mass", inBaseUnits: 1 },
	g: { dimension: "mass", inBaseUnits: 1000 },
	kg: { dimension: "mass", inBaseUnits: 1_000_000 },
} as const satisfies Record<string, { dimension: Dimension; inBaseUnits: number }>;

/** What a unit measures. */
export type Dimension = "volume" | "mass";

/** Any unit the library accepts, e.g. `"ml"` or `"g"`. */
export type Unit = keyof typeof UNITS;

/** Every accepted unit, handy for building dropdowns. */
export const ALL_UNITS = Object.keys(UNITS) as Unit[];

export function isUnit(value: string): value is Unit {
	return Object.prototype.hasOwnProperty.call(UNITS, value);
}

/**
 * Convert an amount of `unit` into millilitres.
 *
 * Mass units need the ingredient's density to answer "how much space does this
 * weight take up?", which is why the density is a parameter.
 */
export function toMillilitres(amount: number, unit: Unit, densityMgPerMl: number): number {
	const { dimension, inBaseUnits } = UNITS[unit];
	const base = amount * inBaseUnits;
	return dimension === "volume" ? base : base / densityMgPerMl;
}

/** The exact inverse of {@link toMillilitres}. */
export function fromMillilitres(millilitres: number, unit: Unit, densityMgPerMl: number): number {
	const { dimension, inBaseUnits } = UNITS[unit];
	const base = dimension === "volume" ? millilitres : millilitres * densityMgPerMl;
	return base / inBaseUnits;
}
