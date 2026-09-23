import React, { useState, useMemo, useRef } from 'react';
import { ART_LOCATIONS, ArtLocation, INFLUENCE_PATHS } from './data/artData';
import { Navbar } from './components/Navbar';
import { IndiaMap } from './components/IndiaMap';
import { TimelineBar, EraFilter } from './components/TimelineBar';
import { ArtDossierModal } from './components/ArtDossierModal';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { ArtworkVisual } from './components/ArtworkVisual';
import { getMasterpieceImage } from './data/artImages';
import {
  Search,
  Filter,
  Route,
  Compass,
  Sparkles,
  BookOpen,
  ArrowRight,
  ArrowRightLeft,
  Layers,
  MapPin,
  Palette,
  ChevronLeft,
  ChevronRight,
  Eye,
  ShieldCheck,
  Landmark,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<ArtLocation | null>(null);
  const [inspectLocation, setInspectLocation] = useState<ArtLocation | null>(null);
  const [selectedEra, setSelectedEra] = useState<EraFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showInfluenceLines, setShowInfluenceLines] = useState<boolean>(true);
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);

  // Modals state
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  // Section references for smooth scrolling
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const catalogSectionRef = useRef<HTMLDivElement>(null);
  const diffusionSectionRef = useRef<HTMLDivElement>(null);

  const SPOTLIGHT_IDS = ['ajanta', 'kishangarh', 'thanjavur', 'madhubani', 'raghurajpur'];
  const currentSpotlightLocation = useMemo(() => {
    return ART_LOCATIONS.find((l) => l.id === SPOTLIGHT_IDS[spotlightIndex]) || ART_LOCATIONS[0];
  }, [spotlightIndex]);

  const QUICK_JUMPS = [
    { id: 'ajanta', label: 'Ajanta Murals', icon: '🪷' },
    { id: 'kishangarh', label: 'Bani Thani Miniature', icon: '👑' },
    { id: 'thanjavur', label: 'Tanjore 22K Gold', icon: '⚜️' },
    { id: 'madhubani', label: 'Mithila Folk Painting', icon: '🦚' },
    { id: 'bhimbetka', label: 'Bhimbetka Rock Art', icon: '🏹' },
    { id: 'raghurajpur', label: 'Odisha Pattachitra', icon: '📜' }
  ];

  const SEARCH_SUGGESTIONS = ['Ajanta', 'Gold Leaf', 'Madhubani', 'Bani Thani', 'Mughal', 'Bhimbetka', 'Pichwai', 'Lapis Lazuli'];

  // Filter locations by search, era, and category
  const filteredLocations = useMemo(() => {
    return ART_LOCATIONS.filter((loc) => {
      // Era filter
      if (selectedEra !== 'all' && loc.eraCategory !== selectedEra) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && loc.artCategory !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = loc.name.toLowerCase().includes(query);
        const matchesState = loc.state.toLowerCase().includes(query);
        const matchesMovement = loc.movementName.toLowerCase().includes(query);
        const matchesArtist = loc.keyArtists.some((a) => a.toLowerCase().includes(query));
        const matchesMasterpiece = loc.masterpiece.title.toLowerCase().includes(query);
        const matchesPatronage = loc.patronage.toLowerCase().includes(query);
        const matchesMedium = loc.masterpiece.medium.toLowerCase().includes(query);
        const matchesPigment = loc.masterpiece.colorPalette.some(
          (p) => p.name.toLowerCase().includes(query) || p.source.toLowerCase().includes(query)
        );
        if (
          !matchesName &&
          !matchesState &&
          !matchesMovement &&
          !matchesArtist &&
          !matchesMasterpiece &&
          !matchesPatronage &&
          !matchesMedium &&
          !matchesPigment
        ) {
          return false;
        }
      }
      return true;
    });
  }, [selectedEra, selectedCategory, searchQuery]);

  // Counts by era for timeline bar
  const countsByEra = useMemo(() => {
    const counts: Record<EraFilter, number> = {
      all: ART_LOCATIONS.length,
      prehistoric: 0,
      ancient: 0,
      medieval: 0,
      miniatures: 0,
      folk: 0,
      modern: 0
    };
    ART_LOCATIONS.forEach((l) => {
      counts[l.eraCategory] = (counts[l.eraCategory] || 0) + 1;
    });
    return counts;
  }, []);

  const handleSelectLocation = (loc: ArtLocation) => {
    setSelectedLocation(loc);
    setInspectLocation(loc);
  };

  const handleQuickJump = (locId: string) => {
    const loc = ART_LOCATIONS.find((l) => l.id === locId);
    if (loc) {
      setSelectedLocation(loc);
      handleScrollToMap();
    }
  };

  const handleScrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToTimeline = () => {
    timelineSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextSpotlight = () => {
    setSpotlightIndex((prev) => (prev + 1) % SPOTLIGHT_IDS.length);
  };

  const prevSpotlight = () => {
    setSpotlightIndex((prev) => (prev - 1 + SPOTLIGHT_IDS.length) % SPOTLIGHT_IDS.length);
  };

  const spotlightImgInfo = getMasterpieceImage(currentSpotlightLocation.id);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-900/20 selection:text-amber-950">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenCompare={() => setIsCompareOpen(true)}
        onScrollToMap={handleScrollToMap}
        onScrollToTimeline={handleScrollToTimeline}
        onToggleInfluence={() => setShowInfluenceLines(!showInfluenceLines)}
        showInfluenceLines={showInfluenceLines}
      />

      {/* Hero Editorial Section */}
      <section className="relative px-4 sm:px-6 pt-8 pb-10 max-w-7xl mx-auto border-b border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-5">
            {/* Clean unboxed metadata separator */}
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium font-sans">
              <span>HISTORICAL ATLAS OF INDIAN ART</span>
              <span aria-hidden="true">·</span>
              <span>10,000 BCE – 20TH CENTURY</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-900 font-semibold">18 REGIONAL TRADITIONS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.08] text-balance">
              Chitrakala: The Living Cartography of Indian Art
            </h1>

            <p className="text-base sm:text-lg font-serif text-stone-700 leading-relaxed text-balance">
              From the 10,000 BCE Mesolithic rock art of Bhimbetka to 5th-century Buddhist frescoes at Ajanta,
              gilded Tanjore temple icons, exquisite Rajput and Mughal court ateliers, and living tribal cosmologies —
              explore the sacred geographies, mineral pigments, and reciprocal migrations that defined Indian visual heritage.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handleScrollToMap}
                className="px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-serif font-medium text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <Compass className="w-4 h-4 text-amber-300" />
                <span>Explore Interactive Atlas</span>
              </button>

              <button
                onClick={() => setIsCompareOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-serif font-medium text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowRightLeft className="w-4 h-4 text-amber-800" />
                <span>Side-by-Side Comparison</span>
              </button>
            </div>

            {/* Quick Jumps to Landmark Traditions */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-2 font-sans">
                Quick Jump to Landmark Traditions:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {QUICK_JUMPS.map((qj) => (
                  <button
                    key={qj.id}
                    onClick={() => handleQuickJump(qj.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100/90 hover:bg-amber-100/80 text-stone-700 hover:text-amber-950 rounded-lg text-xs font-serif transition-colors border border-stone-200/80 cursor-pointer"
                  >
                    <span>{qj.icon}</span>
                    <span>{qj.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Featured Masterpiece Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-lg overflow-hidden flex flex-col">
              {/* Spotlight Header Bar */}
              <div className="px-4 py-2.5 bg-stone-900 text-stone-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-serif font-bold text-amber-300">Curator’s Masterpiece Spotlight</span>
                </div>
                <div className="flex items-center gap-1 text-stone-400 font-mono text-[11px]">
                  <span>{spotlightIndex + 1} / {SPOTLIGHT_IDS.length}</span>
                  <div className="flex items-center ml-2">
                    <button
                      onClick={prevSpotlight}
                      className="p-1 hover:text-white transition-colors cursor-pointer"
                      title="Previous Masterpiece"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextSpotlight}
                      className="p-1 hover:text-white transition-colors cursor-pointer"
                      title="Next Masterpiece"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Masterpiece Real Photograph Display */}
              <div className="relative aspect-[4/3] w-full bg-stone-950 overflow-hidden group cursor-pointer" onClick={() => handleSelectLocation(currentSpotlightLocation)}>
                <img
                  src={currentSpotlightLocation.masterpiece.imageUrl || spotlightImgInfo.imageUrl}
                  alt={currentSpotlightLocation.masterpiece.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-sans font-medium text-amber-300 border border-amber-500/20">
                  {currentSpotlightLocation.eraPeriod}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left pointer-events-none">
                  <p className="text-xs uppercase tracking-wider text-amber-300 font-sans font-medium">
                    {currentSpotlightLocation.masterpiece.artist} · {currentSpotlightLocation.masterpiece.year}
                  </p>
                  <h3 className="text-lg font-serif font-bold text-white leading-tight mt-0.5">
                    "{currentSpotlightLocation.masterpiece.title}"
                  </h3>
                </div>
              </div>

              {/* Card Meta & Mineral Pigments */}
              <div className="p-4 space-y-3 bg-stone-50/60 border-t border-stone-100 text-left">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span className="font-semibold text-stone-900">{currentSpotlightLocation.movementName}</span>
                  <span className="text-stone-500 font-serif">📍 {currentSpotlightLocation.cityOrSite}, {currentSpotlightLocation.state}</span>
                </div>

                {/* Natural Pigments Strip */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider shrink-0 mr-1">Pigments:</span>
                  {currentSpotlightLocation.masterpiece.colorPalette.slice(0, 4).map((p, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-700 shrink-0 shadow-2xs"
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.hex }} />
                      <span>{p.name}</span>
                    </span>
                  ))}
                </div>

                {/* Action button */}
                <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between">
                  <span className="text-[10px] text-stone-500 line-clamp-1 max-w-[200px]">
                    🏛️ {spotlightImgInfo.museumOrSite}
                  </span>
                  <button
                    onClick={() => handleSelectLocation(currentSpotlightLocation)}
                    className="text-xs font-serif font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Examine Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational / Curatorial Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-6 border-t border-stone-200/80">
          <div>
            <span className="text-xs uppercase tracking-wider text-stone-500 font-medium block">
              Historic Epicenters
            </span>
            <span className="text-2xl font-serif font-bold text-stone-900 tabular-nums">18 Schools</span>
            <span className="text-[11px] text-stone-500 block">Kashmir to Kaveri</span>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-stone-500 font-medium block">
              Cultural Diffusion Arcs
            </span>
            <span className="text-2xl font-serif font-bold text-amber-900 tabular-nums">9 Lineages</span>
            <span className="text-[11px] text-stone-500 block">Reciprocal Influence Routes</span>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-stone-500 font-medium block">
              Chronological Span
            </span>
            <span className="text-2xl font-serif font-bold text-stone-900 tabular-nums">12,000 Years</span>
            <span className="text-[11px] text-stone-500 block">Mesolithic to Modernism</span>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-stone-500 font-medium block">
              Curatorial Archives
            </span>
            <span className="text-2xl font-serif font-bold text-amber-800 tabular-nums">Verified</span>
            <span className="text-[11px] text-stone-500 block">Museum & Archaeological Records</span>
          </div>
        </div>
      </section>

      {/* Main Interactive Map & Exploration Workspace */}
      <section ref={mapSectionRef} className="px-4 sm:px-6 py-8 max-w-7xl mx-auto space-y-6">
        {/* Search & Art Category Filters */}
        <div className="space-y-3 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-stone-200 shadow-sm">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Live Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by state, tradition, artist, or pigment..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/60 transition-all font-sans placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Interactive Category Filter Buttons (Functional Segmented Control) */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
              {[
                { id: 'all', label: 'All Styles' },
                { id: 'Murals & Rock Art', label: 'Murals & Rock' },
                { id: 'Court Miniatures', label: 'Court Miniatures' },
                { id: 'Folk & Tribal Art', label: 'Folk & Tribal' },
                { id: 'Sacred Textiles & Scrolls', label: 'Sacred Textiles' },
                { id: 'Modern & Contemporary', label: 'Modern Art' }
              ].map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-stone-900 text-white shadow-sm font-semibold'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Search Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 pt-1 border-t border-stone-100">
            <span className="text-[11px] font-sans uppercase tracking-wider text-stone-400 mr-1">Popular searches:</span>
            {SEARCH_SUGGESTIONS.map((sug) => (
              <button
                key={sug}
                onClick={() => setSearchQuery(sug)}
                className={`px-2 py-0.5 rounded text-[11px] font-serif transition-colors cursor-pointer ${
                  searchQuery.toLowerCase() === sug.toLowerCase()
                    ? 'bg-amber-900 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Scrubber */}
        <div ref={timelineSectionRef}>
          <TimelineBar
            selectedEra={selectedEra}
            onSelectEra={setSelectedEra}
            countsByEra={countsByEra}
          />
        </div>

        {/* Interactive India Digital Map Component */}
        <div className="relative">
          <IndiaMap
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onSelectLocation={handleSelectLocation}
            showInfluenceLines={showInfluenceLines}
            onToggleInfluenceLines={() => setShowInfluenceLines(!showInfluenceLines)}
            activeFilterCount={filteredLocations.length}
          />
        </div>

        {/* Quick Context Bar under Map */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 text-xs text-stone-600 border-t border-stone-200">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800">Viewing {filteredLocations.length} of 18 Centers</span>
            <span aria-hidden="true">·</span>
            <span>Click any marker to open its curatorial dossier</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="flex items-center gap-1.5 text-amber-900 font-medium hover:underline cursor-pointer text-xs"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Launch Side-by-Side Comparison</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Geographic Spread & Cultural Diffusion Analysis */}
      <section ref={diffusionSectionRef} className="px-4 sm:px-6 py-12 max-w-7xl mx-auto border-t border-stone-200 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-900 font-semibold font-sans mb-1">
            <Compass className="w-4 h-4 text-amber-800" />
            <span>Cultural Geography & Style Migration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Geographic Spread & Artistic Migration Across India
          </h2>
          <p className="text-base font-serif text-stone-600 italic mt-1 max-w-2xl text-balance">
            Indian art did not develop in isolation. Royal ateliers migrated during wars, pilgrims carried sacred
            scrolls along river trade networks, and modernists looked to ancient tribal geometries.
          </p>
        </div>

        {/* Diffusion Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INFLUENCE_PATHS.slice(0, 6).map((path) => {
            const src = ART_LOCATIONS.find((l) => l.id === path.sourceId);
            const tgt = ART_LOCATIONS.find((l) => l.id === path.targetId);
            if (!src || !tgt) return null;

            return (
              <div
                key={path.id}
                className="p-5 bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-2">
                    <span>{path.eraContext}</span>
                    <span className="text-amber-800 font-medium">Migration Artery</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug">
                    {path.title}
                  </h3>

                  <div className="flex items-center gap-2 my-3 text-xs font-medium text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <span className="font-serif text-amber-900 font-semibold">{src.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                    <span className="font-serif text-amber-900 font-semibold">{tgt.name}</span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {path.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      handleSelectLocation(src);
                      handleScrollToMap();
                    }}
                    className="text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    View Origin ({src.state})
                  </button>
                  <button
                    onClick={() => {
                      handleSelectLocation(tgt);
                      handleScrollToMap();
                    }}
                    className="text-amber-900 font-medium hover:underline flex items-center gap-1"
                  >
                    <span>View Successor</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Comprehensive Archive Directory of Regional Schools */}
      <section ref={catalogSectionRef} className="px-4 sm:px-6 py-12 max-w-7xl mx-auto border-t border-stone-200 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-500 font-medium block mb-1">
              CURATORIAL CATALOGUE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Catalogue of Master Schools & Movements
            </h2>
            <p className="text-sm font-serif text-stone-600 italic mt-1">
              Select any regional school to examine its historical context, pigments, and masterworks.
            </p>
          </div>

          <span className="text-xs font-mono text-stone-500 shrink-0">
            {filteredLocations.length} Records Matching Filters
          </span>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((loc) => (
            <div
              key={loc.id}
              onClick={() => handleSelectLocation(loc)}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Visual Artwork Thumbnail */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                  <ArtworkVisual location={loc} detailed={false} />
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-2.5">
                  {/* Metadata unboxed text */}
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <span className="font-semibold text-amber-800">{loc.state}</span>
                    <span aria-hidden="true">·</span>
                    <span>{loc.approximateYears}</span>
                    <span aria-hidden="true">·</span>
                    <span>{loc.artCategory.split('&')[0]}</span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-tight">
                    {loc.movementName}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {loc.historicalContext}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="italic font-serif truncate max-w-[190px]">
                  Masterpiece: {loc.masterpiece.title}
                </span>
                <span className="font-semibold text-amber-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Inspect
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-300 bg-stone-100/90 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-600">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-serif text-lg font-bold text-stone-900">ChitraKala</span>
            <p className="text-stone-500">
              Interactive Digital Map of Indian Art History · Survey of India Cartographic Archive
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handleScrollToMap}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Interactive Map
            </button>
            <button
              onClick={handleScrollToTimeline}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Chronological Timeline
            </button>
            <button
              onClick={() => setIsCompareOpen(true)}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Compare Schools
            </button>
          </div>
        </div>
      </footer>

      {/* Curatorial Dossier Modal */}
      <ArtDossierModal
        location={inspectLocation}
        onClose={() => setInspectLocation(null)}
        onSelectConnectedLocation={(connectedLoc) => {
          setSelectedLocation(connectedLoc);
          setInspectLocation(connectedLoc);
        }}
      />

      {/* Side-by-Side Comparison Drawer */}
      <ComparisonDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        initialLocA={selectedLocation || ART_LOCATIONS[0]}
        initialLocB={ART_LOCATIONS[3]}
      />
    </div>
  );
}
