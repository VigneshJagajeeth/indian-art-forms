import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ART_LOCATIONS, ArtLocation } from './data/artData';
import { IndiaMap } from './components/IndiaMap';
import { ArtDossierModal } from './components/ArtDossierModal';
import { Volume2, VolumeX, MapPin, Sparkles } from 'lucide-react';
import { getMasterpieceImage } from './data/artImages';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<ArtLocation | null>(null);
  const [inspectLocation, setInspectLocation] = useState<ArtLocation | null>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleSelectLocation = (loc: ArtLocation) => {
    setSelectedLocation(loc);
    setInspectLocation(loc);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-900 font-sans selection:bg-amber-900/20 selection:text-amber-950">
      
      {/* Background Music Player */}
      <audio 
        ref={audioRef} 
        src="https://upload.wikimedia.org/wikipedia/commons/1/14/Tabla_solo.ogg" 
        loop 
      />

      {/* Top Navbar */}
      <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <h1 className="font-display text-3xl text-amber-950">Kalabhoomi</h1>
          
          <div className="flex items-center gap-6">
            <span className="hidden md:block font-serif text-stone-500 text-sm tracking-widest uppercase">
              Indian Art History Archive
            </span>
            <button 
              onClick={toggleAudio}
              className="p-2.5 rounded-full bg-stone-100 hover:bg-amber-100 text-amber-900 transition-colors border border-stone-200"
              title="Toggle Background Music"
            >
              {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Cartography
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-stone-900 leading-tight mb-6">
            Explore the Living Heritage of Indian Art
          </h2>
          <p className="font-serif text-lg text-stone-600 leading-relaxed">
            Click on the golden markers across the map to unveil divine frescoes, intricate miniatures, and tribal cosmologies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Map */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 100 100">
                 <path d="M50 0 C70 40, 100 50, 100 50 C100 50, 70 60, 50 100 C30 60, 0 50, 0 50 C0 50, 30 40, 50 0 Z" fill="currentColor"/>
              </svg>
            </div>
            <IndiaMap
              locations={ART_LOCATIONS}
              selectedLocation={selectedLocation}
              onSelectLocation={handleSelectLocation}
              showInfluenceLines={true}
              onToggleInfluenceLines={() => {}}
              activeFilterCount={ART_LOCATIONS.length}
            />
          </div>

          {/* Masterpiece Spotlight */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="bg-stone-900 rounded-3xl p-8 text-stone-100 shadow-xl relative overflow-hidden h-full min-h-[400px] flex flex-col">
              <div className="absolute inset-0 opacity-40">
                <img 
                  src="/assets/ajanta.jpg" 
                  alt="Background texture" 
                  className="w-full h-full object-cover blur-sm sepia brightness-50"
                />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
                  Curator's Spotlight
                </span>
                <h3 className="font-display text-3xl mb-4">
                  Classical Indian Aesthetics
                </h3>
                <p className="font-serif text-stone-300 leading-relaxed mb-8 flex-1">
                  Indian art spans thousands of years, from the ancient rock shelters of Bhimbetka to the lush narrative frescoes of Ajanta and the exquisite detail of Mughal and Rajput courts.
                </p>
                <button 
                  onClick={() => handleSelectLocation(ART_LOCATIONS[0])}
                  className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-serif rounded-xl transition-colors font-semibold shadow-lg"
                >
                  Discover Ajanta Caves
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="bg-stone-50 border-t border-stone-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="font-display text-4xl text-stone-900 mb-12 text-center">Regional Traditions Archive</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ART_LOCATIONS.map((loc, idx) => {
              const masterpieceData = getMasterpieceImage(loc.id);
              return (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                  onClick={() => handleSelectLocation(loc)}
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={masterpieceData.imageUrl}
                      alt={loc.masterpiece.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-amber-700 mb-2">
                      {loc.eraCategory}
                    </span>
                    <h4 className="font-display text-2xl text-stone-900 mb-3 group-hover:text-amber-700 transition-colors">
                      {loc.movementName}
                    </h4>
                    <p className="font-serif text-stone-600 text-sm line-clamp-2 mb-6">
                      {loc.historicalContext}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs text-stone-500 font-semibold uppercase tracking-wide">
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5"/> {loc.cityOrSite}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 text-center font-serif">
        <p>© 2026 Kalabhoomi. Preserving Indian Art History.</p>
      </footer>

      {/* Modal */}
      <ArtDossierModal
        location={inspectLocation}
        onClose={() => setInspectLocation(null)}
        onSelectConnectedLocation={(connectedLoc) => {
          setSelectedLocation(connectedLoc);
          setInspectLocation(connectedLoc);
        }}
      />
    </div>
  );
}
