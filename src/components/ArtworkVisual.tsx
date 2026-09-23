import React, { useState } from 'react';
import { ArtLocation } from '../data/artData';
import { getMasterpieceImage } from '../data/artImages';
import { Eye, ZoomIn, ShieldCheck, Sparkles, BookOpen, Image as ImageIcon } from 'lucide-react';

interface ArtworkVisualProps {
  location: ArtLocation;
  detailed?: boolean;
  onOpenInspect?: () => void;
}

export const ArtworkVisual: React.FC<ArtworkVisualProps> = ({
  location,
  detailed = false,
  onOpenInspect
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [viewMode, setViewMode] = useState<'photo' | 'vector'>('photo');
  const { masterpiece } = location;
  const imageInfo = getMasterpieceImage(location.id);
  const displayImageUrl = masterpiece.imageUrl || imageInfo.imageUrl;

  // Render authentic domain-specific visual illustrations capturing the core motifs and palette
  const renderVisualContent = () => {
    switch (location.id) {
      case 'ajanta':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover select-none">
            <defs>
              <radialGradient id="ajantaRock" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#4A3425" />
                <stop offset="70%" stopColor="#2E1F15" />
                <stop offset="100%" stopColor="#1A120B" />
              </radialGradient>
              <linearGradient id="ajantaAura" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A85A32" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2A4B7C" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Rock Cave Texture */}
            <rect width="400" height="300" fill="url(#ajantaRock)" />
            <circle cx="200" cy="140" r="110" fill="url(#ajantaAura)" />
            
            {/* Halo of Bodhisattva */}
            <circle cx="200" cy="115" r="70" fill="#A85A32" fillOpacity="0.3" stroke="#DDA15E" strokeWidth="1.5" strokeDasharray="3 3" />
            
            {/* Bodhisattva Padmapani Figure Silhouette & Lineament */}
            <path
              d="M175,70 Q200,55 225,70 Q235,90 228,125 Q220,155 230,195 Q235,225 240,260 L160,260 Q168,220 172,185 Q165,150 172,115 Z"
              fill="#D69F6B"
              fillOpacity="0.75"
            />
            {/* Crown (Mukuta) */}
            <path
              d="M180,68 L200,32 L220,68 Q200,75 180,68 Z"
              fill="#D4AF37"
              stroke="#FFF"
              strokeWidth="1"
            />
            <circle cx="200" cy="42" r="4" fill="#2A4B7C" />
            <circle cx="190" cy="55" r="3" fill="#A85A32" />
            <circle cx="210" cy="55" r="3" fill="#A85A32" />

            {/* Downward lotus eyes */}
            <path d="M188,95 Q195,100 200,96" stroke="#2E1F15" strokeWidth="2" fill="none" />
            <path d="M206,96 Q211,100 218,95" stroke="#2E1F15" strokeWidth="2" fill="none" />
            {/* Compassionate lips */}
            <path d="M198,110 Q203,114 208,110" stroke="#9E2A2B" strokeWidth="2" fill="none" />
            
            {/* Hand holding Blue Lotus (Utpala) */}
            <path d="M225,160 Q250,150 260,135 Q265,130 255,145" stroke="#D69F6B" strokeWidth="5" strokeLinecap="round" />
            {/* The Blue Lotus */}
            <g transform="translate(255, 120)">
              <ellipse cx="0" cy="0" rx="14" ry="8" fill="#2A4B7C" opacity="0.9" />
              <path d="M-10,-5 Q0,-22 10,-5 Q0,-8 -10,-5 Z" fill="#4361EE" />
              <path d="M-16,0 Q-2, -18 8, 2 Z" fill="#3F37C9" />
              <circle cx="0" cy="-2" r="3" fill="#D4AF37" />
              {/* Petals */}
              <circle cx="-6" cy="6" r="2" fill="#FAF9F6" />
              <circle cx="6" cy="6" r="2" fill="#FAF9F6" />
            </g>

            {/* Pearl necklace (Yajnopavita) */}
            <path d="M185,125 Q205,160 218,175 Q210,185 190,135" stroke="#FAF9F6" strokeWidth="2" strokeDasharray="3 2" fill="none" />
            {/* Rock Cracks & Antique Patina */}
            <path d="M40,20 L70,80 L60,150 L85,220" stroke="#3A2619" strokeWidth="1.5" fill="none" opacity="0.7" />
            <path d="M330,40 L310,110 L340,190" stroke="#3A2619" strokeWidth="1.5" fill="none" opacity="0.7" />
          </svg>
        );

      case 'madhubani':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover select-none">
            <rect width="400" height="300" fill="#F4EBD9" />
            {/* Intricate Geometric Double Border */}
            <rect x="12" y="12" width="376" height="276" fill="none" stroke="#1C1917" strokeWidth="3" />
            <rect x="20" y="20" width="360" height="260" fill="none" stroke="#C84B31" strokeWidth="2" strokeDasharray="4 2" />
            <rect x="26" y="26" width="348" height="248" fill="none" stroke="#1C1917" strokeWidth="1.5" />
            
            {/* Sacred Tree of Life (Kalpavriksha) */}
            <path d="M200,240 L200,100 M200,180 Q160,150 140,110 M200,150 Q240,130 260,95 M200,120 Q170,90 150,60 M200,100 Q230,70 250,50" stroke="#1C1917" strokeWidth="3" fill="none" />
            
            {/* Leaves and Flowers with cross-hatching */}
            {[
              { cx: 140, cy: 110, c: '#E09F3E' },
              { cx: 260, cy: 95, c: '#C84B31' },
              { cx: 150, cy: 60, c: '#264653' },
              { cx: 250, cy: 50, c: '#2A9D8F' },
              { cx: 200, cy: 45, c: '#E09F3E' },
              { cx: 110, cy: 150, c: '#C84B31' },
              { cx: 290, cy: 140, c: '#E09F3E' }
            ].map((f, i) => (
              <g key={i}>
                <circle cx={f.cx} cy={f.cy} r="16" fill={f.c} stroke="#1C1917" strokeWidth="2" />
                <circle cx={f.cx} cy={f.cy} r="8" fill="#F4EBD9" stroke="#1C1917" strokeWidth="1" />
                <line x1={f.cx - 16} y1={f.cy} x2={f.cx + 16} y2={f.cy} stroke="#1C1917" strokeWidth="1" />
                <line x1={f.cx} y1={f.cy - 16} x2={f.cx} y2={f.cy + 16} stroke="#1C1917" strokeWidth="1" />
              </g>
            ))}

            {/* Sacred Twin Fish (Fertility & Auspiciousness) */}
            <g transform="translate(130, 210)">
              <ellipse cx="0" cy="0" rx="36" ry="16" fill="#2A9D8F" stroke="#1C1917" strokeWidth="2" />
              <path d="M-36,0 L-50,-10 L-50,10 Z" fill="#C84B31" stroke="#1C1917" strokeWidth="1.5" />
              <circle cx="20" cy="-4" r="3" fill="#1C1917" />
              <path d="M-10,-12 Q0,0 -10,12 M5,-14 Q15,0 5,14 M-25,-8 Q-15,0 -25,8" stroke="#1C1917" strokeWidth="1.5" fill="none" />
            </g>
            <g transform="translate(270, 210) scale(-1, 1)">
              <ellipse cx="0" cy="0" rx="36" ry="16" fill="#E09F3E" stroke="#1C1917" strokeWidth="2" />
              <path d="M-36,0 L-50,-10 L-50,10 Z" fill="#264653" stroke="#1C1917" strokeWidth="1.5" />
              <circle cx="20" cy="-4" r="3" fill="#1C1917" />
              <path d="M-10,-12 Q0,0 -10,12 M5,-14 Q15,0 5,14 M-25,-8 Q-15,0 -25,8" stroke="#1C1917" strokeWidth="1.5" fill="none" />
            </g>

            {/* Dancing Peacock with elaborate tail */}
            <g transform="translate(70, 80)">
              <path d="M0,0 Q20,-20 30,-5 Q20,20 0,0 Z" fill="#264653" stroke="#1C1917" strokeWidth="1.5" />
              <circle cx="5" cy="-8" r="4" fill="#C84B31" />
              <path d="M30,-5 Q50,-30 65,-10 Q40,10 30,-5" fill="#E09F3E" stroke="#1C1917" strokeWidth="1.5" />
            </g>

            {/* Sun with auspicious rays */}
            <g transform="translate(330, 65)">
              <circle cx="0" cy="0" r="16" fill="#C84B31" stroke="#1C1917" strokeWidth="2" />
              <circle cx="0" cy="0" r="8" fill="#E09F3E" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, idx) => (
                <line
                  key={idx}
                  x1={Math.cos((ang * Math.PI) / 180) * 18}
                  y1={Math.sin((ang * Math.PI) / 180) * 18}
                  x2={Math.cos((ang * Math.PI) / 180) * 26}
                  y2={Math.sin((ang * Math.PI) / 180) * 26}
                  stroke="#1C1917"
                  strokeWidth="2"
                />
              ))}
            </g>
          </svg>
        );

      case 'thanjavur':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover select-none">
            <defs>
              <linearGradient id="tanjoreGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF275" />
                <stop offset="30%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#AA7A1E" />
                <stop offset="100%" stopColor="#5E430D" />
              </linearGradient>
              <radialGradient id="tanjoreBackdrop" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#780016" />
                <stop offset="100%" stopColor="#37000B" />
              </radialGradient>
            </defs>
            {/* Deep Crimson Velvet Backdrop */}
            <rect width="400" height="300" fill="url(#tanjoreBackdrop)" />
            
            {/* Carved Teak Frame border */}
            <rect x="8" y="8" width="384" height="284" fill="none" stroke="#5E3023" strokeWidth="12" />
            <rect x="14" y="14" width="372" height="272" fill="none" stroke="#D4AF37" strokeWidth="3" />

            {/* Embossed Prabhavali Arch (Gold Relief) */}
            <path
              d="M70,270 L70,120 Q70,40 200,40 Q330,40 330,120 L330,270"
              fill="none"
              stroke="url(#tanjoreGoldGrad)"
              strokeWidth="22"
              strokeLinecap="round"
            />
            {/* Embedded Gems on Arch */}
            {[90, 120, 150, 180, 200, 220, 250, 280, 310].map((x, idx) => (
              <g key={idx} transform={`translate(${x}, ${x === 200 ? 40 : 40 + Math.abs(200 - x) * 0.5})`}>
                <circle cx="0" cy="0" r="5" fill={idx % 2 === 0 ? '#C1121F' : '#1B4332'} stroke="#FFF" strokeWidth="1" />
              </g>
            ))}

            {/* Draped Ornate Silk Swags */}
            <path d="M70,100 Q140,130 200,105 Q260,130 330,100" fill="none" stroke="url(#tanjoreGoldGrad)" strokeWidth="8" />

            {/* Navaneetha Krishna (Baby Krishna) */}
            {/* Halo */}
            <circle cx="200" cy="145" r="48" fill="url(#tanjoreGoldGrad)" stroke="#C1121F" strokeWidth="2" />
            
            {/* Golden Mukuta (Crown) */}
            <path d="M185,115 L200,75 L215,115 Z" fill="url(#tanjoreGoldGrad)" stroke="#895737" strokeWidth="1.5" />
            <circle cx="200" cy="72" r="5" fill="#2A9D8F" />
            <path d="M200,70 Q215,55 220,62 Q215,70 200,70" fill="#264653" stroke="#2A9D8F" strokeWidth="1" />

            {/* Radiant Baby Krishna Face */}
            <circle cx="200" cy="140" r="28" fill="#F4EBD9" stroke="#AA7A1E" strokeWidth="1" />
            {/* Large Tilak */}
            <path d="M198,122 L202,122 L202,132 L198,132 Z" fill="#C1121F" />
            <circle cx="200" cy="134" r="2" fill="#FFB703" />
            {/* Almond Eyes & Benevolent Smile */}
            <path d="M188,136 Q193,139 196,136" stroke="#1C1917" strokeWidth="2" fill="none" />
            <path d="M204,136 Q207,139 212,136" stroke="#1C1917" strokeWidth="2" fill="none" />
            <path d="M196,150 Q200,154 204,150" stroke="#C1121F" strokeWidth="2" fill="none" />

            {/* Embossed Pearl & Gold Choker */}
            <path d="M185,160 Q200,172 215,160" stroke="url(#tanjoreGoldGrad)" strokeWidth="6" fill="none" />

            {/* Chubby Infant Torso & Butter Pot */}
            <circle cx="200" cy="205" r="38" fill="#F4EBD9" stroke="#AA7A1E" strokeWidth="1" />
            {/* Golden Butter Pot (Vennei Kundam) */}
            <ellipse cx="230" cy="215" rx="20" ry="16" fill="url(#tanjoreGoldGrad)" stroke="#5E430D" strokeWidth="2" />
            {/* Fresh White Butter */}
            <circle cx="230" cy="205" r="10" fill="#FFF" />
            <circle cx="215" cy="195" r="5" fill="#FFF" />
          </svg>
        );

      case 'kishangarh':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover select-none">
            {/* Twilight Lake Landscape Backdrop */}
            <defs>
              <linearGradient id="kishanSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E3246" />
                <stop offset="50%" stopColor="#3C5A69" />
                <stop offset="100%" stopColor="#D98A6C" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#kishanSky)" />
            
            {/* Lake Gundolav at Kishangarh with ripples & lotuses */}
            <rect x="0" y="220" width="400" height="80" fill="#1A2D3C" />
            <ellipse cx="80" cy="245" rx="14" ry="4" fill="#E76F51" />
            <ellipse cx="280" cy="255" rx="18" ry="5" fill="#E76F51" />
            <ellipse cx="180" cy="270" rx="15" ry="4" fill="#F4A261" />

            {/* Bani Thani Distinctive Profile */}
            {/* Soft Radiant Complexion */}
            <path
              d="M170,90 Q180,60 210,60 Q240,60 245,95 Q250,110 235,130 Q225,145 228,170 Q235,210 250,260 L140,260 Q150,200 160,150 Q165,110 170,90 Z"
              fill="#F9E8D9"
            />
            {/* Iconic Sharp Pointed Chin & Jaw */}
            <path d="M225,145 L228,158 L218,162" stroke="#AA7A1E" strokeWidth="1.5" fill="none" />

            {/* Jet Black Hair with Serpentine Curl escaping cheek */}
            <path
              d="M175,80 Q195,68 215,85 Q225,95 210,115 Q195,120 185,145 Q175,170 170,220 L150,240 Z"
              fill="#12130F"
            />
            {/* The Famous Delicate Serpentine Curl */}
            <path d="M210,105 Q220,115 216,130 Q212,140 218,145" stroke="#12130F" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Bani Thani Elongated Arched Lotus Eye (Padma-Netra) */}
            <path d="M215,108 Q232,100 246,112 Q230,118 215,108 Z" fill="#FFF" stroke="#12130F" strokeWidth="1.5" />
            <circle cx="232" cy="110" r="4" fill="#12130F" />
            {/* Sharply arched high eyebrow */}
            <path d="M210,98 Q230,85 248,104" stroke="#12130F" strokeWidth="2" fill="none" />
            
            {/* Delicate Aquiline Nose & Gold Nath (Nose Ring) */}
            <path d="M236,108 L244,124 L237,128" stroke="#DDA15E" strokeWidth="1.5" fill="none" />
            <circle cx="242" cy="126" r="8" fill="none" stroke="#D4AF37" strokeWidth="2" />
            <circle cx="248" cy="132" r="3" fill="#C1121F" />
            <circle cx="242" cy="134" r="2.5" fill="#FAF9F6" />

            {/* Lips touched with betel leaf vermilion */}
            <path d="M232,138 Q238,137 242,140 Q236,143 232,138 Z" fill="#BA181B" />

            {/* Hand holding two unopened lotus buds */}
            <g transform="translate(195, 180)">
              <path d="M0,0 Q15,-20 20,-40" stroke="#F9E8D9" strokeWidth="5" strokeLinecap="round" />
              {/* Lotus Buds */}
              <ellipse cx="20" cy="-45" rx="6" ry="12" fill="#E76F51" stroke="#BA181B" strokeWidth="1" />
              <ellipse cx="30" cy="-35" rx="5" ry="10" fill="#F4A261" stroke="#BA181B" strokeWidth="1" />
            </g>

            {/* Gossamer Odhani (Transparent Golden Veil) */}
            <path
              d="M170,75 Q210,50 250,85 Q265,130 260,190 Q255,240 270,260 L140,260 Z"
              fill="#D4AF37"
              fillOpacity="0.35"
              stroke="#D4AF37"
              strokeWidth="2"
            />
            {/* Gold zari border on the veil */}
            <path d="M170,75 Q210,50 250,85 Q265,130 260,190 Q255,240 270,260" stroke="#FFD166" strokeWidth="3.5" strokeDasharray="6 3" fill="none" />
          </svg>
        );

      case 'warli':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover select-none">
            {/* Earthen Geru Red Wall */}
            <rect width="400" height="300" fill="#78350F" />
            {/* Texture flecks */}
            <rect width="400" height="300" fill="#6B2D1B" opacity="0.4" />
            
            {/* The Sacred Chauk Square in Center */}
            <rect x="150" y="100" width="100" height="100" fill="none" stroke="#FAF9F6" strokeWidth="3" />
            <rect x="156" y="106" width="88" height="88" fill="none" stroke="#FAF9F6" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Goddess Palghat Mother in Center of Chauk */}
            <g transform="translate(200, 145)">
              <circle cx="0" cy="-18" r="6" fill="#FAF9F6" />
              {/* Inverted Triangles Body */}
              <polygon points="0,-12 -12,0 12,0" fill="#FAF9F6" />
              <polygon points="0,12 -12,0 12,0" fill="#FAF9F6" />
              <line x1="-12" y1="-4" x2="-20" y2="-12" stroke="#FAF9F6" strokeWidth="2" />
              <line x1="12" y1="-4" x2="20" y2="-12" stroke="#FAF9F6" strokeWidth="2" />
              <line x1="-8" y1="12" x2="-14" y2="24" stroke="#FAF9F6" strokeWidth="2" />
              <line x1="8" y1="12" x2="14" y2="24" stroke="#FAF9F6" strokeWidth="2" />
            </g>

            {/* The Swirling Tarpa Dance around Musician */}
            {/* Central Tarpa Musician */}
            <g transform="translate(80, 160)">
              <circle cx="0" cy="-14" r="5" fill="#FAF9F6" />
              <polygon points="0,-8 -8,2 8,2" fill="#FAF9F6" />
              <polygon points="0,12 -8,2 8,2" fill="#FAF9F6" />
              {/* The Long Tarpa Wind Horn */}
              <path d="M4,-4 Q25,-15 45,-25" stroke="#FAF9F6" strokeWidth="3" fill="none" />
              <polygon points="45,-28 47,-22 55,-25" fill="#FAF9F6" />
            </g>

            {/* Spiraling Circle of Dancers */}
            {[
              { x: 30, y: 70 },
              { x: 65, y: 50 },
              { x: 105, y: 45 },
              { x: 145, y: 55 },
              { x: 175, y: 35 },
              { x: 215, y: 35 },
              { x: 255, y: 45 },
              { x: 295, y: 65 },
              { x: 325, y: 95 },
              { x: 340, y: 135 },
              { x: 335, y: 175 },
              { x: 315, y: 215 },
              { x: 280, y: 245 },
              { x: 240, y: 260 },
              { x: 195, y: 265 },
              { x: 150, y: 255 },
              { x: 110, y: 240 },
              { x: 75, y: 220 },
              { x: 45, y: 185 },
              { x: 35, y: 135 }
            ].map((d, i) => (
              <g key={i} transform={`translate(${d.x}, ${d.y}) scale(0.85)`}>
                <circle cx="0" cy="-12" r="4.5" fill="#FAF9F6" />
                <polygon points="0,-7 -7,1 7,1" fill="#FAF9F6" />
                <polygon points="0,9 -7,1 7,1" fill="#FAF9F6" />
                {/* Hand linked to next dancer */}
                <line x1="-7" y1="-2" x2="-14" y2="4" stroke="#FAF9F6" strokeWidth="1.5" />
                <line x1="7" y1="-2" x2="14" y2="4" stroke="#FAF9F6" strokeWidth="1.5" />
                {/* Dancing legs */}
                <line x1="-4" y1="9" x2="-8" y2="19" stroke="#FAF9F6" strokeWidth="1.5" />
                <line x1="4" y1="9" x2="8" y2="19" stroke="#FAF9F6" strokeWidth="1.5" />
              </g>
            ))}

            {/* Sacred Sun, Birds and Forest Deer */}
            <circle cx="350" cy="40" r="12" fill="#FAF9F6" />
            {/* Horned Deer */}
            <g transform="translate(60, 275)">
              <polygon points="0,0 20,-5 15,10" fill="#FAF9F6" />
              <line x1="2" y1="5" x2="0" y2="16" stroke="#FAF9F6" strokeWidth="2" />
              <line x1="16" y1="5" x2="18" y2="16" stroke="#FAF9F6" strokeWidth="2" />
              <line x1="20" y1="-5" x2="26" y2="-15" stroke="#FAF9F6" strokeWidth="1.5" />
              <line x1="26" y1="-15" x2="30" y2="-20" stroke="#FAF9F6" strokeWidth="1" />
            </g>
          </svg>
        );

      case 'bhimbetka':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover select-none">
            {/* Weathered Sandstone Rock Face */}
            <defs>
              <linearGradient id="sandstoneRock" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C49A6C" />
                <stop offset="40%" stopColor="#A67B5B" />
                <stop offset="80%" stopColor="#7E543B" />
                <stop offset="100%" stopColor="#543725" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#sandstoneRock)" />
            {/* Geological fissure lines */}
            <path d="M10,40 Q90,90 160,50 T320,110 T390,70" stroke="#4A2E1B" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M30,220 Q140,180 230,240 T380,200" stroke="#4A2E1B" strokeWidth="2" fill="none" opacity="0.6" />
            
            {/* The Great Mesolithic Charging Boar (Hematite Red) */}
            <g transform="translate(180, 140)">
              {/* Giant massive stylized body */}
              <path
                d="M-80,-20 Q-40,-70 50,-60 Q110,-40 130,10 Q110,50 30,55 Q-50,60 -80,10 Z"
                fill="#800E13"
                stroke="#54080B"
                strokeWidth="3"
              />
              {/* Characteristic bristles on back */}
              {[-60, -40, -20, 0, 20, 40, 60, 80].map((bx, bidx) => (
                <line key={bidx} x1={bx} y1="-55" x2={bx + 6} y2="-75" stroke="#800E13" strokeWidth="3" strokeLinecap="round" />
              ))}
              {/* Massive curling tusks */}
              <path d="M110,15 Q145,20 150,-10 Q140,-5 125,5" fill="#FAF9F6" stroke="#800E13" strokeWidth="2" />
              {/* Charging Sturdy Legs */}
              <path d="M-60,40 L-70,85 L-55,85 L-45,45" fill="#800E13" />
              <path d="M-20,45 L-25,88 L-10,88 L-5,48" fill="#800E13" />
              <path d="M40,45 L35,88 L50,88 L55,45" fill="#800E13" />
              <path d="M80,35 L90,82 L105,82 L95,35" fill="#800E13" />
            </g>

            {/* Miniature Stick-Figure Mesolithic Hunters with Bows and Spears */}
            {[
              { x: 50, y: 160, spear: true },
              { x: 75, y: 185, spear: false },
              { x: 35, y: 220, spear: true },
              { x: 330, y: 80, spear: true },
              { x: 355, y: 120, spear: false }
            ].map((h, i) => (
              <g key={i} transform={`translate(${h.x}, ${h.y})`}>
                <circle cx="0" cy="-14" r="3.5" fill="#6E1E1E" />
                <line x1="0" y1="-10" x2="0" y2="8" stroke="#6E1E1E" strokeWidth="2.5" />
                <line x1="0" y1="8" x2="-8" y2="24" stroke="#6E1E1E" strokeWidth="2" />
                <line x1="0" y1="8" x2="10" y2="22" stroke="#6E1E1E" strokeWidth="2" />
                {h.spear ? (
                  <line x1="-12" y1="18" x2="18" y2="-22" stroke="#6E1E1E" strokeWidth="2" />
                ) : (
                  <path d="M-10,-5 Q0,-16 12,-4" stroke="#6E1E1E" strokeWidth="2" fill="none" />
                )}
              </g>
            ))}
          </svg>
        );

      case 'kangra':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover select-none">
            {/* Lyrical Kangra Rolling Hills & Monsoon Clouds */}
            <rect width="400" height="300" fill="#4B644A" />
            {/* Monsoon Indigo Storm Clouds */}
            <path d="M0,0 L400,0 L400,90 Q340,60 280,85 Q210,65 150,90 Q70,70 0,85 Z" fill="#2B3A4A" />
            {/* Silver Lightning Flash */}
            <path d="M290,15 L280,45 L292,50 L275,85" stroke="#FFD166" strokeWidth="2" fill="none" />

            {/* Flowering Kadamba Tree */}
            <path d="M120,280 Q140,210 135,140 Q130,90 170,70" stroke="#3A2818" strokeWidth="12" fill="none" />
            {/* Golden ball flowers (Kadamba blossoms) */}
            {[
              { x: 130, y: 90 },
              { x: 170, y: 80 },
              { x: 210, y: 95 },
              { x: 100, y: 120 },
              { x: 180, y: 130 }
            ].map((fl, fi) => (
              <circle key={fi} cx={fl.x} cy={fl.y} r="10" fill="#E9C46A" stroke="#FAF9F6" strokeWidth="1.5" />
            ))}

            {/* Radha & Krishna Sheltered Under One Shawl */}
            <g transform="translate(180, 160)">
              {/* Krishna's Golden Pitambara Shawl Covering Both */}
              <path d="M-25,-30 Q15,-60 55,-25 Q60,40 45,90 L-35,90 Z" fill="#E9C46A" stroke="#C5A059" strokeWidth="1.5" />
              {/* Krishna (Dark Blue Skin) */}
              <circle cx="0" cy="-15" r="14" fill="#3D5A80" />
              {/* Peacock Feather in Turban */}
              <path d="M-4,-28 Q0,-45 10,-40 Q5,-30 0,-25" fill="#2A9D8F" stroke="#E76F51" strokeWidth="1" />
              {/* Radha (Golden Warm Skin) */}
              <circle cx="26" cy="-10" r="13" fill="#F4EBD9" />
              <path d="M28,-18 Q38,-12 36,4 Q28,12 28,-18" fill="#1C1917" />
              {/* Flowing Red Odhani */}
              <path d="M22,-4 Q42,10 38,70" stroke="#BA181B" strokeWidth="5" fill="none" />
            </g>

            {/* Gentle Yamuna Stream with White Cranes & Water Lilies */}
            <path d="M0,250 Q100,235 200,255 T400,240 L400,300 L0,300 Z" fill="#22577A" />
            {/* White Crane */}
            <path d="M80,265 Q90,250 100,265 L85,270 Z" fill="#FAF9F6" />
            <path d="M96,252 L105,250" stroke="#E76F51" strokeWidth="1.5" />
          </svg>
        );

      case 'kolkata':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover select-none">
            {/* Ethereal Water-Wash Background (Japanese Wash Technique adapted) */}
            <defs>
              <linearGradient id="bengalWash" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A6B82" stopOpacity="0.8" />
                <stop offset="45%" stopColor="#DFB27D" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#8C6246" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#bengalWash)" />

            {/* Aura Halo behind Mother */}
            <circle cx="200" cy="110" r="60" fill="#F4EBD9" fillOpacity="0.3" />

            {/* Serene Saffron-Clad Bharat Mata Figure */}
            <path
              d="M175,80 Q200,65 225,80 Q235,115 228,155 Q245,190 240,260 L160,260 Q155,190 172,155 Z"
              fill="#D97736"
              fillOpacity="0.95"
            />
            {/* Ascetic Face with Downcast Meditative Eyes */}
            <circle cx="200" cy="95" r="18" fill="#F4EBD9" />
            <path d="M192,93 Q196,96 199,93" stroke="#2B2625" strokeWidth="1.5" fill="none" />
            <path d="M201,93 Q205,96 208,93" stroke="#2B2625" strokeWidth="1.5" fill="none" />
            <path d="M197,103 Q200,105 203,103" stroke="#C84B31" strokeWidth="1.5" fill="none" />

            {/* Four Divine Arms holding the Four Boons */}
            {/* Arm 1: Holding Sheaf of Paddy (Anna / Food) */}
            <path d="M175,130 Q140,140 130,120" stroke="#D97736" strokeWidth="5" fill="none" strokeLinecap="round" />
            <g transform="translate(125, 115)">
              <line x1="0" y1="10" x2="5" y2="-15" stroke="#E9C46A" strokeWidth="2.5" />
              <line x1="4" y1="5" x2="12" y2="-10" stroke="#E9C46A" strokeWidth="2" />
            </g>

            {/* Arm 2: Holding White Cloth (Vastra / Clothing) */}
            <path d="M170,150 Q135,175 130,200" stroke="#D97736" strokeWidth="5" fill="none" strokeLinecap="round" />
            <rect x="120" y="195" width="18" height="25" fill="#FAF9F6" stroke="#C5A059" strokeWidth="1" />

            {/* Arm 3: Holding Palm Manuscript (Shiksha / Knowledge) */}
            <path d="M225,130 Q260,140 270,120" stroke="#D97736" strokeWidth="5" fill="none" strokeLinecap="round" />
            <rect x="265" y="112" width="22" height="10" fill="#E7C186" stroke="#2B2625" strokeWidth="1" />

            {/* Arm 4: Holding Japa Rosary (Diksha / Spiritual Discipline) */}
            <path d="M230,150 Q265,175 270,200" stroke="#D97736" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="272" cy="205" r="7" fill="none" stroke="#FAF9F6" strokeWidth="2" strokeDasharray="3 2" />

            {/* Blooming Lotuses at her Bare Feet */}
            <g transform="translate(200, 270)">
              <ellipse cx="-40" cy="0" rx="18" ry="6" fill="#2A9D8F" />
              <ellipse cx="-40" cy="-6" rx="10" ry="12" fill="#FAF9F6" />
              <ellipse cx="40" cy="0" rx="18" ry="6" fill="#2A9D8F" />
              <ellipse cx="40" cy="-6" rx="10" ry="12" fill="#FAF9F6" />
            </g>
          </svg>
        );

      case 'mughal':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover select-none">
            {/* Imperial Gold & Lapis Border */}
            <rect width="400" height="300" fill="#FBF6EE" />
            <rect x="14" y="14" width="372" height="272" fill="none" stroke="#1C3144" strokeWidth="6" />
            <rect x="22" y="22" width="356" height="256" fill="none" stroke="#D4AF37" strokeWidth="2" />
            
            {/* Delicate Naturalist Flowering Branch (Ustad Mansur Style) */}
            <path d="M40,250 Q160,210 220,130 Q250,90 340,70" stroke="#5E432A" strokeWidth="5" fill="none" />
            <path d="M180,160 Q210,190 280,180" stroke="#5E432A" strokeWidth="3" fill="none" />

            {/* Soft pink apple blossoms */}
            {[
              { x: 140, y: 200 },
              { x: 200, y: 150 },
              { x: 260, y: 100 },
              { x: 310, y: 75 },
              { x: 250, y: 185 }
            ].map((fl, idx) => (
              <g key={idx} transform={`translate(${fl.x}, ${fl.y})`}>
                <circle cx="0" cy="0" r="10" fill="#FCEADE" stroke="#C1121F" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="4" fill="#FFB703" />
              </g>
            ))}

            {/* The Masterpiece Chameleon (Microscopic Pardaz Precision) */}
            <g transform="translate(190, 105)">
              {/* Curled Serpentine Tail around Branch */}
              <path d="M-30,25 Q-65,30 -50,65 Q-30,80 -20,60" stroke="#3E8967" strokeWidth="6" fill="none" strokeLinecap="round" />
              {/* Iridescent Body */}
              <ellipse cx="10" cy="15" rx="36" ry="18" fill="#3E8967" stroke="#1B4332" strokeWidth="1.5" />
              {/* Scales (Pardaz dots) */}
              {[-10, 0, 10, 20].map((dx, di) => (
                <circle key={di} cx={dx} cy="15" r="2.5" fill="#D4AF37" />
              ))}
              {/* Head with Horned Crest & Swiveling Eye */}
              <polygon points="40,5 65,10 50,28" fill="#3E8967" stroke="#1B4332" strokeWidth="1.5" />
              <circle cx="48" cy="14" r="5" fill="#D4AF37" stroke="#1C1917" strokeWidth="1" />
              <circle cx="49" cy="14" r="2" fill="#1C1917" />
              {/* Zygodactylous Claws gripping branch */}
              <path d="M0,30 L-5,42 M5,30 L10,42 M30,22 L35,35" stroke="#2D6A4F" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Royal Calligraphic Cartouche */}
            <rect x="270" y="225" width="100" height="45" fill="#F4EBD9" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M280,240 Q320,235 360,240 M285,255 Q325,250 355,255" stroke="#1C3144" strokeWidth="1.5" fill="none" strokeDasharray="5 3" />
          </svg>
        );

      case 'gond':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover select-none">
            {/* Luminous Ultramarine & Saffron Color Field */}
            <rect width="400" height="300" fill="#1D3557" />
            
            {/* Jangarh Kalam Flying Deer whose Horns become a Flowering Tree */}
            <g transform="translate(180, 150)">
              {/* Stag Body */}
              <path
                d="M-80,40 Q-20,10 40,25 Q70,40 80,80 Q20,100 -50,90 Z"
                fill="#E76F51"
                stroke="#FAF9F6"
                strokeWidth="2"
              />
              {/* Signature Jangarh Dot & Broken Line Texture */}
              {[-50, -30, -10, 10, 30, 50].map((gx, gi) => (
                <g key={gi}>
                  <circle cx={gx} cy="50" r="2" fill="#FAF9F6" />
                  <circle cx={gx} cy="65" r="2" fill="#2A9D8F" />
                  <circle cx={gx} cy="80" r="2" fill="#F4A261" />
                </g>
              ))}

              {/* Graceful Neck and Head */}
              <path d="M40,25 Q70,-20 85,-35" stroke="#E76F51" strokeWidth="16" strokeLinecap="round" fill="none" />
              <polygon points="85,-40 100,-35 90,-25" fill="#E76F51" />
              <circle cx="88" cy="-34" r="3" fill="#FAF9F6" />

              {/* Horns Branching into Great Flowering Mahua Tree */}
              <path d="M85,-40 Q60,-90 10,-110 M85,-40 Q130,-90 170,-115 M85,-40 Q100,-110 90,-135" stroke="#2A9D8F" strokeWidth="4" fill="none" />
              
              {/* Birds Singing in the Tree Antlers */}
              {[
                { x: 10, y: -110, c: '#F4A261' },
                { x: 170, y: -115, c: '#E76F51' },
                { x: 90, y: -135, c: '#FAF9F6' }
              ].map((bd, bi) => (
                <g key={bi} transform={`translate(${bd.x}, ${bd.y})`}>
                  <ellipse cx="0" cy="0" rx="10" ry="5" fill={bd.c} />
                  <polygon points="8,0 14,-2 10,3" fill="#FFB703" />
                </g>
              ))}
            </g>
          </svg>
        );

      case 'bombay':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover select-none">
            {/* Bold Modernist Impasto Planes (Progressive Artists' Group) */}
            <rect width="400" height="300" fill="#262322" />
            <polygon points="0,0 220,0 140,300 0,300" fill="#9E2A2B" opacity="0.8" />
            <polygon points="220,0 400,0 400,180 180,240" fill="#BC6C25" opacity="0.85" />
            <polygon points="140,300 400,180 400,300" fill="#1B1B1E" />

            {/* Raza's Cosmic Seed "Bindu" in Upper Center */}
            <circle cx="210" cy="80" r="36" fill="#0D0D0D" stroke="#FAF9F6" strokeWidth="2" />
            <circle cx="210" cy="80" r="26" fill="#1B1B1E" />
            <circle cx="210" cy="80" r="14" fill="#000" />

            {/* Husain's Galloping Horse Silhouette */}
            <path
              d="M70,240 Q110,180 150,195 Q180,180 200,210 Q240,150 280,165 Q290,135 310,140 Q300,165 295,185 Q320,200 300,240 L260,230 L220,265 L180,240 Z"
              fill="#FAF9F6"
              stroke="#0D0D0D"
              strokeWidth="2.5"
            />
            {/* Bold Calligraphic Energy Strokes */}
            <line x1="40" y1="260" x2="360" y2="260" stroke="#FAF9F6" strokeWidth="2" strokeDasharray="12 6" />
          </svg>
        );

      default:
        // Elegant architectural / textile motif for other locations
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover select-none">
            <rect width="400" height="300" fill="#2C241E" />
            {/* Heritage Archway Outline */}
            <path
              d="M60,280 L60,130 Q60,50 200,50 Q340,50 340,130 L340,280"
              fill="none"
              stroke={location.masterpiece.accentColor}
              strokeWidth="8"
            />
            <circle cx="200" cy="140" r="60" fill="none" stroke="#DDA15E" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="200" cy="140" r="40" fill={location.masterpiece.accentColor} fillOpacity="0.4" />
            {/* Central Monogram Insignia */}
            <text x="200" y="148" textAnchor="middle" fill="#FAF9F6" fontFamily="var(--font-serif)" fontSize="28" fontWeight="600">
              {location.name.slice(0, 2).toUpperCase()}
            </text>
            <text x="200" y="210" textAnchor="middle" fill="#D6CEBE" fontFamily="var(--font-sans)" fontSize="12" letterSpacing="0.1em">
              {location.movementName.slice(0, 32)}
            </text>
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-stone-900 group ${
        detailed ? 'rounded-xl border border-stone-800 shadow-md' : 'rounded-lg border border-stone-200'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Canvas */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
        {displayImageUrl && !imageError && viewMode === 'photo' ? (
          <div className="w-full h-full relative">
            <img
              src={displayImageUrl}
              alt={masterpiece.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Visual Grain & Texture Overlay */}
            <div className="absolute inset-0 mix-blend-multiply opacity-15 pointer-events-none bg-stone-900" />
          </div>
        ) : (
          renderVisualContent()
        )}

        {/* Curatorial Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-transparent pointer-events-none" />

        {/* Period & Movement Ribbon */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-medium text-stone-200 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded shadow-sm border border-white/10">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{location.eraPeriod}</span>
        </div>

        {/* Toggle Mode Button (for Detailed Views) */}
        {detailed && !imageError && (
          <div className="absolute top-3 right-12 flex items-center bg-stone-950/85 backdrop-blur-md rounded-lg p-0.5 border border-stone-700">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('photo');
              }}
              className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${
                viewMode === 'photo' ? 'bg-amber-700 text-white font-semibold' : 'text-stone-300 hover:text-white'
              }`}
            >
              Archival Photo
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('vector');
              }}
              className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${
                viewMode === 'vector' ? 'bg-amber-700 text-white font-semibold' : 'text-stone-300 hover:text-white'
              }`}
            >
              Vector Study
            </button>
          </div>
        )}

        {/* Inspect / Zoom Button */}
        {onOpenInspect && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenInspect();
            }}
            className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-stone-900/80 text-stone-200 hover:text-white hover:bg-stone-800 transition-colors shadow-md backdrop-blur-sm"
            title="Inspect Masterpiece Details"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        )}

        {/* Masterpiece Meta Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-left">
          <p className="text-xs uppercase tracking-wider text-amber-300 font-sans font-medium line-clamp-1">
            {masterpiece.artist} · {masterpiece.year}
          </p>
          <h4 className="text-base font-serif font-semibold text-white tracking-wide leading-tight mt-0.5 line-clamp-1">
            {masterpiece.title}
          </h4>
        </div>
      </div>

      {/* Archival Attribution Strip (if detailed) */}
      {detailed && imageInfo && (
        <div className="px-4 py-2 bg-stone-950/90 border-t border-stone-800/80 text-left flex flex-wrap items-center justify-between gap-2 text-[10px] text-stone-400 font-sans">
          <span>🏛️ <strong className="text-stone-300">Site/Archive:</strong> {imageInfo.museumOrSite}</span>
          <span className="text-stone-500 font-mono text-[9px]">{imageInfo.sourceAttribution}</span>
        </div>
      )}

      {/* Palette Swatches Bar */}
      {detailed && (
        <div className="p-3 bg-stone-900 border-t border-stone-800 text-left">
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-2">
            <span className="uppercase tracking-wider">Natural Pigments & Materials</span>
            <span className="font-mono text-stone-500">{masterpiece.colorPalette.length} Mineral Dyes</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {masterpiece.colorPalette.map((col, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-stone-950/60 p-1.5 rounded border border-stone-800/80">
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 border border-stone-700 shadow-inner"
                  style={{ backgroundColor: col.hex }}
                />
                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-stone-200 truncate">{col.name}</p>
                  <p className="text-[9px] text-stone-400 truncate">{col.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
