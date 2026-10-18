/**
 * Nutrel - Home Dashboard View
 * PRD Section 6 (Home: daily overview, meals, nutrient progress, practical insight)
 * & PRD 7.4 (Calculation & Dashboard)
 */

import { store } from '../state/store.js';

export function renderHomeView(container, onOpenNutrientDetail, onOpenLogModal, onNavigateToCompensator, onNavigateToMakeChart) {
  const summary = store.getTodaySummary();
  const todayLogs = store.getTodayLogs();
  const profile = store.state.profile;

  // Practical daily insight logic based on current logging
  let dailyInsight = {
    icon: '💡',
    text: 'Welcome to Nutrel! Log your meals to see how wholesome Indian foods like dal, roti, and curd naturally balance your vitamins and minerals.'
  };

  if (summary.nutrients.iron?.totalAmount < 10 && todayLogs.length > 0) {
    dailyInsight = {
      icon: '🍋',
      text: 'Pairing Tip: Squeeze fresh lemon over your dal or sabzi today! Ascorbic acid (Vitamin C) triples your body’s absorption of plant-based iron.'
    };
  } else if (summary.nutrients.fibre?.totalAmount < 15 && todayLogs.length > 0) {
    dailyInsight = {
      icon: '🌾',
      text: 'Fibre Tip: Try swapping polished white rice for whole wheat roti or millets (ragi, jowar) to support sustained afternoon energy.'
    };
  } else if (todayLogs.length >= 3) {
    dailyInsight = {
      icon: '🌟',
      text: 'Great meal variety today! You are providing your body with diverse micronutrients from pulses, whole grains, and fresh ingredients.'
    };
  }

  // Count nutrients meeting reference targets
  const targetCompletedCount = Object.values(summary.nutrients).filter(n => n.percentageOfTarget >= 100).length;

  container.innerHTML = `
    <!-- Daily Hero Banner -->
    <div class="daily-hero-banner animate-fade-in">
      <div class="card-header-row" style="margin-bottom: 4px;">
        <div>
          <span style="font-size: 0.78rem; font-weight: 600; color: var(--nutrel-sage-dark);">TODAY'S NOURISHMENT</span>
          <h2 style="font-family: var(--font-heading); font-size: 1.35rem; color: var(--nutrel-text);">Namaste, ${profile.displayName} 👋</h2>
        </div>
        <span style="font-size: 0.75rem; background: var(--nutrel-sage-light); color: var(--nutrel-sage-dark); padding: 4px 10px; border-radius: var(--radius-full); font-weight: 600;">
          ${profile.diet}
        </span>
      </div>

      <div class="daily-stats-row">
        <div class="stat-box">
          <div class="stat-value">${summary.totalCalories}</div>
          <div class="stat-label">Estimated Kcal</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${todayLogs.length}</div>
          <div class="stat-label">Items Logged</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${targetCompletedCount}/8</div>
          <div class="stat-label">Targets Met</div>
        </div>
      </div>
    </div>

    <!-- Practical Daily Insight -->
    <div class="daily-insight-box animate-fade-in">
      <div class="insight-icon">${dailyInsight.icon}</div>
      <div>
        <strong style="display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 2px;">Grounded Nutrition Insight</strong>
        ${dailyInsight.text}
      </div>
    </div>

    <!-- Quick Access: Compensator & Make Your Chart (PRD Section 1) -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
      <div class="nutrel-card home-feature-card" id="home-card-compensator" style="cursor: pointer; padding: 12px; background: linear-gradient(135deg, #FAF7F2 0%, #EBF1EA 100%); border: 1px solid var(--nutrel-sage); transition: transform 0.2s, box-shadow 0.2s;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <span style="font-size: 1.4rem;">⚖️</span>
          <span style="font-size: 0.65rem; background: var(--nutrel-sage-light); color: var(--nutrel-sage-dark); font-weight: 700; padding: 2px 6px; border-radius: var(--radius-full);">SUGAR FREE LIFE</span>
        </div>
        <h4 style="font-family: var(--font-heading); font-size: 0.88rem; margin-bottom: 2px; color: var(--nutrel-text);">Compensator</h4>
        <p style="font-size: 0.72rem; color: var(--nutrel-text-muted); line-height: 1.35; margin-bottom: 8px;">
          Balance post-meal glucose & estimate gentle activity duration.
        </p>
        <span style="font-size: 0.72rem; font-weight: 700; color: var(--nutrel-sage-dark);">
          Open Compensator →
        </span>
      </div>

      <div class="nutrel-card home-feature-card" id="home-card-make-chart" style="cursor: pointer; padding: 12px; background: linear-gradient(135deg, #FAF7F2 0%, #E6F1F3 100%); border: 1px solid var(--nutrel-teal); transition: transform 0.2s, box-shadow 0.2s;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <span style="font-size: 1.4rem;">📊</span>
          <span style="font-size: 0.65rem; background: var(--nutrel-teal-light); color: var(--nutrel-teal); font-weight: 700; padding: 2px 6px; border-radius: var(--radius-full);">ICMR BLUEPRINT</span>
        </div>
        <h4 style="font-family: var(--font-heading); font-size: 0.88rem; margin-bottom: 2px; color: var(--nutrel-text);">Make Your Chart</h4>
        <p style="font-size: 0.72rem; color: var(--nutrel-text-muted); line-height: 1.35; margin-bottom: 8px;">
          Personalise your daily nutrition chart, targets & AI insights.
        </p>
        <span style="font-size: 0.72rem; font-weight: 700; color: var(--nutrel-teal);">
          View My Chart →
        </span>
      </div>
    </div>

    <!-- Key Nutrients Section -->
    <div class="section-heading-row">
      <h3 class="section-title">Essential Nutrients</h3>
      <span style="font-size: 0.75rem; color: var(--nutrel-teal); font-weight: 600;">Tap card to inspect sources</span>
    </div>

    <div class="nutrient-grid">
      ${Object.values(summary.nutrients).map(nut => {
        const percent = Math.min(nut.percentageOfTarget, 100);
        const coverageClass = nut.coverageStatus === 'complete' ? 'coverage-complete' : (nut.coverageStatus === 'partial' ? 'coverage-partial' : '');
        const coverageBadge = nut.coverageStatus === 'partial' ? 'Partial data' : (nut.coverageStatus === 'complete' ? 'Verified' : 'Unlogged');

        return `
          <div class="nutrient-pill-card" data-nutrient-code="${nut.code}">
            <div class="nutrient-header-row">
              <div>
                <div class="nutrient-name">${nut.name}</div>
                <div class="nutrient-analogy">${nut.analogy}</div>
              </div>
              <span class="coverage-tag ${coverageClass}">${coverageBadge}</span>
            </div>

            <div class="nutrient-value-display">
              <span class="current-amount">${nut.totalAmount}</span>
              <span class="target-amount">/ ${nut.target}${nut.canonicalUnit}</span>
            </div>

            <div class="progress-track">
              <div class="progress-fill" style="width: ${percent}%;"></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Today's Logged Meals Timeline -->
    <div class="section-heading-row">
      <h3 class="section-title">Today's Meals (${todayLogs.length})</h3>
      <button id="home-add-meal-btn" style="background: transparent; border: none; color: var(--nutrel-sage-dark); font-weight: 700; font-size: 0.8rem; cursor: pointer;">
        + Add Food
      </button>
    </div>

    <div id="meals-timeline-container">
      ${todayLogs.length === 0 ? `
        <div class="nutrel-card" style="text-align: center; padding: 24px 16px;">
          <div style="font-size: 2rem; margin-bottom: 8px;">🍽️</div>
          <h4 style="font-size: 0.95rem; margin-bottom: 4px;">No foods logged yet today</h4>
          <p style="font-size: 0.78rem; color: var(--nutrel-text-muted); margin-bottom: 12px;">
            Log your breakfast, lunch, or a snack to unlock your daily nutrient dashboard.
          </p>
          <button id="empty-state-log-btn" class="btn-primary" style="padding: 10px 20px; width: auto; font-size: 0.85rem;">
            Log Your First Meal
          </button>
        </div>
      ` : todayLogs.map(log => `
        <div class="meal-entry-item animate-fade-in">
          <div class="meal-item-info">
            <span class="meal-item-name">${log.food.name}</span>
            <span class="meal-item-meta">
              <strong>${log.meal_type.toUpperCase()}</strong> • ${log.portionName} • ~${Math.round((log.food.calories * log.quantity_grams) / 100)} kcal
            </span>
          </div>
          <button class="meal-delete-btn" data-log-id="${log.id}" title="Remove entry">
            ✕
          </button>
        </div>
      `).join('')}
    </div>

    <!-- Transparent Uncertainty & Disclaimer Banner (PRD FR-034) -->
    <div class="disclaimer-banner">
      ${summary.disclaimer} Reference targets adhere to <strong>ICMR-NIN 2020 Guidelines for Indian Adults</strong>.
    </div>
  `;

  // Bind interactive handlers
  container.querySelectorAll('.nutrient-pill-card').forEach(card => {
    card.addEventListener('click', () => {
      const code = card.getAttribute('data-nutrient-code');
      if (onOpenNutrientDetail) onOpenNutrientDetail(code);
    });
  });

  const addMealBtn = container.querySelector('#home-add-meal-btn');
  if (addMealBtn) addMealBtn.addEventListener('click', onOpenLogModal);

  const emptyLogBtn = container.querySelector('#empty-state-log-btn');
  if (emptyLogBtn) emptyLogBtn.addEventListener('click', onOpenLogModal);

  const compensatorCard = container.querySelector('#home-card-compensator');
  if (compensatorCard && onNavigateToCompensator) {
    compensatorCard.addEventListener('click', onNavigateToCompensator);
  }

  const makeChartCard = container.querySelector('#home-card-make-chart');
  if (makeChartCard && onNavigateToMakeChart) {
    makeChartCard.addEventListener('click', onNavigateToMakeChart);
  }

  container.querySelectorAll('.meal-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-log-id');
      store.deleteFoodLog(id);
    });
  });
}
