'use client';

import { EmergingMarketPulse } from '@/lib/types';
import { formatRelativeTime, getImpactColor } from '@/lib/utils';
import { SENTIMENT_COLORS } from '@/lib/constants';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PulseFeedItemProps {
  pulse: EmergingMarketPulse;
  variant?: 'headline' | 'detailed';
}

export function PulseFeedItem({ pulse, variant = 'headline' }: PulseFeedItemProps) {
  const impactColor = getImpactColor(pulse.impact_score);
  const sentimentColor = SENTIMENT_COLORS[pulse.sentiment];

  const SentimentIcon =
    pulse.sentiment === 'positive'
      ? TrendingUp
      : pulse.sentiment === 'negative'
      ? TrendingDown
      : Minus;

  return (
    <div className="pulse-feed-item">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 bg-surface rounded-lg flex items-center justify-center ${sentimentColor}`}>
          <SentimentIcon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold leading-tight">{pulse.headline}</h3>
            <span className={`text-xs font-bold ${impactColor} ml-2`}>
              {pulse.impact_score}/10
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-text-muted">
              {pulse.region} • {pulse.sector}
            </span>
            <span className={`text-xs font-medium uppercase ${sentimentColor}`}>
              {pulse.sentiment}
            </span>
          </div>

          {variant === 'detailed' && (
            <p className="text-sm text-text-muted leading-relaxed mb-3">
              {pulse.summary}
            </p>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">
              {formatRelativeTime(pulse.published_at)}
            </span>
            {variant === 'detailed' && (
              <a
                href={pulse.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline"
              >
                Read Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
