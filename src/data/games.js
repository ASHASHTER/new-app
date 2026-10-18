/**
 * Nutrel - Learning Mini-Games
 * PRD FR-050: 3 Game Formats (Food Comparison, Balanced-Plate Builder, Nutrition Myth/Fact)
 * Non-restrictive, non-judgmental, grounded in reviewed scientific evidence.
 */

export const COMPARISON_CHALLENGES = [
  {
    id: 'cmp_1',
    title: 'Protein Showdown: Dal vs Paneer',
    question: 'Per 100g cooked portion, which provides more concentrated protein?',
    itemA: {
      id: 'food_moong_dal_cooked',
      name: 'Moong Dal (Cooked)',
      badge: 'Lentils / Pulses',
      amountDisplay: '7.2g per 100g'
    },
    itemB: {
      id: 'food_paneer_fresh',
      name: 'Paneer (Fresh Cottage Cheese)',
      badge: 'Dairy Protein',
      amountDisplay: '18.3g per 100g'
    },
    winner: 'B',
    explanation: 'Paneer has over 2.5x more protein per 100g (18.3g vs 7.2g) because dal contains significant cooking water. However, moong dal provides zero saturated fat and 4.2g of dietary fibre, making both great teammates for a balanced meal!',
    source: 'ICMR-NIN IFCT 2017 (D048, L012)'
  },
  {
    id: 'cmp_2',
    title: 'Fibre & Blood Sugar: White vs Brown Rice',
    question: 'Which grain retains the bran layer, delivering nearly 4.5x more dietary fibre per 100g?',
    itemA: {
      id: 'food_rice_white_cooked',
      name: 'Steamed White Rice',
      badge: 'Milled Grain',
      amountDisplay: '0.4g fibre per 100g'
    },
    itemB: {
      id: 'food_rice_brown_cooked',
      name: 'Steamed Brown Rice',
      badge: 'Whole Grain',
      amountDisplay: '1.8g fibre per 100g'
    },
    winner: 'B',
    explanation: 'Brown rice preserves the outer bran and germ layers, packing 1.8g fibre per 100g compared to 0.4g in polished white rice. This slows digestion and promotes steady, long-lasting energy.',
    source: 'ICMR-NIN IFCT 2017 (A002, A007)'
  },
  {
    id: 'cmp_3',
    title: 'Vitamin C Giant: Amla vs Orange',
    question: 'Which Indian superfood contains up to 8x more Vitamin C than fresh citrus oranges per 100g?',
    itemA: {
      id: 'food_amla_raw',
      name: 'Fresh Amla (Indian Gooseberry)',
      badge: 'Traditional Superfruit',
      amountDisplay: '445mg per 100g'
    },
    itemB: {
      id: 'food_orange_fresh',
      name: 'Sweet Orange / Santra',
      badge: 'Citrus Fruit',
      amountDisplay: '53mg per 100g'
    },
    winner: 'A',
    explanation: 'A single 35g amla supplies over 150mg of Vitamin C—more than double your entire daily requirement! It is one of the densest natural sources of antioxidants known in plant biology.',
    source: 'ICMR-NIN IFCT 2017 (E001)'
  }
];

