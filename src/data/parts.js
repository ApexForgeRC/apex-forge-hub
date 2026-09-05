import { PARTS_SOURCE } from './partsSource';

/**
 * Public markup applied to every part's sourced cost (Jenny's RC take-off/genuine
 * Arrma parts + Hobbywing/Spektrum retail listings, pulled Aug 2026).
 *
 * Change this single number whenever you want — every price on /parts recalculates
 * from it. Nothing else needs editing.
 */
export const MARKUP_PERCENT = 20;

const round2 = (n) => Math.round(n * 100) / 100;

/** Public parts catalog: cost data + public sell price, one object per part. */
export const PARTS = PARTS_SOURCE.map((p) => ({
  ...p,
  cost: p.price,
  sellPrice: round2(p.price * (1 + MARKUP_PERCENT / 100)),
}));

export const PART_CATEGORIES = [...new Set(PARTS.map((p) => p.category))].sort();
