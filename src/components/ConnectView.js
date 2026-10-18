/**
 * Nutrel - Connect & Social Wellness View
 * Separates Friends and Challenges into two distinct destinations.
 * Friends: Shared habits, daily nutrient charts, shared meal summaries, and granular privacy controls.
 * Challenges: Available, Joined, and Completed challenges categorized cleanly.
 * Strictly enforces privacy: Food logs, weight, and personal charts remain private by default.
 */

import { store } from '../state/store.js';

let activeSubTab = 'friends'; // 'friends' or 'challenges'
let expandedFriendId = 'fr_1'; // Default expanded friend card

export function renderConnectView(container) {
  function render() {
    const privacy = store.state.privacy;
    const friends = store.state.friends;
    const challenges = store.state.challenges;

    // Filter challenges by status
    const joinedChallenges = challenges.filter(c => c.isJoined && !c.isCompleted);
    const availableChallenges = challenges.filter(c => !c.isJoined && !c.isCompleted);
    const completedChallenges = challenges.filter(c => c.isCompleted);

    container.innerHTML = `
      <div class="animate-fade-in" style="padding-bottom: 24px;">
        <!-- Top Sub-Navigation Switcher -->
        <div class="games-tab-bar" style="margin-bottom: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
          <button class="game-tab-btn ${activeSubTab === 'friends' ? 'active' : ''}" id="tab-btn-friends">
            👥 Friends & Shared Charts
          </button>
          <button class="game-tab-btn ${activeSubTab === 'challenges' ? 'active' : ''}" id="tab-btn-challenges">
            🏆 Habit Challenges (${joinedChallenges.length} Active)
          </button>
        </div>

        <!-- Safety & Supportive Community Banner -->
        <div style="background: var(--nutrel-sage-light); border-radius: var(--radius-sm); padding: 10px 12px; margin-bottom: 16px; font-size: 0.74rem; color: var(--nutrel-sage-dark); line-height: 1.45;">
          <strong>🤝 Supportive Community:</strong> Nutrel social connections celebrate habit consistency, plant variety, and wellness curiosity—never calorie restriction or weight comparisons.
        </div>

        <div id="connect-subtab-content">
          ${activeSubTab === 'friends' ? renderFriendsDestinationHtml(friends, privacy) : renderChallengesDestinationHtml(joinedChallenges, availableChallenges, completedChallenges)}
        </div>
      </div>
    `;

    // Tab Switcher Handlers
    container.querySelector('#tab-btn-friends').addEventListener('click', () => {
      activeSubTab = 'friends';
      render();
    });

    container.querySelector('#tab-btn-challenges').addEventListener('click', () => {
      activeSubTab = 'challenges';
      render();
    });

    // Sub-destination Handlers
    if (activeSubTab === 'friends') {
      setupFriendsHandlers(container, render);
    } else {
      setupChallengesHandlers(container, render);
    }
  }

  function renderFriendsDestinationHtml(friends, privacy) {
    return `
      <!-- Privacy & Sharing Permissions Controls Card (Enforced default private) -->
      <div class="nutrel-card" style="margin-bottom: 16px; border: 1px solid var(--nutrel-sage);">
        <div class="card-header-row" style="margin-bottom: 8px;">
          <h3 style="font-family: var(--font-heading); font-size: 0.95rem; color: var(--nutrel-text);">
            Your Sharing Permissions
          </h3>
          <span style="font-size: 0.68rem; color: var(--nutrel-sage-dark); font-weight: 700; background: var(--nutrel-sage-light); padding: 2px 8px; border-radius: var(--radius-full);">
            🔒 Private By Default
          </span>
        </div>

        <p style="font-size: 0.74rem; color: var(--nutrel-text-muted); margin-bottom: 12px; line-height: 1.4;">
          Control exactly what friends can see. Food logs, body weight, and personal nutrition charts remain strictly private unless you choose to share them.
        </p>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <!-- Toggle 1: Food Logs -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--nutrel-border-light);">
            <div>
              <div style="font-size: 0.8rem; font-weight: 600; color: var(--nutrel-text);">Daily Food Logs & Meals</div>
              <div style="font-size: 0.7rem; color: var(--nutrel-text-muted);">Share names and items of logged meals</div>
            </div>
            <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
              <input type="checkbox" id="toggle-share-foodlogs" ${privacy.shareFoodLogs ? 'checked' : ''} style="opacity: 0; width: 0; height: 0;">
              <span class="custom-switch-slider ${privacy.shareFoodLogs ? 'on' : ''}"></span>
            </label>
          </div>

          <!-- Toggle 2: Nutrient Charts -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--nutrel-border-light);">
            <div>
              <div style="font-size: 0.8rem; font-weight: 600; color: var(--nutrel-text);">Daily Nutrient & Macro Charts</div>
              <div style="font-size: 0.7rem; color: var(--nutrel-text-muted);">Share daily protein, fibre, and target percentages</div>
            </div>
            <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
              <input type="checkbox" id="toggle-share-charts" ${privacy.shareNutrientCharts ? 'checked' : ''} style="opacity: 0; width: 0; height: 0;">
              <span class="custom-switch-slider ${privacy.shareNutrientCharts ? 'on' : ''}"></span>
            </label>
          </div>

          <!-- Toggle 3: Body Weight & Physical Metrics -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--nutrel-border-light);">
            <div>
              <div style="font-size: 0.8rem; font-weight: 600; color: var(--nutrel-text);">Body Weight & Sensitive Metrics</div>
              <div style="font-size: 0.7rem; color: var(--nutrel-text-muted);">Body weight and target BMR calculations</div>
            </div>
            <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
              <input type="checkbox" id="toggle-share-weight" ${privacy.shareWeight ? 'checked' : ''} style="opacity: 0; width: 0; height: 0;">
              <span class="custom-switch-slider ${privacy.shareWeight ? 'on' : ''}"></span>
            </label>
          </div>

          <!-- Toggle 4: Habit Streaks & Badges -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0;">
            <div>
              <div style="font-size: 0.8rem; font-weight: 600; color: var(--nutrel-text);">Habit Streaks & Challenge Badges</div>
              <div style="font-size: 0.7rem; color: var(--nutrel-text-muted);">Share curiosity streaks and challenge badges</div>
            </div>
            <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
              <input type="checkbox" id="toggle-share-streaks" ${privacy.shareStreaks ? 'checked' : ''} style="opacity: 0; width: 0; height: 0;">
              <span class="custom-switch-slider ${privacy.shareStreaks ? 'on' : ''}"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Friends List Section -->
      <div class="section-heading-row">
        <h3 class="section-title">Friends' Shared Charts & Habits</h3>
        <span style="font-size: 0.72rem; color: var(--nutrel-teal); font-weight: 600;">+ Invite Friend</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
        ${friends.map(friendRaw => {
          const friend = store.getFriendSharedView(friendRaw.id) || friendRaw;
          const isExpanded = expandedFriendId === friend.id;
          const summary = friend.sharedSummary || {};

          return `
            <div class="nutrel-card friend-card" data-friend-id="${friend.id}" style="cursor: pointer; padding: 12px; transition: border-color 0.2s;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 1.6rem;">${friend.avatar}</span>
                  <div>
                    <h4 style="font-size: 0.92rem; font-weight: 700; color: var(--nutrel-text);">${friend.name}</h4>
                    <span style="font-size: 0.72rem; color: var(--nutrel-sage-dark); font-weight: 500;">
                      ${friend.badge}
                    </span>
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 8px;">
                  ${friend.streak ? `
                    <span class="streak-pill" style="font-size: 0.72rem; padding: 2px 8px;">
                      🔥 ${friend.streak}d streak
                    </span>
                  ` : ''}
                  <span style="font-size: 0.8rem; color: var(--nutrel-text-muted);">${isExpanded ? '▲' : '▼'}</span>
                </div>
              </div>

              <!-- Collapsible Shared Summary -->
              ${isExpanded ? `
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--nutrel-border-light); font-size: 0.76rem;">
                  <!-- Habit Highlight -->
                  <div style="background: var(--nutrel-beige-light); padding: 8px 10px; border-radius: var(--radius-sm); margin-bottom: 8px;">
                    <strong>🌱 Shared Habit:</strong> ${summary.habitHighlight || 'Consistent daily tracking'}
                  </div>

                  <!-- Daily Chart (If permitted) -->
                  ${friend.permissions.shareNutrientCharts ? `
                    <div style="margin-bottom: 8px;">
                      <strong style="color: var(--nutrel-sage-dark); display: block; margin-bottom: 4px;">📊 Shared Daily Nutrition Chart:</strong>
                      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; text-align: center; background: #FFFFFF; border: 1px solid var(--nutrel-border-light); border-radius: var(--radius-sm); padding: 6px;">
                        <div>
                          <div style="font-size: 0.62rem; color: var(--nutrel-text-muted);">Energy</div>
                          <div style="font-weight: 700;">${summary.caloriesEst || '—'}</div>
                        </div>
                        <div>
                          <div style="font-size: 0.62rem; color: var(--nutrel-text-muted);">Protein</div>
                          <div style="font-weight: 700; color: #4E868F;">${summary.proteinGrams || '—'}</div>
                        </div>
                        <div>
                          <div style="font-size: 0.62rem; color: var(--nutrel-text-muted);">Fibre</div>
                          <div style="font-weight: 700; color: #5F7759;">${summary.fibreGrams || '—'}</div>
                        </div>
                      </div>
                      ${summary.topNutrient ? `
                        <div style="font-size: 0.7rem; color: var(--nutrel-text-muted); margin-top: 4px;">
                          Top nutrient milestone: <strong>${summary.topNutrient}</strong>
                        </div>
                      ` : ''}
                    </div>
                  ` : `
                    <div style="font-size: 0.72rem; color: var(--nutrel-text-muted); font-style: italic; margin-bottom: 6px;">
                      🔒 Daily nutrient chart kept private by user
                    </div>
                  `}

                  <!-- Meal Log Snippet (If permitted) -->
                  ${friend.permissions.shareFoodLogs ? `
                    <div style="margin-top: 6px;">
                      <strong style="color: var(--nutrel-text); display: block; margin-bottom: 2px;">🍽️ Shared Meal Summary:</strong>
                      <span style="color: var(--nutrel-text-muted);">${summary.recentMealSnippet || 'Meals logged privately'}</span>
                    </div>
                  ` : `
                    <div style="font-size: 0.72rem; color: var(--nutrel-text-muted); font-style: italic;">
                      🔒 Detailed food diary kept private by user
                    </div>
                  `}
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>

      <!-- Data Export & Privacy Controls -->
      <div class="nutrel-card" style="padding: 12px;">
        <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 4px;">Data Rights & Portability</h4>
        <p style="font-size: 0.72rem; color: var(--nutrel-text-muted); margin-bottom: 10px;">
          Nutrel complies with DPDP / GDPR data minimization standards. Your data is stored locally.
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <button id="btn-export-data" class="btn-secondary" style="font-size: 0.76rem; padding: 8px;">
            📥 Export My Data
          </button>
          <button id="btn-reset-data" class="btn-secondary" style="font-size: 0.76rem; padding: 8px; color: var(--nutrel-accent-rust); border-color: rgba(186,93,72,0.3);">
            🗑️ Reset State
          </button>
        </div>
      </div>
    `;
  }

  function renderChallengesDestinationHtml(joined, available, completed) {
    return `
      <!-- Destination: Challenges -->
      <div class="animate-fade-in">
        <!-- 1. Joined Challenges -->
        <div class="section-heading-row" style="margin-top: 0;">
          <h3 class="section-title">Active Challenges (${joined.length})</h3>
          <span style="font-size: 0.72rem; color: var(--nutrel-sage-dark); font-weight: 600;">In Progress</span>
        </div>

        ${joined.length === 0 ? `
          <div class="nutrel-card" style="text-align: center; padding: 16px; margin-bottom: 16px;">
            <p style="font-size: 0.78rem; color: var(--nutrel-text-muted);">
              You haven't joined any challenges yet. Pick one below to build supportive wellness habits!
            </p>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
            ${joined.map(ch => `
              <div class="challenge-item-card animate-fade-in">
                <div class="challenge-top">
                  <div style="display: flex; gap: 10px; align-items: flex-start;">
                    <span style="font-size: 1.6rem; line-height: 1;">${ch.icon}</span>
                    <div>
                      <h4 class="challenge-title">${ch.title}</h4>
                      <span style="font-size: 0.72rem; color: var(--nutrel-text-muted);">
                        Day ${ch.currentDay} of ${ch.durationDays} • ${ch.participants} members
                      </span>
                    </div>
                  </div>
                  <button class="challenge-btn joined" data-challenge-id="${ch.id}">
                    ✓ Joined
                  </button>
                </div>

                <p style="font-size: 0.78rem; color: var(--nutrel-text-muted); margin-bottom: 10px;">
                  ${ch.description}
                </p>

                <div class="progress-track" style="height: 6px;">
                  <div class="progress-fill" style="width: ${ch.progressPercent}%;"></div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
                  <span style="font-size: 0.7rem; color: var(--nutrel-text-muted);">
                    ${ch.progressPercent}% Completed
                  </span>
                  <div style="display: flex; gap: 6px;">
                    <button class="btn-progress-boost" data-challenge-id="${ch.id}" style="font-size: 0.68rem; background: var(--nutrel-sage-light); color: var(--nutrel-sage-dark); border: none; padding: 4px 8px; border-radius: 4px; font-weight: 700; cursor: pointer;">
                      + Log Habit
                    </button>
                    <button class="btn-complete-ch" data-challenge-id="${ch.id}" style="font-size: 0.68rem; background: var(--nutrel-teal-light); color: var(--nutrel-teal); border: none; padding: 4px 8px; border-radius: 4px; font-weight: 700; cursor: pointer;">
                      🏆 Complete
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}

        <!-- 2. Available Challenges -->
        <div class="section-heading-row">
          <h3 class="section-title">Available Challenges (${available.length})</h3>
          <span style="font-size: 0.72rem; color: var(--nutrel-text-muted);">Self-paced</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
          ${available.map(ch => `
            <div class="challenge-item-card">
              <div class="challenge-top">
                <div style="display: flex; gap: 10px; align-items: flex-start;">
                  <span style="font-size: 1.6rem; line-height: 1;">${ch.icon}</span>
                  <div>
                    <h4 class="challenge-title">${ch.title}</h4>
                    <span style="font-size: 0.72rem; color: var(--nutrel-text-muted);">
                      ${ch.durationDays} Days • ${ch.participants} participants
                    </span>
                  </div>
                </div>
                <button class="challenge-btn" data-challenge-id="${ch.id}">
                  + Join
                </button>
              </div>

              <p style="font-size: 0.78rem; color: var(--nutrel-text-muted); margin-bottom: 4px;">
                ${ch.description}
              </p>
            </div>
          `).join('')}
        </div>

        <!-- 3. Completed Challenges -->
        <div class="section-heading-row">
          <h3 class="section-title">Completed Challenges (${completed.length})</h3>
          <span style="font-size: 0.72rem; color: var(--nutrel-accent-gold); font-weight: 700;">Trophies</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${completed.map(ch => `
            <div class="nutrel-card" style="padding: 10px 14px; background: linear-gradient(135deg, #FAF7F2 0%, #FFFDF9 100%); border-left: 4px solid var(--nutrel-accent-gold);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 1.5rem;">${ch.icon}</span>
                  <div>
                    <h4 style="font-size: 0.88rem; font-weight: 700; color: var(--nutrel-text);">${ch.title}</h4>
                    <span style="font-size: 0.7rem; color: var(--nutrel-text-muted);">${ch.durationDays} days completed successfully</span>
                  </div>
                </div>
                <span style="font-size: 0.72rem; color: #8A6D3B; font-weight: 700; background: #FFF6E6; padding: 2px 8px; border-radius: var(--radius-full);">
                  🏅 Completed
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function setupFriendsHandlers(container, render) {
    // Permission Toggles
    const toggleLogs = container.querySelector('#toggle-share-foodlogs');
    if (toggleLogs) {
      toggleLogs.addEventListener('change', (e) => {
        store.updatePrivacy({ shareFoodLogs: e.target.checked });
        render();
      });
    }

    const toggleCharts = container.querySelector('#toggle-share-charts');
    if (toggleCharts) {
      toggleCharts.addEventListener('change', (e) => {
        store.updatePrivacy({ shareNutrientCharts: e.target.checked });
        render();
      });
    }

    const toggleWeight = container.querySelector('#toggle-share-weight');
    if (toggleWeight) {
      toggleWeight.addEventListener('change', (e) => {
        store.updatePrivacy({ shareWeight: e.target.checked });
        render();
      });
    }

    const toggleStreaks = container.querySelector('#toggle-share-streaks');
    if (toggleStreaks) {
      toggleStreaks.addEventListener('change', (e) => {
        store.updatePrivacy({ shareStreaks: e.target.checked });
        render();
      });
    }

    // Expand Friend Cards
    container.querySelectorAll('.friend-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-friend-id');
        expandedFriendId = expandedFriendId === id ? null : id;
        render();
      });
    });

    const exportBtn = container.querySelector('#btn-export-data');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => store.exportUserData());
    }

    const resetBtn = container.querySelector('#btn-reset-data');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset all saved mock data and restore defaults?')) {
          store.resetAllData();
          render();
        }
      });
    }
  }

  function setupChallengesHandlers(container, render) {
    container.querySelectorAll('[data-challenge-id].challenge-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-challenge-id');
        store.toggleJoinChallenge(id);
        render();
      });
    });

    container.querySelectorAll('.btn-progress-boost').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-challenge-id');
        const ch = store.state.challenges.find(c => c.id === id);
        if (ch) {
          const next = Math.min(ch.progressPercent + 20, 100);
          store.updateChallengeProgress(id, next);
          render();
        }
      });
    });

    container.querySelectorAll('.btn-complete-ch').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-challenge-id');
        store.completeChallenge(id);
        render();
      });
    });
  }

  render();
}
