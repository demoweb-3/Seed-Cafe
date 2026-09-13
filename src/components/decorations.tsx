/** Hand-drawn organic decorative SVG elements inspired by Seed's visual language. */

export function SeedSprout({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M60 110 C60 80 60 50 60 30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M60 55 C45 50 30 40 28 25 C42 22 56 32 60 48"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 48 C75 42 90 32 92 18 C78 15 64 25 60 40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="60" cy="112" r="3" fill="currentColor" />
    </svg>
  );
}

export function OrganicCurve({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 60" className={className} preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M0 30 C100 55 200 5 300 25 C350 35 380 28 400 30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SeedCluster({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M100 180 L100 100"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <ellipse cx="100" cy="95" rx="8" ry="12" fill="currentColor" opacity="0.15" />
      <path
        d="M100 90 C80 85 60 70 55 50 C70 45 88 55 100 75"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M100 80 C120 75 140 60 145 40 C130 35 112 45 100 65"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.35"
      />
      <circle cx="55" cy="50" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="145" cy="40" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="100" cy="185" r="4" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export function HandDrawnLine({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 12" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M2 6 C50 2 100 10 150 5 C200 1 250 9 298 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WavyDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 80" className={className} preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M0 40 C240 10 480 70 720 40 C960 10 1200 70 1440 40 L1440 80 L0 80 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CircleSeed({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" opacity="0.4" />
      <path
        d="M50 75 L50 45"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M50 50 C38 47 28 38 26 25 C38 23 48 30 50 42"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M50 45 C62 42 72 33 74 20 C62 18 52 25 50 37"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="50" cy="78" r="2.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
