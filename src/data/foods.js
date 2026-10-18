/**
 * Nutrel Food Composition Catalogue
 * Grounded in Indian Food Composition Tables (IFCT 2017, ICMR-NIN) and USDA FoodData Central.
 * Basis: per 100g of edible portion.
 */

export const FOODS = [
  {
    id: 'food_toor_dal_cooked',
    name: 'Toor / Arhar Dal (Tadka, Cooked)',
    locale_names: { hi: 'तूर / अरहर दाल तड़का', ta: 'துவரம் பருப்பு', te: 'కంది పప్పు' },
    category: 'Lentils & Pulses',
    preparation_state: 'cooked',
    basis_grams: 100,
    data_source: 'ICMR-NIN IFCT 2017 (D055)',
    license_metadata: { source: 'ICMR-NIN', usage: 'Educational & Wellness Reference' },
    data_quality: 'Reviewed',
    calories: 104,
    nutrients: {
      protein: { amount: 6.8, unit: 'g', is_missing: false },
      carbs: { amount: 14.2, unit: 'g', is_missing: false },
      fibre: { amount: 3.9, unit: 'g', is_missing: false },
      fats: { amount: 2.3, unit: 'g', is_missing: false },
      iron: { amount: 1.4, unit: 'mg', is_missing: false },
      calcium: { amount: 22.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 34.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 0.8, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_katori', name: '1 Standard Katori (Bowl)', grams: 150, description: 'Approx 150g cooked dal' },
      { id: 'srv_half_katori', name: '1/2 Katori', grams: 75, description: 'Small serving (~75g)' },
      { id: 'srv_ladle', name: '1 Large Ladle', grams: 100, description: 'Serving spoon (~100g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_moong_dal_cooked',
    name: 'Moong Dal (Yellow, Cooked)',
    locale_names: { hi: 'पीली मूंग दाल', ta: 'பாசிப் பருப்பு', te: 'పెసర పప్పు' },
    category: 'Lentils & Pulses',
    preparation_state: 'cooked',
    basis_grams: 100,
    data_source: 'ICMR-NIN IFCT 2017 (D048)',
    license_metadata: { source: 'ICMR-NIN', usage: 'Educational & Wellness Reference' },
    data_quality: 'Reviewed',
    calories: 98,
    nutrients: {
      protein: { amount: 7.2, unit: 'g', is_missing: false },
      carbs: { amount: 15.1, unit: 'g', is_missing: false },
      fibre: { amount: 4.2, unit: 'g', is_missing: false },
      fats: { amount: 1.2, unit: 'g', is_missing: false },
      iron: { amount: 1.6, unit: 'mg', is_missing: false },
      calcium: { amount: 26.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 38.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 1.1, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_katori', name: '1 Standard Katori', grams: 150, description: 'Medium bowl (~150g)' },
      { id: 'srv_ladle', name: '1 Ladle', grams: 100, description: 'Ladle scoop (~100g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_chana_masala',
    name: 'Chole / Chana Masala (Cooked)',
    locale_names: { hi: 'छोले / चना मसाला', ta: 'கொண்டைக்கடலை மசாலா', te: 'శనగల కూర' },
    category: 'Lentils & Pulses',
    preparation_state: 'cooked',
    basis_grams: 100,
    data_source: 'ICMR-NIN IFCT 2017 (D008)',
    license_metadata: { source: 'ICMR-NIN', usage: 'Educational & Wellness Reference' },
    data_quality: 'Reviewed',
    calories: 142,
    nutrients: {
      protein: { amount: 7.6, unit: 'g', is_missing: false },
      carbs: { amount: 18.5, unit: 'g', is_missing: false },
      fibre: { amount: 6.1, unit: 'g', is_missing: false },
      fats: { amount: 4.5, unit: 'g', is_missing: false },
      iron: { amount: 2.8, unit: 'mg', is_missing: false },
      calcium: { amount: 48.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 42.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 2.4, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_katori', name: '1 Standard Katori', grams: 150, description: 'Medium bowl (~150g)' },
      { id: 'srv_half_katori', name: '1/2 Katori', grams: 75, description: 'Small serving (~75g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_roti_wheat',
    name: 'Whole Wheat Roti / Phulka (Without Ghee)',
    locale_names: { hi: 'गेहूं की रोटी / फुल्का', ta: 'கோதுமை ரொட்டி', te: 'చపాతీ' },
    category: 'Grains & Breads',
    preparation_state: 'cooked',
    basis_grams: 100,
    data_source: 'ICMR-NIN IFCT 2017 (A031)',
    license_metadata: { source: 'ICMR-NIN', usage: 'Educational & Wellness Reference' },
    data_quality: 'Reviewed',
    calories: 260,
    nutrients: {
      protein: { amount: 9.1, unit: 'g', is_missing: false },
      carbs: { amount: 51.5, unit: 'g', is_missing: false },
      fibre: { amount: 9.4, unit: 'g', is_missing: false },
      fats: { amount: 1.8, unit: 'g', is_missing: false },
      iron: { amount: 3.2, unit: 'mg', is_missing: false },
      calcium: { amount: 34.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 78.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 0.0, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_roti_med', name: '1 Medium Roti (6-inch)', grams: 35, description: 'Standard home phulka (~35g)' },
      { id: 'srv_roti_large', name: '1 Large Roti', grams: 50, description: 'Thick restaurant roti (~50g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_rice_white_cooked',
    name: 'Steamed White Basmati Rice',
    locale_names: { hi: 'उबले सफेद चावल', ta: 'வெள்ளை சாதம்', te: 'అన్నం' },
    category: 'Grains & Breads',
    preparation_state: 'cooked',
    basis_grams: 100,
    data_source: 'ICMR-NIN IFCT 2017 (A002)',
    license_metadata: { source: 'ICMR-NIN', usage: 'Educational & Wellness Reference' },
    data_quality: 'Reviewed',
    calories: 130,
    nutrients: {
      protein: { amount: 2.7, unit: 'g', is_missing: false },
      carbs: { amount: 28.2, unit: 'g', is_missing: false },
      fibre: { amount: 0.4, unit: 'g', is_missing: false },
      fats: { amount: 0.3, unit: 'g', is_missing: false },
      iron: { amount: 0.2, unit: 'mg', is_missing: false },
      calcium: { amount: 10.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 12.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 0.0, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_katori', name: '1 Standard Katori (Bowl)', grams: 150, description: 'Cooked rice bowl (~150g)' },
      { id: 'srv_cup', name: '1 Regular Cup', grams: 180, description: 'Full cup (~180g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_rice_brown_cooked',
    name: 'Steamed Brown Rice',
    locale_names: { hi: 'भूरे चावल', ta: 'கைக்குத்தல் அரிசி சாதம்', te: 'దంపుడు బియ్యం' },
    category: 'Grains & Breads',
    preparation_state: 'cooked',
    basis_grams: 100,
    data_source: 'ICMR-NIN IFCT 2017 (A007)',
    license_metadata: { source: 'ICMR-NIN', usage: 'Educational & Wellness Reference' },
    data_quality: 'Reviewed',
    calories: 123,
    nutrients: {
      protein: { amount: 2.9, unit: 'g', is_missing: false },
      carbs: { amount: 25.6, unit: 'g', is_missing: false },
      fibre: { amount: 1.8, unit: 'g', is_missing: false },
      fats: { amount: 0.9, unit: 'g', is_missing: false },
      iron: { amount: 0.6, unit: 'mg', is_missing: false },
      calcium: { amount: 12.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 44.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 0.0, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_katori', name: '1 Standard Katori', grams: 150, description: 'Cooked brown rice (~150g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_paneer_fresh',
    name: 'Paneer (Fresh Cottage Cheese)',
    locale_names: { hi: 'ताज़ा पनीर', ta: 'பன்னீர்', te: 'పన్నీర్' },
    category: 'Dairy & Alternatives',
    preparation_state: 'raw',
    basis_grams: 100,
    data_source: 'ICMR-NIN IFCT 2017 (L012)',
    license_metadata: { source: 'ICMR-NIN', usage: 'Educational & Wellness Reference' },
    data_quality: 'Reviewed',
    calories: 289,
    nutrients: {
      protein: { amount: 18.3, unit: 'g', is_missing: false },
      carbs: { amount: 3.4, unit: 'g', is_missing: false },
      fibre: { amount: 0.0, unit: 'g', is_missing: false },
      fats: { amount: 22.0, unit: 'g', is_missing: false },
      iron: { amount: 0.4, unit: 'mg', is_missing: false },
      calcium: { amount: 480.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 24.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 0.0, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_cubes_5', name: '5 Medium Cubes', grams: 50, description: 'Portion of 5 cubes (~50g)' },
      { id: 'srv_katori', name: '1 Katori Crumbled', grams: 100, description: 'Crumbled paneer (~100g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_curd_dahi',
    name: 'Curd / Dahi (Plain Whole Milk)',
    locale_names: { hi: 'दही', ta: 'தயிர்', te: 'పెరుగు' },
    category: 'Dairy & Alternatives',
    preparation_state: 'prepared',
    basis_grams: 100,
    data_source: 'ICMR-NIN IFCT 2017 (L008)',
    license_metadata: { source: 'ICMR-NIN', usage: 'Educational & Wellness Reference' },
    data_quality: 'Reviewed',
    calories: 65,
    nutrients: {
      protein: { amount: 3.8, unit: 'g', is_missing: false },
      carbs: { amount: 4.7, unit: 'g', is_missing: false },
      fibre: { amount: 0.0, unit: 'g', is_missing: false },
      fats: { amount: 3.6, unit: 'g', is_missing: false },
      iron: { amount: 0.1, unit: 'mg', is_missing: false },
      calcium: { amount: 150.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 14.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 0.5, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_katori', name: '1 Standard Katori', grams: 150, description: 'Bowl of curd (~150g)' },
      { id: 'srv_tbsp_2', name: '2 Heaping Tablespoons', grams: 60, description: 'Small dollop (~60g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_idli_steamed',
    name: 'Idli (Steamed Rice & Urad Dal)',
    locale_names: { hi: 'इडली', ta: 'இட்லி', te: 'ఇడ్లీ' },
    category: 'South Indian Breakfast',
    preparation_state: 'cooked',
    basis_grams: 100,
    data_source: 'ICMR-NIN IFCT 2017 (F012)',
    license_metadata: { source: 'ICMR-NIN', usage: 'Educational & Wellness Reference' },
    data_quality: 'Reviewed',
    calories: 135,
    nutrients: {
      protein: { amount: 4.1, unit: 'g', is_missing: false },
      carbs: { amount: 26.8, unit: 'g', is_missing: false },
      fibre: { amount: 2.1, unit: 'g', is_missing: false },
      fats: { amount: 0.6, unit: 'g', is_missing: false },
      iron: { amount: 0.9, unit: 'mg', is_missing: false },
      calcium: { amount: 18.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 22.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 0.0, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_piece_1', name: '1 Medium Idli', grams: 50, description: 'Standard steamed idli (~50g)' },
      { id: 'srv_piece_2', name: '2 Medium Idlis', grams: 100, description: 'Pair of idlis (~100g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_sambar_vegetable',
    name: 'Vegetable Sambar (Toor Dal, Drumstick, Veggies)',
    locale_names: { hi: 'सांभर', ta: 'சாம்பார்', te: 'సాంబారు' },
    category: 'Lentils & Pulses',
    preparation_state: 'cooked',
    basis_grams: 100,
    data_source: 'ICMR-NIN IFCT 2017 (F045)',
    license_metadata: { source: 'ICMR-NIN', usage: 'Educational & Wellness Reference' },
    data_quality: 'Reviewed',
    calories: 78,
    nutrients: {
      protein: { amount: 3.5, unit: 'g', is_missing: false },
      carbs: { amount: 11.2, unit: 'g', is_missing: false },
      fibre: { amount: 2.8, unit: 'g', is_missing: false },
      fats: { amount: 2.1, unit: 'g', is_missing: false },
      iron: { amount: 1.1, unit: 'mg', is_missing: false },
      calcium: { amount: 28.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 26.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 4.2, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_katori', name: '1 Standard Katori (Bowl)', grams: 150, description: 'Bowl of sambar (~150g)' },
      { id: 'srv_cup', name: '1 Full Cup', grams: 200, description: 'Large cup (~200g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_palak_paneer',
    name: 'Palak Paneer (Spinach Gravy with Paneer)',
    locale_names: { hi: 'पालक पनीर', ta: 'பாலக் பன்னீர்', te: 'పాలకూర పన్నీర్' },
    category: 'Vegetarian Mains',
    preparation_state: 'cooked',
    basis_grams: 100,
    data_source: 'ICMR-NIN IFCT 2017 (F082)',
    license_metadata: { source: 'ICMR-NIN', usage: 'Educational & Wellness Reference' },
    data_quality: 'Reviewed',
    calories: 168,
    nutrients: {
      protein: { amount: 8.5, unit: 'g', is_missing: false },
      carbs: { amount: 5.6, unit: 'g', is_missing: false },
      fibre: { amount: 3.2, unit: 'g', is_missing: false },
      fats: { amount: 12.8, unit: 'g', is_missing: false },
      iron: { amount: 2.4, unit: 'mg', is_missing: false },
      calcium: { amount: 220.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 56.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 8.5, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_katori', name: '1 Standard Katori', grams: 150, description: 'Bowl of palak paneer (~150g)' },
      { id: 'srv_half_katori', name: '1/2 Katori', grams: 75, description: 'Small serving (~75g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_egg_whole_boiled',
    name: 'Boiled Egg (Large, Whole)',
    locale_names: { hi: 'उबला अंडा', ta: 'வேகவைத்த முட்டை', te: 'ఉడకబెట్టిన గుడ్డు' },
    category: 'Poultry & Eggs',
    preparation_state: 'cooked',
    basis_grams: 100,
    data_source: 'USDA FoodData Central / ICMR',
    license_metadata: { source: 'USDA FDC 171287', usage: 'Educational' },
    data_quality: 'Reviewed',
    calories: 155,
    nutrients: {
      protein: { amount: 12.6, unit: 'g', is_missing: false },
      carbs: { amount: 1.1, unit: 'g', is_missing: false },
      fibre: { amount: 0.0, unit: 'g', is_missing: false },
      fats: { amount: 10.6, unit: 'g', is_missing: false },
      iron: { amount: 1.8, unit: 'mg', is_missing: false },
      calcium: { amount: 50.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 12.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 0.0, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_egg_1', name: '1 Large Egg', grams: 50, description: 'Standard boiled egg (~50g)' },
      { id: 'srv_egg_2', name: '2 Large Eggs', grams: 100, description: 'Two boiled eggs (~100g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_poha_cooked',
    name: 'Batata Poha (Flattened Rice with Peanuts & Potatoes)',
    locale_names: { hi: 'बटाटा पोहा', ta: 'அவல் உப்புமா', te: 'అటుకుల ఉప్మా' },
    category: 'Breakfast Staples',
    preparation_state: 'cooked',
    basis_grams: 100,
    data_source: 'ICMR-NIN IFCT 2017 (F022)',
    license_metadata: { source: 'ICMR-NIN', usage: 'Educational' },
    data_quality: 'Reviewed',
    calories: 180,
    nutrients: {
      protein: { amount: 4.2, unit: 'g', is_missing: false },
      carbs: { amount: 31.0, unit: 'g', is_missing: false },
      fibre: { amount: 2.8, unit: 'g', is_missing: false },
      fats: { amount: 4.8, unit: 'g', is_missing: false },
      iron: { amount: 2.6, unit: 'mg', is_missing: false },
      calcium: { amount: 24.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 32.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 6.8, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_katori', name: '1 Standard Plate / Katori', grams: 150, description: 'Plate of poha (~150g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_almonds_raw',
    name: 'Almonds (Badam, Raw)',
    locale_names: { hi: 'बादाम', ta: 'பாதாம்', te: 'బాదం' },
    category: 'Nuts & Seeds',
    preparation_state: 'raw',
    basis_grams: 100,
    data_source: 'ICMR-NIN IFCT 2017 (J001)',
    license_metadata: { source: 'ICMR-NIN', usage: 'Educational' },
    data_quality: 'Reviewed',
    calories: 579,
    nutrients: {
      protein: { amount: 21.2, unit: 'g', is_missing: false },
      carbs: { amount: 21.6, unit: 'g', is_missing: false },
      fibre: { amount: 12.5, unit: 'g', is_missing: false },
      fats: { amount: 49.9, unit: 'g', is_missing: false },
      iron: { amount: 3.7, unit: 'mg', is_missing: false },
      calcium: { amount: 264.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 270.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 0.0, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_nuts_7', name: '7 Almonds (Small Handful)', grams: 10, description: 'Approx 7 nuts (~10g)' },
      { id: 'srv_nuts_15', name: '15 Almonds', grams: 20, description: 'Approx 15 nuts (~20g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_amla_raw',
    name: 'Amla (Indian Gooseberry, Raw)',
    locale_names: { hi: 'आंवला', ta: 'நெல்லிக்காய்', te: 'ఉసిరికాయ' },
    category: 'Fruits & Superfoods',
    preparation_state: 'raw',
    basis_grams: 100,
    data_source: 'ICMR-NIN IFCT 2017 (E001)',
    license_metadata: { source: 'ICMR-NIN', usage: 'Educational' },
    data_quality: 'Reviewed',
    calories: 48,
    nutrients: {
      protein: { amount: 0.8, unit: 'g', is_missing: false },
      carbs: { amount: 11.2, unit: 'g', is_missing: false },
      fibre: { amount: 4.3, unit: 'g', is_missing: false },
      fats: { amount: 0.2, unit: 'g', is_missing: false },
      iron: { amount: 1.2, unit: 'mg', is_missing: false },
      calcium: { amount: 30.0, unit: 'mg', is_missing: false },
      magnesium: { amount: 18.0, unit: 'mg', is_missing: false },
      vitamin_c: { amount: 445.0, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_piece_1', name: '1 Medium Amla', grams: 35, description: 'Whole fresh amla fruit (~35g)' },
      { id: 'srv_custom_g', name: 'Grams', grams: 1, description: 'Custom weight' }
    ]
  },
  {
    id: 'food_masala_chai',
    name: 'Masala Chai (with Milk & Sugar)',
    locale_names: { hi: 'मसाला चाय', ta: 'மசாலா டீ', te: 'మసాలా టీ' },
    category: 'Beverages',
    preparation_state: 'prepared',
    basis_grams: 100,
    data_source: 'ICMR Composite Sample',
    license_metadata: { source: 'ICMR Standard Kitchen Sample', usage: 'Educational' },
    data_quality: 'Estimated',
    calories: 68,
    nutrients: {
      protein: { amount: 1.8, unit: 'g', is_missing: false },
      carbs: { amount: 9.8, unit: 'g', is_missing: false },
      fibre: { amount: 0.0, unit: 'g', is_missing: false },
      fats: { amount: 2.4, unit: 'g', is_missing: false },
      iron: { amount: 0.1, unit: 'mg', is_missing: false },
      calcium: { amount: 62.0, unit: 'mg', is_missing: false },
      // Note: Magnesium unverified in standard sweet tea testing; marked missing to test PRD FR-026!
      magnesium: { amount: null, unit: 'mg', is_missing: true },
      vitamin_c: { amount: 0.0, unit: 'mg', is_missing: false }
    },
    serving_options: [
      { id: 'srv_cutting', name: '1 Cutting Glass (Small)', grams: 100, description: 'Small tea glass (~100ml)' },
      { id: 'srv_mug', name: '1 Regular Cup/Mug', grams: 180, description: 'Standard teacup (~180ml)' },
      { id: 'srv_custom_g', name: 'Grams / ml', grams: 1, description: 'Custom weight' }
    ]
  }
];

export function searchFoods(query = '', category = 'all') {
  const q = query.trim().toLowerCase();
  return FOODS.filter(food => {
    const matchesCat = category === 'all' || food.category === category;
    if (!matchesCat) return false;
    if (!q) return true;

    const nameMatch = food.name.toLowerCase().includes(q);
    const localeMatch = food.locale_names && Object.values(food.locale_names).some(v => v.toLowerCase().includes(q));
    const catMatch = food.category.toLowerCase().includes(q);
    return nameMatch || localeMatch || catMatch;
  });
}
