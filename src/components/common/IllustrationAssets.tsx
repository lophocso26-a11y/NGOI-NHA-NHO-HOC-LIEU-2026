import React from 'react';

/**
 * High-quality vector illustration assets tailored for primary school visual learning.
 * Built with layered gradients, soft lighting, depth, and warm cartoon aesthetics.
 */

// Minh Explorer Vector (Boy, 7-8yo, blue explorer vest, cute backpack, friendly smile)
export const MinhCharacterSvg: React.FC<{
  pose?: 'welcome' | 'cheer' | 'think';
  className?: string;
  size?: number;
}> = ({ pose = 'welcome', className = '', size = 160 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      <defs>
        <radialGradient id="minhSkin" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFE0C2" />
          <stop offset="100%" stopColor="#F7C49E" />
        </radialGradient>
        <linearGradient id="minhHair" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2D3748" />
          <stop offset="100%" stopColor="#1A202C" />
        </linearGradient>
        <linearGradient id="minhVest" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="minhCap" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* Backpack behind shoulders */}
      <rect x="36" y="94" width="88" height="52" rx="14" fill="#059669" />
      <rect x="42" y="100" width="76" height="12" rx="6" fill="#10B981" />

      {/* Body / Shirt */}
      <path d="M48 108 C48 94, 60 88, 80 88 C100 88, 112 94, 112 108 L116 156 L44 156 Z" fill="#F8FAFC" />
      {/* Blue Explorer Vest */}
      <path d="M48 108 C48 94, 58 88, 70 88 L64 156 L44 156 Z" fill="url(#minhVest)" />
      <path d="M112 108 C112 94, 102 88, 90 88 L96 156 L116 156 Z" fill="url(#minhVest)" />
      <rect x="48" y="122" width="16" height="18" rx="4" fill="#1E40AF" />
      <rect x="96" y="122" width="16" height="18" rx="4" fill="#1E40AF" />
      {/* Badge on vest */}
      <circle cx="56" cy="112" r="5" fill="#FBBF24" />

      {/* Neck */}
      <rect x="73" y="80" width="14" height="14" rx="4" fill="#F7C49E" />

      {/* Head */}
      <ellipse cx="80" cy="58" rx="28" ry="26" fill="url(#minhSkin)" />

      {/* Ears */}
      <ellipse cx="52" cy="60" rx="5" ry="7" fill="#F7C49E" />
      <ellipse cx="108" cy="60" rx="5" ry="7" fill="#F7C49E" />

      {/* Short black hair */}
      <path
        d="M52 50 C52 30, 64 24, 80 24 C96 24, 108 30, 108 50 C108 50, 104 38, 96 38 C88 38, 86 44, 80 40 C74 44, 70 38, 64 38 C56 38, 52 50, 52 50 Z"
        fill="url(#minhHair)"
      />
      <path d="M52 46 C52 36, 60 30, 68 34" stroke="url(#minhHair)" strokeWidth="6" strokeLinecap="round" />

      {/* Cute Explorer Cap */}
      <path d="M56 34 C58 18, 102 18, 104 34 Z" fill="url(#minhCap)" />
      <ellipse cx="80" cy="34" rx="28" ry="6" fill="#F59E0B" />
      <circle cx="80" cy="22" r="4" fill="#D97706" />

      {/* Eyes */}
      <circle cx="70" cy="58" r="4.5" fill="#1E293B" />
      <circle cx="90" cy="58" r="4.5" fill="#1E293B" />
      <circle cx="68.5" cy="56.5" r="1.5" fill="#FFFFFF" />
      <circle cx="88.5" cy="56.5" r="1.5" fill="#FFFFFF" />

      {/* Eyebrows */}
      <path d="M65 50 Q70 48 75 51" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M85 51 Q90 48 95 50" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />

      {/* Rosy cheeks */}
      <ellipse cx="64" cy="65" rx="5" ry="3" fill="#F43F5E" fillOpacity="0.25" />
      <ellipse cx="96" cy="65" rx="5" ry="3" fill="#F43F5E" fillOpacity="0.25" />

      {/* Smile */}
      {pose === 'cheer' ? (
        <path d="M72 66 Q80 77 88 66 Z" fill="#DC2626" />
      ) : (
        <path d="M73 66 Q80 73 87 66" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      )}

      {/* Arms & Hands */}
      {pose === 'cheer' || pose === 'welcome' ? (
        <>
          {/* Waving right arm */}
          <path d="M112 104 Q132 94 136 78" stroke="#3B82F6" strokeWidth="12" strokeLinecap="round" />
          <circle cx="138" cy="74" r="7" fill="#F7C49E" />
          {/* Left arm */}
          <path d="M48 104 Q32 114 36 128" stroke="#3B82F6" strokeWidth="12" strokeLinecap="round" />
          <circle cx="36" cy="132" r="7" fill="#F7C49E" />
        </>
      ) : (
        <>
          {/* Thinking hand under chin */}
          <path d="M112 104 Q124 116 118 132" stroke="#3B82F6" strokeWidth="12" strokeLinecap="round" />
          <circle cx="118" cy="135" r="7" fill="#F7C49E" />
          <path d="M48 104 Q60 88 74 76" stroke="#3B82F6" strokeWidth="11" strokeLinecap="round" />
          <circle cx="76" cy="74" r="7" fill="#F7C49E" />
        </>
      )}
    </svg>
  );
};

