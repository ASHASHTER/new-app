# Technical Design Document (TDD)

## AI-Powered Nutrition Education, Tracking & Social Wellness App

**Status:** Draft v1.0\
**Date:** 2026-10-17\
**Related document:** `PRD.md`\
**Product name:** Nutrel
**Tagline:** Understand your food. Nutrel your life.
**Name definition:** A coined brand name inspired by nutrition and everyday wellbeing.

------------------------------------------------------------------------

## 1. Purpose

This document proposes a maintainable technical architecture for the
nutrition education and tracking product described in `PRD.md`. It
covers system boundaries, components, data structures, calculation
rules, API contracts, security, testing, deployment, and implementation
order.

This is a proposed design, not a record of an already implemented
system. Specific vendor choices can change, but the separation of
nutrition data, calculations, target logic, AI explanations, and social
permissions should remain.

------------------------------------------------------------------------

## 2. Architecture Decisions

### Proposed MVP stack

-   **Client:** FlutterFlow for an early visual prototype; generated
    Flutter code or a conventional Flutter/React Native client may be
    used as the product matures.
-   **Backend/database:** Supabase (PostgreSQL, Auth, Row Level
    Security, Storage where needed, and server-side Edge Functions or a
    separate API service).
-   **Nutrition data:** Versioned food-composition data from suitable
    licensed sources; include Indian foods and recipes as a deliberate
    data workstream.
-   **AI:** Server-side integration with an LLM API, using retrieval
    from curated educational content and structured food records.
-   **Analytics/monitoring:** Privacy-conscious product analytics,
    application logs, error monitoring, and AI safety feedback.
-   **Source control and delivery:** Git repository, code review,
    automated tests, staging environment, and controlled production
    releases.

### Architecture principles

1.  The client is not authoritative for nutrient calculations,
    permissions, or AI safety.
2.  Nutrition amounts are computed by deterministic backend logic.
3.  The AI model explains data; it is not the source of truth for
    nutrient composition.
4.  All source data and target standards are versioned.
5.  Sensitive user data is private by default.
6.  Social functionality is isolated from private food logs.
7.  Backend APIs validate every input and authorize every record access.

------------------------------------------------------------------------

## 3. High-Level System Diagram

``` mermaid
flowchart TD
    Client["Mobile / Web Client"] --> Auth["Authentication"]
    Client --> API["Backend API / Edge Functions"]
    Auth --> API

    API --> Profile["Profile & Preferences"]
    API --> FoodLog["Food Logging Service"]
    API --> Calc["Nutrient Calculation Engine"]
    API --> Targets["Reference Target Service"]
    API --> Catalog["Food & Recipe Catalogue"]
    API --> Education["Education & Game Content"]
    API --> Social["Connect / Challenges"]
    API --> AI["AI Orchestration Service"]

    FoodLog --> DB[("PostgreSQL")]
    Profile --> DB
    Catalog --> DB
    Education --> DB
    Social --> DB
    Targets --> DB
    Calc --> DB
    AI --> Retrieval["Curated Content + Structured Data Retrieval"]
    Retrieval --> DB
    AI --> Model["LLM API"]

    API --> Observability["Logs, Metrics, Safety Feedback"]
```

### Request boundaries

-   Client → backend: authenticated user actions and queries.
-   Backend → database: validated reads/writes subject to authorization.
-   Backend → AI provider: only the minimum context needed for the
    specific question.
-   Backend → nutrition catalogue: structured, versioned nutrient data.
-   Backend → analytics: minimal event data; avoid sending unnecessary
    food diary content.

------------------------------------------------------------------------

## 4. Core Modules

### 4.1 Authentication and profile

Responsibilities: - Sign up/sign in and session management. - Profile,
dietary preferences, locale, and broad goals. - Consent and account
deletion. - Age-appropriate handling and any eligibility restrictions.

### 4.2 Food catalogue

