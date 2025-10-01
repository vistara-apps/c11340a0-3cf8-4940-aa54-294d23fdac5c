import { Redis } from '@upstash/redis';
import { User, Watchlist, Catalyst, EmergingMarketPulse, LearningModule, Prediction, SimulationSession } from './types';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Database key prefixes
const KEYS = {
  USER: 'user:',
  WATCHLIST: 'watchlist:',
  CATALYST: 'catalyst:',
  PULSE: 'pulse:',
  LEARNING: 'learning:',
  PREDICTION: 'prediction:',
  SIMULATION: 'simulation:',
  USER_WATCHLISTS: 'user_watchlists:',
  USER_PREDICTIONS: 'user_predictions:',
  CATALYST_PREDICTIONS: 'catalyst_predictions:',
};

// User operations
export const userDb = {
  async get(walletAddress: string): Promise<User | null> {
    const data = await redis.get(`${KEYS.USER}${walletAddress}`);
    return data as User | null;
  },

  async create(user: Omit<User, 'created_at'>): Promise<User> {
    const newUser: User = {
      ...user,
      created_at: new Date(),
    };
    await redis.set(`${KEYS.USER}${user.wallet_address}`, JSON.stringify(newUser));
    return newUser;
  },

  async update(walletAddress: string, updates: Partial<User>): Promise<User | null> {
    const existing = await this.get(walletAddress);
    if (!existing) return null;

    const updated = { ...existing, ...updates };
    await redis.set(`${KEYS.USER}${walletAddress}`, JSON.stringify(updated));
    return updated;
  },

  async getOrCreate(walletAddress: string, farcasterFid?: string, username?: string): Promise<User> {
    let user = await this.get(walletAddress);
    if (!user) {
      user = await this.create({
        wallet_address: walletAddress,
        farcaster_fid: farcasterFid,
        username: username || `user_${walletAddress.slice(0, 8)}`,
        reputation_score: 0,
        pulse_token_balance: 0,
        subscription_tier: 'free',
        watchlist_ids: [],
      });
    }
    return user;
  },
};

// Watchlist operations
export const watchlistDb = {
  async get(id: string): Promise<Watchlist | null> {
    const data = await redis.get(`${KEYS.WATCHLIST}${id}`);
    return data as Watchlist | null;
  },

  async create(watchlist: Omit<Watchlist, 'id' | 'created_at'>): Promise<Watchlist> {
    const id = `wl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newWatchlist: Watchlist = {
      ...watchlist,
      id,
      created_at: new Date(),
    };

    await redis.set(`${KEYS.WATCHLIST}${id}`, JSON.stringify(newWatchlist));

    // Add to user's watchlist index
    await redis.sadd(`${KEYS.USER_WATCHLISTS}${watchlist.user_wallet}`, id);

    return newWatchlist;
  },

  async getUserWatchlists(walletAddress: string): Promise<Watchlist[]> {
    const watchlistIds = await redis.smembers(`${KEYS.USER_WATCHLISTS}${walletAddress}`);
    const watchlists: Watchlist[] = [];

    for (const id of watchlistIds) {
      const watchlist = await this.get(id);
      if (watchlist) watchlists.push(watchlist);
    }

    return watchlists;
  },

  async update(id: string, updates: Partial<Watchlist>): Promise<Watchlist | null> {
    const existing = await this.get(id);
    if (!existing) return null;

    const updated = { ...existing, ...updates };
    await redis.set(`${KEYS.WATCHLIST}${id}`, JSON.stringify(updated));
    return updated;
  },
};

// Catalyst operations
export const catalystDb = {
  async get(id: string): Promise<Catalyst | null> {
    const data = await redis.get(`${KEYS.CATALYST}${id}`);
    return data as Catalyst | null;
  },

  async create(catalyst: Omit<Catalyst, 'id'>): Promise<Catalyst> {
    const id = `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newCatalyst: Catalyst = {
      ...catalyst,
      id,
    };

    await redis.set(`${KEYS.CATALYST}${id}`, JSON.stringify(newCatalyst));
    return newCatalyst;
  },

  async getAll(limit = 50, offset = 0): Promise<Catalyst[]> {
    // Get all catalyst keys (this is simplified - in production you'd use Redis search)
    const keys = await redis.keys(`${KEYS.CATALYST}*`);
    const catalysts: Catalyst[] = [];

    for (const key of keys.slice(offset, offset + limit)) {
      const data = await redis.get(key);
      if (data) catalysts.push(data as Catalyst);
    }

    return catalysts.sort((a, b) => b.filed_at.getTime() - a.filed_at.getTime());
  },

  async getByRegion(region: string): Promise<Catalyst[]> {
    const all = await this.getAll(1000);
    return all.filter(c => c.region === region);
  },

  async update(id: string, updates: Partial<Catalyst>): Promise<Catalyst | null> {
    const existing = await this.get(id);
    if (!existing) return null;

    const updated = { ...existing, ...updates };
    await redis.set(`${KEYS.CATALYST}${id}`, JSON.stringify(updated));
    return updated;
  },
};

