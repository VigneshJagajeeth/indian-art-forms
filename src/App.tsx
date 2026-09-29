import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ART_LOCATIONS, ArtLocation } from './data/artData';
import { IndiaMap } from './components/IndiaMap';
import { ArtDossierModal } from './components/ArtDossierModal';
import { ArtworkVisual } from './components/ArtworkVisual';
import { LotusAnimation } from './components/LotusAnimation';
import { Volume2, VolumeX, MapPin, Compass, Play, Sparkles } from 'lucide-react';
import { getMasterpieceImage } from './data/artImages';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<ArtLocation | null>(null);
  const [inspectLocation, setInspectLocation] = useState<ArtLocation | null>(null);

  // Play audio when entering the experience
  const handleEnter = () => {
    setHasEntered(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.log("Audio autoplay prevented", e));
    }
  };

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

  if (!hasEntered) {
    return (
      <div className="fixed inset-0 bg-[#351b14] flex flex-col items-center justify-center z-50 text-amber-100 overflow-hidden">
        {/* Entrance Lotus */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute opacity-20 pointer-events-none"
        >
          <svg width="600" height="600" viewBox="0 0 100 100" className="text-amber-500">
            <path d="M50 0 C70 40, 100 50, 100 50 C100 50, 70 60, 50 100 C30 60, 0 50, 0 50 C0 50, 30 40, 50 0 Z" fill="currentColor"/>
            <path d="M14.6 14.6 C42.9 30.2, 85.4 14.6, 85.4 14.6 C85.4 14.6, 69.8 42.9, 85.4 85.4 C57.1 69.8, 14.6 85.4, 14.6 85.4 C14.6 85.4, 30.2 57.1, 14.6 14.6 Z" fill="currentColor"/>
          </svg>
        </motion.div>
        
        <div className="relative z-10 text-center space-y-8 flex flex-col items-center">
          <div>
            <h1 className="font-display text-6xl md:text-8xl tracking-tight text-amber-400 drop-shadow-lg">
              Kalabhoomi
            </h1>
            <p className="font-serif italic text-amber-200/80 mt-4 text-lg md:text-xl tracking-widest uppercase">
              The Living Cartography of Indian Art
            </p>
          </div>
          <button
            onClick={handleEnter}
            className="group relative px-8 py-4 bg-amber-900/40 border border-amber-500/50 rounded-full hover:bg-amber-800/60 hover:scale-105 transition-all overflow-hidden flex items-center gap-3"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/20 to-amber-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <Play className="w-5 h-5 text-amber-300 fill-amber-300" />
            <span className="font-serif text-lg text-amber-100 font-semibold tracking-wide">Enter the Realm</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-stone-900 font-sans selection:bg-amber-900/20 selection:text-amber-950 relative overflow-x-hidden">
      
      {/* Background Music Player */}
      <audio 
        ref={audioRef} 
        src="https://upload.wikimedia.org/wikipedia/commons/1/14/Tabla_solo.ogg" 
        loop 
      />
      
      <LotusAnimation />

      {/* Floating Audio Toggle */}
      <button 
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 z-40 p-4 bg-amber-900 text-amber-100 rounded-full shadow-2xl hover:bg-amber-800 transition-all border border-amber-700/50 group"
      >
        {isPlaying ? <Volume2 className="w-6 h-6 animate-pulse" /> : <VolumeX className="w-6 h-6 opacity-60" />}
      </button>

      {/* Top Navbar Minimal */}
      <nav className="fixed top-0 inset-x-0 z-40 bg-gradient-to-b from-stone-900/80 to-transparent backdrop-blur-sm p-6 flex justify-between items-center pointer-events-none">
        <h1 className="font-display text-4xl text-amber-100 drop-shadow-md pointer-events-auto">Kalabhoomi</h1>
        <div className="hidden md:flex font-serif text-amber-100/80 text-sm uppercase tracking-widest gap-6 pointer-events-auto">
          <span>18 Regional Traditions</span>
          <span>10,000 BCE – 20TH CENTURY</span>
        </div>
      </nav>

      {/* Immersive Map Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center p-4 pt-24 pb-12 max-w-7xl mx-auto z-10 gap-12">
        
        {/* Left Side: The Interactive Map */}
        <div className="w-full md:w-1/2 flex-shrink-0 relative">
          <div className="absolute inset-0 -m-12 border-2 border-amber-900/10 rounded-full animate-spin-slow pointer-events-none border-dashed" />
          <div className="absolute inset-0 -m-6 border border-rose-900/10 rounded-full animate-reverse-spin-slow pointer-events-none" />
          <div className="bg-white/40 backdrop-blur-xl rounded-full p-8 shadow-2xl border-4 border-amber-900/20">
            <IndiaMap
              locations={ART_LOCATIONS}
              selectedLocation={selectedLocation}
              onSelectLocation={handleSelectLocation}
              showInfluenceLines={true}
              onToggleInfluenceLines={() => {}}
              activeFilterCount={ART_LOCATIONS.length}
            />
          </div>
        </div>

        {/* Right Side: Featured Info (Replacing the bulky filters) */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/10 border border-amber-900/20 text-amber-950 text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-4 h-4 text-amber-700" />
            Sacred Geography
          </div>
          
          <h2 className="font-display text-5xl md:text-6xl text-[#3d251d] leading-tight">
            Journey Through the Colors of India
          </h2>
          
          <p className="font-serif text-lg text-[#5a4237] leading-relaxed max-w-lg">
            Every stroke holds a history. Every pigment tells a tale. Click on the golden markers across the map to unveil the divine frescoes, intricate miniatures, and folk cosmologies born from this soil.
          </p>

          {/* Quick jump to a featured masterpiece */}
          <div className="mt-8 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-amber-900/20 shadow-xl w-full max-w-sm">
            <p className="text-xs uppercase tracking-widest text-amber-800 font-bold mb-3">Featured Masterpiece</p>
            <div 
              onClick={() => handleSelectLocation(ART_LOCATIONS[0])}
              className="group relative h-48 rounded-xl overflow-hidden cursor-pointer"
            >
              <img 
                src="/assets/ajanta.jpg" 
                alt="Ajanta"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 sepia-[0.2]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                <span className="font-serif text-white text-lg">Bodhisattva Padmapani</span>
                <span className="text-amber-300 text-xs tracking-wider">Ajanta Caves, 5th c. CE</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Decorative Floral Divider */}
      <div className="w-full flex justify-center py-12 opacity-40">
        <svg width="200" height="40" viewBox="0 0 200 40" className="text-amber-900">
          <path d="M100 20 C120 0, 180 0, 200 20 C180 40, 120 40, 100 20 C80 0, 20 0, 0 20 C20 40, 80 40, 100 20 Z" fill="currentColor"/>
        </svg>
      </div>

      {/* The Gallery / Archive Section */}
      <section className="px-4 sm:px-6 py-12 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display text-4xl md:text-5xl text-[#3d251d]">
            The Curatorial Archive
          </h2>
          <p className="font-serif text-stone-600 max-w-2xl mx-auto italic">
            Browse through the 18 regional traditions. Select any card to explore its historical lineage, techniques, and geographic spread.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ART_LOCATIONS.map((loc, idx) => {
            const masterpieceData = getMasterpieceImage(loc.id);
            return (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: (idx % 3) * 0.2 }}
                onClick={() => handleSelectLocation(loc)}
                className="group relative bg-[#fdfaf5] rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md border-2 border-amber-900/10 hover:border-amber-900/30 overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col"
              >
                {/* Image Header with floral decorative clip */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-stone-900">
                    <img 
                      src={masterpieceData.imageUrl}
                      alt={loc.masterpiece.title}
                      className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110 sepia-[0.1]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fdfaf5]" />
                </div>
                
                <div className="p-6 flex-1 flex flex-col relative -mt-12 z-10">
                  <div className="bg-white/80 backdrop-blur-md border border-amber-900/10 rounded-xl p-4 shadow-sm mb-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-amber-700 block mb-1">
                      {loc.state} • {loc.eraCategory}
                    </span>
                    <h3 className="font-display text-2xl text-[#3d251d] group-hover:text-amber-900 transition-colors">
                      {loc.movementName}
                    </h3>
                  </div>
                  <p className="font-serif text-stone-600 text-sm line-clamp-3 mb-6">
                    {loc.historicalContext}
                  </p>
                  
                  <div className="mt-auto border-t border-amber-900/10 pt-4 flex items-center justify-between text-xs text-amber-900 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {loc.cityOrSite}</span>
                    <span className="group-hover:translate-x-1 transition-transform">Explore →</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Dossier Modal */}
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
