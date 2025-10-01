'use client';

import { AppShell } from '@/components/AppShell';
import { PulseFeedItem } from '@/components/PulseFeedItem';
import { EmergingMarketPulse } from '@/lib/types';
import { Filter } from 'lucide-react';

const mockPulseData: EmergingMarketPulse[] = [
  {
    id: '1',
    region: 'Latin America',
    sector: 'fintech',
    headline: 'Brazil cuts interest rates by 0.5%, boosting fintech sector',
    summary:
      'The Brazilian Central Bank announced a 0.5% interest rate cut to stimulate economic growth, particularly benefiting fintech companies with lower borrowing costs.',
    sentiment: 'positive',
    impact_score: 9,
    source_url: 'https://example.com',
    published_at: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: '2',
    region: 'Southeast Asia',
    sector: 'tech',
    headline: 'Thailand announces new e-commerce tax policy',
    summary:
      'New regulations require online marketplaces to collect VAT on behalf of sellers, potentially impacting platform valuations.',
    sentiment: 'negative',
    impact_score: 6,
    source_url: 'https://example.com',
    published_at: new Date(Date.now() - 90 * 60 * 1000),
  },
  {
    id: '3',
    region: 'Africa',
    sector: 'energy',
    headline: 'Nigeria approves renewable energy incentives',
    summary:
      'Government announces tax breaks and subsidies for solar energy companies, expected to accelerate sector growth.',
    sentiment: 'positive',
    impact_score: 8,
    source_url: 'https://example.com',
    published_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '4',
    region: 'Latin America',
    sector: 'consumer',
    headline: 'Argentina inflation hits 25% monthly rate',
    summary:
      'Hyperinflation concerns grow as consumer spending power decreases, affecting retail and consumer goods companies.',
    sentiment: 'negative',
    impact_score: 9,
    source_url: 'https://example.com',
    published_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: '5',
    region: 'Southeast Asia',
    sector: 'fintech',
    headline: 'Indonesia digital banking licenses approved for 3 new players',
    summary:
      'Regulatory approval granted to three fintech startups to operate as digital banks, intensifying competition.',
    sentiment: 'neutral',
    impact_score: 7,
    source_url: 'https://example.com',
    published_at: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
];

export default function PulsePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Emerging Markets Pulse</h1>
            <p className="text-sm text-text-muted">
              Real-time news and sentiment tracking across emerging markets
            </p>
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Latin America', 'Southeast Asia', 'Africa', 'Fintech', 'Tech', 'Energy'].map(
            (filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  filter === 'All'
                    ? 'bg-accent text-bg'
                    : 'bg-surface text-fg hover:bg-opacity-80'
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>

        {/* Pulse Feed */}
        <div className="space-y-3">
          {mockPulseData.map((pulse) => (
            <PulseFeedItem key={pulse.id} pulse={pulse} variant="detailed" />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="btn-secondary">Load More Updates</button>
        </div>
      </div>
    </AppShell>
  );
}
