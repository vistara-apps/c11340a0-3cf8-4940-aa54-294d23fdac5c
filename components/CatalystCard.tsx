'use client';

import { Catalyst } from '@/lib/types';
import { formatRelativeTime, getImpactColor } from '@/lib/utils';
import { TrendingUp, CheckCircle2, Clock } from 'lucide-react';

interface CatalystCardProps {
  catalyst: Catalyst;
  variant?: 'default' | 'expanded' | 'frame';
  onSave?: () => void;
}

export function CatalystCard({ catalyst, variant = 'default', onSave }: CatalystCardProps) {
  const impactColor = getImpactColor(catalyst.impact_score);

  return (
    <div className="catalyst-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">${catalyst.ticker}</h3>
            <p className="text-sm text-text-muted">{catalyst.region}</p>
          </div>
        </div>
        {catalyst.verified && (
          <CheckCircle2 className="w-5 h-5 text-success" />
        )}
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
            {catalyst.type}
          </span>
          <span className={`text-sm font-bold ${impactColor}`}>
            Impact: {catalyst.impact_score}/10
          </span>
        </div>
        <p className="text-sm leading-relaxed">{catalyst.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-text-muted">
          <Clock className="w-3 h-3" />
          <span>{formatRelativeTime(catalyst.filed_at)}</span>
        </div>
        {variant !== 'frame' && (
          <button
            onClick={onSave}
            className="btn-secondary text-sm py-1 px-3"
          >
            Save as Frame
          </button>
        )}
      </div>

      {variant === 'expanded' && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex gap-2">
            <button className="btn-primary flex-1 text-sm py-2">
              Subscribe to Updates
            </button>
            <button className="btn-secondary text-sm py-2 px-4">
              View Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
