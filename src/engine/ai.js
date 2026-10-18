/**
 * Nutrel Grounded AI Nutrition Assistant Engine
 * Grounded in ICMR-NIN IFCT 2017 data, physiological biochemistry, and safety boundaries.
 * Provides detailed food breakdowns, digestion pathways, and evidence-based Compensator guidance.
 */

import { FOODS } from '../data/foods.js';
import { NUTRIENTS } from '../data/nutrients.js';
import { LESSONS } from '../data/lessons.js';
import { calculateDailySummary, calculateFoodEntryNutrients } from './calculator.js';

/**
 * Classifies query intent and flags medical diagnostic queries
 */
function inspectQuerySafety(query) {
  const q = query.toLowerCase();

  const diagnosticKeywords = [
    'do i have deficiency', 'diagnose me', 'am i anemic', 'cure my disease',
    'stop taking metformin', 'stop taking blood pressure medication',
    'cure cancer with diet', 'treat diabetes with food only'
  ];

  for (const kw of diagnosticKeywords) {
    if (q.includes(kw)) {
      return {
        isHighRisk: true,
        disclaimer: 'Nutrel is an evidence-based wellness education and tracking guide. We cannot diagnose clinical conditions or alter medical treatments. Please consult your physician or registered dietitian for clinical pathology tests.'
      };
    }
  }

  return { isHighRisk: false };
}

/**
 * Searches the food catalogue with portion parsing
 */
function searchFoodDatabase(query) {
  const q = query.toLowerCase();

  // Keyword to food matching
  const matches = [];

  FOODS.forEach(food => {
    const foodNameLower = food.name.toLowerCase();
    const words = foodNameLower.split(/[\s(/)]+/).filter(w => w.length > 2);

    for (const w of words) {
      if (q.includes(w)) {
        matches.push(food);
        break;
      }
    }
  });

  return matches;
}

/**
 * Generates grounded response based on deterministic nutrition science
 */
