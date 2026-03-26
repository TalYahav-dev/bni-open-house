import type { HostWithSignups, HostStatus } from '../../types';
import { Badge } from './Badge';
import { Button } from './Button';

interface HostCardProps {
  host: HostWithSignups;
  onSignup: (hostId: string) => void;
}

function getStatus(host: HostWithSignups): HostStatus {
  const remaining = host.capacity - host.signupCount;
  if (remaining <= 0) return 'full';
  if (remaining <= 2) return 'limited';
  return 'available';
}

export function HostCard({ host, onSignup }: HostCardProps) {
  const status = getStatus(host);
  const remaining = host.capacity - host.signupCount;
  const isFull = status === 'full';

  return (
    <div
      className={`bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-all duration-300 ${
        isFull
          ? 'opacity-50 grayscale-[30%]'
          : 'hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] hover:-translate-y-1 cursor-default'
      }`}
    >
      {/* Header: name + badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar circle */}
          <div className="w-11 h-11 rounded-full bg-sage/15 flex items-center justify-center text-sage font-bold text-lg shrink-0 ring-2 ring-sage/10">
            {host.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-charcoal font-bold text-lg leading-tight">
              {host.name}
            </h3>
            <p className="text-muted text-sm">{host.area}</p>
          </div>
        </div>
        <Badge status={status} remaining={remaining} />
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Details */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground">
        <span className="flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {host.day} {host.date}
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {host.time}
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
          {host.capacity} מקומות
        </span>
      </div>

      {/* Safe room */}
      {host.hasSafeRoom && (
        <div className="flex items-center gap-1.5 text-xs text-sage font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          יש מרחב מוגן
        </div>
      )}

      {/* Hosting note */}
      {host.hostingNote && (
        <p className="text-sm text-muted italic border-r-2 border-sage/30 pr-3">
          {host.hostingNote}
        </p>
      )}

      {/* CTA */}
      <div className="mt-auto pt-2">
        <Button
          variant="primary"
          className="w-full text-sm"
          disabled={isFull}
          onClick={() => onSignup(host.id)}
        >
          {isFull ? 'המפגש מלא' : 'להרשמה למפגש'}
        </Button>
      </div>
    </div>
  );
}
