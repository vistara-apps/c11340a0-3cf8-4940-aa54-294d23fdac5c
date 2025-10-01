export const REGIONS = ['Southeast Asia', 'Latin America', 'Africa'] as const;

export const SECTORS = ['tech', 'fintech', 'energy', 'healthcare', 'consumer'] as const;

export const CATALYST_TYPES = ['FDA', 'patent', 'insider_buy', 'earnings'] as const;

export const SENTIMENT_COLORS = {
  positive: 'text-success',
  negative: 'text-danger',
  neutral: 'text-text-muted',
} as const;

export const IMPACT_THRESHOLDS = {
  high: 8,
  medium: 5,
  low: 0,
} as const;

export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    features: ['Basic catalyst alerts', 'Limited pulse feed', 'Community challenges'],
  },
  premium: {
    name: 'Premium',
    price: 4.99,
    features: [
      'Unlimited catalyst alerts',
      'Real-time pulse feed',
      'Portfolio-linked learning',
      'Strategy simulator',
      'Priority notifications',
    ],
  },
} as const;