Responsibilities: - Search foods by name, local name, category,
preparation, and supported language. - Return serving options and
food-data provenance. - Represent raw, cooked, drained, branded, and
recipe foods distinctly. - Mark missing nutrient values as unknown.

### 4.3 Food diary

Responsibilities: - Create, edit, and delete food entries. - Attach
entries to a user, meal, date/time, quantity, and food/recipe. - Support
saved meals in a later iteration. - Preserve sufficient source/version
information to explain prior calculations.

### 4.4 Nutrient calculation engine

Responsibilities: - Convert user portions to a canonical mass or
validated serving basis. - Calculate nutrient contributions
deterministically. - Aggregate entries by user-local date and
nutrient. - Apply documented rounding rules only for display. -
Distinguish zero from missing/unavailable data.

### 4.5 Reference target service

Responsibilities: - Select appropriate targets from a versioned
reference table. - Apply only supported eligibility rules. - Record the
reference standard/version and effective date. - Return explanatory
metadata with the target. - Fail safely if required profile information
or a supported reference is unavailable.

### 4.6 Education and games

Responsibilities: - Serve reviewed lessons, nutrient cards, quizzes, and
explanations. - Store source citations, content version, reviewer, and
review date. - Record attempts and learning progress. - Avoid scoring
mechanics that reward restriction or harmful behavior.

### 4.7 AI orchestration

Responsibilities: - Classify the user's request. - Retrieve relevant
foods, nutrient values, and reviewed educational content. - Call
deterministic calculations when quantitative answers are needed. - Pass
a compact, relevant context to the LLM. - Apply safety instructions and
validate the returned response. - Record minimal telemetry and allow
user feedback.

### 4.8 Connect/social

Responsibilities: - Manage friend requests and accepted connections. -
Enforce privacy preferences on every shared item. - Support block/report
and challenge membership. - Share only explicit achievements or
user-selected metrics. - Keep private food logs and body measurements
inaccessible by default.

------------------------------------------------------------------------

## 5. Suggested Data Model

Use UUID primary keys, UTC timestamps for stored instants, and explicit
user-local time-zone handling for diary days. Use numeric/decimal types
for nutrient amounts and quantities rather than binary floating-point
types in the authoritative calculation layer.

### 5.1 `profiles`

  -----------------------------------------------------------------------
  Field                   Type                    Notes
  ----------------------- ----------------------- -----------------------
  `user_id`               UUID PK/FK              Links to auth identity

  `display_name`          Text                    Public/display name;
                                                  optional

  `birth_date` or age     Restricted              Collect only if
  band                                            necessary; prefer
                                                  minimum required
                                                  precision

  `locale`                Text                    e.g. `en-IN`

  `time_zone`             Text                    Used for day boundaries

  `dietary_preferences`   JSONB or normalized     Validate allowed values
                          table                   

  `goals`                 JSONB or normalized     Non-clinical goal data
                          table                   

  `created_at`,           Timestamptz             Audit timestamps
  `updated_at`                                    
  -----------------------------------------------------------------------

Store sensitive profile fields separately or restrict them tightly if
this improves access control. Avoid storing data that is not needed.

### 5.2 `nutrients`

  Field               Type          Notes
  ------------------- ------------- -----------------------------------
  `id`                UUID PK       Stable identifier
  `code`              Text unique   e.g. `protein`, `iron`, `calcium`
  `name`              Text          Display label
  `canonical_unit`    Text          `g`, `mg`, `mcg`, etc.
  `description_key`   Text          Localizable content key

### 5.3 `foods`

  Field                 Type      Notes
  --------------------- --------- ------------------------------------------
  `id`                  UUID PK   Internal ID
  `source_id`           Text      External source identifier if applicable
  `source_name`         Text      Dataset/source
  `source_version`      Text      Version/date
  `name`                Text      Canonical display name
  `locale_names`        JSONB     Local names and aliases
  `preparation_state`   Text      Raw/cooked/drained/etc.
  `basis_grams`         Numeric   Usually 100 g where source supports it
  `data_quality`        Text      Reviewed/estimated/incomplete
  `license_metadata`    JSONB     Provenance and permitted usage

