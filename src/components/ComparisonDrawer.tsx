import React, { useState } from 'react';
import { ArtLocation, ART_LOCATIONS } from '../data/artData';
import { ArtworkVisual } from './ArtworkVisual';
import { X, ArrowRightLeft, Check, Sparkles } from 'lucide-react';

interface ComparisonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialLocA?: ArtLocation;
  initialLocB?: ArtLocation;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  isOpen,
  onClose,
  initialLocA,
  initialLocB
}) => {
  const [locAId, setLocAId] = useState<string>(initialLocA?.id || 'thanjavur');
  const [locBId, setLocBId] = useState<string>(initialLocB?.id || 'kishangarh');

  if (!isOpen) return null;

  const locA = ART_LOCATIONS.find((l) => l.id === locAId) || ART_LOCATIONS[0];
  const locB = ART_LOCATIONS.find((l) => l.id === locBId) || ART_LOCATIONS[1];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#FAF8F5] text-stone-900 rounded-2xl shadow-2xl border border-stone-300 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-100/90 shrink-0">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-amber-900" />
            <span className="font-serif text-lg font-bold text-stone-900">
              Comparative Curatorial Analysis
            </span>
            <span className="text-xs text-stone-500 hidden sm:inline">
              · Side-by-side exploration of Indian artistic lineages
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-stone-50 border-b border-stone-200 shrink-0">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Select First Art School
            </label>
            <select
              value={locAId}
              onChange={(e) => setLocAId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 font-serif"
            >
              {ART_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id} disabled={loc.id === locBId}>
                  {loc.name} ({loc.state}) – {loc.movementName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Select Second Art School
            </label>
            <select
              value={locBId}
              onChange={(e) => setLocBId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 font-serif"
            >
              {ART_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id} disabled={loc.id === locAId}>
                  {loc.name} ({loc.state}) – {loc.movementName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-200">
            {/* School A */}
            <div className="space-y-6 md:pr-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold font-sans">
                  {locA.state} · {locA.eraPeriod}
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                  {locA.movementName}
                </h3>
                <p className="text-xs text-stone-500 font-serif italic mt-0.5">
                  Origin: {locA.name}, {locA.cityOrSite}
                </p>
              </div>

              <div className="max-w-sm">
                <ArtworkVisual location={locA} detailed={false} />
              </div>

              {/* Attributes */}
              <div className="space-y-4 text-xs">
                <div className="p-3.5 bg-stone-100/70 rounded-xl border border-stone-200">
                  <span className="font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Patronage & Dynasty
                  </span>
                  <p className="text-sm font-medium text-stone-900">{locA.patronage}</p>
                </div>

                <div className="p-3.5 bg-stone-100/70 rounded-xl border border-stone-200">
                  <span className="font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Primary Medium & Support
                  </span>
                  <p className="text-sm font-medium text-stone-900">{locA.masterpiece.medium}</p>
                </div>

                <div className="p-3.5 bg-stone-100/70 rounded-xl border border-stone-200">
                  <span className="font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Key Stylistic Motifs
                  </span>
                  <ul className="space-y-1 mt-1">
                    {locA.stylisticHallmarks.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-stone-700">
                        <span className="w-1 h-1 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200">
                  <span className="font-semibold text-amber-900 uppercase tracking-wider block mb-1">
                    Geographic Spread & Legacy
                  </span>
                  <p className="text-stone-800 leading-relaxed">{locA.geographicDiffusion}</p>
                </div>
              </div>
            </div>

            {/* School B */}
            <div className="space-y-6 pt-6 md:pt-0 md:pl-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold font-sans">
                  {locB.state} · {locB.eraPeriod}
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                  {locB.movementName}
                </h3>
                <p className="text-xs text-stone-500 font-serif italic mt-0.5">
                  Origin: {locB.name}, {locB.cityOrSite}
                </p>
              </div>

              <div className="max-w-sm">
                <ArtworkVisual location={locB} detailed={false} />
              </div>

              {/* Attributes */}
              <div className="space-y-4 text-xs">
                <div className="p-3.5 bg-stone-100/70 rounded-xl border border-stone-200">
                  <span className="font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Patronage & Dynasty
                  </span>
                  <p className="text-sm font-medium text-stone-900">{locB.patronage}</p>
                </div>

                <div className="p-3.5 bg-stone-100/70 rounded-xl border border-stone-200">
                  <span className="font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Primary Medium & Support
                  </span>
                  <p className="text-sm font-medium text-stone-900">{locB.masterpiece.medium}</p>
                </div>

                <div className="p-3.5 bg-stone-100/70 rounded-xl border border-stone-200">
                  <span className="font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Key Stylistic Motifs
                  </span>
                  <ul className="space-y-1 mt-1">
                    {locB.stylisticHallmarks.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-stone-700">
                        <span className="w-1 h-1 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200">
                  <span className="font-semibold text-amber-900 uppercase tracking-wider block mb-1">
                    Geographic Spread & Legacy
                  </span>
                  <p className="text-stone-800 leading-relaxed">{locB.geographicDiffusion}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            Done Comparing
          </button>
        </div>
      </div>
    </div>
  );
};
