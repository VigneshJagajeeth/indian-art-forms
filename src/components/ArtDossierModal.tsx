import React, { useState, useEffect } from 'react';
import { ArtLocation, ART_LOCATIONS } from '../data/artData';
import { ArtworkVisual } from './ArtworkVisual';
import {
  X,
  Volume2,
  VolumeX,
  MapPin,
  Sparkles,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Share2,
  Check,
  Palette,
  Compass,
  Award
} from 'lucide-react';

interface ArtDossierModalProps {
  location: ArtLocation | null;
  onClose: () => void;
  onSelectConnectedLocation: (loc: ArtLocation) => void;
}

export const ArtDossierModal: React.FC<ArtDossierModalProps> = ({
  location,
  onClose,
  onSelectConnectedLocation
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'technique' | 'diffusion' | 'artists'>('overview');

  // Handle Web Speech API for curatorial narration
  useEffect(() => {
    if (!isPlayingAudio) {
      window.speechSynthesis?.cancel();
      return;
    }

    if (location && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(location.curatorialAudioScript);
      utterance.rate = 0.95; // gentle, measured curatorial cadence
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, [isPlayingAudio, location]);

  // Reset audio state when location changes or closes
  useEffect(() => {
    setIsPlayingAudio(false);
    window.speechSynthesis?.cancel();
  }, [location]);

  if (!location) return null;

  const connectedLocations = ART_LOCATIONS.filter((l) =>
    location.connectedLocationIds.includes(l.id)
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF8F5] text-stone-900 rounded-2xl shadow-2xl border border-stone-300 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Curatorial Header Ribbon */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-stone-200 bg-stone-100/90 shrink-0">
          <div className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-stone-600">
            <span className="font-semibold text-amber-900">ARCHIVE CATALOGUE</span>
            <span aria-hidden="true">·</span>
            <span>INDIAN ART HISTORICAL RECORD</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-stone-500">LOC. #{location.id.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 rounded-lg transition-colors"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 rounded-lg transition-colors"
              title="Close Catalogue"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Main Title Block */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 mb-2 font-medium">
              <span className="text-amber-800 font-semibold">{location.state}</span>
              <span aria-hidden="true">·</span>
              <span>{location.cityOrSite}</span>
              <span aria-hidden="true">·</span>
              <span>{location.eraPeriod} ({location.approximateYears})</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
              {location.movementName}
            </h2>
            <p className="text-base text-stone-600 font-serif italic mt-1">
              Historic Epicenter: {location.name}, {location.state}
            </p>
          </div>

          {/* Visual Masterpiece Showcase with Color Palette */}
          <div>
            <ArtworkVisual location={location} detailed={true} />
          </div>

          {/* Audio Guide Ribbon */}
          <div className="flex items-center justify-between p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all shadow-sm ${
                  isPlayingAudio
                    ? 'bg-amber-800 text-white animate-pulse'
                    : 'bg-white text-stone-800 hover:bg-amber-100 border border-amber-300'
                }`}
                title={isPlayingAudio ? 'Stop Narration' : 'Play Curatorial Narration'}
              >
                {isPlayingAudio ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <div>
                <p className="text-xs font-semibold text-stone-900 uppercase tracking-wide">
                  Curatorial Audio Guide
                </p>
                <p className="text-xs text-stone-600 font-serif italic">
                  {isPlayingAudio ? 'Playing expert narration...' : 'Listen to 60-second audio commentary'}
                </p>
              </div>
            </div>

            {isPlayingAudio && (
              <div className="flex items-center gap-1">
                {[12, 24, 18, 28, 16, 22, 14, 26].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-amber-700 rounded-full animate-bounce"
                    style={{
                      height: `${h}px`,
                      animationDelay: `${i * 120}ms`
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Tabbed Navigation Bar */}
          <div className="flex items-center gap-1 border-b border-stone-200 pb-2">
            {[
              { id: 'overview', label: 'Historical Context' },
              { id: 'diffusion', label: 'Geographic Diffusion' },
              { id: 'technique', label: 'Techniques & Pigments' },
              { id: 'artists', label: 'Master Lineages' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Historical Context & Curatorial Essay */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="prose max-w-prose text-stone-800 text-base leading-relaxed">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-900">
                  {location.historicalContext}
                </p>
              </div>

              {/* Stylistic Hallmarks Card */}
              <div className="p-5 bg-stone-100 rounded-xl border border-stone-200">
                <h4 className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3">
                  Visual & Stylistic Hallmarks
                </h4>
                <ul className="space-y-2">
                  {location.stylisticHallmarks.map((mark, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-stone-700 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-2 shrink-0" />
                      <span>{mark}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accession Definition List */}
              <div className="p-5 bg-stone-50 rounded-xl border border-stone-200">
                <h4 className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3">
                  Accession Metadata & Provenance
                </h4>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
                  <div>
                    <dt className="text-stone-500">Patronage & Dynasty</dt>
                    <dd className="font-medium text-stone-900 mt-0.5">{location.patronage}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Art Form Category</dt>
                    <dd className="font-medium text-stone-900 mt-0.5">{location.artCategory}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Masterpiece Title</dt>
                    <dd className="font-medium text-stone-900 mt-0.5">{location.masterpiece.title}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Permanent Repository</dt>
                    <dd className="font-medium text-stone-900 mt-0.5">{location.masterpiece.collection}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Medium & Dimensions</dt>
                    <dd className="font-medium text-stone-900 mt-0.5">
                      {location.masterpiece.medium} {location.masterpiece.dimensions ? `(${location.masterpiece.dimensions})` : ''}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-stone-500">Historic Geographic Center</dt>
                    <dd className="font-medium text-stone-900 mt-0.5">
                      {location.cityOrSite}, {location.state} ({location.region} India)
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {/* Tab 2: Geographic Diffusion (Core CO1 Requirement!) */}
          {activeTab === 'diffusion' && (
            <div className="space-y-6">
              <div className="p-5 bg-amber-50/60 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Compass className="w-4 h-4 text-amber-700" />
                  <span>Geographic Spread & Cultural Diffusion (CO1 Objective)</span>
                </div>
                <p className="text-stone-800 text-sm leading-relaxed">
                  {location.geographicDiffusion}
                </p>
              </div>

              {/* Interconnected Traditions */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3">
                  Interconnected Schools & Artistic Successors
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {connectedLocations.map((conn) => (
                    <button
                      key={conn.id}
                      onClick={() => {
                        onSelectConnectedLocation(conn);
                      }}
                      className="p-3.5 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 text-left transition-all group flex items-start justify-between"
                    >
                      <div>
                        <span className="text-[11px] font-mono text-amber-800">{conn.state}</span>
                        <h5 className="text-sm font-serif font-semibold text-stone-900 group-hover:text-amber-900 transition-colors">
                          {conn.name}
                        </h5>
                        <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">{conn.movementName}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-800 group-hover:translate-x-1 transition-all mt-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Materials & Pigment Recipes */}
          {activeTab === 'technique' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3">
                  Organic & Mineral Pigments
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {location.masterpiece.colorPalette.map((col, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200"
                    >
                      <span
                        className="w-8 h-8 rounded-lg shrink-0 border border-stone-300 shadow-sm"
                        style={{ backgroundColor: col.hex }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-stone-900">{col.name}</p>
                        <p className="text-xs text-stone-500">Extracted from: {col.source}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-stone-100 rounded-xl border border-stone-200">
                <h4 className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3">
                  Traditional Fabrication & Preparation Process
                </h4>
                <ul className="space-y-2">
                  {location.materialsAndTechniques.map((tech, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-stone-700 leading-snug">
                      <span className="font-mono text-xs text-amber-800 font-semibold mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: Master Artists */}
          {activeTab === 'artists' && (
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                Legendary Master Artists & Guilds
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {location.keyArtists.map((artist, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-900/10 text-amber-900 font-serif font-bold flex items-center justify-center shrink-0">
                      {artist.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{artist}</p>
                      <p className="text-xs text-stone-500">{location.movementName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-stone-500">
            Coordinates: {location.geo.lat.toFixed(4)}° N, {location.geo.lng.toFixed(4)}° E
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            Close Catalogue
          </button>
        </div>
      </div>
    </div>
  );
};