export async function generateAssistantResponse(query, todayLogs = [], profile = {}) {
  const safety = inspectQuerySafety(query);
  if (safety.isHighRisk) {
    return {
      answer: `⚠️ **Important Health Notice:**\n\n${safety.disclaimer}\n\nIf you are experiencing symptoms such as chronic fatigue or dizziness, a licensed physician can order validated blood panels (e.g. serum ferritin, complete blood count, or serum calcium) to provide safe, accurate medical care.`,
      sources: [{ label: 'Nutrel Medical Boundaries & Safety Policy', type: 'compliance' }],
      uncertainties: ['Clinical conditions require in-person pathology tests.'],
      actionLink: null
    };
  }

  const q = query.toLowerCase();
  const summary = calculateDailySummary(todayLogs, profile);

  // 1. Compensator & Post-Meal High-Carb Guidance
  if (
    q.includes('compensator') ||
    q.includes('high carb') ||
    q.includes('high-carb') ||
    q.includes('sugar free life') ||
    q.includes('too many sweets') ||
    q.includes('overate') ||
    q.includes('burn off') ||
    q.includes('cancel out') ||
    q.includes('heavy meal') ||
    q.includes('what to do after eating')
  ) {
    const userWeight = profile.weightKg || 62;
    const totalCarbsLogged = summary.nutrients.carbs?.totalAmount || 0;

    let response = `### ⚖️ Evidence-Based Post-Meal Guidance\n\n`;
    response += `When you consume a carbohydrate-rich meal, salivary and pancreatic **amylase** enzymes break down starches into **glucose**. Glucose enters the portal bloodstream, triggering insulin secretion so your muscle cells and liver can absorb it for immediate cellular respiration (ATP) or polymerize it into **glycogen reserves**.\n\n`;

    response += `**Vital Principles to Remember:**\n`;
    response += `• **Exercise does NOT mathematically wipe out a meal:** Muscular work utilizes circulating glucose and glycogen, but nutrition and exercise serve complementary biological roles. Food is nourishment; movement is vitality, **never a punishment for eating**.\n`;
    response += `• **Dietary fibre is not to be burned off:** Fibre is non-digestible plant polysaccharide that acts as a prebiotic, feeds beneficial gut bacteria, and naturally blunts glucose spikes.\n\n`;

    response += `**5 Wholesome Next Steps:**\n`;
    response += `1. **Gentle Post-Meal Walk (15–25 mins):** Walking activates skeletal muscle contractions that stimulate **GLUT-4 glucose transporters** to enter muscle cell membranes *without* requiring additional insulin, naturally smoothing out postprandial glucose peaks.\n`;
    response += `2. **Hydration Reset:** Drink 1–2 glasses of water or buttermilk (chaas). Fluid supports kidney glomerular filtration and helps rehydrate cellular compartments.\n`;
    response += `3. **Anchor Your Next Meal:** Balance upcoming meals with high-fibre vegetables (methi, palak, cucumbers) and lean protein (dal, paneer, sprouts) for sustained energy.\n`;
    response += `4. **Gentle Movement Guide:** For your body weight (~${userWeight}kg), a 20-minute brisk walk uses ~80–95 kcal of active energy while comfortably easing digestion.\n`;
    response += `5. **Prioritize Rest & Sleep:** High stress elevates cortisol, which prompts liver gluconeogenesis and raises blood sugar. Relax, take a deep breath, and rest.\n\n`;

    response += `You can explore exact activity estimates and personalized guidance directly in Nutrel's **Compensator** page.`;

    return {
      answer: response,
      sources: [
        { label: 'Nutrel Activity & Intake Compensator Engine', type: 'engine' },
        { label: 'American Diabetes Association (ADA) Exercise Physiology Guidelines', type: 'scientific_reference' },
        { label: 'Compendium of Physical Activities (MET standards)', type: 'database' }
      ],
      uncertainties: [
        'Estimates represent physiological approximations; metabolic rates vary by baseline fitness and muscle mass.',
        'Not a mathematical cancellation of food.'
      ],
      actionLink: { tab: 'compensator', label: 'Open Activity Compensator ⚖️' }
    };
  }

  // 2. Specific Food & Nutrient Queries (e.g., "protein in 2 rotis and dal", "paneer digestion", etc.)
  const matchedFoods = searchFoodDatabase(query);

  if (
    matchedFoods.length > 0 ||
    q.includes('how much protein') ||
    q.includes('calories in') ||
    q.includes('nutrients in') ||
    q.includes('how does paneer') ||
    q.includes('how is dal digested')
  ) {
    const primaryFood = matchedFoods[0] || FOODS[0]; // fallback to toor dal if generic
    let servingGrams = 100;
    let servingLabel = '100g (standard basis)';

    // Extract quantity if mentioned (e.g., "2 rotis", "150g", "1 katori")
    if (q.includes('2 roti') || q.includes('two roti')) {
      servingGrams = 70;
      servingLabel = '2 Medium Rotis (~70g)';
    } else if (q.includes('1 katori') || q.includes('bowl')) {
      servingGrams = 150;
      servingLabel = '1 Standard Katori (~150g)';
    } else if (q.includes('100g')) {
      servingGrams = 100;
      servingLabel = '100g portion';
    } else if (primaryFood.serving_options && primaryFood.serving_options.length > 0) {
      servingGrams = primaryFood.serving_options[0].grams;
      servingLabel = primaryFood.serving_options[0].name;
    }

    const calc = calculateFoodEntryNutrients(primaryFood, servingGrams);
    const prot = calc.nutrients.protein?.amount ?? '—';
    const carb = calc.nutrients.carbs?.amount ?? '—';
    const fat = calc.nutrients.fats?.amount ?? '—';
    const fib = calc.nutrients.fibre?.amount ?? '—';
    const iron = calc.nutrients.iron?.amount ?? '—';
    const calcVal = calc.nutrients.calcium?.amount ?? '—';

    // How it fits into today's logged intake
    const currentProtein = summary.nutrients.protein?.totalAmount || 0;
    const targetProtein = summary.nutrients.protein?.target || 55;
    const newProteinTotal = Number((currentProtein + (typeof prot === 'number' ? prot : 0)).toFixed(1));
    const newProteinPct = Math.round((newProteinTotal / targetProtein) * 100);

    let answer = `### 🥗 Nutrient Breakdown: ${primaryFood.name}\n`;
    answer += `**Serving Evaluated:** ${servingLabel} *(If your serving differed, let me know!)*\n\n`;
    answer += `• **Estimated Energy:** ~**${calc.calories} kcal**\n`;
    answer += `• **Protein:** **${prot}g**\n`;
    answer += `• **Carbohydrates:** **${carb}g** (Dietary Fibre: **${fib}g**)\n`;
    answer += `• **Fats:** **${fat}g**\n`;
    answer += `• **Micronutrients:** Iron: **${iron}mg** • Calcium: **${calcVal}mg**\n\n`;

    answer += `**Digestion & Biological Effects:**\n`;
    if (primaryFood.category.includes('Lentil') || primaryFood.name.toLowerCase().includes('dal')) {
      answer += `Lentils provide complex carbohydrates and plant protein rich in **lysine**. Gastric pepsin and pancreatic proteases break it down into amino acids. Pairing with cereal grains (like wheat roti or rice) supplies complementary **methionine**, forming a complete amino acid profile for muscle tissue remodeling.\n\n`;
    } else if (primaryFood.name.toLowerCase().includes('roti') || primaryFood.category.includes('Grain')) {
      answer += `Whole wheat chapati contains complex starches packed with insoluble bran fibre. Salivary and pancreatic amylase break it down steadily into glucose, avoiding sudden glycemic spikes while delivering sustained energy.\n\n`;
    } else if (primaryFood.name.toLowerCase().includes('paneer') || primaryFood.category.includes('Dairy')) {
      answer += `Paneer delivers micellar casein protein and bioavailable calcium. Casein digests slowly over 4–6 hours, providing a sustained release of branched-chain amino acids (leucine) for nighttime muscle adaptation.\n\n`;
    } else {
      answer += `Nutrients are enzymatically digested in the stomach and small intestine, absorbed across mucosal enterocytes, and distributed via circulation to fuel metabolic demands.\n\n`;
    }

    answer += `**How it fits your logged intake today:**\n`;
    answer += `Adding this portion brings your daily protein to **${newProteinTotal}g (${newProteinPct}% of your target)**. Logged so far: ${summary.totalCalories} kcal across ${todayLogs.length} items.\n\n`;
    answer += `💡 *Tip: Check your full personalized blueprint in the **Make Your Chart** page!*`;

    return {
      answer,
      sources: [
        { label: primaryFood.data_source || 'ICMR-NIN IFCT 2017 Data', type: 'database' },
        { label: 'Nutrel Deterministic Calculation Engine', type: 'engine' }
      ],
      uncertainties: [
        `Portion assumed as ${servingLabel}. Actual home recipes and cooking oils vary.`,
        'Estimates represent nutritional averages; not clinical absorption assays.'
      ],
      actionLink: { tab: 'make-chart', label: 'View Personalized Chart 📊' }
    };
  }

  // 3. Today's Logged Meals Explanation
  if (q.includes('lunch') || q.includes('dinner') || q.includes('breakfast') || q.includes('today') || q.includes('my meal')) {
    if (todayLogs.length === 0) {
      return {
        answer: `I checked your food diary for today, but no meals have been logged yet! 🥗\n\nTap the **Log Food (+)** button below to log your breakfast, lunch, or a snack (e.g. *2 Rotis, 1 Katori Dal, and Curd*). Once logged, I will calculate your exact nutrient distribution and suggest evidence-based habits!`,
        sources: [{ label: 'Food Log Diary', type: 'user_records' }],
        uncertainties: ['No meal data recorded today.'],
        actionLink: null
      };
    }

    const s = summary;
    const proteinAmount = s.nutrients.protein?.totalAmount || 0;
    const fibreAmount = s.nutrients.fibre?.totalAmount || 0;
    const ironAmount = s.nutrients.iron?.totalAmount || 0;
    const carbsAmount = s.nutrients.carbs?.totalAmount || 0;

    let mealAnalysis = `Here is a grounded biological breakdown of your logged meals today (${todayLogs.length} items logged, ~${s.totalCalories} kcal):\n\n`;
    mealAnalysis += `• **Carbohydrates (${carbsAmount}g):** Digested into glucose to supply cellular ATP for brain and physical work. Reached **${s.nutrients.carbs?.percentageOfTarget || 0}%** of daily reference.\n`;
    mealAnalysis += `• **Protein (${proteinAmount}g):** Reached **${s.nutrients.protein.percentageOfTarget}%** of daily target (${s.nutrients.protein.target}g). Supplies amino acids for muscle adaptation.\n`;
    mealAnalysis += `• **Dietary Fibre (${fibreAmount}g):** Reached **${s.nutrients.fibre.percentageOfTarget}%** of target. Ferments into anti-inflammatory short-chain fatty acids (SCFAs).\n`;
    mealAnalysis += `• **Iron (${ironAmount}mg):** ${s.nutrients.iron.coverageStatus === 'partial' ? '(Partial data across some items)' : ''} Essential for hemoglobin oxygen transport.\n\n`;
    mealAnalysis += `💡 **Suggested Next Step:** Squeeze fresh lemon over your food to boost iron bioavailability, and consider a 15-minute gentle post-meal stroll to help muscles absorb circulating glucose without insulin spikes!`;

    return {
      answer: mealAnalysis,
      sources: [
        { label: 'Deterministic Nutrition Engine', type: 'engine' },
        { label: 'ICMR-NIN IFCT 2017 Food Composition Data', type: 'database' }
      ],
      uncertainties: [
        'Portion weights and home cooking methods can vary; estimates represent averages.',
        'Not a measurement of clinical blood absorption.'
      ],
      actionLink: { tab: 'compensator', label: 'Explore Intake Compensator ⚖️' }
    };
  }

  // 4. Default High-Quality Grounded Answer
  return {
    answer: `Great question about nutrition! Nutrel answers are grounded in structured scientific biochemistry.\n\n• **Core Principle:** Wellness is not about harsh restriction or burning off meals through grueling punishment—it is about providing your cells with amino acids, dietary fibre, hydration, and micronutrients for sustained energy.\n• **Suggested Action:** Tap **Make Your Chart** to personalize your daily targets, or open the **Compensator** to explore evidence-based habits after meals!`,
    sources: [
      { label: 'Nutrel Core Guidance Principles', type: 'curated_content' },
      { label: 'ICMR-NIN 2020 Dietary Guidelines for Indians', type: 'scientific_reference' }
    ],
    uncertainties: ['General educational context; not tailored medical prescription.'],
    actionLink: { tab: 'compensator', label: 'Open Activity Compensator ⚖️' }
  };
}