// An Explorer Vector (Girl, 7-8yo, black pigtails with ribbons, sweet yellow outfit, warm smile)
export const AnCharacterSvg: React.FC<{
  pose?: 'welcome' | 'cheer' | 'think';
  className?: string;
  size?: number;
}> = ({ pose = 'welcome', className = '', size = 160 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      <defs>
        <radialGradient id="anSkin" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFF1E6" />
          <stop offset="100%" stopColor="#FBD7BE" />
        </radialGradient>
        <linearGradient id="anHair" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#27272A" />
          <stop offset="100%" stopColor="#18181B" />
        </linearGradient>
        <linearGradient id="anDress" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Left pigtail */}
      <path d="M50 48 C32 46 26 68 34 82 C40 88 48 80 48 70 Z" fill="url(#anHair)" />
      <circle cx="48" cy="62" r="6" fill="#EC4899" />

      {/* Right pigtail */}
      <path d="M110 48 C128 46 134 68 126 82 C120 88 112 80 112 70 Z" fill="url(#anHair)" />
      <circle cx="112" cy="62" r="6" fill="#EC4899" />

      {/* Body / Yellow Overalls */}
      <path d="M52 108 C52 94, 62 88, 80 88 C98 88, 108 94, 108 108 L114 156 L46 156 Z" fill="#FDF2F8" />
      <path d="M54 106 L62 90 L70 90 L68 156 L50 156 Z" fill="url(#anDress)" />
      <path d="M106 106 L98 90 L90 90 L92 156 L110 156 Z" fill="url(#anDress)" />
      <rect x="66" y="106" width="28" height="34" rx="6" fill="#F59E0B" />
      {/* Heart pocket on overalls */}
      <path d="M76 116 C76 112, 80 112, 80 115 C80 112, 84 112, 84 116 C84 120, 80 123, 80 125 C80 123, 76 120, 76 116 Z" fill="#EC4899" />

      {/* Neck */}
      <rect x="74" y="80" width="12" height="12" rx="4" fill="#FBD7BE" />

      {/* Head */}
      <ellipse cx="80" cy="58" rx="27" ry="25" fill="url(#anSkin)" />

      {/* Ears */}
      <ellipse cx="53" cy="60" rx="4" ry="6" fill="#FBD7BE" />
      <ellipse cx="107" cy="60" rx="4" ry="6" fill="#FBD7BE" />

      {/* Hair (bangs & top) */}
      <path
        d="M53 50 C53 32, 64 24, 80 24 C96 24, 107 32, 107 50 C107 50, 100 38, 92 38 C84 38, 80 44, 76 42 C72 44, 68 38, 60 38 C56 38, 53 50, 53 50 Z"
        fill="url(#anHair)"
      />
      {/* Cute pink headband */}
      <path d="M55 42 Q80 32 105 42" stroke="#F43F5E" strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="64" cy="38" r="4" fill="#FBBF24" />

      {/* Eyes */}
      <circle cx="70" cy="58" r="4.5" fill="#1E293B" />
      <circle cx="90" cy="58" r="4.5" fill="#1E293B" />
      <circle cx="68.5" cy="56.5" r="1.5" fill="#FFFFFF" />
      <circle cx="88.5" cy="56.5" r="1.5" fill="#FFFFFF" />
      {/* Eyelashes */}
      <path d="M67 53 L65 50" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M93 53 L95 50" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />

      {/* Eyebrows */}
      <path d="M66 50 Q70 48 74 51" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      <path d="M86 51 Q90 48 94 50" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

      {/* Rosy cheeks */}
      <ellipse cx="64" cy="66" rx="6" ry="3.5" fill="#FB7185" fillOpacity="0.35" />
      <ellipse cx="96" cy="66" rx="6" ry="3.5" fill="#FB7185" fillOpacity="0.35" />

      {/* Smile */}
      {pose === 'cheer' ? (
        <path d="M72 67 Q80 78 88 67 Z" fill="#E11D48" />
      ) : (
        <path d="M73 67 Q80 73 87 67" stroke="#BE123C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      )}

      {/* Arms & Hands */}
      {pose === 'cheer' ? (
        <>
          <path d="M108 102 Q128 88 132 72" stroke="#FBBF24" strokeWidth="11" strokeLinecap="round" />
          <circle cx="134" cy="68" r="6.5" fill="#FBD7BE" />
          <path d="M52 102 Q32 88 28 72" stroke="#FBBF24" strokeWidth="11" strokeLinecap="round" />
          <circle cx="26" cy="68" r="6.5" fill="#FBD7BE" />
        </>
      ) : (
        <>
          {/* Welcome greeting */}
          <path d="M108 102 Q124 100 128 88" stroke="#FBBF24" strokeWidth="11" strokeLinecap="round" />
          <circle cx="130" cy="84" r="6.5" fill="#FBD7BE" />
          <path d="M52 102 Q40 114 44 126" stroke="#FBBF24" strokeWidth="11" strokeLinecap="round" />
          <circle cx="45" cy="130" r="6.5" fill="#FBD7BE" />
        </>
      )}
    </svg>
  );
};

// Isometric Cutaway 3D Dollhouse Vector
export const IsometricHouseSvg: React.FC<{
  activeRoom?: string | null;
  onRoomClick?: (roomId: string) => void;
  className?: string;
  isFullyGlowing?: boolean;
}> = ({ activeRoom = null, onRoomClick, className = '', isFullyGlowing = false }) => {
  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      <svg
        viewBox="0 0 900 600"
        className="w-full h-auto drop-shadow-2xl select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
          <linearGradient id="wallExterior" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>
          <linearGradient id="woodFloor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="warmLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Backdrop Garden & Sunny Sky */}
        <rect x="0" y="0" width="900" height="600" rx="24" fill="url(#skyGrad)" />
        {/* Soft grass hill base */}
        <ellipse cx="450" cy="560" rx="420" ry="80" fill="#86EFAC" />
        <ellipse cx="450" cy="570" rx="380" ry="60" fill="#4ADE80" />

        {/* Outer House Structure */}
        {/* Shadow */}
        <ellipse cx="450" cy="530" rx="350" ry="40" fill="#0F172A" fillOpacity="0.12" />

        {/* Roof */}
        <path d="M450 40 L810 160 L450 190 L90 160 Z" fill="url(#roofGrad)" />
        <path d="M90 160 L450 190 L450 205 L90 175 Z" fill="#C2410C" />
        <path d="M810 160 L450 190 L450 205 L810 175 Z" fill="#7C2D12" />
        {/* Chimney */}
        <rect x="620" y="80" width="45" height="70" rx="4" fill="#B91C1C" />
        <ellipse cx="642" cy="80" rx="22" ry="7" fill="#EF4444" />
        {/* Smoke puffs */}
        <circle cx="648" cy="62" r="9" fill="#FFFFFF" fillOpacity="0.75" />
        <circle cx="658" cy="45" r="13" fill="#FFFFFF" fillOpacity="0.65" />
        <circle cx="672" cy="28" r="16" fill="#FFFFFF" fillOpacity="0.45" />

        {/* Main 2-Story House Cutaway Shell */}
        <rect x="110" y="180" width="680" height="340" rx="16" fill="url(#wallExterior)" stroke="#D97706" strokeWidth="4" />

        {/* Floor Divider (Floor 1 & Floor 2) */}
        <rect x="110" y="340" width="680" height="18" fill="url(#woodFloor)" />
        {/* Vertical Center Wall Divider */}
        <rect x="444" y="180" width="14" height="340" fill="#E2E8F0" />

        {/* ROOM 1: STUDY CORNER (Top Left) */}
        <g
          className={`cursor-pointer transition-all duration-300 ${activeRoom === 'study_corner' ? 'filter drop-shadow-lg' : 'hover:opacity-95'}`}
          onClick={() => onRoomClick && onRoomClick('study_corner')}
        >
          <rect
            x="116"
            y="186"
            width="324"
            height="150"
            rx="12"
            fill={activeRoom === 'study_corner' ? '#FEF3C7' : '#FFF7ED'}
            stroke={activeRoom === 'study_corner' ? '#F59E0B' : '#E2E8F0'}
            strokeWidth={activeRoom === 'study_corner' ? '4' : '2'}
          />
          {/* Room Window */}
          <rect x="140" y="206" width="60" height="55" rx="6" fill="#93C5FD" stroke="#F59E0B" strokeWidth="3" />
          <line x1="170" y1="206" x2="170" y2="261" stroke="#F59E0B" strokeWidth="2" />
          <line x1="140" y1="233" x2="200" y2="233" stroke="#F59E0B" strokeWidth="2" />

          {/* Bookshelf & Desk */}
          <rect x="330" y="200" width="85" height="110" rx="4" fill="#D97706" />
          <line x1="330" y1="235" x2="415" y2="235" stroke="#92400E" strokeWidth="3" />
          <line x1="330" y1="270" x2="415" y2="270" stroke="#92400E" strokeWidth="3" />
          {/* Colorful books on shelf */}
          <rect x="340" y="212" width="10" height="22" rx="2" fill="#3B82F6" />
          <rect x="352" y="210" width="12" height="24" rx="2" fill="#EF4444" />
          <rect x="366" y="214" width="9" height="20" rx="2" fill="#10B981" />
          <rect x="377" y="208" width="14" height="26" rx="2" fill="#F59E0B" />
          <rect x="340" y="248" width="11" height="21" rx="2" fill="#8B5CF6" />
          <rect x="353" y="246" width="13" height="23" rx="2" fill="#EC4899" />
          <rect x="368" y="250" width="10" height="19" rx="2" fill="#06B6D4" />

          {/* Study desk */}
          <rect x="220" y="258" width="100" height="60" rx="4" fill="#B45309" />
          <rect x="235" y="248" width="30" height="10" rx="2" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2" />
          {/* Desk Lamp */}
          <path d="M305 258 L305 235 L295 238" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
          <polygon points="288,244 304,234 300,248" fill="#F59E0B" />
          {/* Study Chair */}
          <rect x="250" y="280" width="36" height="38" rx="4" fill="#1E3A8A" />
          <rect x="254" y="266" width="28" height="14" rx="3" fill="#3B82F6" />

          {/* Room Label Badge */}
          <rect x="130" y="304" width="115" height="24" rx="12" fill="#F59E0B" />
          <text x="187" y="320" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
            GÓC HỌC TẬP
          </text>
        </g>

        {/* ROOM 2: BEDROOM (Top Right) */}
        <g
          className={`cursor-pointer transition-all duration-300 ${activeRoom === 'bedroom' ? 'filter drop-shadow-lg' : 'hover:opacity-95'}`}
          onClick={() => onRoomClick && onRoomClick('bedroom')}
        >
          <rect
            x="462"
            y="186"
            width="322"
            height="150"
            rx="12"
            fill={activeRoom === 'bedroom' ? '#EDE9FE' : '#F5F3FF'}
            stroke={activeRoom === 'bedroom' ? '#8B5CF6' : '#E2E8F0'}
            strokeWidth={activeRoom === 'bedroom' ? '4' : '2'}
          />
          {/* Bed */}
          <rect x="490" y="250" width="140" height="68" rx="8" fill="#6366F1" />
          <rect x="495" y="256" width="130" height="56" rx="6" fill="#A5B4FC" />
          {/* Pillows */}
          <rect x="502" y="244" width="34" height="20" rx="6" fill="#FFFFFF" stroke="#818CF8" strokeWidth="2" />
          <rect x="542" y="244" width="34" height="20" rx="6" fill="#FFFFFF" stroke="#818CF8" strokeWidth="2" />
          {/* Cozy Blanket */}
          <rect x="530" y="268" width="95" height="44" rx="4" fill="#4338CA" />

          {/* Wardrobe */}
          <rect x="660" y="200" width="95" height="118" rx="6" fill="#78350F" />
          <line x1="707" y1="200" x2="707" y2="318" stroke="#451A03" strokeWidth="2" />
          <circle cx="700" cy="260" r="3" fill="#FBBF24" />
          <circle cx="714" cy="260" r="3" fill="#FBBF24" />

          {/* Nightstand & Lamp */}
          <rect x="635" y="268" width="22" height="46" rx="3" fill="#92400E" />
          <circle cx="646" cy="260" r="7" fill="#FDE047" />

          {/* Room Label Badge */}
          <rect x="475" y="200" width="105" height="24" rx="12" fill="#8B5CF6" />
          <text x="527" y="216" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
            PHÒNG NGỦ
          </text>
        </g>

        {/* ROOM 3: LIVING ROOM (Bottom Left) */}
        <g
          className={`cursor-pointer transition-all duration-300 ${activeRoom === 'living_room' ? 'filter drop-shadow-lg' : 'hover:opacity-95'}`}
          onClick={() => onRoomClick && onRoomClick('living_room')}
        >
          <rect
            x="116"
            y="362"
            width="324"
            height="152"
            rx="12"
            fill={activeRoom === 'living_room' ? '#FEF08A' : '#FEF9C3'}
            stroke={activeRoom === 'living_room' ? '#EAB308' : '#E2E8F0'}
            strokeWidth={activeRoom === 'living_room' ? '4' : '2'}
          />

          {/* Sofa */}
          <rect x="140" y="420" width="125" height="64" rx="10" fill="#EA580C" />
          <rect x="150" y="426" width="105" height="44" rx="6" fill="#F97316" />
          {/* Sofa cushions */}
          <rect x="156" y="432" width="44" height="34" rx="6" fill="#FDBA74" />
          <rect x="204" y="432" width="44" height="34" rx="6" fill="#FDBA74" />

          {/* Coffee Table */}
          <rect x="280" y="445" width="70" height="36" rx="6" fill="#92400E" />
          {/* Tea set / flowers on table */}
          <ellipse cx="315" cy="445" rx="14" ry="4" fill="#FFFFFF" />
          <circle cx="315" cy="442" r="3" fill="#EF4444" />

          {/* Television & Stand */}
          <rect x="365" y="405" width="60" height="42" rx="4" fill="#0F172A" />
          <rect x="370" y="410" width="50" height="32" rx="2" fill="#38BDF8" fillOpacity="0.85" />
          <rect x="378" y="447" width="34" height="35" rx="3" fill="#78350F" />

          {/* Fan */}
          <circle cx="150" cy="385" r="14" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
          <line x1="150" y1="399" x2="150" y2="416" stroke="#64748B" strokeWidth="3" />
          <ellipse cx="150" cy="416" rx="8" ry="3" fill="#334155" />

          {/* Room Label Badge */}
          <rect x="130" y="482" width="115" height="24" rx="12" fill="#EAB308" />
          <text x="187" y="498" textAnchor="middle" fill="#78350F" fontSize="12" fontWeight="bold">
            PHÒNG KHÁCH
          </text>
        </g>

        {/* ROOM 4: KITCHEN (Bottom Right) */}
        <g
          className={`cursor-pointer transition-all duration-300 ${activeRoom === 'kitchen' ? 'filter drop-shadow-lg' : 'hover:opacity-95'}`}
          onClick={() => onRoomClick && onRoomClick('kitchen')}
        >
          <rect
            x="462"
            y="362"
            width="322"
            height="152"
            rx="12"
            fill={activeRoom === 'kitchen' ? '#CCFBF1' : '#F0FDFA'}
            stroke={activeRoom === 'kitchen' ? '#14B8A6' : '#E2E8F0'}
            strokeWidth={activeRoom === 'kitchen' ? '4' : '2'}
          />

          {/* Kitchen Cabinets & Countertop */}
          <rect x="480" y="415" width="170" height="70" rx="6" fill="#0F766E" />
          <rect x="475" y="410" width="180" height="12" rx="3" fill="#E2E8F0" />
          {/* Stove & Sink */}
          <circle cx="510" cy="416" r="4" fill="#1E293B" />
          <circle cx="530" cy="416" r="4" fill="#1E293B" />
          <rect x="565" y="413" width="30" height="8" rx="2" fill="#94A3B8" />

          {/* Dining Table & Chairs */}
          <rect x="670" y="435" width="85" height="46" rx="6" fill="#B45309" />
          <ellipse cx="712" cy="435" rx="35" ry="8" fill="#F59E0B" />
          {/* Bowls and cups on table */}
          <ellipse cx="700" cy="433" rx="7" ry="4" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.5" />
          <ellipse cx="725" cy="433" rx="7" ry="4" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.5" />
          <rect x="712" y="428" width="6" height="7" rx="2" fill="#38BDF8" />

          {/* Hanging Kitchen Shelf with dishes */}
          <rect x="490" y="375" width="80" height="8" rx="2" fill="#92400E" />
          <ellipse cx="510" cy="373" rx="6" ry="2" fill="#FFFFFF" />
          <ellipse cx="530" cy="373" rx="7" ry="2" fill="#FFFFFF" />
          <ellipse cx="550" cy="373" rx="8" ry="2" fill="#FFFFFF" />

          {/* Refrigerator */}
          <rect x="735" y="375" width="40" height="100" rx="6" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <line x1="735" y1="415" x2="775" y2="415" stroke="#94A3B8" strokeWidth="2" />
          <rect x="740" y="390" width="4" height="15" rx="1" fill="#64748B" />
          <rect x="740" y="430" width="4" height="20" rx="1" fill="#64748B" />

          {/* Room Label Badge */}
          <rect x="475" y="482" width="105" height="24" rx="12" fill="#0D9488" />
          <text x="527" y="498" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
            NHÀ BẾP
          </text>
        </g>

        {/* Global Celebration Sparkles & House Glow if stage complete */}
        {(isFullyGlowing || activeRoom === null) && (
          <g filter="url(#glowFilter)" opacity={isFullyGlowing ? 0.9 : 0.4} pointerEvents="none">
            <circle cx="150" cy="190" r="12" fill="#FDE047" />
            <circle cx="450" cy="220" r="16" fill="#FDE047" />
            <circle cx="750" cy="190" r="14" fill="#FDE047" />
            <circle cx="280" cy="350" r="12" fill="#FDE047" />
            <circle cx="620" cy="350" r="12" fill="#FDE047" />
          </g>
        )}
      </svg>
    </div>
  );
};

