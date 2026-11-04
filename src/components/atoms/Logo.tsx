// Átomo: logo em SVG (açaí com folhas).
interface Props {
  className?: string;
}

export function Logo({ className }: Props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 230 210"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M96 78 C60 70 28 52 6 62 C26 92 66 104 96 78Z" fill="#4FB21B" />
      <path
        d="M100 74 C96 40 112 14 150 6 C158 44 138 70 100 74Z"
        fill="#3E9A15"
      />
      <circle cx="78" cy="116" r="42" fill="#5E2183" />
      <ellipse
        cx="62"
        cy="100"
        rx="11"
        ry="14"
        fill="#fff"
        transform="rotate(-25 62 100)"
      />
      <circle cx="150" cy="104" r="46" fill="#7A1B9A" />
      <ellipse
        cx="136"
        cy="86"
        rx="12"
        ry="15"
        fill="#fff"
        transform="rotate(-25 136 86)"
      />
      <circle cx="108" cy="160" r="46" fill="#4B1768" />
      <ellipse
        cx="92"
        cy="142"
        rx="12"
        ry="15"
        fill="#fff"
        transform="rotate(-25 92 142)"
      />
    </svg>
  );
}
