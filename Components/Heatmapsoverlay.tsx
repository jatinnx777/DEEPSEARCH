
import React from 'react';
import { AnomalyLocation } from '../types';

interface Props {
  locations: AnomalyLocation[];
}

export const HeatmapOverlay: React.FC<Props> = ({ locations }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <radialGradient id="paperAnomalyGradient">
            <stop offset="0%" stopColor="rgba(120, 113, 108, 0.25)" />
            <stop offset="100%" stopColor="rgba(120, 113, 108, 0)" />
          </radialGradient>
        </defs>
        {locations.map((loc, i) => (
          <g key={i}>
            <rect
              x={loc.x}
              y={loc.y}
              width={loc.width}
              height={loc.height}
              fill="url(#paperAnomalyGradient)"
              className="animate-pulse"
              stroke="rgba(120, 113, 108, 0.4)"
              strokeWidth="0.4"
              strokeDasharray="2 2"
            />
          </g>
        ))}
      </svg>
      <div className="absolute inset-0">
         {locations.map((loc, i) => (
            <div 
              key={`label-${i}`}
              className="absolute text-[8px] font-bold text-stone-500 bg-white/95 px-2 py-0.5 border border-stone-200 uppercase tracking-tighter whitespace-nowrap shadow-sm backdrop-blur-[2px]"
              style={{ 
                left: `${loc.x}%`, 
                top: `${loc.y}%`,
                transform: 'translateY(-120%)'
              }}
            >
              <span className="opacity-50 mr-1">Loc:</span>
              {loc.description}
            </div>
         ))}
      </div>
    </div>
  );
};
