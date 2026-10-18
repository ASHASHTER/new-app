/**
 * Nutrel State Management Store
 * Handles user profile, food logging diary, educational progress, social challenges, and AI conversations.
 * Persists seamlessly to localStorage with data export and deletion support.
 */

import { FOODS } from '../data/foods.js';
import { calculateDailySummary } from '../engine/calculator.js';

const STORAGE_KEY = 'nutrel_app_state_v1';

const DEFAULT_PROFILE = {
  displayName: 'Priya',
  ageBand: '26-35',
  sex: 'female',
  activity: 'moderate',
  weightKg: 62,
  heightCm: 165,
  diet: 'Vegetarian',
  wellnessGoal: 'Boost energy and improve digestion',
  locale: 'en-IN',
  timeZone: 'Asia/Kolkata',
  onboarded: true
};

const INITIAL_LOGS = [
  {
    id: 'log_seed_1',
    food: FOODS.find(f => f.id === 'food_roti_wheat') || FOODS[3],
    quantity_grams: 70,
    portionName: '2 Medium Rotis (70g)',
    meal_type: 'lunch',
    consumed_at: new Date().toISOString(),
    user_local_date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'log_seed_2',
    food: FOODS.find(f => f.id === 'food_toor_dal_cooked') || FOODS[0],
    quantity_grams: 150,
    portionName: '1 Standard Katori (150g)',
    meal_type: 'lunch',
    consumed_at: new Date().toISOString(),
    user_local_date: new Date().toISOString().split('T')[0]
  },
  {
    id: 'log_seed_3',
    food: FOODS.find(f => f.id === 'food_curd_dahi') || FOODS[7],
    quantity_grams: 150,
    portionName: '1 Standard Katori (150g)',
    meal_type: 'lunch',
    consumed_at: new Date().toISOString(),
    user_local_date: new Date().toISOString().split('T')[0]
  }
];

const INITIAL_CHALLENGES = [
  {
    id: 'ch_fibre',
    title: '7-Day Fibre Explorer',
    description: 'Reach at least 25g of dietary fibre daily using whole grains, legumes, or whole fruits.',
    icon: '🌾',
    durationDays: 7,
    currentDay: 4,
    participants: 128,
    isJoined: true,
    isCompleted: false,
    progressPercent: 57
  },
  {
    id: 'ch_variety',
    title: 'Plant Variety 20+',
    description: 'Consume 20 different plant foods (veggies, dals, grains, nuts, herbs) across the week for gut diversity.',
    icon: '🥗',
    durationDays: 7,
    currentDay: 3,
    participants: 342,
    isJoined: true,
    isCompleted: false,
    progressPercent: 65
  },
  {
    id: 'ch_curiosity',
    title: 'Nutrition Curiosity Streak',
    description: 'Complete 1 bite-sized lesson or knowledge mini-game each day.',
    icon: '💡',
    durationDays: 5,
    currentDay: 2,
    participants: 89,
    isJoined: false,
    isCompleted: false,
    progressPercent: 0
  },
  {
    id: 'ch_hydration',
    title: 'Mindful Morning Hydration',
    description: 'Drink 500ml water or herbal chaas first thing upon waking for 5 consecutive days.',
    icon: '💧',
    durationDays: 5,
    currentDay: 5,
    participants: 215,
    isJoined: false,
    isCompleted: true,
    progressPercent: 100
  }
];