Create unique constraints around source identity and version where
appropriate.

### 5.4 `food_nutrients`

  Field           Type            Notes
  --------------- --------------- ---------------------------------
  `food_id`       UUID FK         Food
  `nutrient_id`   UUID FK         Nutrient
  `amount`        Numeric         Amount on defined basis
  `unit`          Text            Must map to canonical unit
  `is_missing`    Boolean         Distinguishes missing from zero
  `source_note`   Text nullable   Additional provenance

Recommended unique key: `(food_id, nutrient_id)`. Validate units and
non-negative values where applicable.

### 5.5 `serving_options`

-   `id`, `food_id`
-   `name` (e.g. one cup, one piece)
-   `grams` or validated conversion quantity
-   `source` and quality status

Serving conversions should be specific to the food and preparation;
don't assume one cup weighs the same for every food.

### 5.6 `recipes` and `recipe_ingredients`

A recipe has a name, yield/servings, preparation instructions, and
source/provenance. Each ingredient references a food and quantity.
Recipe nutrient totals should be calculated from ingredients, with
explicit treatment of yield and cooking changes when reliable data
exists. Do not imply laboratory precision for home recipes.

### 5.7 `food_logs`

-   `id` UUID PK
-   `user_id` UUID FK
-   `food_id` or `recipe_id` FK
-   `quantity_grams` Numeric nullable
-   `serving_option_id` UUID nullable
-   `quantity_servings` Numeric nullable
-   `meal_type` Text/enum
-   `consumed_at` Timestamptz
-   `user_local_date` Date or derived consistently using profile time
    zone
-   `notes` Text nullable
-   `created_at`, `updated_at`

Enforce that exactly one of `food_id` or `recipe_id` is set and that the
quantity is valid. Keep a snapshot or reproducible version link to the
nutrient data used for calculations.

### 5.8 `reference_standards`, `nutrient_targets`

Reference standards should be versioned and contain the authority,
title, jurisdiction, publication/effective date, and citation metadata.

`nutrient_targets` should include: - Standard/version FK. - Nutrient
FK. - Population eligibility dimensions (such as age band, sex/life
stage when applicable). - Amount and unit. - Target type (e.g. RDA, AI,
range, limit), not just a generic number. - Notes, source, effective
date, and review status.

Do not assume all nutrient targets are minimums. Some are ranges,
adequate intakes, or upper limits.

### 5.9 `education_content`, `quiz_questions`, `quiz_options`, `game_attempts`

Store content body/version, locale, nutrient links, references,
reviewer, publication status, correct answer, rationale, and attempt
outcome. Never rely on an LLM as the sole authority for quiz answers.

### 5.10 `ai_conversations` and `ai_messages`

If conversation persistence is enabled, store the minimum required
information, with clear retention and deletion behavior. Separate
identifiers and enforce ownership. Avoid retaining unnecessary sensitive
profile context or full logs.

### 5.11 `friendships`, `shared_achievements`, `challenges`, `challenge_members`

-   Friendship states: pending, accepted, rejected, blocked.
-   Store who initiated and timestamps.
-   Store explicit share type and visibility for achievements.
-   Keep shared summaries distinct from private food logs.
-   Enforce participant and visibility checks in the backend.

### 5.12 `audit_events` / `content_versions`

Record material changes to target logic, source datasets, and published
education content. Avoid putting sensitive food diary details into
general audit logs.

------------------------------------------------------------------------

## 6. Nutrient Calculation Rules

### 6.1 Per-food contribution

For a nutrient value stored as `amount_per_basis_grams`:

``` text
contribution = amount_per_basis_grams * consumed_grams / basis_grams
```

