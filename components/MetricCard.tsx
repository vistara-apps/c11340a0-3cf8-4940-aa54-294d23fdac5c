'use client';

import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export function MetricCard({ label, value, change, icon, trend = 'neutral' }: MetricCardProps) {
  const trendColor =
    trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-text-muted';

  return (
    <div className="metric-card">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {label}
        </span>
        {icon && <div className="text-accent">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">{value}</span>
        {change && <span className={`text-sm font-medium ${trendColor}`}>{change}</span>}
      </div>
    </div>
  );
}
