/**
 * Nutrel - Grounded AI Nutrition Assistant View
 * PRD FR-040 to FR-049 & TDD Section 9 (AI Orchestration & Safety)
 * Upgraded with detailed food breakdowns, digestion science, and Compensator guidance.
 */

import { generateAssistantResponse } from '../engine/ai.js';
import { store } from '../state/store.js';

export function renderAiView(container, onNavigate) {
  const quickPrompts = [
    'What should I do after a high-carb meal? (Compensator)',
    'How much protein & carbs in 2 rotis and 1 katori dal?',
    'How does paneer get digested and used by muscles?',
    'Explain what nutrients my lunch provided',
    'Do I have an iron deficiency? (Test Safety Boundary)'
  ];

  let isGenerating = false;

  function render() {
    container.innerHTML = `
      <div class="chat-container animate-fade-in">
        <!-- Safety Banner Header -->
        <div style="background: var(--nutrel-sage-light); border: 1px solid rgba(95, 119, 89, 0.25); border-radius: var(--radius-sm); padding: 10px 12px; margin-bottom: 12px; font-size: 0.73rem; color: var(--nutrel-sage-dark);">
          <strong>🛡️ Grounded AI Protocol:</strong> Answers are retrieved from structured ICMR food tables and reviewed nutrition science. AI never invents nutrient amounts or provides medical diagnoses.
        </div>

        <!-- Chat History -->
        <div class="chat-history" id="chat-messages-container">
          ${store.state.aiMessages.map(msg => `
            <div class="chat-msg ${msg.sender} animate-fade-in">
              <div style="white-space: pre-line;">${msg.text}</div>

              ${msg.actionLink ? `
                <div style="margin-top: 10px;">
                  <button class="btn-primary ai-action-link-btn" data-nav-tab="${msg.actionLink.tab}" style="width: auto; padding: 6px 14px; font-size: 0.76rem; background: var(--nutrel-sage-dark);">
                    ${msg.actionLink.label} →
                  </button>
                </div>
              ` : ''}

              ${msg.sources && msg.sources.length > 0 ? `
                <div class="chat-sources-block">
                  <strong>Grounding Sources:</strong>
                  ${msg.sources.map(s => `<span>• ${s.label}</span>`).join(' ')}
                </div>
              ` : ''}

              ${msg.uncertainties && msg.uncertainties.length > 0 ? `
                <div style="font-size: 0.68rem; color: #8A6D3B; margin-top: 4px;">
                  ⚠️ <em>${msg.uncertainties.join(' ')}</em>
                </div>
              ` : ''}

              <div style="font-size: 0.65rem; opacity: 0.7; text-align: right; margin-top: 4px;">
                ${msg.timestamp || ''}
              </div>
            </div>
          `).join('')}

          ${isGenerating ? `
            <div class="chat-msg assistant" style="color: var(--nutrel-text-muted); font-style: italic;">
              Retrieving structured food data & computing response...
            </div>
          ` : ''}
        </div>

        <!-- Prompt Suggestions -->
        <div class="chat-prompt-chips">
          ${quickPrompts.map(p => `
            <button class="prompt-chip" data-prompt-text="${p}">
              ${p}
            </button>
          `).join('')}
        </div>

        <!-- Message Input Bar -->
        <div class="chat-input-bar">
          <input
            type="text"
            class="chat-text-input"
            id="chat-user-input"
            placeholder="Ask about foods, nutrients, high-carb meals, or your diary..."
            ${isGenerating ? 'disabled' : ''}
          />
          <button class="chat-send-btn" id="chat-send-button" ${isGenerating ? 'disabled' : ''}>
            ➤
          </button>
        </div>
      </div>
    `;

    // Scroll chat to bottom
    const msgContainer = container.querySelector('#chat-messages-container');
    if (msgContainer) msgContainer.scrollTop = msgContainer.scrollHeight;

    // Handlers
    container.querySelectorAll('.ai-action-link-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-nav-tab');
        if (targetTab && onNavigate) {
          onNavigate(targetTab);
        }
      });
    });

    container.querySelectorAll('.prompt-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-prompt-text');
        sendMessage(text);
      });
    });

    const sendBtn = container.querySelector('#chat-send-button');
    const input = container.querySelector('#chat-user-input');

    const handleSend = () => {
      const q = input.value.trim();
      if (!q || isGenerating) return;
      sendMessage(q);
    };

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSend();
      });
    }
  }

  async function sendMessage(text) {
    if (isGenerating) return;

    // 1. Add user message
    store.addAiMessage({
      sender: 'user',
      text
    });

    isGenerating = true;
    render();

    // 2. Run Grounded AI Assistant engine
    const todayLogs = store.getTodayLogs();
    const profile = store.state.profile;

    // Simulate realistic model retrieval and thought
    setTimeout(async () => {
      const response = await generateAssistantResponse(text, todayLogs, profile);

      store.addAiMessage({
        sender: 'assistant',
        text: response.answer,
        sources: response.sources,
        uncertainties: response.uncertainties,
        actionLink: response.actionLink
      });

      isGenerating = false;
      render();
    }, 400);
  }

  render();
}
