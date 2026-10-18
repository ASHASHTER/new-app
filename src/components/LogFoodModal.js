/**
 * Nutrel - Food Logging Drawer & Modal
 * PRD FR-020 to FR-028 (Food Catalogue & Food Logging)
 * Multi-portion converter (Katori, Roti, Piece, Grams), deterministic preview, provenance.
 */

import { FOODS, searchFoods } from '../data/foods.js';
import { calculateFoodEntryNutrients } from '../engine/calculator.js';
import { store } from '../state/store.js';

export function renderLogFoodModal(modalContainer, onClose) {
  let selectedCategory = 'all';
  let searchQuery = '';
  let selectedFood = FOODS[0]; // default to Toor Dal
  let selectedServing = selectedFood.serving_options[0];
  let servingMultiplier = 1;
  let selectedMealType = 'lunch';

  const categories = [
    { id: 'all', label: 'All Foods' },
    { id: 'Lentils & Pulses', label: 'Dals & Pulses' },
    { id: 'Grains & Breads', label: 'Roti & Rice' },
    { id: 'Dairy & Alternatives', label: 'Paneer & Curd' },
    { id: 'Breakfast Staples', label: 'Breakfast' },
    { id: 'Nuts & Seeds', label: 'Nuts & Seeds' }
  ];

  function calculateActiveGrams() {
    return Math.round(selectedServing.grams * servingMultiplier);
  }

  function render() {
    const filteredFoods = searchFoods(searchQuery, selectedCategory);
    const activeGrams = calculateActiveGrams();
    const preview = calculateFoodEntryNutrients(selectedFood, activeGrams);

    modalContainer.innerHTML = `
      <div class="modal-drawer">
        <div class="drawer-drag-pill"></div>

        <div class="drawer-header">
          <div>
            <h3 class="drawer-title">Log a Wholesome Food</h3>
            <span style="font-size: 0.75rem; color: var(--nutrel-text-muted);">Sourced Indian food composition catalogue</span>
          </div>
          <button class="drawer-close-btn" id="modal-close-x">✕</button>
        </div>

        <!-- Meal Type Selector -->
        <div style="display: flex; gap: 6px; margin-bottom: 12px;">
          ${['breakfast', 'lunch', 'dinner', 'snack'].map(type => `
            <button class="category-chip ${selectedMealType === type ? 'active' : ''}" data-meal-type="${type}" style="flex: 1; text-align: center; text-transform: capitalize;">
              ${type}
            </button>
          `).join('')}
        </div>

        <!-- Search Bar -->
        <div class="search-input-wrapper">
          <span class="search-icon-badge">🔍</span>
          <input
            type="text"
            class="search-input"
            id="food-search-box"
            placeholder="Search dal, roti, paneer, idli, amla..."
            value="${searchQuery}"
          />
        </div>

        <!-- Category Chips -->
        <div class="category-chips-row">
          ${categories.map(cat => `
            <button class="category-chip ${selectedCategory === cat.id ? 'active' : ''}" data-cat-id="${cat.id}">
              ${cat.label}
            </button>
          `).join('')}
        </div>

        <!-- Food List -->
        <div class="food-results-list" style="margin-bottom: 14px;">
          ${filteredFoods.length === 0 ? `
            <div style="text-align: center; padding: 20px; color: var(--nutrel-text-muted); font-size: 0.85rem;">
              No foods found matching "${searchQuery}".
            </div>
          ` : filteredFoods.map(f => {
            const isSel = f.id === selectedFood.id;
            return `
              <div class="food-select-item ${isSel ? 'selected' : ''}" data-food-id="${f.id}">
                <div>
                  <div class="food-select-primary">${f.name}</div>
                  <div class="food-select-secondary">
                    ${f.category} • ~${f.calories} kcal / 100g • ${f.data_source}
                  </div>
                </div>
                <span style="font-size: 1.1rem; color: ${isSel ? 'var(--nutrel-sage-dark)' : 'var(--nutrel-border)'};">
                  ${isSel ? '✓' : '+'}
                </span>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Portion Configurator for Selected Food -->
        <div class="portion-configurator">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <strong style="font-size: 0.9rem; color: var(--nutrel-text);">Selected: ${selectedFood.name}</strong>
            <span style="font-size: 0.72rem; color: var(--nutrel-teal); font-weight: 600;">${selectedFood.data_source}</span>
          </div>

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 8px; margin-bottom: 12px;">
            <div>
              <label class="form-label">Serving Unit</label>
              <select class="form-select" id="serving-option-select">
                ${selectedFood.serving_options.map(opt => `
                  <option value="${opt.id}" ${opt.id === selectedServing.id ? 'selected' : ''}>
                    ${opt.name} (${opt.grams}g)
                  </option>
                `).join('')}
              </select>
            </div>
            <div>
              <label class="form-label">Quantity</label>
              <input
                type="number"
                class="form-input"
                id="portion-qty-input"
                min="0.25"
                max="20"
                step="0.5"
                value="${servingMultiplier}"
              />
            </div>
          </div>

          <!-- Live Nutrient Calculation Preview (TDD Section 6) -->
          <div style="background: var(--nutrel-white); border-radius: var(--radius-sm); padding: 10px; margin-bottom: 12px; border: 1px solid var(--nutrel-border-light);">
            <div style="font-size: 0.72rem; color: var(--nutrel-text-muted); margin-bottom: 4px;">
              CALCULATED FOR <strong>${activeGrams}g</strong> PORTION:
            </div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; text-align: center;">
              <div>
                <span style="font-size: 0.95rem; font-weight: 700; color: var(--nutrel-sage-dark);">${preview.calories}</span>
                <span style="display: block; font-size: 0.65rem; color: var(--nutrel-text-muted);">kcal</span>
              </div>
              <div>
                <span style="font-size: 0.95rem; font-weight: 700; color: var(--nutrel-sage-dark);">${preview.nutrients.protein?.amount ?? '—'}g</span>
                <span style="display: block; font-size: 0.65rem; color: var(--nutrel-text-muted);">Protein</span>
              </div>
              <div>
                <span style="font-size: 0.95rem; font-weight: 700; color: var(--nutrel-sage-dark);">${preview.nutrients.fibre?.amount ?? '—'}g</span>
                <span style="display: block; font-size: 0.65rem; color: var(--nutrel-text-muted);">Fibre</span>
              </div>
              <div>
                <span style="font-size: 0.95rem; font-weight: 700; color: var(--nutrel-sage-dark);">${preview.nutrients.iron?.amount ?? '—'}mg</span>
                <span style="display: block; font-size: 0.65rem; color: var(--nutrel-text-muted);">Iron</span>
              </div>
            </div>
          </div>

          <button id="confirm-log-btn" class="btn-primary">
            ✓ Log ${activeGrams}g to ${selectedMealType.toUpperCase()}
          </button>
        </div>
      </div>
    `;

    // Bind event handlers
    modalContainer.querySelector('#modal-close-x').addEventListener('click', onClose);

    modalContainer.querySelectorAll('[data-meal-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedMealType = btn.getAttribute('data-meal-type');
        render();
      });
    });

    const searchBox = modalContainer.querySelector('#food-search-box');
    searchBox.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
      // Keep search focus at end
      const newBox = modalContainer.querySelector('#food-search-box');
      newBox.focus();
      newBox.setSelectionRange(newBox.value.length, newBox.value.length);
    });

    modalContainer.querySelectorAll('[data-cat-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedCategory = btn.getAttribute('data-cat-id');
        render();
      });
    });

    modalContainer.querySelectorAll('[data-food-id]').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-food-id');
        const f = FOODS.find(x => x.id === id);
        if (f) {
          selectedFood = f;
          selectedServing = f.serving_options[0];
          servingMultiplier = 1;
          render();
        }
      });
    });

    const servingSelect = modalContainer.querySelector('#serving-option-select');
    if (servingSelect) {
      servingSelect.addEventListener('change', (e) => {
        const opt = selectedFood.serving_options.find(s => s.id === e.target.value);
        if (opt) {
          selectedServing = opt;
          render();
        }
      });
    }

    const qtyInput = modalContainer.querySelector('#portion-qty-input');
    if (qtyInput) {
      qtyInput.addEventListener('input', (e) => {
        servingMultiplier = Math.max(parseFloat(e.target.value) || 1, 0.1);
        render();
      });
    }

    modalContainer.querySelector('#confirm-log-btn').addEventListener('click', () => {
      const activeGrams = calculateActiveGrams();
      store.addFoodLog({
        food: selectedFood,
        quantity_grams: activeGrams,
        portionName: `${servingMultiplier}x ${selectedServing.name} (${activeGrams}g)`,
        meal_type: selectedMealType
      });
      onClose();
    });
  }

  render();
}
