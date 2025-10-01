'use client';

import { AppShell } from '@/components/AppShell';
import { CatalystCard } from '@/components/CatalystCard';
import { Catalyst } from '@/lib/types';
import { Plus, Filter } from 'lucide-react';

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
  {
    id: '3',
    ticker: 'DEF',
    type: 'FDA',
    description: 'Phase 3 clinical trial results expected within 2 weeks',
    impact_score: 9,
    verified: true,
    submitted_by: '0x789...',
    filed_at: new Date(Date.now() - 1 * 60 * 60 * 1000),
    region: 'Africa',
  },
  {
    id: '4',
    ticker: 'GHI',
    type: 'earnings',
    description: 'Q4 earnings beat expectations by 15%',
    impact_score: 6,
    verified: false,
    submitted_by: '0xabc...',
    filed_at: new Date(Date.now() - 8 * 60 * 60 * 1000),
    region: 'Latin America',
  },
];

export default function CatalystsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Micro-Cap Catalyst Tracker</h1>
            <p className="text-sm text-text-muted">
              Crowdsourced + AI-aggregated catalysts for stocks under $500M market cap
            </p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Submit</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-accent mb-1">24</div>
            <div className="text-xs text-text-muted">Active Catalysts</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">18</div>
            <div className="text-xs text-text-muted">Verified Today</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">847</div>
            <div className="text-xs text-text-muted">Your Reputation</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <div className="flex gap-2 overflow-x-auto flex-1">
            {['All', 'FDA', 'Patent', 'Insider Buy', 'Earnings'].map((filter) => (
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
            ))}
          </div>
        </div>

        {/* Catalysts Grid */}
        <div className="space-y-4">
          {mockCatalysts.map((catalyst) => (
            <CatalystCard
              key={catalyst.id}
              catalyst={catalyst}
              variant="expanded"
              onSave={() => console.log('Save catalyst:', catalyst.id)}
            />
          ))}
        </div>

        {/* Premium CTA */}
        <div className="glass-card p-6 text-center">
          <div className="inline-block px-3 py-1 bg-accent text-bg text-xs font-bold rounded-full mb-3">
            PREMIUM
          </div>
          <h3 className="text-xl font-bold mb-2">Unlock Verified Catalysts</h3>
          <p className="text-text-muted mb-4">
            Get access to verified catalysts within 10 minutes of filing
          </p>
          <button className="btn-primary">Upgrade Now - $4.99/month</button>
        </div>
      </div>
    </AppShell>
  );
}