// Pulse operations
export const pulseDb = {
  async create(pulse: Omit<EmergingMarketPulse, 'id'>): Promise<EmergingMarketPulse> {
    const id = `pulse_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newPulse: EmergingMarketPulse = {
      ...pulse,
      id,
    };

    await redis.set(`${KEYS.PULSE}${id}`, JSON.stringify(newPulse));
    // Keep only recent pulses (last 7 days)
    await redis.expire(`${KEYS.PULSE}${id}`, 7 * 24 * 60 * 60);
    return newPulse;
  },

  async getRecent(limit = 20): Promise<EmergingMarketPulse[]> {
    const keys = await redis.keys(`${KEYS.PULSE}*`);
    const pulses: EmergingMarketPulse[] = [];

    for (const key of keys.slice(0, limit)) {
      const data = await redis.get(key);
      if (data) pulses.push(data as EmergingMarketPulse);
    }

    return pulses.sort((a, b) => b.published_at.getTime() - a.published_at.getTime());
  },

  async getByRegion(region: string): Promise<EmergingMarketPulse[]> {
    const all = await this.getRecent(100);
    return all.filter(p => p.region === region);
  },
};

// Learning module operations
export const learningDb = {
  async create(module: Omit<LearningModule, 'id' | 'delivered_at'>): Promise<LearningModule> {
    const id = `learn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newModule: LearningModule = {
      ...module,
      id,
      delivered_at: new Date(),
    };

    await redis.set(`${KEYS.LEARNING}${id}`, JSON.stringify(newModule));
    return newModule;
  },

  async getForWatchlist(watchlistId: string): Promise<LearningModule[]> {
    const keys = await redis.keys(`${KEYS.LEARNING}*`);
    const modules: LearningModule[] = [];

    for (const key of keys) {
      const data = await redis.get(key);
      if (data) {
        const module = data as LearningModule;
        if (module.watchlist_id === watchlistId) {
          modules.push(module);
        }
      }
    }

    return modules.sort((a, b) => b.delivered_at.getTime() - a.delivered_at.getTime());
  },
};

// Prediction operations
export const predictionDb = {
  async create(prediction: Omit<Prediction, 'id' | 'submitted_at'>): Promise<Prediction> {
    const id = `pred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newPrediction: Prediction = {
      ...prediction,
      id,
      submitted_at: new Date(),
    };

    await redis.set(`${KEYS.PREDICTION}${id}`, JSON.stringify(newPrediction));

    // Add to user and catalyst indexes
    await redis.sadd(`${KEYS.USER_PREDICTIONS}${prediction.user_wallet}`, id);
    await redis.sadd(`${KEYS.CATALYST_PREDICTIONS}${prediction.catalyst_id}`, id);

    return newPrediction;
  },

  async getUserPredictions(walletAddress: string): Promise<Prediction[]> {
    const predictionIds = await redis.smembers(`${KEYS.USER_PREDICTIONS}${walletAddress}`);
    const predictions: Prediction[] = [];

    for (const id of predictionIds) {
      const data = await redis.get(`${KEYS.PREDICTION}${id}`);
      if (data) predictions.push(data as Prediction);
    }

    return predictions.sort((a, b) => b.submitted_at.getTime() - a.submitted_at.getTime());
  },

  async getCatalystPredictions(catalystId: string): Promise<Prediction[]> {
    const predictionIds = await redis.smembers(`${KEYS.CATALYST_PREDICTIONS}${catalystId}`);
    const predictions: Prediction[] = [];

    for (const id of predictionIds) {
      const data = await redis.get(`${KEYS.PREDICTION}${id}`);
      if (data) predictions.push(data as Prediction);
    }

    return predictions;
  },
};

// Simulation operations
export const simulationDb = {
  async create(session: Omit<SimulationSession, 'id' | 'created_at'>): Promise<SimulationSession> {
    const id = `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newSession: SimulationSession = {
      ...session,
      id,
      created_at: new Date(),
    };

    await redis.set(`${KEYS.SIMULATION}${id}`, JSON.stringify(newSession));
    return newSession;
  },

  async getUserSessions(walletAddress: string): Promise<SimulationSession[]> {
    const keys = await redis.keys(`${KEYS.SIMULATION}*`);
    const sessions: SimulationSession[] = [];

    for (const key of keys) {
      const data = await redis.get(key);
      if (data) {
        const session = data as SimulationSession;
        if (session.user_wallet === walletAddress) {
          sessions.push(session);
        }
      }
    }

    return sessions.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
  },
};