Example: if a verified record contains 10 g protein per 100 g, then 150
g contributes an estimated 15 g protein.

### 6.2 Unit normalization

-   Normalize each nutrient to its canonical unit before aggregation.
-   Preserve the original source unit and value for provenance.
-   Reject unknown or incompatible units rather than guessing.
-   Define and test conversions between g, mg, and mcg.
-   Use decimal arithmetic in the authoritative calculation service.

### 6.3 Aggregation

For a user and local calendar day: 1. Select the user's food entries
within that day. 2. Retrieve the food/recipe composition and version
associated with each entry. 3. Calculate each nutrient contribution. 4.
Sum known contributions by nutrient. 5. Track coverage/missingness
separately. 6. Compare with the applicable target only if enough profile
data and a supported standard exist. 7. Return totals, target metadata,
data coverage, and explanatory warnings.

### 6.4 Missing data

A missing value must not be treated as zero. The response should include
a coverage indicator, such as "iron estimate available for 4 of 5 logged
foods."

### 6.5 Recipes and cooking

-   Recipe totals are estimates based on ingredients and yield.
-   Water gain/loss and cooking effects should be modeled only where
    source data supports it.
-   Don't apply unsupported universal retention factors.
-   Allow users to correct ingredient and portion assumptions.

### 6.6 Daily targets

Target selection is a distinct service from food composition. Use
reviewed reference standards with eligibility rules. Explain that: - A
reference intake is not a personalized medical prescription. - One day's
intake does not diagnose a deficiency. - Actual needs can vary with life
stage, health conditions, and professional guidance. - Upper limits and
recommended intakes have different meanings.

### 6.7 Display

Round values for readability only at the presentation layer. Preserve
full calculation precision internally and test the chosen display rules.

------------------------------------------------------------------------

## 7. API Design

Use authenticated HTTPS APIs. Example routes are illustrative and can be
implemented as REST endpoints or equivalent typed RPC calls.

### Profile and targets

-   `GET /v1/profile`
-   `PATCH /v1/profile`
-   `GET /v1/nutrition/targets`
-   `GET /v1/nutrition/targets/{nutrientCode}`

### Food catalogue

-   `GET /v1/foods?query=...&locale=en-IN`
-   `GET /v1/foods/{foodId}`
-   `GET /v1/foods/{foodId}/servings`
-   `POST /v1/recipes`
-   `GET /v1/recipes/{recipeId}`

### Food logs and summaries

-   `POST /v1/food-logs`
-   `GET /v1/food-logs?date=YYYY-MM-DD`
-   `PATCH /v1/food-logs/{logId}`
-   `DELETE /v1/food-logs/{logId}`
-   `GET /v1/nutrition/summary?date=YYYY-MM-DD`
-   `GET /v1/nutrition/summary?from=...&to=...`

### Education and games

-   `GET /v1/education/nutrients`
-   `GET /v1/education/nutrients/{code}`
-   `GET /v1/games`
-   `POST /v1/games/{gameId}/attempts`
-   `GET /v1/learning/progress`

### AI

-   `POST /v1/ai/food-question`
-   `POST /v1/ai/meal-explanation`
-   `POST /v1/ai/feedback`
-   `DELETE /v1/ai/conversations/{conversationId}`

### Connect

-   `POST /v1/friends/requests`
-   `POST /v1/friends/requests/{requestId}/accept`
-   `DELETE /v1/friends/{friendId}`
-   `POST /v1/users/{userId}/block`
-   `POST /v1/challenges/{challengeId}/join`
-   `GET /v1/connect/feed`

Every route must verify authentication, authorization, input
constraints, rate limits where appropriate, and data minimization.

------------------------------------------------------------------------

## 8. Example API Contracts

### 8.1 Create food log

Request:

``` json
{
  "food_id": "food_uuid",
  "quantity_grams": 150,
  "meal_type": "lunch",
  "consumed_at": "2026-10-17T07:30:00Z"
}
```

