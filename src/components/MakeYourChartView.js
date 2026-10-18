/**
 * Nutrel - Make Your Chart View
 * Allows users to create, review, and edit their personalised nutrition blueprint.
 * Computes deterministic targets for Protein, Carbs, Fats, Fibre, Water, and Micronutrients
 * based on user weight, activity level, and goals, with visual comparison charts and
 * grounded AI explanations.
 */

import { store } from '../state/store.js';
import { getReferenceTarget } from '../data/nutrients.js';

export function renderMakeYourChartView(container, onBackToHome) {
  let profile = { ...store.state.profile };
  const todaySummary = store.getTodaySummary();
  const todayLogs = store.getTodayLogs();

  // Deterministic calculation of personalized targets
  function calculatePersonalizedBlueprint(p) {
    const weight = p.weightKg || 62;
    const height = p.heightCm || 165;
    const isMale = p.sex === 'male';
    const age = p.ageBand === '18-25' ? 22 : (p.ageBand === '36-50' ? 42 : (p.ageBand === '51+' ? 58 : 29));

    // Mifflin-St Jeor BMR equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age) + (isMale ? 5 : -161);
    const activityMultipliers = {
      sedentary: 1.25,
      moderate: 1.45,
      active: 1.65
    };
    const actMult = activityMultipliers[p.activity] || 1.4;
    const tdee = Math.round(bmr * actMult);

    // Goal adjustments
    let targetCalories = tdee;
    let proteinPerKg = 1.0; // standard baseline

    if (p.wellnessGoal?.includes('energy')) {
      proteinPerKg = 1.1;
    } else if (p.wellnessGoal?.includes('muscle') || p.activity === 'active') {
      proteinPerKg = 1.3;
    } else if (p.wellnessGoal?.includes('protein')) {
      proteinPerKg = 1.2;
    }

    const proteinGrams = Math.round(weight * proteinPerKg);
    const fatGrams = Math.round((targetCalories * 0.25) / 9); // 25% energy from healthy fats
    const carbGrams = Math.round((targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4);
    const fibreGrams = p.sex === 'male' ? 35 : 30; // ICMR-NIN adequate intake
    const waterLiters = Number(((weight * 35) / 1000).toFixed(1)); // ~35ml/kg

    // Micronutrient reference targets from ICMR-NIN
    const ironInfo = getReferenceTarget('iron', p);
    const calciumInfo = getReferenceTarget('calcium', p);
    const magnesiumInfo = getReferenceTarget('magnesium', p);
    const vitCInfo = getReferenceTarget('vitamin_c', p);

    return {
      tdee,
      targetCalories,
      bmr: Math.round(bmr),
      macros: {
        protein: { name: 'Protein', target: proteinGrams, unit: 'g', kcal: proteinGrams * 4, pctKcal: Math.round(((proteinGrams * 4) / targetCalories) * 100) },
        carbs: { name: 'Carbohydrates', target: carbGrams, unit: 'g', kcal: carbGrams * 4, pctKcal: Math.round(((carbGrams * 4) / targetCalories) * 100) },
        fats: { name: 'Healthy Fats', target: fatGrams, unit: 'g', kcal: fatGrams * 9, pctKcal: Math.round(((fatGrams * 9) / targetCalories) * 100) },
        fibre: { name: 'Dietary Fibre', target: fibreGrams, unit: 'g', kcal: 0, pctKcal: 0 },
        water: { name: 'Daily Water & Fluids', target: waterLiters, unit: 'L', kcal: 0, pctKcal: 0 }
      },
      micros: {
        iron: { name: 'Iron', target: ironInfo?.target || 20, unit: 'mg' },
        calcium: { name: 'Calcium', target: calciumInfo?.target || 1000, unit: 'mg' },
        magnesium: { name: 'Magnesium', target: magnesiumInfo?.target || 380, unit: 'mg' },
        vitamin_c: { name: 'Vitamin C', target: vitCInfo?.target || 75, unit: 'mg' }
      }
    };
  }

  function generateGroundedAiExplanation(blueprint, summary) {
    const proteinLogged = summary.nutrients.protein?.totalAmount || 0;
    const fibreLogged = summary.nutrients.fibre?.totalAmount || 0;
    const carbsLogged = summary.nutrients.carbs?.totalAmount || 0;
    const proteinPct = Math.round((proteinLogged / blueprint.macros.protein.target) * 100);
    const fibrePct = Math.round((fibreLogged / blueprint.macros.fibre.target) * 100);

    let analysis = `**Personalised Blueprint Analysis for ${profile.displayName}:**\n\n`;
    analysis += `• **Calorie & Macro Basis:** Based on your body weight (${profile.weightKg || 62}kg) and ${profile.activity} activity level, your estimated energy requirement is **~${blueprint.targetCalories} kcal/day**. We allocate **${blueprint.macros.protein.target}g protein** (~${(blueprint.macros.protein.target / (profile.weightKg || 62)).toFixed(1)}g per kg body weight) to support tissue remodeling and daily vitality without excess nitrogen load.\n\n`;

    if (todayLogs.length === 0) {
      analysis += `• **Today's Logging:** No meals logged yet today. Once you log breakfast or lunch, this chart will compare your actual intake directly against these personalised reference targets.\n\n`;
    } else {
      analysis += `• **Current Intake vs Target:** You have logged **${proteinLogged}g protein (${proteinPct}%)** and **${fibreLogged}g fibre (${fibrePct}%)** so far today. Your carbohydrate intake is **${carbsLogged}g** out of your daily target of **${blueprint.macros.carbs.target}g**.\n\n`;
    }

    analysis += `💡 **Practical Recommendations:**\n`;
    analysis += `1. **Hydration Goal:** Aim for **${blueprint.macros.water.target}L** of fluids daily (water, light chaas, and coconut water) to maintain kidney glomerular filtration.\n`;
    analysis += `2. **Pairing Habit:** Combine whole pulses (dal, chana) with grains (roti, rice) to secure complete amino acids for muscle adaptation.\n`;
    analysis += `3. **Microbiome Support:** Reach your **${blueprint.macros.fibre.target}g fibre** goal with seasonal guava, whole rotis, and dark green leafy vegetables to nourish colonic butyrate production.`;

    return analysis;
  }

  function render() {
    const blueprint = calculatePersonalizedBlueprint(profile);
    const aiExplanation = generateGroundedAiExplanation(blueprint, todaySummary);

    // Intake comparisons
    const loggedCalories = todaySummary.totalCalories;
    const loggedProtein = todaySummary.nutrients.protein?.totalAmount || 0;
    const loggedCarbs = todaySummary.nutrients.carbs?.totalAmount || 0;
    const loggedFibre = todaySummary.nutrients.fibre?.totalAmount || 0;
    const loggedFats = todaySummary.nutrients.fats?.totalAmount || 0;
    const loggedIron = todaySummary.nutrients.iron?.totalAmount || 0;
    const loggedCalcium = todaySummary.nutrients.calcium?.totalAmount || 0;
    const loggedMagnesium = todaySummary.nutrients.magnesium?.totalAmount || 0;
    const loggedVitC = todaySummary.nutrients.vitamin_c?.totalAmount || 0;

    const calPct = Math.min(Math.round((loggedCalories / blueprint.targetCalories) * 100), 150);
    const protPct = Math.min(Math.round((loggedProtein / blueprint.macros.protein.target) * 100), 150);
    const carbPct = Math.min(Math.round((loggedCarbs / blueprint.macros.carbs.target) * 100), 150);
    const fatPct = Math.min(Math.round((loggedFats / blueprint.macros.fats.target) * 100), 150);
    const fibrePct = Math.min(Math.round((loggedFibre / blueprint.macros.fibre.target) * 100), 150);

    container.innerHTML = `
      <div class="animate-fade-in" style="padding-bottom: 24px;">
        <!-- Top Nav -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
          <button id="btn-chart-back" class="btn-secondary" style="width: auto; padding: 6px 14px; font-size: 0.78rem; display: flex; align-items: center; gap: 6px;">
            ← Back to Home
          </button>
          <span style="font-size: 0.72rem; color: var(--nutrel-sage-dark); font-weight: 700; background: var(--nutrel-sage-light); padding: 4px 10px; border-radius: var(--radius-full);">
            PERSONAL NUTRITION BLUEPRINT
          </span>
        </div>

        <!-- Hero Header -->
        <div class="nutrel-card" style="background: linear-gradient(135deg, #FAF7F2 0%, #E6F1F3 100%); margin-bottom: 16px;">
          <div style="display: flex; gap: 12px; align-items: flex-start;">
            <span style="font-size: 2rem; line-height: 1;">📊</span>
            <div>
              <h2 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--nutrel-text); margin-bottom: 4px;">
                Make Your Chart
              </h2>
              <p style="font-size: 0.8rem; color: var(--nutrel-text-muted); line-height: 1.45;">
                A personalised daily blueprint calibrated to your weight, activity level, and wellness goals based on authoritative ICMR-NIN guidelines.
              </p>
            </div>
          </div>
        </div>

        <!-- Editable User Inputs Review -->
        <div class="nutrel-card" style="margin-bottom: 16px;">
          <div class="card-header-row" style="margin-bottom: 10px;">
            <h3 style="font-family: var(--font-heading); font-size: 0.95rem;">Review & Edit Your Inputs</h3>
            <span style="font-size: 0.72rem; color: var(--nutrel-teal); font-weight: 600;">Live recalculation</span>
          </div>

          <form id="chart-inputs-form">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Body Weight (kg)</label>
                <input type="number" id="chart-input-weight" class="form-input" value="${profile.weightKg || 62}" min="30" max="250" step="0.5" required />
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Height (cm)</label>
                <input type="number" id="chart-input-height" class="form-input" value="${profile.heightCm || 165}" min="100" max="230" step="1" required />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Activity Level</label>
                <select id="chart-input-activity" class="form-select">
                  <option value="sedentary" ${profile.activity === 'sedentary' ? 'selected' : ''}>Sedentary (Desk work)</option>
                  <option value="moderate" ${profile.activity === 'moderate' ? 'selected' : ''}>Moderate (Daily active)</option>
                  <option value="active" ${profile.activity === 'active' ? 'selected' : ''}>Active (Regular sports/gym)</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label">Biological Sex</label>
                <select id="chart-input-sex" class="form-select">
                  <option value="female" ${profile.sex === 'female' ? 'selected' : ''}>Female (ICMR)</option>
                  <option value="male" ${profile.sex === 'male' ? 'selected' : ''}>Male (ICMR)</option>
                </select>
              </div>
            </div>

            <div class="form-group" style="margin-bottom: 12px;">
              <label class="form-label">Primary Goal</label>
              <select id="chart-input-goal" class="form-select">
                <option value="Boost energy and improve digestion" ${profile.wellnessGoal?.includes('energy') ? 'selected' : ''}>Boost daily energy & digestion</option>
                <option value="Build muscle and active recovery" ${profile.wellnessGoal?.includes('muscle') ? 'selected' : ''}>Active fitness & muscle adaptation</option>
                <option value="Ensure balanced plant protein & iron" ${profile.wellnessGoal?.includes('protein') ? 'selected' : ''}>Balanced plant protein & iron</option>
                <option value="Build consistent wholesome eating habits" ${profile.wellnessGoal?.includes('habits') ? 'selected' : ''}>Wholesome habit building</option>
              </select>
            </div>

            <button type="submit" class="btn-primary" style="padding: 10px; font-size: 0.82rem;">
              ✓ Update & Recalculate Blueprint
            </button>
          </form>
        </div>

        <!-- Visual Intake vs Reference Comparison Charts -->
        <div class="nutrel-card" style="margin-bottom: 16px;">
          <div class="card-header-row" style="margin-bottom: 8px;">
            <h3 style="font-family: var(--font-heading); font-size: 0.95rem;">Intake vs Target Comparison</h3>
            <span style="font-size: 0.72rem; color: var(--nutrel-sage-dark); font-weight: 600;">Calibrated to ${profile.weightKg || 62}kg</span>
          </div>

          <!-- Total Calories Bar -->
          <div style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 3px;">
              <span style="font-weight: 600;">Total Energy</span>
              <span style="color: var(--nutrel-text-muted);"><strong>${loggedCalories}</strong> / ${blueprint.targetCalories} kcal (${calPct}%)</span>
            </div>
            <div class="progress-track" style="height: 8px;">
              <div class="progress-fill" style="width: ${Math.min(calPct, 100)}%; background: var(--nutrel-sage-dark);"></div>
            </div>
          </div>

          <!-- Protein Bar -->
          <div style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 3px;">
              <span style="font-weight: 600;">Protein</span>
              <span style="color: var(--nutrel-text-muted);"><strong>${loggedProtein}g</strong> / ${blueprint.macros.protein.target}g (${protPct}%)</span>
            </div>
            <div class="progress-track" style="height: 8px;">
              <div class="progress-fill" style="width: ${Math.min(protPct, 100)}%; background: #4E868F;"></div>
            </div>
          </div>

          <!-- Carbohydrates Bar -->
          <div style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 3px;">
              <span style="font-weight: 600;">Carbohydrates</span>
              <span style="color: var(--nutrel-text-muted);"><strong>${loggedCarbs}g</strong> / ${blueprint.macros.carbs.target}g (${carbPct}%)</span>
            </div>
            <div class="progress-track" style="height: 8px;">
              <div class="progress-fill" style="width: ${Math.min(carbPct, 100)}%; background: #C9963D;"></div>
            </div>
          </div>

          <!-- Healthy Fats Bar -->
          <div style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 3px;">
              <span style="font-weight: 600;">Healthy Fats</span>
              <span style="color: var(--nutrel-text-muted);"><strong>${loggedFats}g</strong> / ${blueprint.macros.fats.target}g (${fatPct}%)</span>
            </div>
            <div class="progress-track" style="height: 8px;">
              <div class="progress-fill" style="width: ${Math.min(fatPct, 100)}%; background: #8C6A5A;"></div>
            </div>
          </div>

          <!-- Dietary Fibre Bar -->
          <div style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 3px;">
              <span style="font-weight: 600;">Dietary Fibre</span>
              <span style="color: var(--nutrel-text-muted);"><strong>${loggedFibre}g</strong> / ${blueprint.macros.fibre.target}g (${fibrePct}%)</span>
            </div>
            <div class="progress-track" style="height: 8px;">
              <div class="progress-fill" style="width: ${Math.min(fibrePct, 100)}%; background: #5F7759;"></div>
            </div>
          </div>

          <!-- Daily Fluid Target -->
          <div style="display: flex; align-items: center; justify-content: space-between; background: var(--nutrel-beige-light); padding: 10px 12px; border-radius: var(--radius-sm); margin-top: 10px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.3rem;">💧</span>
              <div>
                <strong style="font-size: 0.8rem; display: block;">Daily Hydration Guide</strong>
                <span style="font-size: 0.72rem; color: var(--nutrel-text-muted);">Baseline fluid requirement for your weight</span>
              </div>
            </div>
            <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: var(--nutrel-teal);">
              ${blueprint.macros.water.target} L / day
            </span>
          </div>
        </div>

        <!-- Essential Micronutrients Targets Grid -->
        <div class="section-heading-row">
          <h3 class="section-title">Micronutrient Targets (ICMR-NIN)</h3>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
          <!-- Iron -->
          <div class="nutrel-card" style="padding: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-weight: 700; font-size: 0.82rem;">Iron (Fe)</span>
              <span style="font-size: 0.7rem; color: var(--nutrel-text-muted);">${loggedIron} / ${blueprint.micros.iron.target}mg</span>
            </div>
            <div class="progress-track" style="height: 6px;">
              <div class="progress-fill" style="width: ${Math.min(Math.round((loggedIron / blueprint.micros.iron.target) * 100), 100)}%; background: #BA5D48;"></div>
            </div>
            <span style="font-size: 0.66rem; color: var(--nutrel-text-muted); display: block; margin-top: 4px;">Oxygen transport & ATP</span>
          </div>

          <!-- Calcium -->
          <div class="nutrel-card" style="padding: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-weight: 700; font-size: 0.82rem;">Calcium (Ca)</span>
              <span style="font-size: 0.7rem; color: var(--nutrel-text-muted);">${loggedCalcium} / ${blueprint.micros.calcium.target}mg</span>
            </div>
            <div class="progress-track" style="height: 6px;">
              <div class="progress-fill" style="width: ${Math.min(Math.round((loggedCalcium / blueprint.micros.calcium.target) * 100), 100)}%; background: #5F7759;"></div>
            </div>
            <span style="font-size: 0.66rem; color: var(--nutrel-text-muted); display: block; margin-top: 4px;">Bone matrix & troponin signaling</span>
          </div>

          <!-- Magnesium -->
          <div class="nutrel-card" style="padding: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-weight: 700; font-size: 0.82rem;">Magnesium (Mg)</span>
              <span style="font-size: 0.7rem; color: var(--nutrel-text-muted);">${loggedMagnesium} / ${blueprint.micros.magnesium.target}mg</span>
            </div>
            <div class="progress-track" style="height: 6px;">
              <div class="progress-fill" style="width: ${Math.min(Math.round((loggedMagnesium / blueprint.micros.magnesium.target) * 100), 100)}%; background: #C9963D;"></div>
            </div>
            <span style="font-size: 0.66rem; color: var(--nutrel-text-muted); display: block; margin-top: 4px;">300+ enzymes & relaxation</span>
          </div>

          <!-- Vitamin C -->
          <div class="nutrel-card" style="padding: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-weight: 700; font-size: 0.82rem;">Vitamin C</span>
              <span style="font-size: 0.7rem; color: var(--nutrel-text-muted);">${loggedVitC} / ${blueprint.micros.vitamin_c.target}mg</span>
            </div>
            <div class="progress-track" style="height: 6px;">
              <div class="progress-fill" style="width: ${Math.min(Math.round((loggedVitC / blueprint.micros.vitamin_c.target) * 100), 100)}%; background: #4E868F;"></div>
            </div>
            <span style="font-size: 0.66rem; color: var(--nutrel-text-muted); display: block; margin-top: 4px;">Collagen & iron reduction</span>
          </div>
        </div>

        <!-- AI Grounded Explanations & Suggestions Card -->
        <div class="nutrel-card" style="background: #FFFFFF; border: 1px solid var(--nutrel-sage); margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-size: 1.2rem;">✨</span>
            <h4 style="font-family: var(--font-heading); font-size: 0.95rem; color: var(--nutrel-sage-dark);">
              AI Chart Explanation & Practical Tips
            </h4>
          </div>
          <div style="font-size: 0.78rem; line-height: 1.5; color: var(--nutrel-text); white-space: pre-line;">
            ${aiExplanation}
          </div>
        </div>

        <!-- Reliability & Medical Boundary Note -->
        <div class="disclaimer-banner">
          Calculations use deterministic formulas (Mifflin-St Jeor & ICMR-NIN 2020 RDA). AI explains results and suggests wholesome culinary habits; it does not fabricate values or replace clinical consultations.
        </div>
      </div>
    `;

    // Handlers
    const backBtn = container.querySelector('#btn-chart-back');
    if (backBtn) backBtn.addEventListener('click', onBackToHome);

    const form = container.querySelector('#chart-inputs-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const updated = {
          weightKg: parseFloat(container.querySelector('#chart-input-weight').value) || 62,
          heightCm: parseFloat(container.querySelector('#chart-input-height').value) || 165,
          activity: container.querySelector('#chart-input-activity').value,
          sex: container.querySelector('#chart-input-sex').value,
          wellnessGoal: container.querySelector('#chart-input-goal').value
        };
        store.updateProfile(updated);
        profile = { ...store.state.profile, ...updated };
        render();
      });
    }
  }

  render();
}
