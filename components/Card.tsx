'use client';

import { Card as CardType } from '@/lib/poker';

interface CardProps {
  card: CardType;
  faceDown?: boolean;
  className?: string;
}

export default function Card({ card, faceDown = false, className = '' }: CardProps) {
  const isRed = card.suit === '♥' || card.suit === '♦';
  
  if (faceDown) {
    return (
      <div className={`w-16 h-24 bg-blue-800 border-2 border-blue-900 rounded-lg flex items-center justify-center shadow-lg ${className}`}>
        <div className="text-3xl text-blue-400">🂠</div>
      </div>
    );
  }
  
  return (
    <div className={`w-16 h-24 bg-white border-2 border-gray-300 rounded-lg p-2 flex flex-col justify-between shadow-lg ${className}`}>
      <div className={`text-xl font-bold ${isRed ? 'text-red-600' : 'text-black'}`}>
        {card.rank}
        <div className="text-2xl">{card.suit}</div>
      </div>
      <div className={`text-xl font-bold text-right ${isRed ? 'text-red-600' : 'text-black'} transform rotate-180`}>
        {card.rank}
        <div className="text-2xl">{card.suit}</div>
      </div>
    </div>
  );
}
