export default function CoffeeBeanWorldMap() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(28,21,16,0.18)]" style={{ aspectRatio: "16/10" }}>
      <svg
        viewBox="0 0 1000 625"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ background: "#C9B49A" }}
      >
        <defs>
          {/* Coffee bean repeating pattern */}
          <pattern id="beanPattern" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
            {/* Bean ellipse with crease */}
            <ellipse cx="9" cy="9" rx="5.5" ry="3.5" fill="#3B2A1A" opacity="0.85" transform="rotate(-30 9 9)" />
            <line x1="9" y1="6" x2="9" y2="12" stroke="#5A3A20" strokeWidth="0.8" transform="rotate(-30 9 9)" />
          </pattern>

          {/* Mask to show pattern only on land */}
          <mask id="landMask">
            {/* North America */}
            <path fill="white" d="
              M 108,48 L 145,38 L 185,32 L 230,38 L 265,50 L 295,72 L 310,100
              L 318,130 L 312,165 L 295,200 L 272,228 L 248,248 L 218,262
              L 185,270 L 160,265 L 135,255 L 108,235 L 88,210
              L 72,182 L 70,155 L 78,125 L 92,98 Z
            "/>
            {/* Central America & Mexico */}
            <path fill="white" d="
              M 248,248 L 272,228 L 295,200 L 305,215 L 295,235
              L 278,255 L 262,268 L 248,275 L 240,268 Z
            "/>
            {/* Greenland */}
            <path fill="white" d="
              M 290,12 L 335,8 L 360,18 L 368,42 L 358,68 L 335,80
              L 308,82 L 282,68 L 275,48 Z
            "/>
            {/* Cuba / Caribbean */}
            <ellipse fill="white" cx="268" cy="258" rx="18" ry="6" transform="rotate(-15 268 258)"/>

            {/* South America */}
            <path fill="white" d="
              M 195,278 L 230,268 L 262,268 L 285,278 L 300,308
              L 310,345 L 305,385 L 290,418 L 268,448 L 245,468
              L 220,472 L 198,458 L 180,432 L 170,400
              L 165,365 L 168,330 L 178,300 Z
            "/>

            {/* Europe */}
            <path fill="white" d="
              M 448,88 L 478,75 L 508,72 L 535,78 L 558,92
              L 565,112 L 558,135 L 545,152 L 525,162
              L 498,168 L 472,162 L 452,148 L 442,128
              L 442,108 Z
            "/>
            {/* UK */}
            <ellipse fill="white" cx="432" cy="98" rx="10" ry="16" transform="rotate(10 432 98)"/>
            {/* Iceland */}
            <ellipse fill="white" cx="388" cy="68" rx="18" ry="10"/>
            {/* Scandinavia */}
            <path fill="white" d="M 492,72 L 512,55 L 530,52 L 542,65 L 535,80 L 515,78 Z"/>

            {/* Africa */}
            <path fill="white" d="
              M 448,175 L 490,165 L 532,162 L 568,168 L 588,190
              L 598,220 L 598,258 L 592,298 L 582,338
              L 568,375 L 548,408 L 522,432 L 498,445
              L 472,440 L 450,422 L 432,390 L 422,352
              L 418,310 L 420,268 L 428,228 L 438,198 Z
            "/>
            {/* Madagascar */}
            <ellipse fill="white" cx="608" cy="368" rx="12" ry="30" transform="rotate(10 608 368)"/>

            {/* Asia — main body */}
            <path fill="white" d="
              M 548,58 L 605,48 L 665,42 L 725,38 L 785,40
              L 835,48 L 878,62 L 912,82 L 928,112
              L 932,148 L 922,182 L 902,212 L 875,238
              L 845,258 L 808,272 L 768,282 L 728,288
              L 688,280 L 655,265 L 625,248 L 598,228
              L 578,205 L 562,180 L 552,152 L 548,122
              L 548,90 Z
            "/>
            {/* Indian subcontinent */}
            <path fill="white" d="
              M 625,248 L 655,265 L 670,290 L 665,320
              L 648,345 L 628,358 L 608,352 L 595,332
              L 592,305 L 598,278 Z
            "/>
            {/* Southeast Asia peninsula */}
            <path fill="white" d="
              M 768,282 L 788,295 L 798,325 L 790,352
              L 775,362 L 760,348 L 755,318 L 758,295 Z
            "/>
            {/* Japan */}
            <ellipse fill="white" cx="918" cy="128" rx="10" ry="22" transform="rotate(-20 918 128)"/>
            <ellipse fill="white" cx="908" cy="158" rx="8" ry="18" transform="rotate(-20 908 158)"/>
            {/* Sri Lanka */}
            <ellipse fill="white" cx="648" cy="368" rx="7" ry="10"/>
            {/* Indonesia (simplified) */}
            <ellipse fill="white" cx="820" cy="338" rx="35" ry="12" transform="rotate(-5 820 338)"/>
            <ellipse fill="white" cx="868" cy="328" rx="22" ry="10" transform="rotate(-5 868 328)"/>
            {/* Philippines */}
            <ellipse fill="white" cx="868" cy="285" rx="8" ry="20" transform="rotate(5 868 285)"/>

            {/* Australia */}
            <path fill="white" d="
              M 748,368 L 798,355 L 848,352 L 888,362
              L 908,385 L 912,415 L 898,445 L 872,462
              L 838,470 L 802,468 L 768,455
              L 745,432 L 735,405 L 738,382 Z
            "/>
            {/* New Zealand */}
            <ellipse fill="white" cx="948" cy="452" rx="10" ry="25" transform="rotate(15 948 452)"/>

            {/* Antarctica (thin strip at bottom) */}
            <rect fill="white" x="0" y="570" width="1000" height="55" rx="8"/>
          </mask>
        </defs>

        {/* Ocean */}
        <rect width="1000" height="625" fill="#C9B49A" />

        {/* Subtle latitude/longitude grid lines */}
        {[125, 250, 375, 500].map(y => (
          <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#B8A48A" strokeWidth="0.5" opacity="0.6"/>
        ))}
        {[200, 400, 600, 800].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="625" stroke="#B8A48A" strokeWidth="0.5" opacity="0.6"/>
        ))}

        {/* Land fill — solid base color */}
        <g mask="url(#landMask)">
          <rect width="1000" height="625" fill="#6B3A1F" />
        </g>

        {/* Coffee bean pattern over land */}
        <g mask="url(#landMask)">
          <rect width="1000" height="625" fill="url(#beanPattern)" opacity="0.92" />
        </g>

        {/* Thin country-suggesting inner shadow on continents */}
        <g mask="url(#landMask)">
          <rect width="1000" height="625" fill="none" stroke="#3B2A1A" strokeWidth="0.5" opacity="0.3"/>
        </g>

        {/* Origin pin dots for key coffee countries */}
        {[
          { x: 530, y: 280, label: "Ethiopia" },
          { x: 238, y: 310, label: "Colombia" },
          { x: 480, y: 255, label: "Kenya" },
          { x: 640, y: 270, label: "India" },
          { x: 178, y: 230, label: "Guatemala" },
          { x: 810, y: 340, label: "Indonesia" },
          { x: 290, y: 348, label: "Brazil" },
          { x: 495, y: 215, label: "Yemen" },
        ].map(({ x, y, label }) => (
          <g key={label}>
            <circle cx={x} cy={y} r="5" fill="var(--color-caramel, #C8893C)" opacity="0.95"/>
            <circle cx={x} cy={y} r="9" fill="none" stroke="var(--color-caramel, #C8893C)" strokeWidth="1.5" opacity="0.5"/>
          </g>
        ))}

        {/* Title badge */}
        <rect x="18" y="575" width="240" height="34" rx="4" fill="rgba(28,21,16,0.72)"/>
        <text x="30" y="597" fontFamily="Georgia, serif" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="#C8893C">
          36 ORIGINS · 1,338 BEANS
        </text>
      </svg>
    </div>
  );
}
