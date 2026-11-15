import React from 'react';
import { getTimeRemaining } from '../../utils/formatters';

interface UrgencyRingProps {
  dueDate: string;
  isSubmitted?: boolean;
  size?: number; // default 26
  strokeWidth?: number; // default 3
  showTooltip?: boolean;
}

export const UrgencyRing: React.FC<UrgencyRingProps> = ({
  dueDate,
  isSubmitted = false,
  size = 28,
  strokeWidth = 3,
  showTooltip = true,
}) => {
  const { label, hoursLeft, isOverdue } = getTimeRemaining(dueDate, isSubmitted);

  if (isSubmitted) {
    return (
      <div
        className="inline-flex items-center justify-center relative shrink-0"
        title="Assignment Completed & Submitted"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - strokeWidth) / 2}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-emerald-100 dark:text-emerald-950"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - strokeWidth) / 2}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-emerald-500"
            fill="none"
            strokeDasharray={Math.PI * (size - strokeWidth)}
            strokeDashoffset={0}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-emerald-600 dark:text-emerald-400">
          ✓
        </span>
      </div>
    );
  }

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Max scale is 7 days (168h) down to 0
  const maxHours = 168;
  const remainingClamped = Math.max(0, Math.min(maxHours, hoursLeft));
  const progressRatio = remainingClamped / maxHours; // 1 = 7+ days left, 0 = 0h left
  const strokeDashoffset = circumference * (1 - progressRatio);

  let ringColor = 'text-[#004B93] dark:text-[#38BDF8]';
  let trackColor = 'text-blue-100 dark:text-blue-950/60';
  let isPulsing = false;

  if (isOverdue || hoursLeft <= 24) {
    // < 24 hours or Overdue: Crimson with subtle pulse indicator
    ringColor = 'text-rose-600 dark:text-rose-400';
    trackColor = 'text-rose-100 dark:text-rose-950/60';
    isPulsing = true;
  } else if (hoursLeft <= 72) {
    // 24–72 hours: Amber
    ringColor = 'text-amber-500 dark:text-amber-400';
    trackColor = 'text-amber-100 dark:text-amber-950/60';
  } else {
    // > 72 hours: Corporate Blue
    ringColor = 'text-[#004B93] dark:text-[#38BDF8]';
    trackColor = 'text-blue-100 dark:text-blue-950/60';
  }

  return (
    <div
      className={`inline-flex items-center justify-center relative shrink-0 ${
        isPulsing ? 'animate-pulse' : ''
      }`}
      title={showTooltip ? `Due: ${label}` : undefined}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={trackColor}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={`${ringColor} transition-all duration-500`}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Center dot or urgency icon */}
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          isOverdue || hoursLeft <= 24
            ? 'bg-rose-600 dark:bg-rose-400'
            : hoursLeft <= 72
            ? 'bg-amber-500 dark:bg-amber-400'
            : 'bg-[#004B93] dark:bg-[#38BDF8]'
        }`}
      />
    </div>
  );
};
