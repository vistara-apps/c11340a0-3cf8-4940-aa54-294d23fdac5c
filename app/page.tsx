'use client';

import { AppShell } from '@/components/AppShell';
import { MetricCard } from '@/components/MetricCard';
import { CatalystCard } from '@/components/CatalystCard';
import { PulseFeedItem } from '@/components/PulseFeedItem';
import { TrendingUp, Bell, BookOpen, Trophy } from 'lucide-react';
import { Catalyst, EmergingMarketPulse } from '@/lib/types';

// Mock data
const mockCatalysts: Catalyst[] = [
  {
    id: '1',
    ticker: 'XYZ',
    type: 'patent',
    description: 'Patent filing for AI-powered payment processing system',
    impact_score: 8,
    verified: true,
    submitted_by: '0x123...',
    filed_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
    region: 'Latin America',
  },
  {
    id: '2',
    ticker: 'ABC',
    type: 'insider_buy',
    description: 'CEO purchased $2M worth of shares',
    impact_score: 7,
    verified: true,
    submitted_by: '0x456...',
    filed_at: new Date(Date.now() - 5 * 60 * 60 * 1000),
    region: 'Southeast Asia',
  },
];

const mockPulse: EmergingMarketPulse[] = [
  {
    id: '1',
    region: 'Latin America',
    sector: 'fintech',
    headline: 'Brazil cuts interest rates by 0.5%, boosting fintech sector',
    summary: 'Central bank announces rate cut to stimulate economic growth',
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
    summary: 'New regulations may impact online marketplace valuations',
    sentiment: 'negative',
    impact_score: 6,
    source_url: 'https://example.com',
    published_at: new Date(Date.now() - 90 * 60 * 1000),
  },
];

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="glass-card p-6 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Welcome to <span className="text-accent">PulsePort</span>
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Real-time emerging market intelligence for micro-cap investors—social, fast, and
            on-chain.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Active Catalysts"
            value="24"
            change="+12%"
            trend="up"
            icon={<Bell className="w-4 h-4" />}
          />
          <MetricCard
            label="Reputation Score"
            value="847"
            change="+23"
            trend="up"
            icon={<Trophy className="w-4 h-4" />}
          />
          <MetricCard
            label="$PULSE Balance"
            value="1,250"
            icon={<TrendingUp className="w-4 h-4" />}
          />
          <MetricCard
            label="Learning Modules"
            value="8"
            change="+3 new"
            trend="up"
            icon={<BookOpen className="w-4 h-4" />}
          />
        </div>

        {/* Top Catalysts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Top Catalysts</h2>
            <button className="text-sm text-accent hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {mockCatalysts.map((catalyst) => (
              <CatalystCard
                key={catalyst.id}
                catalyst={catalyst}
                onSave={() => console.log('Save catalyst:', catalyst.id)}
              />
            ))}
          </div>
        </div>

        {/* Emerging Markets Pulse */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Emerging Markets Pulse</h2>
            <button className="text-sm text-accent hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {mockPulse.map((pulse) => (
              <PulseFeedItem key={pulse.id} pulse={pulse} variant="detailed" />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-card p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Ready to unlock premium features?</h3>
          <p className="text-text-muted mb-4">
            Get unlimited catalyst alerts, real-time pulse feed, and portfolio-linked learning
          </p>
          <button className="btn-primary">
            Upgrade to Premium - $4.99/month
          </button>
        </div>
      </div>
    </AppShell>
  );
}
