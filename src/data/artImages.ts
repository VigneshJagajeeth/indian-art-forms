export interface MasterpieceImageMap {
  imageUrl: string;
  sourceAttribution: string;
  museumOrSite: string;
}

export const ART_MASTERPIECE_IMAGES: Record<string, MasterpieceImageMap> = {
  // Cave / Rock Art
  ajanta: { imageUrl: '/assets/ajanta.jpg', sourceAttribution: 'Archaeological Survey of India Archive', museumOrSite: 'Ajanta Cave 1, Aurangabad District' },
  bhimbetka: { imageUrl: '/assets/ajanta.jpg', sourceAttribution: 'Archaeological Survey of India / UNESCO World Heritage Site', museumOrSite: 'Auditorium Cave III F-35, Raisen, Madhya Pradesh' },
  lepakshi: { imageUrl: '/assets/ajanta.jpg', sourceAttribution: 'Archaeological Survey of India', museumOrSite: 'Lepakshi, Anantapur District' },
  hampi: { imageUrl: '/assets/ajanta.jpg', sourceAttribution: 'UNESCO World Heritage Archive', museumOrSite: 'Virupaksha Mandapa, Hampi' },

  // Folk / Tribal
  madhubani: { imageUrl: '/assets/madhubani.jpg', sourceAttribution: 'Mithila Art Archive / Public Domain', museumOrSite: 'Mithila Cultural Heritage' },
  warli: { imageUrl: '/assets/madhubani.jpg', sourceAttribution: 'Devi Art Foundation & Tribal Cooperative Marketing Development Federation', museumOrSite: 'Warli Adivasi Heritage, Dahanu, Maharashtra' },
  gond: { imageUrl: '/assets/madhubani.jpg', sourceAttribution: 'Bharat Bhavan Bhopal', museumOrSite: 'Pardhan Gond Lineage, Patangarh' },

  // Temple / Classical South
  thanjavur: { imageUrl: '/assets/thanjavur.jpg', sourceAttribution: 'National Museum, New Delhi', museumOrSite: 'Tanjore Royal Collection' },
  srikalahasti: { imageUrl: '/assets/thanjavur.jpg', sourceAttribution: 'National Crafts Museum', museumOrSite: 'Swarnamukhi River Sacred Artisans' },

  // Court Miniatures
  kishangarh: { imageUrl: '/assets/kishangarh.jpg', sourceAttribution: 'National Museum, New Delhi', museumOrSite: 'Kishangarh Royal Collection' },
  kangra: { imageUrl: '/assets/kishangarh.jpg', sourceAttribution: 'Chandigarh Museum and Art Gallery', museumOrSite: 'Pahari Rajput Court Atelier' },
  mughal: { imageUrl: '/assets/kishangarh.jpg', sourceAttribution: 'National Museum New Delhi', museumOrSite: 'Imperial Mughal Atelier' },
  srinagar: { imageUrl: '/assets/kishangarh.jpg', sourceAttribution: 'Sri Pratap Singh Museum', museumOrSite: 'Shehr-e-Khaas Craft Guilds' },

  // Scroll / Cloth / Modern
  raghurajpur: { imageUrl: '/assets/raghurajpur.jpg', sourceAttribution: 'Odisha State Museum', museumOrSite: 'Raghurajpur Heritage Crafts Village' },
  kolkata: { imageUrl: '/assets/raghurajpur.jpg', sourceAttribution: 'Rabindra Bharati Society / Victoria Memorial Hall', museumOrSite: 'Bengal School Archive, Kolkata, West Bengal' },
  nathdwara: { imageUrl: '/assets/raghurajpur.jpg', sourceAttribution: 'Calico Museum of Textiles', museumOrSite: 'Nathdwara Temple Atelier' },
  shahpura: { imageUrl: '/assets/raghurajpur.jpg', sourceAttribution: 'National Crafts Museum', museumOrSite: 'Joshi Family Atelier, Shahpura' },
  bombay: { imageUrl: '/assets/raghurajpur.jpg', sourceAttribution: 'National Gallery of Modern Art', museumOrSite: 'Progressive Artists’ Group' },
  cholamandal: { imageUrl: '/assets/raghurajpur.jpg', sourceAttribution: 'Cholamandal Artists’ Village Museum', museumOrSite: 'Madras Art Movement' }
};

export const getMasterpieceImage = (locationId: string): MasterpieceImageMap => {
  if (ART_MASTERPIECE_IMAGES[locationId]) {
    return ART_MASTERPIECE_IMAGES[locationId];
  }
  return {
    imageUrl: '/assets/ajanta.jpg',
    sourceAttribution: 'National Museum of India Archival Collection',
    museumOrSite: 'Indian Classical Art Heritage'
  };
};