const INITIAL_FRIENDS = [
  {
    id: 'fr_1',
    name: 'Meera S.',
    avatar: '👩🏽',
    streak: 6,
    badge: 'Reached Daily Fibre Goal',
    permissions: {
      shareFoodLogs: false,
      shareNutrientCharts: true,
      shareStreaks: true,
      shareWeight: false
    },
    sharedSummary: {
      mealsCount: 3,
      recentMealSnippet: 'Dal Tadka, Roti, and Sprouted Moong Salad',
      caloriesEst: '~1,780 kcal',
      proteinGrams: '58g',
      fibreGrams: '29g',
      waterLiters: '2.4L',
      topNutrient: 'Dietary Fibre (116% of target)',
      habitHighlight: 'Completed 20-min evening walk'
    }
  },
  {
    id: 'fr_2',
    name: 'Arjun K.',
    avatar: '👨🏽',
    streak: 4,
    badge: 'Completed Iron & Lemon Lesson',
    permissions: {
      shareFoodLogs: false,
      shareNutrientCharts: false,
      shareStreaks: true,
      shareWeight: false
    },
    sharedSummary: {
      habitHighlight: 'Hydration streak active (4 days)'
    }
  },
  {
    id: 'fr_3',
    name: 'Rahul V.',
    avatar: '🧔🏽',
    streak: 8,
    badge: 'Plant Variety Champion',
    permissions: {
      shareFoodLogs: true,
      shareNutrientCharts: true,
      shareStreaks: true,
      shareWeight: false
    },
    sharedSummary: {
      mealsCount: 2,
      recentMealSnippet: 'Millets Khichdi, Palak Paneer & Curd',
      caloriesEst: '~1,920 kcal',
      proteinGrams: '64g',
      fibreGrams: '27g',
      waterLiters: '2.8L',
      topNutrient: 'Plant Iron (105% of target)',
      habitHighlight: 'Logged 18 unique plant species this week'
    }
  }
];

class Store {
  constructor() {
    this.listeners = new Set();
    this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = {
          profile: { ...DEFAULT_PROFILE, ...(parsed.profile || {}) },
          foodLogs: parsed.foodLogs || INITIAL_LOGS,
          quizHistory: parsed.quizHistory || {},
          challenges: parsed.challenges || INITIAL_CHALLENGES,
          friends: parsed.friends || INITIAL_FRIENDS,
          aiMessages: parsed.aiMessages || [
            {
              id: 'msg_welcome',
              sender: 'assistant',
              text: 'Namaste! I am Nutrel, your grounded AI nutrition assistant. Ask me anything about Indian foods, meal combinations, or what your logged lunch provides!',
              sources: [{ label: 'Nutrel Nutrition Database', type: 'system' }],
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ],
          privacy: {
            shareFoodLogs: false,
            shareNutrientCharts: false,
            shareStreaks: true,
            shareWeight: false,
            allowFriendRequests: true,
            ...(parsed.privacy || {})
          }
        };
        return;
      }
    } catch (e) {
      console.warn('Failed to parse saved state, resetting to defaults', e);
    }

