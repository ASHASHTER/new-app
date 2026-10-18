# Product Requirements Document (PRD)

## AI-Powered Nutrition Education, Tracking & Social Wellness App

**Status:** Draft v1.0\
**Date:** 2026-10-17\
**Product name:** Nutrel
**Tagline:** Understand your food. Nutrel your life.
**Name definition:** A coined brand name inspired by nutrition and everyday wellbeing; its meaning is defined by the product’s clear, approachable nutrition guidance.\
**Product type:** Mobile-first consumer wellness application\
**Initial market hypothesis:** India-first, with support for everyday
Indian meals and room to expand internationally

------------------------------------------------------------------------

## 1. Executive Summary

The product helps people understand what their body needs, why nutrients
matter, what their food provides, and how to build healthier eating
habits. It combines approachable nutrition education, personalized
reference targets, daily food logging, nutrient tracking, an AI
food-information assistant, bite-sized learning games, and an optional
friends/challenges experience.

The product is not intended to diagnose deficiencies, treat medical
conditions, or replace a registered dietitian or healthcare
professional.

### Product promise

**Understand your body. Learn what your food does. Build healthier
habits---one meal at a time.**

### Core product loop

Learn → Eat → Track → Understand → Improve → Repeat.

------------------------------------------------------------------------

## 2. Problem Statement

Many people want to eat healthier but: - Do not understand what
nutrients such as protein, carbohydrates, fats, iron, magnesium,
calcium, fibre, and vitamins do. - Find conventional calorie trackers
number-heavy, repetitive, or difficult to interpret. - Do not know how
to connect the food they eat with their body's needs. - Need practical
suggestions that reflect their food preferences, culture, budget, and
lifestyle. - May learn better through short games, explanations,
feedback, and social encouragement.

The product will test whether combining understandable education with a
useful food diary and low-pressure gamification improves engagement and
nutrition knowledge compared with tracking alone.

------------------------------------------------------------------------

## 3. Goals and Non-Goals

### Goals

1.  Teach nutrition in plain language using practical analogies.
2.  Explain relevant daily nutrient requirements and how they are
    estimated.
3.  Let users log foods and view estimated nutrient contributions.
4.  Explain what a logged meal contributes using sourced
    food-composition data.
5.  Answer food and nutrition questions with an AI assistant grounded in
    vetted data.
6.  Encourage learning and healthy habits through mini-games and
    optional friend challenges.
7.  Provide privacy controls and safe, non-judgmental wellness guidance.
8.  Validate repeat usage, learning value, and willingness to pay before
    expanding scope.

### Non-goals for the initial MVP

-   Diagnosing nutrient deficiencies or other medical conditions.
-   Replacing clinical care or dietitian services.
-   Prescribing supplements or treatment.
-   Automatically generating rigid medical diets.
-   Medical-grade nutrient absorption estimates.
-   Public leaderboards for weight, calorie restriction, or body
    measurements.
-   Social feeds, wearables, grocery ordering, and complex photo-based
    meal recognition at launch.
-   Guaranteeing that a food or diet prevents or cures disease.

------------------------------------------------------------------------

## 4. Target Users

### Primary initial audience

Everyday health-conscious beginners who want to understand food and
improve their habits without needing advanced nutrition knowledge.

Typical needs: - Plain-language explanations. - Familiar and affordable
food examples. - Quick, low-friction food logging. - A clear view of
nutrients rather than only calories. - Encouraging suggestions rather
than guilt or strict rules.

### Secondary audiences for later phases

-   Fitness and muscle-building enthusiasts.
-   Students and young adults.
-   Families and caregivers.
-   Users following vegetarian, vegan, or other dietary preferences.
-   Users seeking more advanced nutrition education.

### Initial market hypothesis

Launch with Indian foods and recipes (for example, idli, dosa, sambar,
dal, rice, roti, paneer, tofu, eggs, vegetables, and regional dishes),
while designing the data model to support international food datasets.

------------------------------------------------------------------------

## 5. Product Principles

1.  **Teach the why first:** The first experience explains body needs
    and nutrient functions before asking users to interpret numbers.
2.  **Evidence before eloquence:** Nutrient calculations come from
    structured, sourced food data; AI explains the results rather than
    inventing nutrient values.
