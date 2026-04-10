import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ className, variant = 'dark' }: LogoProps) {
  const color = variant === 'dark' ? '#4A6741' : '#F7F3EE';
  const textColor = variant === 'dark' ? '#4A6741' : '#F7F3EE';

  return (
    <svg
      viewBox="0 0 120 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto", className)}
    >
      {/* Stylized Leaf Shape */}
      <path
        d="M40 40 C40 40 60 70 60 100 C60 130 80 140 100 130 C110 125 110 100 110 80 C110 60 100 40 80 30 C60 20 40 30 40 40 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M60 100 C60 100 80 110 90 100 C100 90 100 70 90 60 C80 50 60 60 60 60"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Flower Icon */}
      <g transform="translate(45, 25) scale(0.8)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <path
            key={angle}
            d="M0 0 C5 -10 15 -10 10 0 C5 10 -5 10 0 0"
            stroke={color}
            strokeWidth="1.5"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx="0" cy="0" r="2" fill={color} />
      </g>

      {/* Vertical Text: WHISPER OF AGE */}
      <text
        transform="translate(25, 130) rotate(-90)"
        fill={textColor}
        style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.1em', fontFamily: 'sans-serif' }}
      >
        WHISPER OF AGE
      </text>

      {/* Vertical Text: 树聆之语 */}
      <text
        x="45"
        y="60"
        fill={textColor}
        style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'serif', writingMode: 'vertical-rl' }}
      >
        树聆之语
      </text>
    </svg>
  );
}
