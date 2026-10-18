/**
 * Nutrel Deterministic Calculation Engine
 * TDD Section 6: Exact, unit-tested deterministic calculations
 * Equation: contribution = (amount_per_basis_grams * consumed_grams) / basis_grams
 * Strict rule: Missing values are NEVER treated as zero.
 */

import { NUTRIENTS, getReferenceTarget } from '../data/nutrients.js';

/**
 * Calculates nutrient amounts for a single consumed food log entry
 */
export function calculateFoodEntryNutrients(food, grams) {
  if (!food || !food.nutrients || grams <= 0) {
    return { calories: 0, nutrients: {} };
  }

  const basisGrams = food.basis_grams || 100;
  const multiplier = Number((grams / basisGrams).toFixed(4));
  const entryCalories = Math.round((food.calories || 0) * multiplier);

  const nutrientResults = {};

  for (const [code, nData] of Object.entries(food.nutrients)) {
    if (nData.is_missing || nData.amount === null || nData.amount === undefined) {
      nutrientResults[code] = {
        code,
        amount: null,
        unit: nData.unit || (NUTRIENTS[code]?.canonical_unit ?? 'g'),
        is_missing: true,
        source: food.data_source
      };
    } else {
      // Deterministic multiplication with 2 decimal precision
      const rawContribution = (nData.amount * grams) / basisGrams;
      const cleanContribution = Number(rawContribution.toFixed(2));
      nutrientResults[code] = {
        code,
        amount: cleanContribution,
        unit: nData.unit,
        is_missing: false,
        source: food.data_source
      };
    }
  }

  return {
    calories: entryCalories,
    nutrients: nutrientResults
  };
}

/**
 * Aggregates all food logs for a given day
 * Returns daily totals, coverage metrics, and target comparisons
 */
export function calculateDailySummary(foodLogs = [], profile = {}) {
  const summary = {
    totalCalories: 0,
    totalLoggedFoods: foodLogs.length,
    nutrients: {},
    disclaimer: 'Estimates based on logged food composition; not a clinical measurement of absorption or a medical diagnosis.',
    completenessNote: ''
  };

  // Initialize summary for all 8 tracked nutrients
  for (const [code, info] of Object.entries(NUTRIENTS)) {
    const targetInfo = getReferenceTarget(code, profile);
    summary.nutrients[code] = {
      code,
      name: info.name,
      analogy: info.analogy,
      totalAmount: 0,
      canonicalUnit: info.canonical_unit,
      target: targetInfo.target,
      targetType: targetInfo.type,
      standard: targetInfo.standard,
      contributingFoods: [], // { foodName, amount, grams }
      knownCount: 0,
      missingCount: 0,
      coverageStatus: 'none_logged', // complete, partial, missing, none_logged
      percentageOfTarget: 0
    };
  }

  if (foodLogs.length === 0) {
    return summary;
  }

  // Iterate over each logged food
  foodLogs.forEach(log => {
    const calculated = calculateFoodEntryNutrients(log.food, log.quantity_grams);
    summary.totalCalories += calculated.calories;

    for (const [code, nResult] of Object.entries(calculated.nutrients)) {
      if (!summary.nutrients[code]) continue;

      const nut = summary.nutrients[code];

      if (nResult.is_missing) {
        nut.missingCount += 1;
      } else {
        nut.knownCount += 1;
        nut.totalAmount = Number((nut.totalAmount + nResult.amount).toFixed(2));
        nut.contributingFoods.push({
          foodId: log.food.id,
          foodName: log.food.name,
          portionName: log.portionName || `${log.quantity_grams}g`,
          amount: nResult.amount,
          unit: nResult.unit
        });
      }
    }
  });

  // Calculate coverage and target percentages
  for (const [code, nut] of Object.entries(summary.nutrients)) {
    // Sort contributing foods descending by amount
    nut.contributingFoods.sort((a, b) => b.amount - a.amount);

    if (nut.missingCount === 0 && nut.knownCount > 0) {
      nut.coverageStatus = 'complete';
      nut.coverageLabel = `Verified for all ${nut.knownCount} items`;
    } else if (nut.knownCount > 0 && nut.missingCount > 0) {
      nut.coverageStatus = 'partial';
      nut.coverageLabel = `Available for ${nut.knownCount} of ${nut.knownCount + nut.missingCount} items (missing from some items)`;
    } else if (nut.missingCount > 0 && nut.knownCount === 0) {
      nut.coverageStatus = 'missing';
      nut.coverageLabel = 'Data unavailable for logged items';
    } else {
      nut.coverageStatus = 'none_logged';
      nut.coverageLabel = 'No foods logged yet';
    }

    if (nut.target && nut.target > 0) {
      nut.percentageOfTarget = Math.min(Math.round((nut.totalAmount / nut.target) * 100), 200);
    }
  }

  return summary;
}