3.  **Personalized but cautious:** Targets are estimates based on
    appropriate reference guidance and available user details.
4.  **No shame:** Do not label individual foods or users as "bad."
    Reward learning, variety, consistency, and informed choices.
5.  **Transparent uncertainty:** Display serving assumptions, estimates,
    and missing data.
6.  **Privacy by default:** Food logs and health-related details are
    private unless the user explicitly chooses to share selected
    information.
7.  **Accessible learning:** Use concise language, examples, accessible
    contrast, and interactions that do not depend on color alone.
8.  **Incremental delivery:** Validate the core food-learning loop
    before building a broad social platform.

------------------------------------------------------------------------

## 6. Information Architecture

Recommended bottom navigation: 1. **Home** --- daily overview, meals,
nutrient progress, and one practical insight. 2. **Learn** --- body
requirements, nutrient explainers, lessons, and games. 3. **Log Food**
--- prominent central action to add a meal. 4. **AI** --- nutrition
question-and-answer assistant. 5. **Connect** --- friends, invitations,
achievements, and group challenges.

### First-time user journey

1.  Welcome and explain the app's purpose.
2.  Provide clear consent and privacy information.
3.  Collect only necessary profile details and preferences.
4.  Explain that targets are estimates and not diagnoses.
5.  Introduce the "What your body needs and why" page.
6.  Show a nutrient card and let the user explore its function, sources,
    and a short quiz.
7.  Guide the user through logging their first meal.
8.  Show estimated nutrient contributions and explain the data/portion
    assumptions.
9.  Offer an optional AI question or learning game.
10. Ask for feedback after the user has experienced the core value.

Returning users should land on Home with today's logged meals, a
readable summary, and a single useful next action.

------------------------------------------------------------------------

## 7. Functional Requirements

Priority key: **P0** = required for MVP; **P1** = next release; **P2** =
later.

### 7.1 Onboarding and profile

-   **FR-001 (P0):** Users can create an account and sign in securely.
-   **FR-002 (P0):** Users can provide relevant profile information for
    nutrition reference estimates, such as age or age range, and other
    inputs required by the selected guideline.
-   **FR-003 (P0):** Users can set dietary preferences, food exclusions,
    language preference, and broad wellness goal.
-   **FR-004 (P0):** Users can review, correct, and delete their profile
    data.
-   **FR-005 (P0):** The app explains why each sensitive input is
    requested and avoids collecting unnecessary data.
-   **FR-006 (P0):** The app distinguishes general wellness guidance
    from medical advice and offers an appropriate path for users with
    special clinical needs.

### 7.2 Body requirements and nutrition education

-   **FR-010 (P0):** The first education experience explains what the
    body needs and why, in simple language.
-   **FR-011 (P0):** Each nutrient page includes its function, why it
    matters, common food sources, units, applicable reference intake,
    and a short knowledge check.
-   **FR-012 (P0):** Initial nutrient set includes protein,
    carbohydrates, fats, fibre, iron, calcium, magnesium, and selected
    vitamins/minerals supported by the data source.
-   **FR-013 (P0):** Content avoids unsupported claims such as a food
    curing a condition or automatically increasing energy.
-   **FR-014 (P0):** Daily reference targets are tied to
    age/sex/life-stage or other factors where required by the chosen
    authoritative standard; the source and date/version are stored.
-   **FR-015 (P1):** Users can browse all supported nutrients, compare
    food sources, and bookmark lessons.
-   **FR-016 (P1):** Educational content can be reviewed and updated by
    an authorized content editor.

### 7.3 Food catalogue and food logging

-   **FR-020 (P0):** Users can search and select foods from a structured
    catalogue.
-   **FR-021 (P0):** Users can specify a quantity and serving unit, with
    a clear conversion to the nutrient data's basis.
-   **FR-022 (P0):** Food records distinguish raw, cooked, drained,
    branded, and prepared variants where relevant.
-   **FR-023 (P0):** Users can log a food under a meal and date/time,
    edit it, or delete it.
-   **FR-024 (P0):** Users can create a meal from ingredients and
    quantities, with calculated totals.
-   **FR-025 (P0):** Each food entry retains data source, source
    identifier, units, and provenance.
