import { getLogNormalScore } from "./statistics";

/**
 * Computes a score between 0 and 1 based on the measured `value`. Score is determined by
 * considering a log-normal distribution governed by two control points (the 10th
 * percentile value and the median value) and represents the percentage of sites that are
 * greater than `value`.
 *
 * Score characteristics:
 * - within [0, 1]
 * - rounded to two digits
 * - value must meet or beat a controlPoint value to meet or exceed its percentile score:
 *   - value > median will give a score < 0.5; value ≤ median will give a score ≥ 0.5.
 *   - value > p10 will give a score < 0.9; value ≤ p10 will give a score ≥ 0.9.
 * - values < p10 will get a slight boost so a score of 1 is achievable by a
 *   `value` other than those close to 0. Scores of > ~0.99524 end up rounded to 1.
 * @param {{median: number, p10: number}} controlPoints
 * @param {number} value
 * @return {number}
 */
export function computeLogNormalScore(
  controlPoints: { median: number; p10: number },
  value: number
) {
  let percentile = getLogNormalScore(controlPoints, value);
  // Add a boost to scores of 90+, linearly ramping from 0 at 0.9 to half a
  // point (0.005) at 1. Expands scores in (0.9, 1] to (0.9, 1.005], so more top
  // scores will be a perfect 1 after the two-digit `Math.floor()` rounding below.
  if (percentile > 0.9) {
    // getLogNormalScore ensures `percentile` can't exceed 1.
    percentile += 0.05 * (percentile - 0.9);
  }
  return Math.floor(percentile * 100) / 100;
}
