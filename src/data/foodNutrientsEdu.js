/**
 * Nutrel Food & Nutrient Education Reference
 * Detailed biological mechanisms, digestion pathways, metabolic fates,
 * insufficiency/excess consequences, and real food serving sizes.
 */

export const FOOD_NUTRIENT_TOPICS = [
  {
    id: 'edu_protein',
    nutrientCode: 'protein',
    name: 'Protein & Amino Acids',
    icon: '🧬',
    summary: 'Essential nitrogenous macronutrient providing the amino acid substrate for muscle remodeling, enzyme catalysis, and immune antibodies.',
    whatItDoes: 'Proteins are polymers of 20 distinct amino acids linked by peptide bonds. They form structural actin/myosin myofibrils in muscle, catalyze cellular reactions as enzymes, synthesize peptide hormones (insulin, glucagon), and produce immunoglobulins for pathogen defense.',
    digestionAndAbsorption: 'Digestion initiates in the stomach where hydrochloric acid (pH 1.5–2.0) denatures quaternary and tertiary protein structures, allowing gastric pepsin to cleave bonds into polypeptides. In the duodenum, pancreatic proteases (trypsin, chymotrypsin, carboxypeptidases) and brush-border peptidases hydrolyze them into free amino acids and di/tripeptides. Active sodium-dependent amino acid transporters (like PepT1) shuttle them across intestinal enterocytes directly into the hepatic portal circulation.',
    howBodyUsesIt: 'Absorbed amino acids enter the body’s circulating amino acid pool (~100g in blood and tissues). Cells draw upon this pool for Muscle Protein Synthesis (MPS), replacing daily cellular turnover (~300g synthesized and broken down daily). During resistance exercise or training, micro-stimuli trigger intracellular mTOR signaling. Deep slow-wave sleep promotes growth hormone and insulin-like growth factor-1 (IGF-1) secretion, while dietary amino acids supply the building substrate for tissue adaptation.',
    insufficiencyAndExcess: {
      insufficient: 'Chronic inadequate intake leads to muscle catabolism (sarcopenia), impaired immune response, delayed wound healing, brittle hair/nails, and lethargy.',
      excessive: 'In healthy individuals, surplus amino acids undergo hepatic transamination and deamination; the nitrogen is converted into urea and safely excreted by the kidneys, while carbon skeletons enter cellular respiration (Krebs cycle) or are converted to energy reserves.'
    },
    sourcesAndServings: [
      { food: 'Toor / Arhar Dal (cooked tadka)', serving: '1 Standard Katori (150g)', amount: '10.2g Protein', calories: '156 kcal', notes: 'Pair with roti or rice for complete amino acid balance.' },
      { food: 'Paneer (fresh cottage cheese)', serving: '100g cube', amount: '18.3g Protein', calories: '265 kcal', notes: 'Rich in pre-formed complete protein, leucine, and bioavailable calcium.' },
      { food: 'Whole Eggs (boiled)', serving: '2 medium eggs (100g)', amount: '12.6g Protein', calories: '143 kcal', notes: 'Gold standard biological value (BV 100) with all 9 essential amino acids.' },
      { food: 'Soya Chunks (cooked from dry)', serving: '50g dry (~150g cooked)', amount: '26.0g Protein', calories: '172 kcal', notes: 'Exceptionally high protein density and complete plant protein profile.' },
      { food: 'Curd / Plain Dahi', serving: '1 Standard Katori (150g)', amount: '6.5g Protein', calories: '92 kcal', notes: 'Probiotic-fermented casein and whey with high digestibility.' },
      { food: 'Sprouted Moong Beans', serving: '1 Cup (100g)', amount: '7.8g Protein', calories: '105 kcal', notes: 'Sprouting activates enzymes that enhance amino acid bioavailability.' }
    ]
  },
  {
    id: 'edu_carbs',
    nutrientCode: 'carbs',
    name: 'Carbohydrates & Sugars',
    icon: '⚡',
    summary: 'The primary energetic substrate fueling central nervous system cognition and high-intensity muscular contraction.',
    whatItDoes: 'Carbohydrates exist as monosaccharides (glucose, fructose, galactose), disaccharides (sucrose, lactose, maltose), and polysaccharides (starch, glycogen, cellulose). In cellular respiration, glucose undergoes glycolysis in the cytoplasm and the citric acid cycle in mitochondria, yielding 30–32 ATP molecules per glucose molecule.',
    digestionAndAbsorption: 'Salivary alpha-amylase initiates starch cleavage in the mouth. In the small intestine, pancreatic alpha-amylase and brush-border disaccharidases (maltase, sucrase, lactase) hydrolyze carbohydrates into monosaccharides. Glucose and galactose are actively transported across enterocytes via Sodium-Glucose Cotransporter 1 (SGLT-1), while fructose moves by facilitated diffusion (GLUT-5). They exit through GLUT-2 into the bloodstream.',
    howBodyUsesIt: 'Elevated blood glucose prompts pancreatic beta-cells to secrete insulin. Insulin signals skeletal muscle and adipose cells to translocate GLUT-4 glucose transporters to the cell membrane, taking up glucose. Skeletal muscles store ~400–500g of glucose as glycogen for immediate contractile fuel; the liver stores ~80–100g to regulate fasting blood sugar. Physical activity draws directly upon circulating glucose and muscle glycogen, but exercise does not mathematically wipe out or cancel food.',
    insufficiencyAndExcess: {
      insufficient: 'Severe carbohydrate restriction can lead to early athletic fatigue, impaired high-intensity anaerobic power, elevated cortisol, and glycogen depletion.',
      excessive: 'Chronic overconsumption of rapidly digestible refined sugars creates sharp postprandial glucose spikes, compensatory hyperinsulinemia, and subsequent hepatic de novo lipogenesis (conversion of excess sugars into triglycerides).'
    },
    sourcesAndServings: [
      { food: 'Whole Wheat Roti / Chapati', serving: '2 Medium Rotis (70g)', amount: '32.0g Carbs (4.2g Fibre)', calories: '185 kcal', notes: 'Contains complex amylase starches with intact aleurone bran layer.' },
      { food: 'Brown / Red Matta Rice (cooked)', serving: '1 Standard Cup (150g)', amount: '36.5g Carbs (2.8g Fibre)', calories: '170 kcal', notes: 'Retained cereal germ slows gastric breakdown compared to polished white rice.' },
      { food: 'Jowar / Sorghum Bhakri', serving: '1 Medium (60g)', amount: '28.0g Carbs (3.5g Fibre)', calories: '150 kcal', notes: 'Gluten-free traditional millet with a low-to-moderate glycemic index.' },
      { food: 'Rolled Oats (cooked porridge)', serving: '1 Medium Bowl (40g dry)', amount: '26.4g Carbs (4.1g Fibre)', calories: '154 kcal', notes: 'Rich in beta-glucan soluble fibre that forms a viscous intestinal gel.' },
      { food: 'Sweet Potato (boiled/roasted)', serving: '1 Medium (130g)', amount: '27.0g Carbs (4.0g Fibre)', calories: '115 kcal', notes: 'Packed with slow-digesting starches and provitamin A carotenoids.' }
    ]
  },
  {
    id: 'edu_fats',
    nutrientCode: 'fats',
    name: 'Fats & Essential Fatty Acids',
    icon: '🥑',
    summary: 'Indispensable lipid molecules forming cellular membrane bilayers, insulating nerves, and serving as steroid hormone precursors.',
    whatItDoes: 'Dietary fats (triglycerides, phospholipids, sterols) supply 9 kcal/gram and are essential for absorbing fat-soluble vitamins (A, D, E, K). They form the phospholipid bilayer of every human cell membrane, synthesize the myelin sheath around neuron axons, and provide the cyclopentanoperhydrophenanthrene ring structure for steroid hormones (estrogen, testosterone, cortisol).',
    digestionAndAbsorption: 'In the duodenum, bile salts synthesized by the liver and stored in the gallbladder emulsify fat globules into microscopic micelles. Pancreatic lipase hydrolyzes triglycerides into free fatty acids and 2-monoacylglycerols. In enterocytes, they are re-esterified into triglycerides and packaged into chylomicrons. Chylomicrons exit enterocytes via exocytosis into the lymphatic lacteals, entering systemic venous circulation via the thoracic duct.',
    howBodyUsesIt: 'Endothelial lipoprotein lipase cleaves fatty acids from circulating chylomicrons for cellular uptake. Muscle cells oxidize fatty acids via mitochondrial beta-oxidation during rest and low-intensity aerobic movement. Essential fatty acids—Alpha-Linolenic Acid (Omega-3) and Linoleic Acid (Omega-6)—must come from diet to produce anti-inflammatory eicosanoids (prostaglandins, resolvins).',
    insufficiencyAndExcess: {
      insufficient: 'Inadequate dietary fat (<15% of energy) impairs fat-soluble vitamin absorption, dysregulates steroid hormone balance, causes dry epidermal barrier defects, and reduces cellular membrane fluidity.',
      excessive: 'Surplus dietary fats in a sedentary, caloric-surplus context accumulate in adipose depots and can increase circulating LDL-cholesterol and atherogenic apolipoprotein B (ApoB).'
    },
    sourcesAndServings: [
      { food: 'Cold-Pressed Mustard / Groundnut Oil', serving: '1 Tablespoon (14g)', amount: '14.0g Fat (Monounsaturated/Poly)', calories: '124 kcal', notes: 'Contains heart-healthy oleic and linoleic acids.' },
      { food: 'Desi Cow Ghee', serving: '1 Teaspoon (5g)', amount: '4.9g Fat (Saturated + Butyrate)', calories: '45 kcal', notes: 'Traditional cooking medium with fat-soluble vitamin A and conjugated linoleic acid (CLA).' },
      { food: 'Walnuts (Akhrot)', serving: '4 Whole Halves (15g)', amount: '9.8g Fat (2.5g Omega-3 ALA)', calories: '98 kcal', notes: 'Richest plant nut source of essential alpha-linolenic acid for brain health.' },
      { food: 'Flaxseeds (Alsi, ground)', serving: '1 Tablespoon (10g)', amount: '4.2g Fat (2.3g Omega-3 ALA)', calories: '53 kcal', notes: 'Grind seeds before eating to release internal lipid reserves from tough outer husk.' },
      { food: 'Roasted Peanuts (Moongphali)', serving: '1 Small Fist (30g)', amount: '14.8g Fat (Resveratrol)', calories: '166 kcal', notes: 'Rich in monounsaturated fats, niacin, and plant protein.' }
    ]
  },
  {
    id: 'edu_fibre',
    nutrientCode: 'fibre',
    name: 'Dietary Fibre & Gut Microbiome',
    icon: '🌾',
    summary: 'Non-digestible plant polysaccharides that form a protective glycemic gel matrix and ferment into therapeutic short-chain fatty acids.',
    whatItDoes: 'Dietary fibre encompasses cellulose, hemicellulose, pectins, gums, resistant starches, and beta-glucans. It increases fecal bulk, stimulates peristaltic motility, delays glucose absorption, binds excess bile acids to lower circulating LDL cholesterol, and feeds hundreds of microbial species in the cecum and colon.',
    digestionAndAbsorption: 'Because humans lack endogenous beta-glycosidase enzymes to cleave beta-1,4-glycosidic linkages, fibre passes through the stomach and small intestine undigested and unabsorbed for direct human calories. In the proximal and distal colon, specialized bacterial phyla (Bacteroidetes, Firmicutes) use glycoside hydrolases to anaerobically ferment soluble fibre into Short-Chain Fatty Acids (SCFAs): butyrate, propionate, and acetate.',
    howBodyUsesIt: 'Butyrate serves as the primary energetic fuel for colonic epithelial cells (colonocytes), stimulating mucus production and tightening claudin junction proteins to prevent intestinal permeability ("leaky gut"). Propionate travels to the liver to modulate gluconeogenesis, while acetate enters peripheral circulation to influence metabolic signaling. Fibre is never something to burn off through exercise; it is a metabolic protector.',
    insufficiencyAndExcess: {
      insufficient: 'Low-fibre diets correlate with chronic constipation, diverticular changes, rapid glycemic excursions, and depletion of microbial diversity in the gut.',
      excessive: 'Abruptly increasing fibre from very low to >50g/day without adequate hydration can cause transient abdominal distension, cramping, and flatulence as bacteria adapt.'
    },
    sourcesAndServings: [
      { food: 'Fresh Guava (Amrood with skin)', serving: '1 Medium Fruit (120g)', amount: '6.5g Dietary Fibre', calories: '82 kcal', notes: 'Exceptionally high pectin content with 250mg Vitamin C.' },
      { food: 'Cooked Kala Chana (Bengal Gram)', serving: '1 Standard Katori (150g)', amount: '8.4g Dietary Fibre', calories: '180 kcal', notes: 'High in resistant starches that fuel butyrate-producing microbes.' },
      { food: 'Bhindi / Okra Sabzi (cooked)', serving: '1 Standard Bowl (150g)', amount: '4.8g Dietary Fibre', calories: '75 kcal', notes: 'Rich in viscous mucilage fibre that buffers gastric acids.' },
      { food: 'Pear / Apple (eaten with skin)', serving: '1 Medium Fruit (150g)', amount: '4.6g Dietary Fibre', calories: '85 kcal', notes: 'Pectin in peel forms a slow-diffusing intestinal matrix.' },
      { food: 'Methi Leaves / Fenugreek Greens', serving: '1 Cooked Cup (100g)', amount: '3.9g Dietary Fibre', calories: '49 kcal', notes: 'Contains galactomannan fibre proven to moderate post-meal glucose absorption.' }
    ]
  },
  {
    id: 'edu_water',
    nutrientCode: 'water',
    name: 'Water & Fluid Homeostasis',
    icon: '💧',
    summary: 'The primary biological solvent regulating vascular hemodynamics, cellular osmolarity, joint lubrication, and core thermoregulation.',
    whatItDoes: 'Water constitutes ~60% of adult body mass (~73% of lean skeletal muscle). It maintains intravascular plasma volume for cardiac output, provides hydrostatic pressure for synovial joint lubrication, facilitates trans-membrane chemical diffusion, and enables evaporative heat dissipation via eccrine sweat glands.',
    digestionAndAbsorption: 'Water requires no enzymatic digestion. Ingestion is followed by rapid gastric emptying into the duodenum and jejunum. Water is absorbed passively across intestinal enterocytes driven by osmotic gradients created by active sodium and nutrient transport (aquaporin channels). The large intestine reabsorbs remaining fluids (~1.5L daily), solidifying digestive residues.',
    howBodyUsesIt: 'Osmoreceptors in the anterior hypothalamus continuously sample blood osmolality. When dehydration occurs, the posterior pituitary secretes Arginine Vasopressin (Anti-Diuretic Hormone / ADH), signaling nephron collecting ducts in the kidneys to reabsorb water and concentrate urine. Water supports continuous clearance of nitrogenous protein wastes (urea, creatinine) and regulates internal core temperature during training through perspiration.',
    insufficiencyAndExcess: {
      insufficient: 'A water deficit of just 1–2% body weight impairs cognitive concentration, elevates core temperature and heart rate during exercise, and predisposes to urinary tract stones.',
      excessive: 'Extreme, rapid water overconsumption exceeding renal filtration capacity (~800–1000ml/hour) can cause acute exercise-associated hyponatremia (dilution of blood sodium below 135 mEq/L).'
    },
    sourcesAndServings: [
      { food: 'Pure Filtered Water', serving: '1 Standard Glass (250ml)', amount: '250ml Pure Water', calories: '0 kcal', notes: 'Distribute evenly across waking hours for cellular hydration.' },
      { food: 'Chaas / Plain Buttermilk with jeera', serving: '1 Glass (200ml)', amount: '185ml Water + Electrolytes', calories: '40 kcal', notes: 'Contains natural potassium, sodium, and probiotic cultures.' },
      { food: 'Tender Coconut Water (Nariyal Pani)', serving: '1 Coconut (~250ml)', amount: '235ml Water + 600mg K+', calories: '48 kcal', notes: 'Ideal natural hypotonic rehydration fluid packed with potassium and magnesium.' },
      { food: 'Cucumber Slices (Kheera)', serving: '1 Medium Cucumber (150g)', amount: '142ml Water (95% hydration)', calories: '22 kcal', notes: 'High water content with silica and refreshing electrolytes.' },
      { food: 'Watermelon Cubes (Tarbooj)', serving: '1 Bowl (200g)', amount: '184ml Water (92% hydration)', calories: '60 kcal', notes: 'Natural hydration paired with citrulline for vascular nitric oxide support.' }
    ]
  },
  {
    id: 'edu_vit_min',
    nutrientCode: 'vitamins_minerals',
    name: 'Vitamins & Minerals (Micronutrients)',
    icon: '🍋',
    summary: 'Catalytic co-factors and coordination complexes that drive enzymatic biochemical pathways, bone remodeling, and antioxidant defenses.',
    whatItDoes: 'Micronutrients do not directly provide caloric energy; rather, they serve as non-protein coenzymes and inorganic cofactors necessary for every metabolic reaction. Iron binds oxygen; Calcium governs neuromuscular excitation and osteogenesis; Magnesium stabilizes Mg-ATP for 300+ enzymes; Vitamin C donates electrons for collagen synthesis.',
    digestionAndAbsorption: 'Fat-soluble vitamins (A, D, E, K) require dietary lipids and bile micelles for lymphatic absorption. Water-soluble vitamins (B-complex, C) and minerals are absorbed via specialized carrier proteins in the jejunum and ileum. Non-heme plant iron (Fe3+) requires reduction to ferrous (Fe2+) by Vitamin C for uptake through DMT1; calcium absorption in the intestine requires Vitamin D-induced calbindin.',
    howBodyUsesIt: 'Iron is incorporated into heme within the bone marrow to produce red blood cells and myoglobin. Calcium is continuously deposited into and withdrawn from the skeletal hydroxyapatite bank under parathyroid hormone (PTH) and calcitonin control. Magnesium relaxes contracted muscle fibers and stabilizes cellular DNA. Vitamin C protects endothelial cells from oxidative lipid peroxidation.',
    insufficiencyAndExcess: {
      insufficient: 'Inadequate iron causes microcytic anemia, chronic fatigue, and impaired thermoregulation; low calcium/vitamin D leads to osteopenia and bone demineralization; low magnesium manifests in muscle cramps and nervous tension.',
      excessive: 'Fat-soluble vitamins (especially preformed Vitamin A and Vitamin D) can accumulate in adipose and hepatic tissues if consumed in extreme megadoses; water-soluble vitamins are generally excreted in urine.'
    },
    sourcesAndServings: [
      { food: 'Amla / Indian Gooseberry', serving: '1 Medium Fruit (50g)', amount: '250mg Vitamin C (350% RDA)', calories: '24 kcal', notes: 'The most concentrated whole-food antioxidant fruit in Indian nutrition.' },
      { food: 'Ragi / Finger Millet Flour', serving: '1 Bowl Ragi Kali / Dosa (100g dry)', amount: '344mg Calcium (34% RDA)', calories: '328 kcal', notes: 'Over 30 times more calcium than white rice; ideal for skeletal mineralization.' },
      { food: 'Pumpkin Seeds (Kaddu ke beej)', serving: '2 Tablespoons (28g)', amount: '150mg Magnesium (38% RDA)', calories: '160 kcal', notes: 'Rich in zinc, magnesium, and healthy phytosterols for neuromuscular recovery.' },
      { food: 'Methi Leaves (Fresh Fenugreek)', serving: '1 Bowl cooked (100g)', amount: '2.8mg Iron (15% RDA)', calories: '45 kcal', notes: 'Rich in bioflavonoids and non-heme iron; pair with fresh lemon juice.' },
      { food: 'Sesame Seeds (Til)', serving: '1 Tablespoon (15g)', amount: '145mg Calcium & 2.1mg Iron', calories: '88 kcal', notes: 'Traditional winter superfood rich in copper, manganese, and calcium.' }
    ]
  }
];