Response:

``` json
{
  "food_log_id": "log_uuid",
  "status": "saved",
  "calculation_status": "available"
}
```

The example timestamps and IDs are illustrative. Validate that the food
exists, quantity is within defensible bounds, the caller owns the log,
and the timestamp is handled consistently with the user's time zone.

### 8.2 Nutrition summary

Example response:

``` json
{
  "date": "2026-10-17",
  "nutrients": [
    {
      "code": "protein",
      "intake": 15.0,
      "unit": "g",
      "target": 60.0,
      "target_type": "illustrative",
      "coverage": "complete_for_logged_foods"
    },
    {
      "code": "iron",
      "intake": 4.2,
      "unit": "mg",
      "target": null,
      "target_type": null,
      "coverage": "partial"
    }
  ],
  "disclaimer": "Estimates based on logged foods; not a diagnosis or measurement of absorption."
}
```

These values are mock data and must never be used as production target
recommendations.

### 8.3 AI question

Request:

``` json
{
  "question": "What nutrients might I get from my lunch?",
  "context": {
    "include_recent_food_logs": true
  }
}
```

The server must authenticate the user, retrieve only their authorized
records, calculate quantities with the nutrition engine, and send only
relevant context to the model. Do not trust client-supplied nutrient
values or profile facts.

Response shape:

``` json
{
  "answer": "Your logged meal is estimated to provide ...",
  "sources": [
    {
      "label": "Food composition record",
      "source_id": "source_record_id"
    }
  ],
  "uncertainties": [
    "Portion and recipe estimates may vary."
  ],
  "safety_flags": []
}
```

------------------------------------------------------------------------

## 9. AI Orchestration and Safety

### 9.1 Request flow

1.  Authenticate the user and validate the request.
2.  Classify the question (general education, food lookup, meal
    calculation, personalized question, or medical/high-risk request).
3.  Retrieve structured food data and reviewed educational content as
    needed.
4.  Run deterministic calculations for quantitative questions.
5.  Create a minimal context package with source identifiers,
    assumptions, and uncertainties.
6.  Ask the LLM to explain the retrieved results in the user's preferred
    reading level.
7.  Validate output for unsupported precision, diagnosis, dangerous
    recommendations, and missing uncertainty.
8.  Return the answer with source/estimate cues and a feedback action.
9.  Record minimal safety and quality telemetry.

### 9.2 Model behavior requirements

-   Do not invent exact nutrient amounts when no source data exists.
-   Ask for ingredients/portion size when material details are missing.
-   Distinguish general information from individualized guidance.
-   Never claim to diagnose iron deficiency or other conditions from
    logs.
-   Do not advise stopping prescribed medication or treating a condition
    with food alone.
-   Avoid supplement dosing and medical nutrition prescriptions unless
    handled under a properly reviewed, permitted workflow.
-   Escalate urgent or serious medical concerns to appropriate
    professional care.
-   Do not expose another user's data in shared or AI-generated context.

### 9.3 Evaluation

Create a versioned test set covering: - Basic nutrient facts. - Food
quantity calculations. - Indian dishes and recipe uncertainty. - Missing
data and ambiguous portions. - Allergies and dietary restrictions. -
Medical diagnosis requests. - Supplement questions. - Prompt injection
attempts. - Cross-user data-access attempts. - Unsupported claims and
hallucinated citations.

Run tests before changing models, prompts, retrieval logic, or nutrition
datasets.

------------------------------------------------------------------------

## 10. Security and Privacy

### Authentication and authorization

-   Use a managed authentication system with secure session handling.
-   Enforce Row Level Security or equivalent server-side authorization.
-   Never rely only on client-side hiding of controls.
-   Validate user ownership on every food log, conversation, and private
    record.
-   Restrict administrative roles and protect service-role secrets.

### Privacy controls

