export interface Artwork {
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions?: string;
  collection: string;
  description: string;
  imageUrl?: string;
  museumSite?: string;
  colorPalette: { name: string; hex: string; source: string }[];
  accentColor: string;
}

export interface ArtLocation {
  id: string;
  name: string;
  cityOrSite: string;
  state: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  eraCategory: 'prehistoric' | 'ancient' | 'medieval' | 'miniatures' | 'folk' | 'modern';
  eraPeriod: string;
  approximateYears: string;
  artCategory: 'Murals & Rock Art' | 'Court Miniatures' | 'Folk & Tribal Art' | 'Sacred Textiles & Scrolls' | 'Modern & Contemporary';
  geo: {
    lat: number;
    lng: number;
    // Map SVG projection percentage coords (0-100% within India viewport)
    mapX: number;
    mapY: number;
  };
  patronage: string;
  movementName: string;
  keyArtists: string[];
  materialsAndTechniques: string[];
  stylisticHallmarks: string[];
  historicalContext: string;
  geographicDiffusion: string;
  connectedLocationIds: string[];
  masterpiece: Artwork;
  curatorialAudioScript: string;
}

export const ART_LOCATIONS: ArtLocation[] = [
  {
    id: 'ajanta',
    name: 'Ajanta Caves',
    cityOrSite: 'Aurangabad District',
    state: 'Maharashtra',
    region: 'West',
    eraCategory: 'ancient',
    eraPeriod: 'Classical Gupta & Vakataka Era',
    approximateYears: '2nd c. BCE – 5th c. CE',
    artCategory: 'Murals & Rock Art',
    geo: { lat: 20.5519, lng: 75.7033, mapX: 43.5, mapY: 53.5 },
    patronage: 'Satavahana & Vakataka Dynasties (King Harishena)',
    movementName: 'Classical Indian Buddhist Cave Murals',
    keyArtists: ['Guilds of Master Buddhist Monks & Royal Chitrakaras'],
    materialsAndTechniques: [
      'Mud-plaster ground mixed with cow dung, husk, and clay',
      'Tempera on dry rock plaster (fresco-secco)',
      'Natural mineral pigments: lapis lazuli (imported from Badakhshan), red and yellow ochre, terra verde, kaolin white, lampblack'
    ],
    stylisticHallmarks: [
      'Flowing calligraphic contour lines giving three-dimensional roundness',
      'Tribhanga (thrice-bent graceful body stance)',
      'Half-closed contemplative lotus eyes (padma-netra)',
      'Continuous visual narrative across cave rock surfaces'
    ],
    historicalContext:
      'Carved into a horseshoe-shaped basalt gorge along the Waghora River, the 30 rock-cut caves of Ajanta represent the pinnacle of classical Indian painting. Under the peaceful patronage of the Vakatakas in the 5th century CE, artists developed a sophisticated visual vocabulary capturing both transcendent spiritual Buddhist ideals (such as Bodhisattva Padmapani and Vajrapani) and opulent palace life with court musicians, foreign emissaries, and forest creatures.',
    geographicDiffusion:
      'The aesthetic canons developed at Ajanta radiated across ancient Asia. Ajanta mural techniques traveled south to Badami, Sittanavasal, and Sigiriya in Sri Lanka, while northern silk road branches carried its stylistic idiom through Bamiyan (Afghanistan) to Dunhuang and Kizil caves in western China.',
    connectedLocationIds: ['bhimbetka', 'lepakshi', 'hampi'],
    masterpiece: {
      title: 'Bodhisattva Padmapani (Cave 1)',
      artist: 'Anonymous Vakataka Court Master',
      year: 'c. 450–500 CE',
      medium: 'Mineral tempera on prepared basalt cave wall',
      dimensions: '213 cm × 130 cm',
      collection: 'Ajanta Cave 1, Archaeological Survey of India (UNESCO World Heritage)',
      description:
        'The compassionate Bodhisattva Avalokiteshvara stands in graceful tribhanga pose holding a blue lotus (utpala). Draped in pearls, wearing a jeweled tiara, his downward gaze radiates infinite calm amid worldly chaos.',
      colorPalette: [
        { name: 'Lapis Lazuli Blue', hex: '#2A4B7C', source: 'Imported Afghan Lapis' },
        { name: 'Geru Ochre', hex: '#A85A32', source: 'Local Iron Oxide Earth' },
        { name: 'Terra Verde', hex: '#526E4E', source: 'Green Glauconite Clay' },
        { name: 'Kaolin Bone', hex: '#EDE6D6', source: 'Purified White Clay' }
      ],
      accentColor: '#9A3412'
    },
    curatorialAudioScript:
      'Welcome to Cave 1 at Ajanta. Notice the gentle curvature of Bodhisattva Padmapani’s neck and waist. The artist did not use harsh shadows; instead, subtle gradations of warm ochre and lapis blue define the soft anatomy. Notice how the jewel crown glints against the dark rock face—a testament to 1,500 years of meditative genius.'
  },
  {
    id: 'madhubani',
    name: 'Mithila / Madhubani',
    cityOrSite: 'Madhubani & Jitwarpur',
    state: 'Bihar',
    region: 'East',
    eraCategory: 'folk',
    eraPeriod: 'Ancient Living Ritual Tradition',
    approximateYears: 'Antiquity to Present',
    artCategory: 'Folk & Tribal Art',
    geo: { lat: 26.3541, lng: 86.0716, mapX: 63.5, mapY: 38.0 },
    patronage: 'Matrilineal Domestic Rituals & Village Communities of Mithila',
    movementName: 'Mithila Folk Painting (Bharni, Katchni, Godna Styles)',
    keyArtists: ['Sita Devi', 'Mahasundari Devi', 'Ganga Devi', 'Baua Devi'],
    materialsAndTechniques: [
      'Bamboo twigs, matchsticks, and cotton-wrapped nib pens',
      'Natural dyes from aparajita flowers (blue), turmeric (yellow), kusum (orange), soot (black), and bilva tree gum',
      'Handmade mud walls coated with cow dung, now also on handmade paper'
    ],
    stylisticHallmarks: [
      'Double outline drawing with cross-hatching and dot fills',
      'No empty space (horror vacui): backgrounds filled with birds, flowers, sun, and fish',
      'Two-dimensional flat perspective with large, expressive almond-shaped eyes',
      'Sacred geometric motifs: Kohbar (bridal chamber diagram) and Aripan (floor paintings)'
    ],
    historicalContext:
      'Originating in the Mithila region across northern Bihar and southern Nepal, Madhubani painting was traditionally practiced exclusively by women on the freshly plastered mud walls of their huts during weddings and seasonal celebrations. Following the severe Bihar drought of 1966, Pupul Jayakar and the All India Handicrafts Board encouraged the women to paint on paper, unleashing a global artistic renaissance led by masters like Sita Devi and Ganga Devi.',
    geographicDiffusion:
      'From domestic ritual chambers in Jitwarpur and Ranti villages, Madhubani spread to international art biennials. Its graphic line system influenced Bengal folk revivalists and gave rise to modern eco-conscious Indian graphic narratives.',
    connectedLocationIds: ['kolkata', 'raghurajpur'],
    masterpiece: {
      title: 'Kohbar: The Lotus & Cosmic Fish',
      artist: 'Sita Devi & Tradition of Jitwarpur',
      year: 'Mid-20th Century / Living Tradition',
      medium: 'Plant dyes and soot on cow-dung treated handmade paper',
      dimensions: '91 cm × 61 cm',
      collection: 'National Crafts Museum, New Delhi',
      description:
        'The sacred Kohbar visualizes fertility and divine union. At the center blooms a lotus stalk pierced by bamboo, surrounded by auspicious symbols of sun, moon, turtles, and parrots.',
      colorPalette: [
        { name: 'Soot Lampblack', hex: '#1C1917', source: 'Kajal collected over earthen lamp' },
        { name: 'Turmeric Yellow', hex: '#E09F3E', source: 'Fresh ground haldi rhizome' },
        { name: 'Palash Vermilion', hex: '#C84B31', source: 'Flame of the forest blossom' },
        { name: 'Indigo Leaf', hex: '#264653', source: 'Indigofera tinctoria' }
      ],
      accentColor: '#B45309'
    },
    curatorialAudioScript:
      'In Mithila tradition, a painting is not merely decorative; it is an invocation. Notice how every square centimeter is woven with nature—the fish represents fertility, the turtle cosmic balance, and the lotus blossoming consciousness. The rhythmic nib strokes were drawn directly by hand without preliminary pencil sketches.'
  },
  {
    id: 'thanjavur',
    name: 'Thanjavur (Tanjore)',
    cityOrSite: 'Thanjavur Royal Capital',
    state: 'Tamil Nadu',
    region: 'South',
    eraCategory: 'medieval',
    eraPeriod: 'Late Nayaka & Maratha Golden Age',
    approximateYears: '16th – 19th c. CE',
    artCategory: 'Murals & Rock Art',
    geo: { lat: 10.7870, lng: 79.1378, mapX: 47.0, mapY: 82.5 },
    patronage: 'Thanjavur Nayakas & Maratha King Serfoji II Bhonsle',
    movementName: 'Tanjore Sacred Relief Painting (Palagai Padam)',
    keyArtists: ['Raju & Chettiar Guilds of Thanjavur and Tiruchirappalli'],
    materialsAndTechniques: [
      'Teak or jackfruit wood plank (palagai) pasted with unbleached cotton cloth',
      'Gesso embossing: mixture of chalk powder (sukku) and Arabic gum',
      '22-karat genuine gold leaf foil overlaid on raised gesso relief',
      'Cut semi-precious Jaipur stones and Belgian colored glass gems'
    ],
    stylisticHallmarks: [
      'High-relief embossed ornamentation on crowns, pillars, and drapery',
      'Luminous gold gilding reflecting temple oil lamps',
      'Chubby, divine infant figures with rounded faces and smiling almond eyes',
      'Rich arch frames (prabhavali) draped with ornate velvet curtain swags'
    ],
    historicalContext:
      'Emerging after the fall of the Vijayanagara Empire when Telugu artisans migrated south to the Kaveri delta under Nayaka kings, Thanjavur painting flourished immensely under the Maratha rulers of Tanjore, notably Maharaja Serfoji II (1798–1832). Created primarily as icons of devotion for home shrines and royal puja rooms, the paintings are celebrated for their dazzling longevity and opulent three-dimensional relief.',
    geographicDiffusion:
      'Thanjavur painting synthesized Vijayanagara mural drafts, Deccan court sensibilities, and European company-school modeling. It directly influenced Mysore painting in Karnataka and Chettinad architectural interiors in southern Tamil Nadu.',
    connectedLocationIds: ['hampi', 'cholamandal'],
    masterpiece: {
      title: 'Navaneetha Krishna with Gopis',
      artist: 'Thanjavur Court Chitrakara Guild',
      year: 'c. 1820 CE',
      medium: 'Gold leaf foil, semi-precious gems, and vegetable tempera on teak wood',
      dimensions: '76 cm × 61 cm',
      collection: 'Government Museum, Chennai / Thanjavur Art Gallery',
      description:
        'A radiant baby Krishna sits on an embossed golden throne holding a ball of freshly churned butter. The grand prabhavali arch is intricately encrusted with 22k gold foil and ruby-hued Jaipur stones.',
      colorPalette: [
        { name: 'Pure Gold Leaf', hex: '#D4AF37', source: 'Beaten 22k Gold Foil' },
        { name: 'Deep Crimson', hex: '#780016', source: 'Cinnabar & Lac dye' },
        { name: 'Emerald Gem Green', hex: '#1B4332', source: 'Copper carbonate malachite' },
        { name: 'Ivory Cream', hex: '#F4EBD9', source: 'Fine chalk & conch shell powder' }
      ],
      accentColor: '#B45309'
    },
    curatorialAudioScript:
      'Observe how the light bounces off the raised relief. The artist first molded the crowns and curtains with fine chalk paste, then delicately burnished sheets of pure gold leaf over it before embedding faceted glass gems. These icons were designed to glow inside dimly lit sanctums illuminated only by brass oil lamps.'
  },
  {
    id: 'kishangarh',
    name: 'Kishangarh',
    cityOrSite: 'Kishangarh, Marwar',
    state: 'Rajasthan',
    region: 'West',
    eraCategory: 'miniatures',
    eraPeriod: 'Rajput Court Atelier',
    approximateYears: 'c. 1730 – 1765 CE',
    artCategory: 'Court Miniatures',
    geo: { lat: 26.5772, lng: 74.8643, mapX: 42.0, mapY: 37.5 },
    patronage: 'Maharaja Sawant Singh (poet-devotee Nagari Das)',
    movementName: 'Kishangarh School of Rajasthani Miniature',
    keyArtists: ['Nihal Chand (Master Court Painter)', 'Sitaram', 'Bhavanidas'],
    materialsAndTechniques: [
      'Wasli paper: layered handmade rag paper burnished with agate stone',
      'Fine squirrel-tail hair brushes (often single hair for eyelashes)',
      'Precious mineral pigments: lapis, vermilion, peori (cow urine yellow), and shell gold (asl-i hal)'
    ],
    stylisticHallmarks: [
      'Exaggerated elongated profile with high arched eyebrows and curved lotus eyes',
      'Delicate pointed chin, serpentine curls escaping transparent odhani (veil)',
      'Serene panoramic lake landscapes reflecting twilight palaces and lotus boats',
      'Intense lyrical and mystical devotion fusing earthly and divine love'
    ],
    historicalContext:
      'Under the poet-king Sawant Singh, Kishangarh produced one of the most distinctive and poetic schools in world miniature painting. Sawant Singh fell deeply in love with a singer and poetess at court named Vishnupriya, nicknamed "Bani Thani" (The Well-Attired One). Working with the genius court painter Nihal Chand, they immortalized her refined visage as the eternal archetypal face of Radha.',
    geographicDiffusion:
      'Kishangarh represented a lyrical departure from heavier Mughal and Mewar formulas. Its stylization of facial features and atmospheric twilight color washes resonated across Marwar, Bundi, and the later Pahari ateliers.',
    connectedLocationIds: ['mughal', 'kangra', 'nathdwara'],
    masterpiece: {
      title: 'Bani Thani (Radha of Kishangarh)',
      artist: 'Nihal Chand',
      year: 'c. 1750 CE',
      medium: 'Gouache and gold pigment on wasli paper',
      dimensions: '48 cm × 36 cm',
      collection: 'National Museum, New Delhi',
      description:
        'Hailed as the "Indian Mona Lisa", this iconic miniature shows Radha holding two lotus buds in her left hand. Her gossamer veil is edged with delicate gold borders, revealing her elongated lotus eyes and enigmatic smile.',
      colorPalette: [
        { name: 'Odhani Gold', hex: '#C5A059', source: 'Powdered shell gold' },
        { name: 'Marwar Vermilion', hex: '#B83B26', source: 'Purified Cinnabar' },
        { name: 'Pistachio Sky', hex: '#6B8E7D', source: 'Crushed green earth' },
        { name: 'Pearl Luminescence', hex: '#F5F3ED', source: 'Crushed sea pearl dust' }
      ],
      accentColor: '#9A3412'
    },
    curatorialAudioScript:
      'Look closely at the transparent odhani or veil painted by Nihal Chand. With a single-hair squirrel brush, he created a fabric so sheer you can see the pearl necklace beneath it. The dramatic arch of her eyebrow and the tip of her curled lock of hair symbolize the spiritual longing of the human soul for the infinite.'
  },
  {
    id: 'kangra',
    name: 'Kangra & Basohli',
    cityOrSite: 'Kangra Valley & Guler',
    state: 'Himachal Pradesh',
    region: 'North',
    eraCategory: 'miniatures',
    eraPeriod: 'Pahari Rajput Golden Era',
    approximateYears: 'c. 1740 – 1820 CE',
    artCategory: 'Court Miniatures',
    geo: { lat: 32.1000, lng: 76.2678, mapX: 43.0, mapY: 21.0 },
    patronage: 'Raja Sansar Chand of Kangra & Raja Kripal Pal of Basohli',
    movementName: 'Pahari Miniature Painting (Guler-Kangra Style)',
    keyArtists: ['Manaku', 'Nainsukh of Guler', 'Fattu', 'Khushala'],
    materialsAndTechniques: [
      'Sialkot handmade paper treated with rice starch and polished with conch shell',
      'Mineral paints: verdigris (jangal), lapis lazuli, peori, orpiment, cinnabar (shangraf)',
      'Poetic illustration of Jayadeva’s Gita Govinda, Rasamanjari, and Bhagavata Purana'
    ],
    stylisticHallmarks: [
      'Lyrical pastoral backgrounds with rolling green hills, flowering trees, and silver streams',
      'Supple female figures with straight noses, gentle curves, and expressive innocence',
      'Tender emotional intimacy between lovers sheltered beneath monsoon storm clouds',
      'Delicate, cool palette of greens, soft lilacs, pale rose, and glowing yellows'
    ],
    historicalContext:
      'Following Nadir Shah’s sack of Delhi in 1739, skilled artists trained in the Mughal imperial ateliers fled northward to the tranquil valleys of the lower Himalayas. At Guler and Kangra, under the visionary young Raja Sansar Chand, painters like Nainsukh and his brother Manaku transformed formal Mughal precision into a world of breathless poetic lyricism celebrating the pastoral divine romances of Radha and Krishna.',
    geographicDiffusion:
      'The Pahari style spread across the Punjab hill states—from Chamba, Mandi, and Garhwal to Jammu. It remains one of the finest lyric achievements of Indian miniature art, heavily inspiring modern Indian artists like Amrita Sher-Gil.',
    connectedLocationIds: ['mughal', 'kishangarh', 'srinagar'],
    masterpiece: {
      title: 'Radha and Krishna in the Groves of Vrindavan',
      artist: 'Kangra Court Master (Circle of Nainsukh / Fattu)',
      year: 'c. 1785 CE',
      medium: 'Opaque watercolor and gold on paper',
      dimensions: '26 cm × 19 cm',
      collection: 'Chandigarh Museum and Art Gallery / National Museum, New Delhi',
      description:
        'Krishna gently shelters Radha with his yellow pitambara under a flowering kadamba tree as monsoon clouds gather. The flowing Yamuna river in the foreground is dotted with white cranes and blooming lotuses.',
      colorPalette: [
        { name: 'Kadamba Spring Green', hex: '#3A5A40', source: 'Natural verdigris glaze' },
        { name: 'Pitambara Yellow', hex: '#E9C46A', source: 'Himalayan peori' },
        { name: 'Monsoon Indigo Slate', hex: '#3D5A80', source: 'Indigo and charcoal mix' },
        { name: 'Lotus Blush', hex: '#E76F51', source: 'Madder root red' }
      ],
      accentColor: '#365314'
    },
    curatorialAudioScript:
      'Listen to the silence of the Kangra hills. Notice how the artist paints nature as a mirror to human emotion: the intertwining vines symbolize the lovers’ union, while the dark thunderstorm in the distance heightens the cozy intimacy of the flowering grove.'
  },
  {
    id: 'raghurajpur',
    name: 'Raghurajpur & Puri',
    cityOrSite: 'Heritage Crafts Village, Raghurajpur',
    state: 'Odisha',
    region: 'East',
    eraCategory: 'folk',
    eraPeriod: 'Jagannatha Cult Sacred Tradition',
    approximateYears: '12th c. CE to Present',
    artCategory: 'Sacred Textiles & Scrolls',
    geo: { lat: 19.8247, lng: 85.8315, mapX: 63.0, mapY: 57.5 },
    patronage: 'Ganga & Gajapati Kings of Odisha, Lord Jagannath Temple',
    movementName: 'Pattachitra & Tala Pattachitra (Palm Leaf Engraving)',
    keyArtists: ['Chitrakara Mahapatra Guilds', 'Gokul Bihari Pattanaik'],
    materialsAndTechniques: [
      'Patt: Treated tussar silk or two layers of cotton cloth glued with tamarind seed gum (niryas kalpa)',
      'Polished with soft stone and conch shell (kharadi)',
      'Tala Pattachitra: Inscribed dried palm leaves etched with iron stylus (lekhani) and rubbed with lamp soot',
      'Five traditional colors (Pancha-rang): Hingula (red), Haritala (yellow), Sankha (white), Ramaraja (indigo), and Kala (soot)'
    ],
    stylisticHallmarks: [
      'Elaborate floral and vine borders enclosing the primary sacred tableau',
      'Bold graphic black outlines defining stylized profile figures with pointed noses',
      'Unbroken visual density with mythological narratives from Jagannath, Krishna Leela, and Ramayana',
      'Natural lacquer coating made of tree resin providing water-resistant gloss'
    ],
    historicalContext:
      'Raghurajpur is an ancient heritage crafts village nestled in betel nut groves near Puri. Every household has practiced Pattachitra for centuries. The tradition is deeply rooted in the rituals of the Jagannath Temple: during the annual Anavasara period (when the deities fall sick and withdraw from public view for 15 days), large Pattachitra paintings (Anasar Pati) take their place on the sanctum throne for devotees.',
    geographicDiffusion:
      'Odisha Pattachitra influenced scroll painting traditions across eastern India, including the Bengal Patua scrolls and Midnapore pata traditions, providing the visual blueprint for Jagannath iconography worldwide.',
    connectedLocationIds: ['kolkata', 'madhubani'],
    masterpiece: {
      title: 'Kandarpa Ratha (Chariot of Cupid)',
      artist: 'Raghurajpur Chitrakara Master',
      year: 'Early 20th Century / Traditional Composition',
      medium: 'Natural mineral and shell colors on treated cotton canvas',
      dimensions: '105 cm × 75 cm',
      collection: 'Odisha State Museum, Bhubaneswar',
      description:
        'Nine graceful gopis intertwine their bodies to form the composite shape of a chariot carrying Krishna, playing his divine flute. The border is a marvel of microscopic floral scrollwork.',
      colorPalette: [
        { name: 'Hingula Vermilion', hex: '#9E2A2B', source: 'Crushed cinnabar stone' },
        { name: 'Sankha White', hex: '#FAF0CA', source: 'Burnt and powdered conch shell' },
        { name: 'Haritala Yellow', hex: '#E39700', source: 'Orpiment mineral stone' },
        { name: 'Deep Lampblack', hex: '#0D1B2A', source: 'Earthen pot kerosene/mustard soot' }
      ],
      accentColor: '#9A3412'
    },
    curatorialAudioScript:
      'Step into the master workshop of Raghurajpur. The artist prepares the canvas by coating coarse cotton cloth with tamarind seed glue and chalk powder, polishing it with conch shells until it feels like smooth marble. The line work is executed freehand with a brush made of mouse hair!'
  },
  {
    id: 'kolkata',
    name: 'Kolkata & Santiniketan',
    cityOrSite: 'Jorasanko & Visva-Bharati',
    state: 'West Bengal',
    region: 'East',
    eraCategory: 'modern',
    eraPeriod: 'Bengal Renaissance & Modern Revival',
    approximateYears: 'Late 19th c. – Mid-20th c. CE',
    artCategory: 'Modern & Contemporary',
    geo: { lat: 22.5726, lng: 88.3639, mapX: 68.0, mapY: 51.5 },
    patronage: 'Tagore Family, Nationalist Freedom Movement, Visva-Bharati University',
    movementName: 'Bengal School of Art & Indigenous Modernism',
    keyArtists: ['Abanindranath Tagore', 'Nandalal Bose', 'Jamini Roy', 'Gaganendranath Tagore', 'Rabindranath Tagore'],
    materialsAndTechniques: [
      'Japanese Wash technique adapted to Indian watercolor sensibilities',
      'Tempera on woven straw mats and coarse khadi cloth (Jamini Roy)',
      'Earthy river silt, soot, and natural soil pigments',
      'Integration of Kalighat bazaar scrolls with modernist abstraction'
    ],
    stylisticHallmarks: [
      'Dreamlike, atmospheric color washes evoking romantic nationalist spirituality',
      'Rejection of European colonial oil academism in favor of Ajanta and Mughal aesthetics',
      'Bold calligraphic sweeping lines and flat earthy colors inspired by Kalighat patuas (Jamini Roy)',
      'Open-air environmental pedagogy rooted in rural Indian village life (Santiniketan)'
    ],
    historicalContext:
      'At the turn of the 20th century in Kolkata, Abanindranath Tagore (nephew of Rabindranath) and British art educator E.B. Havell revolted against the rigid colonial art education imposed by the British Raj. They spearheaded the Swadeshi art movement, looking inward to Ajanta, Mughal miniatures, and folk patas. Later, Nandalal Bose at Santiniketan and Jamini Roy in North Kolkata forged a powerfully original Indian modernism that celebrated everyday village potters, Santhal tribal life, and rural dignity.',
    geographicDiffusion:
      'The Bengal School was India’s first modern nationalist art movement. Its alumni established major art faculties across the nation—including Lucknow, Lahore, Delhi, Jaipur, and Santiniketan—shaping modern Indian visual identity before 1947.',
    connectedLocationIds: ['madhubani', 'raghurajpur', 'bombay'],
    masterpiece: {
      title: 'Bharat Mata',
      artist: 'Abanindranath Tagore',
      year: '1905 CE',
      medium: 'Watercolor and wash on paper',
      dimensions: '27 cm × 20 cm',
      collection: 'Rabindra Bharati Society, Kolkata / Victoria Memorial',
      description:
        'Painted during the anti-partition Swadeshi movement, the Mother of India is depicted not as a fierce warrior, but as a serene, four-armed saffron-clad ascetic woman holding the four boons of human civilization: Anna (sheaf of paddy), Vastra (white cloth), Shiksha (manuscript), and Diksha (japa rosary).',
      colorPalette: [
        { name: 'Swadeshi Saffron', hex: '#E76F51', source: 'Warm saffron ochre wash' },
        { name: 'Muted Sky Mist', hex: '#90E0EF', source: 'Dilute indigo wash' },
        { name: 'River Silt', hex: '#6C584C', source: 'Gangetic alluvium earth' },
        { name: 'Ascetic Ochre', hex: '#DDA15E', source: 'Yellow clay pigment' }
      ],
      accentColor: '#9A3412'
    },
    curatorialAudioScript:
      'Abanindranath Tagore submerged his painted paper repeatedly into trays of water after applying washes of color, creating this poetic, ethereal haze. In Bharat Mata, the nation is envisioned as a quiet provider of spiritual knowledge and sustenance, standing barefoot amidst blooming white lotuses.'
  },
  {
    id: 'warli',
    name: 'Warli Ancestral Lands',
    cityOrSite: 'Dahanu & Palghar Foothills',
    state: 'Maharashtra',
    region: 'West',
    eraCategory: 'folk',
    eraPeriod: 'Indigenous Living Neolithic Legacy',
    approximateYears: 'Neolithic Origins (c. 2500 BCE) to Present',
    artCategory: 'Folk & Tribal Art',
    geo: { lat: 19.9700, lng: 72.8500, mapX: 40.5, mapY: 57.0 },
    patronage: 'Warli Adivasi Community, Suvasinis (Married Women) & Shamans',
    movementName: 'Warli Tribal Painting',
    keyArtists: ['Jivya Soma Mashe (Legendary Master)', 'Balu Mashe', 'Anil Vangad'],
    materialsAndTechniques: [
      'Walls plastered with cow dung and brown/red earthen geru clay',
      'White pigment made from finely grounded rice flour mixed with water and edible tree gum (dink)',
      'Bamboo stick chewed at the tip to serve as an organic flexible paintbrush',
      'Executed on mud walls during marriage ceremonies (Chauk) and post-harvest rituals'
    ],
    stylisticHallmarks: [
      'Basic geometric alphabet: circle (sun and moon), triangle (mountains and trees), square (sacred enclosure)',
      'Human and animal bodies formed by two triangles joined at the tip, symbolizing cosmic balance',
      'The iconic spiraling Tarpa dance capturing the cyclical, non-linear flow of seasons',
      'Celebration of everyday tribal work, forest spirits, and harmony with nature without religious idols'
    ],
    historicalContext:
      'The Warli are an indigenous tribe residing in the Sahyadri mountains of northern Maharashtra. Their visual expression traces continuous lines back to the prehistoric rock shelters of Bhimbetka. In the 1970s, the master artist Jivya Soma Mashe broke centuries of taboo—which restricted painting only to women during weddings—and began painting on canvas and paper daily, declaring: "Our art is not about decoration; it is our script, our memory, and our breath."',
    geographicDiffusion:
      'Warli art has traveled from mud hut walls to the global stage, exhibited at the Pompidou Centre in Paris and Magiciens de la Terre. Its minimalist geometric syntax has deeply influenced modern Indian textile and architectural design.',
    connectedLocationIds: ['bhimbetka', 'bombay', 'ajanta'],
    masterpiece: {
      title: 'The Great Tarpa Dance & Circle of Life',
      artist: 'Jivya Soma Mashe',
      year: 'c. 1995 CE',
      medium: 'Rice paste and natural gum on cow-dung treated canvas',
      dimensions: '120 cm × 120 cm',
      collection: 'Devi Art Foundation, New Delhi / Quai Branly Museum, Paris',
      description:
        'Dozens of hand-in-hand dancers spiral outward around the Tarpa player in the center. Interspersed throughout are scenes of farming, hunting, honey collection, and forest fauna living in unbroken harmony.',
      colorPalette: [
        { name: 'Geru Terracotta', hex: '#7F3B25', source: 'Red iron-rich earth' },
        { name: 'Rice Flour White', hex: '#FAF9F6', source: 'Powdered rice and tree gum' },
        { name: 'Cow Dung Base', hex: '#583D2A', source: 'Sun-dried organic mud' },
        { name: 'Charcoal Accent', hex: '#262626', source: 'Burnt wood ash' }
      ],
      accentColor: '#78350F'
    },
    curatorialAudioScript:
      'Notice the two inverted triangles that make every human figure. The upper triangle represents the torso reaching toward the sky; the lower triangle represents the legs grounded in mother earth. When the Tarpa horn plays, the dancers never turn their backs to the musician, mirroring the circular movement of constellations in the night sky.'
  },
  {
    id: 'bhimbetka',
    name: 'Bhimbetka Rock Shelters',
    cityOrSite: 'Raisen District, Vindhyan Range',
    state: 'Madhya Pradesh',
    region: 'Central',
    eraCategory: 'prehistoric',
    eraPeriod: 'Upper Paleolithic to Mesolithic',
    approximateYears: 'c. 10,000 BCE – 8,000 BCE',
    artCategory: 'Murals & Rock Art',
    geo: { lat: 22.9372, lng: 77.6128, mapX: 47.5, mapY: 48.5 },
    patronage: 'Prehistoric Hunter-Gatherer Clans of the Vindhyan Forest',
    movementName: 'Prehistoric Rock Art of India',
    keyArtists: ['Anonymous Mesolithic Hunter-Artists (discovered by V.S. Wakankar, 1957)'],
    materialsAndTechniques: [
      'Direct application on sandstone rock walls and natural cave overhangs',
      'Ground mineral hematite and iron oxide (red and deep purple)',
      'Chalk, manganese oxide, plant juice, and animal fat binders',
      'Surviving through chemical bonding with mineral patina in sandstone'
    ],
    stylisticHallmarks: [
      'Dynamic stick-figure silhouettes pulsing with raw kinesthetic motion',
      'X-ray style depictions showing internal organs and unborn offspring in hunted animals',
      'Communal hunt scenes: running archers, bisons, rhinoceroses, tigers, and wild boars',
      'Rhythmic linear group dances holding hands around a shared fire'
    ],
    historicalContext:
      'Discovered in 1957 by archaeologist Dr. V.S. Wakankar, Bhimbetka contains over 750 rock shelters set amidst dense teak forests. Dating back over 10,000 years, the paintings provide an unbroken visual chronicle from the Stone Age to the medieval era. They reveal the dawn of human creative consciousness in South Asia: hunting strategies, birth rituals, mask dances, and communal bonding.',
    geographicDiffusion:
      'Bhimbetka is the foundational root of Indian visual culture. The rhythmic line-work, stick figures, and animal depictions found here migrated directly into indigenous tribal traditions like Warli in Maharashtra, Gond in Madhya Pradesh, and Saora art in Odisha.',
    connectedLocationIds: ['warli', 'gond', 'ajanta'],
    masterpiece: {
      title: 'The Great Mesolithic Boar & Hunter Chase (Rock Shelter III F-35)',
      artist: 'Anonymous Mesolithic Hunter-Artist',
      year: 'c. 8,000 BCE',
      medium: 'Hematite red ochre on quartz sandstone wall',
      dimensions: 'Natural rock face, approx. 180 cm across',
      collection: 'Auditorium Cave, Bhimbetka (UNESCO World Heritage Site)',
      description:
        'A colossal, stylized mythical wild boar with giant horns and bristle charges across the stone wall, chasing miniature stick-figure hunters in a display of awe toward the overpowering raw forces of nature.',
      colorPalette: [
        { name: 'Hematite Iron Red', hex: '#6E1E1E', source: 'Ground hematite stone' },
        { name: 'Weathered Sandstone', hex: '#C2A385', source: 'Natural quartz rock' },
        { name: 'Manganese Black', hex: '#2B2625', source: 'Manganese mineral earth' },
        { name: 'Bone White', hex: '#EAE5D9', source: 'Burnt bone & lime' }
      ],
      accentColor: '#9A3412'
    },
    curatorialAudioScript:
      'Imagine standing inside this sandstone overhang 10,000 years ago during a monsoon thunderstorm. The artist ground red hematite with water and tree resin to paint this immense charging boar. Notice how the beast dwarfs the hunters; it expresses the ancient human realization of our fragile place in the natural cosmos.'
  },
  {
    id: 'gond',
    name: 'Patangarh & Dindori',
    cityOrSite: 'Dindori District, Narmada Valley',
    state: 'Madhya Pradesh',
    region: 'Central',
    eraCategory: 'folk',
    eraPeriod: 'Pardhan Gond Sacred Oral Lineage',
    approximateYears: 'Antiquity / Modern Renaissance (1980s)',
    artCategory: 'Folk & Tribal Art',
    geo: { lat: 23.0000, lng: 81.3000, mapX: 54.5, mapY: 48.0 },
    patronage: 'Pardhan Gond Bards (Genealogists of the Gond Kings)',
    movementName: 'Gond Art / Jangarh Kalam',
    keyArtists: ['Jangarh Singh Shyam (Pioneering Genius)', 'Nankusia Shyam', 'Bhajju Shyam', 'Venkat Raman Singh Shyam'],
    materialsAndTechniques: [
      'Traditionally colored with local soils: Pidor (yellow clay), Khari (white clay), and cow dung',
      'Modern medium: acrylic and archival ink on handmade paper and large gallery canvases',
      'Fine rotring pens and brushes creating signature repetitive infill patterns'
    ],
    stylisticHallmarks: [
      'Each master artist develops a unique "signature" infill texture (dots, broken lines, waves, dashes, fish scales)',
      'Intricate hybrid creatures combining birds, serpents, deer, and flowering Mahua trees',
      'Luminous, vibrant color fields paired with hypnotic optical vibrations',
      'Belief in animism: every tree, rock, bird, and river has an active living soul (Jeev)'
    ],
    historicalContext:
      'The Pardhan Gonds were traditional bards who sang genealogies for Gond royal patrons. In the early 1980s, the renowned artist J. Swaminathan discovered a 19-year-old tribal youth named Jangarh Singh Shyam painting wall murals in the village of Patangarh. Swaminathan brought him to Bharat Bhavan in Bhopal, where Jangarh pioneered a revolutionary visual style now celebrated globally as "Jangarh Kalam", before his tragic early death in Japan in 2001.',
    geographicDiffusion:
      'Patangarh became a powerhouse of creative energy, with over 100 Gond artists now painting internationally. Gond art has illustrated internationally acclaimed books (such as "The London Jungle Book" by Bhajju Shyam) and graced walls from Bhopal to Paris.',
    connectedLocationIds: ['bhimbetka', 'warli', 'kolkata'],
    masterpiece: {
      title: 'Bada Dev and the Flying Deer Tree',
      artist: 'Jangarh Singh Shyam',
      year: '1998 CE',
      medium: 'Acrylic and archival ink on canvas',
      dimensions: '150 cm × 120 cm',
      collection: 'Bharat Bhavan, Bhopal / National Gallery of Modern Art (NGMA)',
      description:
        'A magnificent stag whose horns branch into a flowering Mahua tree filled with singing birds. Every inch of the body vibrates with Jangarh’s signature radiant dot-and-dash patterns, celebrating the supreme Gond deity Bada Dev.',
      colorPalette: [
        { name: 'Vibrant Ultramarine', hex: '#1D3557', source: 'Mineral azure pigment' },
        { name: 'Pidor Mustard Clay', hex: '#E76F51', source: 'Narmada riverbed clay' },
        { name: 'Mahua Forest Green', hex: '#2A9D8F', source: 'Plant chlorophyll essence' },
        { name: 'Sunburst Ochre', hex: '#F4A261', source: 'Yellow ochre stone' }
      ],
      accentColor: '#1E3A8A'
    },
    curatorialAudioScript:
      'In Gond belief, viewing an auspicious image brings good fortune. Jangarh Singh Shyam transformed age-old storytelling into pulsating optical rhythms. If you look closely at the deer’s body, thousands of minuscule dots pulse like a heartbeat, blurring the boundary between animal, plant, and spirit.'
  },
  {
    id: 'mughal',
    name: 'Mughal Imperial Atelier',
    cityOrSite: 'Agra, Fatehpur Sikri & Delhi',
    state: 'Delhi / Uttar Pradesh',
    region: 'North',
    eraCategory: 'miniatures',
    eraPeriod: 'Imperial Mughal Dynasty',
    approximateYears: 'c. 1556 – 1707 CE (Akbar, Jahangir, Shah Jahan)',
    artCategory: 'Court Miniatures',
    geo: { lat: 27.1767, lng: 78.0081, mapX: 47.0, mapY: 34.0 },
    patronage: 'Emperors Akbar, Jahangir, and Shah Jahan',
    movementName: 'Imperial Mughal Miniature Painting',
    keyArtists: ['Basawan', 'Daswanth', 'Ustad Mansur (Master Naturalist)', 'Abul Hasan (Nadir-uz-Zaman)', 'Bichitr', 'Govardhan'],
    materialsAndTechniques: [
      'Layered burnished wasli paper primed with conch shell paste',
      'Persian lapis lazuli, vermilion, malachite green, peori, crushed rubies, and shell gold (asl-i hal)',
      'Delicate stippling technique (pardaz) using fine squirrel-hair brushes',
      'Collaboration between designers (tarrah), colorists (rangamez), and portraitists (chihranuma)'
    ],
    stylisticHallmarks: [
      'Masterful psychological realism and individualized portraiture',
      'Dynamic multi-tiered spatial compositions showing bustling imperial courts, hunts, and battles',
      'Exquisite, scientifically accurate botanical and zoological studies (Ustad Mansur)',
      'Synthesis of Persian calligraphic lyricism, Indian vitality, and European aerial perspective'
    ],
    historicalContext:
      'When Emperor Humayun returned to India from exile in Persia in 1555, he brought two Persian master artists: Mir Sayyid Ali and Abd al-Samad. Under his son Akbar the Great, a massive royal atelier of over a hundred Hindu and Muslim painters was founded at Fatehpur Sikri. They illustrated epic manuscripts like the Hamzanama, Akbarnama, and Razmnama. Under Jahangir, the focus shifted to intimate portraits and wildlife studies, while Shah Jahan celebrated golden imperial majesty.',
    geographicDiffusion:
      'The Mughal atelier was the epicenter of artistic dissemination in northern India. As imperial patronage waned in Delhi, court painters migrated to regional kingdoms, fertilizing the Rajput schools of Rajasthan (Mewar, Kishangarh, Bundi) and the Pahari schools of the Himalayan foothills.',
    connectedLocationIds: ['kishangarh', 'kangra', 'srinagar'],
    masterpiece: {
      title: 'The Chameleon on a Flowering Branch',
      artist: 'Ustad Mansur (Nadir-ul-Asr)',
      year: 'c. 1612 CE',
      medium: 'Opaque watercolor and gold on paper',
      dimensions: '28 cm × 19 cm',
      collection: 'Royal Collection Trust, Windsor Castle / National Museum, New Delhi',
      description:
        'A masterwork of zoological observation commissioned by Emperor Jahangir. The chameleon clings to a delicate bough of sweet blossoms, its iridescent skin scales, swiveling eye, and clawed toes rendered with microscopic precision.',
      colorPalette: [
        { name: 'Imperial Lapis', hex: '#1C3144', source: 'Pure Badakhshan lapis' },
        { name: 'Chameleon Verdigris', hex: '#3E8967', source: 'Aged copper acetate' },
        { name: 'Shell Burnished Gold', hex: '#CBA135', source: 'Refined 24k gold leaf paste' },
        { name: 'Pardaz Terracotta', hex: '#9E2A2B', source: 'Natural cinnabar & iron oxide' }
      ],
      accentColor: '#1E3A8A'
    },
    curatorialAudioScript:
      'Emperor Jahangir was a passionate naturalist. When a rare animal or flower caught his eye, he ordered his court master Ustad Mansur to paint it so that "delight might remain forever." Mansur used a single hair from a squirrel’s tail to paint each minute scale on this chameleon’s body.'
  },
  {
    id: 'srikalahasti',
    name: 'Srikalahasti & Machilipatnam',
    cityOrSite: 'Chittoor & Krishna Districts',
    state: 'Andhra Pradesh',
    region: 'South',
    eraCategory: 'folk',
    eraPeriod: 'Temple & Coromandel Maritime Era',
    approximateYears: '11th c. CE to Present',
    artCategory: 'Sacred Textiles & Scrolls',
    geo: { lat: 13.7498, lng: 79.7036, mapX: 47.0, mapY: 75.0 },
    patronage: 'Vijayanagara Emperors, Golconda Sultans & Coromandel Coast Trade',
    movementName: 'Kalamkari (Srikalahasti Freehand & Machilipatnam Block-Print)',
    keyArtists: ['Jonnalagadda Gurappa Chetty', 'J. Niranjan', 'Chitrakara Guilds'],
    materialsAndTechniques: [
      'Unbleached hand-spun cotton cloth (khadi) treated with buffalo milk and myrobalan (karakkaya)',
      'Tamarind pen (kalam) with wool reservoir for freehand drawing with fermented iron-jaggery solution (kasimi)',
      'Natural plant dyes: alizarin/madder root (red), indigo (blue), turmeric/pomegranate rind (yellow)',
      'Washed multiple times in flowing river water (Swarnamukhi River) to fix natural colors'
    ],
    stylisticHallmarks: [
      'Flowing organic sepia and black lines outlining epic narratives',
      'Stylized deities with expressive eyes, patterned garments, and makara arches',
      'Textual captions written in Telugu script beneath narrative panels',
      'Earthy, subdued color harmony that matures and deepens with time and washing'
    ],
    historicalContext:
      'Kalamkari, literally "pen craftsmanship", evolved in two distinct centers in Andhra Pradesh: Srikalahasti, where Hindu temple hangings were drawn completely freehand with a bamboo kalam, and Machilipatnam, which developed intricate wooden block printing for export to Persia and Europe (famous as "Chintz"). The Srikalahasti artists were integral to temple rituals, creating massive backdrop scrolls of the Ramayana and Mahabharata.',
    geographicDiffusion:
      'Coromandel Kalamkari was one of the most traded luxury textiles in global history, triggering the British Calico acts of the 18th century. Its motifs influenced European floral wallpaper and Persian miniature tapestries.',
    connectedLocationIds: ['thanjavur', 'lepakshi', 'hampi'],
    masterpiece: {
      title: 'Ramayana Mahakavya: The Coronation of Rama (Pattabhisheka)',
      artist: 'Jonnalagadda Gurappa Chetty (Padma Shri)',
      year: 'c. 1980 CE',
      medium: 'Natural dyes on buffalo-milk treated handloom cotton',
      dimensions: '240 cm × 150 cm',
      collection: 'National Crafts Museum, New Delhi / Victoria & Albert Museum, London',
      description:
        'A majestic continuous narrative scroll depicting 36 episodes of the Valmiki Ramayana, culminating in the joyous coronation of Lord Rama surrounded by Vanaras, sages, and divine courtiers.',
      colorPalette: [
        { name: 'Fermented Iron Black', hex: '#212529', source: 'Iron rust steeped in palm jaggery' },
        { name: 'Madder Root Red', hex: '#8B0000', source: 'Alizarin from manjistha roots' },
        { name: 'Myrobalan Ochre', hex: '#D4A373', source: 'Karakkaya nut gall' },
        { name: 'Indigo River Blue', hex: '#1D3557', source: 'Fermented indigo cake' }
      ],
      accentColor: '#9A3412'
    },
    curatorialAudioScript:
      'In Srikalahasti, artists believe the flowing river water is a co-creator. After drawing with a bamboo stylus filled with fermented iron, the cloth is washed repeatedly in the holy Swarnamukhi River. The natural minerals in the riverbed react with myrobalan nut juice to produce these deep, immortal earth colors.'
  },
  {
    id: 'nathdwara',
    name: 'Nathdwara',
    cityOrSite: 'Rajsamand District',
    state: 'Rajasthan',
    region: 'West',
    eraCategory: 'medieval',
    eraPeriod: 'Pushtimarg Temple Atelier',
    approximateYears: 'c. 1672 CE to Present',
    artCategory: 'Sacred Textiles & Scrolls',
    geo: { lat: 24.9312, lng: 73.8219, mapX: 41.0, mapY: 42.0 },
    patronage: 'Shrinathji Haveli, Tilakayats of Pushtimarg & Mewar Maharana Raj Singh',
    movementName: 'Pichwai Sacred Cloth Hangings',
    keyArtists: ['Kalyan Joshi', 'Narottam Sharma', 'Jangid & Gaur Chitrakara Families'],
    materialsAndTechniques: [
      'Heavy cotton cloth starched with rice paste and polished with stone',
      'Natural mineral pigments bound with gum arabic: lapis lazuli, peori, orpiment, cinnabar',
      'Finely beaten silver (rupay ka varaq) and pure gold leaf for ponds, thrones, and star-filled skies',
      'Brush made of goat hair for wide washes, squirrel tail for delicate facial expressions'
    ],
    stylisticHallmarks: [
      'Depicts Shrinathji (the 7-year-old Krishna lifting Mount Govardhan) with left arm raised',
      'Lush blooming lotus ponds with hovering bees, dancing peacocks, and white cows (Kamdhenu)',
      'Seasonal festivity borders: Sharad Purnima (autumn moon), Annakoot, and Monsoon clouds',
      'Sublime devotion characterized by sweet joy (vatsalya and sakhya bhava)'
    ],
    historicalContext:
      'When the sacred idol of Shrinathji was moved from Mathura in 1672 to escape Mughal iconoclasm, the bullock cart wheels sank in the mud of a village named Sinhad in Mewar. Taking this as a divine sign, the grand temple-palace was built. Pichwai paintings (meaning "that which hangs at the back") were created as elaborate thematic backdrops behind the deity, changed daily to celebrate festivals and seasons.',
    geographicDiffusion:
      'Nathdwara evolved into a flourishing artist colony, blending Mewari miniature draftsmanship with Krishna devotional iconography. Pichwai hangings are now collected worldwide as masterpieces of Indian sacred textile art.',
    connectedLocationIds: ['kishangarh', 'mughal', 'shahpura'],
    masterpiece: {
      title: 'Sharad Purnima Pichwai: The Divine Raslila',
      artist: 'Nathdwara Haveli Chitrakara Masters',
      year: 'c. 1880 CE',
      medium: 'Natural stone colors, silver leaf, and gold on cotton cloth',
      dimensions: '210 cm × 180 cm',
      collection: 'Calico Museum of Textiles, Ahmedabad / National Museum, New Delhi',
      description:
        'Beneath a giant full autumn moon and silver-gilded night sky, Krishna multiplies himself to dance simultaneously with every gopi in a circular Raslila. The bottom panel depicts a silver Yamuna pond filled with open lotuses.',
      colorPalette: [
        { name: 'Varaq Silver Lustre', hex: '#A8B2B7', source: 'Beaten silver leaf foil' },
        { name: 'Shrinathji Indigo', hex: '#0B2545', source: 'Concentrated indigo' },
        { name: 'Lotus Petal Pink', hex: '#F28482', source: 'Madder & white conch mix' },
        { name: 'Peacock Emerald', hex: '#2D6A4F', source: 'Ground malachite stone' }
      ],
      accentColor: '#1E3A8A'
    },
    curatorialAudioScript:
      'Feel the cool breeze of the autumn full moon night. In Pichwai paintings, the silver leaf used for the moonlit sky and the river Yamuna oxidizes over decades to a mystical, deep charcoal-gray patina, giving historic antique Pichwais an ethereal, celestial luminosity.'
  },
  {
    id: 'shahpura',
    name: 'Shahpura & Bhilwara',
    cityOrSite: 'Bhilwara District',
    state: 'Rajasthan',
    region: 'West',
    eraCategory: 'folk',
    eraPeriod: 'Folk Bardic Narrative Tradition',
    approximateYears: 'c. 10th c. CE to Present',
    artCategory: 'Sacred Textiles & Scrolls',
    geo: { lat: 25.6266, lng: 74.9287, mapX: 42.5, mapY: 40.0 },
    patronage: 'Bhopa & Bhopi Folk Priest-Singers, Rebari Camel Pastoralists',
    movementName: 'Phad Painting (Pabuji and Devnarayan Scrolls)',
    keyArtists: ['Shree Lal Joshi (Padma Shri)', 'Pradip Joshi', 'Prakash Joshi'],
    materialsAndTechniques: [
      'Hand-woven khadi cotton scroll measuring 15 to 30 feet in length',
      'Starched with flour paste (kalaf) and burnished with a heavy mohra stone',
      'Pure natural mineral pigments: yellow orpiment, red cinnabar, green copper acetate, soot black',
      'Ceremonial opening of the eyes (Pat Pavitra) by painting the pupil last'
    ],
    stylisticHallmarks: [
      'Heroic folk scale: massive horizontal narrative scroll containing hundreds of figures',
      'No central perspective; figure scale indicates political and spiritual importance',
      'Every character faces each other in dialogue, never facing outward toward the viewer',
      'Primary colors code social roles: red for royal heroes, green for villains/sorcerers, yellow for deities'
    ],
    historicalContext:
      'Phad is a traveling folk narrative scroll native to Rajasthan. For centuries, wandering bards called Bhopas and Bhopis traveled from desert village to village carrying the 30-foot scroll. At night, they pitched the scroll against tent poles, lit an oil lamp, and sang the epic deeds of folk hero Pabuji while playing the rawanhatta string instrument, using the painting as a portable visual theater.',
    geographicDiffusion:
      'The Joshi family of Shahpura preserved this sacred craft through generations. Today, Phad painting has modernized its narratives while retaining its bold graphic storytelling, exhibiting in international museums across Europe and Japan.',
    connectedLocationIds: ['kishangarh', 'nathdwara'],
    masterpiece: {
      title: 'Pabuji Ki Phad: The Epic of the Camel Protector',
      artist: 'Shree Lal Joshi',
      year: 'c. 1975 CE',
      medium: 'Mineral colors and gum on handwoven cotton cloth',
      dimensions: '450 cm × 120 cm (Full scroll spans 9 meters)',
      collection: 'National Crafts Museum, New Delhi / Smithsonian Institution',
      description:
        'A whirlwind of desert battles, royal courts, and galloping black mares (Kesar Kalmi). Pabuji sits grandly in the center riding his heroic horse, surrounded by warriors, dancing courtesans, and herds of sacred camels.',
      colorPalette: [
        { name: 'Kesar Kalmi Red', hex: '#BA181B', source: 'Natural cinnabar' },
        { name: 'Desert Sun Yellow', hex: '#FFB703', source: 'Orpiment stone' },
        { name: 'Rawanhatta Black', hex: '#161A1D', source: 'Mustard oil lampblack' },
        { name: 'Warrior Indigo', hex: '#1D3557', source: 'Indigo leaf cake' }
      ],
      accentColor: '#9A3412'
    },
    curatorialAudioScript:
      'Phad is not a static painting; it is a musical score and mobile cinema! Notice how the painter never paints the eyes of the main characters until the final ritual ceremony. The moment the pupil is drawn, the scroll is believed to breathe with divine life and can only be unveiled after purification prayers.'
  },
  {
    id: 'lepakshi',
    name: 'Lepakshi',
    cityOrSite: 'Anantapur District',
    state: 'Andhra Pradesh',
    region: 'South',
    eraCategory: 'medieval',
    eraPeriod: 'Vijayanagara Empire Heyday',
    approximateYears: 'c. 1530 – 1540 CE',
    artCategory: 'Murals & Rock Art',
    geo: { lat: 13.8055, lng: 77.6047, mapX: 44.5, mapY: 72.0 },
    patronage: 'Brothers Virupanna & Veeranna (Royal Treasurers of King Achyuta Deva Raya)',
    movementName: 'Vijayanagara Ceiling Frescoes & Monolithic Sculpture',
    keyArtists: ['Vijayanagara Guild of Temple Chitrakaras'],
    materialsAndTechniques: [
      'Lime plaster ceiling ground applied to hard granite temple ceiling slabs',
      'Lime-resistant mineral pigments: red ochre, yellow ochre, lapis, carbon black, and lime white',
      'Sweeping brush outlines defining majestic 45-foot ceiling compositions'
    ],
    stylisticHallmarks: [
      'Profile faces with large protruding eyes and sharp aquiline noses',
      'Spectacularly detailed contemporary 16th-century textile patterns on clothing and turbans',
      'The gigantic 45-foot fresco of Virabhadra: the largest single ceiling mural in Indian history',
      'Dynamic theatrical narrative celebrating Lord Shiva’s wedding to Parvati'
    ],
    historicalContext:
      'The Veerabhadra Temple at Lepakshi was built in the 1530s by two governor brothers during the golden age of the Vijayanagara Empire. Famous for its hanging pillar and colossal monolithic Nandi bull, its crowning glory is the natya mandapa (dance hall) ceiling, which hosts India’s grandest surviving medieval mural cycle, bridging the ancient tradition of Ajanta with the later Thanjavur school.',
    geographicDiffusion:
      'Lepakshi’s textile border motifs and decorative drapery patterns directly inspired Kalamkari textile artists in neighboring Srikalahasti and influenced the royal Nayaka murals across Madurai and Thanjavur.',
    connectedLocationIds: ['hampi', 'thanjavur', 'srikalahasti'],
    masterpiece: {
      title: 'Colossal Ceiling Fresco of Virabhadra & the Courtiers',
      artist: 'Vijayanagara Royal Guild',
      year: 'c. 1538 CE',
      medium: 'Mineral pigments on lime-plastered granite ceiling',
      dimensions: '14 meters × 4.5 meters (Ceiling of Ranga Mandapa)',
      collection: 'Veerabhadra Temple, Lepakshi (Archaeological Survey of India)',
      description:
        'Lord Virabhadra towers over the hall in terrifying majesty with multiple weapons, flanked by portraits of royal patrons Virupanna and Veeranna wearing ornate brocaded tall kulah caps and flowing dhotis.',
      colorPalette: [
        { name: 'Lepakshi Red Earth', hex: '#800E13', source: 'Iron oxide red ochre' },
        { name: 'Kulah Gold Yellow', hex: '#DDA15E', source: 'Yellow claystone' },
        { name: 'Granite Charcoal', hex: '#212529', source: 'Burnt coconut shell carbon' },
        { name: 'Chunam White', hex: '#F8F9FA', source: 'Slaked sea shell lime' }
      ],
      accentColor: '#9A3412'
    },
    curatorialAudioScript:
      'Look straight up at the soaring ceiling. Even after 500 years of temple smoke and weather, the vibrant patterns on the royal courtiers’ tunics look like modern Haute Couture textiles! Historians use Lepakshi’s murals as the ultimate visual encyclopedia of 16th-century Indian textiles and fashion.'
  },
  {
    id: 'hampi',
    name: 'Hampi (Vijayanagara)',
    cityOrSite: 'Bellary / Vijayanagara District',
    state: 'Karnataka',
    region: 'South',
    eraCategory: 'medieval',
    eraPeriod: 'Vijayanagara Imperial Renaissance',
    approximateYears: 'c. 1336 – 1565 CE',
    artCategory: 'Murals & Rock Art',
    geo: { lat: 15.3350, lng: 76.4600, mapX: 43.5, mapY: 67.5 },
    patronage: 'Emperors Krishnadevaraya, Bukka I, and Vidyaranya Swami',
    movementName: 'Virupaksha Temple Murals & Granite Masterpieces',
    keyArtists: ['Imperial Chitrasangha of Hampi'],
    materialsAndTechniques: [
      'Tempera on fine lime wash layered over massive granite ceiling beams',
      'Naturally extracted earth minerals and vegetable binders',
      'Integrated architectural design combining stone relief carvings with ceiling paintings'
    ],
    stylisticHallmarks: [
      'Multi-tiered cinematic registers depicting mythical and historic processions',
      'The famous triumphal procession of Sage Vidyaranya in a palanquin surrounded by dancing cavalry',
      'Arjuna’s archery test: shooting the rotating fish target looking only into water reflection',
      'Angular profile contours with vibrant geometric textile designs'
    ],
    historicalContext:
      'The magnificent capital city of Vijayanagara on the banks of the Tungabhadra River was once one of the largest and wealthiest metropolises in the world. While its palaces and monuments were razed in 1565, the ceiling of the grand Virupaksha Temple hall still preserves intact the vibrant mural panels commissioned during the 16th-century reign of Krishnadevaraya.',
    geographicDiffusion:
      'Following the tragic fall of Hampi in 1565, Vijayanagara artists fled southward to Madurai, Thanjavur, and Mysore, where they gave birth to the Tanjore and Mysore schools of painting.',
    connectedLocationIds: ['lepakshi', 'thanjavur'],
    masterpiece: {
      title: 'Triumphal Procession of Sage Vidyaranya (Virupaksha Ceiling)',
      artist: 'Vijayanagara Imperial Atelier',
      year: 'c. 1510 CE (Reign of Krishnadevaraya)',
      medium: 'Vegetable and mineral pigments on lime plaster over granite',
      dimensions: 'Register approx. 600 cm × 120 cm',
      collection: 'Virupaksha Temple Mandapa, Hampi (UNESCO World Heritage Site)',
      description:
        'The spiritual founder of the empire, Sage Vidyaranya, is carried in an elaborate golden palanquin. Trumpeters, foot soldiers with swords, caparisoned elephants, and royal musicians march in rhythmic synchronization.',
      colorPalette: [
        { name: 'Tungabhadra Ocher', hex: '#BC6C25', source: 'Riverbed ochre clay' },
        { name: 'Vijayanagara Terracotta', hex: '#6B2D26', source: 'Red iron oxide' },
        { name: 'Chunam Lime White', hex: '#FAF9F6', source: 'Limestone paste' },
        { name: 'Deep Lamp Ash', hex: '#1B1B1E', source: 'Carbon soot' }
      ],
      accentColor: '#B45309'
    },
    curatorialAudioScript:
      'On the ceiling of Virupaksha Temple, notice how the artists captured military energy. Elephants rear on their hind legs, pennants flutter in the Deccan wind, and warriors wear stitched armor showing the influence of trade with Portuguese and Arab merchants.'
  },
  {
    id: 'srinagar',
    name: 'Srinagar & Kashmir Valley',
    cityOrSite: 'Old Srinagar (Shehr-e-Khaas)',
    state: 'Jammu & Kashmir',
    region: 'North',
    eraCategory: 'medieval',
    eraPeriod: 'Sultanate & Persian Renaissance',
    approximateYears: '15th c. CE to Present',
    artCategory: 'Folk & Tribal Art',
    geo: { lat: 34.0837, lng: 74.7973, mapX: 41.5, mapY: 13.0 },
    patronage: 'Sultan Zain-ul-Abidin (Budshah) & Mughal Governors',
    movementName: 'Kashmiri Papier-Mâché & Naqashi Lacquer Art',
    keyArtists: ['Ustad Ghulam Mohammad', 'Syed Mirak Shah', 'Hakeem Craft Lineages'],
    materialsAndTechniques: [
      'Sakhtsazi: molding pulped discarded paper, rice straw, and copper sulphate paste into boxes and vases',
      'Coated with plaster of Paris and burnished with a jade or agate stone (Karkhana)',
      'Naqashi: painting intricate floral patterns using pure water-soluble mineral pigments',
      'Layered with lustrous natural amber varnish (Kahruba) baked under gentle sunlight'
    ],
    stylisticHallmarks: [
      'Gul-o-Bulbul (Rose and Nightingale) and Hazara (Thousand Flowers) continuous patterns',
      'Chinar leaf (Barg-e-Chinar), almond paisley (Badam), and iris floral scrolls',
      'Microscopic illuminated gold gilding (Zarkari) catching ambient light',
      'Exquisite Persian aesthetic naturalized amidst the Himalayan flora of Kashmir'
    ],
    historicalContext:
      'In the 15th century, the enlightened ruler Sultan Zain-ul-Abidin invited master craftsmen, calligraphers, and carpet weavers from Samarkand and Persia to settle in Kashmir. They taught the local artisans how to transform humble waste paper into jewel-like lacquered artifacts. Papier-mâché became an emblem of Kashmiri artistic genius, decorating mosque ceilings (like the Madin Sahib shrine) and royal palanquins.',
    geographicDiffusion:
      'Kashmir became the premier craft center connecting Central Asia with the Indian subcontinent. The badam (paisley) motif originating in Kashmir traveled along European trade routes to become globally recognized in 19th-century Scotland and France.',
    connectedLocationIds: ['kangra', 'mughal'],
    masterpiece: {
      title: 'Hazara Royal Casket: The Thousand Flowers of Shalimar',
      artist: 'Ustad Naqashi of Shehr-e-Khaas',
      year: 'Late 19th Century',
      medium: 'Mineral colors, gold leaf, and lacquer on molded paper pulp',
      dimensions: '35 cm × 25 cm × 18 cm',
      collection: 'Sri Pratap Singh (SPS) Museum, Srinagar / Victoria & Albert Museum, London',
      description:
        'A magnificent lidded royal box entirely encrusted with over a thousand microscopic wild roses, irises, and narcissus blossoms against a shimmering shell-gold backdrop, finished with mirror-like amber lacquer.',
      colorPalette: [
        { name: 'Zarkari Leaf Gold', hex: '#D4AF37', source: 'Genuine beaten leaf gold' },
        { name: 'Kashmir Saffron Red', hex: '#C1121F', source: 'Pampore saffron & cochineal' },
        { name: 'Dal Lake Iris Blue', hex: '#0077B6', source: 'Persian lapis lazuli' },
        { name: 'Chinar Autumn Rust', hex: '#9E2A2B', source: 'Walnut bark & iron rust' }
      ],
      accentColor: '#1E3A8A'
    },
    curatorialAudioScript:
      'The master painter uses a brush made from the soft downy hair of the Himalayan pashmina goat calf. With breathtaking patience, he paints hundreds of petals smaller than a sesame seed without a single tremor of the hand, layering coats of warm tree varnish until the flowers seem suspended under glass.'
  },
  {
    id: 'bombay',
    name: 'Bombay (Mumbai)',
    cityOrSite: 'Kala Ghoda & Chemould Gallery',
    state: 'Maharashtra',
    region: 'West',
    eraCategory: 'modern',
    eraPeriod: 'Post-Independence Modernist Awakening',
    approximateYears: '1947 – 1970s CE',
    artCategory: 'Modern & Contemporary',
    geo: { lat: 18.9220, lng: 72.8347, mapX: 39.5, mapY: 60.5 },
    patronage: 'Kekoo Gandhy (Gallery Chemould), Emmanuel Schlesinger, Walter Langhammer',
    movementName: 'Progressive Artists’ Group (PAG)',
    keyArtists: ['F.N. Souza (Founder)', 'M.F. Husain', 'S.H. Raza', 'Tyeb Mehta', 'K.H. Ara', 'H.A. Gade'],
    materialsAndTechniques: [
      'Oil on canvas, thick impasto with palette knife, and industrial enamel paints',
      'Integration of European Expressionism and Cubism with Indian temple sculpture and folk energy',
      'Bold architectural brushstrokes stripping art of sentimental academic nostalgia'
    ],
    stylisticHallmarks: [
      'Raw, visceral figurative energy capturing the fractures and hopes of a newly independent nation (1947)',
      'Synthesis of ancient Indian concepts (such as Raza’s "Bindu" as the cosmic seed of energy) with modern abstraction',
      'Husain’s galloping horses and iconic village epics painted with rapid, expressive brush movements',
      'Tyeb Mehta’s diagonal split canvas expressing the existential angst of the 1947 Partition'
    ],
    historicalContext:
      'Formed in Bombay in December 1947 just months after the bloody Partition and independence of India, the Progressive Artists’ Group was founded by six rebellious young artists led by Francis Newton Souza and Maqbool Fida Husain. Rejecting both the British colonial salon realism and the romantic pastoralism of the Bengal School, they sought a fierce, fearless modern language that would speak to a sovereign, forward-looking India.',
    geographicDiffusion:
      'The PAG propelled Indian art into the global contemporary consciousness. Souza conquered London, Raza settled in Paris finding the meditative "Bindu", and Husain became the undisputed "Picasso of India". Today, Mumbai remains the financial and curatorial heart of modern Indian art auctions.',
    connectedLocationIds: ['kolkata', 'cholamandal', 'warli'],
    masterpiece: {
      title: 'Between the Spider and the Lamp',
      artist: 'M.F. Husain',
      year: '1956 CE',
      medium: 'Oil on canvas',
      dimensions: '243 cm × 122 cm',
      collection: 'National Gallery of Modern Art (NGMA), New Delhi',
      description:
        'A monumental masterpiece of Indian modernism depicting five monumental village women in earthy robes with a spider dangling between them and a hanging kerosene lamp above. The figures combine the majesty of Khajuraho sculptures with modern cubist planes.',
      colorPalette: [
        { name: 'Progressive Raw Umber', hex: '#4A3B32', source: 'Earth oil pigment' },
        { name: 'Kala Ghoda Ochre', hex: '#BC6C25', source: 'Yellow iron earth' },
        { name: 'Midnight Charcoal', hex: '#1B1B1E', source: 'Carbon black oil' },
        { name: 'Crimson Flame', hex: '#9E2A2B', source: 'Alizarin crimson glaze' }
      ],
      accentColor: '#9A3412'
    },
    curatorialAudioScript:
      'In 1947, as India gained freedom, young artists in Bombay rented a studio near Kala Ghoda to rewrite modern art. Husain, who had started out hand-painting massive Bollywood cinema billboards for a few annas, brought that fearless monumental scale to the canvas. Notice how the women’s hands are enlarged—celebrating the labor and strength of rural India.'
  },
  {
    id: 'cholamandal',
    name: 'Cholamandal Artists’ Village',
    cityOrSite: 'Injambakkam, East Coast Road, Chennai',
    state: 'Tamil Nadu',
    region: 'South',
    eraCategory: 'modern',
    eraPeriod: 'Madras Art Movement & Neo-Tantric Modernism',
    approximateYears: '1966 to Present',
    artCategory: 'Modern & Contemporary',
    geo: { lat: 12.9150, lng: 80.2520, mapX: 47.5, mapY: 79.5 },
    patronage: 'Self-governing artists’ cooperative commune founded by K.C.S. Paniker',
    movementName: 'Madras Art Movement & Indigenous Modern Abstraction',
    keyArtists: ['K.C.S. Paniker (Pioneering Visionary)', 'S. Dhanapal', 'K. Ramanujam', 'S. Nandagopal', 'A.P. Santhanaraj'],
    materialsAndTechniques: [
      'Oil, acrylic, and ink on canvas combining indigenous astrological scripts, folk symbols, and algebraic notations',
      'Hammered sheet copper, brass wire, and repoussé metal sculpture (Nandagopal)',
      'Batik on handloom silk and terracotta ceramics to fund artistic self-reliance'
    ],
    stylisticHallmarks: [
      'Calligraphic scripts, ancient Malayalam/Tamil horoscopic symbols, and geometric diagrams',
      'Total rejection of both Western academic modeling and simplistic revivalism',
      'The "Words and Symbols" series: paintings resembling sacred ancient manuscripts and astrological charts',
      'Cooperative village philosophy: artists living and crafting together on 8.5 acres along the Coromandel coast'
    ],
    historicalContext:
      'In 1966, legendary painter and principal of the Madras College of Arts K.C.S. Paniker led a brave experiment in collective artistic sovereignty. Forty artists bought barren land on the Coromandel coast, built their own thatched huts, and established Cholamandal: India’s first self-supporting artists’ village. To avoid commercial art market compromises, they funded their painting by making batik textiles and metal craft by day, painting their masterpieces by evening.',
    geographicDiffusion:
      'The Madras Movement created a powerful southern pole in Indian modernism, challenging the dominance of Bombay and Calcutta. Its philosophical emphasis on "Words and Symbols" inspired the pan-Indian Neo-Tantra art movement of the 1970s.',
    connectedLocationIds: ['thanjavur', 'bombay'],
    masterpiece: {
      title: 'Words and Symbols',
      artist: 'K.C.S. Paniker',
      year: '1968 CE',
      medium: 'Oil and ink on canvas',
      dimensions: '145 cm × 120 cm',
      collection: 'National Gallery of Modern Art (NGMA), New Delhi / Cholamandal Museum',
      description:
        'A canvas resembling an ancient astronomical palimpsest or horoscope chart. Microscopic handwritten Malayalam mathematical equations, snake symbols, compass dials, and astrological figures coalesce into an intricate metaphysical tapestry.',
      colorPalette: [
        { name: 'Parchment Alabaster', hex: '#EDE0D4', source: 'Warm white gesso ground' },
        { name: 'Horoscope Ink Sepia', hex: '#3D3A37', source: 'Carbon soot and walnut ink' },
        { name: 'Tantric Ochre', hex: '#DDA15E', source: 'Mineral yellow' },
        { name: 'Coromandel Sea Mist', hex: '#7798AB', source: 'Diluted cobalt' }
      ],
      accentColor: '#1E3A8A'
    },
    curatorialAudioScript:
      'K.C.S. Paniker looked at ancient palm-leaf horoscopes and Arabic calligraphy and realized that script itself could be pure painting. In "Words and Symbols", mathematics and metaphysics become poetry. The artists built Cholamandal with their own hands by the roar of the Bay of Bengal, creating a paradise of creative autonomy.'
  }
];

