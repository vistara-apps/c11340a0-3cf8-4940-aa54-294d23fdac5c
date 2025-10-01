'use client';

import { AppShell } from '@/components/AppShell';
import { MetricCard } from '@/components/MetricCard';
import { Trophy, TrendingUp, Target, Award } from 'lucide-react';

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 pulse-gradient rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-bg">JD</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">John Doe</h1>
              <p className="text-sm text-text-muted">0x1234...5678</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-accent text-bg text-xs font-bold rounded-full">
                  PREMIUM
                </span>
                <span className="px-3 py-1 bg-surface text-xs font-medium rounded-full">
                  Catalyst Hunter 🏆
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Reputation"
            value="847"
            change="+23"
            trend="up"
            icon={<Trophy className="w-4 h-4" />}
          />
          <MetricCard
            label="$PULSE Tokens"
            value="1,250"
            change="+50"
            trend="up"
            icon={<TrendingUp className="w-4 h-4" />}
          />
          <MetricCard
            label="Predictions"
            value="42"
            change="68% correct"
            trend="up"
            icon={<Target className="w-4 h-4" />}
          />
          <MetricCard
            label="Badges"
            value="8"
            icon={<Award className="w-4 h-4" />}
          />
        </div>

        {/* Badges */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Your Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Catalyst Hunter', emoji: '🏆', earned: true },
              { name: 'Early Bird', emoji: '🐦', earned: true },
              { name: 'Top Predictor', emoji: '🎯', earned: true },
              { name: 'Community Star', emoji: '⭐', earned: false },
            ].map((badge) => (
              <div
                key={badge.name}
                className={`glass-card p-4 text-center ${
                  badge.earned ? '' : 'opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{badge.emoji}</div>
                <div className="text-sm font-medium">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              {
                action: 'Predicted catalyst impact',
                detail: '$XYZ patent approval - Impact 8/10',
                time: '2h ago',
              },
              {
                action: 'Earned badge',
                detail: 'Catalyst Hunter 🏆',
                time: '1d ago',
              },
              {
                action: 'Completed learning module',
                detail: 'How Interest Rates Affect Fintech',
                time: '2d ago',
              },
            ].map((activity, i) => (
              <div key={i} className="glass-card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium mb-1">{activity.action}</div>
                    <div className="text-sm text-text-muted">{activity.detail}</div>
                  </div>
                  <span className="text-xs text-text-muted">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold mb-1">Premium Subscription</h3>
              <p className="text-sm text-text-muted">Next billing: Jan 15, 2024</p>
            </div>
            <span className="text-xl font-bold text-accent">$4.99/mo</span>
          </div>
          <button className="btn-secondary w-full">Manage Subscription</button>
        </div>
      </div>
    </AppShell>
  );
}