-   Collect only data necessary for stated features.
-   Explain why sensitive profile fields are requested.
-   Make social sharing opt-in and granular.
-   Do not share food logs or body measurements by default.
-   Support data export/deletion as required by policy and law.
-   Define retention for chat history, logs, analytics, and backups.
-   Do not send full profiles or full diaries to an AI provider when a
    smaller context suffices.
-   Review the terms, privacy commitments, retention controls, and
    data-processing conditions of all third-party providers.

### Abuse prevention

-   Rate-limit AI requests and friend requests.
-   Provide blocking/reporting and moderation for social content.
-   Protect against scraping and user enumeration.
-   Validate uploaded images and constrain file size/type if photo
    logging is added.
-   Keep secrets in server-side environment configuration.

------------------------------------------------------------------------

## 11. Testing Strategy

### Unit tests

-   Unit conversion.
-   Nutrient contribution calculations.
-   Recipe aggregation.
-   Target selection eligibility.
-   Missing data handling.
-   Time-zone/day-boundary calculations.
-   Reward and score logic.

### Integration tests

-   Create/edit/delete food logs.
-   Database access control.
-   Profile-to-target selection.
-   Summary recalculation.
-   AI retrieval and calculation pipeline.
-   Friend request acceptance/removal and sharing permissions.
-   Account deletion and retention workflows.

### End-to-end tests

1.  New user completes onboarding and views body-requirement lessons.
2.  User logs a food and sees updated nutrient totals.
3.  User inspects a nutrient and sees source/target context.
4.  User asks AI about a meal and receives an appropriately qualified
    response.
5.  User completes a quiz and receives an explanation.
6.  User accepts a friend request and shares only an allowed
    achievement.
7.  A second user cannot access the first user's private records.
8.  User deletes a log and the summary updates correctly.

### Data-quality tests

-   Source records include required units and provenance.
-   Nutrient values are within plausible validation ranges.
-   Missing values remain missing.
-   Duplicate imports are detected.
-   Food preparation variants are not silently merged.
-   Target standards are versioned and have review metadata.

### Release gates

-   No unresolved critical authorization failures.
-   Calculation tests pass.
-   AI safety evaluation meets agreed thresholds.
-   Content review is complete for published nutrient lessons.
-   Privacy and deletion workflows are verified.
-   Pilot feedback has been triaged.

------------------------------------------------------------------------

## 12. Deployment and Environments

Recommended environments: - **Local/development:** synthetic test data;
no production secrets. - **Staging:** representative data, safe AI
credentials/limits, QA accounts. - **Production:** least-privilege
credentials, monitoring, backup/restore plan, and controlled releases.

### CI/CD pipeline

1.  Format and static checks.
2.  Unit and integration tests.
3.  Database migration validation.
4.  Security and dependency checks.
5.  Staging deployment.
6.  End-to-end smoke tests.
7.  Manual approval for production.
8.  Post-release monitoring and rollback capability.

Keep schema migrations version-controlled. Use backward-compatible
changes where practical and test rollback/restore procedures.

------------------------------------------------------------------------

## 13. Observability

Capture operational metrics such as: - API error and latency rates. -
Food search latency and empty-result rate. - Nutrient calculation
failures. - AI request latency, token/cost use, safety flags, and user
feedback. - Failed authorization attempts. - Social request abuse
signals.

Do not log raw sensitive food diaries or complete AI prompts by default.
Where debugging requires examples, use synthetic or redacted records and
a controlled access process.

------------------------------------------------------------------------

## 14. Implementation Plan

### Milestone 0 --- Product and data decisions

-   Choose platform and first locale.
-   Select licensed food-composition sources.
-   Choose the reference standard for nutrient targets.
-   Define data privacy, age eligibility, and deletion policies.
-   Prepare reviewed nutrient lessons.

### Milestone 1 --- Core vertical slice

-   Authentication and minimal profile.
-   Nutrient education page.
-   Food catalogue with a small reviewed dataset.
-   Food logging and deterministic calculations.
-   Daily summary with provenance and missing-data indicators.

