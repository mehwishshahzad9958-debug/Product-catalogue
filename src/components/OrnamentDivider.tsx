/** Thin gold rule with a small lotus in the middle. Decorative only. */
export default function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 24"
      className={`h-6 w-60 text-turmeric ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 14H92M148 14H240" />
      {/* lotus */}
      <path d="M120 3C113 8 113 16 120 21C127 16 127 8 120 3Z" />
      <path d="M120 21C110 20 104 15 102 9C110 9 117 13 120 21Z" />
      <path d="M120 21C130 20 136 15 138 9C130 9 123 13 120 21Z" />
      <path d="M120 21C108 23 99 19 95 14C103 12 113 14 120 21Z" />
      <path d="M120 21C132 23 141 19 145 14C137 12 127 14 120 21Z" />
    </svg>
  );
}