    this.state = {
      profile: { ...DEFAULT_PROFILE },
      foodLogs: [...INITIAL_LOGS],
      quizHistory: {},
      challenges: [...INITIAL_CHALLENGES],
      friends: [...INITIAL_FRIENDS],
      aiMessages: [
        {
          id: 'msg_welcome',
          sender: 'assistant',
          text: 'Namaste! I am Nutrel, your grounded AI nutrition assistant. Ask me anything about Indian foods, meal combinations, or what your logged lunch provides!',
          sources: [{ label: 'Nutrel Nutrition Database', type: 'system' }],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      privacy: {
        shareFoodLogs: false,
        shareNutrientCharts: false,
        shareStreaks: true,
        shareWeight: false,
        allowFriendRequests: true
      }
    };
    this.persist();
  }

  persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Error saving state', e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  // Profile Actions
  updateProfile(updates) {
    this.state.profile = { ...this.state.profile, ...updates };
    this.persist();
  }

  // Food Log Actions
  addFoodLog(entry) {
    const newLog = {
      id: 'log_' + Date.now(),
      consumed_at: new Date().toISOString(),
      user_local_date: new Date().toISOString().split('T')[0],
      ...entry
    };
    this.state.foodLogs.unshift(newLog);
    this.persist();
    return newLog;
  }

  deleteFoodLog(id) {
    this.state.foodLogs = this.state.foodLogs.filter(item => item.id !== id);
    this.persist();
  }

  getTodayLogs() {
    const today = new Date().toISOString().split('T')[0];
    return this.state.foodLogs.filter(log => log.user_local_date === today);
  }

  getTodaySummary() {
    const todayLogs = this.getTodayLogs();
    return calculateDailySummary(todayLogs, this.state.profile);
  }

  // Quiz & Learning Actions
  recordQuizResult(quizId, isCorrect) {
    this.state.quizHistory[quizId] = {
      completed: true,
      isCorrect,
      completedAt: new Date().toISOString()
    };
    this.persist();
  }

  // AI Chat Actions
  addAiMessage(msg) {
    this.state.aiMessages.push({
      id: 'msg_' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...msg
    });
    this.persist();
  }

  clearAiMessages() {
    this.state.aiMessages = [];
    this.persist();
  }

  // Privacy & Sharing Actions
  updatePrivacy(updates) {
    this.state.privacy = { ...this.state.privacy, ...updates };
    this.persist();
  }

  // Challenges Actions
  toggleJoinChallenge(challengeId) {
    const ch = this.state.challenges.find(c => c.id === challengeId);
    if (ch) {
      ch.isJoined = !ch.isJoined;
      if (ch.isJoined && ch.progressPercent === 0) {
        ch.progressPercent = 15;
      }
      this.persist();
    }
  }

  updateChallengeProgress(challengeId, percent) {
    const ch = this.state.challenges.find(c => c.id === challengeId);
    if (ch) {
      ch.progressPercent = Math.min(Math.max(percent, 0), 100);
      if (ch.progressPercent === 100) {
        ch.isCompleted = true;
        ch.isJoined = false;
      }
      this.persist();
    }
  }

  completeChallenge(challengeId) {
    const ch = this.state.challenges.find(c => c.id === challengeId);
    if (ch) {
      ch.isCompleted = true;
      ch.isJoined = false;
      ch.progressPercent = 100;
      this.persist();
    }
  }

  // Privacy Enforced Friend View
  // Enforces that food logs, weight, and personal nutrition charts remain private by default
  getFriendSharedView(friendId) {
    const friend = this.state.friends.find(f => f.id === friendId);
    if (!friend) return null;

    const perms = friend.permissions || {
      shareFoodLogs: false,
      shareNutrientCharts: false,
      shareStreaks: true,
      shareWeight: false
    };

    return {
      id: friend.id,
      name: friend.name,
      avatar: friend.avatar,
      streak: perms.shareStreaks ? friend.streak : null,
      badge: perms.shareStreaks ? friend.badge : 'Nutrel Member',
      sharedSummary: {
        mealsCount: perms.shareFoodLogs ? friend.sharedSummary?.mealsCount : null,
        recentMealSnippet: perms.shareFoodLogs ? friend.sharedSummary?.recentMealSnippet : null,
        caloriesEst: perms.shareNutrientCharts ? friend.sharedSummary?.caloriesEst : null,
        proteinGrams: perms.shareNutrientCharts ? friend.sharedSummary?.proteinGrams : null,
        fibreGrams: perms.shareNutrientCharts ? friend.sharedSummary?.fibreGrams : null,
        waterLiters: perms.shareNutrientCharts ? friend.sharedSummary?.waterLiters : null,
        topNutrient: perms.shareNutrientCharts ? friend.sharedSummary?.topNutrient : null,
        habitHighlight: perms.shareStreaks ? friend.sharedSummary?.habitHighlight : 'Active habit member'
      },
      permissions: { ...perms }
    };
  }

  // Privacy & Data Rights (GDPR & DPDP compliance)
  exportUserData() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `nutrel_data_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  resetAllData() {
    localStorage.removeItem(STORAGE_KEY);
    this.loadState();
  }
}

export const store = new Store();
