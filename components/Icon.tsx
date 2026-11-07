import type { IconName } from "@/lib/site";

type Name = IconName | "clock" | "shield" | "receipt" | "medal" | "check" | "phone" | "pin" | "arrow" | "lock";

const paths: Record<Name, React.ReactNode> = {
  heart: <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />,
  implant: <><path d="M7 4h10l-1 7H8z" /><path d="M9 11v3M15 11v3M8 14h8M9 17h6M10 20h4" /></>,
  sparkle: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  crown: <path d="M5 9c0-3 3-5 7-5s7 2 7 5-1 4-1 7-1 4-2.5 4S13 18 12 15c-1 3-2 5-3.5 5S6 19 6 16 5 12 5 9z" />,
  braces: <><path d="M3 12c3-2 15-2 18 0" /><rect x="5" y="9.5" width="3" height="5" rx="1" /><rect x="10.5" y="9.5" width="3" height="5" rx="1" /><rect x="16" y="9.5" width="3" height="5" rx="1" /></>,
  drop: <path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  receipt: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  medal: <><circle cx="12" cy="9" r="5" /><path d="M9 13.5 8 21l4-2 4 2-1-7.5" /></>,
  check: <path d="M5 12l5 5L20 7" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  pin: <><path d="M12 21s-6-5.4-6-11a6 6 0 0 1 12 0c0 5.6-6 11-6 11z" /><circle cx="12" cy="10" r="2.2" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
};

export function Icon({ name, size = 24, strokeWidth = 1.8, color = "currentColor" }: { name: Name; size?: number; strokeWidth?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export function Stars() {
  const pts = "10,1.5 12.6,7 18.5,7.6 14,11.6 15.3,17.5 10,14.5 4.7,17.5 6,11.6 1.5,7.6 7.4,7";
  return (
    <svg className="stars" width="108" height="20" viewBox="0 0 108 20" role="img" aria-label="5 yulduz">
      {[0, 1, 2, 3, 4].map((i) => <polygon key={i} transform={`translate(${i * 22} 0)`} points={pts} />)}
    </svg>
  );
}
