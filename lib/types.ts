export interface User {
  wallet_address: string;
  farcaster_fid?: string;
  username: string;
  reputation_score: number;
  pulse_token_balance: number;
  subscription_tier: 'free' | 'premium';
  created_at: Date;
  watchlist_ids: string[];
}

export interface Watchlist {
  id: string;
  user_wallet: string;
  name: string;
  tickers: string[];
  created_at: Date;
}

export interface Catalyst {
  id: string;
  ticker: string;
  type: 'FDA' | 'patent' | 'insider_buy' | 'earnings';
  description: string;
  impact_score: number;
  verified: boolean;
  submitted_by: string;
  filed_at: Date;
  triggered_at?: Date;
  region: 'Southeast Asia' | 'Latin America' | 'Africa';
}

export interface EmergingMarketPulse {
  id: string;
  region: string;
  sector: string;
  headline: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact_score: number;
  source_url: string;
  published_at: Date;
}

export interface LearningModule {
  id: string;
  watchlist_id: string;
  ticker: string;
  title: string;
  content: string;
  duration_minutes: number;
  triggered_by_event_id?: string;
  delivered_at: Date;
}

export interface Prediction {
  id: string;
  user_wallet: string;
  catalyst_id: string;
  predicted_impact: number;
  submitted_at: Date;
  result: 'correct' | 'incorrect' | 'pending';
}

export interface SimulationSession {
  id: string;
  user_wallet: string;
  strategy_type: 'value' | 'growth' | 'dividend';
  start_date: Date;
  end_date: Date;
  portfolio_snapshot: Record<string, unknown>;
  final_return_pct: number;
  created_at: Date;
}