-   **FR-026 (P0):** Missing nutrient values are shown as
    unavailable---not silently treated as zero.
-   **FR-027 (P1):** Users can save frequent foods and meals for faster
    logging.
-   **FR-028 (P1):** Photo-assisted meal logging may suggest foods and
    portions, but the user must confirm or correct the estimate before
    saving.

### 7.4 Nutrient calculation and dashboard

-   **FR-030 (P0):** The calculation engine estimates each nutrient
    contribution from food quantity and source values.
-   **FR-031 (P0):** The app aggregates logged contributions by day and
    nutrient.
-   **FR-032 (P0):** The Home dashboard displays logged intake against
    applicable reference targets and indicates incomplete logging.
-   **FR-033 (P0):** Users can inspect the foods contributing to a
    nutrient total.
-   **FR-034 (P0):** The app explains that intake estimates are not a
    measurement of nutrient absorption or a diagnosis of deficiency.
-   **FR-035 (P0):** Users can view a daily and weekly summary.
-   **FR-036 (P1):** The app highlights recurring patterns and suggests
    a small number of realistic changes.
-   **FR-037 (P1):** The app can recalculate summaries if a source
    record or recipe calculation is corrected, while preserving the
    original food-log history.
-   **FR-038 (P1):** Users can export or delete their food diary.

### 7.5 AI nutrition assistant

-   **FR-040 (P0):** Users can ask questions about foods, nutrients,
    meals, labels, and general nutrition concepts.
-   **FR-041 (P0):** When a question depends on food composition, the
    backend retrieves relevant structured data before generating the
    answer.
-   **FR-042 (P0):** The assistant distinguishes sourced facts,
    estimates, and general explanations.
-   **FR-043 (P0):** The assistant asks for portion size or ingredients
    when needed rather than pretending to know them.
-   **FR-044 (P0):** The assistant does not diagnose deficiencies,
    prescribe treatment, or recommend supplements as a substitute for
    clinical evaluation.
-   **FR-045 (P0):** The assistant handles high-risk medical questions
    with safe boundaries and directs users to qualified care where
    appropriate.
-   **FR-046 (P0):** API keys and privileged prompts remain server-side.
-   **FR-047 (P1):** Users can ask the assistant to explain a logged
    meal or a nutrient progress card.
-   **FR-048 (P1):** Users can give feedback on answers and report
    inaccurate or unsafe responses.
-   **FR-049 (P1):** Conversation retention is minimized and disclosed;
    users can clear conversations where supported.

### 7.6 Games and learning

-   **FR-050 (P0):** MVP includes at least three game formats: food
    comparison, balanced-plate building, and nutrition myth/fact.
-   **FR-051 (P0):** Every quiz answer has a reviewed explanation and
    appropriate source.
-   **FR-052 (P0):** The app records completed lessons, answers, and
    learning progress.
-   **FR-053 (P0):** Rewards emphasize learning and healthy habits, not
    calorie restriction or weight loss.
-   **FR-054 (P1):** The app adapts game difficulty to prior
    performance.
-   **FR-055 (P1):** The app offers short daily challenges and learning
    streaks without punishing missed days.

### 7.7 Connect and social features

-   **FR-060 (P1):** Users can find or invite friends through
    privacy-respecting mechanisms.
-   **FR-061 (P1):** Friend connections require acceptance and can be
    removed.
-   **FR-062 (P1):** Users can block or report another user.
-   **FR-063 (P1):** Users choose what to share; detailed food logs,
    body measurements, and health goals are private by default.
-   **FR-064 (P1):** Users can join group learning or healthy-habit
    challenges.
-   **FR-065 (P1):** Social rankings must not reward restriction, low
    weight, or low calorie intake.
-   **FR-066 (P1):** Users can leave challenges and control social
    notifications.

### 7.8 Administration and content operations

-   **FR-070 (P0):** Authorized maintainers can update food data
    mappings and educational content through a controlled process.
-   **FR-071 (P0):** Changes to nutrient references and target logic are
    versioned and auditable.
-   **FR-072 (P1):** Content review status, reviewer, source, and review
    date are recorded.
-   **FR-073 (P1):** The team can review aggregated product events
    without unnecessary access to identifiable health data.

