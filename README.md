# 🃏 Poker Academy

A comprehensive web application for learning and practicing poker fundamentals, built with Next.js and deployed on Vercel.

## Features

### 📚 Learn the Rules
- Complete hand rankings from Royal Flush to High Card
- Detailed descriptions of each hand type
- Game flow breakdown (Pre-flop, Flop, Turn, River)
- Visual card representations

### 🧮 Pot Odds Calculator
- Interactive calculator for pot odds
- Real-time percentage and ratio calculations
- Educational tips on using pot odds for decision-making
- Adjustable pot size and bet amounts

### 🎮 Practice Game
- Play full hands against a simulated opponent
- Real-time hand evaluation
- Equity calculator showing your win probability
- Interactive decision-making (Fold, Call, Raise)
- Immediate feedback on your plays
- Game state tracking through all betting rounds

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
poker-academy/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page with tab navigation
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Card.tsx          # Playing card component
│   ├── HandRankings.tsx  # Hand rankings display
│   ├── PotOddsCalculator.tsx  # Interactive calculator
│   └── PracticeGame.tsx  # Practice game logic
├── lib/                   # Utility functions
│   └── poker.ts          # Poker game logic and algorithms
└── public/               # Static assets
```

## Poker Logic

The application includes:
- Full deck creation and shuffling
- Hand evaluation algorithm supporting all hand types
- Pot odds calculation
- Equity estimation
- Card comparison logic

## Deployment

This project is optimized for Vercel deployment:

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Learning Path

1. **Start with Learn the Rules** - Understand hand rankings and game flow
2. **Use the Pot Odds Calculator** - Master the mathematics of poker
3. **Practice with the Game** - Apply your knowledge in realistic scenarios

## Future Enhancements

- Multi-player support
- Advanced AI opponent
- Hand history tracking
- More practice scenarios
- Tournament mode
- Statistics and progress tracking

## License

MIT License - feel free to use this for learning and practice!

---

Built with ♠️ ♥️ ♦️ ♣️ by Matthew
