export default function Circuit({ variant = "hero" }) {
  const gradientId = `circuit-gradient-${variant}`;

  return (
    <svg
      className={`circuit circuit-${variant}`}
      viewBox="0 0 640 420"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3199D5" />
          <stop offset="100%" stopColor="#58CDB5" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path className="circuit-line" d="M30 70 H170 V150 H310 V70 H470" />
        <path
          className="circuit-line circuit-line-delay"
          d="M90 220 H230 V300 H390 V210 H560"
        />
        <path
          className="circuit-line circuit-line-delay-2"
          d="M150 360 H280 V250 H420 V340 H600"
        />
      </g>
      <g className="circuit-nodes" fill="#58CDB5">
        <circle cx="170" cy="70" r="4.5" />
        <circle cx="310" cy="150" r="4.5" />
        <circle cx="470" cy="70" r="4.5" />
        <circle cx="230" cy="220" r="4" />
        <circle cx="390" cy="300" r="4" />
        <circle cx="420" cy="250" r="4" />
      </g>
    </svg>
  );
}
