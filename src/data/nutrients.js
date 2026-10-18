/**
 * Nutrel - Core Nutrients & Reference Targets
 * Authoritative standards based on ICMR-NIN (National Institute of Nutrition, India) 2020 RDAs
 * and WHO/FAO dietary guidelines.
 */

export const NUTRIENTS = {
  protein: {
    code: 'protein',
    name: 'Protein',
    canonical_unit: 'g',
    analogy: 'Amino Acids & Muscle Adaptation',
    summary: 'Dietary proteins are broken down by gastric pepsin and pancreatic proteases into free amino acids, absorbed via intestinal enterocytes into the bloodstream, and used for cellular renewal, enzyme production, and muscle adaptation.',
    why_it_matters: 'Amino acids replenish the body’s circulating amino acid pool. Physical activity provides the stimulus for tissue adaptation, recovery and sleep facilitate repair, and dietary protein delivers the necessary substrate.',
    food_sources: ['Moong dal, toor dal, chana', 'Paneer, curd, milk', 'Eggs, chicken, fish', 'Tofu, soya chunks', 'Nuts and seeds'],
    absorption_tip: 'Plant proteins often complement each other. Pairing grains (like rice or roti) with pulses (dal or rajma) creates a complete amino acid profile.',
    icmr_reference: {
      adult_male_sedentary: { target: 54, type: 'RDA', unit: 'g' },
      adult_male_moderate: { target: 65, type: 'RDA', unit: 'g' },
      adult_female_sedentary: { target: 46, type: 'RDA', unit: 'g' },
      adult_female_moderate: { target: 55, type: 'RDA', unit: 'g' },
      default: { target: 50, type: 'Estimated Guide', unit: 'g' }
    }
  },
  fibre: {
    code: 'fibre',
    name: 'Dietary Fibre',
    canonical_unit: 'g',
    analogy: 'Microbiome Prebiotic & Glycemic Buffer',
    summary: 'Plant polysaccharides resistant to human gastrointestinal enzymes that form a viscous intestinal matrix to slow glucose absorption and ferment into beneficial short-chain fatty acids.',
    why_it_matters: 'Fibre is not digested for calories or burned off through exercise. Instead, it slows gastric emptying, blunts postprandial glucose spikes, and nourishes colonocytes and beneficial gut microbiota.',
    food_sources: ['Whole wheat roti, oats, brown rice', 'Lentils, chickpeas, beans', 'Guava, apples, papayas', 'Sabzi (bhindi, leafy greens, carrots)'],
    absorption_tip: 'Increase fibre intake gradually and drink plenty of water to let your digestive system adapt comfortably.',
    icmr_reference: {
      adult_male_sedentary: { target: 30, type: 'Adequate Intake', unit: 'g' },
      adult_male_moderate: { target: 35, type: 'Adequate Intake', unit: 'g' },
      adult_female_sedentary: { target: 25, type: 'Adequate Intake', unit: 'g' },
      adult_female_moderate: { target: 30, type: 'Adequate Intake', unit: 'g' },
      default: { target: 30, type: 'Adequate Intake', unit: 'g' }
    }
  },
  iron: {
    code: 'iron',
    name: 'Iron',
    canonical_unit: 'mg',
    analogy: 'Hemoglobin & Mitochondrial Cytochromes',
    summary: 'Essential transition metal at the catalytic center of hemoglobin, myoglobin, and cytochromes that transports oxygen and drives mitochondrial cellular respiration.',
    why_it_matters: 'Adequate iron supports cellular ATP generation, cognitive oxygenation, and aerobic capacity, preventing physical and mental fatigue.',
    food_sources: ['Methi, palak, drumstick leaves', 'Rajma, chana, horse gram', 'Jaggery, raisins, dates', 'Eggs, poultry, liver'],
    absorption_tip: 'Vitamin C reduces ferric iron to the soluble ferrous state, significantly enhancing absorption. Squeeze fresh lemon over dal or sabzi! Avoid drinking tea or coffee directly with meals, as polyphenols inhibit iron uptake.',
    icmr_reference: {
      adult_male_sedentary: { target: 19, type: 'RDA', unit: 'mg' },
      adult_male_moderate: { target: 19, type: 'RDA', unit: 'mg' },
      adult_female_sedentary: { target: 29, type: 'RDA', unit: 'mg' },
      adult_female_moderate: { target: 29, type: 'RDA', unit: 'mg' },
      default: { target: 20, type: 'RDA', unit: 'mg' }
    }
  },
  calcium: {
    code: 'calcium',
    name: 'Calcium',
    canonical_unit: 'mg',
    analogy: 'Neuromuscular Signaling & Skeletal Matrix',
    summary: 'Crucial divalent cation required for actin-myosin muscle contractions, neurotransmission, and bone hydroxyapatite mineralization.',
    why_it_matters: 'The body maintains serum calcium within tight homeostatic limits through continuous osteoclast and osteoblast bone remodeling.',
    food_sources: ['Milk, curd, paneer', 'Ragi (finger millet)', 'Sesame seeds (til)', 'Curry leaves, drumstick leaves', 'Tofu (calcium-set)'],
    absorption_tip: 'Vitamin D facilitates active intestinal calcium transport via calbindin proteins. Mild daily sun exposure supports skin vitamin D synthesis.',
    icmr_reference: {
      adult_male_sedentary: { target: 1000, type: 'RDA', unit: 'mg' },
      adult_male_moderate: { target: 1000, type: 'RDA', unit: 'mg' },
      adult_female_sedentary: { target: 1000, type: 'RDA', unit: 'mg' },
      adult_female_moderate: { target: 1000, type: 'RDA', unit: 'mg' },
      default: { target: 1000, type: 'RDA', unit: 'mg' }
    }
  },
  magnesium: {
    code: 'magnesium',
    name: 'Magnesium',
    canonical_unit: 'mg',
    analogy: 'ATP Stabilizer & Co-Enzyme Activator',
    summary: 'Essential intracellular mineral cofactor for over 300 enzymatic reactions, stabilizing Mg-ATP complexes for cellular energy transfer.',
    why_it_matters: 'Magnesium supports muscular relaxation after contraction, regulates neuromuscular excitability, and modulates nervous system recovery.',
    food_sources: ['Pumpkin seeds, almonds, cashews', 'Spinach and dark green vegetables', 'Whole grains (bajra, jowar, whole wheat)', 'Dark chocolate, cocoa'],
    absorption_tip: 'Whole unrefined grains and seeds preserve magnesium that is typically lost during industrial flour milling.',
    icmr_reference: {
      adult_male_sedentary: { target: 440, type: 'RDA', unit: 'mg' },
      adult_male_moderate: { target: 440, type: 'RDA', unit: 'mg' },
      adult_female_sedentary: { target: 370, type: 'RDA', unit: 'mg' },
      adult_female_moderate: { target: 370, type: 'RDA', unit: 'mg' },
      default: { target: 380, type: 'RDA', unit: 'mg' }
    }
  },
  vitamin_c: {
    code: 'vitamin_c',
    name: 'Vitamin C',
    canonical_unit: 'mg',
    analogy: 'Antioxidant & Collagen Hydroxylation',
    summary: 'Water-soluble electron donor that reduces oxidative free radicals and acts as an essential cofactor for prolyl hydroxylase in collagen synthesis.',
    why_it_matters: 'Maintains vascular and dermal integrity, supports immune cell phagocytosis, and chemically transforms dietary non-heme iron for cellular uptake.',
    food_sources: ['Amla (Indian gooseberry - extremely rich)', 'Guava, oranges, lemons', 'Capsicum, tomatoes, green chillies', 'Sprouted moong beans'],
    absorption_tip: 'Vitamin C is heat-labile. Consume citrus and fresh salads raw, and add lemon juice to hot curries right before serving.',
    icmr_reference: {
      adult_male_sedentary: { target: 80, type: 'RDA', unit: 'mg' },
      adult_male_moderate: { target: 80, type: 'RDA', unit: 'mg' },
      adult_female_sedentary: { target: 65, type: 'RDA', unit: 'mg' },
      adult_female_moderate: { target: 65, type: 'RDA', unit: 'mg' },
      default: { target: 75, type: 'RDA', unit: 'mg' }
    }
  },
  carbs: {
    code: 'carbs',
    name: 'Carbohydrates & Sugars',
    canonical_unit: 'g',
    analogy: 'Cellular Glucose & Glycogen Reserves',
    summary: 'Carbohydrates are digested by amylase and disaccharidases into simple sugars (glucose), fueling cellular respiration (ATP) or stored as glycogen in muscle and liver.',
    why_it_matters: 'Glucose fuels central nervous system function and high-intensity muscular work. Exercise utilizes circulating glucose and glycogen, but does not cancel out meals.',
    food_sources: ['Brown rice, red matta rice, millets', 'Whole wheat chapati, jowar bhakri', 'Sweet potatoes, oats', 'Pulses and legumes'],
    absorption_tip: 'Pair complex carbohydrates with protein and fibre to moderate gastric emptying and avoid rapid glycemic fluctuations.',
    icmr_reference: {
      adult_male_sedentary: { target: 280, type: 'Guideline Range', unit: 'g' },
      adult_male_moderate: { target: 320, type: 'Guideline Range', unit: 'g' },
      adult_female_sedentary: { target: 220, type: 'Guideline Range', unit: 'g' },
      adult_female_moderate: { target: 260, type: 'Guideline Range', unit: 'g' },
      default: { target: 250, type: 'Guideline Range', unit: 'g' }
    }
  },
  fats: {
    code: 'fats',
    name: 'Healthy Fats',
    canonical_unit: 'g',
    analogy: 'Phospholipid Bilayers & Endocrine Lipids',
    summary: 'Hydrolyzed into fatty acids and monoglycerides for lipid transport, synthesis of steroid hormones, and cell membrane fluidity.',
    why_it_matters: 'Fats are indispensable for absorbing fat-soluble vitamins (A, D, E, K), insulating nerve fibers with myelin, and long-term energy reserves.',
    food_sources: ['Mustard oil, groundnut oil, sesame oil', 'Ghee in moderate portions', 'Flaxseeds, chia seeds, walnuts', 'Peanuts, coconut in cooking'],
    absorption_tip: 'Prioritize polyunsaturated Omega-3 fatty acids (flaxseeds, walnuts) and monounsaturated oils (mustard, groundnut) for cardiovascular and cellular health.',
    icmr_reference: {
      adult_male_sedentary: { target: 30, type: 'RDA Limit', unit: 'g' },
      adult_male_moderate: { target: 40, type: 'RDA Limit', unit: 'g' },
      adult_female_sedentary: { target: 25, type: 'RDA Limit', unit: 'g' },
      adult_female_moderate: { target: 30, type: 'RDA Limit', unit: 'g' },
      default: { target: 30, type: 'RDA Limit', unit: 'g' }
    }
  },
  water: {
    code: 'water',
    name: 'Water & Hydration',
    canonical_unit: 'L',
    analogy: 'Cellular Osmolality & Thermoregulation',
    summary: 'Essential biological solvent constituting ~60% of body mass, maintaining plasma blood volume, kidney glomerular filtration, and joint lubrication.',
    why_it_matters: 'Hydration supports digestive transit, nutrient transport across membranes, and cellular metabolic reactions while regulating internal core temperature.',
    food_sources: ['Drinking water', 'Chaas / buttermilk, tender coconut water', 'Cucumbers, watermelon, citrus fruits', 'Dal rasam, vegetable soups'],
    absorption_tip: 'Hydrate evenly across the day. Electrolytes (sodium, potassium, magnesium) help cells retain water efficiently.',
    icmr_reference: {
      adult_male_sedentary: { target: 2.5, type: 'Adequate Intake', unit: 'L' },
      adult_male_moderate: { target: 3.0, type: 'Adequate Intake', unit: 'L' },
      adult_female_sedentary: { target: 2.1, type: 'Adequate Intake', unit: 'L' },
      adult_female_moderate: { target: 2.5, type: 'Adequate Intake', unit: 'L' },
      default: { target: 2.5, type: 'Adequate Intake', unit: 'L' }
    }
  }
};

/**
 * Calculates user-specific daily target based on profile criteria
 */
export function getReferenceTarget(nutrientCode, profile = {}) {
  const nutrient = NUTRIENTS[nutrientCode];
  if (!nutrient) return null;

  const sex = profile.sex || 'female';
  const activity = profile.activity || 'sedentary';
  const key = `adult_${sex}_${activity}`;

  const targetObj = nutrient.icmr_reference[key] || nutrient.icmr_reference.default;
  return {
    nutrientCode,
    name: nutrient.name,
    target: targetObj.target,
    unit: targetObj.unit,
    type: targetObj.type,
    standard: 'ICMR-NIN 2020 RDA & Dietary Guidelines for Indians',
    version: '2020.v1'
  };
}
