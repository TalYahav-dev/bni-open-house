import type { HostStatus } from '../../types';

const statusConfig: Record<HostStatus, { label: string; classes: string }> = {
  available: {
    label: 'פתוח להרשמה',
    classes: 'bg-sage/15 text-sage border-sage/25',
  },
  limited: {
    label: '',
    classes: 'bg-copper/15 text-copper border-copper/25',
  },
  full: {
    label: 'מלא',
    classes: 'bg-dim/15 text-dim border-dim/25',
  },
};

interface BadgeProps {
  status: HostStatus;
  remaining?: number;
}

export function Badge({ status, remaining }: BadgeProps) {
  const config = statusConfig[status];
  const label = status === 'limited' ? `נותרו ${remaining} מקומות` : config.label;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${config.classes}`}
    >
      {label}
    </span>
  );
}