------------------------------------------------------------------------

## 8. Non-Functional Requirements

-   **Security:** Enforce server-side authorization and row-level access
    controls for user-owned data.
-   **Privacy:** Collect the minimum necessary data; provide clear
    consent, retention, deletion, and sharing controls.
-   **Reliability:** Nutrient calculations must be deterministic and
    unit-tested.
-   **Performance:** Common screens should feel responsive on typical
    supported mobile connections; establish and measure concrete latency
    budgets during implementation.
-   **Accessibility:** Support screen readers, readable text, sufficient
    contrast, and non-color-only status cues.
-   **Localization:** Design for localization, including local food
    names, serving units, and regional dishes.
-   **Maintainability:** Keep food data, target logic, educational
    content, and AI prompts separate from UI code.
-   **Observability:** Log operational failures and AI safety incidents
    without logging unnecessary sensitive content.
-   **Portability:** Avoid making the core nutrition calculations
    dependent on a single AI vendor.

------------------------------------------------------------------------

## 9. Data and Content Strategy

### Food data

Use appropriately licensed, documented food-composition sources.
Potential sources include USDA FoodData Central and suitable Indian
food-composition references. Confirm license terms, coverage, update
cadence, and attribution requirements before production use.

For each food, retain: - Stable identifier and display name. -
Regional/local names and language variants where useful. - Food
state/preparation. - Serving units and gram conversion. - Nutrient
values, units, and per-100-g or other explicit basis. - Source
identifier, license/provenance, and version. - Missingness/quality
flags.

### Reference requirements

Select authoritative dietary reference standards appropriate to the
intended market and population. Store source/version, unit, population
group, and applicable conditions. Do not present one universal target
for every user.

### Educational content

Each nutrient lesson should cover: 1. Plain-language analogy. 2. What it
does in the body. 3. Why it matters in daily life. 4. Food sources. 5.
Factors affecting intake or absorption where relevant. 6. Common
misconceptions. 7. A short quiz. 8. Source, reviewer, and review date.

------------------------------------------------------------------------

## 10. Safety, Trust, and Compliance

-   The app is a general wellness and educational product, not a
    diagnostic device.
-   Do not infer a deficiency or disease from a food diary.
-   Avoid aggressive calorie goals, shame-based language, and
    restrictive reward systems.
-   Provide additional caution for minors, pregnancy, eating-disorder
    risk, and known medical conditions.
-   Use qualified nutrition review for targets and educational claims.
-   Establish an AI safety test suite before launch.
-   Minimize collection and retention of sensitive data.
-   Review applicable privacy, consumer protection, and health-related
    requirements in each launch market, including Indian data-protection
    obligations if operating in India.
-   Provide a way to report incorrect content and unsafe AI responses.

------------------------------------------------------------------------

## 11. Analytics and Success Metrics

### Activation

-   Percentage of new users who finish onboarding.
-   Percentage who view a nutrient lesson.
-   Percentage who log their first meal.

### Engagement

-   Weekly active users.
-   Meals logged per active user.
-   Percentage using a learning game.
-   AI questions per active user and helpfulness rating.

### Retention

-   Day-7 and Day-30 retention.
-   Repeat food logging.
-   Repeat lesson/game completion.

### Learning outcomes

-   Change in accuracy on comparable nutrition questions.
-   Lesson completion and later recall.
-   User-reported confidence in making food choices.

### Trust and safety

-   Food-estimate correction rate.
-   AI answer feedback and report rate.
-   Unresolved data-quality issues.
-   Privacy incidents and authorization failures.

### Business

-   Free-to-paid conversion after a value proposition is validated.
-   Subscription retention and cancellation reasons.
-   User acquisition and support costs.

Do not optimize only for time in app, calorie logging volume, or game
streaks. Validate that users learn and find the product useful.

------------------------------------------------------------------------

## 12. MVP Acceptance Criteria