// Item Graphic Vector (for quizzes, cards, and care activities)
export const ItemGraphicSvg: React.FC<{
  type: 'book' | 'toy' | 'furniture' | 'kitchenware' | 'chair' | 'fan' | 'tv' | 'cup' | 'bed' | 'desk';
  status?: 'clean' | 'damaged' | 'neutral';
  size?: number;
  className?: string;
}> = ({ type, status = 'clean', size = 80, className = '' }) => {
  const isDamaged = status === 'damaged';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <defs>
        <radialGradient id="itemGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient background ring */}
      <circle cx="50" cy="50" r="44" fill={isDamaged ? '#FEE2E2' : '#EFF6FF'} stroke={isDamaged ? '#FCA5A5' : '#BFDBFE'} strokeWidth="2" />

      {type === 'book' && (
        <g transform={isDamaged ? 'rotate(-6 50 50)' : ''}>
          {/* Book cover */}
          <path d="M22 26 C22 26 36 24 50 28 C64 24 78 26 78 26 L78 74 C64 71 50 75 50 75 C36 71 22 74 22 74 Z" fill={isDamaged ? '#9CA3AF' : '#2563EB'} />
          {/* Pages */}
          <path d="M25 28 C25 28 37 26 50 30 C63 26 75 28 75 28 L75 71 C63 68 50 72 50 72 C37 68 25 71 25 71 Z" fill="#F8FAFC" />
          {/* Bookmark ribbon */}
          <path d="M50 30 L50 62 L54 58 L58 62 L58 30 Z" fill="#EF4444" />
          {/* If damaged: crease marks */}
          {isDamaged && (
            <>
              <line x1="28" y1="36" x2="42" y2="48" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="3 3" />
              <path d="M64 28 L72 38 L62 42 Z" fill="#EF4444" fillOpacity="0.3" />
            </>
          )}
        </g>
      )}

      {(type === 'toy' || type === 'desk') && (
        <g>
          {/* Colorful Building Blocks & Robot toy */}
          <rect x="24" y="52" width="24" height="24" rx="4" fill={isDamaged ? '#9CA3AF' : '#F59E0B'} />
          <circle cx="36" cy="64" r="5" fill="#FFFFFF" fillOpacity="0.6" />
          <rect x="52" y="44" width="26" height="32" rx="5" fill={isDamaged ? '#6B7280' : '#10B981'} />
          {/* Robot Head */}
          <rect x="57" y="26" width="16" height="14" rx="3" fill="#3B82F6" />
          <circle cx="62" cy="33" r="2" fill="#FBBF24" />
          <circle cx="68" cy="33" r="2" fill="#FBBF24" />
          {isDamaged && (
            <line x1="30" y1="30" x2="70" y2="70" stroke="#DC2626" strokeWidth="3" />
          )}
        </g>
      )}

      {(type === 'furniture' || type === 'chair') && (
        <g>
          {/* Sturdy Wooden Chair */}
          <rect x="36" y="22" width="28" height="32" rx="4" fill={isDamaged ? '#78716C' : '#B45309'} />
          <line x1="43" y1="22" x2="43" y2="54" stroke="#78350F" strokeWidth="2" />
          <line x1="50" y1="22" x2="50" y2="54" stroke="#78350F" strokeWidth="2" />
          <line x1="57" y1="22" x2="57" y2="54" stroke="#78350F" strokeWidth="2" />
          {/* Seat */}
          <rect x="30" y="54" width="40" height="10" rx="3" fill={isDamaged ? '#A8A29E' : '#D97706'} />
          {/* Legs */}
          <rect x="34" y="64" width="5" height="22" rx="2" fill="#92400E" />
          <rect x="61" y="64" width="5" height="22" rx="2" fill="#92400E" />
          {isDamaged && (
            <path d="M42 34 L56 46" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          )}
        </g>
      )}

      {(type === 'kitchenware' || type === 'cup') && (
        <g>
          {/* Porcelain Cup & Saucer */}
          <ellipse cx="50" cy="74" rx="26" ry="7" fill={isDamaged ? '#CBD5E1' : '#38BDF8'} />
          <ellipse cx="50" cy="73" rx="22" ry="5" fill="#FFFFFF" />
          {/* Cup body */}
          <path d="M35 44 C35 64 65 64 65 44 Z" fill={isDamaged ? '#E2E8F0' : '#0284C7'} />
          <ellipse cx="50" cy="44" rx="15" ry="5" fill="#38BDF8" />
          {/* Handle */}
          <path d="M63 48 C72 50 72 58 63 60" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Steam puffs */}
          {!isDamaged && (
            <>
              <path d="M44 36 Q42 28 46 22" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M54 36 Q56 28 52 22" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" fill="none" />
            </>
          )}
          {isDamaged && (
            <path d="M44 48 L52 56 L48 62" stroke="#EF4444" strokeWidth="3" fill="none" />
          )}
        </g>
      )}

      {type === 'fan' && (
        <g>
          <circle cx="50" cy="42" r="22" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          {/* Blades */}
          <circle cx="50" cy="42" r="6" fill="#0369A1" />
          <ellipse cx="50" cy="30" rx="4" ry="10" fill="#38BDF8" />
          <ellipse cx="50" cy="54" rx="4" ry="10" fill="#38BDF8" />
          <ellipse cx="38" cy="42" rx="10" ry="4" fill="#38BDF8" />
          <ellipse cx="62" cy="42" rx="10" ry="4" fill="#38BDF8" />
          {/* Stand */}
          <rect x="47" y="64" width="6" height="18" rx="2" fill="#64748B" />
          <ellipse cx="50" cy="82" rx="18" ry="5" fill="#334155" />
        </g>
      )}

      {type === 'tv' && (
        <g>
          <rect x="20" y="25" width="60" height="44" rx="6" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          <rect x="25" y="30" width="50" height="34" rx="3" fill="#38BDF8" />
          <rect x="45" y="69" width="10" height="10" fill="#475569" />
          <ellipse cx="50" cy="80" rx="16" ry="4" fill="#0F172A" />
        </g>
      )}

      {type === 'bed' && (
        <g>
          <rect x="18" y="44" width="64" height="32" rx="6" fill="#6366F1" />
          <rect x="22" y="48" width="56" height="24" rx="4" fill="#A5B4FC" />
          <rect x="24" y="38" width="20" height="12" rx="3" fill="#FFFFFF" stroke="#818CF8" strokeWidth="1.5" />
          <rect x="48" y="38" width="20" height="12" rx="3" fill="#FFFFFF" stroke="#818CF8" strokeWidth="1.5" />
          <rect x="36" y="52" width="40" height="20" rx="3" fill="#4338CA" />
        </g>
      )}
    </svg>
  );
};