**Exit criterion:** a tester can learn about a nutrient, log a meal, and
verify the displayed calculation.

### Milestone 2 --- Learning and AI

-   Education CMS/content tables.
-   Three game formats.
-   AI orchestration, retrieval, source-aware answers, and safety test
    set.
-   Feedback/reporting.

**Exit criterion:** the app provides useful explanations grounded in the
database and passes the agreed evaluation suite.

### Milestone 3 --- Connect

-   Friend requests and permissions.
-   Challenges and shared achievements.
-   Blocking/reporting and social abuse controls.

**Exit criterion:** private food logs remain inaccessible unless the
product later implements a specific, explicit sharing feature.

### Milestone 4 --- Pilot and hardening

-   Analytics and retention experiments.
-   Accessibility and localization.
-   Security review and data deletion tests.
-   Pilot rollout and issue triage.

------------------------------------------------------------------------

## 15. Key Technical Risks

  -----------------------------------------------------------------------
  Risk                                Mitigation
  ----------------------------------- -----------------------------------
  Incomplete food composition data    Track source coverage and show
                                      missingness; do not fabricate zeros

  Incorrect portion conversion        Use food-specific serving options
                                      and let users correct portions

  Wrong target applied to a user      Version reference standards and
                                      test eligibility rules

  AI hallucination                    Retrieval-grounded responses and
                                      deterministic calculation service

  Data leak between users             Row Level Security, server
                                      authorization, and cross-account
                                      tests

  Social feature exposes health       Explicit sharing model and
  details                             private-by-default data

  Vendor lock-in                      Keep calculation, data schema, and
                                      domain logic independent of the LLM

  Cost growth                         Rate limits, caching for
                                      non-personal content, model
                                      selection, and usage monitoring

  Feature creep                       Gate each milestone on a working
                                      vertical slice and user evidence
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 16. Decisions Required Before Production

1.  Exact mobile/web framework.
2.  Food database sources, licenses, and update process.
3.  Applicable dietary reference standards and review owner.
4.  Supported languages and local food catalogue.
5.  Target age range and handling of minors.
6.  AI provider, retention settings, and cost limits.
7.  Data retention and deletion rules.
8.  Social discovery and moderation approach.
9.  Production hosting and operational owner.
10. Security, privacy, and nutrition review process.

------------------------------------------------------------------------

## 17. Recommended First Implementation Task

Create the smallest end-to-end implementation:

1.  Seed 20--50 reviewed foods with source metadata.
2.  Seed a small nutrient catalogue: protein, carbohydrate, fat, fibre,
    iron, calcium, and magnesium.
3.  Build the nutrient education screen with reviewed explanations.
4.  Build food search, portion entry, and a food-log record.
5.  Implement the deterministic calculation function with unit tests.
6.  Display daily totals and indicate which values are missing.
7.  Add one AI question that retrieves the logged foods and calculated
    nutrient totals.
8.  Test calculations and access control with at least two separate user
    accounts.

Only after this works reliably should the team expand the food
catalogue, target rules, games, and social experience.


## 18. Nutrel brand design tokens

Use shared tokens rather than screen-specific colour values.

```css
:root {
  --nutrel-beige: #F2E9D8;
  --nutrel-sage: #71866B;
  --nutrel-teal: #6F9CA3;
  --nutrel-white: #FFFFFF;
  --nutrel-text: #4F5049;
}
```

Beige is the primary canvas, sage is the primary brand/action colour, teal is a restrained secondary accent, and white is used for cards. Do not introduce a separate colour for every nutrient. Distinguish nutrients with names, icons, units, and labels, never colour alone. Validate text, focus, disabled, and control contrast against WCAG requirements; use darker accessible text variants where needed. Keep the Nutrel logo flat and simple so it remains legible at app-icon size. The generated logo is a visual concept and should be converted into production-ready vector/raster assets before release.