export const REAL_FOODS_DATABASE = [
  {
    name: 'Toor / Arhar Dal (Tadka)',
    category: 'Lentils & Pulses',
    servingSize: '1 Standard Katori (150g)',
    calories: 156,
    protein: 10.2,
    carbs: 21.3,
    fats: 3.5,
    fibre: 5.9,
    iron: 2.1,
    calcium: 33,
    biologicalRole: 'Supplies essential lysine and slow-digesting complex starches. Pairs with grains for complete amino acid profiles.'
  },
  {
    name: 'Whole Wheat Roti',
    category: 'Whole Grains',
    servingSize: '2 Medium Rotis (70g)',
    calories: 185,
    protein: 6.2,
    carbs: 32.0,
    fats: 2.1,
    fibre: 4.2,
    iron: 1.8,
    calcium: 20,
    biologicalRole: 'Provides methionine and sustained complex carbohydrates with dietary fibre from intact cereal bran.'
  },
  {
    name: 'Paneer (Fresh Cottage Cheese)',
    category: 'Dairy',
    servingSize: '100g Cubes',
    calories: 265,
    protein: 18.3,
    carbs: 3.2,
    fats: 20.8,
    fibre: 0.0,
    iron: 0.3,
    calcium: 208,
    biologicalRole: 'Slow-digesting micellar casein and bioavailable calcium supporting bone density and night-time tissue repair.'
  },
  {
    name: 'Curd / Plain Dahi',
    category: 'Dairy & Probiotic',
    servingSize: '1 Standard Katori (150g)',
    calories: 92,
    protein: 6.5,
    carbs: 6.8,
    fats: 4.5,
    fibre: 0.0,
    iron: 0.2,
    calcium: 210,
    biologicalRole: 'Delivers live lactic acid cultures (L. bulgaricus) that produce antimicrobial bacteriocins and ease lactose digestion.'
  },
  {
    name: 'Sprouted Moong Beans',
    category: 'Legumes & Sprouts',
    servingSize: '1 Cup (100g raw sprouts)',
    calories: 105,
    protein: 7.8,
    carbs: 18.2,
    fats: 0.6,
    fibre: 4.8,
    iron: 2.4,
    calcium: 45,
    biologicalRole: 'Germination degrades seed phytates, elevating bioavailability of zinc, iron, and active enzymes.'
  },
  {
    name: 'Brown / Red Matta Rice',
    category: 'Whole Grains',
    servingSize: '1 Standard Cup (150g cooked)',
    calories: 170,
    protein: 3.8,
    carbs: 36.5,
    fats: 1.4,
    fibre: 2.8,
    iron: 1.2,
    calcium: 15,
    biologicalRole: 'Preserved bran and germ layers deliver thiamine (B1) and slow down enzymatic glucose release.'
  },
  {
    name: 'Boiled Egg',
    category: 'Poultry & Eggs',
    servingSize: '2 Medium Eggs (100g)',
    calories: 143,
    protein: 12.6,
    carbs: 0.8,
    fats: 9.8,
    fibre: 0.0,
    iron: 1.8,
    calcium: 56,
    biologicalRole: 'Contains 100% biological value protein, choline for acetylcholine neurotransmission, and lutein for retinal health.'
  },
  {
    name: 'Fresh Guava (Amrood)',
    category: 'Fruits',
    servingSize: '1 Medium Fruit (120g)',
    calories: 82,
    protein: 3.1,
    carbs: 17.2,
    fats: 1.1,
    fibre: 6.5,
    iron: 0.4,
    calcium: 22,
    biologicalRole: 'Supplies 250mg ascorbic acid and soluble pectin that forms a gel barrier in the gut lumen to buffer sugar spikes.'
  },
  {
    name: 'Almonds (Badam)',
    category: 'Nuts & Seeds',
    servingSize: '1 Ounce / 23 Kernels (28g)',
    calories: 164,
    protein: 6.0,
    carbs: 6.1,
    fats: 14.2,
    fibre: 3.5,
    iron: 1.1,
    calcium: 76,
    biologicalRole: 'Dense alpha-tocopherol (Vitamin E) that protects cell membranes from lipid peroxidation, paired with magnesium.'
  },
  {
    name: 'Palak Paneer (Cooked)',
    category: 'Vegetables & Dairy',
    servingSize: '1 Standard Bowl (180g)',
    calories: 220,
    protein: 11.5,
    carbs: 8.5,
    fats: 15.2,
    fibre: 3.8,
    iron: 2.8,
    calcium: 220,
    biologicalRole: 'Combines spinach folates and carotenoids with dairy calcium and complete proteins for cellular nourishment.'
  }
];