export interface InfluencePath {
  id: string;
  sourceId: string;
  targetId: string;
  title: string;
  description: string;
  eraContext: string;
  color: string;
}

export const INFLUENCE_PATHS: InfluencePath[] = [
  {
    id: 'bhimbetka-to-warli',
    sourceId: 'bhimbetka',
    targetId: 'warli',
    title: 'Prehistoric Lineage to Living Warli Geometry',
    description:
      'The dynamic hunting stick-figures and circle-of-life group dances of Mesolithic Bhimbetka directly seeded the living tribal geometric language of the Warli community.',
    eraContext: 'Prehistoric to Living Folk',
    color: '#9A3412'
  },
  {
    id: 'bhimbetka-to-gond',
    sourceId: 'bhimbetka',
    targetId: 'gond',
    title: 'Vindhyan Rock Spirits to Gond Animism',
    description:
      'The sacred animism and mythical animal compositions in the Narmada river valley connected the rock shelter artists to modern Pardhan Gond master storytellers.',
    eraContext: 'Ancient to Modern Tribal',
    color: '#B45309'
  },
  {
    id: 'ajanta-to-lepakshi',
    sourceId: 'ajanta',
    targetId: 'lepakshi',
    title: 'Classical Deccan Frescoes to Vijayanagara Ceiling Murals',
    description:
      'The three-dimensional calligraphic modeling of Ajanta evolved through Badami and the Chalukyas into the majestic 16th-century ceiling murals at Lepakshi.',
    eraContext: '5th c. to 16th c. CE',
    color: '#2A4B7C'
  },
  {
    id: 'mughal-to-kishangarh',
    sourceId: 'mughal',
    targetId: 'kishangarh',
    title: 'Imperial Precision to Lyrical Devotional Romance',
    description:
      'Mughal court draftsmanship and stippling (pardaz) were transformed in Rajasthan by master Nihal Chand into the poetic, elongated spiritual portraits of Bani Thani.',
    eraContext: '17th to 18th c. CE',
    color: '#78350F'
  },
  {
    id: 'mughal-to-kangra',
    sourceId: 'mughal',
    targetId: 'kangra',
    title: 'Court Migration to the Himalayan Valleys',
    description:
      'Displaced artists from Delhi after 1739 fled to the Himalayan foothills, merging Mughal naturalism with pastoral Radha-Krishna devotion to establish the Pahari school.',
    eraContext: 'Mid-18th c. CE',
    color: '#365314'
  },
  {
    id: 'hampi-to-thanjavur',
    sourceId: 'hampi',
    targetId: 'thanjavur',
    title: 'Vijayanagara Diaspora to Tanjore Gold Relief',
    description:
      'After the sack of Hampi in 1565, royal artisans migrated south to Thanjavur, where their stone and mural traditions crystallized into gilded 22k gold foil icons.',
    eraContext: '16th to 18th c. CE',
    color: '#D4AF37'
  },
  {
    id: 'madhubani-to-kolkata',
    sourceId: 'madhubani',
    targetId: 'kolkata',
    title: 'Rural Matrilineal Rites to Nationalist Modernism',
    description:
      'The line drawing and folk idioms of Mithila and Kalighat inspired Jamini Roy and the Bengal School to break free from British academic oil painting.',
    eraContext: '19th to 20th c. CE',
    color: '#B45309'
  },
  {
    id: 'kolkata-to-bombay',
    sourceId: 'kolkata',
    targetId: 'bombay',
    title: 'Bengal Revival to the Progressive Radical Vanguard',
    description:
      'Reacting against the nostalgic romanticism of the Bengal School, young painters in Bombay in 1947 launched the Progressive Artists’ Group for a bold, post-independence India.',
    eraContext: 'Post-Independence (1947)',
    color: '#9A3412'
  },
  {
    id: 'thanjavur-to-cholamandal',
    sourceId: 'thanjavur',
    targetId: 'cholamandal',
    title: 'Southern Sacred Iconography to Madras Symbolism',
    description:
      'K.C.S. Paniker and the Madras Movement drew from South Indian temple crafts, horoscopes, and copper repoussé to pioneer modern indigenous abstract art.',
    eraContext: '1960s Modernism',
    color: '#1E3A8A'
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  context: string;
  correctLocationId: string;
  options: { id: string; label: string }[];
  explanation: string;
  marks: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Where can you find the world-renowned 5th-century rock fresco of "Bodhisattva Padmapani" holding a blue lotus?',
    context: 'Classical Gupta & Vakataka Era cave complex carved into a basalt river gorge.',
    correctLocationId: 'ajanta',
    options: [
      { id: 'ajanta', label: 'Ajanta Caves (Maharashtra)' },
      { id: 'bhimbetka', label: 'Bhimbetka Shelters (Madhya Pradesh)' },
      { id: 'lepakshi', label: 'Lepakshi Temple (Andhra Pradesh)' },
      { id: 'thanjavur', label: 'Thanjavur (Tamil Nadu)' }
    ],
    explanation:
      'Ajanta Cave 1 in Maharashtra houses the famous Bodhisattva Padmapani, celebrated worldwide for its gentle tribhanga pose and contemplative gaze painted under Vakataka royal patronage.',
    marks: 2
  },
  {
    id: 2,
    question: 'Identify the birthplace of "Bani Thani", the lyrical 18th-century Rajput miniature masterpiece hailed as the "Indian Mona Lisa".',
    context: 'Painted by master court artist Nihal Chand under the poetic patronage of Sawant Singh.',
    correctLocationId: 'kishangarh',
    options: [
      { id: 'kangra', label: 'Kangra Valley (Himachal Pradesh)' },
      { id: 'kishangarh', label: 'Kishangarh (Rajasthan)' },
      { id: 'nathdwara', label: 'Nathdwara (Rajasthan)' },
      { id: 'srinagar', label: 'Srinagar (Jammu & Kashmir)' }
    ],
    explanation:
      'Kishangarh in Rajasthan produced the iconic portrait of Bani Thani (Radha) with arched eyebrows, elongated lotus eyes, and gossamer veil painted by Nihal Chand around 1750 CE.',
    marks: 2
  },
  {
    id: 3,
    question: 'Which living folk art tradition is famously practiced on cow dung-plastered walls using white rice flour paste and bamboo sticks in Maharashtra?',
    context: 'Indigenous geometric art centered around the swirling Tarpa circular dance and cosmic balance.',
    correctLocationId: 'warli',
    options: [
      { id: 'warli', label: 'Warli (Maharashtra)' },
      { id: 'madhubani', label: 'Mithila / Madhubani (Bihar)' },
      { id: 'raghurajpur', label: 'Raghurajpur (Odisha)' },
      { id: 'gond', label: 'Patangarh / Gond (Madhya Pradesh)' }
    ],
    explanation:
      'Warli tribal painting is an ancient living tradition from the Sahyadri foothills of Maharashtra, recognized for its two-triangle human figures and communal Tarpa circle dance painted with rice paste.',
    marks: 2
  },
  {
    id: 4,
    question: 'Which sacred temple town is world-famous for icons created with embossed gesso relief overlaid with pure 22-karat gold leaf and precious gems?',
    context: 'Flourished under Maratha ruler Serfoji II and Nayaka patronage on teak wood planks.',
    correctLocationId: 'thanjavur',
    options: [
      { id: 'cholamandal', label: 'Cholamandal (Tamil Nadu)' },
      { id: 'thanjavur', label: 'Thanjavur / Tanjore (Tamil Nadu)' },
      { id: 'srikalahasti', label: 'Srikalahasti (Andhra Pradesh)' },
      { id: 'hampi', label: 'Hampi (Karnataka)' }
    ],
    explanation:
      'Thanjavur (Tanjore) paintings are celebrated for their glittering 22k gold foil relief, cut Jaipur glass gems, and vibrant representations of divine infant Krishna.',
    marks: 2
  },
  {
    id: 5,
    question: 'In December 1947, which city saw F.N. Souza, M.F. Husain, and S.H. Raza establish the "Progressive Artists\' Group" to define post-independence Indian modernism?',
    context: 'Rebelled against both British colonial salon academism and Bengal revivalism.',
    correctLocationId: 'bombay',
    options: [
      { id: 'kolkata', label: 'Kolkata (West Bengal)' },
      { id: 'bombay', label: 'Bombay / Mumbai (Maharashtra)' },
      { id: 'cholamandal', label: 'Cholamandal (Tamil Nadu)' },
      { id: 'mughal', label: 'Delhi / Agra Atelier' }
    ],
    explanation:
      'The Progressive Artists’ Group (PAG) was founded in Bombay in 1947, immediately following India’s independence, unleashing a dynamic modernist movement that entered international art history.',
    marks: 2
  }
];
