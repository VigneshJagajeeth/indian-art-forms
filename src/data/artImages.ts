export interface MasterpieceImageMap {
  imageUrl: string;
  sourceAttribution: string;
  museumOrSite: string;
}

export const ART_MASTERPIECE_IMAGES: Record<string, MasterpieceImageMap> = {
  ajanta: {
    imageUrl: '/assets/ajanta.jpg',
    sourceAttribution: 'Archaeological Survey of India Archive',
    museumOrSite: 'Ajanta Cave 1, Aurangabad District'
  },
  madhubani: {
    imageUrl: '/assets/madhubani.jpg',
    sourceAttribution: 'Mithila Art Archive / Public Domain',
    museumOrSite: 'Mithila Cultural Heritage'
  },
  thanjavur: {
    imageUrl: '/assets/thanjavur.jpg',
    sourceAttribution: 'National Museum, New Delhi',
    museumOrSite: 'Tanjore Royal Collection'
  },
  kishangarh: {
    imageUrl: '/assets/kishangarh.jpg',
    sourceAttribution: 'National Museum, New Delhi',
    museumOrSite: 'Kishangarh Royal Collection'
  },
  kangra: {
    imageUrl: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80',
    sourceAttribution: 'Chandigarh Museum and Art Gallery',
    museumOrSite: 'Pahari Rajput Court Atelier'
  },
  raghurajpur: {
    imageUrl: '/assets/raghurajpur.jpg',
    sourceAttribution: 'Odisha State Museum',
    museumOrSite: 'Raghurajpur Heritage Crafts Village'
  },
  kolkata: {
    imageUrl: 'https://images.unsplash.com/photo-1582561424760-0321d6cb2996?auto=format&fit=crop&q=80',
    sourceAttribution: 'Rabindra Bharati Society / Victoria Memorial Hall',
    museumOrSite: 'Bengal School Archive, Kolkata, West Bengal'
  },
  warli: {
    imageUrl: 'https://images.unsplash.com/photo-1582560475093-ba66cef4febb?auto=format&fit=crop&q=80',
    sourceAttribution: 'Devi Art Foundation & Tribal Cooperative Marketing Development Federation',
    museumOrSite: 'Warli Adivasi Heritage, Dahanu, Maharashtra'
  },
  bhimbetka: {
    imageUrl: 'https://images.unsplash.com/photo-1620802051773-9ea7b420cc51?auto=format&fit=crop&q=80',
    sourceAttribution: 'Archaeological Survey of India / UNESCO World Heritage Site',
    museumOrSite: 'Auditorium Cave III F-35, Raisen, Madhya Pradesh'
  },
  gond: {
    imageUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80',
    sourceAttribution: 'Bharat Bhavan Bhopal',
    museumOrSite: 'Pardhan Gond Lineage, Patangarh'
  },
  mughal: {
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80',
    sourceAttribution: 'National Museum New Delhi',
    museumOrSite: 'Imperial Mughal Atelier'
  },
  srikalahasti: {
    imageUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80',
    sourceAttribution: 'National Crafts Museum',
    museumOrSite: 'Swarnamukhi River Sacred Artisans'
  },
  nathdwara: {
    imageUrl: 'https://images.unsplash.com/photo-1621841324201-92be01c51db3?auto=format&fit=crop&q=80',
    sourceAttribution: 'Calico Museum of Textiles',
    museumOrSite: 'Nathdwara Temple Atelier'
  },
  shahpura: {
    imageUrl: 'https://images.unsplash.com/photo-1580130281320-0ef0754f2bf7?auto=format&fit=crop&q=80',
    sourceAttribution: 'National Crafts Museum',
    museumOrSite: 'Joshi Family Atelier, Shahpura'
  },
  lepakshi: {
    imageUrl: 'https://images.unsplash.com/photo-1563810178351-e7370b135ddb?auto=format&fit=crop&q=80',
    sourceAttribution: 'Archaeological Survey of India',
    museumOrSite: 'Lepakshi, Anantapur District'
  },
  hampi: {
    imageUrl: 'https://images.unsplash.com/photo-1600018861274-1a9829f79e2c?auto=format&fit=crop&q=80',
    sourceAttribution: 'UNESCO World Heritage Archive',
    museumOrSite: 'Virupaksha Mandapa, Hampi'
  },
  srinagar: {
    imageUrl: 'https://images.unsplash.com/photo-1587313333333-e18e821eb199?auto=format&fit=crop&q=80',
    sourceAttribution: 'Sri Pratap Singh Museum',
    museumOrSite: 'Shehr-e-Khaas Craft Guilds'
  },
  bombay: {
    imageUrl: 'https://images.unsplash.com/photo-1574514936353-83ec32e3a093?auto=format&fit=crop&q=80',
    sourceAttribution: 'National Gallery of Modern Art',
    museumOrSite: 'Progressive Artists’ Group'
  },
  cholamandal: {
    imageUrl: 'https://images.unsplash.com/photo-1565191599971-89ce86d997d7?auto=format&fit=crop&q=80',
    sourceAttribution: 'Cholamandal Artists’ Village Museum',
    museumOrSite: 'Madras Art Movement'
  }
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
