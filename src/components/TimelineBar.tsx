import React from 'react';

export type EraFilter = 'all' | 'prehistoric' | 'ancient' | 'medieval' | 'miniatures' | 'folk' | 'modern';

interface TimelineBarProps {
  selectedEra: EraFilter;
  onSelectEra: (era: EraFilter) => void;
  countsByEra: Record<EraFilter, number>;
}

export const TimelineBar: React.FC<TimelineBarProps> = ({
  selectedEra,
  onSelectEra,
  countsByEra
}) => {
  const eras: { id: EraFilter; label: string; period: string; subtitle: string }[] = [
    { id: 'all', label: 'All Periods', period: 'Pan-Indian', subtitle: 'All 18 Traditions' },
    { id: 'prehistoric', label: 'Prehistoric', period: '10,000 – 2500 BCE', subtitle: 'Rock Art & Petroglyphs' },
    { id: 'ancient', label: 'Classical / Ancient', period: '2nd c. BCE – 6th c. CE', subtitle: 'Rock-cut Buddhist Caves' },
    { id: 'medieval', label: 'Medieval Temples', period: '7th – 16th c. CE', subtitle: 'Ceiling Frescoes & Relief' },
    { id: 'miniatures', label: 'Court Miniatures', period: '16th – 18th c. CE', subtitle: 'Mughal, Rajput & Pahari' },
    { id: 'folk', label: 'Living Folk Traditions', period: 'Antiquity to Present', subtitle: 'Ritual Wall, Scrolls & Palm' },
    { id: 'modern', label: 'Modernist Awakening', period: '1900 – 1970s CE', subtitle: 'Bengal, PAG & Madras' }
  ];

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border border-stone-200 rounded-2xl p-3 shadow-sm">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-200/80 px-2">
        <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
          CHRONOLOGICAL SCRUBBER & HISTORICAL ERAS
        </span>
        <span className="text-xs text-stone-500 font-mono">
          Showing {countsByEra[selectedEra]} Historic Centers
        </span>
      </div>

      {/* Horizontal Scrollable Era Rail */}
      <div className="flex items-stretch gap-2 overflow-x-auto pb-1 no-scrollbar">
        {eras.map((era) => {
          const isActive = selectedEra === era.id;
          return (
            <button
              key={era.id}
              onClick={() => onSelectEra(era.id)}
              className={`flex-1 min-w-[150px] p-2.5 rounded-xl text-left transition-all border shrink-0 ${
                isActive
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md ring-1 ring-amber-600/30'
                  : 'bg-stone-50/70 hover:bg-stone-100/90 text-stone-800 border-stone-200/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold ${isActive ? 'text-amber-300' : 'text-stone-900'}`}>
                  {era.label}
                </span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-stone-800 text-stone-300' : 'bg-stone-200/80 text-stone-600'
                  }`}
                >
                  {countsByEra[era.id]}
                </span>
              </div>
              <p className={`text-[11px] font-mono mt-1 ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>
                {era.period}
              </p>
              <p className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-stone-400' : 'text-stone-500'}`}>
                {era.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