The MVP is ready for a controlled pilot when: 1. A user can create,
edit, and delete their profile. 2. The body-requirements page explains
supported nutrients in plain language with reviewed sources. 3.
Applicable target values are traceable to a selected reference standard
and version. 4. A user can search a food, specify a quantity, and log it
to a date and meal. 5. Nutrient totals match independently verified test
calculations within defined rounding rules. 6. Missing data is clearly
indicated and not mistaken for zero. 7. The dashboard shows daily
totals, targets, and contributing foods. 8. The AI assistant answers
supported questions using retrieved data and follows safety tests. 9.
Three game formats work and display reviewed explanations. 10. User
records are inaccessible to other users without explicit sharing
permission. 11. Users can correct and delete food logs and account data
according to the published policy. 12. A small pilot demonstrates that
target users can understand the core experience and complete key tasks.

------------------------------------------------------------------------

## 13. Risks and Mitigations

  -----------------------------------------------------------------------
  Risk                                Mitigation
  ----------------------------------- -----------------------------------
  Inaccurate food or portion data     Use provenance, explicit
                                      preparation states, user
                                      corrections, and quality flags

  AI invents nutrition values         Retrieve structured data and
                                      calculate deterministically before
                                      generating explanations

  Users interpret estimates as        Clear language, safe boundaries,
  diagnoses                           and professional review

  Too many features delay launch      Ship the core learning-and-logging
                                      loop first

  Users find tracking tedious         Search, saved meals, sensible
                                      defaults, and optional
                                      photo-assisted logging later

  Social comparison becomes unhealthy Reward learning and consistency,
                                      not restriction or body metrics

  Sensitive data exposure             Least-privilege access, row-level
                                      security, consent, deletion, and
                                      security testing

  Poor retention                      Test whether games and personalized
                                      insights create repeat value
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 14. Suggested Roadmap

### Phase 0 --- Discovery and prototype

Interview potential users, test the first-page education concept, map
the user journey, and prototype the core screens.

### Phase 1 --- Core MVP

Onboarding, body-requirements education, sourced food catalogue, manual
food logging, nutrient calculations, and daily dashboard.

### Phase 2 --- Learning and AI

Three games, reviewed educational content, grounded AI Q&A, and
contextual meal explanations.

### Phase 3 --- Social pilot

Friend requests, optional sharing, and group learning challenges.

### Phase 4 --- Optimization

Improve logging speed, local food coverage, personalization,
accessibility, retention, and monetization based on pilot evidence.

------------------------------------------------------------------------

## 15. Open Decisions

Before implementation, decide: - Initial launch platform: Android, iOS,
web, or cross-platform. - Initial languages and regional food
coverage. - Which authoritative reference standards will drive target
calculations. - Which food datasets and licenses are suitable. - Age
eligibility and whether minors are supported. - Whether photo-based meal
recognition is included in the first release. - Privacy, retention, and
account-deletion policy. - Subscription price and premium feature
boundaries. - Nutrition reviewer and content approval process.

**Recommended next step:** build a clickable prototype and validate the
first-time user journey with target users before committing to the
complete feature set.


## Brand identity — Nutrel

### Brand personality
Calm, clear, encouraging, modern, inclusive, and trustworthy. Nutrel should feel like a friendly nutrition guide rather than a clinical dashboard or intense fitness tracker.

### Core colour palette

| Token | Hex | Primary use |
|---|---|---|
| Warm beige | `#F2E9D8` | Main background, onboarding, calm learning surfaces |
| Muted sage | `#71866B` | Logo, primary buttons, navigation, headings and progress |
| Muted teal | `#6F9CA3` | Secondary accents, links and AI assistant highlights |
| White | `#FFFFFF` | Cards and content surfaces |
| Warm dark grey | `#4F5049` | Body text when needed for accessible contrast |

Keep the interface visually simple: beige, sage, and muted teal are the only brand colours; white and a dark neutral support readability. Do not assign a unique colour to every nutrient. Use icons, labels, typography, and clear units to distinguish nutrients. Do not use colour alone to communicate adequacy or deficiency. Verify all text and control combinations against WCAG contrast requirements and darken text variants when needed.

### Logo direction
Use a simple, flat, leaf-inspired mark with minimal shapes and the readable wordmark **Nutrel**. Avoid complex gradients, excessive detail, and extra colours. Prepare icon-only and wordmark variants for app icon, splash screen, and in-app use. Generated artwork is a concept; final production assets should be redrawn/exported as suitable vector and raster formats. Brand and trademark availability must be checked before launch.
