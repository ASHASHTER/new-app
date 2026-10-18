/**
 * Nutrel - Sugar Free Life & Activity Compensator View
 * Accessible from Home dashboard.
 * Explains carbohydrate digestion into glucose, energy storage as glycogen,
 * provides gentle non-punitive next steps, and estimates activity duration
 * using body weight and MET standards without claiming to cancel meals.
 */

import { store } from '../state/store.js';

export function renderCompensatorView(container, onBackToHome) {
  const summary = store.getTodaySummary();
  const todayLogs = store.getTodayLogs();
  const profile = store.state.profile;

  // State for interactive activity duration estimator
  let selectedActivity = 'walk_moderate'; // 'walk_stroll', 'walk_moderate', 'cycling_easy', 'jogging_light', 'yoga'
  let userWeight = profile.weightKg || 62;

  const activities = {
    walk_stroll: { name: 'Gentle Post-Meal Stroll', met: 2.8, icon: '🚶', desc: 'Ideal within 30-45 mins of eating to stimulate non-insulin glucose uptake.' },
    walk_moderate: { name: 'Brisk Walk', met: 4.0, icon: '🚶‍♀️', desc: 'Moderate aerobic movement that stimulates circulation and cardiovascular vitality.' },
    cycling_easy: { name: 'Casual Cycling', met: 5.5, icon: '🚴', desc: 'Smooth, low-impact exercise utilizing muscle glycogen reserves.' },
    jogging_light: { name: 'Easy Jogging', met: 7.0, icon: '🏃', desc: 'Higher intensity aerobic cardio for sustained endurance.' },
    yoga: { name: 'Gentle Yoga & Mobility', met: 2.5, icon: '🧘', desc: 'Parasympathetic nervous activation reducing cortisol-mediated glucose surges.' }
  };

  function calculateActivityEstimates() {
    const act = activities[selectedActivity];
    // Energy expenditure formula: kcal/min = (MET * 3.5 * weightKg) / 200
    const kcalPerMin = (act.met * 3.5 * userWeight) / 200;

    // Logged carbohydrates to glucose energy: carbs (g) * 4 kcal/g
    const totalCarbs = summary.nutrients.carbs?.totalAmount || 0;
    const carbCalories = Math.round(totalCarbs * 4);

    // Physiological guidance durations (range to prevent false precision)
    // Moderate post-meal glucose moderation aims to utilize ~20-35% of postprandial glucose via active muscle GLUT-4
    const minMins = Math.max(15, Math.round((carbCalories * 0.20) / kcalPerMin));
    const maxMins = Math.max(25, Math.round((carbCalories * 0.35) / kcalPerMin));

    return {
      kcalPerMin: kcalPerMin.toFixed(1),
      minMins,
      maxMins,
      carbCalories,
      totalCarbs
    };
  }

  function render() {
    const estimates = calculateActivityEstimates();
    const carbsAmount = summary.nutrients.carbs?.totalAmount || 0;
    const fibreAmount = summary.nutrients.fibre?.totalAmount || 0;
    const proteinAmount = summary.nutrients.protein?.totalAmount || 0;
    const fatsAmount = summary.nutrients.fats?.totalAmount || 0;

    container.innerHTML = `
      <div class="animate-fade-in" style="padding-bottom: 24px;">
        <!-- Navigation Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
          <button id="btn-compensator-back" class="btn-secondary" style="width: auto; padding: 6px 14px; font-size: 0.78rem; display: flex; align-items: center; gap: 6px;">
            ← Back to Home
          </button>
          <span style="font-size: 0.72rem; color: var(--nutrel-sage-dark); font-weight: 700; background: var(--nutrel-sage-light); padding: 4px 10px; border-radius: var(--radius-full);">
            SUGAR FREE LIFE
          </span>
        </div>

        <!-- Hero Card -->
        <div class="nutrel-card" style="background: linear-gradient(135deg, #FAF7F2 0%, #EBF1EA 100%); border: 1px solid var(--nutrel-border); margin-bottom: 16px;">
          <div style="display: flex; gap: 12px; align-items: flex-start;">
            <span style="font-size: 2rem; line-height: 1;">⚖️</span>
            <div>
              <h2 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--nutrel-text); margin-bottom: 4px;">
                Intake & Activity Compensator
              </h2>
              <p style="font-size: 0.8rem; color: var(--nutrel-text-muted); line-height: 1.45;">
                Understand how your body utilizes digested carbohydrates, support healthy post-meal glucose absorption, and discover evidence-based daily habits without punishment or restriction.
              </p>
            </div>
          </div>
        </div>

        <!-- Logged Intake Snapshot -->
        <div class="nutrel-card" style="margin-bottom: 16px;">
          <div class="card-header-row" style="margin-bottom: 10px;">
            <h3 style="font-family: var(--font-heading); font-size: 0.95rem;">Today's Logged Energy & Nutrients</h3>
            <span style="font-size: 0.72rem; color: var(--nutrel-teal); font-weight: 600;">${todayLogs.length} items logged</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; text-align: center;">
            <div style="background: var(--nutrel-beige-light); padding: 8px; border-radius: var(--radius-sm);">
              <div style="font-size: 0.68rem; color: var(--nutrel-text-muted);">Total Energy</div>
              <div style="font-weight: 700; font-size: 1.05rem; color: var(--nutrel-text);">${summary.totalCalories}</div>
              <div style="font-size: 0.62rem; color: var(--nutrel-text-muted);">kcal</div>
            </div>

            <div style="background: var(--nutrel-beige-light); padding: 8px; border-radius: var(--radius-sm);">
              <div style="font-size: 0.68rem; color: var(--nutrel-text-muted);">Carbohydrates</div>
              <div style="font-weight: 700; font-size: 1.05rem; color: var(--nutrel-sage-dark);">${carbsAmount}</div>
              <div style="font-size: 0.62rem; color: var(--nutrel-text-muted);">grams</div>
            </div>

            <div style="background: var(--nutrel-beige-light); padding: 8px; border-radius: var(--radius-sm);">
              <div style="font-size: 0.68rem; color: var(--nutrel-text-muted);">Dietary Fibre</div>
              <div style="font-weight: 700; font-size: 1.05rem; color: var(--nutrel-teal);">${fibreAmount}</div>
              <div style="font-size: 0.62rem; color: var(--nutrel-text-muted);">grams</div>
            </div>

            <div style="background: var(--nutrel-beige-light); padding: 8px; border-radius: var(--radius-sm);">
              <div style="font-size: 0.68rem; color: var(--nutrel-text-muted);">Protein</div>
              <div style="font-weight: 700; font-size: 1.05rem; color: var(--nutrel-text);">${proteinAmount}</div>
              <div style="font-size: 0.62rem; color: var(--nutrel-text-muted);">grams</div>
            </div>
          </div>

          <!-- Biological Explanation of Logged Intake -->
          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--nutrel-border-light); font-size: 0.78rem; line-height: 1.5; color: var(--nutrel-text);">
            <strong style="color: var(--nutrel-sage-dark); display: block; margin-bottom: 4px;">🧬 What This Means Biologically:</strong>
            When you eat, carbohydrates from rotis, rice, dal, and fruit are broken down by amylase enzymes into simple sugars—primarily <strong>glucose</strong>. Glucose enters your bloodstream to fuel brain cognition, red blood cells, and muscle tissue. Excess circulating glucose is synthesized into <strong>glycogen</strong> stored in skeletal muscle (~400g) and liver (~100g).
          </div>
        </div>

        <!-- Evidence-Based Nutrition Principles Notice (Section 1 Requirements) -->
        <div style="background: #FFFDF9; border-left: 4px solid var(--nutrel-sage); border-radius: 4px; padding: 12px 14px; margin-bottom: 16px; font-size: 0.76rem; line-height: 1.5; color: var(--nutrel-text);">
          <strong style="color: var(--nutrel-sage-dark);">Important Physiological Principle:</strong>
          <ul style="margin: 6px 0 0 16px; padding: 0;">
            <li style="margin-bottom: 4px;"><strong>No mathematical meal cancellation:</strong> Exercise uses energy and draws on circulating glucose and muscle glycogen, but <em>it cannot precisely cancel out a meal</em>. Metabolism is an interconnected biological network, not a strict calculator.</li>
            <li style="margin-bottom: 4px;"><strong>Fibre is not to be burned off:</strong> Dietary fibre is a non-digestible prebiotic that naturally blunts glucose spikes and feeds your microbiome. It is never a burden or something to eliminate.</li>
            <li><strong>Movement is vitality, not punishment:</strong> Being active supports insulin sensitivity, lymphatic flow, and cardiovascular health—never use it as penance for eating.</li>
          </ul>
        </div>

        <!-- Interactive Activity Duration Estimator -->
        <div class="nutrel-card" style="margin-bottom: 16px;">
          <h3 style="font-family: var(--font-heading); font-size: 0.95rem; margin-bottom: 4px;">
            Estimated Movement Duration Guide
          </h3>
          <p style="font-size: 0.76rem; color: var(--nutrel-text-muted); margin-bottom: 12px;">
            Calculate gentle movement durations based on your body weight and metabolic equivalents (METs) to support glucose uptake into muscles.
          </p>

          <!-- Body Weight Selector -->
          <div style="display: flex; justify-content: space-between; align-items: center; background: var(--nutrel-beige-light); padding: 8px 12px; border-radius: var(--radius-sm); margin-bottom: 12px;">
            <span style="font-size: 0.78rem; font-weight: 600;">Assumed Body Weight:</span>
            <div style="display: flex; align-items: center; gap: 6px;">
              <input type="number" id="comp-weight-input" value="${userWeight}" min="35" max="200" step="1" style="width: 65px; padding: 4px 6px; font-size: 0.82rem; border: 1px solid var(--nutrel-border); border-radius: 4px; text-align: center;" />
              <span style="font-size: 0.78rem; font-weight: 600;">kg</span>
            </div>
          </div>

          <!-- Activity Selection Chips -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px;">
            ${Object.entries(activities).map(([key, act]) => `
              <button class="activity-pick-btn ${selectedActivity === key ? 'active' : ''}" data-act-key="${key}" style="text-align: left; padding: 10px; border-radius: var(--radius-sm); border: 1px solid ${selectedActivity === key ? 'var(--nutrel-sage)' : 'var(--nutrel-border-light)'}; background: ${selectedActivity === key ? 'var(--nutrel-sage-light)' : 'var(--nutrel-white)'}; cursor: pointer; transition: all 0.2s;">
                <div style="font-size: 1.2rem; margin-bottom: 2px;">${act.icon}</div>
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--nutrel-text);">${act.name}</div>
                <div style="font-size: 0.68rem; color: var(--nutrel-text-muted);">${act.met} METs</div>
              </button>
            `).join('')}
          </div>

          <!-- Duration Result Display -->
          <div style="background: var(--nutrel-beige-light); border: 1px dashed var(--nutrel-sage); border-radius: var(--radius-sm); padding: 12px; text-align: center;">
            <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--nutrel-sage-dark); font-weight: 700;">
              Suggested Active Window for ${activities[selectedActivity].name}
            </span>
            <div style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--nutrel-text); margin: 4px 0;">
              ~${estimates.minMins} – ${estimates.maxMins} minutes
            </div>
            <p style="font-size: 0.74rem; color: var(--nutrel-text-muted); line-height: 1.4;">
              ${activities[selectedActivity].desc} (Estimated rate: ~${estimates.kcalPerMin} kcal/min at ${userWeight}kg)
            </p>
          </div>

          <!-- Uncertainty & Non-Precision Label -->
          <div style="font-size: 0.68rem; color: var(--nutrel-text-muted); margin-top: 8px; font-style: italic;">
            ⚠️ <strong>Estimated physiological range:</strong> Based on Compendium of Physical Activities METs and body weight. Individual muscle mass, baseline fitness, and gastric digestion rates vary. Not an exact cancellation of food.
          </div>
        </div>

        <!-- 5 Practical, Wholesome Next Steps -->
        <div class="section-heading-row">
          <h3 class="section-title">Wholesome Next Steps</h3>
          <span style="font-size: 0.72rem; color: var(--nutrel-sage-dark); font-weight: 600;">Evidence-based habits</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <!-- Habit 1: Post-meal walking -->
          <div class="nutrel-card" style="padding: 12px; border-left: 4px solid var(--nutrel-sage);">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <span style="font-size: 1.4rem;">🚶</span>
              <div>
                <strong style="font-size: 0.85rem; display: block; color: var(--nutrel-text);">1. 15–20 Minute Gentle Walk</strong>
                <p style="font-size: 0.76rem; color: var(--nutrel-text-muted); margin-top: 2px;">
                  Contracting leg muscles triggers non-insulin GLUT-4 transporters, drawing circulating glucose directly into muscle cells and attenuating blood glucose spikes.
                </p>
              </div>
            </div>
          </div>

          <!-- Habit 2: Hydration -->
          <div class="nutrel-card" style="padding: 12px; border-left: 4px solid var(--nutrel-teal);">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <span style="font-size: 1.4rem;">💧</span>
              <div>
                <strong style="font-size: 0.85rem; display: block; color: var(--nutrel-text);">2. Hydrate with Water or Buttermilk</strong>
                <p style="font-size: 0.76rem; color: var(--nutrel-text-muted); margin-top: 2px;">
                  Drink 1–2 glasses of water or a glass of salted chaas with jeera. Adequate fluid helps renal clearance, balances cellular osmolarity, and assists smooth digestive motility.
                </p>
              </div>
            </div>
          </div>

          <!-- Habit 3: Balanced Next Meal -->
          <div class="nutrel-card" style="padding: 12px; border-left: 4px solid var(--nutrel-accent-gold);">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <span style="font-size: 1.4rem;">🥗</span>
              <div>
                <strong style="font-size: 0.85rem; display: block; color: var(--nutrel-text);">3. Anchor the Next Meal with Fibre & Protein</strong>
                <p style="font-size: 0.76rem; color: var(--nutrel-text-muted); margin-top: 2px;">
                  Plan your next meal around leafy sabzis (methi, palak), cucumber salad, and lentils or paneer. Soluble fibre slows upcoming gastric emptying and restores balanced satiety.
                </p>
              </div>
            </div>
          </div>

          <!-- Habit 4: Cycling / Moderate Cardio -->
          <div class="nutrel-card" style="padding: 12px; border-left: 4px solid var(--nutrel-sage-dark);">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <span style="font-size: 1.4rem;">🚴</span>
              <div>
                <strong style="font-size: 0.85rem; display: block; color: var(--nutrel-text);">4. Easy Cycling or Light Movement</strong>
                <p style="font-size: 0.76rem; color: var(--nutrel-text-muted); margin-top: 2px;">
                  A leisurely 25-minute bicycle ride or household chores provide continuous low-intensity muscular work that steadily oxidizes available glycogen.
                </p>
              </div>
            </div>
          </div>

          <!-- Habit 5: Sleep & Relaxation -->
          <div class="nutrel-card" style="padding: 12px; border-left: 4px solid #7D9B76;">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <span style="font-size: 1.4rem;">🧘</span>
              <div>
                <strong style="font-size: 0.85rem; display: block; color: var(--nutrel-text);">5. Rest, Breathe & Prioritize Sleep</strong>
                <p style="font-size: 0.76rem; color: var(--nutrel-text-muted); margin-top: 2px;">
                  Avoid guilt. Chronic stress increases cortisol, which triggers hepatic gluconeogenesis and elevates resting blood glucose. Relaxing and getting 7–8 hours of quality sleep optimizes insulin sensitivity for tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Handlers
    const backBtn = container.querySelector('#btn-compensator-back');
    if (backBtn) {
      backBtn.addEventListener('click', onBackToHome);
    }

    container.querySelectorAll('.activity-pick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedActivity = btn.getAttribute('data-act-key');
        render();
      });
    });

    const weightInput = container.querySelector('#comp-weight-input');
    if (weightInput) {
      weightInput.addEventListener('change', (e) => {
        const val = parseFloat(e.target.value);
        if (val && val >= 30 && val <= 250) {
          userWeight = val;
          store.updateProfile({ weightKg: val });
          render();
        }
      });
    }
  }

  render();
}
