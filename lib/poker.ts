// Poker game logic and utilities

export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  suit: Suit;
  rank: Rank;
}

export type HandRank = 
  | 'Royal Flush'
  | 'Straight Flush'
  | 'Four of a Kind'
  | 'Full House'
  | 'Flush'
  | 'Straight'
  | 'Three of a Kind'
  | 'Two Pair'
  | 'One Pair'
  | 'High Card';

const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const SUITS: Suit[] = ['♠', '♥', '♦', '♣'];

export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank });
    }
  }
  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRankValue(rank: Rank): number {
  return RANKS.indexOf(rank);
}

function countRanks(cards: Card[]): Map<Rank, number> {
  const counts = new Map<Rank, number>();
  for (const card of cards) {
    counts.set(card.rank, (counts.get(card.rank) || 0) + 1);
  }
  return counts;
}

function countSuits(cards: Card[]): Map<Suit, number> {
  const counts = new Map<Suit, number>();
  for (const card of cards) {
    counts.set(card.suit, (counts.get(card.suit) || 0) + 1);
  }
  return counts;
}

function isFlush(cards: Card[]): boolean {
  const suitCounts = countSuits(cards);
  return Array.from(suitCounts.values()).some(count => count >= 5);
}

function isStraight(cards: Card[]): boolean {
  const rankValues = cards.map(c => getRankValue(c.rank)).sort((a, b) => a - b);
  const uniqueRanks = [...new Set(rankValues)];
  
  for (let i = 0; i <= uniqueRanks.length - 5; i++) {
    let consecutive = true;
    for (let j = 0; j < 4; j++) {
      if (uniqueRanks[i + j + 1] !== uniqueRanks[i + j] + 1) {
        consecutive = false;
        break;
      }
    }
    if (consecutive) return true;
  }
  
  // Check for A-2-3-4-5 (wheel)
  if (uniqueRanks.includes(12) && uniqueRanks.includes(0) && uniqueRanks.includes(1) && 
      uniqueRanks.includes(2) && uniqueRanks.includes(3)) {
    return true;
  }
  
  return false;
}

export function evaluateHand(cards: Card[]): { rank: HandRank; score: number } {
  if (cards.length < 5) {
    return { rank: 'High Card', score: 0 };
  }

  const rankCounts = countRanks(cards);
  const counts = Array.from(rankCounts.values()).sort((a, b) => b - a);
  const isFlushHand = isFlush(cards);
  const isStraightHand = isStraight(cards);

  // Royal Flush
  if (isFlushHand && isStraightHand) {
    const highCard = Math.max(...cards.map(c => getRankValue(c.rank)));
    if (highCard === 12) { // Ace high
      return { rank: 'Royal Flush', score: 10 };
    }
    return { rank: 'Straight Flush', score: 9 };
  }

  // Four of a Kind
  if (counts[0] === 4) {
    return { rank: 'Four of a Kind', score: 8 };
  }

  // Full House
  if (counts[0] === 3 && counts[1] >= 2) {
    return { rank: 'Full House', score: 7 };
  }

  // Flush
  if (isFlushHand) {
    return { rank: 'Flush', score: 6 };
  }

  // Straight
  if (isStraightHand) {
    return { rank: 'Straight', score: 5 };
  }

  // Three of a Kind
  if (counts[0] === 3) {
    return { rank: 'Three of a Kind', score: 4 };
  }

  // Two Pair
  if (counts[0] === 2 && counts[1] === 2) {
    return { rank: 'Two Pair', score: 3 };
  }

  // One Pair
  if (counts[0] === 2) {
    return { rank: 'One Pair', score: 2 };
  }

  // High Card
  return { rank: 'High Card', score: 1 };
}

export function calculatePotOdds(potSize: number, betToCall: number): number {
  return betToCall / (potSize + betToCall);
}

export function calculateEquity(hand: Card[], community: Card[]): number {
  // Simplified equity calculation based on hand strength
  const allCards = [...hand, ...community];
  const { score } = evaluateHand(allCards);
  
  // Basic equity estimation (simplified)
  const baseEquity = score / 10;
  const cardCount = allCards.length;
  
  if (cardCount === 2) { // Pre-flop
    return baseEquity * 0.5 + 0.25; // 25-75% range
  } else if (cardCount === 5) { // Flop
    return baseEquity * 0.6 + 0.2; // More accurate
  } else if (cardCount === 6) { // Turn
    return baseEquity * 0.7 + 0.15;
  } else { // River
    return baseEquity * 0.8 + 0.1;
  }
}

export function getHandStrengthDescription(rank: HandRank): string {
  const descriptions: Record<HandRank, string> = {
    'Royal Flush': 'The absolute best hand in poker! A-K-Q-J-10 all of the same suit.',
    'Straight Flush': 'Five consecutive cards of the same suit. Extremely rare and powerful.',
    'Four of a Kind': 'Four cards of the same rank. Also called "quads".',
    'Full House': 'Three of a kind plus a pair. A very strong hand.',
    'Flush': 'Five cards of the same suit, not in sequence.',
    'Straight': 'Five consecutive cards of different suits.',
    'Three of a Kind': 'Three cards of the same rank. Also called "trips" or "a set".',
    'Two Pair': 'Two different pairs. A decent hand.',
    'One Pair': 'Two cards of the same rank.',
    'High Card': 'No matching cards. The highest card determines strength.'
  };
  return descriptions[rank];
}

export const HAND_RANKINGS: HandRank[] = [
  'Royal Flush',
  'Straight Flush',
  'Four of a Kind',
  'Full House',
  'Flush',
  'Straight',
  'Three of a Kind',
  'Two Pair',
  'One Pair',
  'High Card'
];