// Golden Badge Graphic
export const BadgeSvg: React.FC<{
  title: string;
  isUnlocked?: boolean;
  size?: number;
}> = ({ title, isUnlocked = true, size = 100 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${isUnlocked ? 'filter drop-shadow-lg' : 'opacity-40 grayscale'}`}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        <radialGradient id="sunburst" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
      </defs>

      {/* Ribbon tails */}
      <polygon points="40,85 24,115 48,105" fill="#DC2626" />
      <polygon points="80,85 96,115 72,105" fill="#B91C1C" />

      {/* Starburst rays */}
      <circle cx="60" cy="55" r="42" fill="url(#sunburst)" />
      <circle cx="60" cy="55" r="36" fill="url(#goldGradient)" stroke="#FFFFFF" strokeWidth="3" />
      <circle cx="60" cy="55" r="30" fill="#FEF9C3" />

      {/* Central icon: Big Star & Crown */}
      <path
        d="M60 36 L64 48 L76 48 L66 56 L70 68 L60 61 L50 68 L54 56 L44 48 L56 48 Z"
        fill="#EAB308"
        stroke="#CA8A04"
        strokeWidth="1.5"
      />

      {/* Laurel leaves wreath */}
      <path d="M38 52 C36 42 42 36 48 34" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M82 52 C84 42 78 36 72 34" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Sparkles */}
      <circle cx="60" cy="52" r="3" fill="#FFFFFF" />
    </svg>
  );
};
