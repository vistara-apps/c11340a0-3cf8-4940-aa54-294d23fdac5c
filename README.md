# PulsePort - Emerging Market Intelligence

Real-time emerging market intelligence for micro-cap investors—social, fast, and on-chain.

## Features

- **Emerging Markets Pulse Feed**: Real-time aggregated news with sentiment analysis
- **Micro-Cap Catalyst Tracker**: Crowdsourced + AI-aggregated catalysts
- **Portfolio-Linked Learning**: AI-powered contextual education
- **Strategy Simulator**: Paper trading with historical data
- **Social Catalyst Challenges**: Weekly prediction competitions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit)
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **APIs**: Alpha Vantage, NewsAPI, OpenAI, SEC EDGAR

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.local.example` to `.env.local` and add your API keys

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

See `.env.local.example` for required API keys:
- OnchainKit API Key (Coinbase)
- Alpha Vantage API Key
- NewsAPI Key
- OpenAI API Key
- Alchemy API Key (Base RPC)
- Upstash Redis credentials

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx            # Home page
├── providers.tsx       # OnchainKit provider
├── pulse/              # Emerging markets pulse feed
├── catalysts/          # Catalyst tracker
├── simulator/          # Strategy simulator
└── profile/            # User profile

components/
├── AppShell.tsx        # Main app layout
├── CatalystCard.tsx    # Catalyst display component
├── PulseFeedItem.tsx   # Pulse feed item
└── MetricCard.tsx      # Metric display card

lib/
├── types.ts            # TypeScript interfaces
├── constants.ts        # App constants
└── utils.ts            # Utility functions
```

## Design System

- **Theme**: Professional finance (dark navy + gold accents)
- **Colors**: CSS variables for easy theming
- **Components**: Modular, reusable UI components
- **Responsive**: Mobile-first design

## License

MIT
