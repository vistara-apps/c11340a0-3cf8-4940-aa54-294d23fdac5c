'use client';

import { AppShell } from '@/components/AppShell';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';

export default function SimulatorPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-1">Strategy Simulator</h1>
          <p className="text-sm text-text-muted">
            Test your strategies against historical emerging market events
          </p>
        </div>

        {/* Strategy Selection */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">Select Your Strategy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Value', 'Growth', 'Dividend'].map((strategy) => (
              <button
                key={strategy}
                className="glass-card p-4 hover:catalyst-card-glow transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-bg" />
                  </div>
                  <h3 className="font-semibold">{strategy}</h3>
                </div>
                <p className="text-sm text-text-muted">
                  Focus on {strategy.toLowerCase()} stocks with proven track records
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Time Period */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">Select Time Period</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <div className="flex items-center gap-2 glass-card p-3 rounded-lg">
                <Calendar className="w-4 h-4 text-text-muted" />
                <input
                  type="date"
                  className="bg-transparent flex-1 outline-none"
                  defaultValue="2020-01-01"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <div className="flex items-center gap-2 glass-card p-3 rounded-lg">
                <Calendar className="w-4 h-4 text-text-muted" />
                <input
                  type="date"
                  className="bg-transparent flex-1 outline-none"
                  defaultValue="2023-12-31"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Allocation */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">Portfolio Allocation</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Starting Capital</span>
              <span className="font-bold text-accent">$10,000</span>
            </div>
            <div className="space-y-3">
              {['XYZ - Brazilian Fintech', 'ABC - Thai E-commerce', 'DEF - Nigerian Solar'].map(
                (stock, i) => (
                  <div key={stock} className="glass-card p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{stock}</span>
                      <span className="text-sm text-accent">33%</span>
                    </div>
                    <div className="w-full bg-surface rounded-full h-2">
                      <div
                        className="pulse-gradient h-2 rounded-full"
                        style={{ width: '33%' }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Run Simulation */}
        <button className="btn-primary w-full flex items-center justify-center gap-2">
          <BarChart3 className="w-5 h-5" />
          <span>Run Simulation</span>
        </button>

        {/* Past Simulations */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Your Past Simulations</h2>
          <div className="space-y-3">
            {[
              { strategy: 'Value', return: '+42%', period: 'Jan 2020 - Dec 2023' },
              { strategy: 'Growth', return: '-8%', period: 'Jan 2020 - Dec 2023' },
              { strategy: 'Dividend', return: '+28%', period: 'Jan 2020 - Dec 2023' },
            ].map((sim, i) => (
              <div key={i} className="glass-card p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold mb-1">{sim.strategy} Strategy</div>
                  <div className="text-xs text-text-muted">{sim.period}</div>
                </div>
                <div
                  className={`text-xl font-bold ${
                    sim.return.startsWith('+') ? 'text-success' : 'text-danger'
                  }`}
                >
                  {sim.return}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