export const MYTH_FACTS = [
  {
    id: 'myth_1',
    statement: 'Squeezing fresh lemon juice over your dal enhances the amount of iron your body can absorb.',
    isFact: true,
    verdict: 'FACT',
    explanation: 'Plant-based iron (non-heme iron in dals, greens, and beans) is chemically bound. Vitamin C (ascorbic acid) converts ferric iron into ferrous iron, increasing absorption efficiency by up to 300% in the gut!',
    scientificContext: 'Ascorbic acid prevents the formation of insoluble and unabsorbable iron compounds and facilitates iron uptake through intestinal enterocytes.',
    source: 'World Health Organization (WHO) & ICMR Nutritional Guidelines'
  },
  {
    id: 'myth_2',
    statement: 'Eating carbohydrates after 7:00 PM automatically turns directly into body fat.',
    isFact: false,
    verdict: 'MYTH',
    explanation: 'Your body’s metabolism does not shut down at sunset. Weight regulation is determined by overall energy balance, food quality, and physical activity over days and weeks—not a magic bedtime clock.',
    scientificContext: 'Insulin sensitivity follows circadian rhythms mildly, but carbohydrate oxidation continues through nocturnal basal metabolic rate.',
    source: 'International Journal of Obesity & British Dietetic Association'
  },
  {
    id: 'myth_3',
    statement: 'Drinking strong milk tea or coffee with lunch significantly reduces iron absorption from that meal.',
    isFact: true,
    verdict: 'FACT',
    explanation: 'Polyphenols and tannins in tea and coffee bind strongly to dietary iron in the digestive tract, reducing absorption by up to 60-70%. Nutritionists recommend enjoying tea or coffee at least 45-60 minutes after meals.',
    scientificContext: 'Tannates form insoluble chelates with non-heme iron, preventing mucosal transfer.',
    source: 'American Journal of Clinical Nutrition / ICMR Guidelines'
  },
  {
    id: 'myth_4',
    statement: 'All dietary fats are harmful and should be eliminated to stay healthy.',
    isFact: false,
    verdict: 'MYTH',
    explanation: 'Essential fatty acids and healthy unsaturated fats (from mustard oil, nuts, seeds, and moderate ghee) are mandatory for brain cellular membranes, hormone production, and the absorption of vitamins A, D, E, and K.',
    scientificContext: 'Zero-fat diets lead to deficiencies in fat-soluble vitamins, impaired steroid hormone production, and dry cellular membranes.',
    source: 'Harvard T.H. Chan School of Public Health'
  }
];

export const PLATE_BUILDER_ITEMS = [
  // Proteins
  { id: 'p1', name: 'Moong Dal (1 Bowl)', category: 'protein', icon: '🍲', points: { protein: 25, fibre: 15 } },
  { id: 'p2', name: 'Grilled Paneer / Tofu', category: 'protein', icon: '🧀', points: { protein: 30, fats: 15 } },
  { id: 'p3', name: 'Boiled Eggs (2)', category: 'protein', icon: '🥚', points: { protein: 30, fats: 10 } },
  { id: 'p4', name: 'Chana Masala', category: 'protein', icon: '🧆', points: { protein: 25, fibre: 20 } },

  // Complex Carbs
  { id: 'c1', name: 'Whole Wheat Roti (2)', category: 'carbs', icon: '🫓', points: { carbs: 30, fibre: 15 } },
  { id: 'c2', name: 'Steamed Brown Rice', category: 'carbs', icon: '🍚', points: { carbs: 30, fibre: 10 } },
  { id: 'c3', name: 'Foxtail Millet / Bajra', category: 'carbs', icon: '🌾', points: { carbs: 30, fibre: 20 } },

  // Vegetables / Fibre
  { id: 'v1', name: 'Palak / Methi Sabzi', category: 'veggies', icon: '🥬', points: { fibre: 30, iron: 25, vitamins: 30 } },
  { id: 'v2', name: 'Cucumber & Tomato Salad', category: 'veggies', icon: '🥗', points: { fibre: 25, vitamins: 25 } },
  { id: 'v3', name: 'Stir-Fried Bhindi', category: 'veggies', icon: '🌱', points: { fibre: 25, vitamins: 20 } },

  // Healthy Fats & Probiotics
  { id: 'f1', name: 'Fresh Curd / Dahi (1 Katori)', category: 'probiotics', icon: '🥣', points: { calcium: 25, protein: 10 } },
  { id: 'f2', name: '1 tsp Pure Ghee', category: 'fats', icon: '🧈', points: { fats: 20 } },
  { id: 'f3', name: 'Soaked Almonds & Walnuts', category: 'fats', icon: '🥜', points: { fats: 20, magnesium: 25 } }
];
