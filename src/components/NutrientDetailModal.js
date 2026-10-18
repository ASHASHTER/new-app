/**
 * Nutrel - Nutrient Detail Inspection Drawer
 * PRD FR-033 (Inspect contributing foods) & FR-011/FR-014 (Function & Sourced Targets)
 */

import { NUTRIENTS, getReferenceTarget } from '../data/nutrients.js';
import { store } from '../state/store.js';

export function renderNutrientDetailModal(modalContainer, nutrientCode, onClose) {
  const nutrient = NUTRIENTS[nutrientCode];
  if (!nutrient) {
    onClose();
    return;
  }

  const summary = store.getTodaySummary();
  const nutSummary = summary.nutrients[nutrientCode];
  const targetInfo = getReferenceTarget(nutrientCode, store.state.profile);

  modalContainer.innerHTML = `
    <div class="modal-drawer animate-fade-in">
      <div class="drawer-drag-pill"></div>

      <div class="drawer-header">
        <div>
          <span style="font-size: 0.72rem; font-weight: 700; color: var(--nutrel-sage-dark); text-transform: uppercase;">
            ${nutrient.analogy}
          </span>
          <h3 class="drawer-title">${nutrient.name} Breakdown</h3>
        </div>
        <button class="drawer-close-btn" id="nutrient-drawer-close">✕</button>
      </div>

      <!-- Current Intake vs Target Box -->
      <div style="background: var(--nutrel-beige-light); border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px; border: 1px solid var(--nutrel-border);">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <span style="font-size: 0.75rem; color: var(--nutrel-text-muted);">TODAY'S LOGGED INTAKE</span>
            <div style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 700; color: var(--nutrel-sage-dark);">
              ${nutSummary.totalAmount} <span style="font-size: 1rem; font-weight: 500;">${nutrient.canonical_unit}</span>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.75rem; color: var(--nutrel-text-muted);">REFERENCE TARGET</span>
            <div style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 600; color: var(--nutrel-text);">
              ${targetInfo.target} ${targetInfo.unit}
            </div>
            <span style="font-size: 0.65rem; color: var(--nutrel-text-muted);">${targetInfo.type}</span>
          </div>
        </div>

        <div class="progress-track" style="margin-top: 10px; height: 8px;">
          <div class="progress-fill" style="width: ${Math.min(nutSummary.percentageOfTarget, 100)}%;"></div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--nutrel-text-muted); margin-top: 6px;">
          <span>${nutSummary.percentageOfTarget}% of daily recommendation</span>
          <span>${nutSummary.coverageLabel}</span>
        </div>
      </div>

      <!-- Contributing Foods List (PRD FR-033) -->
      <div style="margin-bottom: 16px;">
        <h4 style="font-family: var(--font-heading); font-size: 0.95rem; margin-bottom: 8px;">
          Contributing Foods Logged Today (${nutSummary.contributingFoods.length})
        </h4>

        ${nutSummary.contributingFoods.length === 0 ? `
          <div style="font-size: 0.8rem; color: var(--nutrel-text-muted); padding: 10px 0;">
            No foods containing verified ${nutrient.name} logged yet today.
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${nutSummary.contributingFoods.map(item => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--nutrel-beige-light); border-radius: var(--radius-sm); border: 1px solid var(--nutrel-border-light);">
                <div>
                  <div style="font-weight: 600; font-size: 0.82rem;">${item.foodName}</div>
                  <div style="font-size: 0.7rem; color: var(--nutrel-text-muted);">${item.portionName}</div>
                </div>
                <div style="font-weight: 700; font-size: 0.88rem; color: var(--nutrel-sage-dark);">
                  +${item.amount} ${item.unit}
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <!-- Why It Matters & Role in Body (PRD FR-011) -->
      <div class="nutrel-card" style="margin-bottom: 12px; padding: 12px 14px;">
        <strong style="font-size: 0.82rem; color: var(--nutrel-text); display: block; margin-bottom: 4px;">
          What It Does in Your Body
        </strong>
        <p style="font-size: 0.78rem; color: var(--nutrel-text-muted); margin-bottom: 8px;">
          ${nutrient.why_it_matters}
        </p>

        <strong style="font-size: 0.82rem; color: var(--nutrel-teal); display: block; margin-bottom: 4px;">
          Absorption & Food Pairing Secret
        </strong>
        <p style="font-size: 0.78rem; color: var(--nutrel-text-muted);">
          ${nutrient.absorption_tip}
        </p>
      </div>

      <!-- Authoritative Standard Provenance (PRD FR-014) -->
      <div style="font-size: 0.68rem; color: var(--nutrel-text-muted); text-align: center; padding: 8px;">
        Target based on: <strong>${targetInfo.standard}</strong> (${targetInfo.version}).
        Intake estimates are not a diagnosis of deficiency or clinical absorption.
      </div>
    </div>
  `;

  modalContainer.querySelector('#nutrient-drawer-close').addEventListener('click', onClose);
}
