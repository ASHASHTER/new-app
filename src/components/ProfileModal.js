/**
 * Nutrel - Profile & Dietary Settings Modal
 * PRD 7.1 (Onboarding & Profile: FR-001 to FR-006)
 * Explains rationale for each sensitive field and updates deterministic ICMR target standards.
 */

import { store } from '../state/store.js';

export function renderProfileModal(modalContainer, onClose) {
  const profile = store.state.profile;

  modalContainer.innerHTML = `
    <div class="modal-drawer animate-fade-in">
      <div class="drawer-drag-pill"></div>

      <div class="drawer-header">
        <div>
          <h3 class="drawer-title">Profile & Nutrition Goals</h3>
          <span style="font-size: 0.72rem; color: var(--nutrel-text-muted);">Calibrated to ICMR-NIN 2020 Guidelines</span>
        </div>
        <button class="drawer-close-btn" id="profile-close-x">✕</button>
      </div>

      <!-- Privacy & Medical Notice (PRD FR-005, FR-006) -->
      <div style="background: var(--nutrel-beige-light); border-radius: var(--radius-sm); padding: 10px 12px; margin-bottom: 14px; font-size: 0.73rem; color: var(--nutrel-text-muted); border: 1px solid var(--nutrel-border-light);">
        🔒 <strong>Data Minimization Notice:</strong> We only ask for age band, sex, and activity level because ICMR dietary standards use these to calculate healthy reference targets. Your profile is private.
      </div>

      <form id="profile-edit-form">
        <div class="form-group">
          <label class="form-label">Display Name</label>
          <input type="text" class="form-input" id="prof-name" value="${profile.displayName}" required />
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div class="form-group">
            <label class="form-label">Age Band</label>
            <select class="form-select" id="prof-age">
              <option value="18-25" ${profile.ageBand === '18-25' ? 'selected' : ''}>18 – 25 yrs</option>
              <option value="26-35" ${profile.ageBand === '26-35' ? 'selected' : ''}>26 – 35 yrs</option>
              <option value="36-50" ${profile.ageBand === '36-50' ? 'selected' : ''}>36 – 50 yrs</option>
              <option value="51+" ${profile.ageBand === '51+' ? 'selected' : ''}>51+ yrs</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Biological Sex</label>
            <select class="form-select" id="prof-sex">
              <option value="female" ${profile.sex === 'female' ? 'selected' : ''}>Female (ICMR)</option>
              <option value="male" ${profile.sex === 'male' ? 'selected' : ''}>Male (ICMR)</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Physical Activity Level</label>
          <select class="form-select" id="prof-activity">
            <option value="sedentary" ${profile.activity === 'sedentary' ? 'selected' : ''}>Sedentary (Desk work, light walking)</option>
            <option value="moderate" ${profile.activity === 'moderate' ? 'selected' : ''}>Moderate (Active chores, daily exercise)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Dietary Preference</label>
          <select class="form-select" id="prof-diet">
            <option value="Vegetarian" ${profile.diet === 'Vegetarian' ? 'selected' : ''}>Vegetarian (Lacto-Vegetarian)</option>
            <option value="Vegan" ${profile.diet === 'Vegan' ? 'selected' : ''}>Vegan (100% Plant-Based)</option>
            <option value="Eggetarian" ${profile.diet === 'Eggetarian' ? 'selected' : ''}>Eggetarian (Vegetarian + Eggs)</option>
            <option value="Non-Vegetarian" ${profile.diet === 'Non-Vegetarian' ? 'selected' : ''}>Non-Vegetarian</option>
            <option value="Jain" ${profile.diet === 'Jain' ? 'selected' : ''}>Jain (No root vegetables)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Broad Wellness Goal</label>
          <select class="form-select" id="prof-goal">
            <option value="Boost energy and improve digestion" ${profile.wellnessGoal.includes('energy') ? 'selected' : ''}>
              Boost daily energy & gut digestion
            </option>
            <option value="Build consistent wholesome eating habits" ${profile.wellnessGoal.includes('habits') ? 'selected' : ''}>
              Build consistent wholesome eating habits
            </option>
            <option value="Learn nutrition science through games" ${profile.wellnessGoal.includes('science') ? 'selected' : ''}>
              Learn nutrition science through games
            </option>
            <option value="Ensure balanced plant protein & iron" ${profile.wellnessGoal.includes('protein') ? 'selected' : ''}>
              Ensure balanced plant protein & iron
            </option>
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div class="form-group">
            <label class="form-label">Body Weight (kg)</label>
            <input type="number" class="form-input" id="prof-weight" value="${profile.weightKg || 62}" min="30" max="250" step="0.5" required />
          </div>

          <div class="form-group">
            <label class="form-label">Height (cm)</label>
            <input type="number" class="form-input" id="prof-height" value="${profile.heightCm || 165}" min="100" max="230" step="1" required />
          </div>
        </div>

        <button type="submit" class="btn-primary" style="margin-top: 8px;">
          ✓ Save Profile & Recalculate Targets
        </button>
      </form>
    </div>
  `;

  modalContainer.querySelector('#profile-close-x').addEventListener('click', onClose);

  const form = modalContainer.querySelector('#profile-edit-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    store.updateProfile({
      displayName: modalContainer.querySelector('#prof-name').value.trim() || 'User',
      ageBand: modalContainer.querySelector('#prof-age').value,
      sex: modalContainer.querySelector('#prof-sex').value,
      activity: modalContainer.querySelector('#prof-activity').value,
      diet: modalContainer.querySelector('#prof-diet').value,
      wellnessGoal: modalContainer.querySelector('#prof-goal').value,
      weightKg: parseFloat(modalContainer.querySelector('#prof-weight').value) || 62,
      heightCm: parseFloat(modalContainer.querySelector('#prof-height').value) || 165
    });
    onClose();
  });
}
