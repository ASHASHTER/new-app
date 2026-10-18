/**
 * Nutrel - Main Application Entrypoint & Router
 * Assembles all views, navigation tabs, modals, and reactive store subscriptions.
 */

import './style.css';
import { store } from './state/store.js';
import { renderHomeView } from './components/HomeView.js';
import { renderLearnView } from './components/LearnView.js';
import { renderLogFoodModal } from './components/LogFoodModal.js';
import { renderAiView } from './components/AiView.js';
import { renderConnectView } from './components/ConnectView.js';
import { renderNutrientDetailModal } from './components/NutrientDetailModal.js';
import { renderProfileModal } from './components/ProfileModal.js';
import { renderCompensatorView } from './components/CompensatorView.js';
import { renderMakeYourChartView } from './components/MakeYourChartView.js';

let currentTab = 'home'; // 'home', 'compensator', 'make-chart', 'learn', 'ai', 'connect'
const appViewContainer = document.querySelector('#app-view-container');
const modalOverlay = document.querySelector('#app-modal-overlay');

function openModal() {
  modalOverlay.classList.add('active');
}

function closeModal() {
  modalOverlay.classList.remove('active');
  modalOverlay.innerHTML = '';
}

function openNutrientDetail(nutrientCode) {
  renderNutrientDetailModal(modalOverlay, nutrientCode, closeModal);
  openModal();
}

function openLogModal() {
  renderLogFoodModal(modalOverlay, closeModal);
  openModal();
}

function openProfileModal() {
  renderProfileModal(modalOverlay, closeModal);
  openModal();
}

export function navigateToTab(tabName) {
  currentTab = tabName;
  renderCurrentTab();
  if (appViewContainer) appViewContainer.scrollTop = 0;
}

// Render active tab view
function renderCurrentTab() {
  if (!appViewContainer) return;

  // Update nav bar active state (Home remains active when on compensator or make-chart)
  document.querySelectorAll('.nav-item').forEach(item => {
    const tab = item.getAttribute('data-tab');
    const isHomeSubview = (currentTab === 'compensator' || currentTab === 'make-chart') && tab === 'home';
    if (tab === currentTab || isHomeSubview) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Render view
  if (currentTab === 'home') {
    renderHomeView(
      appViewContainer,
      openNutrientDetail,
      openLogModal,
      () => navigateToTab('compensator'),
      () => navigateToTab('make-chart')
    );
  } else if (currentTab === 'compensator') {
    renderCompensatorView(appViewContainer, () => navigateToTab('home'));
  } else if (currentTab === 'make-chart') {
    renderMakeYourChartView(appViewContainer, () => navigateToTab('home'));
  } else if (currentTab === 'learn') {
    renderLearnView(appViewContainer);
  } else if (currentTab === 'ai') {
    renderAiView(appViewContainer, navigateToTab);
  } else if (currentTab === 'connect') {
    renderConnectView(appViewContainer);
  }
}

// Navigation event bindings
function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab) {
        currentTab = tab;
        renderCurrentTab();
      }
    });
  });

  const centralLogBtn = document.querySelector('#nav-log-action-btn');
  if (centralLogBtn) {
    centralLogBtn.addEventListener('click', openLogModal);
  }

  const profileBtn = document.querySelector('#header-profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', openProfileModal);
  }

  // Device frame toggle (Mobile Frame vs Expanded Screen)
  const appContainer = document.querySelector('.app-container');
  const deviceBar = document.querySelector('.device-frame-bar');
  const btnPhone = document.querySelector('#btn-mode-phone');
  const btnWide = document.querySelector('#btn-mode-wide');

  if (btnPhone && btnWide && appContainer) {
    btnPhone.addEventListener('click', () => {
      appContainer.classList.remove('full-width');
      if (deviceBar) deviceBar.classList.remove('full-width');
      btnPhone.classList.add('active');
      btnWide.classList.remove('active');
    });

    btnWide.addEventListener('click', () => {
      appContainer.classList.add('full-width');
      if (deviceBar) deviceBar.classList.add('full-width');
      btnWide.classList.add('active');
      btnPhone.classList.remove('active');
    });
  }

  // Close modal when clicking dark backdrop
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
}

// Initial boot
document.addEventListener('DOMContentLoaded', () => {
  // Detect standalone PWA, native Capacitor, or mobile viewport
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const isCapacitor = Boolean(window.Capacitor?.isNativePlatform?.());
  const isMobileScreen = window.innerWidth <= 768;

  if (isStandalone || isCapacitor || isMobileScreen) {
    document.body.classList.add('is-native-app');
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      document.body.classList.add('is-native-app');
    }
  });

  setupNavigation();
  renderCurrentTab();

  // Re-render when store updates
  store.subscribe(() => {
    if (currentTab === 'home' || currentTab === 'connect' || currentTab === 'compensator' || currentTab === 'make-chart') {
      renderCurrentTab();
    }
  });
});
