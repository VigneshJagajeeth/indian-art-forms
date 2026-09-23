import React from 'react';
import { ArrowRightLeft, Route, MapPin } from 'lucide-react';

interface NavbarProps {
  onOpenCompare: () => void;
  onScrollToMap: () => void;
  onScrollToTimeline: () => void;
  onToggleInfluence: () => void;
  showInfluenceLines: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCompare,
  onScrollToMap,
  onScrollToTimeline,
  onToggleInfluence,
  showInfluenceLines
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl font-serif font-bold tracking-tight text-stone-900 hover:text-amber-900 transition-colors"
        >
          ChitraKala
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={onScrollToMap}
            className="hover:text-stone-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Digital Map
          </button>

          <button
            onClick={onScrollToTimeline}
            className="hover:text-stone-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            Chronology
          </button>

          <button
            onClick={onToggleInfluence}
            className={`transition-colors whitespace-nowrap cursor-pointer ${
              showInfluenceLines ? 'text-amber-900 font-semibold' : 'hover:text-stone-900'
            }`}
          >
            Geographic Lineages
          </button>
        </nav>

        {/* Zone 3: Actions removed */}
      </div>
    </header>
  );
};
