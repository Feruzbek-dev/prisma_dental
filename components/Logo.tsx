import { MARK_FILL, WORD_DENTAL, WORD_LETTERS } from "@/lib/logo-paths";

export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="1494 0 3115 3040" aria-hidden="true">
      <g transform="translate(0,3100) scale(.1,-.1)"><path d={MARK_FILL} /></g>
    </svg>
  );
}

export function Word({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 3679 6104 2022" aria-hidden="true">
      <g transform="translate(0,3600)"><g transform="translate(0,1250) scale(.1,-.1)">{WORD_LETTERS.map((d, i) => <path key={i} d={d} />)}</g></g>
      <g transform="translate(0,5150)"><g transform="translate(0,551) scale(.1,-.1)">{WORD_DENTAL.map((d, i) => <path key={i} d={d} />)}</g></g>
    </svg>
  );
}

export function Brand({ label = "Prisma Dental — bosh sahifa" }: { label?: string }) {
  return (
    <a className="brand" href="#top" aria-label={label}>
      <Mark className="mark" />
      <Word className="word" />
    </a>
  );
}
