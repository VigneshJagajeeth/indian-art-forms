import React, { useState, useRef, useMemo } from 'react';
import { ArtLocation, INFLUENCE_PATHS } from '../data/artData';
import { getMasterpieceImage } from '../data/artImages';
import {
  INDIA_STATES,
  INDIA_MAP_VIEWBOX,
  INDIA_MAP_WIDTH,
  INDIA_MAP_HEIGHT,
  MAJOR_RIVERS,
  projectLatLngToSvg,
  StateGeoInfo
} from '../data/indiaGeoData';
import { IndiaLeafletMap } from './IndiaLeafletMap';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  Route,
  Layers,
  Info,
  MapPin,
  Globe2,
  Check,
  Sparkles
} from 'lucide-react';

interface IndiaMapProps {
  locations: ArtLocation[];
  selectedLocation: ArtLocation | null;
  onSelectLocation: (loc: ArtLocation) => void;
  showInfluenceLines: boolean;
  onToggleInfluenceLines: () => void;
  activeFilterCount: number;
}

export const IndiaMap: React.FC<IndiaMapProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  showInfluenceLines,
  onToggleInfluenceLines,
  activeFilterCount
}) => {
  // Mode: Official Cartographic SVG vs Real Satellite GIS
  const [mapEngine, setMapEngine] = useState<'cartographic' | 'satellite'>('cartographic');

  // Zoom & Pan state for SVG
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Hover states
  const [hoveredLocation, setHoveredLocation] = useState<ArtLocation | null>(null);
  const [hoveredState, setHoveredState] = useState<StateGeoInfo | null>(null);
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);

  // Cartography styling themes
  const [mapTheme, setMapTheme] = useState<'parchment' | 'night' | 'minimal'>('parchment');
  const [showRivers, setShowRivers] = useState<boolean>(true);
  const [showStateNames, setShowStateNames] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Map mouse interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.35, 3.2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.35, 0.85));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedStateId(null);
  };

  // Region jump targets (centered within 612x696 canvas)
  const handleRegionJump = (region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'All') => {
    if (region === 'All') {
      handleReset();
      return;
    }
    const regionFocalPoints = {
      North: { x: 20, y: 160, z: 1.55 },
      South: { x: -20, y: -210, z: 1.55 },
      East: { x: -160, y: -30, z: 1.55 },
      West: { x: 140, y: 20, z: 1.55 },
      Central: { x: 0, y: -40, z: 1.55 }
    };
    const target = regionFocalPoints[region];
    setPan({ x: target.x, y: target.y });
    setZoom(target.z);
  };

  // Active locations set for fast membership check
  const activeLocationIdSet = useMemo(() => {
    return new Set(locations.map((l) => l.id));
  }, [locations]);

  // Art center counts per state
  const stateArtCount = useMemo(() => {
    const counts: Record<string, number> = {};
    locations.forEach((loc) => {
      // Find state matching loc.state
      const matchedState = INDIA_STATES.find(
        (s) =>
          s.name.toLowerCase().includes(loc.state.toLowerCase()) ||
          loc.state.toLowerCase().includes(s.name.toLowerCase())
      );
      if (matchedState) {
        counts[matchedState.id] = (counts[matchedState.id] || 0) + 1;
      }
    });
    return counts;
  }, [locations]);

  // Influence lines filtered
  const activeInfluencePaths = useMemo(() => {
    if (!showInfluenceLines) {
      if (selectedLocation) {
        return INFLUENCE_PATHS.filter(
          (p) => p.sourceId === selectedLocation.id || p.targetId === selectedLocation.id
        );
      }
      return [];
    }
    return INFLUENCE_PATHS;
  }, [showInfluenceLines, selectedLocation]);

  // Theme palettes
  const themeStyles = {
    parchment: {
      bg: 'bg-[#F9F5EC]',
      ocean: '#E4DFD3',
      oceanBorder: '#C8BFAC',
      stateFill: '#F4ECE0',
      stateHover: '#FDE68A',
      stateSelected: '#FDE047',
      stateBorder: '#BAA890',
      stateBorderWidth: 1.0,
      graticule: '#D9CFBA',
      river: '#0284C7',
      textColor: 'text-amber-950',
      bannerBg: 'bg-[#854D0E] text-white',
      badgeBg: 'bg-[#FDFBF7] border-amber-900/20 text-amber-900',
      shadow: 'drop-shadow-[0_12px_24px_rgba(78,54,34,0.12)]'
    },
    night: {
      bg: 'bg-[#0B132B]',
      ocean: '#070C1A',
      oceanBorder: '#1C2541',
      stateFill: '#1C2541',
      stateHover: '#3A506B',
      stateSelected: '#4F46E5',
      stateBorder: '#485A7E',
      stateBorderWidth: 0.8,
      graticule: '#15203D',
      river: '#38BDF8',
      textColor: 'text-slate-100',
      bannerBg: 'bg-indigo-900 text-amber-200',
      badgeBg: 'bg-slate-900/90 border-slate-700 text-slate-200',
      shadow: 'drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]'
    },
    minimal: {
      bg: 'bg-[#FAFAFA]',
      ocean: '#F0F0F0',
      oceanBorder: '#E0E0E0',
      stateFill: '#FFFFFF',
      stateHover: '#F3F4F6',
      stateSelected: '#E5E7EB',
      stateBorder: '#D1D5DB',
      stateBorderWidth: 0.8,
      graticule: '#E5E7EB',
      river: '#0284C7',
      textColor: 'text-neutral-900',
      bannerBg: 'bg-neutral-900 text-white',
      badgeBg: 'bg-white border-neutral-300 text-neutral-800',
      shadow: 'drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]'
    }
  };

  const currentTheme = themeStyles[mapTheme];

  return (
    <div className="relative flex flex-col w-full bg-stone-900 rounded-2xl shadow-2xl border border-stone-800 overflow-hidden">
      {/* Top Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-stone-950/90 border-b border-stone-800/80 backdrop-blur-md z-30">
        {/* Left: Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex bg-stone-900 p-1 rounded-xl border border-stone-800 shadow-inner">
            <button
              onClick={() => setMapEngine('cartographic')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-serif font-semibold tracking-wide transition-all ${
                mapEngine === 'cartographic'
                  ? 'bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 shadow-md'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Survey of India Cartography</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-black/30 rounded font-sans uppercase">
                36 States
              </span>
            </button>
            <button
              onClick={() => setMapEngine('satellite')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-serif font-semibold tracking-wide transition-all ${
                mapEngine === 'satellite'
                  ? 'bg-gradient-to-r from-cyan-700 to-cyan-600 text-cyan-50 shadow-md'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Satellite & GIS Topography</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-black/30 rounded font-sans uppercase">
                Real World
              </span>
            </button>
          </div>
        </div>

        {/* Center: Regional Navigation Jumps (Cartographic mode) */}
        {mapEngine === 'cartographic' && (
          <div className="hidden lg:flex items-center gap-1 bg-stone-900/80 px-2 py-1 rounded-lg border border-stone-800 text-xs">
            <span className="text-[11px] font-serif text-stone-400 mr-1.5 font-medium">
              Regional Focus:
            </span>
            {(['All', 'North', 'South', 'East', 'West', 'Central'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => handleRegionJump(reg)}
                className="px-2.5 py-1 rounded-md text-stone-300 hover:bg-stone-800 hover:text-amber-300 transition-colors text-[11px] font-medium"
              >
                {reg}
              </button>
            ))}
          </div>
        )}

        {/* Right: Map Feature Toggles */}
        <div className="flex items-center gap-2 text-xs">
          {/* Influence Diffusion Lines Toggle */}
          <button
            onClick={onToggleInfluenceLines}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              showInfluenceLines
                ? 'bg-amber-950/80 border-amber-600/80 text-amber-200 shadow-[0_0_12px_rgba(217,119,6,0.25)]'
                : 'bg-stone-900 border-stone-700 text-stone-400 hover:text-stone-200'
            }`}
            title="Toggle animated cultural spread and stylistic diffusion lineages (CO1 requirement)"
          >
            <Route className="w-3.5 h-3.5" />
            <span className="font-serif font-medium">Diffusion Lineages</span>
            <span
              className={`w-2 h-2 rounded-full ${
                showInfluenceLines ? 'bg-amber-400 animate-pulse' : 'bg-stone-600'
              }`}
            />
          </button>

          {/* Cartographic theme toggles */}
          {mapEngine === 'cartographic' && (
            <>
              <button
                onClick={() => setShowRivers(!showRivers)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] transition-colors ${
                  showRivers
                    ? 'bg-sky-950/70 border-sky-600/70 text-sky-200'
                    : 'bg-stone-900 border-stone-700 text-stone-400 hover:text-stone-200'
                }`}
                title="Toggle Sacred Indian River Basins (Ganga, Narmada, Kaveri, Godavari, Yamuna, Brahmaputra)"
              >
                <span>🌊 Rivers</span>
              </button>

              <div className="flex bg-stone-900 p-0.5 rounded-lg border border-stone-800">
                <button
                  onClick={() => setMapTheme('parchment')}
                  className={`px-2 py-1 rounded text-[11px] font-serif ${
                    mapTheme === 'parchment'
                      ? 'bg-amber-900/80 text-amber-200 font-semibold shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Archival Parchment Historical Cartography"
                >
                  Parchment
                </button>
                <button
                  onClick={() => setMapTheme('night')}
                  className={`px-2 py-1 rounded text-[11px] font-serif ${
                    mapTheme === 'night'
                      ? 'bg-indigo-900/80 text-indigo-200 font-semibold shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Imperial Night Regalia"
                >
                  Night
                </button>
                <button
                  onClick={() => setMapTheme('minimal')}
                  className={`px-2 py-1 rounded text-[11px] font-serif ${
                    mapTheme === 'minimal'
                      ? 'bg-stone-700 text-white font-semibold shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Modern Gallery Ivory"
                >
                  Ivory
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main View Area */}
      {mapEngine === 'satellite' ? (
        <div className="p-4">
          <IndiaLeafletMap
            locations={locations}
            selectedLocation={selectedLocation}
            onSelectLocation={onSelectLocation}
            showInfluenceLines={showInfluenceLines}
          />
        </div>
      ) : (
        <div
          ref={containerRef}
          className={`relative w-full h-[640px] select-none overflow-hidden cursor-grab active:cursor-grabbing transition-colors duration-500 ${currentTheme.bg}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Active State Focus Banner */}
          {selectedStateId && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-stone-950/90 border border-amber-500/80 text-amber-100 px-4 py-2 rounded-full shadow-2xl backdrop-blur-md text-xs font-serif animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>
                State Focus:{' '}
                <strong className="text-amber-300">
                  {INDIA_STATES.find((s) => s.id === selectedStateId)?.name}
                </strong>
              </span>
              <button
                onClick={() => setSelectedStateId(null)}
                className="ml-2 px-2.5 py-0.5 rounded-full bg-amber-900/80 hover:bg-amber-800 text-[10px] text-amber-200 uppercase font-sans font-bold tracking-wider cursor-pointer transition-colors"
              >
                Reset Filter ✕
              </button>
            </div>
          )}

          {/* Subtle archival paper texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.08) 100%)`
            }}
          />

          {/* SVG Map of India with Official 36 State Boundaries */}
          <svg
            viewBox={INDIA_MAP_VIEWBOX}
            className="w-full h-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '50% 50%',
              transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <defs>
              {/* Graticule Pattern */}
              <pattern id="graticuleGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke={currentTheme.graticule}
                  strokeWidth="0.4"
                  strokeDasharray="1, 3"
                />
              </pattern>

              {/* Parchment Noise Filter */}
              <filter id="parchmentTexture" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                <feColorMatrix type="saturate" values="0.1" />
                <feBlend mode="multiply" in="SourceGraphic" result="blend" />
              </filter>

              {/* Marker Drop Shadow */}
              <filter id="markerShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.45" />
              </filter>

              {/* Diffusion Arrow Marker */}
              <marker
                id="diffusionArrow"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#D97706" />
              </marker>

              {/* Gradient for Landmass */}
              <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentTheme.stateFill} />
                <stop offset="100%" stopColor={currentTheme.stateFill} stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Background Graticule Grid */}
            <rect width="612" height="696" fill="url(#graticuleGrid)" opacity="0.65" />

            {/* Surrounding Maritime Labeling */}
            <g className="font-serif text-[9px] tracking-[0.25em] opacity-40 select-none fill-stone-500 font-semibold uppercase">
              <text x="50" y="520" transform="rotate(-30 50 520)">
                Arabian Sea (Sindhu Sagara)
              </text>
              <text x="430" y="470" transform="rotate(25 430 470)">
                Bay of Bengal (Purva Sagara)
              </text>
              <text x="210" y="685">
                Indian Ocean (Hind Mahasagar)
              </text>
              <text x="320" y="70" className="text-[10px] tracking-[0.3em] fill-stone-400">
                Himalayan Mountain Range
              </text>
            </g>

            {/* Official 36 Indian States and Union Territories */}
            <g id="indian-states" className="transition-all duration-300">
              {INDIA_STATES.map((state) => {
                const isHovered = hoveredState?.id === state.id;
                const isSelected = selectedStateId === state.id;
                const artCount = stateArtCount[state.id] || 0;

                return (
                  <path
                    key={state.id}
                    d={state.path}
                    id={`state-${state.id}`}
                    fill={
                      isSelected
                        ? currentTheme.stateSelected
                        : isHovered
                        ? currentTheme.stateHover
                        : artCount > 0
                        ? mapTheme === 'night'
                          ? '#2A3B5C'
                          : mapTheme === 'parchment'
                          ? '#EFE2CE'
                          : '#F9FAFB'
                        : currentTheme.stateFill
                    }
                    stroke={
                      isSelected
                        ? '#D97706'
                        : isHovered
                        ? '#B45309'
                        : currentTheme.stateBorder
                    }
                    strokeWidth={
                      isSelected
                        ? 2.0
                        : isHovered
                        ? 1.5
                        : currentTheme.stateBorderWidth
                    }
                    strokeLinejoin="round"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredState(state)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStateId(selectedStateId === state.id ? null : state.id);
                    }}
                  >
                    <title>{`${state.name} (${state.region} India) - Capital: ${state.capital}`}</title>
                  </path>
                );
              })}
            </g>

            {/* Major Cultural River Basins Overlaid */}
            {showRivers && (
              <g id="rivers" className="pointer-events-none">
                {MAJOR_RIVERS.map((river) => (
                  <g key={river.id}>
                    {/* River course glow */}
                    <path
                      d={river.d}
                      fill="none"
                      stroke={currentTheme.river}
                      strokeWidth="2.5"
                      strokeOpacity="0.35"
                      strokeLinecap="round"
                    />
                    {/* Core river line */}
                    <path
                      d={river.d}
                      fill="none"
                      stroke={currentTheme.river}
                      strokeWidth="1.2"
                      strokeOpacity="0.8"
                      strokeDasharray="4, 1.5"
                      strokeLinecap="round"
                    />
                    {/* River name label */}
                    <text
                      x={river.labelPoint.x}
                      y={river.labelPoint.y}
                      fill={currentTheme.river}
                      fontSize="7.5"
                      fontFamily="serif"
                      fontStyle="italic"
                      fontWeight="600"
                      opacity="0.8"
                    >
                      {river.name}
                    </text>
                  </g>
                ))}
              </g>
            )}

            {/* Cultural Diffusion Lineages (Animated Flow Arcs) */}
            {activeInfluencePaths.length > 0 && (
              <g id="influence-lineages" className="pointer-events-none">
                {activeInfluencePaths.map((path) => {
                  const src = locations.find((l) => l.id === path.sourceId);
                  const tgt = locations.find((l) => l.id === path.targetId);
                  if (!src || !tgt) return null;

                  const srcCoord = projectLatLngToSvg(src.geo.lng, src.geo.lat);
                  const tgtCoord = projectLatLngToSvg(tgt.geo.lng, tgt.geo.lat);

                  // Curve midpoint displacement
                  const dx = tgtCoord.x - srcCoord.x;
                  const dy = tgtCoord.y - srcCoord.y;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  const midX = (srcCoord.x + tgtCoord.x) / 2 - dy * 0.18;
                  const midY = (srcCoord.y + tgtCoord.y) / 2 + dx * 0.18;

                  const d = `M ${srcCoord.x} ${srcCoord.y} Q ${midX} ${midY} ${tgtCoord.x} ${tgtCoord.y}`;
                  const isHighlighted =
                    selectedLocation?.id === src.id || selectedLocation?.id === tgt.id;

                  return (
                    <g key={path.id}>
                      {/* Outer pulse glow */}
                      <path
                        d={d}
                        fill="none"
                        stroke={path.color || '#D97706'}
                        strokeWidth={isHighlighted ? 4.5 : 2.5}
                        strokeOpacity={isHighlighted ? 0.6 : 0.25}
                        strokeLinecap="round"
                      />
                      {/* Flowing animated dash line */}
                      <path
                        d={d}
                        fill="none"
                        stroke={path.color || '#D97706'}
                        strokeWidth={isHighlighted ? 2.5 : 1.6}
                        strokeDasharray="5, 6"
                        strokeLinecap="round"
                        className="animate-[dash_20s_linear_infinite]"
                      />
                      {/* Midpoint migration badge */}
                      <circle
                        cx={midX}
                        cy={midY}
                        r="3"
                        fill={path.color || '#D97706'}
                        stroke="#FFF"
                        strokeWidth="1"
                      />
                    </g>
                  );
                })}
              </g>
            )}

            {/* Historical Art Movement Center Pins */}
            <g id="art-pins">
              {locations.map((loc) => {
                const coord = projectLatLngToSvg(loc.geo.lng, loc.geo.lat);
                const isSelected = selectedLocation?.id === loc.id;
                const isHovered = hoveredLocation?.id === loc.id;
                const isVisible = activeLocationIdSet.has(loc.id);

                if (!isVisible) return null;

                return (
                  <g
                    key={loc.id}
                    transform={`translate(${coord.x}, ${coord.y})`}
                    className="cursor-pointer transition-transform duration-200"
                    onMouseEnter={() => setHoveredLocation(loc)}
                    onMouseLeave={() => setHoveredLocation(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLocation(loc);
                    }}
                  >
                    {/* Concentric pulse aura on selected */}
                    {isSelected && (
                      <>
                        <circle
                          r="18"
                          fill={loc.masterpiece.accentColor}
                          opacity="0.25"
                          className="animate-ping"
                        />
                        <circle
                          r="12"
                          fill="none"
                          stroke={loc.masterpiece.accentColor}
                          strokeWidth="1.5"
                          strokeDasharray="2, 2"
                        />
                      </>
                    )}

                    {/* Outer marker pin ring */}
                    <circle
                      r={isSelected ? 8 : isHovered ? 6.5 : 5}
                      fill={loc.masterpiece.accentColor}
                      stroke="#FFFFFF"
                      strokeWidth={isSelected ? 2.5 : 1.8}
                      filter="url(#markerShadow)"
                      className="transition-all duration-200"
                    />

                    {/* Inner gold center dot */}
                    <circle
                      r={isSelected ? 3.5 : 2}
                      fill="#FFFFFF"
                      opacity={isSelected ? 1 : 0.9}
                    />

                    {/* Persistent Text Badge */}
                    <g
                      transform={`translate(0, ${isSelected ? -14 : -10})`}
                      className="pointer-events-none"
                    >
                      <rect
                        x="-38"
                        y="-12"
                        width="76"
                        height="14"
                        rx="3"
                        fill={
                          isSelected
                            ? '#92400E'
                            : mapTheme === 'night'
                            ? 'rgba(15,23,42,0.92)'
                            : 'rgba(255,255,255,0.92)'
                        }
                        stroke={
                          isSelected
                            ? '#F59E0B'
                            : mapTheme === 'night'
                            ? 'rgba(255,255,255,0.2)'
                            : 'rgba(0,0,0,0.15)'
                        }
                        strokeWidth="0.8"
                        filter="url(#markerShadow)"
                      />
                      <text
                        x="0"
                        y="-2.5"
                        textAnchor="middle"
                        fill={
                          isSelected
                            ? '#FEF3C7'
                            : mapTheme === 'night'
                            ? '#E2E8F0'
                            : '#1C1917'
                        }
                        fontSize="7.5"
                        fontFamily="serif"
                        fontWeight={isSelected ? 'bold' : '600'}
                      >
                        {loc.name.length > 14 ? loc.name.slice(0, 13) + '…' : loc.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>

            {/* Compass Rose Cartouche */}
            <g transform="translate(540, 620)" className="pointer-events-none opacity-80">
              <circle r="22" fill={currentTheme.stateFill} stroke={currentTheme.stateBorder} strokeWidth="1" />
              <path d="M 0 -20 L 4 -4 L 20 0 L 4 4 L 0 20 L -4 4 L -20 0 L -4 -4 Z" fill="#D97706" />
              <path d="M 0 -20 L 0 0 L 20 0 Z M 0 20 L 0 0 L -20 0 Z" fill="#92400E" />
              <text x="0" y="-23" textAnchor="middle" fontSize="8" fontFamily="serif" fontWeight="bold" fill="#78350F">
                N
              </text>
              <text x="0" y="30" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#78350F">
                S
              </text>
              <text x="27" y="2.5" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#78350F">
                E
              </text>
              <text x="-27" y="2.5" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#78350F">
                W
              </text>
            </g>
          </svg>

          {/* Floating Hover Card for Art Center */}
          {hoveredLocation && (
            <div
              className="absolute pointer-events-none z-40 transition-all duration-150 animate-fade-in"
              style={{
                left: `${projectLatLngToSvg(hoveredLocation.geo.lng, hoveredLocation.geo.lat).x * (containerRef.current ? containerRef.current.clientWidth / INDIA_MAP_WIDTH : 1) + pan.x}px`,
                top: `${projectLatLngToSvg(hoveredLocation.geo.lng, hoveredLocation.geo.lat).y * (containerRef.current ? containerRef.current.clientHeight / INDIA_MAP_HEIGHT : 1) + pan.y - 120}px`,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="bg-stone-900/95 text-stone-100 rounded-xl shadow-2xl border border-amber-600/50 backdrop-blur-md w-72 text-xs font-serif overflow-hidden">
                {/* Artwork Real Image Banner */}
                <div className="relative h-24 w-full bg-stone-950 overflow-hidden">
                  <img
                    src={hoveredLocation.masterpiece.imageUrl || getMasterpieceImage(hoveredLocation.id).imageUrl}
                    alt={hoveredLocation.masterpiece.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  <span className="absolute top-2 left-2 text-[9px] font-sans font-bold tracking-wider uppercase text-amber-300 bg-stone-950/80 backdrop-blur-sm px-2 py-0.5 rounded">
                    {hoveredLocation.eraPeriod}
                  </span>
                  <span className="absolute top-2 right-2 text-[9px] text-stone-300 bg-stone-900/80 backdrop-blur-sm px-1.5 py-0.5 rounded">
                    {hoveredLocation.region} India
                  </span>
                </div>

                <div className="p-3">
                  <h4 className="text-sm font-bold text-amber-100 leading-tight">
                    {hoveredLocation.name}
                  </h4>
                  <div className="text-[11px] text-stone-300 italic mt-0.5">
                    {hoveredLocation.movementName}
                  </div>
                  <div className="mt-1 text-[11px] text-amber-200/90 font-serif">
                    ★ "{hoveredLocation.masterpiece.title}"
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-stone-800 text-[10px] text-stone-400 flex items-center justify-between">
                    <span>📍 {hoveredLocation.cityOrSite}, {hoveredLocation.state}</span>
                    <span className="text-amber-400 font-sans font-semibold">
                      Click site for details →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Floating State Info Badge (Bottom Left) */}
          <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-2 pointer-events-none">
            {hoveredState ? (
              <div className="bg-stone-950/90 backdrop-blur-md p-3.5 rounded-xl border border-amber-700/40 text-xs shadow-xl min-w-[240px] pointer-events-auto">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                    {hoveredState.region} India • Capital: {hoveredState.capital}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-bold text-[10px]">
                    {stateArtCount[hoveredState.id] || 0} Art Centers
                  </span>
                </div>
                <div className="text-sm font-serif font-bold text-white">
                  {hoveredState.name}
                </div>
                <div className="mt-1 text-[11px] text-stone-300 font-sans">
                  <strong>Living Traditions:</strong>{' '}
                  {hoveredState.artTraditions.length > 0
                    ? hoveredState.artTraditions.join(', ')
                    : 'Regional Folk & Temple Crafts'}
                </div>
              </div>
            ) : (
              <div className="bg-stone-950/80 backdrop-blur-md px-3 py-2 rounded-lg border border-stone-800 text-[11px] text-stone-400 shadow-md">
                <span className="text-amber-400 font-semibold">Survey of India Digital Projection</span> • Hover any of the 36 states or click an art pin
              </div>
            )}
          </div>

          {/* Map Zoom & Pan Control Floating Buttons (Bottom Right) */}
          <div className="absolute bottom-5 right-5 z-20 flex flex-col gap-2">
            <div className="flex flex-col bg-stone-950/90 backdrop-blur-md rounded-xl shadow-xl border border-stone-800 overflow-hidden">
              <button
                onClick={handleZoomIn}
                className="p-2.5 hover:bg-amber-900/40 text-stone-300 hover:text-amber-300 transition-colors border-b border-stone-800"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2.5 hover:bg-amber-900/40 text-stone-300 hover:text-amber-300 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleReset}
              className="p-2.5 bg-stone-950/90 backdrop-blur-md rounded-xl shadow-xl border border-stone-800 hover:bg-amber-900/40 text-stone-300 hover:text-amber-300 transition-colors"
              title="Reset India Map Projection"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Selected Location Quick Summary Strip */}
      {selectedLocation && (
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 bg-gradient-to-r from-amber-950/95 via-stone-900 to-amber-950/95 border-t border-amber-800/50 z-30">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-amber-500/40 shrink-0 shadow-md">
              <img
                src={selectedLocation.masterpiece.imageUrl || getMasterpieceImage(selectedLocation.id).imageUrl}
                alt={selectedLocation.masterpiece.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-serif font-bold text-amber-100">
                  {selectedLocation.name}
                </span>
                <span className="text-xs text-amber-300 font-mono">
                  ({selectedLocation.cityOrSite}, {selectedLocation.state})
                </span>
              </div>
              <p className="text-xs text-stone-300 font-sans mt-0.5">
                {selectedLocation.movementName} • {selectedLocation.eraPeriod} ({selectedLocation.approximateYears})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-amber-200/90 font-serif italic line-clamp-1">
                "{selectedLocation.masterpiece.title}"
              </div>
              <div className="text-[10px] text-stone-400 font-sans">
                {selectedLocation.masterpiece.artist} · {selectedLocation.masterpiece.year}
              </div>
            </div>
            <button
              onClick={() => onSelectLocation(selectedLocation)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Masterpiece & Site Dossier</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
