/**
 * Nutrel - Learn & Interactive Games View
 * Comprehensive biological nutrition education, 3 mini-games, and cellular mechanism lessons.
 * Replaces brick analogies with physiology (digestion, absorption, training & recovery).
 */

import { LESSONS } from '../data/lessons.js';
import { COMPARISON_CHALLENGES, MYTH_FACTS, PLATE_BUILDER_ITEMS } from '../data/games.js';
import { FOOD_NUTRIENT_TOPICS, REAL_FOODS_DATABASE } from '../data/foodNutrientsEdu.js';
import { store } from '../state/store.js';

// Persistent state across component renders
let activeTab = 'food-nutrients'; // 'food-nutrients', 'lessons', or 'games'
let activeGame = 'comparison'; // 'comparison', 'plate', 'myth'
let activeEduTopicId = 'edu_protein'; // ID of selected topic in Food & Nutrients
let selectedFoodCategory = 'All'; // Filter for Real Foods Database

let currentComparisonIdx = 0;
let currentMythIdx = 0;
let selectedPlateItems = new Set(); // item IDs
let comparisonAnswers = {}; // { cmpId: { selected, isCorrect } }
let mythAnswers = {}; // { mythId: { userVoteFact, isCorrect } }

export function renderLearnView(container) {
  function render() {
    container.innerHTML = `
      <div class="animate-fade-in">
        <!-- Tab Bar -->
        <div class="games-tab-bar" style="margin-bottom: 16px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px;">
          <button class="game-tab-btn ${activeTab === 'food-nutrients' ? 'active' : ''}" id="tab-btn-food-nutrients" style="padding: 8px 4px; font-size: 0.74rem;">
            🥦 Food & Nutrients
          </button>
          <button class="game-tab-btn ${activeTab === 'lessons' ? 'active' : ''}" id="tab-btn-lessons" style="padding: 8px 4px; font-size: 0.74rem;">
            📖 Body Biology
          </button>
          <button class="game-tab-btn ${activeTab === 'games' ? 'active' : ''}" id="tab-btn-games" style="padding: 8px 4px; font-size: 0.74rem;">
            🎮 3 Mini-Games
          </button>
        </div>

        <div id="learn-tab-content"></div>
      </div>
    `;

    container.querySelector('#tab-btn-food-nutrients').addEventListener('click', () => {
      activeTab = 'food-nutrients';
      render();
    });

    container.querySelector('#tab-btn-lessons').addEventListener('click', () => {
      activeTab = 'lessons';
      render();
    });

    container.querySelector('#tab-btn-games').addEventListener('click', () => {
      activeTab = 'games';
      render();
    });

    const contentArea = container.querySelector('#learn-tab-content');
    if (activeTab === 'food-nutrients') {
      renderFoodNutrientsSection(contentArea);
    } else if (activeTab === 'lessons') {
      renderLessonsList(contentArea);
    } else {
      renderGamesWorkspace(contentArea);
    }
  }

  // Section 1: Food & Nutrients Comprehensive Biology Section
  function renderFoodNutrientsSection(subContainer) {
    const isRealFoodsActive = activeEduTopicId === 'real_foods_explorer';
    const currentTopic = FOOD_NUTRIENT_TOPICS.find(t => t.id === activeEduTopicId) || FOOD_NUTRIENT_TOPICS[0];

    subContainer.innerHTML = `
      <div class="animate-fade-in">
        <p style="font-size: 0.8rem; color: var(--nutrel-text-muted); margin-bottom: 12px; line-height: 1.4;">
          Explore real human physiology: how macronutrients and micronutrients are broken down by enzymes, absorbed across the gut wall, and utilized for muscle remodeling and energy.
        </p>

        <!-- Topic Selector Chips -->
        <div style="display: flex; gap: 6px; margin-bottom: 14px; overflow-x: auto; padding-bottom: 6px; scrollbar-width: none;">
          ${FOOD_NUTRIENT_TOPICS.map(t => `
            <button class="prompt-chip ${activeEduTopicId === t.id ? 'active' : ''}" data-topic-id="${t.id}" style="font-size: 0.74rem; padding: 6px 12px; white-space: nowrap;">
              ${t.icon} ${t.name.split(' ')[0]}
            </button>
          `).join('')}
          <button class="prompt-chip ${isRealFoodsActive ? 'active' : ''}" data-topic-id="real_foods_explorer" style="font-size: 0.74rem; padding: 6px 12px; white-space: nowrap;">
            🥗 Real Foods Explorer
          </button>
        </div>

        <!-- Active Topic Details -->
        ${isRealFoodsActive ? renderRealFoodsExplorerHtml() : renderTopicHtml(currentTopic)}
      </div>
    `;

    // Handlers
    subContainer.querySelectorAll('[data-topic-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeEduTopicId = btn.getAttribute('data-topic-id');
        renderFoodNutrientsSection(subContainer);
      });
    });

    if (isRealFoodsActive) {
      subContainer.querySelectorAll('.cat-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedFoodCategory = btn.getAttribute('data-cat');
          renderFoodNutrientsSection(subContainer);
        });
      });
    }
  }

  function renderTopicHtml(topic) {
    return `
      <div class="nutrel-card animate-fade-in" style="margin-bottom: 16px;">
        <!-- Header -->
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
          <span style="font-size: 2rem;">${topic.icon}</span>
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 1.15rem; color: var(--nutrel-text);">${topic.name}</h3>
            <span style="font-size: 0.74rem; color: var(--nutrel-text-muted); line-height: 1.35; display: block;">${topic.summary}</span>
          </div>
        </div>

        <!-- 1. What it does -->
        <div style="background: var(--nutrel-beige-light); padding: 12px; border-radius: var(--radius-sm); margin-bottom: 12px;">
          <strong style="font-size: 0.8rem; color: var(--nutrel-sage-dark); display: block; margin-bottom: 3px;">
            🔬 Biological Role in the Body:
          </strong>
          <p style="font-size: 0.78rem; color: var(--nutrel-text); line-height: 1.45;">
            ${topic.whatItDoes}
          </p>
        </div>

        <!-- 2. Digestion & Absorption -->
        <div style="border-left: 3px solid var(--nutrel-teal); padding-left: 10px; margin-bottom: 12px;">
          <strong style="font-size: 0.8rem; color: var(--nutrel-teal); display: block; margin-bottom: 3px;">
            🔄 Digestion & Intestinal Absorption:
          </strong>
          <p style="font-size: 0.78rem; color: var(--nutrel-text-muted); line-height: 1.45;">
            ${topic.digestionAndAbsorption}
          </p>
        </div>

        <!-- 3. How the Body Uses It (Training, Sleep, Recovery) -->
        <div style="border-left: 3px solid var(--nutrel-sage); padding-left: 10px; margin-bottom: 14px;">
          <strong style="font-size: 0.8rem; color: var(--nutrel-sage-dark); display: block; margin-bottom: 3px;">
            ⚡ Cellular Utilization, Recovery & Sleep:
          </strong>
          <p style="font-size: 0.78rem; color: var(--nutrel-text-muted); line-height: 1.45;">
            ${topic.howBodyUsesIt}
          </p>
        </div>

        <!-- 4. Insufficient vs Excessive Intake -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
          <div style="background: #FFF9F8; border: 1px solid #F5D3CE; border-radius: var(--radius-sm); padding: 10px;">
            <strong style="font-size: 0.74rem; color: #BA5D48; display: block; margin-bottom: 2px;">⚠️ Inadequate Intake:</strong>
            <p style="font-size: 0.72rem; color: var(--nutrel-text-muted); line-height: 1.4;">
              ${topic.insufficiencyAndExcess.insufficient}
            </p>
          </div>

          <div style="background: #F8FBF8; border: 1px solid #D5E5D4; border-radius: var(--radius-sm); padding: 10px;">
            <strong style="font-size: 0.74rem; color: var(--nutrel-sage-dark); display: block; margin-bottom: 2px;">⚖️ Excessive Intake:</strong>
            <p style="font-size: 0.72rem; color: var(--nutrel-text-muted); line-height: 1.4;">
              ${topic.insufficiencyAndExcess.excessive}
            </p>
          </div>
        </div>

        <!-- 5. Real Foods & Serving Sizes Table -->
        <div class="card-header-row" style="margin-bottom: 8px;">
          <h4 style="font-family: var(--font-heading); font-size: 0.92rem;">Real Foods, Serving Sizes & Amounts</h4>
          <span style="font-size: 0.7rem; color: var(--nutrel-sage-dark); font-weight: 600;">Standard Indian Servings</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${topic.sourcesAndServings.map(src => `
            <div style="background: var(--nutrel-white); border: 1px solid var(--nutrel-border-light); border-radius: var(--radius-sm); padding: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2px;">
                <span style="font-size: 0.82rem; font-weight: 700; color: var(--nutrel-text);">${src.food}</span>
                <span style="font-size: 0.78rem; font-weight: 700; color: var(--nutrel-sage-dark);">${src.amount}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--nutrel-text-muted); margin-bottom: 4px;">
                <span>Portion: <strong>${src.serving}</strong></span>
                <span>~${src.calories}</span>
              </div>
              <p style="font-size: 0.72rem; color: var(--nutrel-text-muted); font-style: italic;">
                💡 ${src.notes}
              </p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderRealFoodsExplorerHtml() {
    const categories = ['All', 'Lentils & Pulses', 'Whole Grains', 'Dairy', 'Legumes & Sprouts', 'Fruits', 'Nuts & Seeds'];
    const filteredFoods = selectedFoodCategory === 'All'
      ? REAL_FOODS_DATABASE
      : REAL_FOODS_DATABASE.filter(f => f.category.includes(selectedFoodCategory));

    return `
      <div class="animate-fade-in">
        <!-- Category Filter Chips -->
        <div style="display: flex; gap: 6px; margin-bottom: 12px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none;">
          ${categories.map(cat => `
            <button class="cat-filter-btn ${selectedFoodCategory === cat ? 'active' : ''}" data-cat="${cat}" style="font-size: 0.72rem; padding: 4px 10px; border-radius: var(--radius-full); border: 1px solid ${selectedFoodCategory === cat ? 'var(--nutrel-sage)' : 'var(--nutrel-border-light)'}; background: ${selectedFoodCategory === cat ? 'var(--nutrel-sage-light)' : 'transparent'}; color: ${selectedFoodCategory === cat ? 'var(--nutrel-sage-dark)' : 'var(--nutrel-text-muted)'}; font-weight: 600; cursor: pointer; white-space: nowrap;">
              ${cat}
            </button>
          `).join('')}
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${filteredFoods.map(food => `
            <div class="nutrel-card" style="padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                <div>
                  <h4 style="font-family: var(--font-heading); font-size: 0.92rem; color: var(--nutrel-text);">${food.name}</h4>
                  <span style="font-size: 0.7rem; color: var(--nutrel-text-muted);">${food.category} • ${food.servingSize}</span>
                </div>
                <span style="font-size: 0.78rem; font-weight: 700; background: var(--nutrel-beige-light); padding: 2px 8px; border-radius: 4px;">
                  ~${food.calories} kcal
                </span>
              </div>

              <!-- Nutrients Grid -->
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; text-align: center; margin: 8px 0; background: var(--nutrel-beige-light); padding: 6px; border-radius: var(--radius-sm);">
                <div>
                  <div style="font-size: 0.62rem; color: var(--nutrel-text-muted);">Protein</div>
                  <div style="font-weight: 700; font-size: 0.8rem; color: #4E868F;">${food.protein}g</div>
                </div>
                <div>
                  <div style="font-size: 0.62rem; color: var(--nutrel-text-muted);">Carbs</div>
                  <div style="font-weight: 700; font-size: 0.8rem; color: #C9963D;">${food.carbs}g</div>
                </div>
                <div>
                  <div style="font-size: 0.62rem; color: var(--nutrel-text-muted);">Fibre</div>
                  <div style="font-weight: 700; font-size: 0.8rem; color: #5F7759;">${food.fibre}g</div>
                </div>
                <div>
                  <div style="font-size: 0.62rem; color: var(--nutrel-text-muted);">Iron / Ca</div>
                  <div style="font-weight: 700; font-size: 0.75rem; color: #BA5D48;">${food.iron}m / ${food.calcium}m</div>
                </div>
              </div>

              <p style="font-size: 0.72rem; color: var(--nutrel-text-muted); line-height: 1.35;">
                🧬 <strong>Physiological Role:</strong> ${food.biologicalRole}
              </p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Section 2: Render Lessons List (Biologically grounded, no brick analogies)
  function renderLessonsList(subContainer) {
    subContainer.innerHTML = `
      <div class="animate-fade-in">
        <p style="font-size: 0.82rem; color: var(--nutrel-text-muted); margin-bottom: 14px;">
          Nutrel translates cellular biochemistry and organ physiology into accessible daily guidance. Tap any topic to test your knowledge!
        </p>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${LESSONS.map(lesson => `
            <div class="nutrel-card lesson-card" data-lesson-id="${lesson.id}" style="cursor: pointer;">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <span style="font-size: 1.8rem; line-height: 1;">${lesson.icon}</span>
                <div style="flex: 1;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h4 style="font-family: var(--font-heading); font-size: 0.98rem;">${lesson.title}</h4>
                    <span style="font-size: 0.68rem; color: var(--nutrel-text-muted);">${lesson.readTime}</span>
                  </div>
                  <p style="font-size: 0.78rem; color: var(--nutrel-text-muted); margin: 4px 0 8px;">
                    ${lesson.analogy.substring(0, 110)}...
                  </p>
                  <span style="font-size: 0.72rem; color: var(--nutrel-sage-dark); font-weight: 700;">
                    Read Biological Explainer & Quiz →
                  </span>
                </div>
              </div>

              <!-- Collapsible Content -->
              <div class="lesson-expanded-content" id="exp-${lesson.id}" style="display: none; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--nutrel-border-light);">
                <div style="background: var(--nutrel-beige-light); padding: 12px; border-radius: var(--radius-sm); margin-bottom: 12px; font-size: 0.8rem; line-height: 1.45;">
                  <strong>🧬 Biological Mechanism:</strong> ${lesson.analogy}
                </div>

                ${lesson.keyPoints.map(kp => `
                  <div style="margin-bottom: 10px;">
                    <strong style="font-size: 0.82rem; color: var(--nutrel-text);">${kp.heading}:</strong>
                    <p style="font-size: 0.78rem; color: var(--nutrel-text-muted); margin-top: 2px; line-height: 1.4;">${kp.text}</p>
                  </div>
                `).join('')}

                <!-- Mini Quiz -->
                <div style="margin-top: 14px; background: #FFFFFF; border: 1px solid var(--nutrel-border); border-radius: var(--radius-sm); padding: 12px;">
                  <strong style="font-size: 0.8rem; color: var(--nutrel-teal);">❓ Knowledge Check:</strong>
                  <p style="font-size: 0.82rem; margin: 6px 0 10px; font-weight: 600;">${lesson.quiz.question}</p>
                  <div style="display: flex; flex-direction: column; gap: 6px;">
                    ${lesson.quiz.options.map((opt, idx) => `
                      <button class="lesson-quiz-opt-btn" data-lesson-id="${lesson.id}" data-opt-idx="${idx}" style="text-align: left; padding: 8px 10px; border: 1px solid var(--nutrel-border-light); background: var(--nutrel-beige-light); border-radius: 6px; font-size: 0.78rem; cursor: pointer;">
                        ${opt}
                      </button>
                    `).join('')}
                  </div>
                  <div id="quiz-fb-${lesson.id}" style="display: none; margin-top: 10px; font-size: 0.78rem; padding: 8px; border-radius: 4px;"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    subContainer.querySelectorAll('.lesson-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.lesson-quiz-opt-btn')) return;
        const id = card.getAttribute('data-lesson-id');
        const exp = card.querySelector(`#exp-${id}`);
        if (exp) {
          exp.style.display = exp.style.display === 'none' ? 'block' : 'none';
        }
      });
    });

    subContainer.querySelectorAll('.lesson-quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const lessonId = btn.getAttribute('data-lesson-id');
        const optIdx = parseInt(btn.getAttribute('data-opt-idx'));
        const lesson = LESSONS.find(l => l.id === lessonId);
        const fb = subContainer.querySelector(`#quiz-fb-${lessonId}`);

        const isCorrect = optIdx === lesson.quiz.correctIndex;
        fb.style.display = 'block';
        fb.style.background = isCorrect ? '#F1F8EE' : '#FFF6E6';
        fb.style.color = isCorrect ? '#2F5C2A' : '#7D5716';
        fb.innerHTML = `
          <strong>${isCorrect ? '✅ Correct!' : '💡 Learning Opportunity:'}</strong> ${lesson.quiz.explanation}
        `;
        store.recordQuizResult(lessonId, isCorrect);
      });
    });
  }

  // Section 3: Render Mini-Games Hub (3 Games preserved)
  function renderGamesWorkspace(subContainer) {
    subContainer.innerHTML = `
      <!-- Game Selector Bar -->
      <div style="display: flex; gap: 6px; margin-bottom: 14px; overflow-x: auto; padding-bottom: 4px;">
        <button class="prompt-chip ${activeGame === 'comparison' ? 'active' : ''}" id="game-sel-cmp" style="font-size: 0.78rem; padding: 8px 14px;">
          ⚖️ Food Comparison
        </button>
        <button class="prompt-chip ${activeGame === 'plate' ? 'active' : ''}" id="game-sel-plate" style="font-size: 0.78rem; padding: 8px 14px;">
          🍽️ Balanced Plate Builder
        </button>
        <button class="prompt-chip ${activeGame === 'myth' ? 'active' : ''}" id="game-sel-myth" style="font-size: 0.78rem; padding: 8px 14px;">
          🧠 Myth vs Fact
        </button>
      </div>

      <div id="active-game-workspace"></div>
    `;

    subContainer.querySelector('#game-sel-cmp').addEventListener('click', () => {
      activeGame = 'comparison';
      renderGamesWorkspace(subContainer);
    });

    subContainer.querySelector('#game-sel-plate').addEventListener('click', () => {
      activeGame = 'plate';
      renderGamesWorkspace(subContainer);
    });

    subContainer.querySelector('#game-sel-myth').addEventListener('click', () => {
      activeGame = 'myth';
      renderGamesWorkspace(subContainer);
    });

    const gameRoot = subContainer.querySelector('#active-game-workspace');
    if (activeGame === 'comparison') {
      renderFoodComparisonGame(gameRoot);
    } else if (activeGame === 'plate') {
      renderPlateBuilderGame(gameRoot);
    } else {
      renderMythFactGame(gameRoot);
    }
  }

  // Game 1: Food Comparison
  function renderFoodComparisonGame(gameContainer) {
    const challenge = COMPARISON_CHALLENGES[currentComparisonIdx];
    const existing = comparisonAnswers[challenge.id];

    gameContainer.innerHTML = `
      <div class="nutrel-card animate-fade-in">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--nutrel-sage-dark); text-transform: uppercase;">
            Challenge ${currentComparisonIdx + 1} of ${COMPARISON_CHALLENGES.length}
          </span>
          <span style="font-size: 0.72rem; color: var(--nutrel-text-muted);">Sourced IFCT Data</span>
        </div>

        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 6px;">${challenge.title}</h3>
        <p style="font-size: 0.85rem; color: var(--nutrel-text-muted); margin-bottom: 16px;">${challenge.question}</p>

        <div class="comparison-container" id="cmp-options-container">
          <div class="comparison-card ${existing ? (challenge.winner === 'A' ? 'correct' : (existing.selected === 'A' ? 'incorrect' : '')) : ''}" id="cmp-choice-A" style="${existing ? 'pointer-events: none;' : ''}">
            <span style="font-size: 0.7rem; font-weight: 600; color: var(--nutrel-teal);">${challenge.itemA.badge}</span>
            <h4 style="font-size: 0.95rem; margin: 2px 0;">${challenge.itemA.name}</h4>
            <span style="font-size: 0.78rem; color: var(--nutrel-text-muted);">${challenge.itemA.amountDisplay}</span>
          </div>

          <div class="comparison-card ${existing ? (challenge.winner === 'B' ? 'correct' : (existing.selected === 'B' ? 'incorrect' : '')) : ''}" id="cmp-choice-B" style="${existing ? 'pointer-events: none;' : ''}">
            <span style="font-size: 0.7rem; font-weight: 600; color: var(--nutrel-teal);">${challenge.itemB.badge}</span>
            <h4 style="font-size: 0.95rem; margin: 2px 0;">${challenge.itemB.name}</h4>
            <span style="font-size: 0.78rem; color: var(--nutrel-text-muted);">${challenge.itemB.amountDisplay}</span>
          </div>
        </div>

        <div id="cmp-feedback-box" style="display: ${existing ? 'block' : 'none'}; margin-top: 14px; padding: 12px; border-radius: var(--radius-sm); font-size: 0.82rem; line-height: 1.45; background: ${existing ? (existing.isCorrect ? '#F1F8EE' : '#FFF6E6') : ''}; border: ${existing ? (existing.isCorrect ? '1px solid #71866B' : '1px solid #E2A648') : ''};">
          ${existing ? `
            <strong>${existing.isCorrect ? '✅ Well done!' : '💡 Good exploration!'}</strong> ${challenge.explanation}
            <div style="font-size: 0.7rem; color: var(--nutrel-text-muted); margin-top: 6px;">
              <strong>Source:</strong> ${challenge.source}
            </div>
          ` : ''}
        </div>

        <div style="margin-top: 16px; text-align: right;">
          <button class="btn-primary" id="cmp-next-btn" style="width: auto; padding: 8px 18px; font-size: 0.82rem; display: ${existing ? 'inline-block' : 'none'};">
            Next Comparison →
          </button>
        </div>
      </div>
    `;

    const choiceA = gameContainer.querySelector('#cmp-choice-A');
    const choiceB = gameContainer.querySelector('#cmp-choice-B');
    const fbBox = gameContainer.querySelector('#cmp-feedback-box');
    const nextBtn = gameContainer.querySelector('#cmp-next-btn');

    function handleChoice(sel) {
      const isCorrect = sel === challenge.winner;
      comparisonAnswers[challenge.id] = { selected: sel, isCorrect };

      choiceA.style.pointerEvents = 'none';
      choiceB.style.pointerEvents = 'none';

      choiceA.classList.remove('correct', 'incorrect');
      choiceB.classList.remove('correct', 'incorrect');

      if (challenge.winner === 'A') {
        choiceA.classList.add('correct');
        if (sel === 'B') choiceB.classList.add('incorrect');
      } else {
        choiceB.classList.add('correct');
        if (sel === 'A') choiceA.classList.add('incorrect');
      }

      fbBox.style.display = 'block';
      fbBox.style.background = isCorrect ? '#F1F8EE' : '#FFF6E6';
      fbBox.style.border = isCorrect ? '1px solid #71866B' : '1px solid #E2A648';
      fbBox.innerHTML = `
        <strong>${isCorrect ? '✅ Correct!' : '💡 Learning Moment:'}</strong> ${challenge.explanation}
        <div style="font-size: 0.7rem; color: var(--nutrel-text-muted); margin-top: 6px;">
          <strong>Authority:</strong> ${challenge.source}
        </div>
      `;

      nextBtn.style.display = 'inline-block';
      store.recordQuizResult(challenge.id, isCorrect);
    }

    if (!existing) {
      choiceA.addEventListener('click', () => handleChoice('A'));
      choiceB.addEventListener('click', () => handleChoice('B'));
    }

    nextBtn.addEventListener('click', () => {
      currentComparisonIdx = (currentComparisonIdx + 1) % COMPARISON_CHALLENGES.length;
      renderFoodComparisonGame(gameContainer);
    });
  }

  // Game 2: Balanced Plate Builder
  function renderPlateBuilderGame(gameContainer) {
    const selectedList = PLATE_BUILDER_ITEMS.filter(it => selectedPlateItems.has(it.id));

    const totalProtein = selectedList.reduce((sum, i) => sum + (i.nutrients.protein || 0), 0);
    const totalFibre = selectedList.reduce((sum, i) => sum + (i.nutrients.fibre || 0), 0);
    const totalIron = selectedList.reduce((sum, i) => sum + (i.nutrients.iron || 0), 0);

    const hasCereal = selectedList.some(i => i.category === 'Cereal');
    const hasPulseOrDairy = selectedList.some(i => i.category === 'Pulse' || i.category === 'Dairy');
    const hasVeggie = selectedList.some(i => i.category === 'Vegetable' || i.category === 'Fruit');
    const hasEnhancer = selectedList.some(i => i.category === 'Enhancer');

    const scoreCriteriaMet = [hasCereal, hasPulseOrDairy, hasVeggie, hasEnhancer].filter(Boolean).length;
    const completenessPct = Math.round((scoreCriteriaMet / 4) * 100);

    gameContainer.innerHTML = `
      <div class="nutrel-card animate-fade-in">
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 4px;">Balanced Indian Thali Builder</h3>
        <p style="font-size: 0.8rem; color: var(--nutrel-text-muted); margin-bottom: 12px;">
          Tap 3 to 4 items below to build a wholesome Indian meal. Notice how pairing lentils with grains and fresh citrus naturally balances amino acids and iron uptake!
        </p>

        <!-- Thali Assembly Surface -->
        <div style="background: var(--nutrel-beige-light); border: 2px dashed var(--nutrel-border); border-radius: var(--radius-md); padding: 12px; margin-bottom: 14px; min-height: 90px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--nutrel-text-muted); margin-bottom: 8px;">
            <span>Selected Items (${selectedList.length}/4)</span>
            <span style="color: var(--nutrel-sage-dark); font-weight: 700;">Plate Balance: ${completenessPct}%</span>
          </div>

          ${selectedList.length === 0 ? `
            <div style="text-align: center; color: var(--nutrel-text-muted); font-size: 0.78rem; padding: 16px 0;">
              Your thali is empty. Tap items below to add them to your plate!
            </div>
          ` : `
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${selectedList.map(item => `
                <div style="background: #FFFFFF; border: 1px solid var(--nutrel-border); border-radius: var(--radius-sm); padding: 6px 10px; display: flex; align-items: center; gap: 6px; font-size: 0.78rem;">
                  <span>${item.icon}</span>
                  <span style="font-weight: 600;">${item.name}</span>
                  <button class="remove-plate-item-btn" data-item-id="${item.id}" style="background: none; border: none; color: var(--nutrel-accent-rust); cursor: pointer; font-weight: 700; margin-left: 4px;">✕</button>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Plate Live Nutrient Meter -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 14px; text-align: center;">
          <div style="background: var(--nutrel-beige-light); padding: 6px; border-radius: var(--radius-sm);">
            <div style="font-size: 0.65rem; color: var(--nutrel-text-muted);">Protein</div>
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--nutrel-text);">${totalProtein.toFixed(1)}g</div>
          </div>
          <div style="background: var(--nutrel-beige-light); padding: 6px; border-radius: var(--radius-sm);">
            <div style="font-size: 0.65rem; color: var(--nutrel-text-muted);">Fibre</div>
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--nutrel-text);">${totalFibre.toFixed(1)}g</div>
          </div>
          <div style="background: var(--nutrel-beige-light); padding: 6px; border-radius: var(--radius-sm);">
            <div style="font-size: 0.65rem; color: var(--nutrel-text-muted);">Plant Iron</div>
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--nutrel-text);">${totalIron.toFixed(1)}mg</div>
          </div>
        </div>

        <!-- Available Items Catalogue -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          ${PLATE_BUILDER_ITEMS.map(item => {
            const isSelected = selectedPlateItems.has(item.id);
            return `
              <button class="plate-item-btn ${isSelected ? 'active' : ''}" data-item-id="${item.id}" style="display: flex; align-items: center; gap: 8px; text-align: left; padding: 8px 10px; border-radius: var(--radius-sm); border: 1px solid ${isSelected ? 'var(--nutrel-sage)' : 'var(--nutrel-border-light)'}; background: ${isSelected ? 'var(--nutrel-sage-light)' : '#FFFFFF'}; cursor: pointer;">
                <span style="font-size: 1.2rem;">${item.icon}</span>
                <div style="flex: 1; overflow: hidden;">
                  <div style="font-size: 0.78rem; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${item.name}</div>
                  <div style="font-size: 0.68rem; color: var(--nutrel-text-muted);">${item.category}</div>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;

    gameContainer.querySelectorAll('.plate-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-item-id');
        if (selectedPlateItems.has(id)) {
          selectedPlateItems.delete(id);
        } else {
          if (selectedPlateItems.size < 4) {
            selectedPlateItems.add(id);
          }
        }
        renderPlateBuilderGame(gameContainer);
      });
    });

    gameContainer.querySelectorAll('.remove-plate-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-item-id');
        selectedPlateItems.delete(id);
        renderPlateBuilderGame(gameContainer);
      });
    });
  }

  // Game 3: Myth vs Fact
  function renderMythFactGame(gameContainer) {
    const item = MYTH_FACTS[currentMythIdx];
    const existing = mythAnswers[item.id];

    gameContainer.innerHTML = `
      <div class="nutrel-card animate-fade-in">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 0.72rem; font-weight: 700; color: var(--nutrel-sage-dark); text-transform: uppercase;">
            Mythbuster ${currentMythIdx + 1} of ${MYTH_FACTS.length}
          </span>
          <span style="font-size: 0.7rem; color: var(--nutrel-text-muted);">${item.category}</span>
        </div>

        <div style="background: var(--nutrel-beige-light); border-radius: var(--radius-sm); padding: 14px; margin-bottom: 14px; text-align: center;">
          <span style="font-size: 1.8rem; display: block; margin-bottom: 6px;">🤔</span>
          <h4 style="font-size: 0.95rem; line-height: 1.4; color: var(--nutrel-text);">"${item.claim}"</h4>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px;">
          <button class="btn-secondary" id="vote-myth-btn" style="padding: 10px; font-size: 0.82rem; border-color: rgba(186,93,72,0.4); color: var(--nutrel-accent-rust); ${existing ? 'pointer-events: none;' : ''}">
            ❌ It’s a Myth!
          </button>
          <button class="btn-secondary" id="vote-fact-btn" style="padding: 10px; font-size: 0.82rem; border-color: rgba(95,119,89,0.4); color: var(--nutrel-sage-dark); ${existing ? 'pointer-events: none;' : ''}">
            ✅ It’s a Fact!
          </button>
        </div>

        <div id="myth-feedback-box" style="display: ${existing ? 'block' : 'none'}; padding: 12px; border-radius: var(--radius-sm); font-size: 0.8rem; line-height: 1.45; background: ${existing ? (existing.isCorrect ? '#F1F8EE' : '#FFF6E6') : ''}; border: ${existing ? (existing.isCorrect ? '1px solid #71866B' : '1px solid #E2A648') : ''};">
          ${existing ? `
            <strong>${existing.isCorrect ? '🎯 You nailed it!' : '💡 Did you know?'}</strong> The statement is actually <strong>${item.isFact ? 'FACT' : 'MYTH'}</strong>.
            <div style="margin-top: 4px;">${item.explanation}</div>
            <div style="font-size: 0.7rem; color: var(--nutrel-text-muted); margin-top: 4px;">
              <strong>Authority:</strong> ${item.source}
            </div>
          ` : ''}
        </div>

        <div style="margin-top: 14px; text-align: right;">
          <button class="btn-primary" id="myth-next-btn" style="width: auto; padding: 8px 18px; font-size: 0.82rem; display: ${existing ? 'inline-block' : 'none'};">
            Next Myth →
          </button>
        </div>
      </div>
    `;

    const nextBtn = gameContainer.querySelector('#myth-next-btn');
    const fbBox = gameContainer.querySelector('#myth-feedback-box');

    function handleVote(userVoteFact) {
      const isCorrect = userVoteFact === item.isFact;
      mythAnswers[item.id] = { userVoteFact, isCorrect };

      fbBox.style.display = 'block';
      fbBox.style.background = isCorrect ? '#F1F8EE' : '#FFF6E6';
      fbBox.style.border = isCorrect ? '1px solid #71866B' : '1px solid #E2A648';
      fbBox.innerHTML = `
        <strong>${isCorrect ? '🎯 You nailed it!' : '💡 Did you know?'}</strong> The statement is actually <strong>${item.isFact ? 'FACT' : 'MYTH'}</strong>.
        <div style="margin-top: 4px;">${item.explanation}</div>
        <div style="font-size: 0.7rem; color: var(--nutrel-text-muted); margin-top: 4px;">
          <strong>Authority:</strong> ${item.source}
        </div>
      `;

      nextBtn.style.display = 'inline-block';
      store.recordQuizResult(item.id, isCorrect);
    }

    if (!existing) {
      gameContainer.querySelector('#vote-myth-btn').addEventListener('click', () => handleVote(false));
      gameContainer.querySelector('#vote-fact-btn').addEventListener('click', () => handleVote(true));
    }

    nextBtn.addEventListener('click', () => {
      currentMythIdx = (currentMythIdx + 1) % MYTH_FACTS.length;
      renderMythFactGame(gameContainer);
    });
  }

  render();
}
