/**
 * Nutrel Educational Lessons & Knowledge Checks
 * Biology-grounded nutrition education explaining real physiological mechanisms.
 * Replaces brick-construction analogies with cellular biochemistry and organ physiology.
 */

export const LESSONS = [
  {
    id: 'lesson_protein',
    nutrientCode: 'protein',
    title: 'Protein: Digestion, Amino Acids & Tissue Adaptation',
    icon: '🧬',
    readTime: '3 min read',
    analogy: 'Dietary protein is not absorbed whole. Gastric acid (pepsin) and pancreatic proteases hydrolyze protein chains into free amino acids, which enter the portal circulation to replenish your circulating amino acid pool for tissue renewal, enzymatic catalysts, and muscle adaptation.',
    keyPoints: [
      {
        heading: 'Enzymatic Digestion to Free Amino Acids',
        text: 'In the stomach, hydrochloric acid denatures coiled dietary proteins, enabling the enzyme pepsin to cleave them into peptides. In the duodenum, pancreatic proteases (trypsin, chymotrypsin) complete the breakdown into free amino acids and dipeptides, which are actively absorbed through intestinal enterocytes into the bloodstream.'
      },
      {
        heading: 'Training, Recovery, Sleep & Nutrition Synergy',
        text: 'Resistance exercise creates micro-mechanical stimuli in skeletal muscle that upregulate Muscle Protein Synthesis (MPS). During deep slow-wave sleep, the pituitary gland releases growth hormone to drive cellular repair cascades. Consuming balanced dietary protein supplies the raw amino acid substrate required for tissue remodeling.'
      },
      {
        heading: 'The Indian Complementary Amino Acid Secret',
        text: 'Plant proteins often have differing amino acid profiles. Cereals (wheat roti, rice) are rich in methionine and cysteine but limited in lysine. Legumes (dal, chana, rajma) are rich in lysine and lower in methionine. Eating them together provides a complete, balanced amino acid spectrum comparable to animal proteins.'
      }
    ],
    quiz: {
      question: 'How do dietary proteins actually get absorbed and utilized by your muscles and organs?',
      options: [
        'They are absorbed intact as whole protein fibers directly into muscle tissue',
        'They are enzymatically cleaved into free amino acids, absorbed into the bloodstream, and reassembled by cellular ribosomes',
        'They are converted immediately into glycogen in the stomach',
        'They bypass digestion entirely and act as inert tissue filler'
      ],
      correctIndex: 1,
      explanation: 'Digestive enzymes hydrolyze proteins into individual amino acids and small peptides. Once absorbed into the bloodstream, cells use these amino acids as substrates to synthesize new functional proteins, enzymes, and muscle tissue.'
    }
  },
  {
    id: 'lesson_carbs',
    nutrientCode: 'carbs',
    title: 'Carbohydrates & Sugars: Cellular Fuel & Glycogen Dynamics',
    icon: '⚡',
    readTime: '3 min read',
    analogy: 'Carbohydrates are digested by salivary and pancreatic amylase into simple sugars (glucose). Glucose fuels cellular respiration to generate ATP, and surplus energy is stored as glycogen in liver and muscle tissue. Exercise uses energy, but cannot mathematically erase a meal.',
    keyPoints: [
      {
        heading: 'Digestion into Glucose and Cellular Uptake',
        text: 'Complex starches are broken down into glucose molecules by amylase enzymes. Glucose enters the bloodstream, triggering the pancreas to secrete insulin. Insulin prompts GLUT-4 transporters to migrate to cell membranes, facilitating glucose uptake for cellular glycolysis and ATP generation in mitochondria.'
      },
      {
        heading: 'Glycogen Storage and Exercise Physiology',
        text: 'Excess circulating glucose is polymerized into glycogen, stored primarily in skeletal muscle (~400-500g) and the liver (~100g). During physical activity, muscle contractions stimulate glucose uptake directly—even independently of insulin! However, exercise and nutrition serve complementary biological roles; movement is a tool for vitality, not punishment for eating.'
      },
      {
        heading: 'Complex Carbs vs Refined Sugars',
        text: 'Whole unrefined carbohydrates (millets, whole wheat, pulses) contain intact plant matrices and dietary fibre that delay gastric emptying and slow enzymatic breakdown, delivering sustained blood glucose without steep insulin surges.'
      }
    ],
    quiz: {
      question: 'Where does your body store excess digested glucose for future physical activity?',
      options: [
        'As glycogen reserves in skeletal muscle and the liver',
        'Inside the lungs as oxygen carriers',
        'In the stomach lining as digestive acid',
        'Directly in bone marrow as calcium'
      ],
      correctIndex: 0,
      explanation: 'Skeletal muscles and the liver convert surplus glucose into glycogen chains. Muscle glycogen supplies rapid localized energy during exercise, while hepatic (liver) glycogen maintains steady blood glucose levels between meals.'
    }
  },
  {
    id: 'lesson_fibre',
    nutrientCode: 'fibre',
    title: 'Dietary Fibre: Prebiotics, SCFA Fermentation & Glycemic Buffer',
    icon: '🌾',
    readTime: '3 min read',
    analogy: 'Fibre consists of non-starch plant polysaccharides that resist human gastrointestinal enzymes. Far from useless, soluble fibre forms a viscous gel that moderates glucose absorption, while colonic microbiota ferment it into anti-inflammatory Short-Chain Fatty Acids (SCFAs).',
    keyPoints: [
      {
        heading: 'Resistant Polysaccharides & Viscous Lumen Gel',
        text: 'Human digestive enzymes cannot hydrolyze beta-glycosidic bonds in cellulose, pectins, and beta-glucans. Soluble fibres dissolve in intestinal water, creating a viscous gel layer along the intestinal villi. This physical barrier slows carbohydrate diffusion and digestive enzyme access, blunting postprandial glucose spikes.'
      },
      {
        heading: 'Microbiome Fermentation & Short-Chain Fatty Acids',
        text: 'In the large intestine, trillions of beneficial gut bacteria ferment prebiotic fibre into Short-Chain Fatty Acids (SCFAs): butyrate, propionate, and acetate. Butyrate serves as the primary energetic fuel for colonic epithelial cells (colonocytes), maintaining gut mucosal barrier integrity and supporting immune homeostasis.'
      },
      {
        heading: 'Fibre is Never Something to "Burn Off"',
        text: 'Because dietary fibre passes through the small intestine largely unabsorbed for human caloric energy, it is impossible—and physiologically nonsensical—to treat fibre as calories to burn off through exercise. It is a biological protector and metabolic moderator.'
      }
    ],
    quiz: {
      question: 'What crucial metabolic compounds are produced when beneficial gut bacteria ferment soluble fibre?',
      options: [
        'Pure cholesterol molecules',
        'Short-Chain Fatty Acids (like butyrate) that nourish intestinal cells and modulate inflammation',
        'Synthetic digestive acid',
        'Carbon monoxide gas'
      ],
      correctIndex: 1,
      explanation: 'Colonic fermentation of dietary fibre yields Short-Chain Fatty Acids (SCFAs), predominantly butyrate, propionate, and acetate. Butyrate fuels the intestinal lining, reinforces gut barrier tightness, and promotes metabolic health.'
    }
  },
  {
    id: 'lesson_iron',
    nutrientCode: 'iron',
    title: 'Iron: Hemoglobin, Oxygen Delivery & Cellular Respiration',
    icon: '🩸',
    readTime: '3 min read',
    analogy: 'Iron is the catalytic transition metal coordinating the porphyrin ring of hemoglobin and mitochondrial cytochromes. It enables oxygen binding in the lungs and drives cellular electron transport to generate ATP.',
    keyPoints: [
      {
        heading: 'Hemoglobin and Mitochondrial Respiration',
        text: 'Iron resides at the core of hemoglobin within red blood cells, binding oxygen in the pulmonary capillaries and releasing it to working brain and muscle tissues. Inside every cell, iron-sulfur complexes in mitochondrial cytochromes transfer electrons along the respiratory chain, directly driving cellular ATP synthesis.'
      },
      {
        heading: 'Plant Non-Heme Iron Reduction (The Lemon Effect)',
        text: 'Plant foods (spinach, lentils, jaggery) contain ferric iron (Fe3+), which is relatively insoluble at neutral intestinal pH. Ascorbic acid (Vitamin C from fresh lemon juice or amla) donates an electron to reduce ferric iron to soluble ferrous iron (Fe2+), which is transported readily through enterocyte DMT1 receptors, boosting absorption up to 300%.'
      },
      {
        heading: 'Tannin and Phytate Chelation',
        text: 'Polyphenols and tannins in tea and coffee form insoluble chelates with dietary non-heme iron, preventing intestinal absorption. Spacing tea or coffee 45–60 minutes away from main meals preserves iron uptake.'
      }
    ],
    quiz: {
      question: 'Why does squeezing fresh lemon juice over dal or sabzi dramatically increase iron uptake?',
      options: [
        'Lemon juice destroys the iron atoms so they dissolve faster',
        'Vitamin C chemically reduces plant ferric iron (Fe3+) into soluble, absorbable ferrous iron (Fe2+)',
        'Lemon juice prevents food from reaching the stomach',
        'Citric acid replaces the need for hemoglobin in red blood cells'
      ],
      correctIndex: 1,
      explanation: 'Ascorbic acid (Vitamin C) acts as a reducing agent in the acidic duodenal lumen, converting insoluble Fe3+ into Fe2+, which easily crosses into intestinal cells via Divalent Metal Transporter 1 (DMT1).'
    }
  },
  {
    id: 'lesson_calcium',
    nutrientCode: 'calcium',
    title: 'Calcium: Neuromuscular Signaling & Skeletal Remodeling',
    icon: '🦴',
    readTime: '3 min read',
    analogy: 'Calcium ions (Ca2+) function as vital intracellular secondary messengers that initiate muscle fiber contraction and neurotransmission, while 99% of bodily calcium forms the hydroxyapatite matrix of living, continuously remodeling bone tissue.',
    keyPoints: [
      {
        heading: 'Intracellular Ion Flux and Muscle Contraction',
        text: 'When a motor nerve fires an action potential, calcium ions flood the muscle sarcoplasm from the sarcoplasmic reticulum. Calcium binds to troponin C, causing tropomyosin to shift and exposing actin binding sites. Myosin cross-bridges can then bind actin to produce muscular contraction.'
      },
      {
        heading: 'Dynamic Skeletal Remodeling & Vitamin D',
        text: 'Bones are dynamic, living endocrine organs. Specialized cells called osteoclasts resorb older bone matrix, while osteoblasts synthesize new collagenous matrix and deposit calcium hydroxyapatite crystals. Active Vitamin D (calcitriol) stimulates the synthesis of calbindin transport proteins in the intestinal mucosa to enable efficient dietary calcium absorption.'
      },
      {
        heading: 'Diverse Indian Calcium Sources',
        text: 'Beyond dairy staples like curd and paneer, traditional Indian finger millet (Ragi) provides ~344mg of calcium per 100g, while sesame seeds (til) and drumstick leaves offer dense plant-based mineral reserves.'
      }
    ],
    quiz: {
      question: 'What is the immediate biological role of calcium ions (Ca2+) during muscular contraction?',
      options: [
        'They convert into pure glucose for immediate heat',
        'They bind to troponin, exposing binding sites so actin and myosin filaments can slide and contract',
        'They dissolve the muscle fibers to reduce tension',
        'They replace hemoglobin in circulating red blood cells'
      ],
      correctIndex: 1,
      explanation: 'In neuromuscular physiology, the release of intracellular Ca2+ binds to troponin, causing a conformational change that moves tropomyosin away from actin filaments, enabling myosin heads to pull and generate muscular force.'
    }
  },
  {
    id: 'lesson_water',
    nutrientCode: 'water',
    title: 'Water: Cellular Osmolality, Transpiration & Renal Clearance',
    icon: '💧',
    readTime: '3 min read',
    analogy: 'Water makes up roughly 60% of adult body mass. It is the universal biological medium regulating plasma volume, thermoregulatory sweat evaporation, joint lubrication, and renal glomerular filtration of metabolic wastes.',
    keyPoints: [
      {
        heading: 'Fluid Compartments and Cellular Osmolality',
        text: 'Body water is divided between intracellular fluid (two-thirds) and extracellular fluid (one-third, including blood plasma and interstitial fluid). Electrolyte balance (sodium, potassium, chloride) driven by cellular Na+/K+-ATPase pumps maintains the osmotic pressure that prevents cells from shrinking or swelling.'
      },
      {
        heading: 'Thermoregulation & Cardiovascular Perfusion',
        text: 'During physical activity or warm weather, the sympathetic nervous system activates eccrine sweat glands. Evaporative transpiration of water from the skin removes heat, cooling core arterial blood. Adequate hydration maintains intravascular plasma volume, keeping heart rate and cardiac stroke volume stable.'
      },
      {
        heading: 'Renal Clearance of Metabolic Wastes',
        text: 'The kidneys filter approximately 180 liters of fluid daily through nephron glomeruli, concentrating metabolic waste products (urea from protein deamination, creatinine, excess salts) into urine. Consistent daily hydration reduces stone formation risk and preserves renal function.'
      }
    ],
    quiz: {
      question: 'How does adequate water intake support kidney and metabolic function?',
      options: [
        'It converts blood into pure lymph fluid',
        'It maintains plasma volume, enabling nephrons to filter metabolic wastes like urea and creatinine into urine',
        'It freezes core body temperature below 30°C',
        'It eliminates all cellular electrolytes from the body'
      ],
      correctIndex: 1,
      explanation: 'Adequate hydration maintains sufficient renal blood flow and glomerular filtration rate (GFR), allowing the kidneys to concentrate and excrete cellular metabolic byproducts while reabsorbing vital electrolytes.'
    }
  }
];
